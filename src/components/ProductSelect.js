import React, {useState} from 'react'
import Group from './Group';
import Select from 'react-select';
import {clothing, food} from '.././options';
import Web3 from 'web3';
import { CODESTORAGE_ABI, CODESTORAGE_ADDRESS } from '../config';

const web3 = new Web3('http://localhost:7545');

export default function ProductSelect() {

    const [value, setValue] = useState([]);
    const [codes, setCodes] = useState([]);
    
    console.log(value, "value")
    console.log(codes, "tuk")

    let options = [
        Group("---CLOTHING---", clothing, setValue),
        Group("---Food---", food, setValue)
    ];
    console.log(codes)

    

    //set codes to contract
    async function storeCodes() {       
        
        const accounts = await web3.eth.getAccounts(); 
        console.log(accounts[0]);
        const codeStorage = new web3.eth.Contract(CODESTORAGE_ABI, CODESTORAGE_ADDRESS);
        
        //set itemcodes to setCodesByUser function in CodeStorage contract
        
        await codeStorage.methods.setCodesByAdress("0xc756763EeeE0dF9841710A72b441d06577Bb586e", codes).send({
            from: accounts[0],
            gas: 6721975
        });
        console.log("Code added")
        
    }

    //get codes from contract
    async function getCodes() {
        const codeStorage = new web3.eth.Contract(CODESTORAGE_ABI, CODESTORAGE_ADDRESS);
        const receipt = await codeStorage.methods.getAllowedProducts().call();
        console.log(receipt);
    }

    async function setAllowedProductsValues(){ 
        const accounts = await web3.eth.getAccounts();       
        const codeStorage = new web3.eth.Contract(CODESTORAGE_ABI, CODESTORAGE_ADDRESS); 
        const receipt = await codeStorage.methods.setAllowedProductsValues(codes).send({
            from: accounts[0],
            gas: 6721975
        });
        console.log(codes)
        console.log(receipt);    
    }

    async function getAllowedProductsValues(){
        const codeStorage = new web3.eth.Contract(CODESTORAGE_ABI, CODESTORAGE_ADDRESS); 
        const receipt = await codeStorage.methods.getAllowedProductsValues().call();
        console.log(receipt);    
    }

    async function deleteAllowedProducts(){
        const accounts = await web3.eth.getAccounts();       
        const codeStorage = new web3.eth.Contract(CODESTORAGE_ABI, CODESTORAGE_ADDRESS); 
        const receipt = await codeStorage.methods.deleteAllowedProducts().send({
            from: accounts[0],
            gas: 6721975
        });
        console.log(receipt);    
    }

    return (
        <div>
            <Select
            onChange={option => {
            const itemCodes = option.map(item => item.value);
            setCodes(itemCodes)
            setValue(option);
            console.log(option, itemCodes, "here");
            }}
            closeMenuOnSelect={false}
            isMulti
            menuIsOpen={true}
            options={options}
            // for each selected element in the array, return the value
            // value={value.map(option => option.value)}
            value={value}
        />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        
        <button onClick={storeCodes}>Set Codes</button>
        <button onClick={getCodes}>Get Codes</button>
        <button onClick={setAllowedProductsValues}>Set Allowed Products Values</button>
        <button onClick={getAllowedProductsValues}>Get Allowed Products Values</button>
        <button onClick={deleteAllowedProducts}>Delete Allowed Products</button>
        </div>
  )
}
