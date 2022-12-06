// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CodeStorage {
    uint256[] public allowedProducts; //keys in mapping codes
    uint256[] public allowedProductsValues; //values in mapping codes of the allowedProducts keys
    uint256[] public categoriesToBuy;
    address[] public eligibleSellers;

    mapping(uint256 => uint256) codes;

    //map address to an array of integers
    mapping(address => uint256[]) codesByAddress;
    mapping(address => mapping(uint256 => uint256)) codesOfAllowedProducts;

    //setter for codesofallowedproducts
    function setCodesOfAllowedProducts(
        address _address,
        uint256 _key,
        uint256 _value
    ) public {
        codesOfAllowedProducts[_address][_key] = _value;
    }

    //getter for codesofallowedproducts
    function getCodesOfAllowedProducts(address _address, uint256 _key)
        public
        view
        returns (uint256)
    {
        return codesOfAllowedProducts[_address][_key];
    }

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

    // setter for eligibleSellers
    function setEligibleSellers(address[] memory _eligibleSellers) public {
        eligibleSellers = _eligibleSellers;
    }

    // getter for eligibleSellers
    function getEligibleSellers() public view returns (address[] memory) {
        return eligibleSellers;
    }

    //check if a value is eligibleSellers
    function isEligibleSeller(address _address) public view returns (bool) {
        for (uint256 i = 0; i < eligibleSellers.length; i++) {
            if (eligibleSellers[i] == _address) {
                return true;
            }
        }
        return false;
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

    //each product in allowedproducts has to be in categoriestobuy, both arrays are not necessarily the same length

    function deleteAllowedProducts() public {
        delete allowedProducts;
        delete allowedProductsValues;
        delete categoriesToBuy;
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

    //set categories to buy
    function setCategoriesToBuy(uint256[] memory _categoriesToBuy) public {
        categoriesToBuy = _categoriesToBuy;
    }
}
