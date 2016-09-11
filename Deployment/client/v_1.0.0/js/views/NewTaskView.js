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
                this.task = new Task();
            },
            render: function(){
                this.$el.html(this.template());
                this.style.render();
            },
            acceptTask: function() {
                var title = $("#post_title")[0].value;
                var content = $("#post_memo")[0].value;
                var self = this;

                this.task.create(TOKEN,title,content,function(json){
                    if(json.res){
                        self.cancelTask();
                    }
                    else{
                        self.navigate('error/'+json.response, {trigger: true});
                    }
                });
            },
            cancelTask:function(){
                this.navigate('tasks', {trigger: true});
            },
            destroy:function(){
                this.$el.html("");
            }
        });

        return NewTaskView;
    });
