/**
 * Created by kvins on 08/09/2016.
 */
define([
    'jquery',
    'underscore',
    'backbone'
],function($,_,Backbone) {
    var User = function () {
        this.email = "";
        this.Register = Backbone.Model.extend({
            url: "http://" + URL + ":" + PORT + "/users/register",
            initialize: function (email, password, callback) {
                var self = this;
                var param = {
                    email:email,
                    password:password
                };
                this.save(param, {type: 'POST'}).complete(function(o){
                    if(o.responseJSON == undefined)
                        self.navigate("error/connection", {trigger: true});
                    callback(o.responseJSON);
                })
            }
        });
        this.Login = Backbone.Model.extend({
            url: "http://" + URL + ":" + PORT + "/users/login",
            initialize: function (email, password, callback) {
                var self = this;
                var param = {
                    email:email,
                    password:password
                };
                this.save(param, {type: 'POST'}).complete(function(o){
                    if(o.responseJSON == undefined)
                        self.navigate("error/connection", {trigger: true});
                    callback(o.responseJSON);
                })
            }
        });
        this.Token = Backbone.Model.extend({
            url: "http://" + URL + ":" + PORT + "/users/token",
            initialize: function (token, callback) {
                var self = this;
                var param = {
                    token:token
                };
                this.save(param, {type: 'POST'}).complete(function(o){
                    if(o.responseJSON == undefined)
                        self.navigate("error/connection", {trigger: true});
                    callback(o.responseJSON);
                })
            }
        });
        this.Email = Backbone.Model.extend({
            url: "http://" + URL + ":" + PORT + "/users/email",
            initialize: function (token, callback) {
                var self = this;
                var param = {
                    token:token
                };
                this.fetch(param).complete(function(o){
                    if(o.responseJSON == undefined)
                        self.navigate("error/connection", {trigger: true});
                    callback(o.responseJSON);
                })
            },
            fetch:function(options) {
                var opts = _.extend({url: this.url}, options || {});
                opts.data = options;
                return Backbone.Model.prototype.fetch.call(this, opts);
            }
        });
    };

    return User;
});
