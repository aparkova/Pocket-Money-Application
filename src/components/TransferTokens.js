import React, { useState } from 'react'
// import web3 from '.././web3.js';
import Web3 from 'web3';
import { PM_TOKEN_ABI, PM_TOKEN_ADDRESS } from '../config';
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
        const tx = await pmToken.methods.conditionalTransfer(userAccount, props.selectedCategory, amount, _allowedProducts).send({from: account[0], gas: 1000000});
        console.log(tx);
        const receipt = await web3.eth.getTransactionReceipt(tx.transactionHash);
        console.log(receipt);
        console.log(`${amount} PM sent to ${userAccount}`);
      }
    }

  return (
    <div>TransferTokens
    <header>
      <button onClick={() => conditionalTransfer(props.codes)}>Transfer with Conditions</button><br/>
      <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
      <input disabled placeholder="ID" value={props.selectedCategory}/>

      <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
    </header>
    </div>
  )
}

export default TransferTokens;