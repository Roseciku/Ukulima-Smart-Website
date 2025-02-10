
const home = document.getElementById("home")
const dashboard = document.getElementById("dashboard")

home.addEventListener('click', function() {
    window.location.href='home.html';
}); 
dashboard.addEventListener('click', function() {
    window.location.href='farmersdashboard.html';
}); 

const logOut= document.getElementById('logout');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:4000/api/produce/farmers');
        const produce = await response.json();

        const allProduceDiv = document.getElementById('allproduce');
        allProduceDiv.innerHTML = ''; 

        produce.forEach(item => {
            const produceItem = document.createElement('div');
            produceItem.innerHTML = `
                <h3>${item.produce_name}</h3>
                <p>Contact: ${item.farmer_contact}</p>
                <p>Farmer: ${item.farmer_name}</p>
                <p>Location: ${item.produce_location}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: ${item.price}</p>
                <p>Description: ${item.description}</p>
            `;
            allProduceDiv.appendChild(produceItem);

        produceItem.classList.add('produceitem')
        
        });
    } catch (error) {
        console.error('Error fetching market produce:', error);
    }
});

logOut.addEventListener('click', async () => {
    const response = await fetch('http://localhost:4000/api/logout/user', {
        method: 'POST',
        credentials: 'include'
    });
    
    localStorage.removeItem('accessToken');
    alert('Logout successful')
    window.location.href ='login.html';
});

const spans = document.querySelectorAll('#menuToggle span');

const buttons = document.getElementById('button');

// Add click event listener to each span element
spans.forEach(span => {
  span.addEventListener('click', () => {
    buttons.classList.toggle('show');
  });
});
