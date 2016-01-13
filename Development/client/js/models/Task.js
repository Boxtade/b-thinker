/**
 * Created by Kevin on 2015-10-13.
 */

define([
    'jquery',
    'underscore',
    'backbone'
],function($,_,Backbone){
    var Task = Backbone.Model.extend({
        url: "http://"+URL+":5000/tasks",
        defaults:{
            id:"",
            task:"",
            title:"",
            text:""
        },
        //constructor:function(attributes,option){
        //
        //    if(attributes.task == undefined)
        //        attributes.task = attributes.title+"*/*"+attributes.text;
        //    Backbone.Model.apply( this, arguments );
        //},
        destroy: function (options) {
            var opts = _.extend({url: 'http://'+URL+':5000/tasks/' + this.id}, options || {});
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
        set_id: function(id){
            this.attributes.id = id
        },
        save_task:function(id) {
            if ($("#post_title")[0].value != "" && $("#post_memo")[0].value != "") {
                var taskDetail = {task: $("#post_title")[0].value + "*/*" + $("#post_memo")[0].value};
                var self = this;

                if(id === undefined){
                    this.attributes.task = $("#post_title")[0].value+"*/*"+$("#post_memo")[0].value;
                    this.save(taskDetail,{type: 'POST'}).complete(function(){
                        self.navigate('Tasks', {trigger: true});
                    });
                }
                else{
                    this.set(taskDetail);
                    this.url = 'http://' + URL + ':5000/tasks/' + id;
                    this.save().complete(function () {
                        self.navigate('Tasks', {trigger: true});
                    });
                }
            }
            else
                $(".message").html("Veuillez remplir tous les champs.");
        },
        parseString:function(string){
            return string.split("*/*");
        },
        fetch:function(options) {
            var opts = _.extend({url: 'http://'+URL+':5000/tasks/' + this.attributes.id}, options || {});
            return Backbone.Model.prototype.fetch.call(this, opts);
        }
    });

    return Task;
});
