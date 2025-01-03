import { BrowserProvider, ethers } from "ethers";
import IocFactory from '../abi/Ioc.json';

const IocFactoryAddr = `0x5FbDB2315678afecb367f032d93F642f64180aa3`
const OracleAddr = `0x5FbDB2315678afecb367f032d93F642f64180aa3`
const Ioc = ``

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

export async function sellIoc() {
    if (checkEthereumSupport()) {
        await requestAccounts();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const provider = new BrowserProvider(window.ethereum as any);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(IocFactoryAddr, IocFactory.abi, signer);
        try {
            const data = await contract.publishIoc(OracleAddr);
            console.log('data: ', data);
        } catch (error) {
            console.log('error: ', error);
        }
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