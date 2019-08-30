const express = require('express');
const router = express.Router();
const path2Views = __dirname + "/views";
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const morgan = require('morgan');
const url = 'mongodb://localhost:27017/';
let db = null;


MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err) {
        console.log('Err  ', err);
    } else {
        console.log("Connected successfully to server");
        db = client.db("week6Lab");
    }
});

router.get('/', function (req, res) { //home page
    res.sendFile(path2Views + '/index.html');
});

router.get('/addTask', function (req, res) { //adding task page
    res.sendFile(path2Views + '/addTask.html');
});

router.post('/formTask', function (req, res) {
    console.log(req.body.newTask);
    console.log(req.body.newDue);
    console.log(req.body.newDesc);

    let newTaskName = req.body.newTask;
    let newTaskDue = req.body.newDue;
    let newTaskDesc = req.body.newDesc;

    let obj = {
        taskName: newTaskName,
        taskDue: newTaskDue,
        taskDesc: newTaskDesc
    };
    console.log("////////////////////////////////////////////////////");
    console.log(obj);
    db.push(obj);
    //res.send('Your input has been saved.')
    res.render("listTask.html", {
        taskDb: db
    });
})

router.get('/listTask', function (req, res) { //listing task page
    res.render("listTask.html", {
        taskDb: db
    });

});



module.exports = router;