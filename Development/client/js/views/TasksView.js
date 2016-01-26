/**
 * Created by Kevin on 2015-10-13.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../templates/task_template.html',
    '../collections/CollectionTasks'
],function($,_,Backbone,TaskTemplate,CollectionTasks){
    var TasksView = Backbone.View.extend({
        el: $('#wrapper'),
        template: _.template(TaskTemplate),
        events: {
            'click .delete': 'confirmModal',
            'click .update': 'updateTask'
        },
        initialize: function () {
            _.bindAll(this, 'render');
            var self = this;
            this.collection = new CollectionTasks();
            this.collection.fetch().complete(function(){self.render();});
        },
        render: function(){
            this.$el.html(this.template({
                tasks: this.collection.toJSON()
            }));
            this.style.render();
        },
        deleteTask: function (ev) {
            var model = this.collection.get(ev.currentTarget.id);
            var self = this;
            model.destroy().complete(function(){self.render();});
        },
        updateTask:function(ev){
            if(ev.target.className == "post_text") {
                var model = this.collection.get(ev.currentTarget.id);
                this.navigate("updateTask/" + model.id, {trigger: true});
            }
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
