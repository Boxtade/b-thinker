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
            'click #btn_cancel_img': 'cancelTask',
            'click #btn_logout': "logout",
            'click #btn_account': "account",
            'click #btn_home': 'cancelTask'
        },
        initialize: function () {
            new FooterView();
            var self = this;
            this.task = new Task();
            $( window ).resize(function(){self.style.render()});
        },
        destroy:function(){
            this.$el.html("");
        },
        render: function(){
            this.$el.html(this.template());
            this.style.render()
        },
        newTask: function(){
            this.navigate('newTask', {trigger: true});
        },
        acceptTask:function(){
            var route = this.style.getPathUrl();
            console.log(route);
            switch (route[0]){
                case "#updateTask": this.updateTask(route[1]);break;
                case "#newTask": this.saveTask();break;
            }
        },
        cancelTask:function(){
            this.navigate('tasks', {trigger: true});
        },
        logout:function(){
            this.fluch();
            this.navigate("login",{trigger:true});
        },
        account:function(){
            this.navigate("account",{trigger:true});
        },
        updateTask:function(id){
            var title = $("#post_title")[0].value;
            var content = $("#post_memo")[0].value;

            var self = this;
            this.task.update(TOKEN,id,title,content,function (json) {
                if(json.res) {
                    self.cancelTask();
                }
                else{
                    self.navigate('error/'+json.response, {trigger: true});
                }
            });
        },
        saveTask:function(){
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
        }
    });

    return HeaderView;
});

