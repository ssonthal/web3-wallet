import './App.css'
import { generateMnemonic} from "bip39";
import { useState } from "react";
import { Buffer } from "buffer";
import { SolanaWallet } from './SolanaWallet';
import { EthereumWallet } from './EthereumWallet';
window.Buffer = window.Buffer || Buffer;

function App() {
  let [mnemonic, setMnemonic] = useState<string>("");
  return (
    <>
      <input type = "text" value = {mnemonic}></input>
      <button onClick = {async () => {
          const mn = generateMnemonic();
          setMnemonic(mn);
        }}>
          Create Seed Phrase
      </button>
      {mnemonic && <SolanaWallet mnemonic = {mnemonic}></SolanaWallet>}
      {mnemonic && <EthereumWallet mnemonic = {mnemonic}></EthereumWallet>}
    </>
  )
}
export default App

// pneumonics -> seed phrase -> paths -> key Value pair
