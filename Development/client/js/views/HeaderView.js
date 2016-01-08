/**
 * Created by Kevin on 2015-10-14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../templates/header_template.html'
],function($,_,Backbone,HeaderTemplate){
    var HeaderView = Backbone.View.extend({
        el: $("#header"),

        template: _.template(HeaderTemplate),
        events: {
            'click #btn_add': 'newTask'
        },
        initialize: function () {
        },
        render: function(route){
            this.$el.html(this.template());
            if(route == "newTask" || route == "updateTask"){
                $("#btn_add")[0].style.visibility = "hidden";
                $("#label_btn_add")[0].style.visibility = "hidden";
            }
            else{
                $("#btn_add")[0].style.visibility =  "visible";
                $("#label_btn_add")[0].style.visibility =  "visible";
            }
        },
        newTask: function(){
            this.navigate('newTask', {trigger: true});
        }
    });

    return HeaderView;
});

