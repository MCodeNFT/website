import Link from "next/link";
import Layout from "@components/Layout";
import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";

import {ReactElement, useState, useEffect } from "react";


interface MlootNft {
    id: number;
    word_list: Array<string>;
}

export default function Mint(): ReactElement {
    
    const [mloots, setMLoots] = useState<Array<MlootNft>>([]);
    const [count, setCount] = useState(1);
    const {active, account, activate, chainId} = useWeb3React();

    const mint = ()=> {
        if (!active) {
            alert("please connect to mainnet")
        }
        console.log('mint....', count)
    }

    useEffect(() => {
        fetch("http://localhost/mloot/random/1").then(data=> {
            return data.json()
        }).then((js) => {
            console.log(js)
            setMLoots(js);
        })
    }, [])

    // @ts-ignore
    const inputChange = (e) => {
        console.log("set count to ", e.target.value)
        setCount(e.target.value)
    }

    return (
        <Layout>
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/3 w-5/6 mb-10 md:mb-0 flex flex-row container justify-end md:justify-center">
                    { mloots.map(({id, word_list}, i)=> (
                        <div className="w-80 h-80 p-2 bg-black rounded">
                            <ul>
                                {word_list.map((word, i) => (
                                    <li key={i} className="text-left">
                                        <span>{word}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="lg:flex-grow md:w-2/3 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                        MLoot - Mnemonic Loot
                    </h1>
                    <p className="mb-8 leading-relaxed text-xl">
                        buddy, you will receive random generate MLoots.
                    </p>
                    <p>
                        - Please select the number of Soldiers you wish to buy then click MINT button.
                    </p>
                    <p>
                        - A maximum of 20 MLoots can be minted at a time.
                    </p>
                    <p className="text-red-500">
                        - All mint fee will be donated to the poor by <a href="https://www.givedirectly.org" rel="noreferrer" target="_blank" className="underline text-red-500">givedirectly.org</a>. 
                    </p>
                    <br/>
                    <h3 className="text-2xl">
                        Price: 0.01Ξ(ETH)
                    </h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-red-400">Count(1~20)</span>
                        </label>
                        <div className="flex space-x-2">
                            <input type="number" defaultValue={1} className="w-full input input-primary input-bordered text-black" onChange={inputChange}/>
                            <button className="btn btn-primary" onClick={mint}>
                                mint
                            </button>
                        </div>
                    </div>

                    <p className="mt-8 leading-relaxed text-xl">
                        you can also mint MLoot free of charge.
                    </p>
                    <p>
                        - One address can only mint 3 MLoots.
                    </p>
                    <p>
                        - Only one MLoot can be minted at a time.
                    </p>
                    
                    <button className="btn btn-secondary" onClick={mint}>
                        mint one freely
                    </button>
                </div>
            </div>
        </Layout>
    );
}
