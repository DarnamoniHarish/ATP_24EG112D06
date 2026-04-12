import {create} from 'zustand'


//create store
export const useCounterStore=create((set)=>({
    //state
    newCounter:0,
    newCounter1:100,
    //add user state
    user:{name:"Harish",email:"harish@gmail.com",age:20},
    //change email
    changeEmail:()=>set({...user,email:"harishraj@gmail.com"}),
    //changename and age
    chaneNameAndAge:()=>({...user,name:"HarishRaj",age:21}),
    //function to modify the state
    incrementCounter:()=>set(state=>({newCounter:state.newCounter+1})),
    decrementCounter:()=>set(state=>({newCounter:state.newCounter-1})),
    incrementCounter1:()=>set(state=>({newCounter1:state.newCounter1+1})),
    reset:()=>set({newCounter:0}),
    //function to change the newCounter to 500
    changeCounter:()=>set({newCounter:500}),
    //decrement by 20
    decrementCounter1:()=>set(state=>({newCounter1:state.newCounter1-20})),


}));