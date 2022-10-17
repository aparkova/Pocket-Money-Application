import React from 'react'
import Web3 from 'web3';
import { categories } from '../categories'
import { CODESTORAGE_ABI, CODESTORAGE_ADDRESS } from '../config';

const web3 = new Web3('http://localhost:7545');

export default function SetData() {

    // console.log(web3.eth.getBlock("latest"))
    console.log(categories)
    
    async function addCode() {

        const accounts = await web3.eth.getAccounts(); 
        console.log(accounts[0]);
        
        const codeStorage = new web3.eth.Contract(CODESTORAGE_ABI, CODESTORAGE_ADDRESS); 

        //pass the children code as subcode and the category code as code parameter in setCategoryToMapping function
        
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

    return (
        <div>
            <h2>Set Data</h2>
            <button onClick={addCode}>Set Codes</button> <br/>
            <button onClick={getCategoryFromMapping}>Get Codes</button> <br/>

        </div>
            


       
    )
}

