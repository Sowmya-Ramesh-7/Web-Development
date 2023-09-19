console.log("Hello World");
let pencil=10;
let eraser=5;
console.log("Total price =",pencil+eraser, "Rupees.");
let output="Total price ="+(pencil+eraser)+ " Rupees."
console.log(output);
console.log(`Total price= ${pencil+eraser} rupees.`); //template literals

// Arithmetic operation
console.log(pencil/eraser);
console.log(pencil++);
console.log(pencil);
//comparison operators
console.log(pencil!=eraser);
console.log(5=='5');
console.log("5==='5'",5==='5'); //triple equal to operator in js - compares type and value
for(let i=2;i<=10;i=i+2){
    console.log("for loop for even numbers:",i);
}
for(let i=10;i>5;i--){
    console.log("for loop:",i);
}
for(let i=15;i>=1;i=i-2){
    console.log("for loop for odd numbers:",i);
}
let n=prompt("Write your number");
//input is stored in the form of string
n=parseInt(n);
console.log(`Tables of ${n}:`);
for(let i=n;i<=n*10;i=i+n){
    console.log(i);
}
let i=1;
while(i<5){
    console.log(i);
    i++;
}

