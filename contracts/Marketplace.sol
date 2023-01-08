// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./PmToken.sol";

contract Marketplace {

    PmToken token;

    string public name = "Marketplace";
    uint256 public productCount = 0;

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

    mapping(uint256 => Product) public products;

    function InheritContract(address _pmtoken) public {
        token = PmToken(_pmtoken);  
    }

    //create product
    function createProduct(
        string memory _name,
        uint256 _productId,
        uint256 _price
    ) public {
        //require a valid name
        require(bytes(_name).length > 0);
        //require a valid price
        require(_price > 0);
        //increment product count
        productCount++;
        //create the product
        products[productCount] = Product(
            productCount,
            _name,
            _productId,
            _price,
            msg.sender,
            false
        );
        //trigger an event
        emit ProductCreated(
            productCount,
            _name,
            _productId,
            _price,
            msg.sender,
            false
        );
    }

    //purchase Product
    function fetchProduct(uint256 _id, uint256[] memory _ids, uint256[] memory _amounts, uint256[] memory _productCodes) public payable {
        //fetch the product
        Product memory _product = products[_id];
        //fetch the owner
        address payable _seller = payable(_product.owner);
        //make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount);
        //require that there is enough Ether in the transaction
        require(msg.value >= _product.price);
        //require that the product has not been purchased already
        require(!_product.purchased);
        //require that the buyer is not the seller
        require(_seller != msg.sender);
        //transfer ownership to the buyer
        _product.owner = msg.sender;
        //mark as purchased
        _product.purchased = true;
        //update the product
        products[_id] = _product;
        // Transfer the tokens from the buyer to the seller
        token.buyProducts(_seller, _ids, _amounts, _productCodes);
        emit ProductPurchased(
            productCount,
            _product.name,
            _product.productId,
            _product.price,
            msg.sender,
            true
        );
    }

    // call the buyProducts function from the PmToken contract to transfer the tokens from the buyer to the seller when a product is purchased
    function buyProducts(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        uint256[] memory _productCodes
    ) public payable {
        token.buyProducts(_to, _ids, _amounts, _productCodes);
    }

}
