/**
 * x402 Facilitator Service - Real API Integration
 * Integración directa con el Facilitator API público de Cronos
 * Documentación: https://docs.cronos.org/cronos-x402-facilitator/api-reference
 * 
 * Este servicio usa el Facilitator real en testnet/mainnet
 * NO requiere autenticación - es una API pública
 */

require('dotenv').config();
const axios = require('axios');
const { ethers } = require('ethers');

// Facilitator API Base URL
const FACILITATOR_BASE_URL = 'https://facilitator.cronoslabs.org/v2/x402';
const FACILITATOR_HEALTH_URL = 'https://facilitator.cronoslabs.org/healthcheck';

// Network constants
const CRONOS_TESTNET = {
  network: 'cronos-testnet',
  chainId: 338,
  usdcContract: '0xc01efAaF7C5C61bEbFAeb358E1161b537b8bC0e0', // devUSDC.e
};

const CRONOS_MAINNET = {
  network: 'cronos-mainnet',
  chainId: 25,
  usdcContract: '0xf951eC28187D9E5Ca673Da8FE6757E6f0Be5F77C', // USDC.e
};

// Configuración actual (testnet por defecto)
const CURRENT_NETWORK = process.env.CRONOS_NETWORK === 'mainnet' ? CRONOS_MAINNET : CRONOS_TESTNET;

/**
 * Health check del Facilitator
 */
async function checkFacilitatorHealth() {
  try {
    const response = await axios.get(FACILITATOR_HEALTH_URL);
    return {
      healthy: true,
      data: response.data,
    };
  } catch (error) {
    console.error('❌ Facilitator health check failed:', error.message);
    return {
      healthy: false,
      error: error.message,
    };
  }
}

/**
 * Verificar pago usando Facilitator API real
 * @param {string} paymentHeader - Payment header en Base64
 * @param {object} paymentRequirements - Requisitos del pago
 * @returns {Promise<{isValid: boolean, invalidReason?: string}>}
 */
