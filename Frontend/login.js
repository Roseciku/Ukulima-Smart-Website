
const loginForm=document.getElementById('loginform');

loginForm.addEventListener('submit', (e)=>{

e.preventDefault()

const email =document.getElementById('email');
const password= document.getElementById('password');

let emailError= document.getElementById("emailerror");
let passwordError= document.getElementById("passworderror");


emailError.innerHTML="";
passwordError.innerHTML ="";


let isValid=true


if(!email|| !isValidEmail(email)){
    emailError.innerHTML="Enter a Valid email";
    isValid=false;
}

 if(!password|| password.length <6 || !isValidPassword(password)){
    passwordError.innerHTML="Password should be more that 6 characters and have uppercase,lower case letters and numbers";
    isValid=false;
}

if(isValid){
   

}


})

