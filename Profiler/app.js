const data = [
    {name:'John Doe',
    age:32,
    gender:'male',
    location:'Boston Gulati',
    image:'https://picsum.photos/200/300',
},
{name:'John PO',
age:32,
gender:'male',
location:'Boston Gulati',
image:'https://picsum.photos/200/300',
}
,  {name:'John KO',
age:32,
gender:'male',
location:'Boston Gulati',
image:'https://picsum.photos/200/300',
}
];

const profiles = profileIterator(data);

//Next Event
document.getElementById('next').addEventListener('click',
nextProfile);

function nextProfile(){

    const currentProfile = profiles.next().value;
    console.log(currentProfile);
    document.getElementById('profieDisplay').innerHTML = 
    `
    <ul class="list-group">
        <li class="list-group-item">Name: ${currentProfile.name}</li>
        <li class="list-group-item">Age: ${currentProfile.age}</li>
        <li class="list-group-item">Gender: ${currentProfile.gender}</li>
        <li class="list-group-item">Location: ${currentProfile.location}</li>
    </ul>
    
    `;


    document.getElementById('imageDisplay').innerHTML = `
    <img src=${currentProfile.image}>
    `;
}

function profileIterator(profiles){
    let nextIndex = 0;

    return {
        next:  function(){
            return nextIndex < profiles.length ? {
                value:  profiles[nextIndex++], done:false
            }:{  done:true  }
        }
    };
}