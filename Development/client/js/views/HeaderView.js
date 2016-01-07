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
            this.render();
        },
        render: function(){
            this.$el.html(this.template());
        },
        newTask: function(){
            this.navigate('newTask', {trigger: true});
        }
    });

    return HeaderView;
});

