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
            var self = this;
            updatePost = new Task();
            updatePost.set_id(id);
            updatePost.fetch().complete(function() {
                updatePost.set(updatePost.toJSON().task);
                self.$el.html(self.template({po:updatePost.attributes}));
                self.style.render();
            });
        },
        acceptTask: function() {
            updatePost.save_task(updatePost.attributes.id);
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

