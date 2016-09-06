/**
 * Created by kvins on 12/01/2016.
 */

W_DESKTOP = 1030;
W_TABLET = 560;

define([],
    function(){
        var Style = function() {

            _ = function(){
            BTN_ADD = _el("#wrapper_add_btn");
            BTN_CANCEL_IMG = _el('#btn_cancel_img');
            BTN_APPLY_IMG = _el('#btn_apply_img');
            POST_TITLE = _el('#post_title');
            POST_MEMO = _el('#post_memo');
            };

            this.render = function () {
                _();
                var route = this.getPathUrl()[0];
                switch (route){
                    case "#updateTask": _action(this,_action_update_desktop,_action_update_tablet,_action_update_mobil);break;
                    case "#newTask": _action(this,_action_new_desktop,_action_new_tablet,_action_new_mobil);break;
                    default:
                    case "#tasks": _action(this,_action_tasks_desktop,_action_tasks_tablet,_action_tasks_mobil);break;
                }
            };

            _el = function(object){return $(object)[0]};

            this.hel = function (id) {
                _el(id).style.display = "none";
            };

            this.vel = function (id) {
                _el(id).style.display = "inline";
            };

            _hel = function (object) {
                object.style.display = "none";
            };

            _vel = function (object) {
                object.style.display = "inline";
            };

            this.mode = function () {
                var w = window.innerWidth;
                if (w > W_DESKTOP)
                    return "desktop";
                else if (w > W_TABLET)
                    return "tablet";
                else
                    return "phone";
            };

            this.getPathUrl = function() {
                var url = document.createElement("a");
                url.href = window.location.href;
                return url.hash.split("/");
            };

            _action = function(_this,A_desktop,A_tablet,A_mobil){
                var m = _this.mode();
                switch (m){
                    case "desktop" : A_desktop();break;
                    case "tablet" : A_tablet();break;
                    case "phone" : A_mobil();break;
                }
            };

            _action_update_desktop = function(){
                _hel(BTN_ADD);
                _hel(BTN_APPLY_IMG);
                _hel(BTN_CANCEL_IMG);
            };

            _action_update_tablet = function(){
                _action_update_desktop();
            };

            _action_update_mobil = function(){
                _hel(BTN_ADD);
                _vel(BTN_APPLY_IMG);
                _vel(BTN_CANCEL_IMG);
            };

            _action_new_desktop = function(){
                _hel(BTN_ADD);
                _hel(BTN_APPLY_IMG);
                _hel(BTN_CANCEL_IMG);
            };

            _action_new_tablet = function(){
                _action_new_desktop();
            };

            _action_new_mobil = function(){
                _hel(BTN_ADD);
                _vel(BTN_APPLY_IMG);
                _vel(BTN_CANCEL_IMG);
            };

            _action_tasks_desktop = function(){
                _vel(BTN_ADD);
                _hel(BTN_APPLY_IMG);
                _hel(BTN_CANCEL_IMG);
            };

            _action_tasks_tablet = function(){
                _action_tasks_desktop();
            };

            _action_tasks_mobil = function(){
                _action_tasks_desktop();
            };
        };

        return Style;
    }
);
