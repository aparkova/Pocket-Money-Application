// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CodeStorage {
    uint256[] public allowedProducts; //keys in mapping codes
    uint256[] public allowedProductsValues; //values in mapping codes of the allowedProducts keys
    uint256[] public categoriesToBuy = [2, 3];

    mapping(uint256 => uint256) codes;

    //map address to an array of integers
    mapping(address => uint256[]) codesByAddress;

    function setCodesByAdress(address _kidAddress, uint256[] memory _codes)
        public
    {
        allowedProducts = codesByAddress[_kidAddress];
        allowedProducts = _codes;
    }

    // each element in allowedProducts is a key in the codes mapping, get their values
    function setAllowedProductsValues(uint256[] memory _codes) public {
        for (uint256 i = 0; i < _codes.length; i++) {
            allowedProductsValues.push(codes[_codes[i]]);
        }
    }

    function setCategoryToMapping(uint256 _subCode, uint256 _code) public {
        // set category by code to the mapping
        // key is the category code, value is only the subcategory
        codes[_subCode] = _code;
    }

    function getCategoryFromMapping(uint256 _subCode)
        public
        view
        returns (uint256)
    {
        return codes[_subCode];
    }

    function compareArrays() public view returns (bool) {
        for (uint256 i = 0; i < allowedProductsValues.length; i++) {
            bool contains = false;
            for (uint256 j = 0; j < categoriesToBuy.length; j++) {
                if (allowedProductsValues[i] == categoriesToBuy[j]) {
                    contains = true;
                }
            }
            if (contains == false) {
                return false;
            }
        }
        return true;
    }

    function getAllowedProducts() public view returns (uint256[] memory) {
        return allowedProducts;
    }

    function getCategoriesToBuy() public view returns (uint256[] memory) {
        return categoriesToBuy;
    }

    function getAllowedProductsValues() public view returns (uint256[] memory) {
        return allowedProductsValues;
    }
}
