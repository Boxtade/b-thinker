/**
 * Created by Kevin on 2015-10-13.
 */
define([
    'underscore',
    'backbone',
    '../models/Task'
],function(_,Backbone,Task){
    var CollectionTasks = Backbone.Collection.extend({
        model: Task,
        url: "http://"+URL+":"+PORT+"/bthinker/tasks",
        getAll:function(token,callback){
            var taskDetail = {
                token:token
            };
            var self = this;

            this.fetch(taskDetail).complete(function(o){
                if(o.responseJSON == undefined)
                    self.navigate("error/connection", {trigger: true});
                callback(o.responseJSON);
            });
        },
        fetch:function(options) {
            console.log(options);
            var opts = _.extend({url: this.url}, options || {});
            opts.data = options;
            return Backbone.Collection.prototype.fetch.call(this, opts);
        }
    });

    return CollectionTasks;
});
