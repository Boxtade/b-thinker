/**
 * Created by Kevin on 2015-10-13.
 */

window.url = "boxtade.net";

window.onload = initialize;

function initialize() {
    $("#progressbar").progressbar({
        value: false
    });
    headerView = new HeaderView();
    newTaskView = new NewTaskView();
    updateTaskView = new UpdateTaskView();
    $("#btn_add")[0].style.visibility = "visible";
    tasksView = new TasksView();
}
