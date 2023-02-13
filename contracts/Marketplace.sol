// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./PmToken.sol";

contract Marketplace {
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

    struct Purchase {
        uint256 productId;
        uint256 quantity;
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
    mapping(address => Purchase[]) public purchases;

    constructor() {
        InheritContract(0xCF2De6A10e6818b76A1e5bE6AF78Fc57b67af769);
    }

    function InheritContract(address _pmtoken) public {
        token = PmToken(_pmtoken);
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

    //getter for purchases
    function getPurchases(address _address)
        public
        view
        returns (Purchase[] memory)
    {
        return purchases[_address];
    }

    function buyProducts(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        uint256[] memory _productCodes
    ) public {
        token.buyProducts(msg.sender, _to, _ids, _amounts, _productCodes);
    }

    function getBalance(address _account, uint256 _id)
        public
        view
        returns (PmToken.Balance memory)
    {
        return token.getBalance(_account, _id);
    }

    function GetBalanceOfCurrAddress(uint256 _id)
        public
        view
        returns (PmToken.Balance memory)
    {
        return getBalance(msg.sender, _id);
    }

    //create product
    function createProduct(
        uint256 _categoryId,
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
        products[_productId] = Product(
            _categoryId,
            _name,
            _productId,
            _price,
            msg.sender,
            false
        );
    }

    //get product by id from the mapping
    function getProduct(uint256 _productId)
        public
        view
        returns (Product memory)
    {
        return products[_productId];
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

    //purchase product, using buyProducts for the transfer of tokens
    function purchaseProduct(uint256 _productId) public {
        //fetch the product
        Product memory _product = products[_productId];
        //fetch the owner
        address _seller = _product.owner;
        require(
            contains(
                token.getBalance(msg.sender, _product.id).allowedProducts,
                _product.productId
            ),
            "One or more of the product codes are not allowed for purchase"
        );
        //require that there is enough tokens in the contract for the transaction
        require(
            getAccountBalance(_product.id) >= _product.price,
            "Your account balance is too low for this transaction. Please add funds to your account"
        );
        //require that the buyer is not the seller
        require(_seller != msg.sender);
        //update the product
        products[_productId] = _product;
        //pay the seller by buying the product
        uint256[] memory _ids = new uint256[](1);
        _ids[0] = _product.id;
        uint256[] memory _amounts = new uint256[](1);
        _amounts[0] = _product.price;
        uint256[] memory _productCodes = new uint256[](1);
        _productCodes[0] = _product.productId;
        buyProducts(_seller, _ids, _amounts, _productCodes);
        // update the purchases mapping
        bool productExist = false;
        for (uint256 i = 0; i < purchases[msg.sender].length; i++) {
            if (purchases[msg.sender][i].productId == _product.productId) {
                purchases[msg.sender][i].quantity++;
                productExist = true;
                break;
            }
        }
        if (!productExist) {
            Purchase memory _purchase = Purchase(_product.productId, 1);
            purchases[msg.sender].push(_purchase);
        }
    }
}
