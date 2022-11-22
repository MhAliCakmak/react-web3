import { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState("");

  useEffect(() => {
    console.log(account);
  }, [account]);

  function connect() {
    if (!window.ethereum) {
      alert("Metamask is not installed");
      return;
    }
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    // MetaMask requires requesting permission to connect users accounts
    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => setAccount(accounts))
      .catch((err) => console.log(err));

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner();
    signer.getAddress().then((address) => console.log(address))
  }
  return (
    <div className="App">
      <button onClick={connect}>{account ? "Connected" : "Connect"}</button>
      <p>{account}</p>
    </div>
  );
}

export default App;
