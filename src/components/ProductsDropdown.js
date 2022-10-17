import React, { Component } from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import web3 from '.././web3';
import { STORAGE_ABI, STORAGE_ADDRESS } from "../config";

export default class ProductsDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      selected: [],
      ids: []
    };
  }

  uncheckAll = () => {
    const data = this.state.data;
    data[0].checked = false;
    this.setState({ data });
  };

  checkAll = () => {
    const data = this.state.data;
    data[0].checked = true;
    this.setState({ data });
  };

  onChange = (a, b) => {
    const selected = this.state.selected;
    const foundIndex = selected.findIndex((el) => el.id === a.id);
    if (foundIndex > -1) {
      selected[foundIndex] = {
        id: a.id,
        checked: a.checked
      };
    } else {
      selected.push({
        id: a.id,
        checked: a.checked
      });
    }

    console.log(a, b);


  };

  showSelected = () => {
    const filteredSelect = this.state.selected.filter((el) => el.checked === true);
    console.log("selected:", this.state.selected)
    console.log("filtered", filteredSelect);  
    // get ids from filteredSelect
    const selectedIds = filteredSelect.map((el) => el.id);
    let idsArray = this.state.ids
    idsArray.push(selectedIds)
    console.log(idsArray)
    
  };
 
  showids = () => {
    console.log("ids: ", this.state.ids);
  }

  async passValues() {
    if (typeof window.ethereum !== 'undefined') {;
    const account = await web3.eth.requestAccounts(); 
    const storage = new web3.eth.Contract(STORAGE_ABI, STORAGE_ADDRESS);
    const passProduct = await storage.methods.addProduct(
      1, 
      "coffee",
      "drink", 
      3, 
      "0xc756763EeeE0dF9841710A72b441d06577Bb586e")
    .send({from: account[0]});
    console.log(passProduct);
    }
  }  

  async getProduct(){
    if (typeof window.ethereum !== 'undefined') {
    const storage = new web3.eth.Contract(STORAGE_ABI, STORAGE_ADDRESS);
    //call getIds function in Storage.sol
    let data = await storage.methods.getProduct().call();
    console.log(data);
    }
  }

  setIds = async () => {
      if (typeof window.ethereum !== 'undefined') {
      // let useraccount = await web3.eth.getAccounts();
      const account = await web3.eth.requestAccounts();
      // console.log(useraccount);
      const storage = new web3.eth.Contract(STORAGE_ABI, STORAGE_ADDRESS);
      // const array = [2,6,7,8,9,10];
      let array = this.state.ids;
      console.log(array);
      const storeArray = await storage.methods.setIds(array).send({from: account[0]});
      console.log(storeArray);
    }
  }

  async getIds(){
    if (typeof window.ethereum !== 'undefined') {
    const storage = new web3.eth.Contract(STORAGE_ABI, STORAGE_ADDRESS);
    //call getIds function in Storage.sol
    let data = await storage.methods.getProductId().call();
    console.log(data);
    }
  }

  render() {
    return (
      <div>
        <DropdownTreeSelect onChange={this.onChange} data={this.state.data} />
        {/* <button onClick={this.checkAll}>Check all</button>
        <button onClick={this.uncheckAll}>Uncheck all</button> */}
        <button onClick={this.showSelected}>show selected</button>
        <br/>
        <button onClick={this.passValues}>set products</button>
        <br/>
        <button onClick={this.showids}>show ids</button>
        <br/>

        <button onClick={this.setIds}>set ids</button>
        <br/>
        <button onClick={this.getIds}>get ids</button>
        <br/>
        <button onClick={this.getProduct}>get product</button>
        


      </div>
    );
  }
}