# VeriScore - Credit Scoring Infrastructure for Exchanges

<div align="center">

![VeriScore](https://github.com/user-attachments/assets/607b524e-229b-4e25-bc8a-ffa875c4a5d1)

### **Decentralized Credit Scoring Infrastructure with AI Agents**

**🏆 Built for Cronos x402 Paytech Hackathon**

</div>

---

## 🌟 **Overview**

**VeriScore** is a B2B credit scoring infrastructure that leverages blockchain technology, the x402 payment protocol, and AI agents to provide secure, transparent, and verifiable credit assessments for exchanges, banks, and financial institutions.

This project has been migrated from Avalanche to Cronos EVM and enhanced with AI agent capabilities for the Cronos x402 Paytech Hackathon.

### **Key Features**

🔐 **Privy Authentication** - Email-based login/registration  
💳 **x402 Payment Protocol** - Seamless micropayments via Cronos x402 Facilitator  
🏦 **B2B Infrastructure** - Purpose-built for financial institutions  
⚡ **Cronos EVM** - Fast, low-cost transactions on Cronos blockchain  
📊 **Prepaid Credit System** - Flexible pay-as-you-go model  
🔍 **Mock User Database** - 100 pre-generated users for testing  
🤖 **AI Agents Integration** - Automated score queries and monitoring via Crypto.com AI Agent SDK  
📈 **Market Data Integration** - Crypto.com Market Data MCP for enhanced scoring  
🔌 **MCP Server** - Model Context Protocol integration for AI assistants

---

## 🏗️ **Architecture**

```mermaid
graph TB
    subgraph FL["Frontend Layer"]
        A["Next.js Application"]
    end

    subgraph BL["Backend Layer"]
        D["Express API Server"]
        F["Authentication Service"]
        G["Scoring Management"]
        E["x402 Payment Gateway"]
        AI["AI Agent Service"]
        MCP["MCP Server"]
    end

    subgraph DL["Data Layer"]
        K["Exchange Database"]
        M["Mock User Database"]
        L["Transaction History"]
    end

    subgraph BCL["Blockchain Layer - Cronos EVM"]
        H["IdentityRegistry Contract"]
        I["CreditScoringMini Contract"]
        J["VeriScoreSBT Contract"]
    end

    subgraph EXT["External Services"]
        CDC["Crypto.com AI Agent SDK"]
        MKT["Crypto.com Market Data MCP"]
    end

    A -->|"API Calls"| D
    D -->|"Uses"| F
    D -->|"Uses"| G
    D -->|"Uses"| E
    D -->|"Uses"| AI
    AI -->|"Integrates"| CDC
    AI -->|"Uses"| MCP
    MCP -->|"Connects"| MKT
    F -->|"Stores"| K
    G -->|"Queries"| M
    G -->|"Logs"| L
    E -->|"Calls"| H
    E -->|"Calls"| I
    E -->|"Calls"| J

    style A fill:#61dafb,stroke:#333,stroke-width:3px
    style D fill:#68a063,stroke:#333,stroke-width:3px
    style E fill:#4a90e2,stroke:#333,stroke-width:3px
    style AI fill:#9333ea,stroke:#333,stroke-width:3px
    style MCP fill:#9333ea,stroke:#333,stroke-width:3px
    style H fill:#e84142,stroke:#333,stroke-width:3px
    style I fill:#e84142,stroke:#333,stroke-width:3px
    style J fill:#e84142,stroke:#333,stroke-width:3px
```

---

## 📦 **Smart Contracts**

Deployed on **Cronos EVM** (Testnet or Mainnet):

- **IdentityRegistry** - Manages user identities and verification levels
- **CreditScoringMini** - Calculates and stores credit scores
- **VeriScoreSBT** - Soulbound Token (ERC-721) for verifiable credit scores

**Note:** Contracts need to be deployed on Cronos. Use the deployment scripts in `contracts/scripts/deploy.js`.

---

## 🚀 **Quick Start**

### **Prerequisites**

- Node.js 18+
- Wallet (MetaMask, Core Wallet, etc.)
- Cronos Testnet configured (Chain ID: 338)
- Cronos x402 Facilitator credentials

### **Installation**

```bash
# Clone repository
git clone <repo-url>
cd veriscore

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Install contract dependencies
cd ../contracts
npm install
```

### **Configuration**

#### **Frontend** (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_CHAIN_ID=338

# Smart Contract Addresses (update after deployment)
NEXT_PUBLIC_IDENTITY_REGISTRY=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_CREDIT_SCORING=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_VERISCORE_SBT=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_PRIVY_APP_ID=your-privy-app-id

# Cronos x402 Facilitator
NEXT_PUBLIC_CRONOS_FACILITATOR_WALLET=0x0000000000000000000000000000000000000000
```

#### **Backend** (`backend/.env`)

```env
PORT=3001
JWT_SECRET=your-super-secure-jwt-secret-change-this

# x402 Payment Mode
X402_MODE=simulated  # Use 'production' for real payments

# Smart Contract Addresses
VERISCORE_SBT_ADDRESS=0x0000000000000000000000000000000000000000
IDENTITY_REGISTRY_ADDRESS=0x0000000000000000000000000000000000000000
CREDIT_SCORING_ADDRESS=0x0000000000000000000000000000000000000000

# Cronos x402 Facilitator
CRONOS_FACILITATOR_SECRET=your-facilitator-secret
CRONOS_FACILITATOR_WALLET=0x0000000000000000000000000000000000000000

# RPC URL for Cronos
RPC_URL=https://evm-t3.cronos.org

# Merchant Wallet (receives payments)
MERCHANT_WALLET_ADDRESS=0x0000000000000000000000000000000000000000

PRIVY_APP_SECRET=your-privy-app-secret
```

### **Running**

```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd frontend
npm run dev
```

---

## 🧪 **User Flow**

### **1. Register/Login**
- Navigate to `/login`
- Sign in with Privy (email-based authentication)
- Account is automatically created if it doesn't exist

### **2. Purchase Credits**
- Go to Dashboard → Subscription
- Select credit amount (minimum: 10 credits = 0.2 USDC)
- Connect wallet to Cronos Testnet
- Confirm payment via x402 protocol
- Credits are added to your balance

**Pricing:**
- 💰 **0.02 USDC per credit**
- 📦 **Minimum: 10 credits (0.2 USDC)**

### **3. Query Users**
- Go to Dashboard → Users
- Search users by name, score, or verification level (free)
- Click "View" on any user to see full details (consumes 1 credit)
- View complete user information (Email, Score, Verification Level, Wallet)

### **4. View Usage**
- Go to Dashboard → Usage
- Review purchase history and credit consumption

---

## 🤖 **AI Agents Integration**

VeriScore includes AI agent capabilities for automated score queries and monitoring.

### **AI Agent Endpoints**

- `POST /api/ai-agents/query-score` - Query user score (requires x402 payment)
- `POST /api/ai-agents/monitor-wallet` - Start automated wallet monitoring
- `POST /api/ai-agents/execute-action` - Execute automated actions
- `GET /api/ai-agents/health` - Health check for agents

### **Example: Query Score via AI Agent**

```bash
curl -X POST http://localhost:3001/api/ai-agents/query-score \
  -H "Content-Type: application/json" \
  -H "X-Payment: <payment-proof>" \
  -d '{
    "walletAddress": "0x...",
    "agentId": "agent-123"
  }'
