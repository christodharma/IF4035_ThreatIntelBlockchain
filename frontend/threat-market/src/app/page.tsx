'use client'
import { checkEthereumSupport, requestAccounts } from "@/lib/eth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const hasMetamask = checkEthereumSupport();
    if (!hasMetamask) {
      alert("There's no ethereum support detected!")
    } else {
      requestAccounts().then(
        () => {router.push('/app')}
      )
    }
  }, [router])


  return (
    <></>
  );
}
