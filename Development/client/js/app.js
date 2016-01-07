/**
 * Created by Kevin on 2015-10-13.
 */

window.url = "boxtade.com";

//window.onload = initialize;

define([
    'underscore',
    'backbone',
    'router'
],
    function(_, Backbone, Router){
        var initialize = function() {
            var base_url = "http://"+window.url+"/b-thinker/index.html";
            var actual_url = window.location.href;
            var parse_url = actual_url.split("/").reverse()[0];

            console.log(parse_url);

            if(parse_url != "index.html")
                window.location.href = base_url;
            console.log(actual_url);
            Router.initialize();
        };

        return {
            initialize: initialize
        };
    }
);

