/**
 * MCP Server for VeriScore
 * Expone datos de scoring vía Model Context Protocol (MCP)
 * Permite que agentes AI (ChatGPT, Claude) accedan a datos de VeriScore
 * 
 * Para el hackathon: Implementación funcional que expone herramientas MCP
 * Compatible con Model Context Protocol para integración con AI assistants
 */

require('dotenv').config();

// Documentación MCP: https://modelcontextprotocol.io
// Para integración completa, usar @modelcontextprotocol/server-sdk

const { queryScoreForAgent, executeAgentAction } = require('./aiAgentService');
const { getScore, getUserSBT, verifyIdentity } = require('./contracts');

/**
 * Inicializar servidor MCP
 * Expone herramientas que los agentes pueden usar
 * 
 * Para el hackathon: Implementación funcional que puede ser extendida
 * con el SDK oficial de MCP cuando esté disponible
 */
function initializeMCPServer() {
  console.log('🔌 Initializing VeriScore MCP Server...');
  
  // Servidor MCP funcional para hackathon
  // Expone herramientas que los agentes AI pueden usar
  const tools = {
    query_score: {
      name: 'query_score',
      description: 'Query credit score for a wallet address',
      parameters: {
        type: 'object',
        properties: {
          walletAddress: {
            type: 'string',
            description: 'The wallet address to query',
          },
        },
        required: ['walletAddress'],
      },
    },
    get_user_sbt: {
      name: 'get_user_sbt',
      description: 'Get VeriScore SBT (Soulbound Token) for a wallet',
      parameters: {
        type: 'object',
        properties: {
          walletAddress: {
            type: 'string',
            description: 'The wallet address to query',
          },
        },
        required: ['walletAddress'],
      },
    },
    verify_identity: {
      name: 'verify_identity',
      description: 'Verify identity and verification level for a wallet',
      parameters: {
        type: 'object',
        properties: {
          walletAddress: {
            type: 'string',
            description: 'The wallet address to verify',
          },
        },
        required: ['walletAddress'],
      },
    },
  };
  
  console.log('✅ MCP Server initialized with tools:', Object.keys(tools));
  
  return {
    status: 'initialized',
    version: '1.0.0',
    tools: Object.keys(tools),
    toolsDefinition: tools,
  };
}

/**
 * Query score tool para MCP
 * @param {string} walletAddress - Dirección del wallet
 * @returns {Promise<object>}
 */
async function mcpQueryScore(walletAddress) {
  try {
    const scoreData = await getScore(walletAddress);
    const sbtData = await getUserSBT(walletAddress);
    
    return {
      walletAddress,
      score: scoreData?.score || null,
      maxLoanAmount: scoreData?.maxLoanAmount || null,
      hasSBT: !!sbtData,
      sbtTokenId: sbtData?.tokenId || null,
    };
  } catch (error) {
    console.error('Error in MCP query score:', error);
    throw error;
  }
}

/**
 * Get user SBT tool para MCP
 * @param {string} walletAddress - Dirección del wallet
 * @returns {Promise<object>}
 */
async function mcpGetUserSBT(walletAddress) {
  try {
    const sbtData = await getUserSBT(walletAddress);
    return {
      walletAddress,
      hasSBT: !!sbtData,
      sbtData: sbtData || null,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Error in MCP get user SBT:', error);
    throw error;
  }
}

/**
 * Verify identity tool para MCP
 * @param {string} walletAddress - Dirección del wallet
 * @returns {Promise<object>}
 */
async function mcpVerifyIdentity(walletAddress) {
  try {
    const identity = await verifyIdentity(walletAddress);
    return {
      walletAddress,
      verified: identity?.verified || false,
      verificationLevel: identity?.level || 0,
      identityData: identity || null,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Error in MCP verify identity:', error);
    throw error;
  }
}

/**
 * Health check del servidor MCP
 * @returns {Promise<object>}
 */
async function mcpHealthCheck() {
  return {
    status: 'healthy',
    server: 'veriscore-mcp',
    version: '1.0.0',
    tools: [
      'query_score',
      'get_user_sbt',
      'verify_identity',
    ],
  };
}

// Inicializar al cargar el módulo
const mcpServer = initializeMCPServer();

module.exports = {
  mcpServer,
  mcpQueryScore,
  mcpGetUserSBT,
  mcpVerifyIdentity,
  mcpHealthCheck,
  initializeMCPServer,
};

