/**
 * Created by Kevin on 2015-10-14.
 */
var HeaderView = Backbone.View.extend({
    el: 'header',
    template: _.template($("#header_template").html()),
    events: {
        'click #btn_add': 'newTask'
    },
    initialize: function () {
        this.render();
    },
    render: function(){
        this.$el.html(this.template());
    },
    newTask: function(){
        app_router.navigate('newTask', {trigger: true});
    }
});