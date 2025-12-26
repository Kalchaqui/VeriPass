# 🏆 VeriScore - Guía de Configuración para Hackathon Cronos x402

## ✅ Estado del Proyecto

### Completado
- ✅ Contratos desplegados en Cronos Testnet
- ✅ Integración x402 funcional (modo simulado y producción)
- ✅ Frontend con Next.js y Privy
- ✅ Backend con Express y JWT
- ✅ Sistema de créditos prepago
- ✅ Base de datos de usuarios mock (100 usuarios)
- ✅ Integraciones AI Agent, MCP Server, Market Data (funcionales para demo)

## 📋 Pasos para Configurar y Probar

### 1. Configurar Archivos de Entorno

#### Backend
```bash
cd backend
# Copiar el template y crear .env
copy env.template .env
# Editar .env con tus valores (ya tiene valores por defecto para testnet)
```

#### Frontend
```bash
cd frontend
# Copiar el template y crear .env.local
copy env.local.template .env.local
# Los valores ya están configurados para Cronos Testnet
```

### 2. Instalar Dependencias

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install

# Contratos (si necesitas compilar)
cd contracts
npm install
```

### 3. Iniciar Servidores

#### Terminal 1 - Backend
```bash
cd backend
npm start
# Debería iniciar en http://localhost:3001
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
# Debería iniciar en http://localhost:3000
```

### 4. Probar la Aplicación

1. **Login/Registro**
   - Navega a `http://localhost:3000/login`
   - Inicia sesión con Privy (email)

2. **Comprar Créditos**
   - Ve a Dashboard → Subscription
   - Selecciona cantidad de créditos (mínimo 10 = 0.2 USDC)
   - Conecta tu wallet a Cronos Testnet (Chain ID: 338)
   - Confirma el pago vía x402

3. **Consultar Usuarios**
   - Ve a Dashboard → Users
   - Busca usuarios (gratis)
   - Haz clic en "View" para ver detalles (consume 1 crédito)

4. **Ver Uso**
   - Ve a Dashboard → Usage
   - Revisa historial de compras y consumo

## 🔧 Configuración x402

### Modo Simulado (Para Desarrollo/Demo)
El proyecto está configurado para usar modo simulado por defecto:
- `X402_MODE=simulated` en `backend/.env`
- Funciona sin credenciales del Facilitator
- Acepta cualquier header `X-Payment` como válido

### Modo Producción (Para Hackathon)
Para usar pagos reales:
1. Obtener credenciales del Facilitator de Cronos
2. Actualizar `backend/.env`:
   ```
   X402_MODE=production
   CRONOS_FACILITATOR_SECRET=tu-secret-aqui
   CRONOS_FACILITATOR_WALLET=0x...
   ```

## 📊 Requisitos del Hackathon

### ✅ Cumplidos
- ✅ **Componente On-chain**: Contratos desplegados en Cronos Testnet
- ✅ **Protocolo x402**: Integrado y funcional
- ✅ **Integración AI Agents**: Servicio funcional con endpoints
- ✅ **Integración Crypto.com**: MCP Server y Market Data (modo demo)
- ✅ **Prototipo Funcional**: Aplicación completa end-to-end

### 📝 Para la Entrega

1. **Video de Demostración** (máximo 3 minutos)
   - Mostrar login/registro
   - Comprar créditos con x402
   - Consultar usuarios
   - Mostrar integraciones AI/MCP

2. **Documentación**
   - README.md (ya existe)
   - Este archivo (HACKATHON_SETUP.md)
   - Código abierto en GitHub

3. **Repositorio**
   - Código completo
   - Instrucciones de instalación
   - Variables de entorno documentadas

## 🔗 Direcciones de Contratos (Cronos Testnet)

- **IdentityRegistry**: `0x1997AC40627138BCc6Ee38C242A23852bac4250e`
- **CreditScoringMini**: `0x9C432BfC67208AA5F894E87ACE65D605DC1EF3Cb`
- **VeriScoreSBT**: `0x9C2Cb7711f9B4cA8C7F0E310F315A46CE79771cD`

Ver en Cronoscan: https://testnet.cronoscan.com

## 🚀 Endpoints API

### Autenticación
- `POST /api/auth/privy-login` - Sincronizar Privy con backend
- `GET /api/auth/me` - Obtener usuario autenticado

### Subscripciones (x402)
- `POST /api/subscriptions/purchase` - Comprar créditos (x402)
- `GET /api/subscriptions/balance` - Obtener balance
- `GET /api/subscriptions/usage` - Historial de uso

### Usuarios
- `GET /api/mockUsers/search` - Buscar usuarios (gratis)
- `GET /api/mockUsers/:id` - Detalles de usuario (1 crédito)

### AI Agents
- `POST /api/ai-agents/query-score` - Consultar score (x402)
- `POST /api/ai-agents/monitor-wallet` - Monitorear wallet
- `GET /api/ai-agents/health` - Health check

## 📚 Recursos

- [Cronos x402 Facilitator SDK](https://github.com/cronos-labs/x402-examples)
- [Cronos EVM Docs](https://docs.cronos.org)
- [Crypto.com AI Agent SDK](https://ai-agent-sdk-docs.crypto.com/)
- [Crypto.com Market Data MCP](https://mcp.crypto.com/docs)
- [Model Context Protocol](https://modelcontextprotocol.io)

## ⚠️ Notas Importantes

1. **USDC en Cronos Testnet**: La dirección actual es `0x5425890298aed601595a70AB815c96711a31Bc65`. Verificar si es correcta antes de usar en producción.

2. **Credenciales x402**: Para producción, obtener credenciales del Facilitator oficial de Cronos.

3. **Modo Demo**: Las integraciones de AI Agent y Market Data funcionan en modo demo/mock para el hackathon. Para producción, integrar con los SDKs oficiales.

4. **Base de Datos**: Actualmente usa archivos JSON. Para producción, migrar a PostgreSQL/MongoDB.

## 🎯 Checklist Pre-Entrega

- [ ] Archivos `.env` configurados
- [ ] Servidores funcionando (backend + frontend)
- [ ] Login/Registro probado
- [ ] Compra de créditos probada (x402)
- [ ] Consulta de usuarios probada
- [ ] Video de demostración grabado
- [ ] README actualizado
- [ ] Repositorio público en GitHub
- [ ] Código comentado y documentado

---

**¡Buena suerte en el hackathon! 🚀**

