const user = {
 id: 101,
name: "Ravi",
preferences: {
   theme: "dark",
   language: "en"    
  }
};
let slcopy={...user}
//change name in the copied object
slcopy.name="Hari"
//change preferences.theme in the copied object
slcopy.preferences.theme="light"
//Log both original and copied objects
console.log(user)
console.log(slcopy)
