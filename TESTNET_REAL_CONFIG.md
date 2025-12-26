# 🌐 Configuración para Testnet Real (No Simulado)

## ✅ Configuración Actual

Has configurado el proyecto para usar **TODO en modo REAL en testnet**:
- ✅ Facilitator real (no simulado)
- ✅ Transacciones reales on-chain
- ✅ Backend con wallet real para firmar transacciones

## 🔑 Wallet Generada

**Dirección:** `0xB293Af40a0cfa9Ed46b4B71cFAd9B4b0bAd61dc2`  
**Clave Privada:** `0x1953b164500cfeb48c83941117d82d41f7a7209ff25624c2790266ea990535ef`

⚠️ **IMPORTANTE:** Esta clave privada es SOLO para Cronos Testnet.

## 📝 Configuración en backend/.env

Tu archivo `backend/.env` debe tener:

```env
# x402 Payment Mode - REAL
X402_MODE=real

# Backend Private Key
BACKEND_PRIVATE_KEY=0x1953b164500cfeb48c83941117d82d41f7a7209ff25624c2790266ea990535ef

# Merchant Wallet
MERCHANT_WALLET_ADDRESS=0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed
CRONOS_FACILITATOR_WALLET=0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed
```

## 💰 Tokens Necesarios

### 1. TCRO (Cronos Testnet Native Token)
**Para:** Pagar gas fees en transacciones

**Obtener:**
- Faucet: https://cronos.org/faucet
- Dirección: `0xB293Af40a0cfa9Ed46b4B71cFAd9B4b0bAd61dc2`

### 2. devUSDC.e (USDC.e en Testnet)
**Para:** Recibir pagos x402

**Obtener:**
- Faucet: https://faucet.cronos.org
- Contrato: `0xc01efAaF7C5C61bEbFAeb358E1161b537b8bC0e0`
- Dirección merchant: `0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed`

## 🔒 Seguridad

### ⚠️ NUNCA hagas esto:
- ❌ Subir `.env` a GitHub
- ❌ Compartir la clave privada públicamente
- ❌ Usar esta clave en mainnet
- ❌ Incluir la clave en commits

### ✅ SÍ puedes hacer:
- ✅ Usar esta clave en testnet
- ✅ Guardarla localmente en `.env`
- ✅ Usarla para desarrollo y hackathon

## 🚀 Verificar que Funciona

### 1. Iniciar Backend
```bash
cd backend
npm start
```

Deberías ver:
```
🌐 Usando Facilitator REAL de Cronos
✅ Contracts initialized
🚀 VeriScore Backend running on port 3001
```

### 2. Verificar Facilitator
El backend hará health check automático al Facilitator:
```
🔍 Verificando pago x402 con Facilitator REAL...
```

### 3. Probar Compra de Créditos
1. Inicia frontend: `cd frontend && npm run dev`
2. Login con Privy
3. Ve a Dashboard → Subscription
4. Intenta comprar créditos
5. Conecta wallet con devUSDC.e
6. El pago se ejecutará REALMENTE en testnet

## 📊 Transacciones Reales

Con esta configuración:
- ✅ Todas las transacciones son REALES en Cronos Testnet
- ✅ Verificables en Cronoscan: https://testnet.cronoscan.com
- ✅ Usa Facilitator API real: https://facilitator.cronoslabs.org/v2/x402
- ✅ Transacciones on-chain con EIP-3009

## 🎯 Para el Hackathon

Esta configuración es **PERFECTA** para el hackathon porque:
- ✅ Muestra integración real con Cronos
- ✅ Transacciones verificables on-chain
- ✅ Usa Facilitator real (no simulado)
- ✅ Cumple con "x402-compatible flows"
- ✅ Más impresionante para los jueces

## 🔗 Links Útiles

- **Cronoscan Testnet:** https://testnet.cronoscan.com
- **Faucet TCRO:** https://cronos.org/faucet
- **Faucet devUSDC.e:** https://faucet.cronos.org
- **Facilitator API:** https://facilitator.cronoslabs.org/v2/x402
- **Tu Wallet en Cronoscan:** https://testnet.cronoscan.com/address/0xB293Af40a0cfa9Ed46b4B71cFAd9B4b0bAd61dc2

---

**¡Todo configurado para modo REAL en testnet! 🚀**

