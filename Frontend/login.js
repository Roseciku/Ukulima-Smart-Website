
// import jwtDecode from 'jwt-decode';

function validEmail(email){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validPassword(password){
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return passwordPattern.test(password);
}


const loginForm=document.getElementById('loginform');

loginForm.addEventListener('submit', async (e)=>{

e.preventDefault()


const email =document.getElementById('email').value;
const password= document.getElementById('password').value;

let emailError= document.getElementById("emailerror");
let passwordError= document.getElementById("passworderror");


emailError.innerHTML="";
passwordError.innerHTML ="";


let isValid=true


if(!email){
    emailError.innerHTML="Enter a Valid email";
    isValid=false;
}

 if(!password || password.length < 6 || !validPassword(password)){
    passwordError.innerHTML="Password should be more that 6 characters and have uppercase,lower case letters and numbers";
    isValid=false;
}

if(isValid){
   
try {
    const response = await fetch ('http://localhost:4000/api/login/user',{
     method:'POST',
     headers:{
        'Content-Type':'application/json'
     },
     body: JSON.stringify({
        email,
        password,
     }) 
        
    });

    const result = await response.json();
    console.log(result)
    if(response.ok){
        alert("Login successful!");
        
        // Extract the token from the result
        const token = result.accessToken;

        // Store the access token in localStorage
        localStorage.setItem('accessToken', token);  // Store the token
            
        // Decode the token to get user information
        const decodedToken = JSON.parse(atob(token.split('.')[1]));

        //check users role
       if(decodedToken.role === "farmer"){
        window.location.href = 'farmersdashboard.html';
       } else if(decodedToken.role === "consumer"){
        window.location.href = 'market.html';
       }else{
        alert("Unknown role")
       }
    }else{
        alert("Login failed:" + result.message);
    }

} catch (error) {
    console.error("Error:", error);
}

}


})

