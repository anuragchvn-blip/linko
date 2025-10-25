// Quick test to verify contract address is loaded correctly
require('dotenv').config({ path: '.env.local' });

console.log('Contract Address from env:', process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
console.log('Expected:', '0x91f38c15C6A91b937724Ac675245522290ca55B7');
console.log('Match:', process.env.NEXT_PUBLIC_CONTRACT_ADDRESS === '0x91f38c15C6A91b937724Ac675245522290ca55B7');
