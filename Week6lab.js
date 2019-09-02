const express = require('express');
const router = express.Router();
const path2Views = __dirname + "/views";
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const TASKID = mongodb.ObjectID;
const morgan = require('morgan');
const url = 'mongodb://localhost:27017/';

let db = null;

//Connecting to MongoDB
MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, client) {
    if (err) {
        console.log('Err  ', err);
    } else {
        console.log("Connected successfully to server");
        db = client.db("week6Lab");
    }
});

//home page
router.get('/', function (req, res) {
    res.sendFile(path2Views + '/index.html');
});

//adding task page
router.get('/addTask', function (req, res) {
    res.sendFile(path2Views + '/addTask.html');
});

//getting input
router.post('/formTask', function (req, res) {
    //checking parameters in log
    console.log(req.body.newTask);
    console.log(req.body.newInCharge);
    console.log(req.body.newDue);
    console.log(req.body.newDesc);
    console.log(req.body.newStatus);

    //Passing into MongoDB
    db.collection("week6lab").insertOne({
        taskName: req.body.newTask,
        taskPersonInCharge: req.body.newInCharge,
        taskDueDate: req.body.newDue,
        taskDesc: req.body.newDesc,
        taskStatus: req.body.newStatus
    });
    res.redirect('/listTask');
})

//listing task page
router.get('/listTask', function (req, res) {

    db.collection("week6lab").find({}).toArray(function (err, data) {
        res.render('listTask.html', {
            taskDb: data
        });
    });

});

//delete task page
router.get('/deleteTask', function (req, res) {
    res.sendFile(path2Views + '/deleteTask.html');
});

// getting input for ID
router.post('/formDeleteTask', function (req, res) {
    let taskDetails = req.body;
    let filter = {ID: taskDetails.delTask }
    db.collection('week6lab').deleteOne({filter});
    res.redirect('/listTask');
});



module.exports = router;