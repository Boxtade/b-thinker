/**
 * Created by Kevin on 2015-10-14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../templates/header_template.html',
    "views/FooterView"
],function($,_,Backbone,HeaderTemplate,FooterView){
    var HeaderView = Backbone.View.extend({
        el: $("header"),

        template: _.template(HeaderTemplate),
        events: {
            'click #btn_add': 'newTask'
        },
        initialize: function () {
            new FooterView();
        },
        render: function(route){
            this.$el.html(this.template());
            if(route == "newTask" || route == "updateTask"){
                $("#wrapper_add_btn")[0].style.visibility = "hidden";
            }
            else{
                $("#wrapper_add_btn")[0].style.visibility =  "visible";
            }
        },
        newTask: function(){
            this.navigate('newTask', {trigger: true});
        }
    });

    return HeaderView;
});

