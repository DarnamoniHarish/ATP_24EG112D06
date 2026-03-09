function arraySum(a)
{
    let sum=0
for(let i=0;i<a.length;i++)
{
    sum=sum+a[i]
}
return sum
}
let result=arraySum([10,20,30,40,50])
console.log(result)