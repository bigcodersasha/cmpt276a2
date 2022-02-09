let c1 = ()=> {console.log("c1")};
let c2 = ()=> {console.log("c2")};

console.log("start...")
setTimeout(c1,1000);
setTimeout(c2,500);
console.log("...end!!")
