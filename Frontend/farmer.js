
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

    const retrievedToken = localStorage.getItem('accessToken');

    if(retrievedToken){

        try {
            const response = await fetch ('http://localhost:4000/api/produce/farmer', {

                method:'GET',
                headers:{
                 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${retrievedToken}`  // Include the token in the Authorization header
        
             },
                    credentials: 'include',

            });

            const result = await response.json();
            const produce = result.produce
        
            console.log(produce)
        
            const produceDiv = document.getElementById('produce');
            produceDiv.innerHTML ="";

            if (Array.isArray(produce)) {
              produce.forEach(item => {
                  const produceItem = document.createElement('div');
                  produceItem.setAttribute('data-id', item.commodity_id);
                  produceItem.innerHTML = `
                      <h3>${item.produce_name}</h3>
                      <p>Location: ${item.produce_location}</p>
                      <p>Quantity: ${item.quantity}</p>
                      <p>Price: ${item.price}</p>
                      <p>Description: ${item.description}</p>
                  `;
                  const deletebtn = document.createElement('button');
                  deletebtn.innerHTML = "Delete";
                   deletebtn.classList.add ('deletebutton')

                  produceItem.classList.add('produceItem')
                  produceItem.appendChild(deletebtn);
                  produceDiv.appendChild(produceItem);
              });
          } else {
              console.error('Expected an array but received:', produce);
              alert('Failed to load produce data.');
          }

      } catch (error) {
          console.error('Error fetching farmer produce:', error);
      }
  }
});


//Adding new produce

const produceForm= document.getElementById('produce_form');
const produceAdd = document.getElementById('produceadd');
const closeFormButton = document.getElementById('close_form');
const logOut =document.getElementById('logout')
const market = document.getElementById('market')
const home = document.getElementById('home')

closeFormButton.addEventListener('click', function() {
    document.getElementById("produce").classList.remove("fade")
    produceForm.style.display = 'none';
});

home.addEventListener('click', function() {
    window.location.href='home.html';
}); 
produceAdd.addEventListener('click', ()=>{
    document.getElementById("produce").classList.add("fade")
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

    // Get the JWT token from localStorage
    const retrievedToken = localStorage.getItem('accessToken');  
      
    if(retrievedToken) {

    try {
 const response = await fetch ('http://localhost:4000/api/produce',{
    method:'POST',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${retrievedToken}`  // Include the token in the Authorization header
        
    },
    credentials: 'include',
    
    body: JSON.stringify({
        farmer_name,
        email,
        farmer_contact,
        produce_location,
        produce_name,
        quantity,
        price,
        description, 
    })
 });
 
 const result = await response.json();
 const produce= result.produce
console.log(result)

 if(response.ok){
    alert('Produce added successfully!');

    const produceDiv = document.getElementById('produce');
    produceDiv.innerHTML ="";

    if (Array.isArray(produce)) {
      produce.forEach(item => {
          const produceItem = document.createElement('div');
          produceItem.setAttribute('data-id', item.commodity_id);
          produceItem.innerHTML = `
              <h3>${item.produce_name}</h3>
              <p>Location: ${item.produce_location}</p>
              <p>Quantity: ${item.quantity}</p>
              <p>Price: ${item.price}</p>
              <p>Description: ${item.description}</p>
          `;
          const deletebtn = document.createElement('button');
          deletebtn.innerHTML = "Delete";
          deletebtn.classList.add ('deletebutton')

          produceItem.classList.add('produceItem');
          produceItem.appendChild(deletebtn);
          produceDiv.appendChild(produceItem);
      });
  } else {
      console.error('Expected an array but received:', produce);
      alert('Failed to load produce data.');
  }
} else {
  alert('Failed to add produce: ' + result.message);
}

} catch (error) {
console.error('Error:', error);
}

} else {
alert('Please log in first');
}
}
 
});

//deleting produce
async function deleteProduce(produceId, produceItem) {

    const retrievedToken = localStorage.getItem('accessToken');

    if (!retrievedToken) {
        alert('Please log in first');
        return;
    };

    console.log(`Deleting produce with ID: ${produceId}`);

    try {
        const response = await fetch(`http://localhost:4000/api/produce/${produceId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${retrievedToken}`,
            },
            credentials: 'include',
        });

        if (response.ok) {
            alert('Produce deleted successfully!');
            produceItem.remove();
        } else {
            const result = await response.json();
            console.log('Failed to delete produce:', result);
            alert('Failed to delete produce: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the produce.');
    }
}


function addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.deletebutton');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const produceItem = event.target.closest('.produceItem');
            const produceId = produceItem.getAttribute('data-id');
            console.log(`Delete button clicked for produce ID: ${produceId}`);
            deleteProduce(produceId, produceItem);
        });
    });
}

// Call this function after the DOM has loaded and after produce items are dynamically added to the page.
document.addEventListener('DOMContentLoaded', () => {
    addDeleteEventListeners();
});

//logout
logOut.addEventListener('click', async () => {
    const response = await fetch('http://localhost:4000/api/logout/user', {
        method: 'POST',
        credentials: 'include'
    });
    
    localStorage.removeItem('accessToken');
    alert('Logout successful')
    window.location.href ='login.html';
});

market.addEventListener('click', ()=>{

    window.location.href='market.html';
})