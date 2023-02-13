import React from 'react'
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import {MARKETPLACE_ABI, MARKETPLACE_ADDRESS} from '../config';
import { categories } from '../categories';

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [getProducts, setGetProducts] = useState([]);
  console.log(getProducts)

  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545"); 

  async function createProducts() {
    if (typeof window.ethereum !== 'undefined') {
      const account = await web3.eth.getAccounts(); 
      console.log(account[0]);
      const marketplace = new web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE_ADDRESS);
      let productDataArray = []
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      for (let j = 0; j < category.options.length; j++) {
        const product = category.options[j];
        const productData = { categoryId: category.value, name: product.label, productId: product.value, price: product.price }
        productDataArray.push(productData);
        const result = await marketplace.methods.createProduct(category.value, product.label, product.value, product.price)
            .send({from: account[3], gas: 6721975});
          console.log(result);
      }
    }
    setProducts(productDataArray);
    }
  }

  useEffect(() => {
    async function getProduct() {
      if (typeof window.ethereum !== 'undefined') {
        const marketplace = new web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE_ADDRESS);
        let productDataArray = []
        for (let i = 0; i < categories.length; i++) {
          const category = categories[i];
          for (let j = 0; j < category.options.length; j++) {
            const product = category.options[j];
            const result = await marketplace.methods.getProduct(product.value).call();
            const productData = { categoryId: result[0], name: result[1], productId: result[2], price: result[3], owner: result[4] }
            productDataArray.push(productData);

          } 
        }
        setGetProducts(productDataArray);
      }
    }
    getProduct();
  }, [])

  async function purchaseProduct(_productId) {
    if (typeof window.ethereum !== 'undefined') {
      const account = await web3.eth.getAccounts(); 
      console.log(account[0]);
      const marketplace = new web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE_ADDRESS);
      try{
      const result = await marketplace.methods.purchaseProduct(_productId)
          .send({from: account[0], gas: 6721975});
        console.log(result);
        alert("Transaction successful! :)")
      } catch {
        alert("The transaction failed. Possible reasons: \n 1. You do not have enough PMT to purchase this product \n 2. You are not allowed to purchase this product. \n")
      }
    }
  }

  // async function InheritContract(){
  //   if (typeof window.ethereum !== 'undefined') {
  //     const account = await web3.eth.getAccounts(); 
  //     console.log(account[0]);
  //     const marketplace = new web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE_ADDRESS);
  //     const result = await marketplace.methods.InheritContract('0xCF2De6A10e6818b76A1e5bE6AF78Fc57b67af769').send({from: account[0]});
  //       console.log(result);
  //  }
  // }


  return (
    <div className='marketplace'>
      <h1>Marketplace</h1><br/>
      {/* <button onClick={createProducts}>create products</button> */}
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            {/* <th>Owner</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {getProducts.map(p => (
            <tr key={p.productId}>
              <td>{p.name}</td>
              <td>{p.categoryId == 67000000 ? "Clothing" : p.categoryId == 50000000 ? "Food" : p.categoryId}</td>   
              <td>{p.price} PMT</td>
              {/* <td>{p.owner}</td> */}
              <td>
                <button className='button-buy' onClick={() => purchaseProduct(p.productId)}>Buy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Marketplace;
