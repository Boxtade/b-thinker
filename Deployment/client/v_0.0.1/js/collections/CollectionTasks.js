/**
 * Created by Kevin on 2015-10-13.
 */
var CollectionTasks = Backbone.Collection.extend({
    model: Task,
    url: "http://"+window.url+":5000/tasks",
    parse: function(response) {
        return response.tasks;
    }
});