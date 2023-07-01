const express = require("express");
const path = require("path");

const app = express();

// paths
const staticPath = path.join(__dirname,"../public");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});


app.get("/",(req,res)=>{
    app.use(express.static(path.resolve(__dirname,'../public')));
    res.sendFile(path.resolve(__dirname,'../public',"index.html"));
});

// middlewares
// app.use(express.static(staticPath));

module.exports = app;