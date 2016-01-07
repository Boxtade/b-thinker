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
        render: function (id) {
            $("#progressbar")[0].style.display = "block";
            var self = this;
            updatePost = new Task({id:id});
            updatePost.fetch().complete(function() {
                updatePost.set(updatePost.toJSON().task);
                $("#progressbar")[0].style.display = "none";
                self.$el.html(self.template({po:updatePost.attributes}));
            });
        },
        acceptTask: function() {
            if ($("#post_title")[0].value != ""&& $("#post_task")[0].value != "")
            {
                taskDetail = {task:$("#post_title")[0].value+"*/*"+$("#post_task")[0].value};
                updatePost.set(taskDetail);
                updatePost.url = 'http://'+window.url+':5000/tasks/' + updatePost.attributes.id;
                var self = this;
                updatePost.save().complete(function(){
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

    return UpdateTaskView;
});

