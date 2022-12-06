import Web3 from 'web3';

const web3 = new Web3(window.ethereum);
// window.ethereum.request({method: 'eth_requestAccounts'});

// const web3 = new Web3('http://localhost:7545');

// const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

export default web3;
