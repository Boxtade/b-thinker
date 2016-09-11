/**
 * Created by Kevin on 2015-10-15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../templates/updateTask_template.html',
    '../models/Task'
],function($,_,Backbone,UpdateTaskTemplate,Task){
    var UpdateTaskView = Backbone.View.extend({
        el: $('#wrapper'),
        template: _.template(UpdateTaskTemplate),
        events: {
            'click #btn_update_accept': 'acceptTask',
            'click #btn_cancel': 'cancelTask'
        },
        task: new Task(),
        render: function (id) {
            this.id = id;
            var self = this;
            this.task.getOne(TOKEN,id,function (json) {
                if(json.res) {
                    self.$el.html(self.template({po:json.task}));
                    self.style.render();
                }
                else{
                    self.navigate('error/'+json.response, {trigger: true});
                }
            });
        },
        acceptTask: function() {

            var title = $("#post_title")[0].value;
            var content = $("#post_memo")[0].value;

            var self = this;
            this.task.update(TOKEN,this.id,title,content,function (json) {
                if(json.res) {
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

    return UpdateTaskView;
});

