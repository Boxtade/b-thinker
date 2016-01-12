/**
 * Created by Kevin on 2015-10-13.
 */



define([
    'underscore',
    'backbone',
    'router',
    'config'
],
    function(_, Backbone, Router,Config){
        var initialize = function() {
            //initialize_url();
            Router.initialize();
        };

        var initialize_url = function(){
            var base_url = "http://"+URL+"/b-thinker/index.html";
            var actual_url = window.location.href;
            var parse_url = actual_url.split("/").reverse()[0];

            console.log(parse_url);

            if(parse_url != "index.html")
                window.location.href = base_url;
            console.log(actual_url);
        };

        return {
            initialize: initialize
        };
    }
);

