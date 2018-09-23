document.getElementById('loan-form').addEventListener('submit', function(e){
    document.getElementById('results').style.display = 'none';

    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000)


    e.preventDefault();
});

function calculateResults(e) {
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

const principal = parseFloat(amount.value);
const calculatedInterest = parseFloat(interest.value)/100/12;
const calculatedPayments = parseFloat(years.value)*12;

const x = Math.pow(1 + calculatedInterest, calculatedPayments);
const monthly = parseFloat(principal*x*calculatedInterest)/(x - 1);

if(isFinite(monthly)) {
    
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly*calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2)
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'block';
} else {
    showError('Check your number')
   
}
    
}

function showError(err) {
    document.getElementById('loading').style.display = 'none';
    const card = document.querySelector('.card');
    const head = document.querySelector('.heading');

    const alert = document.createElement('div');
    alert.appendChild(document.createTextNode(err))
    alert.className ='alert alert-danger';

    card.insertBefore(alert, head);

    setTimeout(hideError, 3000);
    
}

function hideError() {
    document.querySelector('.alert').remove();
}