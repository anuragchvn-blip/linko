import { Address } from 'viem';

export const LINKO_PROFILE_ABI = [
    {
        inputs: [{ internalType: "address", name: "_user", type: "address" }],
        name: "getProfileCID",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getMyProfileCID",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "_user", type: "address" }],
        name: "hasProfile",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "_ipfsCID", type: "string" }],
        name: "setProfileCID",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "profileCIDs",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "user", type: "address" },
            { indexed: false, internalType: "string", name: "ipfsCID", type: "string" },
        ],
        name: "ProfileUpdated",
        type: "event",
    },
] as const;

export const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '') as Address;

// Contract configuration for wagmi
export const linkoProfileConfig = {
    address: CONTRACT_ADDRESS,
    abi: LINKO_PROFILE_ABI,
} as const;
