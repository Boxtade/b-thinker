/**
 * Created by Kevin on 2015-10-14.
 */
    define([
        'jquery',
        'underscore',
        'backbone',
        'text!../../templates/newTask_template.html',
        '../models/Task'
    ],function($,_,Backbone,NewTaskTemplate,Task){
        var NewTaskView = Backbone.View.extend({
            el: $('#wrapper'),
            template: _.template(NewTaskTemplate),
            events: {
                'click #btn_new_accept': 'acceptTask',
                'click #btn_cancel': 'cancelTask'
            },
            initialize: function () {
            },
            render: function(){
                this.$el.html(this.template());
            },
            acceptTask: function() {
                if ($("#post_title")[0].value != ""&& $("#post_task")[0].value != "")
                {
                    taskDetail = {title: $("#post_title")[0].value, text:$("#post_task")[0].value};
                    var newPost = new Task(taskDetail);
                    var self = this;
                    newPost.save(taskDetail,{type: 'POST'}).complete(function(){
                        self.navigate('Tasks', {trigger: true});
                    });
                }
                else
                    $(".message").html("Veuillez remplir tous les champs.");

            },
            cancelTask:function(){
                this.navigate('Tasks', {trigger: true});
            },
            destroy:function(){
                this.$el.html("");
            }
        });

        return NewTaskView;
    });
