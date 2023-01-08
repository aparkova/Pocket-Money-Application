const data = [
    {
        amount: 100,
        categories: ['food', 'clothes'],
    },
    {
        amount: 200,
        categories: ['drinks', 'clothes'],
    },
    {
        amount: 300,
        categories: ['pencils'],
    }
]

function pay(data, categoryToBuy, amountToBuy) {
    let amountLeft = amountToBuy;

    for(let i = 0; i < data.length; i++) {
        const { amount, categories} = data[i];

        if (categories.includes(categoryToBuy)) {
           if( amount >= amount){ // there is an element in data that has sufficient amount
                data[i].amount -= amountToBuy;
                return 'success';
           } else { // there is an element in data that has insufficient amount
                data[i].amount = 0; // used for pay
                amountLeft -= amount;
                
           }
        }
    }
    return 'failure'
}


// each new added condition should be added to the end of the array as a new array
["Food", "Clothes", ["Pencils"]]


// mapping(address => (string => Balances Struct))

// string: ID that you can easily calculate

// (like hash)

// if the key is calculated same, then add the values



// 1. create a unique id for each condition(an array)
// 2. store the condition in the mapping
// 3. when you want to pay, you can easily find the condition by the id



// logic for hashing the array and creating an unique id for it!!!
const arr = [1, 2, 3];
const concatArr = arr.join('');
// create a unique id for the arr by hashing it
function hash(){
    var hash = 0, i, chr;
    if (concatArr.length === 0) return hash;
    for (i = 0; i < concatArr.length; i++) {
      chr   = concatArr.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    console.log(hash)
    return hash;
}
const id = hash(concatArr);
console.log(id)
