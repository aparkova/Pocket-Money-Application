// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./CodeStorage.sol";

contract PmToken {
    CodeStorage codeStorage;
    string public name = "Pocket Money Token";
    string public symbol = "PMT";
    uint256 public totalSupply = 1000; //2**256 -1;
    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    function Existing(address _codestorage) public {
        codeStorage = CodeStorage(_codestorage);
    }

    function compareArrays() public view returns (bool) {
        return codeStorage.checkIfAllowedProductsValuesAreInCategoriesToBuy();
    }

    function transfer(address to, uint256 amount) external payable {
        require(compareArrays() == true, "Items are not allowed");
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
