// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract PmToken {
    struct Balance {
        uint256 balance;
        uint256[] allowedProducts;
    }

    string public name = "Pocket Money Token";
    string public symbol = "PMT";
    uint256 public totalSupply = 1000; //2**256 -1;
    string public standard = "Pocket Money Token v1.0";
    uint8 public constant decimals = 18;
    uint256[] public ids = [67000000, 50000000, 6700000050000000];

    mapping(address => uint256) balances;
    mapping(address => mapping(uint256 => Balance)) conditions;

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    function getBalance(address _address, uint256 _id)
        public
        view
        returns (Balance memory)
    {
        return conditions[_address][_id];
    }

    // transfer pocket money - parent to kid
    function transfer(address _to, uint256 _amount) external payable {
        require(balances[msg.sender] >= _amount, "Not enough tokens");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    function checkIfArraysAreTheSame(
        uint256[] memory _storedArray,
        uint256[] memory _newArray
    ) public pure returns (bool) {
        if (_storedArray.length != _newArray.length) {
            return false;
        } else {
            for (uint256 i = 0; i < _storedArray.length; i++) {
                if (_storedArray[i] != _newArray[i]) {
                    return false;
                }
            }
            return true;
        }
    }

    function checkIfAlreadyStored(
        uint256[] memory _oldArray,
        uint256[] memory _newArray
    ) internal pure returns (bool) {
        for (uint256 i = 0; i < _oldArray.length; i++) {
            for (uint256 j = 0; j < _newArray.length; j++) {
                if (_oldArray[i] == _newArray[j]) {
                    return true;
                }
            }
        }
        return false;
    }

    //function transfer with conditions
    function transferWithConditions(
        address _to,
        uint256 _id,
        uint256 _amount,
        uint256[] memory _allowedProducts
    ) external payable {
        require(balances[msg.sender] >= _amount, "Not enough tokens");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        conditions[_to][_id].balance += _amount;
        uint256[] memory combinedArray = new uint256[](
            conditions[_to][_id].allowedProducts.length +
                _allowedProducts.length
        );
        //check if the new array is already stored in the old array
        // if the old array contains all the elements of the new array, then we don't need to store the new array
        if (
            checkIfAlreadyStored(
                conditions[_to][_id].allowedProducts,
                _allowedProducts
            )
        ) {
            return;
        }
        //if the old array doesn't contain all the elements of the new array, then we need to attach only the different value to the array
        for (
            uint256 i = 0;
            i < conditions[_to][_id].allowedProducts.length;
            i++
        ) {
            combinedArray[i] = conditions[_to][_id].allowedProducts[i];
        }
        for (uint256 i = 0; i < _allowedProducts.length; i++) {
            combinedArray[
                i + conditions[_to][_id].allowedProducts.length
            ] = _allowedProducts[i];
        }
        conditions[_to][_id].allowedProducts = combinedArray;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
