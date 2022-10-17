import React, { useState } from 'react'
import web3 from '.././web3';
import { PM_TOKEN_ABI, PM_TOKEN_ADDRESS } from '../config';

export default function TransferTokens() {

    const [userAccount, setUserAccount] = useState();
    const [amount, setAmount] = useState(0);
    
      async function requestAccount() {
        await window.ethereum.request({method: 'eth_requestAccounts'});
      }
    
      async function getBalance() {
        if (typeof window.ethereum !== 'undefined') {
          console.log('MetaMask is installed');
          const account = await web3.eth.requestAccounts(); 
          console.log(account);
          const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS); 
          //get balance from smart contract
          const balance = await pmToken.methods.balanceOf(account[0]).call();
          console.log("Balance: " + balance.toString());
        }
      }
    
      async function sendCoins() {
        if (typeof window.ethereum !== 'undefined') {           
          console.log(web3);
          await requestAccount();
          console.log('MetaMask is installed');
          const account = await web3.eth.requestAccounts();     
          const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
          //send tokens to another account
          const tx = await pmToken.methods.transfer(userAccount, amount).send({from: account[0]});
          console.log(tx);
          const receipt = await web3.eth.getTransactionReceipt(tx.transactionHash);
          console.log(receipt);
          console.log(`${amount} PM sent to ${userAccount}`);
        }    
      }

  return (
    <div>TransferTokens
    <header>
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
    </header>
    </div>
  )
}
