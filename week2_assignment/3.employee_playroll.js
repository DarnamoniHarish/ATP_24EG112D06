const employees = [
  { id: 201, name: "Amit", salary: 45000, department: "IT" },
  { id: 202, name: "Neha", salary: 60000, department: "HR" },
  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
  { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
];
//1.employees from IT
let r1=employees.filter(empobj=>empobj.department=="IT")
console.log(r1)
//2.add netsalary
let r2=employees.map(empobj=>empobj.salary+empobj.salary*0.10)
console.log(r2)
//calculate total salary
let r3=employees.reduce((acc ,empobj)=>acc+empobj.salary,0)
console.log(r3)
//salary with 30000
let r4=employees.find(empobj=>empobj.salary==30000)
console.log(r4)
//employee neha
let r5=employees.findIndex(emp=>emp.name=="Neha")
console.log(r5)