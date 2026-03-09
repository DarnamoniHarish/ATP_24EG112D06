let test=function (a,b,c)
{
if(a>c)
    if(a>b)
        return a
    else
        return c
else 
    if(b>c)
        return b
    else
        return c
}
let result=test(10,30,20)
console.log(result)