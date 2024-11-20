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
        });
    } catch (error) {
        console.error('Error fetching market produce:', error);
    }
});