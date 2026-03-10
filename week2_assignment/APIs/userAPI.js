
//create mini express app(seperate route)
import exp from 'express'
export const userApp=exp.Router()

let users=[]

//create API (enables interactions between the applications)
              //(REST API - REpresentational State Transfer)

    //Route to handle GET request of client(http://localhost:3000/users)
    userApp.get('/users',(req,res)=>{
        //read all users & send response
        res.json({message:"all users",payload:users})
        
    })

    // get by id
    userApp.get('/users/:id',(req,res)=>{
        let idOfUrl=Number(req.params.id)
        let user=users.find(obj=>obj.id==idOfUrl)
        if(user==undefined)
            return res.json({message:"user not found"})
        res.json({message:"a user",payload:users})
    })

    //Route to handle Post request of client
    userApp.post('/users',(req,res)=>{
        //get user from client
        const newUser=req.body
        //push
        users.push(newUser)
        //send res
        res.json({message:"user created"})
    })

    //Route to handle Put request of client 
    userApp.put('/users',(req,res)=>{
        //get modified user from client {}
        let modifiedUser=req.body
        //get index of user in users array
        let index=users.findIndex(userobj=>userobj.id==modifiedUser.id)
        //if user not found
        if(index==-1)
            return res.json({message:"user not found"})
        //update user with index
        users.splice(index,1,modifiedUser)
        //send res 
        res.json({message:"updated user"})
    })


    //Route to handle delete request of client
    userApp.delete('/users/:id',(req,res)=>{
        //get id of user  from url parameter
        let idOfUrl=Number(req.params.id)
        //find index
        let index=users.findIndex(userobj=>userobj.id==idOfUrl)
        //if user not found
        if(index==-1)
            return res.json({message:"user not found"})
        //delete user by index
        users.splice(index,1)
        //send res
        res.json({nessage:"user deleted"})
    })