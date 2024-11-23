
const logOut= document.getElementById('logout');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:4000/api/produce/farmers');
        const produce = await response.json();

        const allProduceDiv = document.getElementById('allproduce');
        allProduceDiv.innerHTML = ''; 

        allProduceDiv.classList.add('allProduceDiv')

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
        method: 'GET'
    });
    
    const result = response.json();

    if(response.status === 200){
      
        alert('logged out seccessfully')
        window.location.href = 'login.html'
    } else {
        console.error('failed', result.error);
    }
});
  