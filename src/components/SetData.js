import React from 'react'
import Web3 from 'web3';
import { categories } from '../categories'
import { STORAGE_ABI, STORAGE_ADDRESS } from '../config';

const web3 = new Web3('http://localhost:7545');

export default function SetData() {

    console.log(web3.eth.getBlock("latest"))
    
    async function addCategory() {

        const accounts = await web3.eth.getAccounts(); 
        console.log(accounts[0]);
        
        const storage = new web3.eth.Contract(STORAGE_ABI, STORAGE_ADDRESS); 
        
        for (let i =0; i < categories.length; i++) {
            var categoryName = categories[i].name
            console.log(categoryName)
            var categoryCode = categories[i].code
            console.log(categoryCode)
            var children = categories[i].bricks
            for (let j = 0; j < children.length; j++) {
                var brickName = children[j].name
                console.log(brickName)
                var brickCode = children[j].code
                console.log(brickCode)
                await storage.methods.addCategory(
                    categoryCode, categoryName, brickCode, brickName).send({
                        from: accounts[0],
                        gas: 6721975
                    });
                console.log("Category added")
                // var brickParentCode = categories[i].code
                // console.log(brickParentCode)
            }
        }

        // if (typeof window.ethereum !== 'undefined') {
        //     console.log('MetaMask is installed');
        //     const account = await web3.eth.requestAccounts(); 
        //     console.log(account);
        //     const storage = new web3.eth.Contract(NESTED_ABI, NESTED_ADDRESS); 
        //     const receipt = await storage.methods.addCategory(
        //         categoryCode, categoryName, brickCode, brickName)
        //         .send({from: account[0]});
        //     console.log(receipt);
        // }
       
    }

    async function getCategory() {
        
        const storage = new web3.eth.Contract(STORAGE_ABI, STORAGE_ADDRESS); 
        const receipt = await storage.methods.getCategory().call();
        console.log(receipt);    
    }

    async function getCategoryFromMapping() {     
        const storage = new web3.eth.Contract(STORAGE_ABI, STORAGE_ADDRESS); 
        const receipt = await storage.methods.getCategoryFromMapping(50000000).call();
        console.log(receipt);   
    }

    async function removeCategoryFromMapping() {
        const accounts = await web3.eth.getAccounts(); 
        const storage = new web3.eth.Contract(STORAGE_ABI, STORAGE_ADDRESS); 
        const deleteCateogry = await storage.methods.removeCategoryFromMapping(67000000).send({
            from: accounts[0],
            gas: 1000000
        });
        console.log(deleteCateogry + "Category deleted");     
    }

    // delete every instance of a category
    // async function deleteCategory() {
    //     // const web3_MM = new Web3(window.ethereum);
    //     // var accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    //     const accounts = await web3.eth.getAccounts();
    //     const storage = new web3.eth.Contract(STORAGE_ABI, STORAGE_ADDRESS);
    //     const deleteCateogry = await storage.methods.deleteCategory().send({
    //         from: accounts[0],
    //         // gas: 1000000
    //     });
    //     console.log(deleteCateogry + "Category deleted");
    // }
        
    return (
        <div>
            <h2>Set Data</h2>
            <button onClick={addCategory}>Set Categories</button>
            <button onClick={getCategory}>Get Categories</button>
            <button onClick={removeCategoryFromMapping}>Delete Categories from mapping</button>
            <button onClick={getCategoryFromMapping}>Get Categories from Mapping</button>
            {/* <button onClick={deleteCategory}>Delete Categories</button> */}


        </div>
    )
}
