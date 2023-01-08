import React, { useState, useEffect } from 'react'
import Web3 from 'web3';
import { PM_TOKEN_ABI, PM_TOKEN_ADDRESS } from '../config';
import '../App.css';
import { categories } from '../categories.js';


function AccountDetails() {
    const[balance, setBalance] = useState(0);
    const[userAccount, setUserAccount] = useState(0);


    const[conditionalAmount, setConditionalAmount] = useState([]);
    // const[condition, setCondition] = useState([]);
    const[id, setId] = useState(0);

    const [categoryAmounts, setCategoryAmounts] = useState([]);

    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545"); 

    useEffect(() => {
        async function balanceOf() {
            if (typeof window.ethereum !== 'undefined') {
                console.log('MetaMask is installed');
                const account = await window.ethereum.request({method: 'eth_requestAccounts'});
                console.log(account);
                const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
                //get balance from smart contract
                const balance = await pmToken.methods.balanceOf(account[0]).call();
                console.log("Balance: " + balance.toString());
                setBalance(balance);
                setUserAccount(account);
            }
        
        }
        
        async function getBalance(){
            if (typeof window.ethereum !== 'undefined') {
                // console.log('MetaMask is installed');
                const account = await window.ethereum.request({method: 'eth_requestAccounts'});
                setUserAccount(account);
                // console.log("Account " + account);
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
    
                    const topLevelitem = categories.find(item => {
                        //balance [0][0] is the first element of the subcategories. we are going to always use it as all of the other elements [0][1], [0][2] etc. are from the same top level category
                        return item.options.find(option => option.value === parseInt(balance[1][0]))
                    })

                    let subcategories = [];
                    for (let i = 0; i < balance[1].length; i++) {
                        subcategories.push(topLevelitem.options.find(option => option.value === parseInt(balance[1][i])))
                    }
        
                    categoryAmountsCopy[categories[i].value] = {
                        ...categories[i],
                        amount: balance[0],
                        allowedCategories: subcategories
                    }
                }

                setCategoryAmounts(Object.values(categoryAmountsCopy))
            }
        }        
        balanceOf();
        getBalance();
    }, []);
    
    // //get the balance for each category
    

    async function getBalance1(){
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed');
            const account = await window.ethereum.request({method: 'eth_requestAccounts'});
            console.log("Account " + account);
            const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
            //get balance from smart contract
            const balance = await pmToken.methods.getBalance("0xc756763EeeE0dF9841710A72b441d06577Bb586e", 50000000).call();
            console.log("Balance: " + balance.toString());
            //setId to the id of the category
            setId(id);
        }
    }


    // call resetCOndiitons function from smart contract
    async function resetConditions(){
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed');
            const account = await window.ethereum.request({method: 'eth_requestAccounts'});
            console.log("Account " + account);
            const pmToken = new web3.eth.Contract(PM_TOKEN_ABI, PM_TOKEN_ADDRESS);
            //get balance from smart contract
            const reset = await pmToken.methods.resetConditions("0xc756763EeeE0dF9841710A72b441d06577Bb586e", 67000000).send({from: account[0]});
            console.log("Reset: " + reset.toString());
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

    
    // async function iterateCategories(){
    //     try {
    //       for (const category of categories) {
    //         console.log("Category ID " + category.value);
    //         await getBalance(category.value);
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }

    // //render the label for each category in the categories array in the <h1> Product Category <h1/> tag 
    // //add a new line for each category at the endd of the <h1> Product Category <h1/> tag
    
    // // let categoryLabel = [];
    // // console.log(categories[0].label);
    // // for (let i = 0; i < categories.length; i++) {
    // //     categoryLabel.push(<><div>{categories[i].label}</div><br/></>);
        
    // // }
    // // console.log("Category Label" + categoryLabel);

    // const renderCategoryConditions = categories.map(category => {
    //     //call getBalance for each category
    //     getBalance();
    //     return <div key={category.value}>{category.label}: {categoryAmounts.amount}</div>
    // })

    
      

  return (
    <div>
        <p className="caption">Your balance is</p>
        <h1 className="balance">{balance}</h1>
        <p className="caption">Your address is</p>
        <h1 className="address">{userAccount}</h1> <br/>
        <div className='row' id="myDiv">
            <h1 className='header'>Product Category:
                <div className='labels'>{categoryLabelArr}</div>
                {/* <div className='labels'>{renderCategoryConditions}</div> */}
                {/* <div className='labels'>{conditionalAmountArr}</div>   */}
            </h1>
            <h1 className='header'>Allowed Products:</h1>
            <h1 className='header'>Available amount:</h1>
            {/* <button onClick={getBalance}>Get Balance</button> */}
            <button onClick={getBalance1}>Get Balance1</button>
            <button onClick={resetConditions}>Reset Conditions</button>
        </div>     
    </div>
  )
}

export default AccountDetails