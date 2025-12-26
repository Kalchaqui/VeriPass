# ✅ Checklist Final - VeriScore para Hackathon

## 🔧 Configuración Backend (.env)

### ✅ Variables Requeridas

```env
# Server
PORT=3001
JWT_SECRET=veriscore-jwt-secret-change-in-production-2024

# x402 Mode - REAL
X402_MODE=real

# Contratos Cronos Testnet
IDENTITY_REGISTRY_ADDRESS=0x1997AC40627138BCc6Ee38C242A23852bac4250e
CREDIT_SCORING_ADDRESS=0x9C432BfC67208AA5F894E87ACE65D605DC1EF3Cb
VERISCORE_SBT_ADDRESS=0x9C2Cb7711f9B4cA8C7F0E310F315A46CE79771cD
RPC_URL=https://evm-t3.cronos.org

# Wallets
MERCHANT_WALLET_ADDRESS=0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed
CRONOS_FACILITATOR_WALLET=0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed
BACKEND_PRIVATE_KEY=0x1953b164500cfeb48c83941117d82d41f7a7209ff25624c2790266ea990535ef
```

## 🔧 Configuración Frontend (.env.local)

### ✅ Variables Requeridas

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_CHAIN_ID=338

NEXT_PUBLIC_PRIVY_APP_ID=cmix50iqa00d7l90c8nmrshne
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=95c681fed611038183e9f022713f6212
NEXT_PUBLIC_THIRDWEB_SERVER_WALLET_ADDRESS=0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed

NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS=0x1997AC40627138BCc6Ee38C242A23852bac4250e
NEXT_PUBLIC_CREDIT_SCORING_ADDRESS=0x9C432BfC67208AA5F894E87ACE65D605DC1EF3Cb
NEXT_PUBLIC_VERISCORE_SBT_ADDRESS=0x9C2Cb7711f9B4cA8C7F0E310F315A46CE79771cD
NEXT_PUBLIC_MERCHANT_WALLET_ADDRESS=0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed
```

## 🚀 Probar que Funciona

### 1. Iniciar Backend
```bash
cd backend
npm start
```

**Deberías ver:**
```
🌐 Usando Facilitator REAL de Cronos
✅ Contracts initialized
🚀 VeriScore Backend running on port 3001
```

### 2. Iniciar Frontend
```bash
cd frontend
npm run dev
```

**Deberías ver:**
```
- Local: http://localhost:3000
```

### 3. Probar Flujo Completo
1. ✅ Ir a http://localhost:3000/login
2. ✅ Login con Privy
3. ✅ Dashboard → Subscription
4. ✅ Comprar créditos (conecta wallet con devUSDC.e)
5. ✅ Dashboard → Users (buscar usuarios)
6. ✅ Dashboard → Usage (ver historial)

## 💰 Tokens Necesarios

### Wallet Merchant (0x544bBb...)
- **devUSDC.e**: Para recibir pagos
- **Faucet:** https://faucet.cronos.org

### Wallet Backend (0xB293Af...)
- **TCRO**: Para gas fees (si ejecuta transacciones)
- **Faucet:** https://cronos.org/faucet

## ✅ Estado del Proyecto

- ✅ Contratos desplegados en Cronos Testnet
- ✅ Facilitator REAL configurado (no simulado)
- ✅ Backend con wallet real
- ✅ Frontend configurado
- ✅ Integraciones AI/MCP preparadas
- ✅ Todo en modo REAL (testnet)

## 📝 Pendiente para Entrega

- [ ] Subir código a GitHub (público)
- [ ] Grabar demo video (máximo 3 minutos)
- [ ] Hacer submission en DoraHacks
- [ ] Verificar que todo funciona end-to-end

## 🔗 Links Importantes

- **Cronoscan Testnet:** https://testnet.cronoscan.com
- **Wallet Merchant:** https://testnet.cronoscan.com/address/0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed
- **Wallet Backend:** https://testnet.cronoscan.com/address/0xB293Af40a0cfa9Ed46b4B71cFAd9B4b0bAd61dc2
- **Facilitator API:** https://facilitator.cronoslabs.org/v2/x402
- **Faucet TCRO:** https://cronos.org/faucet
- **Faucet devUSDC.e:** https://faucet.cronos.org

---

**¡Todo listo para el hackathon! 🚀**

