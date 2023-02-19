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

    function transferWithConditions(
        address _to,
        uint256 _id,
        uint256 _amount,
        uint256[] memory _allowedProducts
    ) external {
        require(balances[msg.sender] >= _amount, "Not enough tokens");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        conditions[_to][_id].balance += _amount;

        //A variable to check if all elements of `_allowedProducts` are present in `conditions[_to][_id].allowedProducts`
        bool allElementsPresent = true;
        for (uint256 i = 0; i < _allowedProducts.length; i++) {
            //A variable to check if the current element is present in `conditions[_to][_id].allowedProducts`
            bool elementPresent = false;
            for (
                uint256 j = 0;
                j < conditions[_to][_id].allowedProducts.length;
                j++
            ) {
                // If the current element in `_allowedProducts` is found in `conditions[_to][_id].allowedProducts`, set `elementPresent` to true
                if (
                    _allowedProducts[i] ==
                    conditions[_to][_id].allowedProducts[j]
                ) {
                    elementPresent = true;
                    break;
                }
            }
            // If the current element is not found in `conditions[_to][_id].allowedProducts`, set `allElementsPresent` to false
            if (!elementPresent) {
                allElementsPresent = false;
                break;
            }
        }

        if (!allElementsPresent) {
            // Create a new array to store the difference between the two arrays
            uint256[] memory difference = new uint256[](
                _allowedProducts.length
            );
            uint256 k = 0;

            // Loop through the _allowedProducts array to find elements not present in conditions[_to][_id].allowedProducts
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
                // If the current element is not found in `conditions[_to][_id].allowedProducts`, add it to the difference array
                if (!elementPresent) {
                    difference[k] = _allowedProducts[i];
                    k++;
                }
            }

            // Create a new array to store the concatenated result
            uint256[] memory result = new uint256[](
                conditions[_to][_id].allowedProducts.length + k
            );

            // Copy the elements from the conditions array to the result array
            for (
                uint256 i = 0;
                i < conditions[_to][_id].allowedProducts.length;
                i++
            ) {
                result[i] = conditions[_to][_id].allowedProducts[i];
            }

            // Copy the elements from the difference array to the result array
            for (uint256 i = 0; i < k; i++) {
                result[
                    i + conditions[_to][_id].allowedProducts.length
                ] = difference[i];
            }

            // Update the conditions array with the concatenated result
            conditions[_to][_id].allowedProducts = result;
        }
    }

    function buyProducts(
        address _from,
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        uint256[] memory _productCodes
    ) public {
        for (uint256 i = 0; i < _ids.length; i++) {
            // Check if the product is in the allowedProducts array for the sender
            bool productAllowed = false;
            // Loop through the allowedProducts array to check if the product is allowed
            for (
                uint256 j = 0;
                j < conditions[_from][_ids[i]].allowedProducts.length;
                j++
            ) {
                // If the product is found in the allowedProducts array, set `productAllowed` to true
                if (
                    contains(
                        _productCodes,
                        conditions[_from][_ids[i]].allowedProducts[j]
                    )
                ) {
                    productAllowed = true;
                    break;
                }
            }

            if (productAllowed) {
                // Check if the sender has enough balance in the conditions mapping to make the purchase
                require(
                    conditions[_from][_ids[i]].balance >= _amounts[i],
                    "Not enough balance"
                );

                // Make the transfer
                conditions[_to][_ids[i]].balance += _amounts[i];
                conditions[_from][_ids[i]].balance -= _amounts[i];
            } else {
                revert(
                    "One or more of the product codes are not allowed for purchase"
                );
            }
        }

        // Calculate the total amount to be transferred and subtract from the balance of the sender
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < _amounts.length; i++) {
            totalAmount += _amounts[i];
        }
        balances[_from] -= totalAmount;
        balances[_to] += totalAmount;
    }

    // reset conditions mapping
    function resetConditions(address _address, uint256 _id) external {
        uint256 totalBalance = conditions[_address][_id].balance;
        conditions[_address][_id].balance = 0;
        conditions[_address][_id].allowedProducts = new uint256[](0);
        balances[_address] -= totalBalance;
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
