import {shorter} from "../utils/utils";
import {ReactElement, useEffect } from "react";
import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";


export const injected = new InjectedConnector({
    // supportedChainIds: [
    //     1,
    //     1337
    // ]
})

export default function ConnectButton(): ReactElement {
    const {active, account, activate, chainId} = useWeb3React();

    const connect = () => {
        console.log("connect...")
        activate(injected)
    }

    return (
        <div>
            {active && (chainId === 1 || chainId === 1337 || chainId === 5777 || chainId == 3) && (
                <button onClick={connect} className="px-2 py-1 rounded-md bg-red-500 text-gray-900">
                    Connected {shorter(account)}
                </button>
            )}
            {!active && (
                <button onClick={connect} className="px-2 py-1 rounded-md bg-purple-400 text-gray-900">
                    <div>Connect Wallet</div>
                </button>
            )}
            {active && chainId !== 1 && chainId !== 1337 && chainId !== 5777 && chainId !== 3 && (
                <div data-tip="Please switch to Mainnet" className="tooltip tooltip-open tooltip-bottom">
                    <button className="px-2 py-1 rounded-md bg-red-500 text-gray-900">
                        <div>Wrong Network</div>
                    </button>
                </div>
            )}
        </div>
    )

}