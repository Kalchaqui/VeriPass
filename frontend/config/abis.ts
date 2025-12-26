// ABIs para contratos VeriScore - Cronos EVM

export const identityRegistryABI = [
  {
    "inputs": [],
    "name": "createIdentity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "_user", "type": "address"}],
    "name": "getIdentity",
    "outputs": [
      {"name": "uniqueId", "type": "bytes32"},
      {"name": "isVerified", "type": "bool"},
      {"name": "verificationLevel", "type": "uint256"},
      {"name": "createdAt", "type": "uint256"},
      {"name": "documentCount", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const creditScoringABI = [
  {
    "inputs": [{"name": "_user", "type": "address"}],
    "name": "calculateInitialScore",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "_user", "type": "address"}],
    "name": "getScore",
    "outputs": [
      {"name": "score", "type": "uint256"},
      {"name": "maxLoanAmount", "type": "uint256"},
      {"name": "lastUpdated", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// VeriScoreSBT ABI - Soulbound Token for credit scores
export const veriScoreSBTABI = [
  {
    "inputs": [
      {"name": "_to", "type": "address"},
      {"name": "_scoreHash", "type": "bytes32"},
      {"name": "_score", "type": "uint256"},
      {"name": "_verificationLevel", "type": "uint256"}
    ],
    "name": "mintSBT",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "_user", "type": "address"}],
    "name": "getUserSBT",
    "outputs": [
      {"name": "tokenId", "type": "uint256"},
      {"name": "scoreHash", "type": "bytes32"},
      {"name": "score", "type": "uint256"},
      {"name": "verificationLevel", "type": "uint256"},
      {"name": "issuedAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "_user", "type": "address"}],
    "name": "hasActiveSBT",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;


