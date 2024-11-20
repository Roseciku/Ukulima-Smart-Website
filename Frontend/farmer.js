
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPassword(password) {
    
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return passwordPattern.test(password);
}

//loading existing produce
document.addEventListener('DOMContentLoaded', async()=>{
try {
    const response = await fetch ('http://localhost:4000/api/produce/farmer');
    const produce = await response.json();

    const produceDiv = document.getElementById('produce');
    produceDiv.innerHTML ="";

    produce.forEach(item=>{
        const produceItem = document.createElement('div');
        produce.innerHTML =`
        <h3>${item.produce_name}</h3>
        <p>Location: ${item.produce_location}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: ${item.price}</p>
        <p>Description: ${item.description}</p>  
        `
        const deletebtn = document.createElement('button');
        deletebtn.innerHTML="Delete";

    produceItem.appendChild(deletebtn);
    produceDiv.appendChild(produceItem);
    })
} catch (error) {
    console.error('Error fetching farmer produce:', error);
}

})

//Adding new produce

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

produceForm.addEventListener('submit',async (e)=>{

    e.preventDefault()


const farmer_name= document.getElementById('farmer_name').value;
const email= document.getElementById("email").value;
const farmer_contact = document.getElementById('farmer_contact').value;
const produce_location= document.getElementById('produce_location').value;
const produce_name= document.getElementById('produce_name').value;
const quantity= document.getElementById('quantity').value;
const price= document.getElementById('price').value;
const description= document.getElementById('description').value;

const nameError = document.getElementById('nameerror');
const emailError= document.getElementById("emailerror");
const contactError =document.getElementById('contacterror')
const locationError = document.getElementById('locationerror');
const produceError= document.getElementById('produceerror');
const quantityError= document.getElementById('quantityerror');
const priceError =document.getElementById('priceerror');
const descriptionError = document.getElementById('descriptionerror');


nameError.innerHTML="";
emailError.innerHTML="";
contactError.innerHTML="";
locationError.innerHTML="";
produceError.innerHTML="";
quantityError.innerHTML="";
priceError.innerHTML="";
descriptionError.innerHTML="";


isValid=true

if(!farmer_name){
    nameError.innerHTML="Enter your name";
    isValid=false;
    
} 

if(!email||!isValidEmail(email)){
    emailError.innerHTML="Enter a Valid email";
    isValid=false;
}

if(!farmer_contact|| farmer_contact.length <10 ||  farmer_contact.length >10){
    contactError.innerHTML="Enter a valid phone number";
    isValid=false;
}

if(!produce_location){
    locationError.innerHTML="Enter a Valid location";
    isValid=false;
}

 if(!produce_name){
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
      
try {
 const response = await fetch ('http://localhost:4000/api/produce',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
        farmer_name,
        email,
        farmer_contact,
        produce_location,
        produce_name,
        quantity,
        price,
        description 
    })
 });
 
 const result = await response.json();

 if(response.ok){
    alert('Produce added successfully!');

    const produceDiv = document.getElementById('produce');
    produceDiv.innerHTML ="";

    result.produce.forEach(item=>{
        const produceItem = document.createElement('div');
        produce.innerHTML =`
        <h3>${item.produce_name}</h3>
        <p>Location: ${item.produce_location}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: ${item.price}</p>
        <p>Description: ${item.description}</p>  
        `
        const deletebtn = document.createElement('button');
        deletebtn.innerHTML="Delete";

    produceItem.appendChild(deletebtn);
    produceDiv.appendChild(produceItem);
    });
 } else {
    alert('Failed to add produce:' + result.message)
 }

} catch (error) {
    console.error('Error:', error)
}

}
})

logOut.addEventListener('click',()=>{
    window.location.href ='home.html';
})