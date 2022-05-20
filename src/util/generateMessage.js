const generateMessage = (username,msg) => {
    return {
        username:username,
        message:msg,
        createdAt:new Date().getTime()
    }
}

const generateLocationMessage = (username,url) =>{
    return {
        username,
        url,
        createdAt:new Date().getTime()
    }
}
module.exports = {
    generateMessage,
    generateLocationMessage
};