import React, { useState } from 'react'
// import web3 from '.././web3.js';
import Web3 from 'web3';
import { PM_TOKEN_ABI, PM_TOKEN_ADDRESS } from '../config';
// import ProductSelect from './ProductSelect';

const TransferTokens = (props) => {
    
    const [userAccount, setUserAccount] = useState();
    const [amount, setAmount] = useState(0);
    const [condition, setCondition] = useState([]);
    const [id, setId] = useState(0);
    console.log("conditions: " + condition);
    console.log("id: " + id);

    console.log(userAccount, "userAccount")
    console.log("amount: " + amount)

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); 

    async function balanceOf() {
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed');
        // const web3 = new Web3(window.ethereum);
        const account = await window.ethereum.request({method: 'eth_requestAccounts'});
        // const account = await web3.eth.requestAccounts(); 
        console.log(account);
        const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS); 
        //get balance from smart contract
        const balance = await pmToken.methods.balanceOf(account[0]).call();
        console.log("Balance: " + balance.toString());
      }
    }
    
    //parent transfers tokens to child
    async function transfer() {
      if (typeof window.ethereum !== 'undefined') {  
        // const web3 = new Web3(Web3.givenProvider);         
        console.log('MetaMask is installed');
        const account = await window.ethereum.request({method: 'eth_requestAccounts'});
        // const account = await web3.eth.getAccounts();
        const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
        //send tokens to another account
        const tx = await pmToken.methods.transfer(userAccount, amount).send({from: account[0], gas: 1000000});
        console.log(tx);
        const receipt = await web3.eth.getTransactionReceipt(tx.transactionHash);
        console.log(receipt);
        console.log(`${amount} PM sent to ${userAccount}`);
      }    
    }

    // conditionalTransfer with parameter _allowedProducts as codes from ProductSelect
    async function conditionalTransfer(_allowedProducts) {
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed');
        const account = await window.ethereum.request({method: 'eth_requestAccounts'});
        console.log(account);
        const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
        //send tokens to another account
        const tx = await pmToken.methods.conditionalTransfer(userAccount, id, amount, _allowedProducts).send({from: account[0], gas: 1000000});
        console.log(tx);
        const receipt = await web3.eth.getTransactionReceipt(tx.transactionHash);
        console.log(receipt);
        console.log(`${amount} PM sent to ${userAccount}`);
      }
    }
    
  async function getBalance(){
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed');
        const account = await window.ethereum.request({method: 'eth_requestAccounts'});
        console.log(account);
        const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
        //get balance from smart contract
        const balance = await pmToken.methods.getBalance("0xc756763EeeE0dF9841710A72b441d06577Bb586e", 67000000).call();
        console.log("Balance: " + balance.toString());
    }
}

  return (
    <div>TransferTokens
    <header>
      <button onClick={balanceOf}>Get Balance</button>
      <button onClick={transfer}>Send Coins</button>
      <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
      <input onChange={e => setAmount(e.target.value)} placeholder="Amount" /> <br/> 
      <button onClick={() => conditionalTransfer(props.codes)}>Transfer with Conditions</button><br/>
      <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
      <input onChange={e => setId(e.target.value)} placeholder="ID" />
      <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      <input onChange={e => setCondition(JSON.parse("[" + e.target.value + "]"))} placeholder="Conditions" />
      <div>
          <input type="text" id="id" placeholder="Enter id" onChange={e => setId(e.target.value)}/>
          <input type="text" id="address" placeholder="Enter address" onChange={e => setUserAccount(e.target.value)}/>
          <button onClick={getBalance}>Get Balance</button>
      </div>
    </header>
    </div>
  )
}

export default TransferTokens;