import Link from "next/link";
import Layout from "@components/Layout";
import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import ABI from "abi/abi.json";
import {ReactElement, useState, useEffect} from "react";
import {Contract} from "@ethersproject/contracts";
import {address} from "../utils/const";
import {parseEther} from "@ethersproject/units";
import {Dialog, Transition} from '@headlessui/react';
import {Fragment} from 'react';
import {BigNumber, parseFixed} from "@ethersproject/bignumber";


interface MlootNft {
    id: number;
    word_list: Array<string>;
}

export default function Mint(): ReactElement {
    const [mloots, setMLoots] = useState<Array<MlootNft>>([]);
    const [count, setCount] = useState(1);
    const {active, account, activate, chainId, library} = useWeb3React();
    const [left, setLeft] = useState(0);
    const [isErrorOpen, setIsErrorOpen] = useState(false)
    const [isTransactionOpen, setIsTransactionOpen] = useState(false);

    const [claimCnt, setClaimCnt] = useState(1);
    const [claimAddr, setClaimAddr] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [transactionId, setTransactionId] = useState("");

    useEffect(() => {
        fetch("/mloot/random/1").then(data => {
            return data.json()
        }).then((js) => {
            console.log(js)
            setMLoots(js);
        })
    }, [])

    useEffect(() => {
        if (active && (chainId === 1 || chainId === 1337 || chainId === 5777)) {
            const contract = getContract()
            console.log(contract)
        }
    }, [active])

    const closeErrorModal = () => {
        setIsErrorOpen(false)
    }
    const openErrorModal = () => {
        setIsErrorOpen(true)
    }
    
    const closeTransactionModal = ()=> {
        setIsTransactionOpen(false)
    }
    const openTransactionModal = () => {
        setIsTransactionOpen(true)
    }

    const mint = () => {
        if (active && (chainId === 1 || chainId === 1337 || chainId === 5777)) {
            const contract = new Contract(address, ABI, library.getSigner())
            contract.mint(count, {'value': parseEther((0.01 * count).toString())}).then((res: object) => {
                console.log(res)
                // @ts-ignore
                setTransactionId(res["hash"])
                openTransactionModal()
            }).catch((error: object) => {
                // @ts-ignore
                
                console.log(error['data'])
               //alert(error['message'])
                // @ts-ignore
                if (error['data'] != null && error['data'] != undefined) {
                    // @ts-ignore
                    setErrorMsg(error['data']['message'])
                } else {
                    // @ts-ignore
                    setErrorMsg(error['message'])
                }
                openErrorModal()
            })
        } else {
            alert("please connect to mainnet")
        }
    }

    const claim = () => {
        if (active && (chainId === 1 || chainId === 1337 || chainId === 5777)) {
            const contract = new Contract(address, ABI, library.getSigner())
            contract.claim().then((res: object) => {
                console.log(res)

                // @ts-ignore
                setTransactionId(res["hash"])
                openTransactionModal()
            }).catch((error: object) => {
                // @ts-ignore
                // alert(error['message'])
                console.log(error['data'])
                //alert(error['message'])
                // @ts-ignore
                if (error['data'] != null && error['data'] != undefined) {
                    // @ts-ignore
                    setErrorMsg(error['data']['message'])
                } else {
                    // @ts-ignore
                    setErrorMsg(error['message'])
                }
                openErrorModal()
            })
            contract.totalSupply().then((res: BigNumber) => {
                console.log("totalsupply: " + res.toNumber())
            })
        } else {
            alert("please connect to mainnet")
            return
        }
    }

    const claimReserved = () => {
        if (active && (chainId === 1 || chainId === 1337 || chainId === 5777)) {
            const contract = new Contract(address, ABI, library.getSigner())
            contract.claimReserved(10, claimAddr).then((res: object) => {
                console.log(res)
                // @ts-ignore
                setTransactionId(res["hash"])
                openTransactionModal()
            }).catch((error: object) => {
                // @ts-ignore
                // alert(error['message'])
                console.log(error['data'])
                //alert(error['message'])
                // @ts-ignore
                if (error['data'] != null && error['data'] != undefined) {
                    // @ts-ignore
                    setErrorMsg(error['data']['message'])
                } else {
                    // @ts-ignore
                    setErrorMsg(error['message'])
                }
                openErrorModal()
            })
        } else {
            alert("please connect to mainnet")
            return
        }
    }

    const tokenURI = () => {
        if (active && (chainId === 1 || chainId === 1337 || chainId === 5777)) {
            const contract = new Contract(address, ABI, library.getSigner())
            contract.tokenURI(10).then((res: object) => {
                console.log(res)
                // @ts-ignore
                setTransactionId(res["hash"])
                openTransactionModal()
            }).catch((error: object) => {
                // @ts-ignore
                // alert(error['message'])
                console.log(error['data'])
                //alert(error['message'])
                // @ts-ignore
                if (error['data'] != null && error['data'] != undefined) {
                    // @ts-ignore
                    setErrorMsg(error['data']['message'])
                } else {
                    // @ts-ignore
                    setErrorMsg(error['message'])
                }
                openErrorModal()
            })
        } else {
            alert("please connect to mainnet")
            return
        }
    }

    const getBalance = () => {
        if (active && (chainId === 1 || chainId === 1337 || chainId === 5777)) {
            const contract = new Contract(address, ABI, library.getSigner())
            contract.balanceOf('0x2A0CFDe00155b19a7Cf625c1c68d905e55adcf7b').then((res: object) => {
                console.log(res)
            }).catch((error: object) => {
                // @ts-ignore
                // alert(error['message'])
                console.log(error['data'])
                //alert(error['message'])
                // @ts-ignore
                if (error['data'] != null && error['data'] != undefined) {
                    // @ts-ignore
                    setErrorMsg(error['data']['message'])
                } else {
                    // @ts-ignore
                    setErrorMsg(error['message'])
                }
                openErrorModal()
            })

            contract.balanceOf('0x964B071d70231462D7B6fb06DcE638845863eF62').then((res: object) => {
                console.log(res)
            }).catch((error: object) => {
                // @ts-ignore
                // alert(error['message'])
                console.log(error['data'])
                //alert(error['message'])
                // @ts-ignore
                if (error['data'] != null && error['data'] != undefined) {
                    // @ts-ignore
                    setErrorMsg(error['data']['message'])
                } else {
                    // @ts-ignore
                    setErrorMsg(error['message'])
                }
                openErrorModal()
            })

        } else {
            alert("please connect to mainnet")
            return
        }
    }

    const getContract = () => {
        if (active && (chainId === 1 || chainId === 1337 || chainId === 5777)) {
            const contract = new Contract(address, ABI, library.getSigner())
            return contract
        } else {
            return null
        }
    }
    
    // @ts-ignore
    const inputChange = (e) => {
        console.log("set count to ", e.target.value)
        setCount(e.target.value)
    }

    // @ts-ignore
    const inputClaimCntChange = (e) => {
        console.log("set inputClaimCntChange to ", e.target.value)
        setClaimCnt(e.target.value)
    }

    // @ts-ignore
    const inputClaimAddrChange = (e) => {
        console.log("set inputClaimAddrChange to ", e.target.value)
        setClaimAddr(e.target.value)
    }


    return (
        <Layout>
            <Transition appear show={isErrorOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeErrorModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0"/>
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Failure occur. 
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        error message: { errorMsg }
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeErrorModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={isTransactionOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeTransactionModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0"/>
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Transaction Submited
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Click <a href={"https://etherscan.io/tx/" + transactionId} target='_blank' rel="noreferrer" className="underline text-red-500"> me </a> to see transaction detail
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeTransactionModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            <div className="container mx-auto flex px-8 py-24 md:flex-row flex-col items-center">
                <div
                    className="lg:max-w-lg lg:w-full md:w-1/3 w-5/6 mb-10 md:mb-0 flex flex-row justify-end md:justify-center">
                    {mloots.map(({id, word_list}, i) => (
                        <div className="w-96 h-96 p-2 bg-black rounded" key={i}>
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

                <div className="lg:flex-grow md:w-2/3 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                        Mint MLoot
                    </h1>
                    <p className="leading-relaxed text-xl">
                        1: Mint at 0.01Ξ(ETH) each.
                    </p>
                    <p>
                        - Please select the number of MLoots you wish to buy then click MINT button.
                    </p>
                    <p>
                        - A maximum of 20 MLoots can be minted at a time.
                    </p>
                    <p className="text-red-500">
                        - All mint fee will be donated to the poor by <a href="https://www.givedirectly.org"
                                                                         rel="noreferrer" target="_blank"
                                                                         className="underline text-red-500">givedirectly.org</a>.
                    </p>
                    <div className="form-control">
                        {/*<label className="label">*/}
                        {/*    <span className="label-text text-red-400">Count(1~20)</span>*/}
                        {/*</label>*/}
                        <div className="flex space-x-2">
                            <input type="number" defaultValue={1}
                                   className="w-full input input-primary input-bordered text-black"
                                   onChange={inputChange}/>
                            <button className="btn btn-primary" onClick={mint}>
                                Mint.
                            </button>
                        </div>
                    </div>

                    <p className="mt-8 leading-relaxed text-xl">
                        2: Claim one by free.
                    </p>
                    <p>
                        - One address can only claim 3 MLoots.
                    </p>
                    <p>
                        - Only one MLoot can be claimed at a time.
                    </p>

                    <button className="btn btn-secondary" onClick={claim}>
                        claim one freely
                    </button>
                    <div className="form-control hidden">
                        {/*<label className="label">*/}
                        {/*    <span className="label-text text-red-400">Count(1~20)</span>*/}
                        {/*</label>*/}
                        <div className="flex space-x-2">
                            <input type="number" defaultValue={1}
                                   className="w-full input input-primary input-bordered text-black"
                                   onChange={inputClaimCntChange}/>
                            <input type="string" defaultValue={""}
                                   className="w-full input input-primary input-bordered text-black"
                                   onChange={inputClaimAddrChange}/>
                            <button className="btn btn-primary" onClick={claimReserved}>
                                claim reserved...
                            </button>
                        </div>
                    </div>

                    <button className="btn btn-secondary hidden" onClick={tokenURI}>
                        tokenURI
                    </button>
                    <button className="btn btn-secondary hidden" onClick={getBalance}>
                        getBlance
                    </button>
                </div>
            </div>
        </Layout>
    );
}

