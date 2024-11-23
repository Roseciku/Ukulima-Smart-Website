const signUp= document.getElementById('signup');
const logIn= document.getElementById('login');
const policies= document.getElementById('policies');
const market = document.getElementById('market');

signUp.addEventListener('click', ()=>{
    window.location.href ='signup.html'
})

logIn.addEventListener('click', ()=>{
    window.location.href = 'login.html'
})


const spans = document.querySelectorAll('#menuToggle span');

const navLinks = document.querySelector('.nav_links');

// Add click event listener to each span element
spans.forEach(span => {
  span.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
});

policies.addEventListener('click', ()=>{
    window.location.href='policies.html'
});

market.addEventListener('click', ()=>{
    window.location.href='login.html'
    alert('Please login to access the market')
})