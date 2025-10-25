import { NextRequest, NextResponse } from 'next/server';
import { ipfsStorage } from '@/lib/ipfs-storage';

// Mark this route as dynamic (not static)
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cid = searchParams.get('cid');

    if (!cid) {
      return NextResponse.json(
        { success: false, error: 'CID is required' },
        { status: 400 }
      );
    }

    // Try multiple IPFS gateways
    const gateways = [
      `https://gateway.pinata.cloud/ipfs/${cid}`,
      `https://cloudflare-ipfs.com/ipfs/${cid}`,
      `https://ipfs.io/ipfs/${cid}`,
    ];

    for (const url of gateways) {
      try {
        console.log('Trying to fetch from:', url);
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Successfully fetched from:', url);
          return NextResponse.json({ success: true, data });
        }
      } catch (error) {
        console.warn(`Failed to fetch from ${url}:`, error);
        continue;
      }
    }

    // Check simulated storage as fallback
    if (ipfsStorage.has(cid)) {
      console.log('Fetching from simulated IPFS storage');
      return NextResponse.json({ 
        success: true, 
        data: ipfsStorage.get(cid),
        note: 'Fetched from simulated storage'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch from all IPFS gateways' },
      { status: 404 }
    );

  } catch (error) {
    console.error('IPFS fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch from IPFS' },
      { status: 500 }
    );
  }
}
