// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Storage {
    struct SubSector {
        uint256 familyCode;
        string familyName;
        uint256 parentCode;
    }

    struct Category {
        uint256 code;
        string name;
        SubSector[] family;
    }

    mapping(uint256 => SubSector[]) codeToCategory;

    SubSector internal familySector;
    Category internal category;

    // function add category
    function addCategory(
        uint256 _code,
        string memory _name,
        uint256 _familyCode,
        string memory _familyName
    ) public {
        category.code = _code;
        category.name = _name;
        familySector = SubSector(_familyCode, _familyName, _code);
        category.family.push(familySector);

        // set category by code to the mapping
        // key is the category code, value is only the subcategory
        codeToCategory[_code] = category.family;
    }

    //function get category
    function getCategory() public view returns (Category memory) {
        return category;
    }

    //function set category by code
    // function setCategoryByCode(uint256 _code) public {
    //     codeToCategory[_code] = category.family;
    // }

    //function get category from mapping
    function getCategoryFromMapping(uint256 _code)
        public
        view
        returns (SubSector[] memory)
    {
        return codeToCategory[_code];
    }

    // function is familyCategory in the mapping
    function isFamilyCategoryInMapping(uint256 _code, uint256 _familyCode)
        public
        view
        returns (bool)
    {
        SubSector[] memory familySectorA = codeToCategory[_code];
        for (uint256 i = 0; i < familySectorA.length; i++) {
            if (familySectorA[i].familyCode == _familyCode) {
                return true;
            }
        }
        return false;
    }

    // check if a familySector has a parentcode == to Category.code
    function isFamilySectorInCategory(uint256 _code, uint256 _familyCode)
        public
        view
        returns (bool)
    {
        SubSector[] memory familySectorA = codeToCategory[_code];
        for (uint256 i = 0; i < familySectorA.length; i++) {
            if (
                familySectorA[i].familyCode == _familyCode &&
                familySectorA[i].parentCode == _code
            ) {
                return true;
            }
        }
        return false;
    }

    // check the category to which a family sector belongs by familyCode
    function getCategoryByFamilyCode(uint256 _familyCode)
        public
        view
        returns (uint256)
    {
        for (uint256 i = 0; i < category.family.length; i++) {
            if (category.family[i].familyCode == _familyCode) {
                return category.family[i].parentCode;
            }
        }
        return 0;
    }

    //remove category from mapping
    function removeCategoryFromMapping(uint256 _code) public {
        delete codeToCategory[_code];
    }

    //delete every struct instance
    function deleteCategory() public {
        delete category;
    }
}
