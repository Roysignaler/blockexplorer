import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import '../App.css';
import { alchemy, alchemyPolygon, alchemyArb } from '../App';



function GasTracker({ chain }) {

  const [gasPriceEth, setGasPriceEth] = useState();
  const [gasPriceGwei, setGasPriceGwei] = useState();
  const [gasPriceWei, setGasPriceWei] = useState();
  const [gasForTransfer, setGasForTransfer] = useState();
  const [gasForERC20Approval, setGasForERC20Approval] = useState();

  const [gasPriceMatic, setGasPriceMatic] = useState();
  const [gasPriceGweiMatic, setGasPriceGweiMatic] = useState();
  const [gasPriceWeiMatic, setGasPriceWeiMatic] = useState();
  const [gasForTransferMatic, setGasForTransferMatic] = useState();
  const [gasForERC20ApprovalMatic, setGasForERC20ApprovalMatic] = useState();

  const [gasPriceArb, setGasPriceArb] = useState();
  const [gasPriceGweiArb, setGasPriceGweiArb] = useState();
  const [gasPriceWeiArb, setGasPriceWeiArb] = useState();
  const [gasForTransferArb, setGasForTransferArb] = useState();
  const [gasForERC20ApprovalArb, setGasForERC20ApprovalArb] = useState();

  useEffect(() => {
    async function getGasPriceEth() {
      const response = await alchemy.core.getGasPrice();
      const gasInWei = parseInt(response._hex, 16);
      const gasInGwei = Utils.formatUnits(gasInWei, "gwei");
      const gasInEther = Utils.formatEther(gasInWei);
      const gasForTransfer = (gasInEther * 21000).toFixed(4);
      const gasForERC20Approval = (gasInEther * 45000).toFixed(4);
      setGasForTransfer(gasForTransfer)
      setGasForERC20Approval(gasForERC20Approval)
      setGasPriceGwei(gasInGwei);
      setGasPriceWei(gasInWei);
      setGasPriceEth(gasInEther)
    }

    async function getGasPriceMatic() {
      const response = await alchemyPolygon.core.getGasPrice();
      const gasInWeiMatic = parseInt(response._hex, 16);
      const gasInGweiMatic = Utils.formatUnits(gasInWeiMatic, "gwei");
      const gasInMatic = Utils.formatEther(gasInWeiMatic);
      const gasForTransferMatic = (gasInMatic * 21000).toFixed(4);
      const gasForERC20ApprovalMatic = (gasInMatic * 45000).toFixed(3);
      setGasPriceMatic(gasInMatic)
      setGasPriceGweiMatic(gasInGweiMatic)
      setGasPriceWeiMatic(gasInWeiMatic)
      setGasForTransferMatic(gasForTransferMatic)
      setGasForERC20ApprovalMatic(gasForERC20ApprovalMatic)
    }

    async function getGasPriceArb() {
      const response = await alchemyArb.core.getGasPrice();
      const gasInWeiArb = parseInt(response._hex, 16);
      const gasInGweiArb = Utils.formatUnits(gasInWeiArb, "gwei");
      const gasInArb = Utils.formatEther(gasInWeiArb);
      const gasForTransferArb = (gasInArb * 21000).toFixed(7);
      const gasForERC20ApprovalArb = (gasInArb * 45000).toFixed(7);
      setGasPriceArb(gasInArb)
      setGasPriceGweiArb(gasInGweiArb)
      setGasPriceWeiArb(gasInWeiArb)
      setGasForTransferArb(gasForTransferArb)
      setGasForERC20ApprovalArb(gasForERC20ApprovalArb)
    }

    getGasPriceEth();
    getGasPriceMatic();
    getGasPriceArb();
  }, []);

  return (
    <>
      <div>
        {(() => {
          if (chain === 'ethereum') {
            return (
              <>
                <div className="Box--Gastracker--Ethereum" >
                  <p className="Box--title">GasTracker on Ethereum ⛽️🔥</p>
                  <ul>
                    <li>{`${gasPriceEth && gasPriceEth.slice(0, 12)} ETH`}</li>
                    <li>{`${gasPriceGwei} Gwei`}</li>
                    <li>{`${gasPriceWei} Wei`}</li>
                    <br></br>
                    <li>{`Ether ~ 1880 USD`}</li>
                    <li>{`Min. Txn cost : ${gasForTransfer} ETH`}</li>
                    <li>{`Estimated to ${(gasForTransfer * 1800).toFixed(2)} USD`} </li>
                    <li>{`Approv. cost: ${gasForERC20Approval} ETH`}</li>
                  </ul>
                </div>
              </>
            );
          } else if (chain === 'polygon') {
            return (
              <>
                <div className="Box--Gastracker--Polygon" >
                  <p className="Box--title">GasTracker on Polygon ⛽️🔥</p>
                  <ul>
                    <li>{`${gasPriceMatic && gasPriceMatic.slice(0, 12)} Matic`}</li>
                    <li>{`${gasPriceGweiMatic} Matic Gwei`}</li>
                    <li>{`${gasPriceWeiMatic} Matic Wei`}</li>
                    <br></br>
                    <li>{`Matic ~ 1.1 USD`}</li>
                    <li>{`Min. Txn cost : ${gasForTransferMatic} Matic`}</li>
                    <li>{`Estimated to ${(gasForTransferMatic * 1.1).toFixed(4)} USD`} </li>
                    <li>{`Approv. cost: ${gasForERC20ApprovalMatic} Matic`}</li>

                  </ul>
                </div >
              </>
            );
          } else if (chain === 'arbitrum') {
            return (
              <>
                <div className="Box--Gastracker--Arbitrum" >
                  <p className="Box--title">GasTracker on Arbitrum ⛽️🔥</p>
                  <ul>
                    <li>{`${gasPriceArb && gasPriceArb.slice(0, 12)} Eth`}</li>
                    <li>{`${gasPriceGweiArb} Eth Gwei`}</li>
                    <li>{`${gasPriceWeiArb} Eth Wei`}</li>
                    <br></br>
                    <li>{`Ether ~ 1880 USD`}</li>
                    <li>{`Min. Txn cost : ${gasForTransferArb} ETH`}</li>
                    <li>{`Estimated to ${(gasForTransferArb * 1800).toFixed(4)} USD`} </li>
                    <li>{`Approv. cost: ${gasForERC20ApprovalArb} ETH`}</li>
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

export default GasTracker;
