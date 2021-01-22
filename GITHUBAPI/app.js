//input 
const github = new GithuB;
const ui = new UI;
const searchUser = document.getElementById('searchUser');


searchUser.addEventListener('keyup', (e)=>{

    const userText = e.target.value;
    
    if(userText !== ''){
       

        github.getUser(userText).then(data =>{
            if(data.profile.message === 'Not Found'){
                ui.showAlert('Not Found' , 'alert alert-danger');
            }else{
                console.log(data);
                ui.showProfile(data.profile);
            }
        });
    }else{
        ui.clearProfile();
    }

});