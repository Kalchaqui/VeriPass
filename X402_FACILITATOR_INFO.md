# 🔗 Información del Cronos x402 Facilitator

## 📚 Documentación Oficial

**API Reference:** https://docs.cronos.org/cronos-x402-facilitator/api-reference

## 🌐 Network Constants

### Cronos Testnet
- **Network String:** `cronos-testnet`
- **Chain ID:** `338`
- **RPC URL:** `https://evm-t3.cronos.org`
- **USDC.e Contract:** `0xc01efAaF7C5C61bEbFAeb358E1161b537b8bC0e0` (devUSDC.e)
- **Faucet:** https://faucet.cronos.org (para obtener devUSDC.e)

### Cronos Mainnet
- **Network String:** `cronos-mainnet`
- **Chain ID:** `25`
- **RPC URL:** `https://evm.cronos.org`
- **USDC.e Contract:** `0xf951eC28187D9E5Ca673Da8FE6757E6f0Be5F77C` (USDC.e)

## 🔌 Facilitator API

**Base URL:** `https://facilitator.cronoslabs.org/v2/x402`

### Endpoints Disponibles

#### 1. Health Check
```
GET https://facilitator.cronoslabs.org/healthcheck
```
No requiere autenticación. Retorna estado del servicio.

#### 2. Supported
```
GET https://facilitator.cronoslabs.org/v2/x402/supported
```
Retorna los tipos de pago soportados (schemes, networks, versions).

#### 3. Verify
```
POST https://facilitator.cronoslabs.org/v2/x402/verify
Headers:
  Content-Type: application/json
  X402-Version: 1
```
Valida un payment header sin ejecutar la transacción on-chain.

**Request Body:**
```json
{
  "x402Version": 1,
  "paymentHeader": "eyJ4NDAyVmVyc2lvbiI6MS4uLn0=",
  "paymentRequirements": {
    "scheme": "exact",
    "network": "cronos-testnet",
    "payTo": "0xSeller...",
    "asset": "0xc01efAaF7C5C61bEbFAeb358E1161b537b8bC0e0",
    "maxAmountRequired": "1000000",
    "maxTimeoutSeconds": 300
  }
}
```

**Success Response:**
```json
{
  "isValid": true,
  "invalidReason": null
}
```

#### 4. Settle
```
POST https://facilitator.cronoslabs.org/v2/x402/settle
Headers:
  Content-Type: application/json
  X402-Version: 1
```
Ejecuta un pago verificado on-chain usando EIP-3009 `transferWithAuthorization`.

**Request Body:** (Mismo formato que Verify)

**Success Response:**
```json
{
  "x402Version": 1,
  "event": "payment.settled",
  "txHash": "0xTxHash...",
  "from": "0xFrom...",
  "to": "0xPayTo...",
  "value": "1000000",
  "blockNumber": 17352,
  "network": "cronos-testnet",
  "timestamp": "2025-11-04T20:19:11.000Z"
}
```

## 💡 Características Importantes

### ✅ API Pública
- **NO requiere autenticación**
- **NO necesitas CRONOS_FACILITATOR_SECRET**
- Cualquiera puede usar el Facilitator API

### 🔐 EIP-3009
El Facilitator usa **EIP-3009 `transferWithAuthorization`**, no transfer directo. Esto permite:
- Pagos sin aprobación previa
- Firma off-chain
- Ejecución on-chain por el Facilitator

### 💰 USDC.e
- **6 decimales** (1 USDC.e = 1,000,000 unidades)
- En testnet: **devUSDC.e** (obtener del faucet)
- En mainnet: **USDC.e** (bridged USDC)

### ⚡ Rate Limits
- **Verify:** 10 requests/minuto por IP
- **Settle:** 5 requests/minuto por IP

## 📦 SDK Oficial

**Paquete NPM:** `@crypto.com/facilitator-client`

**Instalación:**
```bash
npm install @crypto.com/facilitator-client
```

**Documentación:**
- https://docs.cronos.org/cronos-x402-facilitator
- https://github.com/cronos-labs/x402-examples

## 🔧 Integración en VeriScore

El proyecto ya tiene:
- ✅ SDK instalado: `@crypto.com/facilitator-client` en `backend/package.json`
- ✅ Estructura preparada en `backend/src/services/x402FacilitatorCronos.js`
- ✅ Dirección USDC.e correcta en `frontend/lib/x402Payment.ts`
- ✅ Modo simulado funcionando para desarrollo

### Para Usar Facilitator Real

1. **Actualizar código para usar API directamente:**
   ```javascript
   const response = await fetch('https://facilitator.cronoslabs.org/v2/x402/verify', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'X402-Version': '1'
     },
     body: JSON.stringify({
       x402Version: 1,
       paymentHeader: base64EncodedHeader,
       paymentRequirements: { ... }
     })
   });
   ```

2. **O usar SDK:**
   ```javascript
   const { createFacilitator, verify, settle } = require('@crypto.com/facilitator-client');
   ```

## 📝 Notas para el Hackathon

- ✅ El Facilitator es público - no necesitas credenciales
- ✅ Puedes usar modo simulado para la demo
- ✅ Para producción, integra con los endpoints `/verify` y `/settle`
- ✅ Asegúrate de usar la dirección correcta de USDC.e según la red

## 🔗 Recursos

- **Documentación Completa:** https://docs.cronos.org/cronos-x402-facilitator
- **API Reference:** https://docs.cronos.org/cronos-x402-facilitator/api-reference
- **Quick Start:** https://docs.cronos.org/cronos-x402-facilitator/quick-start-for-buyers
- **Ejemplos:** https://github.com/cronos-labs/x402-examples
- **Faucet Testnet:** https://faucet.cronos.org

