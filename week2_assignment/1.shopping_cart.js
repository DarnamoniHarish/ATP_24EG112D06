const cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
]

//1.Filter
let result=cart.filter(function(cart)
{ 
    if(cart.inStock==true)
        return cart;
})
console.log(result)

//2.map
let r1=cart.map(cart=>cart.name+" "+(cart.price*cart.quantity))
console.log(r1)

//3.reduce
let r2=cart.reduce((acc ,cartobj)=>acc+(cartobj.price*cartobj.quantity),0)
console.log("grand total =",r2)

//4.find
let r3=cart.find(cartobj=>cartobj.name=="Mouse")
console.log(r3)

//5.findIndex
let r4=cart.findIndex(cartobj=>cartobj.name=="Keyboard")
console.log(r4)