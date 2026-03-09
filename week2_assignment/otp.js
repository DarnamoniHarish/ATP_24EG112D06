console.log("OTP send successfully")
let i=11;

let intervalid=setInterval(()=>
{
    i--
    console.log(i)
    if(i==0){
    console.log("resend OTP")
    clearInterval(intervalid)
    }
},1000)