async function verifyPayment(paymentHeader, paymentRequirements) {
  try {
    const response = await axios.post(
      `${FACILITATOR_BASE_URL}/verify`,
      {
        x402Version: 1,
        paymentHeader: paymentHeader,
        paymentRequirements: paymentRequirements,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X402-Version': '1',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('❌ Error verificando pago con Facilitator:', error.response?.data || error.message);
    return {
      isValid: false,
      invalidReason: error.response?.data?.invalidReason || error.message,
    };
  }
}

/**
 * Ejecutar pago usando Facilitator API real
 * @param {string} paymentHeader - Payment header en Base64
 * @param {object} paymentRequirements - Requisitos del pago
 * @returns {Promise<{success: boolean, txHash?: string, error?: string}>}
 */
async function settlePayment(paymentHeader, paymentRequirements) {
  try {
    const response = await axios.post(
      `${FACILITATOR_BASE_URL}/settle`,
      {
        x402Version: 1,
        paymentHeader: paymentHeader,
        paymentRequirements: paymentRequirements,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X402-Version': '1',
        },
      }
    );

    if (response.data.event === 'payment.settled') {
      return {
        success: true,
        txHash: response.data.txHash,
        blockNumber: response.data.blockNumber,
        from: response.data.from,
        to: response.data.to,
        value: response.data.value,
        timestamp: response.data.timestamp,
      };
    } else {
      return {
        success: false,
        error: response.data.error || 'Payment settlement failed',
      };
    }
  } catch (error) {
    console.error('❌ Error ejecutando pago con Facilitator:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error || error.message,
    };
  }
}

/**
 * Validar transacción directamente en la blockchain
 * @param {string} transactionHash - Hash de la transacción
 * @param {string} expectedAmount - Monto esperado en USDC (ej: "0.2")
 * @param {string} expectedTo - Dirección del destinatario esperado
 * @returns {Promise<{isValid: boolean, invalidReason?: string, receipt?: any}>}
 */
async function validateTransactionOnChain(transactionHash, expectedAmount, expectedTo) {
  try {
    console.log('🔍 Validando transacción en blockchain...');
    console.log('Transaction hash:', transactionHash);
    console.log('Expected amount:', expectedAmount);
    console.log('Expected to:', expectedTo);
    
    const rpcUrl = process.env.RPC_URL || 'https://evm-t3.cronos.org';
    console.log('RPC URL:', rpcUrl);
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    
    // Obtener el receipt de la transacción
    console.log('📡 Obteniendo receipt de la transacción...');
    const receipt = await provider.getTransactionReceipt(transactionHash);
    
    if (!receipt) {
      console.error('❌ Receipt no encontrado');
      return {
        isValid: false,
        invalidReason: 'Transaction not found on blockchain',
      };
    }
    
    console.log('✅ Receipt obtenido:', {
      blockNumber: receipt.blockNumber,
      status: receipt.status,
      logsCount: receipt.logs.length,
    });
    
    if (receipt.status !== 1) {
      console.error('❌ Transacción falló o fue revertida');
      return {
        isValid: false,
        invalidReason: 'Transaction failed or was reverted',
      };
    }
    
    // Obtener los logs de la transacción para encontrar el transfer de ERC20
    const usdcContract = CURRENT_NETWORK.usdcContract;
    const expectedAmountInUnits = BigInt(Math.floor(parseFloat(expectedAmount) * 1e6)); // USDC.e tiene 6 decimales
    
    console.log('🔍 Buscando evento Transfer...');
    console.log('USDC contract:', usdcContract);
    console.log('Expected amount in units:', expectedAmountInUnits.toString());
    console.log('Expected to (normalized):', expectedTo.toLowerCase());
    
    // Buscar el evento Transfer en los logs
    const transferEventSignature = ethers.id('Transfer(address,address,uint256)');
    console.log('Transfer event signature:', transferEventSignature);
    
    let transferFound = false;
    let actualAmount = BigInt(0);
    let actualTo = null;
    
    console.log('📋 Revisando', receipt.logs.length, 'logs...');
    for (let i = 0; i < receipt.logs.length; i++) {
      const log = receipt.logs[i];
      console.log(`Log ${i}:`, {
        address: log.address,
        topicsCount: log.topics.length,
        firstTopic: log.topics[0],
        dataLength: log.data.length,
      });
      
      if (log.address.toLowerCase() === usdcContract.toLowerCase()) {
        console.log('✅ Log corresponde al contrato USDC');
        
        if (log.topics[0] === transferEventSignature) {
          console.log('✅ Log es un evento Transfer');
          
          // Decodificar el evento Transfer
          // topics[0] = Transfer signature
          // topics[1] = from address (indexed)
          // topics[2] = to address (indexed)
          // data = amount (uint256)
          
          if (log.topics.length >= 3) {
            const toAddress = '0x' + log.topics[2].slice(-40);
            const amount = BigInt(log.data);
            
            console.log('Transfer encontrado:', {
              from: log.topics[1] ? '0x' + log.topics[1].slice(-40) : 'N/A',
              to: toAddress,
              amount: amount.toString(),
              amountFormatted: (Number(amount) / 1e6).toFixed(6),
            });
            
            if (toAddress.toLowerCase() === expectedTo.toLowerCase()) {
              console.log('✅ Transfer al destinatario correcto');
              transferFound = true;
              actualAmount = amount;
              actualTo = toAddress;
              break;
            } else {
              console.log('⚠️  Transfer a otro destinatario:', toAddress);
            }
          } else {
            console.log('⚠️  Log Transfer no tiene suficientes topics');
          }
        }
      }
    }
    
    if (!transferFound) {
      console.error('❌ No se encontró transfer de USDC al destinatario esperado');
      return {
        isValid: false,
        invalidReason: 'No USDC transfer found to expected recipient',
      };
    }
    
    console.log('✅ Transfer encontrado:', {
      to: actualTo,
      amount: actualAmount.toString(),
      amountFormatted: (Number(actualAmount) / 1e6).toFixed(6),
      expectedAmount: expectedAmountInUnits.toString(),
    });
    
    if (actualAmount < expectedAmountInUnits) {
      console.error('❌ Monto insuficiente');
      return {
        isValid: false,
        invalidReason: `Insufficient amount: expected ${expectedAmountInUnits}, got ${actualAmount}`,
      };
    }
    
    console.log('✅ Validación exitosa');
    return {
      isValid: true,
      receipt: {
        blockNumber: receipt.blockNumber,
        transactionHash: receipt.transactionHash,
        from: receipt.from,
        to: actualTo,
        amount: actualAmount.toString(),
        amountFormatted: (Number(actualAmount) / 1e6).toFixed(6),
      },
    };
  } catch (error) {
    console.error('❌ Error validando transacción:', error);
    console.error('Error stack:', error.stack);
    return {
      isValid: false,
      invalidReason: error.message || 'Error validating transaction',
    };
  }
}

/**
 * Verificar pago x402 usando Facilitator real
 * @param {string} resourceUrl - URL del recurso
 * @param {string} method - Método HTTP
 * @param {string} paymentData - Payment header o data
 * @param {string} price - Precio en formato "$0.50"
 * @returns {Promise<{status: number, responseBody?: any}>}
 */
async function verifyX402PaymentReal(resourceUrl, method, paymentData, price) {
  try {
    console.log('🔍 Verificando pago x402 con Facilitator REAL...');
    console.log('Resource URL:', resourceUrl);
    console.log('Method:', method);
    console.log('Price:', price);

    // Si no hay paymentData, devolver 402
    if (!paymentData) {
      return {
        status: 402,
        responseBody: {
          amount: price.replace('$', ''),
          currency: 'USDC.e',
          network: CURRENT_NETWORK.network,
          chainId: CURRENT_NETWORK.chainId,
          asset: CURRENT_NETWORK.usdcContract,
          description: 'Payment required',
          facilitatorUrl: FACILITATOR_BASE_URL,
        },
      };
    }

    // Parsear paymentData
    let parsedPaymentData = null;
    let paymentHeader;
    let paymentRequirements;
    let transactionHash = null;

    // Si paymentData es un objeto JSON
    if (typeof paymentData === 'string' && paymentData.startsWith('{')) {
      try {
        parsedPaymentData = JSON.parse(paymentData);
        transactionHash = parsedPaymentData.transactionHash;
        paymentHeader = parsedPaymentData.paymentHeader;
        paymentRequirements = parsedPaymentData.paymentRequirements;
      } catch (e) {
        console.error('Error parsing paymentData:', e);
      }
    } else {
      paymentHeader = paymentData;
    }

    // Si hay transactionHash, validar directamente en la blockchain
    // Esto es un fallback para cuando el frontend envía un transfer directo
    // en lugar de un paymentHeader EIP-3009
    if (transactionHash) {
      console.log('📦 Payment data contiene transactionHash, validando directamente en blockchain...');
      console.log('Transaction hash:', transactionHash);
      console.log('Parsed payment data:', JSON.stringify(parsedPaymentData, null, 2));
      
      const expectedAmount = price.replace('$', '').trim();
      const expectedTo = process.env.MERCHANT_WALLET_ADDRESS || process.env.CRONOS_FACILITATOR_WALLET;
      
      console.log('Expected amount:', expectedAmount);
      console.log('Expected to (MERCHANT_WALLET_ADDRESS):', expectedTo);
      console.log('MERCHANT_WALLET_ADDRESS from env:', process.env.MERCHANT_WALLET_ADDRESS);
      console.log('CRONOS_FACILITATOR_WALLET from env:', process.env.CRONOS_FACILITATOR_WALLET);
      
      if (!expectedTo) {
        console.error('❌ MERCHANT_WALLET_ADDRESS no configurado');
        return {
          status: 402,
          responseBody: {
            amount: expectedAmount,
            currency: 'USDC.e',
            network: CURRENT_NETWORK.network,
            description: 'Payment verification failed: merchant wallet not configured',
          },
        };
      }
      
      const validation = await validateTransactionOnChain(transactionHash, expectedAmount, expectedTo);
      
      if (validation.isValid) {
        console.log('✅ Transacción validada exitosamente en blockchain');
        console.log('Receipt:', validation.receipt);
        
        // Validar también que el proof corresponde al recurso y método correctos
        const resourceMatch = !parsedPaymentData?.resourceUrl || 
          parsedPaymentData.resourceUrl.toLowerCase().includes(resourceUrl.toLowerCase());
        const methodMatch = !parsedPaymentData?.method || 
          parsedPaymentData.method.toUpperCase() === method.toUpperCase();
        const amountMatch = !parsedPaymentData?.amount || 
          parsedPaymentData.amount.replace('$', '').trim() === expectedAmount;
        
        if (resourceMatch && methodMatch && amountMatch) {
          return {
            status: 200,
            responseBody: {
              verified: true,
              transactionHash: transactionHash,
              blockNumber: validation.receipt.blockNumber,
              from: validation.receipt.from,
              to: validation.receipt.to,
              amount: validation.receipt.amountFormatted,
              message: 'Payment verified successfully on-chain',
            },
          };
        } else {
          console.warn('⚠️  Validación de blockchain OK, pero metadata no coincide:', {
            resourceMatch,
            methodMatch,
            amountMatch,
          });
          // Aceptar de todas formas si la transacción es válida
          return {
            status: 200,
            responseBody: {
              verified: true,
              transactionHash: transactionHash,
              blockNumber: validation.receipt.blockNumber,
              message: 'Payment verified successfully on-chain',
            },
          };
        }
      } else {
        console.error('❌ Validación de transacción falló:', validation.invalidReason);
        return {
          status: 402,
          responseBody: {
            amount: expectedAmount,
            currency: 'USDC.e',
            network: CURRENT_NETWORK.network,
            description: 'Payment verification failed',
            error: validation.invalidReason,
          },
        };
      }
    }

    // Si no hay transactionHash, intentar usar el Facilitator API con paymentHeader EIP-3009
    // Verificar que el Facilitator esté disponible
    const health = await checkFacilitatorHealth();
    if (!health.healthy) {
      console.warn('⚠️  Facilitator no disponible y no hay transactionHash');
      return {
        status: 402,
        responseBody: {
          amount: price.replace('$', ''),
          currency: 'USDC.e',
          network: CURRENT_NETWORK.network,
          description: 'Payment required - Facilitator unavailable',
        },
      };
    }

    // Si no hay paymentRequirements, construirlos
    if (!paymentRequirements) {
      const amountInUnits = Math.floor(parseFloat(price.replace('$', '')) * 1e6); // USDC.e tiene 6 decimales
      paymentRequirements = {
        scheme: 'exact',
        network: CURRENT_NETWORK.network,
        payTo: process.env.MERCHANT_WALLET_ADDRESS || process.env.CRONOS_FACILITATOR_WALLET,
        asset: CURRENT_NETWORK.usdcContract,
        maxAmountRequired: amountInUnits.toString(),
        maxTimeoutSeconds: 300,
      };
    }

    // Verificar pago con Facilitator
    const verifyResult = await verifyPayment(paymentHeader, paymentRequirements);

    if (!verifyResult.isValid) {
      console.log('❌ Pago no válido:', verifyResult.invalidReason);
      return {
        status: 402,
        responseBody: {
          amount: price.replace('$', ''),
          currency: 'USDC.e',
          network: CURRENT_NETWORK.network,
          description: 'Payment verification failed',
          error: verifyResult.invalidReason,
        },
      };
    }

    // Si la verificación es exitosa, ejecutar el pago (settle)
    console.log('✅ Pago verificado, ejecutando settlement...');
    const settleResult = await settlePayment(paymentHeader, paymentRequirements);

    if (settleResult.success) {
      console.log('✅ Pago ejecutado exitosamente:', settleResult.txHash);
      return {
        status: 200,
        responseBody: {
          verified: true,
          settled: true,
          transactionHash: settleResult.txHash,
          blockNumber: settleResult.blockNumber,
          message: 'Payment verified and settled successfully',
        },
      };
    } else {
      console.error('❌ Error ejecutando pago:', settleResult.error);
      return {
        status: 402,
        responseBody: {
          amount: price.replace('$', ''),
          currency: 'USDC.e',
          network: CURRENT_NETWORK.network,
          description: 'Payment settlement failed',
          error: settleResult.error,
        },
      };
    }
  } catch (error) {
    console.error('❌ Error en verifyX402PaymentReal:', error);
    return {
      status: 402,
      responseBody: {
        amount: price.replace('$', ''),
        currency: 'USDC.e',
        network: CURRENT_NETWORK.network,
        description: 'Payment verification failed',
        error: error.message,
      },
    };
  }
}

module.exports = {
  verifyX402PaymentReal,
  verifyPayment,
  settlePayment,
  checkFacilitatorHealth,
  CURRENT_NETWORK,
};

