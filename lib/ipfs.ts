// IPFS integration using Web3.Storage
// Note: web3.storage is deprecated, consider upgrading to @web3-storage/w3up-client

const token = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;

export class IPFSService {
  private client: any | null;

  constructor() {
    // Dynamic import to avoid build errors if package not installed
    this.client = null;
    if (token) {
      this.initializeClient();
    }
  }

  private async initializeClient() {
    try {
      // Web3Storage is deprecated but kept for compatibility
      // Dynamic require to avoid build errors
      // eslint-disable-next-line
      const { Web3Storage } = require('web3.storage');
      this.client = new Web3Storage({ token: token! });
    } catch (error) {
      console.warn('Web3.Storage not available:', error);
    }
  }

  async uploadProfile(profileData: any): Promise<string | null> {
    if (!this.client) {
      console.warn('Web3.Storage token not configured');
      return null;
    }

    try {
      const blob = new Blob([JSON.stringify(profileData)], { type: 'application/json' });
      const file = new File([blob], 'profile.json');

      const cid = await this.client.put([file], {
        name: 'Linko Profile',
        maxRetries: 3,
      });

      return `https://ipfs.io/ipfs/${cid}/profile.json`;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      return null;
    }
  }

  async fetchProfile(cid: string): Promise<any | null> {
    try {
      const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Error fetching from IPFS:', error);
      return null;
    }
  }
}

export const ipfsService = new IPFSService();
