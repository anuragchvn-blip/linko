// IPFS integration using API routes for server-side uploads

export class IPFSService {
  async uploadProfile(profileData: any): Promise<string | null> {
    try {
      console.log('Uploading profile via API route...');
      
      const response = await fetch('/api/upload-ipfs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success && data.cid) {
        console.log('Uploaded to IPFS with CID:', data.cid);
        if (data.note) {
          console.log('Note:', data.note);
        }
        return data.cid;
      }

      throw new Error('Upload failed');
    } catch (error) {
      console.error('IPFS upload error:', error);
      return null;
    }
  }

  async fetchProfile(cid: string): Promise<any | null> {
    try {
      console.log('Fetching profile from IPFS:', cid);
      
      const response = await fetch(`/api/fetch-ipfs?cid=${encodeURIComponent(cid)}`);
      
      if (!response.ok) {
        throw new Error(`Fetch failed: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        if (result.note) {
          console.log('Note:', result.note);
        }
        return result.data;
      }

      throw new Error('Fetch failed');
    } catch (error) {
      console.error('IPFS fetch error:', error);
      return null;
    }
  }
}

export const ipfsService = new IPFSService();


