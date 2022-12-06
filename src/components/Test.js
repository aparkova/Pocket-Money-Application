import React from 'react'
import Web3 from 'web3';
import { TEST1_ABI, TEST1_ADDRESS } from '../config';

function Test() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const test1 = new web3.eth.Contract(TEST1_ABI, TEST1_ADDRESS);
    console.log(test1);

    async function setTest() {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        const tx = await test1.methods.setTest(123).send({from: accounts[0]});
        console.log(tx);
        const receipt = await web3.eth.getTransactionReceipt(tx.transactionHash);
        console.log(receipt);
    }

  return (
    <button onClick={setTest}>Set Test</button>
  )
}

export default Test