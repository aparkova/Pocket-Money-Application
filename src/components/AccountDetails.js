import React, { useState, useEffect, useMemo } from 'react'
import Web3 from 'web3';
import { PM_TOKEN_ABI, PM_TOKEN_ADDRESS } from '../config';
import { MARKETPLACE_ABI, MARKETPLACE_ADDRESS } from '../config';
import '../App.css';
import { categories } from '../categories.js';


function AccountDetails() {
    const [balance, setBalance] = useState(0);
    const [userAccount, setUserAccount] = useState(0);
    const [categoryAmounts, setCategoryAmounts] = useState([]);
    const [purchasesData, setPurchasesData] = useState([]);
    // const [hasAllowedProducts, setHasAllowedProducts] = useState(false);

    console.log("balance",balance)
    console.log("purchasesData",purchasesData)

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

        async function getPurchases(){
            if (typeof window.ethereum !== 'undefined') {
                const account = await window.ethereum.request({method: 'eth_requestAccounts'});
                const marketplace = new web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE_ADDRESS);
                const purchases = await marketplace.methods.getPurchases(account[0]).call();
                console.log("purchases", purchases);
                // set purchases data to state
                let purchasesData = [...purchases]
                setPurchasesData(purchasesData);
                console.log("purchasesArr", purchasesData);
            }
        }         
        balanceOf();
        getBalance();
        getPurchases();
    }, []);

    // call resetCondiitons function from smart contract
    // async function resetConditions(){
    //     if (typeof window.ethereum !== 'undefined') {
    //         console.log('MetaMask is installed');
    //         const account = await window.ethereum.request({method: 'eth_requestAccounts'});
    //         console.log("Account " + account);
    //         const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
    //         //get balance from smart contract
    //         for (let i = 0; i < categories.length; i++) {
    //             console.log(categories[i].value)
    //             const reset = await pmToken.methods.resetConditions("0xc756763EeeE0dF9841710A72b441d06577Bb586e", categories[i].value).send({from: account[0]});
    //         }
    //     }
    // }
    
    const categoryLabelArr = categoryAmounts.map(category => {
        return <div key={category.value}>
            <h4>Product Category: {category.label}: {category.amount} PMT</h4>
            <div className='div-container'>Allowed Products:</div>
            <div className='div-padding'>
                { category.allowedCategories.map(allowedCategory => {
                   // get the quantity from the purchasesData array for each productId and display it
                    let quantity = purchasesData.filter(purchase => purchase.productId == allowedCategory.value);
                    console.log("quantity", quantity);
                    return <div key={allowedCategory.value}>
                        {/* get the quantity attribute from the array and display it next to the product's label
                         */}
                        <p>{allowedCategory.label} - Quantity: {quantity.length > 0 ? quantity[0].quantity : '0'}</p>

                    </div>
                })}
            </div>
        </div>
    });

    

    
    
  return (
    <div className='heading-container'>
        <h2 className="caption">Your balance is:</h2>
        {/* <button onClick={getPurchases}>Get Purchases</button> */}
        <p className="balance">{balance}</p>
        <h2 className="caption">Your address is:</h2>
        <p className="address">{userAccount}</p> <br/>
        <div className='row' id="myDiv">
        <h2 className='header'>Current amount in each category:
            <div className='labels'>{categoryLabelArr}</div>
        </h2>
            {/* <button onClick={resetConditions}>Reset Conditions</button> */}
        </div>     
    </div>
  )
}

export default AccountDetails