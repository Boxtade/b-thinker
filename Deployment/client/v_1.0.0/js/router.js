/**
 * Created by Kevin on 2015-10-14.
 */


define([
    'underscore',
    'backbone',
    'views/HeaderView',
    'views/TasksView',
    'views/NewTaskView',
    'views/UpdateTaskView',
    'views/LoginView',
    'views/ErrorView',
    'views/AccountView'
], function(_, Backbone,HeaderView,TasksView,NewTaskView,UpdateTaskView,LoginView,ErrorView,AccountView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "newTask": "newTask",
            "tasks": "tasks",
            "updateTask/:id": "updateTask",
            'login': "login",
            'error/:msg': "error",
            'account':"account",
            '*actions': "login"
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
        loginView = new LoginView();
        errorView = new ErrorView();
        accountView = new AccountView();

        app_router.on('route:newTask', function () {
            if(TOKEN !== undefined){
                headerView.render("newTask");
                newTaskView.render();
            }
            else{
                app_router.navigate('login',true);
            }
        });

        app_router.on('route:updateTask', function (id) {
            if(TOKEN !== undefined){
                headerView.render("updateTask");
                updateTaskView.render(id);
            }
            else{
                app_router.navigate('login',true);
            }
        });

        app_router.on('route:tasks', function () {
            if(TOKEN !== undefined){
                tasksView.render();
                headerView.render("");
            }
            else{
                app_router.navigate('login',true);
            }
        });

        app_router.on('route:account', function () {
            if(TOKEN !== undefined){
                headerView.render("account");
                accountView.render();
            }
            else{
                app_router.navigate('login',true);
            }
        });

        app_router.on('route:login', function () {
            if(TOKEN === undefined){
                headerView.destroy();
                loginView.render();
            }
            else{
                app_router.navigate('tasks',true);
            }
        });

        app_router.on('route:error', function (msg) {
            headerView.destroy();
            errorView.render(msg);
        });

        Backbone.View.prototype.navigate = function (loc) {
            app_router.navigate(loc, true);
        };

        Backbone.Model.prototype.navigate = function (loc) {
            app_router.navigate(loc, true);
        };

        //Backbone.history.start({pushState: true});
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});

