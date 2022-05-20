const allActiveRooms = document.querySelector(".allActiveRooms");
const rooms_template = document.querySelector('#rooms_template').innerHTML;
const introForm = document.getElementById("introForm");
const roomInput = introForm.querySelector("[name='room']");

const socket = io();

socket.on("getAllRooms",(rooms) => {
    const uniqueRooms = new Set(rooms);

    rooms = [];
    for(let x of uniqueRooms.values()){
        rooms.push(x);     
    }

    const html = Mustache.render(rooms_template,{
        rooms:rooms
    });

    allActiveRooms.innerHTML += html;
});

// do the form validation
introForm.addEventListener('submit',(e) => {
    e.preventDefault();
    if(roomInput.value == ""){
        if(allActiveRooms.value == "-- Select Active Room --"){
            roomInput.style.border = "1px solid red";
        }  
        else{
            introForm.submit();
        }
    }
    else{
        introForm.submit();
    }
}); 


