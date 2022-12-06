import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import "./App.css";
import { setProvider } from "./store/slicers/data";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!window.ethereum) {
      alert("Metamask is not installed");
      return;
    }
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    dispatch(setProvider(provider));
  }, []);

  // function connect() {
   
  //   // provider
  //   //   .send("eth_requestAccounts", [])
  //   //   .then((accounts) => setAccount(accounts))
  //   //   .catch((err) => console.log(err));

  //   // // The MetaMask plugin also allows signing transactions to
  //   // // send ether and pay to change state within the blockchain.
  //   // // For this, you need the account signer...
  //   // const signer = provider.getSigner();
  //   // signer.getAddress().then((address) => console.log(address));
  // }
  return <div className="App"></div>;
}

export default App;
