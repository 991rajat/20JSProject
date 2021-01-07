const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

populateUI();
function updateSelectedCount(){
    const selectedseat = document.querySelectorAll('.row .seat.selected');
  
    const seatIndex = [...selectedseat].map( (seat)=>{
        return [...seats].indexOf(seat)
    });
  
    localStorage.setItem('selectedseats', JSON.stringify(seatIndex));

    const selectedseatcount = selectedseat.length;

    count.innerText = selectedseatcount;
    total.innerText = selectedseatcount*ticketPrice;
}
function populateUI(){
     
    const selectedseat = JSON.parse(localStorage.getItem('selectedseats'));
    if(selectedseat!==null&&selectedseat.length>0){

        seats.forEach((seat,index)=>{
            if(selectedseat.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }

    const movieIndex = localStorage.getItem('selectedMovieIndex');

    if(movieIndex !== null){
        movieSelect.selectedIndex = movieIndex;
    }
}
//Save Movie Data
function setMovieData(index, price){

    localStorage.setItem('selectedMovieIndex',index);
    localStorage.setItem('selectedMoviePrice',price);
}



//Movie Select Event
movieSelect.addEventListener('change', (e)=>{
    ticketPrice = +e.target.value;
    console.log(ticketPrice);
    setMovieData(e.target.selectedIndex,e.target.value)
    updateSelectedCount();
})

//Seat Click Event
container.addEventListener('click', (e) =>{

    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied') ){
        
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});


updateSelectedCount();