/**
 * Created by Kevin on 2015-10-14.
 */


define([
    'underscore',
    'backbone',
    'views/HeaderView',
    'views/TasksView',
    'views/NewTaskView',
    'views/UpdateTaskView'
], function(_, Backbone, HeaderView,TasksView,NewTaskView,UpdateTaskView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "newTask": "newTask",
            "Tasks": "Tasks",
            "updateTask/:id": "updateTask",
            '*actions': "Tasks"
        },
        route: function(route, name, callback) {
            return Backbone.Router.prototype.route.call(this, route, name, callback);
        }
    });

    var initialize = function(){
        var app_router = new AppRouter;
        headerView = new HeaderView();
        newTaskView = new NewTaskView();
        updateTaskView = new UpdateTaskView();
        tasksView = new TasksView();

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

        Backbone.View.prototype.navigate = function (loc) {
            app_router.navigate(loc, true);
        };

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});

