import { useLockContract } from "./hooks/useLockContract";
import { BigNumber, ethers } from "ethers";
import { useState, useEffect } from "react";
import { useAllowance } from "./hooks/useLockAllowance";
import "./App.css";

function App() {
  const contract = useLockContract();
  const [value, setValue] = useState("");

  const { allowance, approve, isApproving } = useAllowance();

  const lock = async () => {
    const _value = ethers.utils.parseEther(value);

    await contract.lockTokens(_value);
  };

  return (
    <div className="App">
      
      <input
        value={value}
        placeholder="Enter value"
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={lock}>Lock</button>
      <div>
        <button onClick={approve} disabled={isApproving}>
          Approve
        </button>
        <h4>allowance : {ethers.utils.formatEther(allowance)}</h4>

        <h4>isApproving : {isApproving ? "true" : "false"}</h4>


       
      </div>
    </div>
  );
}

export default App;
