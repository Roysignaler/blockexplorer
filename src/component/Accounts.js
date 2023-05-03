import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { alchemy, alchemyPolygon, alchemyArb } from '../App';


function Accounts({ chain, ethAddress }) {

    const [accountEth, setAccountEth] = useState();
    const [accountMatic, setAccountMatic] = useState();
    const [accountArb, setAccountArb] = useState();

    const [balanceEth, setBalanceEth] = useState();
    const [balanceMatic, setBalanceMatic] = useState();
    const [balanceArb, setBalanceArb] = useState();

    const [transactionsSendEth, setTransactionsSendEth] = useState();
    const [transactionsSendPolygon, setTransactionsSendPolygon] = useState();
    const [transactionsSendArb, setTransactionsSendArb] = useState();

    function removeZeros(value) {
        let strValue = value.toString();
        let nullIndex = 0;
        let startIndex = 0;


        for (let i = 0; i < strValue.length; i++) {
            if (strValue[i] !== '0' & strValue[i] !== ".") {
                startIndex = i;
                break;
            }
        }

        let dynamicSlice = strValue.slice(nullIndex, startIndex + 4);
        return dynamicSlice;
    }


    useEffect(() => {
        async function getAccountEth() {
            const response = await alchemy.core.getBalance(ethAddress);
            const balanceInEther = Utils.formatUnits(response._hex, "ether");
            const balanceInEtherWithoutZero = removeZeros(balanceInEther);
            setAccountEth(balanceInEtherWithoutZero);
        }

        async function getAccountMatic() {
            const response = await alchemyPolygon.core.getBalance(ethAddress);
            const balanceInMatic = Utils.formatEther(response._hex);
            const balanceInMaticWithoutZero = removeZeros(balanceInMatic);
            setAccountMatic(balanceInMaticWithoutZero);
        }

        async function getAccountArb() {
            const response = await alchemyArb.core.getBalance(ethAddress);
            const balanceInArb = Utils.formatEther(response._hex);
            const balanceInArbWithoutZero = removeZeros(balanceInArb);
            setAccountArb(balanceInArbWithoutZero);
        }

        async function getNftsForOwnerEth() {
            const response = await alchemy.nft.getNftsForOwner(ethAddress);
            setBalanceEth(response.totalCount);
        }

        async function getNftsForOwnerMatic() {
            const response = await alchemyPolygon.nft.getNftsForOwner(ethAddress);
            setBalanceMatic(response.totalCount);
        }

        async function getNftsForOwnerArb() {
            const response = await alchemyArb.nft.getNftsForOwner(ethAddress);
            setBalanceArb(response.totalCount);
        }
        // 506 + 17 + 302 + 6 + 86 + 81 + 57 + 6 + 6 + 270 + 10 + 309 + 79 + 61 + 6 + 248 + 44 + 63 + 45 + 52 = 2254


        getNftsForOwnerEth();
        getNftsForOwnerMatic()
        getNftsForOwnerArb()
        getAccountEth();
        getAccountMatic();
        getAccountArb()

    }, [ethAddress]);

    useEffect(() => {
        async function getInboundAssetTransfersEth() {
            let response = await alchemy.core.getAssetTransfers({
                fromBlock: "0x0",
                fromAddress: "0x0000000000000000000000000000000000000000",
                toAddress: ethAddress,
                excludeZeroValue: true,
                category: ["erc721", "erc1155"],
            })
        }



        async function getInboundAssetTransfersMatic() {
            let response = await alchemyPolygon.core.getAssetTransfers({
                fromBlock: "0x0",
                fromAddress: "0x0000000000000000000000000000000000000000",
                toAddress: ethAddress,
                excludeZeroValue: true,
                category: ["erc721", "erc1155"],
            })
        }

        getInboundAssetTransfersEth();
        getInboundAssetTransfersMatic();
    }, [])


    useEffect(() => {

        async function getTransactionsSendEth() {
            let response = await alchemy.core.getTransactionCount(ethAddress)
            setTransactionsSendEth(response)
        }

        async function getTransactionsSendPolygon() {
            let response = await alchemyPolygon.core.getTransactionCount(ethAddress)
            setTransactionsSendPolygon(response)
        }

        async function getTransactionsSendArb() {
            let response = await alchemyArb.core.getTransactionCount(ethAddress)
            setTransactionsSendArb(response)
        }

        getTransactionsSendEth();
        getTransactionsSendPolygon();
        getTransactionsSendArb();
    }, [])





    return (
        <>
            <div>
                {(() => {
                    if (chain === 'ethereum') {
                        return (
                            <>
                                <div className="Box--Gastracker--Ethereum">
                                    <p className="Box--title">Acc Info Ethereum</p>
                                    <ul>
                                        <li>{`Ether balance: ${accountEth} Eth`}</li>
                                        <li>NFT balance: {balanceEth}</li>
                                        <li>{`Total txn sent: ${transactionsSendEth}`}</li>
                                    </ul>
                                </div >
                            </>
                        );
                    }
                    else if (chain == 'polygon') {
                        return (
                            <>

                                <div className="Box--Gastracker--Polygon">
                                    <p className="Box--title">Acc Info Polygon</p>
                                    <ul>
                                        <li>{`Ether balance: ${accountMatic} Matic`}</li>
                                        <li>NFT balance: {balanceMatic}</li>
                                        <li>{`Total txn sent: ${transactionsSendPolygon}`}</li>


                                    </ul>
                                </div>
                            </>
                        );
                    } else if (chain === 'arbitrum') {
                        return (
                            <>

                                <div className="Box--Gastracker--Arbitrum">
                                    <p className="Box--title">Acc Info Arbitrum</p>
                                    <ul>
                                        <li>{`Ether balance: ${accountArb} Eth`}</li>
                                        <li>NFT balance: {balanceArb}</li>
                                        <li>{`Total txn: ${transactionsSendArb}`}</li>
                                    </ul>
                                </div>
                            </>
                        );
                    } else {
                        return null;
                    }
                })()}
            </div >
        </>
    );
}

export default Accounts; 