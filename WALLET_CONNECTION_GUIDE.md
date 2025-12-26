# 🔗 Guía de Conexión de Wallet - VeriScore

## 📋 Diferencia entre Wallets

Tienes **2 wallets diferentes** con funciones distintas:

---

## 1️⃣ Wallet Merchant (0x544bBb...)

**Dirección:** `0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed`

### ✅ Función:
- **Recibe pagos** de los usuarios
- Es la wallet configurada en el backend como `MERCHANT_WALLET_ADDRESS`
- **NO es la wallet que usas para pagar**

### 💰 Tokens necesarios:
- **devUSDC.e**: Para recibir los pagos de los usuarios
- Esta wallet **recibe** el dinero, no lo envía

---

## 2️⃣ Wallet del Usuario (0x60BE76...)

**Dirección:** `0x60BE7646A7B9FdfC476C8e7dBDc14a3fDaCfa516`

### ✅ Función:
- **Hace los pagos** cuando compras créditos
- Es la wallet que está **conectada en el frontend** (MetaMask/Core Wallet)
- Esta es la wallet que **envía** el dinero

### 💰 Tokens necesarios:
- **devUSDC.e**: Para pagar cuando compras créditos
- **TCRO**: Para pagar gas fees

---

## 🔄 Flujo de Pago

```
Usuario (0x60BE76...) 
    ↓
    Paga 0.2 devUSDC.e
    ↓
Merchant (0x544bBb...) 
    ↓
    Recibe 0.2 devUSDC.e
```

---

## ❓ ¿Qué Wallet Debes Usar?

### Opción 1: Usar tu Wallet Merchant (0x544bBb...)

Si quieres usar la misma wallet que desplegó los contratos:

1. **Desconecta la wallet actual** en el frontend
2. **Conecta la wallet `0x544bBb...`** en MetaMask/Core Wallet
3. **Asegúrate de tener devUSDC.e** en esa wallet
4. **Asegúrate de estar en Cronos Testnet** (Chain ID: 338)

### Opción 2: Usar la Wallet Actual (0x60BE76...)

Si quieres seguir usando la wallet que ya está conectada:

1. **Obtén devUSDC.e** en la wallet `0x60BE7646A7B9FdfC476C8e7dBDc14a3fDaCfa516`
2. **Faucet:** https://faucet.cronos.org
3. **Ingresa la dirección:** `0x60BE7646A7B9FdfC476C8e7dBDc14a3fDaCfa516`
4. **Solicita devUSDC.e** (no solo TCRO)

---

## 🔍 Cómo Verificar qué Wallet Está Conectada

En el frontend, cuando estés en Dashboard → Subscription:
- Verás la dirección de la wallet conectada
- Debería mostrar: `0x60BE...` o `0x544b...`

---

## 💡 Recomendación

**Para el hackathon, te recomiendo:**

1. **Usar la wallet `0x544bBb...`** (tu wallet principal):
   - Ya la conoces
   - Ya desplegaste contratos con ella
   - Solo necesitas agregar devUSDC.e

2. **Pasos:**
   - Desconecta la wallet actual en el frontend
   - Conecta `0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed`
   - Obtén devUSDC.e del faucet: https://faucet.cronos.org
   - Intenta comprar créditos nuevamente

---

## 🔗 Links Útiles

- **Faucet devUSDC.e:** https://faucet.cronos.org
- **Tu Wallet Merchant:** https://testnet.cronoscan.com/address/0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed
- **Wallet Actual (0x60BE76...):** https://testnet.cronoscan.com/address/0x60BE7646A7B9FdfC476C8e7dBDc14a3fDaCfa516

---

**Resumen:** La wallet `0x544bBb...` recibe pagos. La wallet `0x60BE76...` hace pagos. Necesitas devUSDC.e en la wallet que está conectada en el frontend (la que hace el pago). ✅

