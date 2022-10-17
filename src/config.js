export const PM_TOKEN_ADDRESS = '0xe53c1C95fD7c051D1dA72D27cFd99Fe87b4A89f4'
export const PM_TOKEN_ABI =[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_codestorage",
				"type": "address"
			}
		],
		"name": "Existing",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "compareArrays",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


export const STORAGE_ADDRESS = '0xB585960045D7Efff368bc7859801fA8a9d25F772'
export const STORAGE_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_code",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_familyCode",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_familyName",
				"type": "string"
			}
		],
		"name": "addCategory",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deleteCategory",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCategory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "code",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "familyCode",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "familyName",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "parentCode",
								"type": "uint256"
							}
						],
						"internalType": "struct Storage.SubSector[]",
						"name": "family",
						"type": "tuple[]"
					}
				],
				"internalType": "struct Storage.Category",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_familyCode",
				"type": "uint256"
			}
		],
		"name": "getCategoryByFamilyCode",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_code",
				"type": "uint256"
			}
		],
		"name": "getCategoryFromMapping",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "familyCode",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "familyName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "parentCode",
						"type": "uint256"
					}
				],
				"internalType": "struct Storage.SubSector[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_code",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_familyCode",
				"type": "uint256"
			}
		],
		"name": "isFamilyCategoryInMapping",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_code",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_familyCode",
				"type": "uint256"
			}
		],
		"name": "isFamilySectorInCategory",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_code",
				"type": "uint256"
			}
		],
		"name": "removeCategoryFromMapping",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export const CODESTORAGE_ADDRESS = '0xDf7cA672019094254721f5E2E3A34de452c0C6A5'
export const CODESTORAGE_ABI =[
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "_codes",
				"type": "uint256[]"
			}
		],
		"name": "setAllowedProductsValues",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_subCode",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_code",
				"type": "uint256"
			}
		],
		"name": "setCategoryToMapping",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_kidAddress",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "_codes",
				"type": "uint256[]"
			}
		],
		"name": "setCodesByAdress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allowedProducts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allowedProductsValues",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "categoriesToBuy",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkIfAllowedProductsValuesAreInCategoriesToBuy",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllowedProducts",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllowedProductsValues",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCategoriesToBuy",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_subCode",
				"type": "uint256"
			}
		],
		"name": "getCategoryFromMapping",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]