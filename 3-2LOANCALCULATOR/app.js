document.getElementById('loan-form').addEventListener('submit',calculateResults);


//Calculate Results
function calculateResults(e){

    console.log('Calculating');
    document.getElementById('results').style.display = 'none';

    document.getElementById('loading').style.display = 'block';

    setTimeout(showResults,2000);

    
    e.preventDefault();
}

function showResults(){



    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlypayment = document.getElementById('monthly-payment');
    const totalpayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principalAmount = parseFloat(amount.value);
    const calInterest = parseFloat(interest.value)/100/12;
    const calPay = parseFloat(years.value)*12;


    const x = Math.pow(1+calInterest,calPay);
    const monthly = (principalAmount*x*calInterest)/(x-1);

    if(isFinite(monthly)){
        monthlypayment.value = monthly.toFixed(2);
        totalpayment.value = (monthly*calPay).toFixed(2);
        totalInterest.value = ((monthly*calPay)- principalAmount).toFixed(2);


        document.getElementById('results').style.display = 'block';

    document.getElementById('loading').style.display = 'none';


    }else{
       

        document.getElementById('results').style.display = 'none';

        document.getElementById('loading').style.display = 'none';
        const card = document.querySelector('.card');
        const head = document.querySelector('heading');
        const ele = document.createElement('div');
        ele.className = 'alert alert-danger';

        ele.appendChild(document.createTextNode("Wrong Parameters"));
     

        card.insertBefore(ele,head);

        setTimeout(clearError,3000);
    }

}

function clearError(){
    document.querySelector('.alert').remove();
}