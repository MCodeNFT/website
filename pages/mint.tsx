import Layout from "@components/Layout";
import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import ABI from "abi/abi.json";
import React, {ReactElement, useState, useEffect} from "react";
import {Contract} from "@ethersproject/contracts";
import {parseEther} from "@ethersproject/units";
import {Dialog, Transition} from '@headlessui/react';
import {Fragment} from 'react';
import {BigNumber, parseFixed} from "@ethersproject/bignumber";
import { ethers } from "ethers";
import {useAddress} from "../hooks/useAddress";


interface MlootNft {
    id: number;
    word_list: Array<string>;
}

export default function Mint(): ReactElement {
    const {active, account, chainId, library} = useWeb3React<Web3Provider>();
    
    const [mloots, setMLoots] = useState<Array<MlootNft>>([]);
    const [count, setCount] = useState(1);
    const [isErrorOpen, setIsErrorOpen] = useState(false)
    const [isTransactionOpen, setIsTransactionOpen] = useState(false);

    const [claimCnt, setClaimCnt] = useState(1);
    const [claimAddr, setClaimAddr] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [transactionId, setTransactionId] = useState("");
    
    const [baseURI, setBaseURI] = useState("");

    const [myContract, setMyContract] = useState<ethers.Contract | null>(null)
    const [left, setLeft] = useState(0);
    const [mintStarted, setMintStarted] = useState<boolean>(false);
    const [claimed, setClaimed] = useState(0);

    const [address, network] = useAddress();

    useEffect(() => {
        fetch("/mcode/random/1").then(data => {
            return data.json()
        }).then((js) => {
            console.log(js)
            setMLoots(js);
        })

        const provider = ethers.getDefaultProvider(network, {'infura': '786649a580e3441f996da22488a8742a'});
        const contract = new ethers.Contract(address, ABI, provider);

        console.log(contract)

        contract.getSaleStarted().then((started: boolean)=> {
            console.log(started)
            setMintStarted(started)
            console.log(mintStarted)
        }).catch((error: any) => {
            console.log(error)
        })

        contract.totalSupply().then((count: number)=> {
            console.log('count: ' + count)
            console.log(count)
            setClaimed(count)
        }).catch((error: any)=> {
            console.log(error)
        })

    }, [])

    useEffect(() => {

        if (ifConnected()) {
            // @ts-ignore
            const provider = ethers.getDefaultProvider(chainId, {'infura': '786649a580e3441f996da22488a8742a'});
            console.log(address)
            const contract = new ethers.Contract(address, ABI, provider);

            setMyContract(contract)

            // @ts-ignore
            // console.log(library.getSigner(account))
            contract.getSaleStarted().then((started: boolean)=> {
                console.log(started)
                setMintStarted(started)
            }).catch((error: any) => {
                console.log(error)
            })
        }
    }, [active, chainId])


    const ifMintStarted = ()=> {
        return mintStarted
    }

    const ifConnected = () => {
        if (active && (chainId === 1 || chainId === 1337 || chainId === 5777 || chainId == 4)) {
            return true
        } else {
            return false
        }
    }
    

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
        console.log('click mint...')
        if (ifConnected()) {
            // @ts-ignore
            const contract = new Contract(address, ABI, library.getSigner())
            if (!ifMintStarted()) {
                alert("mint not started...")
                return
            }
            contract.mint(count, {'value': parseEther((0.0125 * count).toString())}).then((res: object) => {
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

    const notEnbled = () => {
        console.log('...not enabled...')
    }

    const claim = () => {
        if (ifConnected()) {
            // @ts-ignore
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
            }).catch((error: object) => {
                console.log(error)
            })
        } else {
            alert("please connect to mainnet")
            return
        }
    }

    // 隐藏
    const claimReserved = () => {
        if (ifConnected()) {
            // @ts-ignore
            const contract = new Contract(address, ABI, library.getSigner())
            console.log(claimAddr)
            console.log(claimCnt)
            contract.claimReserved(BigNumber.from(claimCnt), claimAddr).then((res: object) => {
                console.log(res)
            }).catch((error: object) => {
                console.log(error)
            })
        } else {
            alert("please connect to mainnet")
            return
        }
    }

    // hidden
    const updateBaseURI = () => {
        if (ifConnected()) {
            // @ts-ignore
            const contract = new Contract(address, ABI, library.getSigner())
            contract.setBaseURI(baseURI).then((res: object) => {
                console.log(res)
            }).catch((error: object) => {
                console.log(error)
            })
        } else {
            alert("please connect to mainnet")
            return
        }
    }

    // hidden
    const tokenURI = () => {
        if (ifConnected()) {
            // @ts-ignore
            const contract = new Contract(address, ABI, library.getSigner())
            contract.tokenURI(BigNumber.from(1)).then((res: object) => {
                console.log(res)
            }).catch((error: object) => {
                console.log(error)
            })
        } else {
            alert("please connect to mainnet")
            return
        }
    }
    
    // hidden
    const toggleStart = () => {
        if (ifConnected()) {
            // @ts-ignore
            const contract = new Contract(address, ABI, library.getSigner())
            contract.toggleStatus().then((res: object) => {
                console.log(res)
            }).catch((error: object) => {
                console.log(error)
            })
        } else {
            alert("please connect to mainnet")
            return
        }
    }

    // hidden
    const withdraw = () => {
        if (ifConnected()) {
            // @ts-ignore
            const contract = new Contract(address, ABI, library.getSigner())
            contract.withdraw().then((res: object) => {
                console.log(res)
            }).catch((error: object) => {
                console.log(error)
            })
        } else {
            alert("please connect to mainnet")
            return
        }
    }

    // hidden
    const getBalance = () => {
        if (ifConnected()) {
            console.log(account)
            // @ts-ignore
            const contract = new Contract(address, ABI, library.getSigner(account))
            contract.balanceOf(account).then((res: any) => {
                console.log(res)
            }).catch((error: any) => {
                console.log(error)
            })
        } else {
            alert("please connect to mainnet")
            return
        }
    }

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("set count to ", e.target.valueAsNumber)
        setCount(e.target.valueAsNumber)
    }

    // @ts-ignore
    const inputBaseURIChange = (e) => {
        console.log("set baseURI to ", e.target.value)
        setBaseURI(e.target.value)
        console.log(baseURI)
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

            <div className="container mx-auto flex px-24 py-24 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 flex flex-row justify-end md:justify-center">
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

                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:pl-24 md:items-start md:text-left">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                        Mint MCode
                    </h1>
                    {!mintStarted && (<div className="text-red-700 inline-block text-2xl underline">
                        (Not Started, stay tuned)
                    </div>)}
                    <p className="leading-relaxed text-xl">
                        1: Mint at 0.0125Ξ(ETH) each.
                    </p>
                    <p>
                        - Please select the number of MCodes you wish to buy then click MINT button.
                    </p>
                    <p>
                        - A maximum of 20 MCodes can be minted at a time.
                    </p>
                    <div className="form-control">
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
                        - One address can only claim 1 MCode.
                    </p>
                    <p>
                        - You can not claim it if you already have one no matter whether you have claimed one or not
                    </p>

                    <button className="btn btn-secondary" onClick={claim}>
                        claim one freely
                    </button>
                </div>
            </div>

            { (account == '0x9B56835172892cE7aF6630D3c9c17c6407311Be2' || account == '0x2A0CFDe00155b19a7Cf625c1c68d905e55adcf7b') ? (
                <div className="w-1/2 m-auto">
                    <div className="form-control">
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

                    <button className="btn btn-secondary" onClick={toggleStart}>
                        toggleStart
                    </button>
                    <button className="btn btn-secondary" onClick={tokenURI}>
                        tokenURI
                    </button>
                    <button className="btn btn-secondary" onClick={getBalance}>
                        getBlance
                    </button>
                    <button className="btn btn-secondary" onClick={withdraw}>
                        withdraw
                    </button>
                    <div className="form-control">
                        <div className="flex space-x-2">
                            <input type="string" defaultValue={""}
                                   className="w-full input input-primary input-bordered text-black"
                                   onChange={inputBaseURIChange}/>
                            <button className="btn btn-primary" onClick={updateBaseURI}>
                                set baseuri
                            </button>
                        </div>
                    </div>
                </div>
            ): (<div className="hidden"></div>) }
        </Layout>
    );
}

