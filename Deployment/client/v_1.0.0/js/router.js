/**
 * Created by Kevin on 2015-10-14.
 */



var AppRouter = Backbone.Router.extend({
    routes: {
        "newTask": "newTask",
        "Tasks": "Tasks",
        "updateTask/:id":"updateTask",
        '*actions':"Tasks"
    }
});

var app_router = new AppRouter;
app_router.on('route:newTask', function () {
    if(newTaskView == undefined)
        tasksView.initialize();
    newTaskView.render();
});

app_router.on('route:updateTask', function (id) {
    if(tasksView != undefined)
        tasksView.destroy();
    updateTaskView.render(id);
});



app_router.on('route:Tasks', function () {
    if(newTaskView != undefined)
        newTaskView.destroy();

    if(tasksView == undefined)
        initialize();
    else
        tasksView.initialize();
});

Backbone.history.start();