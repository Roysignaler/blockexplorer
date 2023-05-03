import { Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import '../App.css';
import { alchemy, alchemyPolygon, alchemyArb } from '../App';

function Block({ chain }) {

    const [blockNumberEth, setBlockNumberEth] = useState();
    const [blockNumberPolygon, setBlockNumberPolygon] = useState();
    const [blockNumberArb, setBlockNumberArb] = useState();


    const [transactionsCountInBlockEth, setTransactionsCountInBlockEth] = useState();
    const [transactionsCountInBlockPolygon, setTransactionsCountInBlockPolygon] = useState();
    const [transactionsCountInBlockArb, setTransactionsCountInBlockArb] = useState();


    useEffect(() => {
        async function getBlockNumber() {
            setBlockNumberEth(await alchemy.core.getBlockNumber());
            setBlockNumberPolygon(await alchemyPolygon.core.getBlockNumber());
            setBlockNumberArb(await alchemyArb.core.getBlockNumber());
        }

        getBlockNumber();

    }, [blockNumberEth, blockNumberPolygon, blockNumberArb]);

    useEffect(() => {

        async function getTransactionsInBlockEth(blockNumber) {
            let txHash = blockNumber;
            let response = await alchemy.core.getBlockWithTransactions(txHash)
            setTransactionsCountInBlockEth(response.transactions.length)
        }

        async function getTransactionsInBlockPolygon(blockNumber) {
            let txHash = blockNumber;
            let response = await alchemyPolygon.core.getBlockWithTransactions(txHash)
            setTransactionsCountInBlockPolygon(response.transactions.length)
        }

        async function getTransactionsInBlockArb(blockNumber) {
            let txHash = blockNumber;
            let response = await alchemyArb.core.getBlockWithTransactions(txHash)
            setTransactionsCountInBlockArb(response.transactions.length)
        }



        getTransactionsInBlockEth(blockNumberEth);
        getTransactionsInBlockPolygon(blockNumberPolygon);
        getTransactionsInBlockArb(blockNumberArb);


    }, [blockNumberEth, /*blockNumberPolygon, blockNumberArb*/])

    return (
        <>
            <div>
                {(() => {
                    if (chain === 'ethereum') {
                        return (
                            <>
                                <div className="Box--Gastracker--Ethereum" >
                                    <p className="Box--title">BlockInfo on Ethereum ⛓️</p>
                                    <ul>
                                        <li>{`Current Block: ${blockNumberEth}`}</li>
                                        <li>{`Previous Block: ${blockNumberEth - 1}`}</li>
                                        <li>{`Transactions in block: ${transactionsCountInBlockEth}`}</li>
                                    </ul>
                                </div>
                            </>
                        );
                    } else if (chain === 'polygon') {
                        return (
                            <>
                                <div className="Box--Gastracker--Polygon" >
                                    <p className="Box--title">BlockInfo on Polygon ⛓️</p>
                                    <ul>
                                        <li>{`Current Block: ${blockNumberPolygon}`}</li>
                                        <li>{`Previous Block: ${blockNumberPolygon - 1}`}</li>
                                        <li>{`Transactions in block: ${transactionsCountInBlockPolygon}`}</li>
                                    </ul>
                                </div >
                            </>
                        );
                    } else if (chain === 'arbitrum') {
                        return (
                            <>
                                <div className="Box--Gastracker--Arbitrum" >
                                    <p className="Box--title">BlockInfo on Arbitrum ⛓️</p>
                                    <ul>
                                        <li>{`Current Block: ${blockNumberArb}`}</li>
                                        <li>{`Previous Block: ${blockNumberArb - 1}`}</li>
                                        <li>{`Transactions in block: ${transactionsCountInBlockArb}`}</li>
                                    </ul>
                                </div >
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


export default Block;