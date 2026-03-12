
import jwt from 'jsonwebtoken'
const {verify}=jwt
export function verifyToken(req,res,next){
    //token verification logic
    const token=req.cookies?.token;
    //if token is undefined
    if(!token)
        return res.status(401).json({message:"plz login"})
    try{
    //if token is exists
    const decodedToken=verify(token,"Harish")
    console.log(decodedToken)
    //
    req.user=decodedToken
    //call next
    next()
    }
    catch(err)
    {
        res.status(401).json({message:"session expired"})
    }
}