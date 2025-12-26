/**
 * Script para generar una nueva wallet (solo para testnet)
 * Úsalo si no puedes exportar la clave privada de Core Wallet
 */

const { ethers } = require('ethers');

async function main() {
  console.log('🔑 Generando nueva wallet para testnet...\n');
  
  // Generar nueva wallet
  const wallet = ethers.Wallet.createRandom();
  
  console.log('✅ Wallet generada exitosamente!\n');
  console.log('📋 Información de la wallet:');
  console.log('─'.repeat(50));
  console.log('Dirección:', wallet.address);
  console.log('Clave Privada:', wallet.privateKey);
  console.log('─'.repeat(50));
  
  console.log('\n⚠️  IMPORTANTE:');
  console.log('1. Guarda esta clave privada de forma segura');
  console.log('2. Esta wallet es SOLO para Cronos Testnet (no uses en mainnet)');
  console.log('3. Necesitas obtener TCRO (Cronos Testnet tokens) para esta wallet');
  console.log('4. Usa esta clave privada en backend/.env como BACKEND_PRIVATE_KEY');
  
  console.log('\n📝 Para obtener TCRO de testnet:');
  console.log('   - Faucet: https://cronos.org/faucet');
  console.log('   - Ingresa la dirección:', wallet.address);
  console.log('   - O usa el faucet oficial de Cronos Testnet');
  
  console.log('\n💡 Configuración en backend/.env:');
  console.log(`BACKEND_PRIVATE_KEY=${wallet.privateKey}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

