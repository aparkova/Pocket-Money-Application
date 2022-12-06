import React, { useState } from 'react'
import Web3 from 'web3';
import { categories } from '../categories'
import { CODESTORAGE_ABI, CODESTORAGE_ADDRESS } from '../config';

const web3 = new Web3('http://localhost:7545');

export default function SetData() {
    const [value, setValue] = useState([]);

    // console.log(web3.eth.getBlock("latest"))
    // console.log(categories)
    console.log(value)
    
    async function addCode() {

        const accounts = await web3.eth.getAccounts(); 
        console.log(accounts[0]);
        
        const codeStorage = new web3.eth.Contract(CODESTORAGE_ABI, CODESTORAGE_ADDRESS); 

        //pass the children code as subcode and the category code as code parameter in setCategoryToMapping function
        
        for (let i =0; i < categories.length; i++) {
            var categoryName = categories[i].label
            console.log(categoryName)
            var categoryCode = categories[i].value
            console.log(categoryCode)
            var children = categories[i].options
            for (let j = 0; j < children.length; j++) {
                var brickName = children[j].label
                console.log(brickName)
                var brickCode = children[j].value
                console.log(brickCode)
                await codeStorage.methods.setCategoryToMapping(
                    brickCode, categoryCode).send({
                        from: accounts[0],
                        gas: 6721975
                    });
                console.log("Category added")
                // var brickParentCode = categories[i].code
                // console.log(brickParentCode)
            }
        }       
    }

    async function getCategoryFromMapping(){
            const codeStorage = new web3.eth.Contract(CODESTORAGE_ABI, CODESTORAGE_ADDRESS); 
            const receipt = await codeStorage.methods.getCategoryFromMapping(10000596).call();
            console.log(receipt);    
    }

    // function setcategoriestobuy
    async function setCategoriesToBuy(){
        const accounts = await web3.eth.getAccounts();
        const codeStorage = new web3.eth.Contract(CODESTORAGE_ABI, CODESTORAGE_ADDRESS);
        const receipt = await codeStorage.methods.setCategoriesToBuy([67000000]).send({
            from: accounts[0],
            gas: 6721975
        });
        console.log(receipt);
    }

    async function getCategoriesToBuy(){
        const codeStorage = new web3.eth.Contract(CODESTORAGE_ABI, CODESTORAGE_ADDRESS);
        const receipt = await codeStorage.methods.getCategoriesToBuy().call();
        console.log(receipt);
    }

    async function compareArrays(){
        const codeStorage = new web3.eth.Contract(CODESTORAGE_ABI, CODESTORAGE_ADDRESS);
        const receipt = await codeStorage.methods.compareArrays().call();
        console.log(receipt);
    }

    async function setEligibleSellers(){
        const accounts = await web3.eth.getAccounts();
        const codeStorage = new web3.eth.Contract(CODESTORAGE_ABI, CODESTORAGE_ADDRESS);
        const receipt = await codeStorage.methods.setEligibleSellers(['0xbBD6A57eA478de6E8713Ae169CbBCFc7cD74ff06']).send({
            from: accounts[0],
            gas: 6721975
        });
        console.log(receipt);
    }

    async function getEligibleSellers(){
        const codeStorage = new web3.eth.Contract(CODESTORAGE_ABI, CODESTORAGE_ADDRESS);
        const receipt = await codeStorage.methods.getEligibleSellers().call();
        console.log(receipt);
    }

    async function isEligibleSeller(){
        const codeStorage = new web3.eth.Contract(CODESTORAGE_ABI, CODESTORAGE_ADDRESS);
        const receipt = await codeStorage.methods.isEligibleSeller('0xbBD6A57eA478de6E8713Ae169CbBCFc7cD74ff06').call();
        console.log(receipt);
    }


    return (
        <div>
            <h2>Set Data</h2>
            <button onClick={addCode}>Set Codes to Mapping</button> <br/>
            <button onClick={getCategoryFromMapping}>Get Codes</button> <br/>
            <input onChange={e => setValue(e.target.value)} placeholder="categories to buy" />
            <button onClick={setCategoriesToBuy}>Set Categories to Buy</button> <br/>
            <button onClick={getCategoriesToBuy}>Get Categories to Buy</button> <br/>
            <button onClick={compareArrays}>Compare Arrays</button> <br/>
            <button onClick={setEligibleSellers}>Set Eligible Sellers</button> <br/>
            <button onClick={getEligibleSellers}>Get Eligible Sellers</button> <br/>
            <button onClick={isEligibleSeller}>Is Eligible Seller</button> <br/>
        </div>
            


       
    )
}

