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

        //array1 and array2, and adds the elements in array2 that are not present in array1 to the end of array1. The difference array is used to store the elements that are present in array2 but not in array1
        // if the new array doesn't have any values that are present in the old array, then attach the new array to the old one

        if (
            !checkIfAlreadyStored(
                conditions[_to][_id].allowedProducts,
                _allowedProducts
            )
        ) {
            for (uint256 i = 0; i < _allowedProducts.length; i++) {
                conditions[_to][_id].allowedProducts.push(_allowedProducts[i]);
            }
        }

        uint256[] memory difference = new uint256[](
            _allowedProducts.length -
                conditions[_to][_id].allowedProducts.length
        );
        uint256 k = 0;
        for (uint256 i = 0; i < _allowedProducts.length; i++) {
            if (
                !checkIfAlreadyStored(
                    conditions[_to][_id].allowedProducts,
                    _allowedProducts
                )
            ) {
                difference[k] = _allowedProducts[i];
                k++;
            }
        }
        for (uint256 i = 0; i < difference.length; i++) {
            conditions[_to][_id].allowedProducts.push(difference[i]);
        }

        conditions[_to][_id].allowedProducts = _allowedProducts;
    }

    //check if conditions stored for a specific address are fulfilled, when the kid wants to spend the pocket money
    function checkConditions(
        address _from,
        uint256 _id,
        uint256 _amount,
        uint256[] memory _products
    ) public view returns (bool) {
        if (conditions[_from][_id].balance >= _amount) {
            if (
                checkIfArraysAreTheSame(
                    conditions[_from][_id].allowedProducts,
                    _products
                )
            ) {
                return true;
            }
        }
        return false;
    }

    //spend pocket money - kid to merchant
    //function takes as parameters the seller's address, the id of the conditions, the amount of pocket money to spend, and the products bought
    function spend(
        address _from,
        uint256 _id,
        uint256 _amount,
        uint256[] memory _products
    ) external payable {
        require(
            checkConditions(_from, _id, _amount, _products),
            "Conditions not fulfilled"
        );
        balances[_from] -= _amount;
        balances[msg.sender] += _amount;
        conditions[_from][_id].balance -= _amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
