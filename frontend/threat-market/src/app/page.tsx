'use client'
import { BrowserProvider, ethers } from "ethers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  function checkEthereumSupport() {
    if (typeof window.ethereum !== "undefined") {
      return true;
    }
    return false;
  }

  async function fetchContract() {
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

  useEffect(() => {
    const hasMetamask = checkEthereumSupport();
    if (!hasMetamask) {
      alert("There's no ethereum support detected!")
    } else {
      alert(hasMetamask)
      router.push('/app');
    }
  }, [router])


  return (
    <></>
  );
}
