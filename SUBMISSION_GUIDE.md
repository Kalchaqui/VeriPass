# 📝 Guía de Submission - VeriScore

## 🎯 Información para DoraHacks Platform

### **Project Overview (1-2 párrafos)**

**Párrafo 1:**
VeriScore is a B2B credit scoring infrastructure that enables exchanges, banks, and financial institutions to access verifiable credit assessments on-chain. Built for the Cronos x402 Paytech Hackathon, VeriScore leverages blockchain technology, the x402 payment protocol, and AI agents to provide secure, transparent, and automated credit scoring services. The platform allows financial institutions to query user credit scores through a prepaid credit system, with all payments processed via x402 and verified on-chain on Cronos EVM.

**Párrafo 2:**
VeriScore integrates multiple Crypto.com ecosystem technologies including the AI Agent SDK for automated queries, Market Data MCP for enhanced scoring, and exposes credit scoring data via MCP Server for AI assistants like ChatGPT and Claude. The system includes three smart contracts deployed on Cronos Testnet (IdentityRegistry, CreditScoringMini, and VeriScoreSBT) and implements real x402 payments with on-chain verification. This project applies to four hackathon tracks: Main Track (x402 Applications), Agentic Finance Track, Crypto.com X Cronos Ecosystem Integrations, and Dev Tooling Track.

---

## 🔗 Links Requeridos

### **GitHub Repository**
```
https://github.com/Kalchaqui/VeriPass
```

### **Demo Video**
```
[Link de YouTube/Vimeo - agregar después de grabar]
```

### **Live Demo (Opcional)**
```
[Si tienes deploy en Vercel/Netlify]
```

---

## 🏆 Tracks de Participación

### **Seleccionar estos 4 tracks:**

1. ✅ **Main Track - x402 Applications (Broad Use Cases)**
   - AI agents using x402
   - Agent-triggered payments
   - AI-driven contract interactions

2. ✅ **x402 Agentic Finance/Payment Track**
   - Automated settlement pipelines
   - Multi-step x402 automation
   - Prepaid credit system

3. ✅ **Crypto.com X Cronos Ecosystem Integrations**
   - Crypto.com AI Agent SDK integration
   - Crypto.com Market Data MCP integration
   - Cronos EVM smart contracts

4. ✅ **Dev Tooling & Data Virtualization Track**
   - MCP Server for AI assistants
   - Data virtualization layer
   - Developer tooling for x402 agents

---

## 📋 Información Adicional para Submission

### **Key Features to Highlight:**
- ✅ Real x402 payments on Cronos Testnet (not simulated)
- ✅ 3 Smart contracts deployed and verified
- ✅ MCP Server with 3 tools (query_score, get_user_sbt, verify_identity)
- ✅ Crypto.com AI Agent SDK integration
- ✅ Crypto.com Market Data MCP integration
- ✅ On-chain payment verification
- ✅ B2B infrastructure for financial institutions

### **Technical Stack:**
- Frontend: Next.js 14, Privy, Wagmi, RainbowKit
- Backend: Node.js, Express, JWT
- Blockchain: Cronos EVM, Solidity 0.8.20, Hardhat
- Integrations: x402 Facilitator, Crypto.com AI Agent SDK, Market Data MCP, MCP Server

### **Smart Contracts (Cronos Testnet):**
- IdentityRegistry: `0x1997AC40627138BCc6Ee38C242A23852bac4250e`
- CreditScoringMini: `0x9C432BfC67208AA5F894E87ACE65D605DC1EF3Cb`
- VeriScoreSBT: `0x9C2Cb7711f9B4cA8C7F0E310F315A46CE79771cD`

**Links:**
- [IdentityRegistry on Cronos Explorer](https://explorer.cronos.org/testnet/address/0x1997AC40627138BCc6Ee38C242A23852bac4250e)
- [CreditScoringMini on Cronos Explorer](https://explorer.cronos.org/testnet/address/0x9C432BfC67208AA5F894E87ACE65D605DC1EF3Cb)
- [VeriScoreSBT on Cronos Explorer](https://explorer.cronos.org/testnet/address/0x9C2Cb7711f9B4cA8C7F0E310F315A46CE79771cD)

---

## ✅ Checklist Pre-Submission

### **Requisitos Obligatorios:**
- [x] Project Overview (1-2 párrafos) ✅
- [x] On-Chain Component (Cronos EVM) ✅
- [x] GitHub Repository (público) ✅
- [ ] Demo Video (máximo 3 minutos) ⏳
- [x] Functional Prototype ✅

### **Documentación:**
- [x] README.md completo ✅
- [x] Instrucciones de instalación ✅
- [x] Variables de entorno documentadas ✅
- [x] Licencia (MIT) ✅

### **Código:**
- [x] Código completo en GitHub ✅
- [x] .env en .gitignore ✅
- [x] Sin claves privadas en el código ✅
- [x] Un solo commit (para cumplir regla) ✅

### **Funcionalidad:**
- [x] Backend funciona ✅
- [x] Frontend funciona ✅
- [x] Login/Registro funciona ✅
- [x] Compra de créditos funciona (x402) ✅
- [x] Consulta de usuarios funciona ✅
- [x] Endpoints de AI agents responden ✅

---

## 🎬 Para el Demo Video

Ver `DEMO_VIDEO_SCRIPT.md` para el script completo.

**Puntos críticos a mostrar:**
1. ✅ Transacción x402 en Cronoscan
2. ✅ Contratos desplegados en Cronoscan
3. ✅ MCP Server funcionando
4. ✅ Integraciones Crypto.com

---

## 📝 Texto para Copiar en DoraHacks

### **Project Overview:**
```
VeriScore is a B2B credit scoring infrastructure that enables exchanges, banks, and financial institutions to access verifiable credit assessments on-chain. Built for the Cronos x402 Paytech Hackathon, VeriScore leverages blockchain technology, the x402 payment protocol, and AI agents to provide secure, transparent, and automated credit scoring services. The platform allows financial institutions to query user credit scores through a prepaid credit system, with all payments processed via x402 and verified on-chain on Cronos EVM.

VeriScore integrates multiple Crypto.com ecosystem technologies including the AI Agent SDK for automated queries, Market Data MCP for enhanced scoring, and exposes credit scoring data via MCP Server for AI assistants like ChatGPT and Claude. The system includes three smart contracts deployed on Cronos Testnet (IdentityRegistry, CreditScoringMini, and VeriScoreSBT) and implements real x402 payments with on-chain verification. This project applies to four hackathon tracks: Main Track (x402 Applications), Agentic Finance Track, Crypto.com X Cronos Ecosystem Integrations, and Dev Tooling Track.
```

### **Key Highlights:**
- Real x402 payments on Cronos Testnet with on-chain verification
- 3 Smart contracts deployed: IdentityRegistry, CreditScoringMini, VeriScoreSBT
- MCP Server exposing credit scoring data to AI assistants
- Crypto.com AI Agent SDK and Market Data MCP integrations
- B2B infrastructure for financial institutions
- Applies to 4 hackathon tracks

---

**¡Listo para hacer submission! 🚀**

