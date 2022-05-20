const socket = io();

// elements
const messages = document.querySelector(".chat__messages");
const $inputValue = document.querySelector(".sendMessageInput");
const message_template = document.querySelector("#message_template").innerHTML;
const location_template = document.querySelector("#location_template").innerHTML;
const $submitMessageForm = document.getElementById("submitMessage");
const $sendLocation = document.querySelector("#sendLocation");
const users_template = document.querySelector("#users_template").innerHTML;
const chat__aside = document.querySelector(".chat__aside");
const chat__aside_small_size = document.querySelector('.chat__aside_small_size');
const allActiveRooms = document.querySelector(".allActiveRooms");


// get data from the query
const queryData = new URLSearchParams(window.location.search);
const username = queryData.get("name");
let room = queryData.get('room');
let activeRoom = queryData.get("activeRoom");


const autoScroll = () => {
   
}

const openChatAside = () => {
    chat__aside_small_size.style.width = "60%";
}

const closeChatAside = () => {
    chat__aside_small_size.style.width = "0%";
}

const checkUser = (msgUserName) => {
    if (username.trim().toLowerCase() === msgUserName) {
        return "sended_message";
    }
    else {
        return "received_message";
    }
}

socket.on("message", (msg) => {

    const html = Mustache.render(message_template, {
        class: checkUser(msg.username),
        message: msg.message,
        username: msg.username,
        createdAt: moment(msg.createdAt).format("h:mm a")
    });

    messages.innerHTML += html;

    autoScroll();

});

socket.on("locationMessage", (msg) => {

    const html = Mustache.render(location_template, {
        class: checkUser(msg.username),
        message: msg.url,
        username: msg.username,
        createdAt: moment(msg.createdAt).format("h:mm a")
    });

    messages.innerHTML += html;

});

socket.on("getAlllUser", ({ room, users }) => {


    const html = Mustache.render(users_template, {
        title: room,
        users: users
    });

    chat__aside.innerHTML = html;
    chat__aside_small_size.innerHTML = html;

});


$submitMessageForm.addEventListener("submit", (e) => {

    e.preventDefault();

    $submitMessageForm.lastElementChild.setAttribute("disabled", "disabled");
    $submitMessageForm.lastElementChild.style.opacity = "0.6";

    socket.emit("sendMessage", $inputValue.value, (err) => {
        if (err) {
            return console.log(err);
        }

        $submitMessageForm.lastElementChild.removeAttribute("disabled");
        $submitMessageForm.lastElementChild.style.opacity = "1";
    });

    $inputValue.value = "";

});

$sendLocation.addEventListener("click", () => {

    if (!navigator.geolocation) {
        return alert("Geolocation is not suported by your browser")
    }

    let data = {};
    $sendLocation.setAttribute("disabeld", "disabled");
    $sendLocation.style.opacity = "0.6";

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        data.latitude = position.coords.latitude;
        data.longitude = position.coords.longitude;

        socket.emit("sendLocation", data, () => {
            $sendLocation.removeAttribute("disabled");
            $sendLocation.style.opacity = "1";
        });

    }, (err) => {
        return console.sendLocationlog(err);
    });

});

if(room == ""){
   room = activeRoom; 
}

socket.emit('join', username, room, (err) => {

    if (err) {
        alert(err);
        location.href = "/";
    }

});