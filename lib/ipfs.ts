// IPFS integration using multiple methods for reliability

const web3StorageToken = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;

export class IPFSService {
  private client: any | null;

  constructor() {
    this.client = null;
    if (web3StorageToken) {
      this.initializeClient();
    }
  }

  private async initializeClient() {
    try {
      // @ts-ignore - web3.storage types may not be available
      const { Web3Storage } = await import('web3.storage');
      this.client = new Web3Storage({ token: web3StorageToken! });
    } catch (error) {
      console.warn('Web3.Storage not available:', error);
    }
  }

  async uploadProfile(profileData: any): Promise<string | null> {
    // Method 1: Try Web3.Storage
    if (this.client) {
      try {
        const blob = new Blob([JSON.stringify(profileData)], { type: 'application/json' });
        const file = new File([blob], 'profile.json');

        const cid = await this.client.put([file], {
          name: 'Linko Profile',
          maxRetries: 3,
        });

        console.log('Uploaded to Web3.Storage with CID:', cid);
        return cid; // Return just the CID
      } catch (error) {
        console.error('Web3.Storage upload failed:', error);
      }
    }

    // Method 2: Fallback to public IPFS gateway upload (using nft.storage public API)
    try {
      console.log('Trying nft.storage public upload...');
      const blob = new Blob([JSON.stringify(profileData)], { type: 'application/json' });
      
      const formData = new FormData();
      formData.append('file', blob, 'profile.json');

      const response = await fetch('https://api.nft.storage/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${web3StorageToken || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg5NjQ0YTkzMzc0OGMzQzYwNTgwMWFlQzUyYWM1ODRlNmI2YTgwMDlhZDhmNWI0MzVlMDg4YTU2Y2MzOWUzODgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcyOTg2MjQwMDAwMCwibmFtZSI6ImxpbmtvIn0.test'}`, // Fallback token
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Uploaded to nft.storage with CID:', data.value.cid);
        return data.value.cid;
      }
      
      throw new Error('nft.storage upload failed');
    } catch (error) {
      console.error('nft.storage upload failed:', error);
    }

    // Method 3: Use IPFS HTTP client (public gateway)
    try {
      console.log('Trying public IPFS upload...');
      const response = await fetch('https://ipfs.io/api/v0/add?pin=true', {
        method: 'POST',
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Uploaded to IPFS with CID:', data.Hash);
        return data.Hash;
      }
    } catch (error) {
      console.error('Public IPFS upload failed:', error);
    }

    console.error('All IPFS upload methods failed');
    return null;
  }

  async fetchProfile(cid: string): Promise<any | null> {
    // Try multiple IPFS gateways for reliability
    const gateways = [
      `https://ipfs.io/ipfs/${cid}/profile.json`,
      `https://ipfs.io/ipfs/${cid}`,
      `https://cloudflare-ipfs.com/ipfs/${cid}/profile.json`,
      `https://cloudflare-ipfs.com/ipfs/${cid}`,
      `https://gateway.pinata.cloud/ipfs/${cid}/profile.json`,
      `https://gateway.pinata.cloud/ipfs/${cid}`,
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
          return data;
        }
      } catch (error) {
        console.warn(`Failed to fetch from ${url}:`, error);
        continue;
      }
    }

    console.error('Failed to fetch from all IPFS gateways');
    return null;
  }
}

export const ipfsService = new IPFSService();

