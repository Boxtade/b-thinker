/**
 * Created by Kevin on 2015-10-14.
 */
var NewTaskView = Backbone.View.extend({
    el: '#wrapper',
    template: _.template($("#newTask_template").html()),
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
            newPost.save(taskDetail,{type: 'POST'}).complete(function(){
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