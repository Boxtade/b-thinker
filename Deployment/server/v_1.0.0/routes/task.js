/**
 * Created by Kevin on 2015-11-11.
 */
exports.tasks = [];
exports.count = 0;

exports.create_task = function(request,response){
    if(request.body["task"] === undefined)
        response.status(400).send("Bad request");
    else
    {
        var task = {
            count:exports.count,
            id:Math.round(Math.random()*1200000000),
            task:request.body["task"]
        };
        exports.tasks.push(task);
        exports.count++;
        response.status(200).json(task);
    }
};

exports.get_tasks = function(request,response){
    response.status(200).json({
        tasks:exports.tasks.sort(function(a,b){
            if(a.count == b.count)
                return 0;
            if(a.count < b.count)
                return 1;
            if(a.count > b.count)
                return -1;
        })
    });
};

exports.get_task = function(request,response){
    var index = findTask(request.params.id);
    if(index === undefined)
        response.status(404).send("Not Found");
    response.status(200).json(exports.tasks[index]);
};

exports.update_task = function(request,response){
    var index = findTask(request.params.id);
    if(index === undefined)
        response.status(404).send("Not Found");
    if(request.body["task"] === undefined)
        response.status(400).send("Bad request");
    exports.tasks[index].task = request.body["task"];
    exports.get_tasks(request,response);
};

exports.delete_task  = function(request,response){
    var index = findTask(request.params.id);
    if(index === undefined)
       response.status(404).send("Not Found");
    exports.tasks.splice(index,1);
    exports.get_tasks(request,response);
};

var findTask = function(id){
    for(var i=0;i<exports.tasks.length;i++)
    {
        if(exports.tasks[i].id == id)
            return i;
    }
    return undefined;
};