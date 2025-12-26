'use client';

import * as React from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ThirdwebProvider } from 'thirdweb/react';

// Wrapper component para Privy - configurado para deshabilitar completamente los wallets
// Privy solo se usa para autenticación (email), no para wallets
// Usamos lazy loading para evitar conflictos con otros providers de wallet
function PrivyWrapper({ children, appId }: { children: React.ReactNode; appId: string }) {
  const [mounted, setMounted] = React.useState(false);

  // Cargar Privy solo después de que el componente se monte
  // Esto evita que Privy intente detectar otros providers de wallet durante la inicialización
  React.useEffect(() => {
    // Pequeño delay para asegurar que otros providers se inicialicen primero
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !appId) {
    // Renderizar children sin Privy mientras se carga
    return <>{children}</>;
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ['email'],
        appearance: {
          theme: 'dark',
          accentColor: '#9333ea',
        },
        // Deshabilitar completamente los embedded wallets
        embeddedWallets: {
          createOnLogin: 'off',
          noPromptOnSignature: true,
        },
        // Deshabilitar todos los external wallets
        externalWallets: {},
        // Deshabilitar todos los wallet connectors - esto previene que Privy intente crear conectores
        walletConnectors: [],
      }}
    >
      {children}
    </PrivyProvider>
  );
}

// Cronos Testnet
const cronosTestnet = {
  id: 338,
  name: 'Cronos Testnet',
  network: 'cronos-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Cronos',
    symbol: 'TCRO',
  },
  rpcUrls: {
    public: { http: ['https://evm-t3.cronos.org'] },
    default: { http: ['https://evm-t3.cronos.org'] },
  },
  blockExplorers: {
    default: { name: 'Cronoscan', url: 'https://testnet.cronoscan.com' },
  },
  testnet: true,
};

// Cronos Mainnet
const cronosMainnet = {
  id: 25,
  name: 'Cronos',
  network: 'cronos',
  nativeCurrency: {
    decimals: 18,
    name: 'Cronos',
    symbol: 'CRO',
  },
  rpcUrls: {
    public: { http: ['https://evm.cronos.org'] },
    default: { http: ['https://evm.cronos.org'] },
  },
  blockExplorers: {
    default: { name: 'Cronoscan', url: 'https://cronoscan.com' },
  },
  testnet: false,
};

const { chains, publicClient } = configureChains(
  [cronosTestnet, cronosMainnet],
  [publicProvider()]
);

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '1d62ebd56e09e0c5a87ccf0ab4b607bc';

// getDefaultWallets detecta automáticamente TODOS los wallets inyectados (Core Wallet, MetaMask, etc.)
// usando EIP-6963. Esto debería mostrar Core Wallet si está instalado.
const { connectors } = getDefaultWallets({
  appName: 'VeriScore',
  projectId,
  chains,
});

const config = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

const queryClient = new QueryClient();

// Wrapper para RainbowKit que solo se renderiza en el cliente
function RainbowKitWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const thirdwebClientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || '';
  
  return (
    // Privy primero y aislado - solo para autenticación (email)
    // Esto previene que Privy detecte otros providers de wallet
    <PrivyWrapper appId={privyAppId}>
      {/* Thirdweb para wallets y payments (x402) - aislado de Privy */}
      <ThirdwebProvider
        clientId={thirdwebClientId || "placeholder"}
      >
        {/* RainbowKit/Wagmi para conexión de wallets y pagos x402 */}
        <RainbowKitWrapper>
          {children}
          <Toaster position="top-right" />
        </RainbowKitWrapper>
      </ThirdwebProvider>
    </PrivyWrapper>
  );
}
