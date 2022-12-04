import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { LOCK_ABI } from "../constants/abi";
import { LOCK_ADDRESS } from "../constants/addresses";

export const useLockContract = () => {
  const [contract, setContract] = useState();

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const _contract = new ethers.Contract(LOCK_ADDRESS, LOCK_ABI, provider);
    setContract(_contract);
  }, []);

  return contract
};
