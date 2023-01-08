import React, { useState, useEffect } from 'react'
import Web3 from 'web3';
import { PM_TOKEN_ABI, PM_TOKEN_ADDRESS } from '../config';
import '../App.css';
import { categories } from '../categories.js';


function AccountDetails() {
    const[balance, setBalance] = useState(0);
    const[userAccount, setUserAccount] = useState(0);
    const [categoryAmounts, setCategoryAmounts] = useState([]);

    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545"); 

    useEffect(() => {
        async function balanceOf() {
            if (typeof window.ethereum !== 'undefined') {
                const account = await window.ethereum.request({method: 'eth_requestAccounts'});
                const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
                const balance = await pmToken.methods.balanceOf(account[0]).call();

                setBalance(balance);
                setUserAccount(account);
            }
        
        }
        
        async function getBalance(){
            if (typeof window.ethereum !== 'undefined') {
                const account = await window.ethereum.request({method: 'eth_requestAccounts'});
                setUserAccount(account);
                const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);

                let categoryAmountsCopy = {};

                for (let i = 0; i < categories.length; i++) {
                    categoryAmountsCopy[categories[i].value] = {
                        label: categories[i].label,
                        value: categories[i].value,
                        amount: 0,
                        allowedCategories: []
                    }
                }

                for (let i = 0; i < categories.length; i++) {
                    const balance = await pmToken.methods.getBalance(account[0], categories[i].value).call();
                    // console.log(`balance - ${categories[i].value}`, balance);

    
                    const topLevelitem = categories.find(item => {
                        //balance [0][0] is the first element of the subcategories. we are going to always use it as all of the other elements [0][1], [0][2] etc. are from the same top level category
                        return item.options.find(option => option.value === parseInt(balance[1][0]))
                    })

                    let subcategories = [];
                    for (let i = 0; i < balance[1].length; i++) {
                        subcategories.push(topLevelitem.options.find(option => option.value === parseInt(balance[1][i])))
                    }

                    // console.log(categoryAmountsCopy);
        
                    categoryAmountsCopy[categories[i].value] = {
                        ...categories[i],
                        amount: parseInt(categoryAmountsCopy[categories[i].value].amount) + parseInt(balance[0]),
                        allowedCategories: subcategories
                    }
                }

                setCategoryAmounts(Object.values(categoryAmountsCopy))
            }
        }        
        balanceOf();
        getBalance();
    }, []);

    // call resetCOndiitons function from smart contract
    async function resetConditions(){
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed');
            const account = await window.ethereum.request({method: 'eth_requestAccounts'});
            console.log("Account " + account);
            const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
            //get balance from smart contract
            for (let i = 0; i < categories.length; i++) {
                console.log(categories[i].value)
                const reset = await pmToken.methods.resetConditions("0xc756763EeeE0dF9841710A72b441d06577Bb586e", categories[i].value).send({from: account[0]});
            }
        }
    }

    const categoryLabelArr = categoryAmounts.map(category => {
        return <div key={category.value}>
            <h4>{category.label}: {category.amount}$</h4>
            <div>
                { category.allowedCategories.map(allowedCategory => {
                    return <div key={allowedCategory.value}>
                        {allowedCategory.label}({allowedCategory.value})
                    </div>})
                }
            </div>
        </div>
    });
    
  return (
    <div>
        <p className="caption">Your balance is</p>
        <h1 className="balance">{balance}</h1>
        <p className="caption">Your address is</p>
        <h1 className="address">{userAccount}</h1> <br/>
        <div className='row' id="myDiv">
            <h1 className='header'>Product Category:
                <div className='labels'>{categoryLabelArr}</div>
            </h1>
            <h1 className='header'>Allowed Products:</h1>
            <h1 className='header'>Available amount:</h1>
            <button onClick={resetConditions}>Reset Conditions</button>
        </div>     
    </div>
  )
}

export default AccountDetails