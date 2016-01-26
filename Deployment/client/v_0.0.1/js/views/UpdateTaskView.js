/**
 * Created by Kevin on 2015-10-15.
 */
var UpdateTaskView = Backbone.View.extend({
    el: '#wrapper',
    template: _.template($("#updateTask_template").html()),
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
            updatePost.save().complete(function(){
                app_router.navigate('Tasks', {trigger: true});
            });
        }
        else
            $(".message").html("Veuillez remplir tous les champs.");

    },
    cancelTask:function(){
        app_router.navigate('Tasks', {trigger: true});
    },
    destroy:function(){
        this.$el.html("");
    }
});