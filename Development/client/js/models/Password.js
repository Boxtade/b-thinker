/**
 * Created by kvins on 08/09/2016.
 */
define([
    'jquery',
    'underscore',
    'backbone'
],function($,_,Backbone) {
    var Password = function () {
        this.Code = Backbone.Model.extend({
            url: "http://" + URL + ":" + PORT + "/users/password/code",
            initialize: function (email,callback) {
                var self = this;
                var param = {
                    email:email
                };
                this.save(param, {type: 'POST'}).complete(function(o){
                    if(o.responseJSON == undefined)
                        self.navigate("error/connection", {trigger: true});
                    callback(o.responseJSON);
                })
            }
        });
        this.Reset = Backbone.Model.extend({
            url: "http://" + URL + ":" + PORT + "/users/password/reset",
            initialize: function (email,code, password, callback) {
                var self = this;
                var param = {
                    email:email,
                    code:code,
                    newpass:password
                };
                this.save(param, {type: 'POST'}).complete(function(o){
                    if(o.responseJSON == undefined)
                        self.navigate("error/connection", {trigger: true});
                    callback(o.responseJSON);
                })
            }
        });
        this.Change = Backbone.Model.extend({
            url: "http://" + URL + ":" + PORT + "/users/password/change",
            initialize: function (token,oldpass,newpass,callback) {
                var self = this;
                var param = {
                    token:token,
                    oldpass:oldpass,
                    newpass:newpass
                };
                this.save(param, {type: 'POST'}).complete(function(o){
                    if(o.responseJSON == undefined)
                        self.navigate("error/connection", {trigger: true});
                    callback(o.responseJSON);
                })
            }
        });
    };

    return Password;
});
