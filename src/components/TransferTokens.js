import React, { useState } from 'react'
import Web3 from 'web3';
import { PM_TOKEN_ABI, PM_TOKEN_ADDRESS } from '../config';
import '../App.css';
// import ProductSelect from './ProductSelect';

const TransferTokens = (props) => {
    const [userAccount, setUserAccount] = useState();
    const [amount, setAmount] = useState(0);

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); 

    // conditionalTransfer with parameter _allowedProducts as codes from ProductSelect
    async function conditionalTransfer(_allowedProducts) {
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed');
        const account = await window.ethereum.request({method: 'eth_requestAccounts'});
        console.log(account);
        const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
        //send tokens to another account
        //get the value of the input field
        try{
        const tx = await pmToken.methods.conditionalTransfer(userAccount, props.selectedCategory, amount, _allowedProducts).send({from: account[0], gas: 2000000});
        console.log(tx);
        alert("Transaction successful! :)")
        } catch {
          alert("Transaction failed. Please check your account balance and try again.");
        }
      }
    }

    async function transfer() {
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed');
        const account = await window.ethereum.request({method: 'eth_requestAccounts'});
        console.log(account);
        const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
        //send tokens to another account
        //get the value of the input field
        const tx = await pmToken.methods.transfer(userAccount, amount).send({from: account[0], gas: 3000000});
        console.log(tx);
        console.log(`${amount} PM sent to ${userAccount}`);
      }
    }

  return (
    <div>
      <h1>Transfer Pocket Money</h1>
    <form>
      
      <label className='label'>Enter the account address for the Pocket Money transfer:</label><br/>
      <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID"/><br/>
      {/* <input disabled placeholder="ID" value={props.selectedCategory}/> */}
      <label className='label'>Enter the amount of Pocket Money to transfer:</label><br/>
      <input onChange={e => setAmount(e.target.value)} placeholder="Amount" /><br/>
      <button type='button'className='button-transfer' onClick={() => conditionalTransfer(props.codes)}>Transfer with Conditions</button><br/>
      
      <input onChange={e => setAmount(e.target.value)} placeholder="Amount"/><br/> 
      <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID"/><br/>
      <button type='button' className='button-transfer' onClick={() => transfer()}>Transfer</button>
    </form>
    </div>
  )
}

export default TransferTokens;