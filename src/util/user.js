const users = [];
const rooms = [];

const addUser = ({id,username,room}) => {
    
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if(!username || !room){
        return {
            error:"Username and room is empty !"
        }
    }

    // Validate 

    const existUser = users.find((user) => {
        return user.username === username && user.room === room;
    });

    if(existUser){
        return {
            error:"Username is in user"
        }
    }

    // store the username and password
    const user = {id,username,room};
    users.push(user);
    rooms.push(user.room);
    return {user}
}

const removeUser = (id) => {

    const findUser = users.findIndex((user) => {
        return user.id === id;
    });

    if(findUser !== -1){
       return users.splice(findUser,1)[0];
    }
}

const getUser = (id) => {
    return users.find((user) => {
        return user.id === id
    });
}

const getUserInRoom = (room) =>  {
    room = room.trim().toLowerCase();
    return users.filter((user) => {
        return user.room == room;
    });
}

const getAllRooms = () => {
    users.map((user) => {
       rooms.push(user.room);
    });

    return rooms;
}


module.exports = {
    getUser,
    getUserInRoom,
    addUser,
    removeUser,
    getAllRooms
}


