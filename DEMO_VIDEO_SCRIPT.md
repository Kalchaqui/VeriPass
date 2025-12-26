# 🎬 Script para Demo Video - VeriScore

**Duración:** 3 minutos máximo  
**Objetivo:** Demostrar todas las integraciones y cumplimiento de requisitos del hackathon

---

## 📝 Script Detallado

### **0:00 - 0:30** - Introducción (30 segundos)

**Narración:**
> "VeriScore es una infraestructura B2B de scoring crediticio que permite a exchanges y bancos consultar puntuaciones de crédito verificables on-chain. Construido para el Cronos x402 Paytech Hackathon, integra blockchain, x402 payments, y AI agents."

**Pantalla:**
- Logo de VeriScore
- Texto: "Credit Scoring Infrastructure for Exchanges"
- Mencionar: "Aplica a 4 tracks del hackathon"

---

### **0:30 - 1:00** - x402 Payment Flow (30 segundos)

**Narración:**
> "El sistema usa x402 para micropagos. Cuando un exchange quiere comprar créditos, el backend responde con HTTP 402 Payment Required. El frontend genera un payment proof y ejecuta una transacción real en Cronos Testnet."

**Pantalla:**
1. Login con Privy (5s)
2. Dashboard → Subscription (5s)
3. Seleccionar 10 créditos (5s)
4. Conectar wallet (5s)
5. **Aprobar transacción en MetaMask** (5s)
6. **Mostrar transacción en Cronoscan** (5s) ⭐ **MUY IMPORTANTE**

**Links a mostrar:**
- https://explorer.cronos.org/testnet/address/[WALLET_ADDRESS]
- Mostrar la transacción de devUSDC.e

---

### **1:00 - 1:45** - Credit Scoring & On-Chain Data (45 segundos)

**Narración:**
> "Una vez que el pago es verificado on-chain, los créditos se agregan. Los exchanges pueden buscar usuarios y consultar sus puntuaciones. Todos los datos están verificados on-chain mediante contratos inteligentes en Cronos."

**Pantalla:**
1. Dashboard → Users (5s)
2. Buscar usuarios (filtros) (5s)
3. Ver detalles de un usuario (10s)
   - Mostrar: Email, Score, Verification Level, Wallet
4. **Mostrar contrato en Cronoscan** (10s) ⭐ **IMPORTANTE**
   - IdentityRegistry: `0x1997AC40627138BCc6Ee38C242A23852bac4250e`
   - CreditScoringMini: `0x9C432BfC67208AA5F894E87ACE65D605DC1EF3Cb`
   - VeriScoreSBT: `0x9C2Cb7711f9B4cA8C7F0E310F315A46CE79771cD`
5. Mostrar SBT en el contrato (10s)
6. Usage History (5s)

**Links a mostrar:**
- https://explorer.cronos.org/testnet/address/0x1997AC40627138BCc6Ee38C242A23852bac4250e
- https://explorer.cronos.org/testnet/address/0x9C432BfC67208AA5F894E87ACE65D605DC1EF3Cb
- https://explorer.cronos.org/testnet/address/0x9C2Cb7711f9B4cA8C7F0E310F315A46CE79771cD

---

### **1:45 - 2:30** - AI Agents & MCP Integration (45 segundos)

**Narración:**
> "VeriScore integra Crypto.com AI Agent SDK y expone datos vía MCP Server. Los agentes AI pueden consultar puntuaciones automáticamente. También integramos Crypto.com Market Data MCP para mejorar los scores con datos de mercado."

**Pantalla:**
1. **MCP Server** (15s)
   - Mostrar código o endpoint: `/api/mcp/health`
   - Mostrar herramientas: query_score, get_user_sbt, verify_identity
   - Mencionar compatibilidad con ChatGPT y Claude
2. **AI Agent Endpoints** (15s)
   - Mostrar: `/api/ai-agents/health`
   - Mostrar: `/api/ai-agents/query-score`
   - Mencionar integración con Crypto.com AI Agent SDK
3. **Market Data Integration** (10s)
   - Mostrar: `/api/market-data/price`
   - Mencionar Crypto.com Market Data MCP
