import { BrowserProvider, ethers } from "ethers";

export function checkEthereumSupport() {
    if (typeof window.ethereum !== "undefined") {
        return true;
    }
    return false;
}

export async function requestAccounts() {
    if (checkEthereumSupport()) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        document.cookie = `eth_account=${accounts}; path=/; max-age=${60 * 60 * 24 * 7}; secure; SameSite=Strict`;
    }
}

export function getEthAccountFromCookie() {
    const match = document.cookie.match(/(^|;) ?eth_account=([^;]*)(;|$)/);
    return match ? match[2] : null;
  }

export async function fetchContract() {
    if (checkEthereumSupport()) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const provider = new BrowserProvider(window.ethereum as any);
        const contract = new ethers.Contract("", "", provider); //TODO
        try {
            const data = await contract.get(); //TODO replace `get` with function
            console.log('data: ', data);
        } catch (error) {
            console.log('error: ', error);
        }
    }
}