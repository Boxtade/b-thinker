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
            _.extend(Backbone.View.prototype, {
                style: new Style(),
                fluch:function(){
                    TOKEN=undefined;
                    localStorage.removeItem("b_tkn");
                },
                pop_alert:function(type,msg){
                    switch(type){
                        case "error":
                            pop_error(msg);
                            break;
                        case "success":
                            pop_success(msg);
                            break;
                    }
                }
            });
            if(localStorage.getItem("b_chkr") === "true"){
                TOKEN = localStorage.getItem("b_tkn");
                if(TOKEN == null)TOKEN = undefined;
            }
            Router.initialize();
        };

        var pop_error = function(msg){
            var div = document.createElement("div");
            div.setAttribute("class","alert_box alert alert-danger");
            div.innerHTML = '<a class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Danger!   </strong>'+msg;
            document.body.appendChild(div);
        };

        var pop_success = function(msg){
            var div = document.createElement("div");
            div.setAttribute("class","alert_box alert alert-success");
            div.innerHTML = '<a class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Danger!   </strong>'+msg;
            document.body.appendChild(div);
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

