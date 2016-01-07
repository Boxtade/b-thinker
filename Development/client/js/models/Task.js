/**
 * Created by Kevin on 2015-10-13.
 */

define([
    'underscore',
    'backbone'
],function(_,Backbone){
    var Task = Backbone.Model.extend({
        url: "http://"+window.url+":5000/tasks",
        defaults:{
            id:"",
            task:"",
            title:"",
            text:""
        },
        constructor:function(attributes,option){

            if(attributes.task == undefined)
                attributes.task = attributes.title+"*/*"+attributes.text;
            Backbone.Model.apply( this, arguments );
        },
        destroy: function (options) {
            var opts = _.extend({url: 'http://'+window.url+':5000/tasks/' + this.id}, options || {});
            return Backbone.Model.prototype.destroy.call(this, opts);
        },
        set: function(attributes, options) {
            if(typeof(attributes.task) == "string")
            {
                var postAttributes = this.parseString(attributes.task);
                attributes.title = postAttributes[0];
                attributes.text = postAttributes[1];
            }
            return Backbone.Model.prototype.set.call(this, attributes, options);
        },
        parseString:function(string){
            return string.split("*/*");
        },
        fetch:function(options) {
            var opts = _.extend({url: 'http://'+window.url+':5000/tasks/' + this.id}, options || {});
            return Backbone.Model.prototype.fetch.call(this, opts);
        }
    });

    return Task;
});
