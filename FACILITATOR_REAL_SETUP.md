# 🌐 Configurar Facilitator Real para Hackathon

## ✅ Sí, puedes usar el Facilitator Real en Testnet

Según la [documentación oficial](https://docs.cronos.org/cronos-x402-facilitator/api-reference), el Facilitator está **disponible públicamente en testnet** y **NO requiere autenticación**.

## 🚀 Cómo Activar el Facilitator Real

### 1. Actualizar `.env`

En `backend/.env`, cambia:

```env
# Cambiar de:
X402_MODE=simulated

# A:
X402_MODE=real
```

### 2. Verificar Configuración

Asegúrate de tener:

```env
# Merchant wallet que recibe los pagos
MERCHANT_WALLET_ADDRESS=0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed
CRONOS_FACILITATOR_WALLET=0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed

# Network (testnet por defecto)
# CRONOS_NETWORK=testnet  # o mainnet
```

### 3. Instalar Dependencias

El Facilitator real usa `axios` para hacer requests HTTP:

```bash
cd backend
npm install axios
```

### 4. Reiniciar Backend

```bash
npm start
```

Deberías ver:
```
🌐 Usando Facilitator REAL de Cronos
🔍 Verificando pago x402 con Facilitator REAL...
```

## 📋 Cómo Funciona

### Modo Simulado (X402_MODE=simulated)
- ✅ Acepta cualquier payment header como válido
- ✅ No hace llamadas a APIs externas
- ✅ Perfecto para desarrollo y demos
- ⚠️ No ejecuta transacciones reales

### Modo Real (X402_MODE=real)
- ✅ Usa Facilitator API real: `https://facilitator.cronoslabs.org/v2/x402`
- ✅ Verifica pagos con `/verify` endpoint
- ✅ Ejecuta pagos on-chain con `/settle` endpoint
- ✅ Transacciones reales en Cronos Testnet
- ✅ Más impresionante para el hackathon

## 🔍 Endpoints que se Usan

### 1. Health Check
```
GET https://facilitator.cronoslabs.org/healthcheck
```
Verifica que el Facilitator esté disponible.

### 2. Verify
```
POST https://facilitator.cronoslabs.org/v2/x402/verify
```
Valida el payment header sin ejecutar la transacción.

### 3. Settle
```
POST https://facilitator.cronoslabs.org/v2/x402/settle
```
Ejecuta el pago on-chain usando EIP-3009.

## 💰 USDC.e en Testnet

Para probar con Facilitator real, necesitas **devUSDC.e** en testnet:

1. **Faucet:** https://faucet.cronos.org
2. **Contrato:** `0xc01efAaF7C5C61bEbFAeb358E1161b537b8bC0e0` (devUSDC.e)
3. **6 decimales:** 1 devUSDC.e = 1,000,000 unidades

## ⚡ Rate Limits

- **Verify:** 10 requests/minuto por IP
- **Settle:** 5 requests/minuto por IP

## 🎯 Ventajas para el Hackathon

### Usar Facilitator Real:
- ✅ Muestra integración real con Cronos
- ✅ Transacciones on-chain verificables
- ✅ Más impresionante para los jueces
- ✅ Cumple mejor con "x402-compatible flows"

### Usar Modo Simulado:
- ✅ Más rápido para desarrollo
- ✅ No requiere devUSDC.e
- ✅ No depende de APIs externas
- ✅ Funciona sin conexión a internet

## 📝 Recomendación

**Para el hackathon, recomiendo usar `X402_MODE=real`** porque:
1. Muestra que realmente integraste x402
2. Las transacciones son verificables en Cronoscan
3. Es más impresionante para la evaluación
4. El Facilitator es público y gratuito

## 🔧 Troubleshooting

### Error: "Facilitator no disponible"
- Verifica tu conexión a internet
- Revisa: https://facilitator.cronoslabs.org/healthcheck

### Error: "Authorization already used"
- El nonce ya fue usado (no puedes reusar el mismo pago)

### Error: "Insufficient balance"
- Necesitas devUSDC.e en tu wallet
- Obtén del faucet: https://faucet.cronos.org

## 📚 Recursos

- **Documentación:** https://docs.cronos.org/cronos-x402-facilitator/api-reference
- **Ejemplos:** https://github.com/cronos-labs/x402-examples
- **Faucet:** https://faucet.cronos.org

---

**¡Listo para usar el Facilitator real! 🚀**

