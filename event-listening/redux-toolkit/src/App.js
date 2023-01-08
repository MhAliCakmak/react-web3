import { useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import {
  setLockContract,
  setEflaTokenContract,
} from "./store/slicers/contracts";
import "./App.css";
import { LOCK_ABI, ERC20 } from "./constants/abi";
import { LOCK_ADDRESS, EFLATOKEN_ADDRESS } from "./constants/addresses";
import { setProvider, setSigner, setAddress } from "./store/slicers/data";
import { useProvider } from "./hooks/useProvider";
import { useSigner } from "./hooks/useSigner";
function App() {
  const dispatch = useDispatch();
  const provider = useProvider();
  const signer = useSigner();
  const lockContract = useSelector((state) => state.contracts.lock);
  const [value, setValue] = useState("");
  console.log(provider);
  useEffect(() => {
    if (!window.ethereum) {
      alert("Metamask is not installed");
      return;
    }
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const getProvider = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      dispatch(setProvider(provider));
      const lockContract = new ethers.Contract(
        LOCK_ADDRESS,
        LOCK_ABI,
        provider
      );
      const eflaTokenContract = new ethers.Contract(
        EFLATOKEN_ADDRESS,
        ERC20,
        provider
      );
      batch(() => {
        dispatch(setLockContract(lockContract));
        dispatch(setEflaTokenContract(eflaTokenContract));
      });
    };
    getProvider();
  }, []);
  const lock = async () => {
    if(!lockContract){
      return;
    }
    if (!signer) {
      connect();
    }
    const _value = ethers.utils.parseEther(value);
    try {
      const txn = await lockContract?.connect(signer).lockTokens(_value);
      await txn.wait();
    } catch (err) {
      console.log(err);
    }
  };

  function connect() {
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    if (!provider) return;
    const signer = provider.getSigner();

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    signer.getAddress().then((address) => {
      batch(() => {
        dispatch(setSigner(signer));
        dispatch(setAddress(address));
      });

      console.log(address);
    });
  }
  return (
    <div className="App">
      <button onClick={connect}>Connect</button>
      <button onClick={lock}>Lock</button>
      <div>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
    </div>
  );
}

export default App;
