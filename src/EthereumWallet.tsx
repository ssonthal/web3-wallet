import { mnemonicToSeed } from "bip39";
import { HDNodeWallet, Wallet } from "ethers";
import { useState } from "react";

interface EthereumWalletProps {
    mnemonic: string;
}

export const EthereumWallet = ({mnemonic}:EthereumWalletProps) => {
    const [publicKeys, setPublicKeys] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    return (
        <div>
            <button onClick= {async () => {
                    const seed = await mnemonicToSeed(mnemonic);
                    const path = `m/44'/60'/${currentIndex}'/0'`;
                    const hdNode = HDNodeWallet.fromSeed(seed);
                    const child = hdNode.derivePath(path);
                    const privateKey = child.privateKey;
                    const wallet = new Wallet(privateKey);
                    setCurrentIndex(currentIndex + 1);
                    setPublicKeys([...publicKeys, wallet.address ]);
            }}>
                Add Eth Wallet
            </button>
            {publicKeys.map((p) => <div key={publicKeys.indexOf(p)}>{p}</div>)}
        </div>
    );


}