4. **Backend logs** mostrando verificación on-chain (5s)

**Código a mostrar (opcional):**
```javascript
// MCP Server Tools
- query_score(walletAddress)
- get_user_sbt(walletAddress)
- verify_identity(walletAddress)
```

---

### **2:30 - 3:00** - Conclusión & Tracks (30 segundos)

**Narración:**
> "VeriScore aplica a 4 tracks del hackathon: Main Track, Agentic Finance, Crypto.com Integrations, y Dev Tooling. Es una infraestructura B2B completa con pagos x402 reales, contratos on-chain, y integraciones AI. Todo funcionando en Cronos Testnet."

**Pantalla:**
1. **Resumen visual** (10s)
   - ✅ x402 Payments (real testnet)
   - ✅ 3 Smart Contracts deployed
   - ✅ MCP Server
   - ✅ AI Agent SDK
   - ✅ Market Data MCP
2. **Tracks aplicables** (10s)
   - Track 1: Main Track
   - Track 2: Agentic Finance
   - Track 3: Crypto.com Integrations
   - Track 4: Dev Tooling
3. **GitHub link** (5s)
   - https://github.com/Kalchaqui/VeriPass
4. **Cierre** (5s)
   - "Made with 🔥 for Cronos x402 Paytech Hackathon"

---

## 🎯 Puntos Clave a Destacar

### **⭐ CRÍTICO - Debe aparecer:**
1. ✅ **Transacción x402 en Cronoscan** (mostrar el link y la transacción)
2. ✅ **Contratos desplegados** (mostrar los 3 contratos en Cronoscan)
3. ✅ **MCP Server** (mencionar y mostrar herramientas)
4. ✅ **Integraciones Crypto.com** (AI Agent SDK, Market Data MCP)

### **✅ Importante:**
- Login con Privy
- Compra de créditos con x402
- Búsqueda de usuarios
- On-chain verification

### **💡 Bonus:**
- Mostrar backend logs
- Mostrar código del MCP Server
- Mencionar los 4 tracks explícitamente

---

## 📋 Checklist Pre-Grabación

- [ ] Backend corriendo en `http://localhost:3001`
- [ ] Frontend corriendo en `http://localhost:3000`
- [ ] Wallet conectada con devUSDC.e
- [ ] Tener al menos 1 transacción x402 exitosa
- [ ] Tener links a los contratos en Cronoscan listos
- [ ] Tener links a transacciones en Cronoscan listos
- [ ] Terminal con backend logs visible
- [ ] Navegador con Cronoscan abierto

---

## 🎬 Tips para la Grabación

1. **Velocidad:** Habla claro pero no muy rápido
2. **Zoom:** Usa zoom para mostrar detalles importantes (transacciones, contratos)
3. **Transiciones:** Usa transiciones suaves entre secciones
4. **Audio:** Asegúrate de que el audio sea claro
5. **Resolución:** Graba en al menos 1080p
6. **Duración:** Mantén el video en 3 minutos o menos

---

## 📝 Texto para la Descripción del Video (YouTube)

```
VeriScore - Credit Scoring Infrastructure for Exchanges

🏆 Built for Cronos x402 Paytech Hackathon

VeriScore es una infraestructura B2B de scoring crediticio que integra:
✅ x402 Payments (real testnet)
✅ 3 Smart Contracts on Cronos EVM
✅ MCP Server para AI assistants
✅ Crypto.com AI Agent SDK
✅ Crypto.com Market Data MCP

Aplica a 4 tracks:
- Main Track (x402 Applications)
- Agentic Finance Track
- Crypto.com X Cronos Integrations
- Dev Tooling Track

GitHub: https://github.com/Kalchaqui/VeriPass

Contratos desplegados en Cronos Testnet:
- IdentityRegistry: 0x1997AC40627138BCc6Ee38C242A23852bac4250e
- CreditScoringMini: 0x9C432BfC67208AA5F894E87ACE65D605DC1EF3Cb
- VeriScoreSBT: 0x9C2Cb7711f9B4cA8C7F0E310F315A46CE79771cD

#Cronos #x402 #Hackathon #Blockchain #AI #MCP
```

---

**¡Buena suerte con la grabación! 🎬**

