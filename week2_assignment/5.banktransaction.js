const transactions = [
  { id: 1, type: "credit", amount: 5000 },
  { id: 2, type: "debit", amount: 2000 },
  { id: 3, type: "credit", amount: 10000 },
  { id: 4, type: "debit", amount: 3000 }
];
//credit
let r1=transactions.filter(bank=>bank.type=="credit")
console.log(r1)
// transaction amount
let r2=transactions.map(bank=>bank.amount)
console.log(r2)
//final balance
let r3=transactions.reduce(function(acc,bank)
{
    if(bank.type=="credit")
        acc=acc+bank.amount
    return acc
},0)
console.log(r3)
// first debit
let r4=transactions.find(bank=>bank.type=="debit")
console.log(r4)
let r5=transactions.findIndex(bank=>bank.amount==10000)
console.log(r5)