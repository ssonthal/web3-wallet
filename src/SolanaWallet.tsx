import { Keypair, PublicKey } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import nacl from "tweetnacl";

interface SolanaWalletProps {
    mnemonic: string;
}

export const SolanaWallet = ({mnemonic} : SolanaWalletProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState<(string | PublicKey)[]>([]);
    
    return (
        <div>
            <button onClick = {async function () {
                const seed = await mnemonicToSeed(mnemonic);
                const path = `m/44'/501'/${currentIndex}'/0'`;
                const derivedSeed = derivePath(path, seed.toString("hex")).key;
                const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
                const keypair = Keypair.fromSecretKey(secret);
                setCurrentIndex(currentIndex + 1);
                setPublicKeys([...publicKeys, keypair.publicKey]);
            }}>
                Add SQL Wallet 
            </button>
            {publicKeys.map((p:any) => {
                return <div>
                    {p.toBase58()}
                    </div>
            })}
        </div>
    );

}

