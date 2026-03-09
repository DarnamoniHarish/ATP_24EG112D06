const students = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];
//1.marks>=40
let result=students.filter(function(stuobj){
    return stuobj.marks>=40
}
)
console.log(result)
//2.add grade field
let r1=students.map(function(stuobj)
{
    if(stuobj.marks>=90)
        return 'A'
    else if(stuobj.marks>=75&&stuobj.marks<90)
        return 'B'
    else if(stuobj.marks>=60&&stuobj.marks<75)
        return 'C'
    else
        return 'D'
})
console.log(r1)
// avg marks
let r2=students.reduce((acc ,stuobj)=>acc+stuobj.marks,0)
let avg=r2/5
console.log(avg)
//who scored 92
let r3=students.find(stuobj=>stuobj.marks==92)
console.log(r3)
//student Kiran
let r4=students.findIndex(stuobj=>stuobj.name=="Kiran")
console.log(r4)