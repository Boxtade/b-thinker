/**
 * Created by Kevin on 2015-10-13.
 */

define([
    'jquery',
    'underscore',
    'backbone'
],function($,_,Backbone){
    var Task = Backbone.Model.extend({
        url: "http://"+URL+":"+PORT+"/bthinker/task",
        defaults:{
            id:"",
            title:"",
            content:""
        },
        create:function(token,title,content,callback) {
                var taskDetail = {
                    title:title,
                    content:content,
                    token:token
                };
                var self = this;

                this.save(taskDetail,{type: 'POST'}).complete(function(o){
                    if(o.responseJSON == undefined)
                        self.navigate("error/connection", {trigger: true});
                    callback(o.responseJSON);
                });
        },
        update:function(token,id,title,content,callback){
            var taskDetail = {
                id:id,
                title:title,
                content:content,
                token:token
            };
            var self = this;

            this.save(taskDetail).complete(function(o){
                if(o.responseJSON == undefined)
                    self.navigate("error/connection", {trigger: true});
                callback(o.responseJSON);
            });
        },
        getOne:function(token,id,callback) {
            var taskDetail = {
                token:token,
                id:id
            };
            var self = this;

            this.fetch(taskDetail).complete(function(o){
                if(o.responseJSON == undefined)
                    self.navigate("error/connection", {trigger: true});
                callback(o.responseJSON);
            });
        },
        remove:function(token,id,callback){
            var taskDetail = {
                token:token,
                id:id
            };
            var self = this;

            this.destroy(taskDetail).complete(function(o){
                if(o.responseJSON == undefined)
                    self.navigate("error/connection", {trigger: true});
                callback(o.responseJSON);
            });
        },
        destroy:function(options){
            var opts = _.extend({url: this.url+"/?token="+options.token+"&id="+options.id}, options || {});
            opts.data = options;
            return Backbone.Model.prototype.destroy.call(this, opts);
        },
        fetch:function(options) {
            console.log(options);
            var opts = _.extend({url: this.url}, options || {});
            opts.data = options;
            return Backbone.Model.prototype.fetch.call(this, opts);
        }
    });

    return Task;
});
