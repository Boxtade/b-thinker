var express = require('express');
var task = require('./../../../Development/server/routes/task');
var cors = require('cors');


var app = express();

var corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};

app.use(cors(corsOptions));


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function start() {
    app.listen(5000); // Look at the asynchronous.
    console.log("Server has started.");
    console.log('Server running at http://localhost:5000/');
};

app.post('/tasks',task.create_task);
app.get("/tasks",task.get_tasks);
app.get("/tasks/:id",task.get_task);
app.put('/tasks/:id',task.update_task);
app.delete('/tasks/:id',task.delete_task);

module.exports.start = start;