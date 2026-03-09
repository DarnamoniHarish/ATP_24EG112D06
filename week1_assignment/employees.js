const employees = [
  {
    eno: 101,
    name: "Ravi",
    marks: [78, 82, 91],
  },
  {
    eno: 102,
    name: "Bhanu",
    marks: [65, 70, 68],
  },
  {
    eno: 103,
    name: "Sneha",
    marks: [88, 92, 95],
  },
  {
    eno: 104,
    name: "Kiran",
    marks: [55, 60, 58],
  },
  {
    eno: 105,
    name: "Anitha",
    marks: [90, 85, 87],
  },
]
// 1.insert at 2 position
employees.splice(2,0,{eno:106,name:"harish",marks:[90,79,88]})
console.log(employees)

// 2.remove an emp
employees.splice(4,1)
console.log(employees)

//3.change marks of sneha
employees[3].marks[2]=75
console.log(employees)
