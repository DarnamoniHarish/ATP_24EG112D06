function sum(...a){
let r1=a.reduce((acc ,sumobj)=>acc+sumobj)
return r1;
}
console.log(sum(10,20,30))