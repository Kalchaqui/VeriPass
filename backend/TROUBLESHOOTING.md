# 🔧 Troubleshooting - VeriScore Backend

## Error: EADDRINUSE - Puerto 3001 en uso

### Solución Rápida

Si ves el error `Error: listen EADDRINUSE: address already in use :::3001`:

1. **Encontrar el proceso:**
   ```powershell
   netstat -ano | findstr :3001
   ```

2. **Cerrar el proceso:**
   ```powershell
   # Reemplaza [número_del_PID] con el número real que aparece en netstat
   # Ejemplo: si el PID es 7876, usa:
   taskkill /PID 7876 /F
   ```

3. **O cambiar el puerto en `.env`:**
   ```env
   PORT=3002
   ```

### Verificar que el Backend Funciona

1. **Verificar que el puerto esté libre:**
   ```powershell
   netstat -ano | findstr :3001
   ```
   No debería mostrar nada si está libre.

2. **Iniciar el backend:**
   ```powershell
   cd backend
   npm start
   ```

3. **Deberías ver:**
   ```
   ✅ JWT_SECRET loaded from environment variables
   ✅ Contracts initialized
   🌐 Usando Facilitator REAL de Cronos
   🚀 VeriScore Backend running on port 3001
   ```

4. **Probar en el navegador:**
   - Abre: http://localhost:3001/health
   - Deberías ver: `{"status":"OK","message":"VeriScore Backend is running"}`

## Otros Errores Comunes

### Error: Cannot find module 'thirdweb'
**Solución:** Ya está arreglado. El código ahora carga thirdweb solo si es necesario.

### Error: Cannot find module 'axios'
**Solución:**
```powershell
cd backend
npm install axios
```

### Error: Facilitator no disponible
**Solución:** Verifica tu conexión a internet y que el Facilitator esté accesible:
- Health check: https://facilitator.cronoslabs.org/healthcheck

### Error: Contracts not initialized
**Solución:** Verifica que en tu `.env` tengas:
- `RPC_URL=https://evm-t3.cronos.org`
- Direcciones de contratos correctas

---

**Si tienes otros errores, compártelos y te ayudo a resolverlos.**