```

---

## 📡 **API Endpoints**

### **Authentication**
- `POST /api/auth/privy-login` - Sync Privy user with backend JWT
- `GET /api/auth/me` - Get authenticated user info

### **Subscriptions (x402 Protected)**
- `POST /api/subscriptions/purchase` - Purchase credits (x402)
- `GET /api/subscriptions/balance` - Get credit balance
- `GET /api/subscriptions/usage` - Get usage history

### **User Queries**
- `GET /api/mockUsers/search` - Search users (free, no credits)
- `GET /api/mockUsers/:id` - Get user details (consumes 1 credit)
- `GET /api/mockUsers/stats` - Database statistics

### **AI Agents**
- `POST /api/ai-agents/query-score` - Query score (x402 protected)
- `POST /api/ai-agents/monitor-wallet` - Monitor wallet (x402 protected)
- `POST /api/ai-agents/execute-action` - Execute action (x402 protected)
- `GET /api/ai-agents/health` - Health check

---

## 💡 **Technical Stack**

**Frontend:**
- Next.js 14 (App Router)
- Privy (Authentication)
- Wagmi + RainbowKit (Wallet connection)
- Cronos x402 Facilitator Client
- Tailwind CSS

**Backend:**
- Node.js + Express
- JWT Authentication
- Cronos x402 Payment Gateway
- Crypto.com AI Agent SDK (integration)
- Crypto.com Market Data MCP (integration)
- MCP Server for AI assistants
- JSON file storage (MVP)

**Blockchain:**
- Cronos EVM (Testnet/Mainnet)
- Solidity 0.8.20
- Hardhat

---

## 🎨 **Features**

### **x402 Payment Integration**
- HTTP 402 Payment Required response
- Cronos x402 Facilitator integration
- Automatic payment verification
- Development mode for testing

### **Credit System**
- Prepaid credit model
- Transparent pricing (0.02 USDC/credit)
- Automatic credit consumption
- Complete usage tracking

### **AI Agents**
- Automated score queries
- Wallet monitoring
- Action execution
- Integration with Crypto.com AI Agent SDK

### **Market Data Integration**
- Crypto.com Market Data MCP integration
- Real-time token prices
- Historical price data
- Score enhancement with market data

### **MCP Server**
- Model Context Protocol integration
- Exposes VeriScore data to AI assistants
- Compatible with ChatGPT and Claude

---

## 📊 **Project Status**

### **✅ Implemented**
- Privy email authentication
- Cronos x402 payment protocol integration
- Prepaid credit system
- Mock user database (100 users)
- Free search + paid detail view
- Complete dashboard interface
- Smart contracts (ready for deployment on Cronos)
- AI Agent endpoints
- MCP Server structure
- Market Data integration structure

### **⚠️ Future Enhancements**
- Real database migration (PostgreSQL/MongoDB)
- IPFS integration for documents
- Advanced credit scoring algorithms
- Full Crypto.com AI Agent SDK integration
- Complete MCP Server implementation
- Multi-chain support
- API rate limiting

---

## 🔧 **Deployment**

### **Deploy Contracts to Cronos**

```bash
cd contracts

