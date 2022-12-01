import { useLockContract } from "./hooks/useLockContract";
import { BigNumber, ethers } from "ethers";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const lockContract = useLockContract();
  const [totalLockedAmount, setTotalLockedAmount] = useState(BigNumber.from(0));

  const getTotalLocked = async () => {
    if(!lockContract) return;
    const totalLocked = await lockContract?.totalLocked();
    setTotalLockedAmount(totalLocked);
  };
  
  console.log(totalLockedAmount);
  return (
    <div className="App">
      <button onClick={getTotalLocked}>Get Total Locked</button>
      <h1>Your Balance : {ethers.utils.formatEther(totalLockedAmount)}</h1>
    </div>
  );
}

export default App;
