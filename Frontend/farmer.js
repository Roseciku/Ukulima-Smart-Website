
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPassword(password) {
    
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return passwordPattern.test(password);
}

const produceForm= document.getElementById('produce_form');
const produceAdd = document.getElementById('produceadd');
const closeFormButton = document.getElementById('close_form');
const logOut =document.getElementById('logout')




closeFormButton.addEventListener('click', function() {
    produceForm.style.display = 'none';
});


produceAdd.addEventListener('click', ()=>{

produceForm.style.display='block';

})

produceForm.addEventListener('submit',(e)=>{

    e.preventDefault()


const farmerName= document.getElementById('farmer_name').value;
let email= document.getElementById("email").value;
const produceLocation= document.getElementById('produce_location').value;
const produceName= document.getElementById('produce_name').value;
const quantity= document.getElementById('quantity').value;
const price= document.getElementById('price').value;
const description= document.getElementById('description').value;

const nameError = document.getElementById('nameerror');
let emailError= document.getElementById("emailerror");
const locationError = document.getElementById('locationerror');
const produceError= document.getElementById('produceerror');
const quantityError= document.getElementById('quantityerror');
const priceError =document.getElementById('priceerror');
const descriptionError = document.getElementById('descriptionerror');


nameError.innerHTML="";
emailError.innerHTML="";
locationError.innerHTML="";
produceError.innerHTML="";
quantityError.innerHTML="";
priceError.innerHTML="";
descriptionError.innerHTML="";


isValid=true

if(!farmerName){
    nameError.innerHTML="Enter your name";
    isValid=false;
    
} 

if(!email||!isValidEmail(email)){
    emailError.innerHTML="Enter a Valid email";
    isValid=false;
}

if(!produceLocation){
    locationError.innerHTML="Enter a Valid location";
    isValid=false;
}

 if(!produceName){
    produceError.innerHTML="Enter your produce";
    isValid=false;
}

if(!quantity){
    quantityError.innerHTML="Enter the quantity of your produce";
    isValid=false;
}

if(!price){
    priceError.innerHTML="Enter the price of your produce";
    isValid=false;
}

if(isValid){
     
}
})

logOut.addEventListener('click',()=>{
    window.location.href ='home.html';
})