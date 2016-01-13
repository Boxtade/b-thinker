/**
 * Created by Kevin on 2015-10-14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../templates/header_template.html',
    "views/FooterView",
    '../models/Task'
],function($,_,Backbone,HeaderTemplate,FooterView, Task){
    var HeaderView = Backbone.View.extend({
        el: $("header"),

        template: _.template(HeaderTemplate),
        events: {
            'click #btn_add': 'newTask',
            'click #btn_apply_img': 'acceptTask',
            'click #btn_cancel_img': 'cancelTask'
        },
        initialize: function () {
            new FooterView();
            var self = this;
            $( window ).resize(function(){self.style.render()});
        },
        render: function(){
            this.$el.html(this.template());

        },
        newTask: function(){
            this.navigate('newTask', {trigger: true});
        },
        acceptTask:function(){
            var route = this.style.getPathUrl();
            switch (route[0]){
                case "#updateTask": new Task().save_task(route[1]);break;
                case "#newTask": new Task().save_task();break;
            }
        },
        cancelTask:function(){
            this.navigate('tasks', {trigger: true});
        }
    });

    return HeaderView;
});

