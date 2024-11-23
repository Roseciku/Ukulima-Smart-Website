function validEmail(email){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validPassword(password){
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return passwordPattern.test(password);
}

const registrationForm= document.getElementById('registration_form');

registrationForm.addEventListener('submit', async(e)=>{

    e.preventDefault()


const name= document.getElementById('name').value;
const email= document.getElementById('email').value;
const password= document.getElementById('password').value;
const confirmPassword= document.getElementById('confirmpassword').value;
const phone= document.getElementById('phone').value;
const county= document.getElementById('county').value;
const town= document.getElementById('town').value;
const role= document.getElementById('role').value;



const nameError = document.getElementById('nameerror');
const emailError = document.getElementById('emailerror');
const passwordError= document.getElementById('passworderror');
const confirmError= document.getElementById('confirmerror');
const phoneError =document.getElementById('phoneerror');
const countyError = document.getElementById('countyerror');
const townError = document.getElementById('townerror');
const roleError =document.getElementById('roleerror')


nameError.innerHTML="";
emailError.innerHTML="";
passwordError.innerHTML="";
confirmError.innerHTML="";
phoneError.innerHTML="";
countyError.innerHTML="";
townError.innerHTML="";
roleError.innerText=""


isValid=true

if(!name){
    nameError.innerHTML="Enter your name";
    isValid=false;
    
} 

if(!email|| !validEmail(email)){
    emailError.innerHTML="Enter a Valid email";
    isValid=false;
}

 if(!password|| password.length <6 || !validPassword(password)){
    passwordError.innerHTML="Password should be more that 6 characters and have uppercase,lower case letters and numbers";
    isValid=false;
}

if(confirmPassword !== password){
    confirmError.innerHTML="Your confirm password doesn't match your password";
    isValid=false;
}

if(!phone|| phone.length <10 ||  phone.length >10){
    phoneError.innerHTML="Enter a valid phone number";
    isValid=false;
}

if(!county){
    countyError.innerHTML="Enter your County"
    isValid=false;
}

if(!town){
    townError.innerHTML="Enter the nearest town"
    isValid=false;
}

if(!role){
    roleError.innerHTML="Enter your role"
    isValid=false;
}


if(isValid){
    //  window.location.href = 'login.html';
    // alert("You have successfully signed up!");

    try {
     const response = await fetch('http://localhost:4000/api/register/user', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password,
            phone,
            county,
            town,
            role,
        })
     });

     const result =await response.json();

     if(response.ok){
        alert("Registration successful");
        window.location.href = 'login.html';
     }else{
        alert("Registration failed:"+ result.message);
     }

    } catch (error) {
        console.error("Error:",error)
    }
}

registrationForm.reset();
})