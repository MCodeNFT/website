import Link from "next/link";
import Layout from "@components/Layout";

import type {ReactElement} from "react";
import {useEffect, useState} from "react";

interface MlootNft {
    id: number;
    word_list: Array<string>;
}

export default function Home(): ReactElement {

    const [mloots, setMLoots] = useState<Array<MlootNft>>([]);

    useEffect(() => {
        fetch("http://localhost/mloot/random/4").then(data => {
            return data.json()
        }).then((js) => {
            console.log(js)
            setMLoots(js)
        })
    }, [])

    return (
        <Layout>
            <div>
                <div className="m-auto px-1 py-7 text-center">
                    <h2 className="text-7xl m-auto">MLoot - Mnemonic Loot</h2>
                    <div className="flex flex-row justify-center py-3 text-2xl">
                            <a className="p-2" rel="noreferrer" target="_blank" href="https://twitter.com/mlootproject">Twitter</a>
                            <a className="p-2" rel="noreferrer" target="_blank" href="">Discord</a>
                    </div>
                    <p className="text-gray-400 text-xl">
                        MLoot is randomly generate with english mnemonic words. 
                        <br/>It combines with 12 words and stored on chain.
                        <br/> Feel free to use MLoot in any way you want.
                    </p>
                </div>

                <p className="text-lg pt-2 text-center pt-8">How MLoot Generated</p>
                <div className="mockup-code max-w-lg m-auto bg-neutral pt-3">
                  <pre data-prefix="$" className="text-white">
                    <code>pip3 install mnemonic</code>
                  </pre>
                  <pre data-prefix="$" className="text-white">
                    <code>python3</code>
                  </pre>
                  <pre data-prefix=">>>" className="text-warning">
                    <code>from mnemonic import Mnemonic</code>
                  </pre>
                  <pre data-prefix=">>>" className="text-warning">
                    <code>m = Mnemonic(&quot;english&quot;)</code>
                  </pre>
                  <pre data-prefix=">>>" className="text-warning">
                    <code>m.generate()</code>
                  </pre>
                  <pre className="text-success">
                    <code>&apos;brand account family tomorrow divide spawn poverty noble purpose update man lake&apos;</code>
                  </pre>
                </div>

                <div className="py-8 m-auto text-center">
                    <span>Example Bags:</span>
                    <div className="container px-5 py-3 mx-auto">
                        <div className="flex flex-row gap-2">
                            { mloots.map(({id, word_list}, i)=> (
                                <div className="lg:w-2/9 lg:h-2/9 md:w-2/5 md:h-2/9 p-4 w-full bg-black rounded">
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
                    </div>
                </div>
            </div>
        </Layout>
    );
}
