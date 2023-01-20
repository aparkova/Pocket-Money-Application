// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./PmToken.sol";

contract Test {
    PmToken token;
    string public name = "Marketplace";
    uint256 public productCount = 0;

    struct Balance {
        uint256 balance;
        uint256[] allowedProducts;
    }

    struct Product {
        uint256 id;
        string name;
        uint256 productId;
        uint256 price;
        address owner;
        bool purchased;
    }

    event ProductCreated(
        uint256 id,
        string name,
        uint256 productId,
        uint256 price,
        address owner,
        bool purchased
    );

    event ProductPurchased(
        uint256 id,
        string name,
        uint256 productId,
        uint256 price,
        address owner,
        bool purchased
    );

    mapping(uint256 => mapping(uint256 => Product)) public products;

    function InheritContract(address _pmtoken) public {
        token = PmToken(_pmtoken);
    }

    function createProduct(
        uint256 _categoryId,
        uint256 _productId,
        string memory _name,
        uint256 _price
    ) public {
        // Create a new product
        Product memory newProduct = Product({
            id: _categoryId,
            name: _name,
            productId: _productId,
            price: _price,
            owner: msg.sender,
            purchased: false
        });

        // Add the new product to the mapping
        products[_categoryId][_productId] = newProduct;

        // Trigger the ProductCreated event
        emit ProductCreated(
            newProduct.id,
            newProduct.name,
            newProduct.productId,
            newProduct.price,
            newProduct.owner,
            newProduct.purchased
        );
    }

    function getAccountBalance(uint256 _id)
        public
        view
        returns (uint256 balance)
    {
        PmToken.Balance memory accountBalance = token.getBalance(
            msg.sender,
            _id
        );
        return accountBalance.balance;
    }

    function buyProducts(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        uint256[] memory _productCodes
    ) public {
        token.buyProducts(msg.sender, _to, _ids, _amounts, _productCodes);
    }

    function contains(uint256[] memory _array, uint256 _value)
        internal
        pure
        returns (bool)
    {
        for (uint256 i = 0; i < _array.length; i++) {
            if (_array[i] == _value) {
                return true;
            }
        }
        return false;
    }

    function purchaseProduct(uint256 _categoryId, uint256 _productId) public {
        //fetch the product
        Product memory _product = getProductByCategoryAndId(
            _categoryId,
            _productId
        );
        //fetch the owner
        address _seller = _product.owner;
        // make sure the product has a valid id, that matches one of the categories the msg.sender is allowed to buy

        //require that there is enough tokens in the contract for the transaction
        require(getAccountBalance(_product.id) >= _product.price);
        //require that the product has not been purchased already
        require(!_product.purchased);
        //require that the buyer is not the seller
        require(_seller != msg.sender);
        //transfer ownership to the buyer
        _product.owner = msg.sender;
        //mark as purchased
        _product.purchased = true;
        //update the product
        products[_categoryId][_productId] = _product;
        //pay the seller by buying the product
        uint256[] memory _ids = new uint256[](1);
        _ids[0] = _product.id;
        uint256[] memory _amounts = new uint256[](1);
        _amounts[0] = _product.price;
        uint256[] memory _productCodes = new uint256[](1);
        _productCodes[0] = _product.productId;
        buyProducts(_seller, _ids, _amounts, _productCodes);
        //trigger an event
        emit ProductPurchased(
            _product.id,
            _product.name,
            _product.productId,
            _product.price,
            msg.sender,
            true
        );
    }

    function getProductByCategoryAndId(uint256 _categoryId, uint256 _productId)
        public
        view
        returns (Product memory)
    {
        // Retrieve the product from the nested mapping
        Product memory product = products[_categoryId][_productId];
        return product;
    }
}
