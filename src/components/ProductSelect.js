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

    console.log(codes, "tuk")

    let options = [
        Group("---CLOTHING---", clothing, setValue),
        Group("---Food---", food, setValue)
    ];

    //set codes to contract
    async function storeCodes() {
        

        const accounts = await web3.eth.getAccounts(); 
        console.log(accounts[0]);
        
        const codeStorage = new web3.eth.Contract(CODESTORAGE_ABI, CODESTORAGE_ADDRESS);
        
        //set itemcodes to setCodesByUser function in CodeStorage contract
        
        await codeStorage.methods.setCodesByAdress("0x8AFBABfaBC3497c8a5173705C10fB9E43f66F3DB", codes).send({
            from: accounts[0],
            gas: 6721975
        });
        console.log("Code added")
        
    }

    //get codes from contract
    async function getCodes() {
        const codeStorage = new web3.eth.Contract(CODESTORAGE_ABI, CODESTORAGE_ADDRESS);
        const receipt = await codeStorage.methods.getCodesByAddress("0x8AFBABfaBC3497c8a5173705C10fB9E43f66F3DB").call();
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
        
        <button onClick={storeCodes}>Select</button>
        <button onClick={getCodes}>Get Codes</button>
        </div>
  )
}
