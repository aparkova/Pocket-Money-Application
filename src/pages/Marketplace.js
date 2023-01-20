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
            .send({from: account[0], gas: 6721975});
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
      const result = await marketplace.methods.purchaseProduct(_productId)
          .send({from: account[0], gas: 6721975});
        console.log(result);
    }
  }

  // async function InheritContract(){
  //   if (typeof window.ethereum !== 'undefined') {
  //     const account = await web3.eth.getAccounts(); 
  //     console.log(account[0]);
  //     const marketplace = new web3.eth.Contract(MARKETPLACE_ABI, MARKETPLACE_ADDRESS);
  //     const result = await marketplace.methods.InheritContract('0xA7217D9232A1713EAE28033c2998ddC9fCdD5254').call();
  //       console.log(result);
  //  }
  // }

  return (
    <div className='marketplace'>
      <h1>Marketplace</h1><br/>
      {/* <button onClick={createProducts}>create products</button> */}
      {/* <button onClick={InheritContract}>Inherit Contract</button> */}
      {/* <div className="product-grid">
        <ul>
          {getProducts.map(p => (
            <li key={p.productId}> 
              {p.name} - {p.price} PMT
              <button className='button-buy' onClick={() => purchaseProduct(p.productId)}>Buy</button>
            </li>
          ))}
        </ul>
      </div> */}
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Owner</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {getProducts.map(p => (
            <tr key={p.productId}>
              <td>{p.name}</td>
              <td>{p.categoryId == 67000000 ? "Clothing" : p.categoryId == 50000000 ? "Food" : p.categoryId}</td>   
              <td>{p.price} PMT</td>
              <td>{p.owner}</td>
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
