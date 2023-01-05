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

    // ERC20 transfer function
    function transfer(address _to, uint256 _amount) external payable {
        require(balances[msg.sender] >= _amount, "Not enough tokens");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    function checkIfAlreadyStored(
        uint256[] memory _oldArray,
        uint256[] memory _newArray
    ) internal pure returns (bool) {
        for (uint256 i = 0; i < _newArray.length; i++) {
            if (!contains(_oldArray, _newArray[i])) {
                return false;
            }
        }
        return true;
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

    function concat(uint256[] memory _array1, uint256[] memory _array2)
        internal
        pure
        returns (uint256[] memory)
    {
        uint256[] memory result = new uint256[](
            _array1.length + _array2.length
        );
        for (uint256 i = 0; i < _array1.length; i++) {
            result[i] = _array1[i];
        }
        for (uint256 i = 0; i < _array2.length; i++) {
            result[_array1.length + i] = _array2[i];
        }
        return result;
    }

    function conditionalTransfer(
        address _to,
        uint256 _id,
        uint256 _amount,
        uint256[] memory _allowedProducts
    ) external payable {
        require(balances[msg.sender] >= _amount, "Not enough tokens");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        conditions[_to][_id].balance += _amount;

        bool allElementsPresent = true;
        for (uint256 i = 0; i < _allowedProducts.length; i++) {
            bool elementPresent = false;
            for (
                uint256 j = 0;
                j < conditions[_to][_id].allowedProducts.length;
                j++
            ) {
                if (
                    _allowedProducts[i] ==
                    conditions[_to][_id].allowedProducts[j]
                ) {
                    elementPresent = true;
                    break;
                }
            }
            if (!elementPresent) {
                allElementsPresent = false;
                break;
            }
        }

        if (!allElementsPresent) {
            // Concatenate the two arrays
            uint256[] memory difference = new uint256[](
                _allowedProducts.length
            );
            uint256 k = 0;
            for (uint256 i = 0; i < _allowedProducts.length; i++) {
                bool elementPresent = false;
                for (
                    uint256 j = 0;
                    j < conditions[_to][_id].allowedProducts.length;
                    j++
                ) {
                    if (
                        _allowedProducts[i] ==
                        conditions[_to][_id].allowedProducts[j]
                    ) {
                        elementPresent = true;
                        break;
                    }
                }
                if (!elementPresent) {
                    difference[k] = _allowedProducts[i];
                    k++;
                }
            }

            uint256[] memory result = new uint256[](
                conditions[_to][_id].allowedProducts.length + k
            );
            for (
                uint256 i = 0;
                i < conditions[_to][_id].allowedProducts.length;
                i++
            ) {
                result[i] = conditions[_to][_id].allowedProducts[i];
            }
            for (uint256 i = 0; i < k; i++) {
                result[
                    i + conditions[_to][_id].allowedProducts.length
                ] = difference[i];
            }
            conditions[_to][_id].allowedProducts = result;
        }
    }

    function buyProducts(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        uint256[] memory _productCodes
    ) public payable {
        for (uint256 i = 0; i < _ids.length; i++) {
            // Check if the product is in the allowedProducts array for the sender
            bool productAllowed = false;
            for (
                uint256 j = 0;
                j < conditions[msg.sender][_ids[i]].allowedProducts.length;
                j++
            ) {
                if (
                    contains(
                        _productCodes,
                        conditions[msg.sender][_ids[i]].allowedProducts[j]
                    )
                ) {
                    productAllowed = true;
                    break;
                }
            }

            if (productAllowed) {
                // Check if the sender has enough balance in the conditions mapping to make the purchase
                require(
                    conditions[msg.sender][_ids[i]].balance >= _amounts[i],
                    "Not enough balance"
                );

                // Make the transfer
                conditions[_to][_ids[i]].balance += _amounts[i];
                conditions[msg.sender][_ids[i]].balance -= _amounts[i];
            } else {
                revert(
                    "One or more of the product codes are not allowed for purchase"
                );
            }
        }
    }

    // reset conditions mapping
    function resetConditions(address _address, uint256 _id) external {
        conditions[_address][_id].balance = 0;
        conditions[_address][_id].allowedProducts = new uint256[](0);
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    function getBalance(address _address, uint256 _id)
        public
        view
        returns (Balance memory)
    {
        return conditions[_address][_id];
    }
}
