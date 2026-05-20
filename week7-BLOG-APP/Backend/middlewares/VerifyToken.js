import { config } from "dotenv"
import  jwt from "jsonwebtoken"
const {verify}=jwt
config()



export const verifyToken=(...allowedRoles)=>{
 return(req,res,next)=>{
    try{
    //get token from cookie
    const token=req.cookies?.token
    //check token existed or not
    if(!token)
    {
        return res.status(401).json({message:"plz login"})
    }
    //validate token(decode the token)
    let decodedToken=verify(token,process.env.SECRET_KEY)

    //check the role is same as role in decodedToken
    if(!allowedRoles.includes(decodedToken.role))
    {
        res.status(403).json({message:"you are not authorised"})
    }
    //add decodedtoken
    req.user=decodedToken
    next()
}
catch(err){
    res.status(401).json({message:"Invalid Token"})
}
}
}