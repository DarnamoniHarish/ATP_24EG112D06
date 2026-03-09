const order = {
     orderId: "ORD1001",
     customer: {
        name: "Anita",
        address: {
            city: "Hyderabad",
            pincode: 500085
             }
        },
      items: [
        { product: "Laptop", price: 70000 }
    ]
};
let dpcopy=structuredClone(order)
dpcopy.customer.address.city="Chennai"
dpcopy.items[0].price=80000
console.log(order)
console.log(dpcopy)