# Deploy to Cronos Testnet
npm run deploy:cronos-testnet

# Deploy to Cronos Mainnet
npm run deploy:cronos-mainnet
```

After deployment, update the contract addresses in your `.env` files.

### **Get Testnet Tokens**

Visit [Cronos Faucet](https://cronos.org/faucet) to get testnet tokens.

---

## 📚 **Documentation**

- [Cronos x402 Facilitator SDK](https://github.com/cronos-labs/x402-examples)
- [Cronos EVM Docs](https://docs.cronos.org)
- [Crypto.com AI Agent SDK](https://ai-agent-sdk-docs.crypto.com/)
- [Crypto.com Market Data MCP](https://mcp.crypto.com/docs)
- [Cronos x402 Integration Guide](https://docs.cronos.org/cronos-x402-facilitator/introduction)

---

## 🏆 **Hackathon Submission**

This project is built for the **Cronos x402 Paytech Hackathon** and includes:

- ✅ On-chain component (Cronos EVM)
- ✅ x402-compatible payment flows
- ✅ AI agent integration
- ✅ Crypto.com ecosystem integration
- ✅ Functional prototype

---

## 📚 **TEAM**

- Arturo Marin Bosquet
- Diego Raúl Barrionuevo

---

<div align="center">

**Made with 🔥 for Cronos x402 Paytech Hackathon**

</div>
