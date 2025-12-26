const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VeriScore", (m) => {
  // 1. Deploy IdentityRegistry
  const identityRegistry = m.contract("IdentityRegistry");

  // 2. Deploy CreditScoringMini
  const creditScoring = m.contract("CreditScoringMini");

  // 3. Deploy VeriScoreSBT
  const scorePassSBT = m.contract("VeriScoreSBT");

  return { identityRegistry, creditScoring, scorePassSBT };
});

