// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./CodeStorage.sol";

contract Test1 {
    uint256 public test;

    function setTest(uint256 _test) public {
        test = _test;
    }
}
