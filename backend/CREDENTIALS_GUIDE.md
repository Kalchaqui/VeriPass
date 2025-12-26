# 🔑 Guía para Obtener Credenciales - VeriScore Backend

## 1. CRONOS_FACILITATOR_SECRET

### ✅ NO ES NECESARIO - El Facilitator es una API Pública

**Importante:** Según la [documentación oficial del Cronos x402 Facilitator](https://docs.cronos.org/cronos-x402-facilitator/api-reference), el Facilitator es una **API pública** que **NO requiere autenticación**.

El Facilitator API está disponible en:
- **URL Base:** `https://facilitator.cronoslabs.org/v2/x402`
- **Endpoints:**
  - `POST /v2/x402/verify` - Validar pago sin ejecutar
  - `POST /v2/x402/settle` - Ejecutar pago on-chain

### Para el Hackathon (Modo Simulado)
**✅ NO ES NECESARIO** configurar nada. El sistema funciona perfectamente en modo simulado.

El archivo `.env` ya está configurado con:
```
X402_MODE=simulated
```

### Para Producción (Usar Facilitator Real)
Puedes usar el Facilitator directamente sin credenciales:

1. **Usar API directamente:**
   - Hacer POST requests a `https://facilitator.cronoslabs.org/v2/x402/verify` o `/settle`
   - No requiere headers de autenticación
   - Ver documentación: https://docs.cronos.org/cronos-x402-facilitator/api-reference

2. **Usar SDK oficial:**
   - `@crypto.com/facilitator-client` (ya instalado en el proyecto)
   - Documentación: https://docs.cronos.org/cronos-x402-facilitator
   - Ejemplos: https://github.com/cronos-labs/x402-examples

**Nota:** El código ya está preparado para usar el SDK oficial cuando esté disponible.

---

## 2. BACKEND_PRIVATE_KEY

### ¿Qué es?
Es la clave privada de una wallet de Ethereum/Cronos que el backend usa para:
- Firmar transacciones on-chain (si es necesario)
- Interactuar con contratos inteligentes en modo escritura

### ¿Es necesario?
**NO es obligatorio** para el hackathon. El sistema funciona en modo solo lectura sin esta clave.

### Cómo obtenerla (si la necesitas)

#### Opción 1: Generar nueva wallet para testnet (Recomendado)
```bash
cd contracts
node scripts/generateWallet.js
```

Esto generará:
- Una nueva dirección de wallet
- Su clave privada
- Instrucciones para obtener tokens de testnet

**Copia la clave privada** y úsala en `backend/.env`:
```
BACKEND_PRIVATE_KEY=0x... (la clave que se mostró)
```

#### Opción 2: Usar wallet existente de testnet
Si ya tienes una wallet en MetaMask/Core Wallet configurada para Cronos Testnet:

1. **Exportar clave privada:**
   - MetaMask: Settings → Security & Privacy → Show Private Key
   - Core Wallet: Settings → Security → Export Private Key
   
2. **⚠️ SOLO para testnet** - Nunca exportes claves de mainnet

3. **Copia la clave** y úsala en `backend/.env`

#### Opción 3: Usar la misma wallet del deployer
Si usaste una wallet para desplegar los contratos:
- Usa esa misma clave privada
- Asegúrate de que tenga tokens de testnet (TCRO)

#### Opción 4: Dejar vacío (Solo lectura)
Si no necesitas que el backend ejecute transacciones:
```
BACKEND_PRIVATE_KEY=
```

El sistema funcionará en modo solo lectura (puede leer contratos pero no escribir).

---

## 3. Configuración Mínima para Hackathon

Para probar y entregar el proyecto, **solo necesitas**:

```env
# Backend/.env - Configuración mínima
PORT=3001
JWT_SECRET=veriscore-jwt-secret-change-in-production-2024
X402_MODE=simulated

# Contratos (ya configurados)
IDENTITY_REGISTRY_ADDRESS=0x1997AC40627138BCc6Ee38C242A23852bac4250e
CREDIT_SCORING_ADDRESS=0x9C432BfC67208AA5F894E87ACE65D605DC1EF3Cb
VERISCORE_SBT_ADDRESS=0x9C2Cb7711f9B4cA8C7F0E310F315A46CE79771cD
RPC_URL=https://evm-t3.cronos.org
MERCHANT_WALLET_ADDRESS=0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed

# Puedes dejar estos vacíos o con valores por defecto
CRONOS_FACILITATOR_SECRET=your-cronos-facilitator-secret-here
CRONOS_FACILITATOR_WALLET=0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed
THIRDWEB_SECRET_KEY=your-thirdweb-secret-key-here
THIRDWEB_SERVER_WALLET_ADDRESS=0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed
BACKEND_PRIVATE_KEY=
```

**Con esta configuración, la aplicación funcionará completamente para el hackathon.**

---

## 4. Verificar que Funciona

Después de configurar `.env`:

```bash
cd backend
npm start
```

Deberías ver:
```
🚀 VeriScore Backend running on port 3001
⚠️  CRONOS_FACILITATOR_SECRET no configurado, x402 usará modo simulado
⚠️  BACKEND_PRIVATE_KEY not configured, using read-only provider
✅ Contracts initialized
```

Estos warnings son **normales** y esperados para el hackathon.

---

## 5. Recursos Adicionales

- **Documentación Cronos x402:** https://docs.cronos.org/cronos-x402-facilitator
- **Ejemplos x402:** https://github.com/cronos-labs/x402-examples
- **Hackathon Info:** https://www.x402hackathon.com
- **Cronos Docs:** https://docs.cronos.org
- **Cronos Testnet Faucet:** https://cronos.org/faucet

---

## ⚠️ Seguridad

- **NUNCA** compartas tus claves privadas
- **NUNCA** subas archivos `.env` a GitHub
- **SOLO** usa claves de testnet en desarrollo
- **NUNCA** uses claves de mainnet en código

---

¿Tienes dudas? Revisa `HACKATHON_SETUP.md` para más información.

