export interface UserProfile {
  bio: string;
  links: Link[];
  spotifyEmbed?: string;
}

export interface Link {
  title: string;
  url: string;
  icon?: string;
}

export interface NFT {
  name: string;
  image: string;
  contract: string;
  tokenId?: string;
}

export interface DApp {
  name: string;
  address: string;
  icon: string;
  url: string;
  verified?: boolean;
}
