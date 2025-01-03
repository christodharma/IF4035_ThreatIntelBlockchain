import { BrowserProvider, ethers } from "ethers";

export function checkEthereumSupport() {
    if (typeof window.ethereum !== "undefined") {
        return true;
    }
    return false;
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