import { useEffect, useState } from "react";
import { ERC20 } from "../constants/abi";
import { EFLATOKEN_ADDRESS, LOCK_ADDRESS } from "../constants/addresses";
import { ethers, BigNumber } from "ethers";

export const useAllowance = () => {
  const [allowance, setAllowance] = useState(BigNumber.from(0));
  const [isApproving, setIsApproving] = useState(false);

  const getAllowance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(EFLATOKEN_ADDRESS, ERC20, signer);
    const allowance = await contract.allowance(
      signer.getAddress(),
      LOCK_ADDRESS
    );
    setAllowance(allowance);
  };
  useEffect(() => {
    getAllowance();
  }, []);

  const approve = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const _contract = new ethers.Contract(EFLATOKEN_ADDRESS, ERC20, signer);
    setIsApproving(true);
    try {
      const tx = await _contract.approve(
        LOCK_ADDRESS,
        ethers.constants.MaxUint256
      );
      await tx.wait();
      
      getAllowance();
    } catch (e) {
      console.log(e);
    }
    setIsApproving(false);
  };
  return { allowance, approve, isApproving };
};
