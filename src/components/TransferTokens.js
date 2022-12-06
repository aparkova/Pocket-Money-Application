import React, { useState } from 'react'
// import web3 from '.././web3.js';
import Web3 from 'web3';
import { PM_TOKEN_ABI, PM_TOKEN_ADDRESS } from '../config';

export default function TransferTokens() {

    const [userAccount, setUserAccount] = useState();
    const [amount, setAmount] = useState(0);
    const [condition, setCondition] = useState([]);
    console.log(condition);

    console.log(userAccount, "userAccount")

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); 

    async function getBalance() {
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

    //buy function
    async function buyProducts() {
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed');
        const account = await window.ethereum.request({method: 'eth_requestAccounts'});
        // const account = await web3.eth.getAccounts();
        const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
        //buy tokens
        const tx = await pmToken.methods.buyProducts(userAccount, amount).send({from: account[0],  gas: 1000000});
        console.log(tx);
        console.log(`${amount} PM sent to ${userAccount}`);
      }
    }

    async function existingContract(){
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed');
        const account = await window.ethereum.request({method: 'eth_requestAccounts'});
        // const account = await web3.eth.getAccounts();
        const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
        //buy tokens
        const tx = await pmToken.methods.Existing('0x31B263F5f1955EBC53Cb1Df68c92084e35bc068e').send({from: account[0],  gas: 1000000});
        console.log(tx);
        console.log(`${amount} PM sent to ${userAccount}`);
      }
    }

    async function compareArrays1(){
      const codeStorage = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
      const receipt = await codeStorage.methods.compareArrays().call();
      console.log(receipt);
  }

  async function transferWithConditions(){
    if(typeof window.ethereum !== 'undefined'){
      console.log('MetaMask is installed');
      const account = await window.ethereum.request({method: 'eth_requestAccounts'});
      const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
      const tx = await pmToken.methods.transferWithConditions('0xc756763EeeE0dF9841710A72b441d06577Bb586e', 5, [10005897]).send({from: account[0], gas: 1000000});
      console.log(tx);
      console.log(`${amount} PM sent to ${userAccount}`);
    }
  }

  async function getBalanceWithConditions(){
    if(typeof window.ethereum !== 'undefined'){
      console.log('MetaMask is installed');
      const account = await window.ethereum.request({method: 'eth_requestAccounts'});
      const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
      const tx = await pmToken.methods.getBalanceWithConditions('0xc756763EeeE0dF9841710A72b441d06577Bb586e').call();
      console.log(tx);
    }
  }


  return (
    <div>TransferTokens
    <header>
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={transfer}>Send Coins</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" /> <br/> 
        <button onClick={buyProducts}>Buy</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
        <button onClick={existingContract}>Inherit from CodeStorage contract</button>
        <button onClick={compareArrays1}>Compare Arrays1</button>
        <button onClick={transferWithConditions}>Transfer with Conditions</button><br/>
        {/* <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
        <input onChange={e => setCondition(e.target.value)} placeholder="Conditions" /> */}
        <button onClick={getBalanceWithConditions}>Get Balance with Conditions</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
    </header>
    </div>
  )
}