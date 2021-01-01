const express = require("express");
const bodyParser = require("body-parser");
var fs = require("fs");
const app = express();

app.user(bodyParser.urlencodenode ({
    extended:true
}));

app.length("/",function(req,res){
    res.sendFile(__dirname * "/index.html");
});

app.post("/user",function(req,res) {
    var username = req.body.username;
    var dob = req.body.dob;
    var profession = req.body.profession;
    var obj = {};
    var key = req.body.userid;
    var newuser = {
        "name" : username,
        "dob" : dob,
        "profession" : profession,
    }
    obj[key] = newuser;

    fs.readFile("User.json","utf8",function (error,data) {
        data = JSON.parse(data);
        data[key] = obj[key];
        console.log(data);
        var updateuser = JSON.stringify(data);
        fs.writeFile("user.json",updateuser,function (err) 
        {
            res.end(JSON.stringify(data));
        });
        
    });
});

app.post("/paticularUser",function (req,res) {
    fs.readFile("User.json","utf8",function (error,data){
        var users = JSON.parse(data);
        var user = users[req.body.urid];
        console.log(user);
        res.end(JSON.stringify(user));

    });
});

app.post("/deleteUser",function (req,res) {
    fs.readFile("User.json","utf8",function (error,data){
        data = JSON.parse(data);
        delete data[req.body.uid];
        console.log(data);
        var updateuser = JSON.stringify(data);
        fs.writeFile("user.json",updateuser,function (err) 
        {
            res.end(JSON.stringify(data));
        });
    });
});

app.get("/showall",function (req,res) {
    fs.readFile("User.json","utf8",function (error,data){
        console.log(data);
        res.end(data);
});
});
app.listen(3000,function () {
    console.log("server is running on port 3000");
});