import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { LOCK_ABI } from "../constants/abi";
import { LOCK_ADDRESS } from "../constants/addresses";

export const useLockContract = () => {
  const [contract, setContract] = useState();

  

  useEffect(() => {
    const getContract = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(LOCK_ADDRESS, LOCK_ABI, signer);
      setContract(contract);
    };
    getContract();
  }, []);
  


  return contract
};
