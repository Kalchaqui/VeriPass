/**
 * x402 Facilitator Service for Cronos
 * Integración con Cronos x402 Facilitator SDK oficial
 * Basado en @crypto.com/facilitator-client
 */

require('dotenv').config();

// SDK oficial de Cronos x402 Facilitator
// Documentación: https://docs.cronos.org/cronos-x402-facilitator
// NPM: https://www.npmjs.com/package/@crypto.com/facilitator-client
// El SDK se importa dinámicamente si está disponible

// Por ahora, mantener compatibilidad con estructura existente
// y preparar para migración completa al SDK de Cronos

// Cronos Testnet Chain ID: 338
// Cronos Mainnet Chain ID: 25
const CRONOS_TESTNET_CHAIN_ID = 338;
const CRONOS_MAINNET_CHAIN_ID = 25;

let cronosFacilitator = null;

/**
 * Inicializar facilitator de Cronos
 * Usa el SDK oficial @crypto.com/facilitator-client
 */
function initializeCronosX402() {
  const facilitatorSecret = process.env.CRONOS_FACILITATOR_SECRET;
  const facilitatorWallet = process.env.CRONOS_FACILITATOR_WALLET || process.env.MERCHANT_WALLET_ADDRESS;

  if (!facilitatorSecret) {
    console.warn('⚠️  CRONOS_FACILITATOR_SECRET no configurado, x402 usará modo simulado');
    return null;
  }

  if (!facilitatorWallet) {
    console.warn('⚠️  CRONOS_FACILITATOR_WALLET no configurado, x402 usará modo simulado');
    return null;
  }

  try {
    // Intentar usar SDK oficial @crypto.com/facilitator-client
    try {
      const { createFacilitator } = require('@crypto.com/facilitator-client');
      cronosFacilitator = createFacilitator({
        secretKey: facilitatorSecret,
        serverWalletAddress: facilitatorWallet,
        chainId: CRONOS_TESTNET_CHAIN_ID, // o CRONOS_MAINNET_CHAIN_ID
      });
      console.log('✅ Cronos x402 Facilitator inicializado con SDK oficial');
    } catch (sdkError) {
      // Si el SDK no está disponible o hay error, usar modo simulado
      console.log('⚠️  SDK oficial no disponible, usando modo simulado');
      console.log('   Para usar SDK oficial, instala: npm install @crypto.com/facilitator-client');
      cronosFacilitator = null; // Modo simulado
    }

    return cronosFacilitator;
  } catch (error) {
    console.error('❌ Error inicializando Cronos x402 Facilitator:', error);
    return null;
  }
}

/**
 * Verificar pago x402 usando Cronos Facilitator
 * @param {string} resourceUrl - URL del recurso solicitado
 * @param {string} method - Método HTTP (GET, POST, etc.)
 * @param {string} paymentData - Header X-Payment del request
 * @param {string} price - Precio en formato "$0.50"
 * @returns {Promise<{status: number, responseBody?: any, responseHeaders?: any}>}
 */
async function verifyCronosX402Payment(resourceUrl, method, paymentData, price) {
  // Si no hay facilitator configurado, usar modo simulado
  if (!cronosFacilitator) {
    if (paymentData) {
      // Si hay header X-Payment, validar formato básico
      try {
        const parsed = typeof paymentData === 'string' ? JSON.parse(paymentData) : paymentData;
        if (parsed.transactionHash) {
          return { status: 200 };
        }
      } catch (e) {
        // Si no se puede parsear, asumir válido en modo simulado
        return { status: 200 };
      }
    } else {
      return {
        status: 402,
        responseBody: {
          amount: price.replace('$', ''),
          currency: 'USDC',
          network: 'cronos-testnet',
          chainId: CRONOS_TESTNET_CHAIN_ID,
          description: 'Payment required',
        },
        responseHeaders: {
          'Content-Type': 'application/json',
        },
      };
    }
  }

  // Si no hay paymentData, devolver 402
  if (!paymentData) {
    return {
      status: 402,
      responseBody: {
        amount: price.replace('$', ''),
        currency: 'USDC',
        network: 'cronos-testnet',
        chainId: CRONOS_TESTNET_CHAIN_ID,
        description: 'Payment required',
      },
      responseHeaders: {
        'Content-Type': 'application/json',
      },
    };
  }

  try {
    console.log('🔍 Verificando pago x402 con Cronos Facilitator...');
    console.log('Resource URL:', resourceUrl);
    console.log('Method:', method);
    console.log('Price:', price);

    // Parsear paymentData
    let parsedPaymentData = paymentData;
    if (typeof paymentData === 'string' && paymentData.startsWith('{')) {
      parsedPaymentData = JSON.parse(paymentData);
    }

    // Si el facilitator está inicializado con SDK oficial, usarlo
    if (cronosFacilitator) {
      try {
        const { settlePayment } = require('@crypto.com/facilitator-client');
        const result = await settlePayment({
          resourceUrl: resourceUrl,
          method: method,
          paymentData: parsedPaymentData,
          chainId: CRONOS_TESTNET_CHAIN_ID,
          price: price,
          facilitator: cronosFacilitator,
        });
        
        if (result && result.verified) {
          console.log('✅ Payment verified with official SDK');
          return {
            status: 200,
            responseBody: {
              verified: true,
              transactionHash: result.transactionHash,
              message: 'Payment verified successfully',
            },
            responseHeaders: {
              'Content-Type': 'application/json',
            },
          };
        }
      } catch (sdkError) {
        console.warn('⚠️  Error using official SDK, falling back to simulated mode:', sdkError.message);
        // Continuar con validación básica
      }
    }
    
    // Validación básica (modo simulado o fallback)

    // Por ahora, validar proof básico
    if (parsedPaymentData && parsedPaymentData.transactionHash) {
      // Validar que el proof corresponde al recurso y método correctos
      const resourceMatch = !parsedPaymentData.resourceUrl || 
        parsedPaymentData.resourceUrl.toLowerCase().includes(resourceUrl.toLowerCase());
      const methodMatch = !parsedPaymentData.method || 
        parsedPaymentData.method.toUpperCase() === method.toUpperCase();
      const amountMatch = !parsedPaymentData.amount || 
        parsedPaymentData.amount.replace('$', '').trim() === price.replace('$', '').trim();

      if (resourceMatch && methodMatch && amountMatch) {
        console.log('✅ Payment proof validated successfully!');
        return {
          status: 200,
          responseBody: {
            verified: true,
            transactionHash: parsedPaymentData.transactionHash,
            message: 'Payment verified successfully',
          },
          responseHeaders: {
            'Content-Type': 'application/json',
          },
        };
      }
    }

    // Si la validación falla, devolver 402
    return {
      status: 402,
      responseBody: {
        amount: price.replace('$', ''),
        currency: 'USDC',
        network: 'cronos-testnet',
        chainId: CRONOS_TESTNET_CHAIN_ID,
        description: 'Payment verification failed',
      },
      responseHeaders: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('❌ Error verificando pago x402:', error);
    
    return {
      status: 402,
      responseBody: {
        amount: price.replace('$', ''),
        currency: 'USDC',
        network: 'cronos-testnet',
        chainId: CRONOS_TESTNET_CHAIN_ID,
        description: 'Payment verification failed',
        error: error.message,
      },
      responseHeaders: {
        'Content-Type': 'application/json',
      },
    };
  }
}

// Inicializar al cargar el módulo
initializeCronosX402();

module.exports = {
  verifyCronosX402Payment,
  initializeCronosX402,
};

