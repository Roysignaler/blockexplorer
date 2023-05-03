import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import Gastracker from './component/Gastracker';
import Accounts from './component/Accounts';
import Block from './component/Block';
import './App.css';


// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const settingsPolygon = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY_POLYGON,
  network: Network.MATIC_MAINNET,
};

const settingsArb = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY_ARB,
  network: Network.ARB_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
export const alchemy = new Alchemy(settings);
export const alchemyPolygon = new Alchemy(settingsPolygon)
export const alchemyArb = new Alchemy(settingsArb)

function App() {

  const [blockNumber, setBlockNumber] = useState();
  const [ethAddress, setEthAddress] = useState("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
  const [boxOneChain, setBoxOneChain] = useState("ethereum")
  const [boxTwoChain, setBoxTwoChain] = useState("polygon")
  const [button1Active, setButton1Active] = useState(false);
  const [button2Active, setButton2Active] = useState(true);
  const [button3Active, setButton3Active] = useState(false);
  const [button4Active, setButton4Active] = useState(true);
  const [button5Active, setButton5Active] = useState(false);
  const [button6Active, setButton6Active] = useState(false);


  function handleButtonClickOne(buttonNumber) {
    setButton1Active(false);
    setButton2Active(false);
    setButton3Active(false);

    switch (buttonNumber) {
      case 1:
        handleChainBox1("polygon")();
        setButton1Active(true);
        return;
      case 2:
        handleChainBox1("ethereum")();
        setButton2Active(true);
        return;
      case 3:
        handleChainBox1("arbitrum")();
        setButton3Active(true);
        return;
      default:
        return;
    }
  }

  function handleButtonClickTwo(buttonNumber) {
    setButton4Active(false);
    setButton5Active(false);
    setButton6Active(false);

    switch (buttonNumber) {
      case 4:
        handleChainBox2("polygon")();
        setButton4Active(true);
        return;
      case 5:
        handleChainBox2("ethereum")();
        setButton5Active(true);
        return;
      case 6:
        handleChainBox2("arbitrum")();
        setButton6Active(true);
        return;
      default:
        return;
    }
  }

  function handleChange(event) {
    setEthAddress(event.target.value)
  }

  function handleChainBox1(value) {
    return () => setBoxOneChain(value);
  }

  function handleChainBox2(value) {
    return () => setBoxTwoChain(value);
  }

  return (
    <div >
      <div >
        <div >
          <nav className='Nav--container'>
            <div className='Nav--title'>
              <h3 className="Nav--title--more">Multi Scan <br></br>Blockchain Explorer</h3>
              <p className="Nav--title--less">A tool in development for EVM blockchains</p>
            </div>
            <form className='Nav--input'>
              <input
                type="text"
                placeholder="Insert Ethereum Address or connect wallet"
                onChange={handleChange}
                className="ethAddress"
              />

            </form>
          </nav>

          <div> {ethAddress && (
            <p className="Data--title">{`Data for address: ${ethAddress}`}</p>
          )}</div>


          <div className='Chain--selctor--container'>
            <div className="Chain--selector" style={{
              backgroundColor: button1Active
                ? "rgba(130, 71, 229, 0.5)"
                : button2Active
                  ? "rgba(60, 60, 61, 0.5)"
                  : button3Active
                    ? "rgba(6, 77, 176, 0.5)"
                    : "darkgray",
            }}>
              <button style={{ backgroundColor: button1Active ? "rgba(76, 175, 80, 0.85)" : "darkgray" }} onClick={() => {
                handleButtonClickOne(1);
              }}>
                <img src="/images/polygon.png" width={25} height={30} ></img></button>
              <button style={{ backgroundColor: button2Active ? "rgba(76, 175, 80, 0.85)" : "darkgray" }}
                onClick={() => {
                  handleButtonClickOne(2);
                }}>
                <img src="/images/ethereum.png" width={25} height={30} ></img></button>
              <button style={{ backgroundColor: button3Active ? "rgba(76, 175, 80, 0.85)" : "darkgray" }}
                onClick={() => {
                  handleButtonClickOne(3);
                }}><img src="/images/arbitrum.svg" width={25} height={30}
                ></img></button>
            </div>


            <div >
              <div className="Chain--selector2" style={{
                backgroundColor: button4Active
                  ? "rgba(130, 71, 229, 0.5)"
                  : button5Active
                    ? "rgba(60, 60, 61, 0.5)"
                    : button6Active
                      ? "rgba(6, 77, 176, 0.5)"
                      : "darkgray",
              }}>
                <button style={{ backgroundColor: button4Active ? "rgba(76, 175, 80, 0.85)" : "darkgray" }} onClick={() => {
                  handleButtonClickTwo(4);
                }}>
                  <img src="/images/polygon.png" width={25} height={30} ></img></button>
                <button style={{ backgroundColor: button5Active ? "rgba(76, 175, 80, 0.85)" : "darkgray" }}
                  onClick={() => {
                    handleButtonClickTwo(5);
                  }}>
                  <img src="/images/ethereum.png" width={25} height={30} ></img></button>
                <button style={{ backgroundColor: button6Active ? "rgba(76, 175, 80, 0.85)" : "darkgray" }}
                  onClick={() => {
                    handleButtonClickTwo(6);

                  }}
                >
                  <img src="/images/arbitrum.svg" width={25} height={30} ></img>
                </button>
              </div>
            </div>
          </div>
        </div>


        <div className="centerDiv">
          <div className="Container--Gastracker">
            {ethAddress && (
              <>
                <Accounts ethAddress={ethAddress} chain={boxOneChain} />
              </>
            )
            }

            {ethAddress && (
              <Accounts ethAddress={ethAddress} chain={boxTwoChain} />
            )
            }
          </div>
        </div>

        <div className="div-Header">

          <div className="centerDiv">

            <div className="Container--Gastracker">
              <Block chain={boxOneChain} />
              <Block chain={boxTwoChain} />
            </div>
          </div>
          <div className="centerDiv">
            <div className="Container--Gastracker">
              <Gastracker chain={boxOneChain} />
              <Gastracker chain={boxTwoChain} />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;

//<div className='Nav--input--balance'>
//  {ethAddress && (
// <h6 className='Nav--input--balance--result'>{`Balance: ${ethAddress.slice(0, 4)}...${ethAddress.slice(-4)}`}</h6>
//  )}
// </div>