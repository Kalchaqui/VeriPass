/**
 * AI Agents Routes
 * Endpoints para que agentes AI interactúen con VeriScore
 */

const express = require('express');
const router = express.Router();
const aiAgentService = require('../services/aiAgentService');
const { verifyX402Payment } = require('../services/x402Facilitator');

/**
 * POST /api/ai-agents/query-score
 * Endpoint para agentes que consulten scores
 * Requiere pago x402
 */
router.post('/query-score', async (req, res) => {
  try {
    const { walletAddress, agentId } = req.body;

    if (!walletAddress || !agentId) {
      return res.status(400).json({
        error: 'Missing required fields: walletAddress, agentId',
      });
    }

    // Verificar pago x402
    const resourceUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const paymentData = req.headers['x-payment'];
    const paymentResult = await verifyX402Payment(
      resourceUrl,
      'POST',
      paymentData,
      '$0.50' // Precio por consulta de score
    );

    if (paymentResult.status === 402) {
      return res.status(402).json(paymentResult.responseBody);
    }

    // Consultar score
    const result = await aiAgentService.queryScoreForAgent(walletAddress, agentId);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error in query-score endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * POST /api/ai-agents/monitor-wallet
 * Endpoint para iniciar monitoreo automático de wallet
 * Requiere pago x402
 */
router.post('/monitor-wallet', async (req, res) => {
  try {
    const { walletAddress, agentId, callbackUrl } = req.body;

    if (!walletAddress || !agentId) {
      return res.status(400).json({
        error: 'Missing required fields: walletAddress, agentId',
      });
    }

    // Verificar pago x402
    const resourceUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const paymentData = req.headers['x-payment'];
    const paymentResult = await verifyX402Payment(
      resourceUrl,
      'POST',
      paymentData,
      '$1.00' // Precio por monitoreo
    );

    if (paymentResult.status === 402) {
      return res.status(402).json(paymentResult.responseBody);
    }

    // Iniciar monitoreo
    const callback = callbackUrl ? async (data) => {
      // En una implementación real, harías un POST a callbackUrl
      console.log('Monitoring callback:', data);
    } : null;

    const result = await aiAgentService.monitorWallet(walletAddress, agentId, callback);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error in monitor-wallet endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * POST /api/ai-agents/execute-action
 * Endpoint para ejecutar acciones automáticas
 * Requiere pago x402
 */
router.post('/execute-action', async (req, res) => {
  try {
    const { walletAddress, action, agentId } = req.body;

    if (!walletAddress || !action || !agentId) {
      return res.status(400).json({
        error: 'Missing required fields: walletAddress, action, agentId',
      });
    }

    // Verificar pago x402
    const resourceUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const paymentData = req.headers['x-payment'];
    const paymentResult = await verifyX402Payment(
      resourceUrl,
      'POST',
      paymentData,
      '$0.50' // Precio por acción
    );

    if (paymentResult.status === 402) {
      return res.status(402).json(paymentResult.responseBody);
    }

    // Ejecutar acción
    const result = await aiAgentService.executeAgentAction(walletAddress, action, agentId);

    res.json(result);
  } catch (error) {
    console.error('Error in execute-action endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * GET /api/ai-agents/health
 * Health check para agentes AI
 */
router.get('/health', async (req, res) => {
  try {
    const health = await aiAgentService.agentHealthCheck();
    res.json(health);
  } catch (error) {
    console.error('Error in health check:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

module.exports = router;

