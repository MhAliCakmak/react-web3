import {useLockContract} from './hooks/useLockContract'
import './App.css';

function App() {
  const lockContract = useLockContract()
  const getTotalLocked= async ()=>{
    
    const totalLocked = await lockContract.totalLocked()
    console.log(totalLocked)
  }

  return (
    <div className="App">
      <button onClick={getTotalLocked}>Get Total Locked</button>
    </div>
  );
}

export default App;
