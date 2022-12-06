// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./CodeStorage.sol";

contract TransferToken {
    CodeStorage codeStorage;
    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = 10000;
    }

    function Existing(address _codestorage) public {
        codeStorage = CodeStorage(_codestorage);
    }

    function compareArrays() public view returns (bool) {
        return codeStorage.compareArrays();
    }

    function isEligibleSeller(address _address) public view returns (bool) {
        return codeStorage.isEligibleSeller(_address);
    }

    function sendCoin(address receiver, uint256 amount)
        public
        payable
        returns (bool sufficient)
    {
        require(isEligibleSeller(receiver) == true, "Seller is not eligible");
        require(compareArrays() == true, "Items are not allowed");
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        codeStorage.deleteAllowedProducts();
        return true;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
