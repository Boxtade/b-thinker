/**
 * Created by kvins on 09/09/2016.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../templates/error_template.html',
],function($,_,Backbone,ErrorTemplate){
    var ErrorView = Backbone.View.extend({
        el: $('#wrapper'),
        template: _.template(ErrorTemplate),
        events: {
            'click #btn_redirect': 'redirection',
        },
        initialize: function () {
            _.bindAll(this, 'render');
        },
        render: function(msg){
            this.fluch();
            if(msg == "connection")
                msg = "Connection error. The server is not available. Please, contact administrator : boxtade.com/commentaires/. Retry later, thanks.";
            this.$el.html(this.template({message:msg}));
        },
        destroy:function(){
            this.$el.html("");
        },
        redirection:function(){
            this.navigate('login', {trigger: true});
        }
    });

    return ErrorView;
});
