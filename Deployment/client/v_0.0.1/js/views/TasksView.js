/**
 * Created by Kevin on 2015-10-13.
 */
var TasksView = Backbone.View.extend({
    el: '#wrapper',
    template: _.template($("#post_template").html()),
    events: {
        'click .delete': 'deleteTask',
        'click .update': 'updateTask'
    },
    initialize: function () {
        $("#progressbar")[0].style.display = "block";
        $("#btn_add")[0].style.visibility = "hidden";
        _.bindAll(this, 'render');
        var self = this;
        this.collection = new CollectionTasks();
        this.collection.fetch().complete(function(){self.render();});
    },
    render: function(){
        $("#progressbar")[0].style.display = "none";
        $("#btn_add")[0].style.visibility = "visible";
        this.$el.html(this.template({
            tasks: this.collection.toJSON()
        }));
    },
    deleteTask: function (ev) {
        var model = this.collection.get(ev.currentTarget.id);
        var self = this;
        model.destroy().complete(function(){self.render();});
    },
    updateTask:function(ev){
        var model = this.collection.get(ev.currentTarget.id);
        app_router.navigate("updateTask/"+model.id, {trigger: true});
    },
    destroy:function(){
        this.$el.html("");
    }

});