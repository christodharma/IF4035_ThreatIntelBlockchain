interface Ethereum {
    isMetaMask?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request?: (args: { method: string; params?: any[] }) => Promise<any>;
  }
  
  interface Window {
    ethereum?: Ethereum; // Declare 'ethereum' property on 'window'
  }
  