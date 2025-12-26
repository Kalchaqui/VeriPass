# VeriScore - Deployment Information

## Cronos Testnet Deployment

**Network:** Cronos Testnet  
**Chain ID:** 338  
**RPC URL:** https://evm-t3.cronos.org  
**Block Explorer (Principal):** https://explorer.cronos.org/testnet  
**Block Explorer (Alternativo):** https://testnet.cronoscan.com

**Deployment Date:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

**Deployer Address:** `0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed`

## Contract Addresses

### IdentityRegistry
```
0x1997AC40627138BCc6Ee38C242A23852bac4250e
```
[View on Cronos Explorer](https://explorer.cronos.org/testnet/address/0x1997AC40627138BCc6Ee38C242A23852bac4250e)  
[View on Cronoscan (Alternativo)](https://testnet.cronoscan.com/address/0x1997AC40627138BCc6Ee38C242A23852bac4250e)

### CreditScoringMini
```
0x9C432BfC67208AA5F894E87ACE65D605DC1EF3Cb
```
[View on Cronos Explorer](https://explorer.cronos.org/testnet/address/0x9C432BfC67208AA5F894E87ACE65D605DC1EF3Cb)  
[View on Cronoscan (Alternativo)](https://testnet.cronoscan.com/address/0x9C432BfC67208AA5F894E87ACE65D605DC1EF3Cb)

### VeriScoreSBT
```
0x9C2Cb7711f9B4cA8C7F0E310F315A46CE79771cD
```
[View on Cronos Explorer](https://explorer.cronos.org/testnet/address/0x9C2Cb7711f9B4cA8C7F0E310F315A46CE79771cD)  
[View on Cronoscan (Alternativo)](https://testnet.cronoscan.com/address/0x9C2Cb7711f9B4cA8C7F0E310F315A46CE79771cD)

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS=0x1997AC40627138BCc6Ee38C242A23852bac4250e
NEXT_PUBLIC_CREDIT_SCORING_ADDRESS=0x9C432BfC67208AA5F894E87ACE65D605DC1EF3Cb
NEXT_PUBLIC_VERISCORE_SBT_ADDRESS=0x9C2Cb7711f9B4cA8C7F0E310F315A46CE79771cD
NEXT_PUBLIC_CHAIN_ID=338
```

### Backend (.env)
```env
IDENTITY_REGISTRY_ADDRESS=0x1997AC40627138BCc6Ee38C242A23852bac4250e
CREDIT_SCORING_ADDRESS=0x9C432BfC67208AA5F894E87ACE65D605DC1EF3Cb
VERISCORE_SBT_ADDRESS=0x9C2Cb7711f9B4cA8C7F0E310F315A46CE79771cD
RPC_URL=https://evm-t3.cronos.org
MERCHANT_WALLET_ADDRESS=0x544bBb50642646dd2f9Ef2357D671A8bbD6513ed
```

## Next Steps

1. ✅ Contracts deployed successfully
2. ⏳ Update environment variables in frontend/.env.local
3. ⏳ Update environment variables in backend/.env
4. ⏳ Restart backend server
5. ⏳ Test the application


