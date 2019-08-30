let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let router = require('./Week5lab.js');
let path2Views = __dirname + "/views";
//const morgan = require('morgan');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json())
app.use(express.static('public'));
app.use(express.static('images'));


app.use(bodyParser.urlencoded({
    extended: false
}));



let db = [];


app.get('/', function (req, res) { //home page
    res.sendFile(path2Views + '/index.html');
});

app.get('/addTask', function (req, res) { //adding task page
    res.sendFile(path2Views + '/addTask.html');
});

app.post('/formTask', function (req, res) {
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
    res.sendFile(path2Views + '/addTask.html');
})

app.get('/listTask', function (req, res) { //listing task page
    res.render("listTask.html", {
        taskDb: db
    });

});
app.listen("8080");
console.log("Server running at http://localhost:8080");