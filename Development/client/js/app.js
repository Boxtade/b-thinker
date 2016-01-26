/**
 * Created by Kevin on 2015-10-13.
 */



define([
    'jquery',
    'underscore',
    'backbone',
    'helper/style',
    'router',
    'config'
],
    function($,_, Backbone, Style, Router){
        var initialize = function() {
            //initialize_url();
            _.extend(Backbone.View.prototype, {
                style: new Style()
            });
            Router.initialize();
        };

        var initialize_url = function(){
            var base_url = "http://"+URL+"/b-thinker";
            var actual_url = window.location.href;
            var parse_url = actual_url.split("/").reverse()[0];

            console.log(parse_url);

            if(parse_url != "")
                window.location.href = base_url;
            console.log(actual_url);
        };

        return {
            initialize: initialize
        };
    }
);

