# 🔑 Explicación de las Wallets - VeriScore

## 📋 Resumen de las Wallets

Tienes **2 wallets diferentes** con propósitos distintos:

---

## 1️⃣ Wallet de MetaMask (Deployer/Merchant)

**Dirección:** `0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed`  
**Clave Privada:** `c8d43412110c890111528de4aec9204a9b78b0729d3a45610efdc0bb0764d53b`

### ✅ Para qué se usa:
- ✅ **Desplegar contratos** (ya desplegaste los contratos con esta wallet)
- ✅ **Recibir pagos x402** (MERCHANT_WALLET_ADDRESS)
- ✅ **Facilitator wallet** (CRONOS_FACILITATOR_WALLET)
- ✅ **Wallet del servidor** (THIRDWEB_SERVER_WALLET_ADDRESS)

### 📝 Configuración:
```env
# En backend/.env
MERCHANT_WALLET_ADDRESS=0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed
CRONOS_FACILITATOR_WALLET=0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed
THIRDWEB_SERVER_WALLET_ADDRESS=0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed
```

### 💰 Tokens necesarios:
- **devUSDC.e**: Para recibir pagos de los usuarios
- **TCRO**: Para gas fees (si necesitas hacer transacciones)

**Faucet:** https://faucet.cronos.org

---

## 2️⃣ Wallet Generada (Backend)

**Dirección:** `0xB293Af40a0cfa9Ed46b4B71cFAd9B4b0bAd61dc2`  
**Clave Privada:** `0x1953b164500cfeb48c83941117d82d41f7a7209ff25624c2790266ea990535ef`

### ✅ Para qué se usa:
- ✅ **Firmar transacciones desde el backend** (BACKEND_PRIVATE_KEY)
- ✅ **Interactuar con contratos en modo escritura** (si el backend necesita ejecutar transacciones)
- ✅ **Operaciones automatizadas del backend**

### 📝 Configuración:
```env
# En backend/.env
BACKEND_PRIVATE_KEY=0x1953b164500cfeb48c83941117d82d41f7a7209ff25624c2790266ea990535ef
```

### 💰 Tokens necesarios:
- **TCRO**: Para pagar gas fees cuando el backend ejecuta transacciones

**Faucet:** https://cronos.org/faucet

---

## 🎯 Diferencia Clave

| Aspecto | Wallet MetaMask | Wallet Backend |
|---------|----------------|----------------|
| **Propósito** | Recibir pagos (Merchant) | Firmar transacciones del backend |
| **Quién la usa** | Sistema de pagos x402 | Backend (servidor) |
| **Cuándo se usa** | Cuando usuarios compran créditos | Cuando backend necesita ejecutar transacciones |
| **Tokens necesarios** | devUSDC.e (recibir pagos) | TCRO (gas fees) |

---

## 🔄 Flujo de Pagos

1. **Usuario compra créditos:**
   - Usuario paga con su wallet → **Wallet MetaMask recibe** (`0x544bBb...`)
   - El Facilitator ejecuta la transacción
   - Los devUSDC.e van a la wallet merchant

2. **Backend ejecuta transacciones:**
   - Si el backend necesita interactuar con contratos (escribir)
   - Usa la **Wallet Backend** (`0xB293Af...`) para firmar
   - Paga gas fees con TCRO de esta wallet

---

## ⚠️ Importante

### Wallet MetaMask (`0x544bBb...`):
- ✅ Ya está configurada en el proyecto
- ✅ Ya desplegó los contratos
- ✅ Recibirá los pagos de los usuarios
- ⚠️ Necesita devUSDC.e para recibir pagos

### Wallet Backend (`0xB293Af...`):
- ✅ Ya está configurada como BACKEND_PRIVATE_KEY
- ✅ Solo se usa si el backend necesita ejecutar transacciones
- ⚠️ Necesita TCRO para gas fees (si ejecuta transacciones)
- ⚠️ **NO debe recibir pagos** - esa es función de la wallet merchant

---

## 💡 Recomendación

### Para el Hackathon:

1. **Wallet MetaMask (`0x544bBb...`):**
   - Asegúrate de tener **devUSDC.e** en esta wallet
   - Esta es la que recibe los pagos
   - Ver en Cronoscan: https://testnet.cronoscan.com/address/0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed

2. **Wallet Backend (`0xB293Af...`):**
   - Si el backend solo lee contratos, no necesita tokens
   - Si ejecuta transacciones, necesita TCRO
   - Ver en Cronoscan: https://testnet.cronoscan.com/address/0xB293Af40a0cfa9Ed46b4B71cFAd9B4b0bAd61dc2

---

## 🔗 Links Útiles

- **Wallet Merchant en Cronoscan:** https://testnet.cronoscan.com/address/0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed
- **Wallet Backend en Cronoscan:** https://testnet.cronoscan.com/address/0xB293Af40a0cfa9Ed46b4B71cFAd9B4b0bAd61dc2
- **Faucet TCRO:** https://cronos.org/faucet
- **Faucet devUSDC.e:** https://faucet.cronos.org

---

**Resumen:** La wallet de MetaMask recibe pagos, la wallet del backend firma transacciones. ✅

