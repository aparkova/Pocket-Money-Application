import React, {useState} from 'react'
import Group from './Group';
import Select from 'react-select';
import {clothing, food} from '.././options';
import Web3 from 'web3';
import TransferTokens from './TransferTokens';
import { categories } from '../categories.js';

export default function ProductSelect() {

    const [value, setValue] = useState([]);
    const [codes, setCodes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    
    console.log(value, "value")
    console.log(codes, "tuk1")

    let options = [
        Group("---CLOTHING---", clothing, setValue),
        Group("---Food---", food, setValue)
    ];
    console.log(codes + "codes")

    return (
        <div>
            <Select
            onChange={option => {
            const itemCodes = option.map(item => item.value);
                setCodes(itemCodes)
                setValue(option);

                if (option.length > 0) {
                    const topLevelitem = categories.find(category => {
                        return category.options.find(categoryOption => categoryOption.value === parseInt(option[0].value))
                    })
                    setSelectedCategory(topLevelitem.value)
                } else {
                    setSelectedCategory('')
                }
            }}
            closeMenuOnSelect={false}
            isMulti
            menuIsOpen={true}
            options={options}
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
        <br/>
        <TransferTokens codes={codes} selectedCategory={selectedCategory}/>
        </div>
  )
}
