/**
 * Created by Kevin on 2015-10-13.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    '../models/User',
    '../models/Task',
    'text!../../templates/task_template.html',
    '../collections/CollectionTasks'
],function($,_,Backbone,User,Task,TaskTemplate,CollectionTasks){
    var TasksView = Backbone.View.extend({
        el: $('#wrapper'),
        template: _.template(TaskTemplate),
        events: {
            'click .delete': 'confirmModal',
            'click .post_text': 'updateTask',
        },
        user: new User(),
        task:new Task(),
        initialize: function () {
            _.bindAll(this, 'render');
            this.collection = new CollectionTasks();
        },
        render: function(){
            var self = this;
            new this.user.Token(TOKEN,function(json){
                if(json.res) {
                    self.collection.getAll(TOKEN,function (json) {
                        if(json.res) {
                            self.$el.html(self.template({
                                tasks: json.tasks,
                                func: self.updateTask
                            }));
                            self.style.render();
                        }
                        else{
                            self.navigate('error/'+json.response, {trigger: true});
                        }
                    });
                }
                else{
                    self.navigate('error/'+json.response, {trigger: true});
                }
            });
        },
        deleteTask: function (ev) {
            console.log(ev.currentTarget);
            var id = ev.currentTarget.id;
            var self = this;
            this.task.remove(TOKEN,id,function (json) {
                if(json.res) {
                    self.render();
                }
                else{
                    self.navigate('error/'+json.response, {trigger: true});
                }
            });


        },
        updateTask:function(ev){
            console.log(ev.currentTarget);
            var id = ev.currentTarget.id;
            this.navigate("updateTask/" + id, {trigger: true})
        },
        confirmModal:function(ev){
            var r = confirm("Do you want to delete this memo ?");
            if (r == true) {
                this.deleteTask(ev);
            }
        },
        destroy:function(){
            this.$el.html("");
        }

    });

    return TasksView;
});
