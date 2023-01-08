// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./CodeStorage.sol";

contract Old {
    struct Balance {
        uint256 balance;
        uint256[] allowedProducts;
    }

    CodeStorage codeStorage;

    uint256 public counter;
    address public testAddress;
    string public name = "Pocket Money Token";
    string public symbol = "PMT";
    uint256 public totalSupply = 1000; //2**256 -1;
    string public standard = "Ppocket Money Token v1.0";
    uint8 public constant decimals = 18;
    uint256[] public ids = [67000000, 50000000, 6700000050000000];

    mapping(address => uint256) balances;
    mapping(address => Balance[]) balanceToConditions1;
    mapping(address => mapping(uint256 => Balance)) assignConditions;

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    //get all elements stored in the assign conditions mapping for a specific address.
    //Possible id values for the keys in the nested mapping are in the ids array
    //return the value of each id key in the nested mapping as a separate array
    function getAssignConditions(address _address)
        public
        view
        returns (Balance[] memory)
    {
        Balance[] memory assignConditionsArr = new Balance[](ids.length);
        for (uint256 i = 0; i < ids.length; i++) {
            assignConditionsArr[i] = assignConditions[_address][ids[i]];
        }
        return assignConditionsArr;
    }

    function InheritContract(address _codestorage) public {
        codeStorage = CodeStorage(_codestorage);
    }

    function compareArrays() public view returns (bool) {
        return codeStorage.compareArrays();
    }

    function deleteAllowedProducts() public {
        return codeStorage.deleteAllowedProducts();
    }

    function isEligibleSeller(address _address) public view returns (bool) {
        return codeStorage.isEligibleSeller(_address);
    }

    // transfer pocket money - parent to kid
    function transfer(address _to, uint256 _amount) external payable {
        require(balances[msg.sender] >= _amount, "Not enough tokens");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    // buying products, resetting attached conditions (only for the kid)
    function buyProducts(address _to, uint256 _amount) external payable {
        require(compareArrays() == true, "Items are not allowed");
        require(isEligibleSeller(_to) == true, "Seller is not eligible");
        require(balances[msg.sender] >= _amount, "Not enough tokens");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        deleteAllowedProducts();
    }

    function transferWithConditions(
        address _to,
        uint256 _amount,
        uint256 _id,
        uint256[] memory _allowedProducts
    ) external payable {
        require(balances[msg.sender] >= _amount, "Not enough tokens");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        assignConditions[_to][_id] = Balance(_amount, _allowedProducts);
    }

    function getAssignConditions(address _address, uint256 _id)
        public
        view
        returns (Balance memory)
    {
        return assignConditions[_address][_id];
    }

    function getAssignConditionsAllowedProducts(address _address, uint256 _id)
        public
        view
        returns (uint256, uint256[] memory)
    {
        return (
            assignConditions[_address][_id].balance,
            assignConditions[_address][_id].allowedProducts
        );
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    //set balancetoConditions
    // function setBalanceToConditions(
    //     address _address,
    //     uint256[] memory _testArray
    // ) public {
    //     balanceToConditions[_address][balances[_address]] = _testArray;
    // }

    function getBalanceWithConditions(address _address)
        public
        view
        returns (Balance[] memory)
    {
        return balanceToConditions1[_address];
    }

    // iterate the array of structs in balancetoConditions1 mapping and return the balance attribute of each struct
    function getBalanceToConditions(address _address)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory balanceArr = new uint256[](
            balanceToConditions1[_address].length
        );
        for (uint256 i = 0; i < balanceToConditions1[_address].length; i++) {
            balanceArr[i] = balanceToConditions1[_address][i].balance;
        }
        return balanceArr;
    }

    // iterate the array of structs in balancetoConditions1 mapping and return the allowedProducts attribute of each struct
    function getConditions(address _address)
        public
        view
        returns (uint256[] memory)
    {
        uint256 count = 0;

        for (uint256 i = 0; i < balanceToConditions1[_address].length; i++) {
            for (
                uint256 j = 0;
                j < balanceToConditions1[_address][i].allowedProducts.length;
                j++
            ) {
                // allowedProductsArr[count] = balanceToConditions1[_address][i].allowedProducts[j];
                count++;
            }
        }
        uint256[] memory allowedProductsArr = new uint256[](count);
        count = 0;
        for (uint256 i = 0; i < balanceToConditions1[_address].length; i++) {
            for (
                uint256 j = 0;
                j < balanceToConditions1[_address][i].allowedProducts.length;
                j++
            ) {
                allowedProductsArr[count] = balanceToConditions1[_address][i]
                    .allowedProducts[j];
                count++;
            }
        }
        return allowedProductsArr;
    }
}
