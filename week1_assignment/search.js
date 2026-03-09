function search(a,k)
{
for(let i=0;i<a.length;i++)
{
    if(k==a[i])
        return i
}
return "Not Found"
}
let result=search([2,4,6,8],4)
console.log(result)