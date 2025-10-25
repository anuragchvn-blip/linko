import { NextRequest, NextResponse } from 'next/server';
import { ipfsStorage } from '@/lib/ipfs-storage';

export async function POST(request: NextRequest) {
  try {
    const profileData = await request.json();

    // Get Pinata credentials (JWT is preferred, but API Key + Secret also work)
    const pinataJWT = process.env.PINATA_JWT || '';
    const pinataApiKey = process.env.PINATA_API_KEY || '';
    const pinataApiSecret = process.env.PINATA_API_SECRET || '';
    
    const hasPinataAuth = pinataJWT || (pinataApiKey && pinataApiSecret);
    
    if (!hasPinataAuth) {
      // Fallback: Create a simple hash-based CID simulation
      // This will work for testing without external dependencies
      const jsonString = JSON.stringify(profileData);
      const encoder = new TextEncoder();
      const data = encoder.encode(jsonString);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      // Create a fake but consistent CID format
      const fakeCID = `bafyrei${hashHex.substring(0, 52)}`;
      
      // Store in simulated storage
      ipfsStorage.set(fakeCID, profileData);
      console.log('Stored in simulated IPFS:', fakeCID);
      
      return NextResponse.json({ 
        success: true, 
        cid: fakeCID,
        note: 'Using simulated IPFS storage. Add Pinata credentials to .env.local to use real IPFS.'
      });
    }

    // Upload to Pinata
    const formData = new FormData();
    formData.append('file', new Blob([JSON.stringify(profileData)], { type: 'application/json' }), 'profile.json');
    
    const pinataMetadata = JSON.stringify({
      name: 'Linko Profile',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const headers: HeadersInit = pinataJWT 
      ? { 'Authorization': `Bearer ${pinataJWT}` }
      : { 
          'pinata_api_key': pinataApiKey,
          'pinata_secret_api_key': pinataApiSecret
        };

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Pinata error:', errorText);
      throw new Error(`Pinata upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Uploaded to Pinata:', data.IpfsHash);

    return NextResponse.json({ 
      success: true, 
      cid: data.IpfsHash 
    });

  } catch (error) {
    console.error('IPFS upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload to IPFS' },
      { status: 500 }
    );
  }
}
