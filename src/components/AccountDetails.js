import React, { useState, useEffect } from 'react'
import Web3 from 'web3';
import { PM_TOKEN_ABI, PM_TOKEN_ADDRESS } from '../config';
import '../App.css';
import { categories } from '../categories.js';

function AccountDetails() {
    const[balance, setBalance] = useState(0);
    const[account, setAccount] = useState(0);
    const[conditionalAmount, setConditionalAmount] = useState([]);
    const[condition, setCondition] = useState([]);

    console.log(condition);

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); 

    useEffect(() => {
        async function getBalance() {
            if (typeof window.ethereum !== 'undefined') {
                console.log('MetaMask is installed');
                const account = await window.ethereum.request({method: 'eth_requestAccounts'});
                console.log(account);
                const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
                //get balance from smart contract
                const balance = await pmToken.methods.balanceOf(account[0]).call();
                console.log("Balance: " + balance.toString());
                setBalance(balance);
                setAccount(account);
            }
        }

        async function getBalanceToConditions(){
            if (typeof window.ethereum !== 'undefined') {
                console.log('MetaMask is installed');
                const account = await window.ethereum.request({method: 'eth_requestAccounts'});
                console.log(account);
                const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
                //get balance from smart contract
                const conditionalBalance = await pmToken.methods.getBalanceToConditions(account[0]).call();
                console.log("Conditional Amount: " + conditionalBalance.toString());
                setConditionalAmount(conditionalBalance);

            }
        }

        async function getConditions(){
            if (typeof window.ethereum !== 'undefined') {
                console.log('MetaMask is installed');
                const account = await window.ethereum.request({method: 'eth_requestAccounts'});
                console.log(account);
                const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
                //get balance from smart contract
                const conditions = await pmToken.methods.getConditions(account[0]).call();
                console.log("Conditions: " + conditions);
                setCondition(conditions);
            }
        }

        getBalance();
        getBalanceToConditions();
        getConditions();
       
    }, []);

   //find the label for each value in conditon array
    let conditionLabel = [];
    for (let i = 0; i < condition.length; i++) {
        for (let j = 0; j < categories.length; j++) {
            if (condition[i] == categories[j].value) {
                conditionLabel.push(categories[j].label);
            }
            for(let k = 0; k < categories[j].options.length; k++){
                if (condition[i] == categories[j].options[k].value) {
                    conditionLabel.push(categories[j].options[k].label);
                }
            }
        }
    }

    console.log(conditionLabel);

    //display the conditions
    let conditionDisplay = [];
    for (let i = 0; i < conditionLabel.length; i++) {
        conditionDisplay.push(<li>{conditionLabel[i]}</li>);
    }

  return (
    <div>
        <p className="caption">Your balance is</p>
        <h1 className="balance">{balance}</h1>
        <p className="caption">Your address is</p>
        <h1 className="address">{account}</h1> <br/>
        <p className="left">Conditions:</p>
        <h1 className="left">{conditionLabel.join(', ')}</h1> 
        <p className="right">Available amount</p>
        {/* render each conditional Amount separated with a coma */}
        <h1 className="right">{conditionalAmount.join(', ')}</h1>
        

    </div>
  )
}

export default AccountDetails