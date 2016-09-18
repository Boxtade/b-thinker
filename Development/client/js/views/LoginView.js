/**
 * Created by kvins on 06/09/2016.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../templates/login_template.html',
    '../models/User',
    '../models/Password'
],function($,_,Backbone,LoginTemplate,User,Password){
    var LoginView = Backbone.View.extend({
        el: $('#wrapper'),
        template: _.template(LoginTemplate),
        events: {
            'click #btn_register': 'modal_register',
            'click #btn_login': 'modal_login',
            'click .close': 'modal_close',
            'click .cancelbtn': 'modal_close',
            'click #btn_connexion': 'login',
            'click #btn_rgt': 'register',
            'click #btn_forget': 'modal_reset',
            'click #btn_reset': 'resetPassword',
            'click #btn_code': 'codePassword'
        },
        user: new User(),
        password: new Password(),
        initialize: function () {
            _.bindAll(this, 'render');
        },
        render: function(){
            this.$el.html(this.template());
        },
        destroy:function(){
            this.$el.html("");
        },
        empty:function(o){
            return (o[0].value.length == 0);
        },
        modal_login:function(){
            var self = this;
            $("#modal_template").load("templates/login_modal.html", function(){
                localStorage.getItem("b_chkr") === "true"?$("#check_remenberMe")[0].checked = true:$("#check_remenberMe")[0].checked = false;
                self.modal_open();
            });
        },
        modal_register:function(){
            $("#modal_template").load("templates/register_modal.html", this.modal_open);
        },
        modal_reset:function(){
            $("#modal_template").load("templates/reset_modal.html", this.modal_open);
        },
        modal_code:function(){
            $("#modal_template").load("templates/code_modal.html", this.modal_open);
        },
        modal_open:function(){
            document.body.style.overflow = "hidden";
            $("#login").fadeTo("slow",0.7);
            $("#login_modal").fadeTo("slow",1);
        },
        modal_close:function(){
            document.body.style.overflowY = "visible";
            $("#login").fadeTo("slow",1);
            $("#login_modal").fadeTo("slow",0);
        },
        register:function(){
            var self = this;
            var email = $("#field_email")[0].value;
            var pwd = $("#field_password")[0].value;
            var confirmPwd = $("#field_confirm_password")[0].value;

            if(this.empty($("#field_email")) && this.empty($("#field_password")) && this.empty($("#field_confirm_password"))){
                $("#fail_modal").text("Fill all form");
            }
            else{
                if(pwd != confirmPwd){
                    $("#fail_modal").text("Passwords don't match. Retry, please.");
                }
                else{
                    new this.user.Register(email,pwd,function(json){
                        if(json.res){
                            self.modal_close();
                            self.pop_alert("success",json.response);
                            self.modal_login();
                        }
                        else{
                            console.log("error");
                            $("#fail_modal").text(json.response);
                        }
                    });
                }
            }
        },
        login:function(){
            var self = this;
            var email = $("#field_email")[0].value;
            var pwd = $("#field_password")[0].value;

            if(this.empty($("#field_email")) && this.empty($("#field_password"))){
                $("#fail_modal").text("Fill all form");
            }
            else{
                new this.user.Login(email,pwd,function(json){
                    console.log(json);
                    if(json.res){
                        self.modal_close();
                        TOKEN = json.token;
                        var c = $("#check_remenberMe")[0].checked;
                        localStorage.setItem("b_chkr",c);
                        if(c){
                            localStorage.setItem("b_tkn",TOKEN);
                        }
                        self.navigate('tasks', {trigger: true});
                    }
                    else{
                        $("#fail_modal").text(json.response);
                    }
                });
            }
        },
        resetPassword: function(){
            var self = this;
            var email = $("#field_email")[0].value;

            if(this.empty($("#field_email"))){
                $("#fail_modal").text("Fill all form");
            }
            else{
                new this.password.Code(email,function(json){
                    if(json.res){
                        self.user.email = email;
                        self.pop_alert("success",json.response);
                        self.modal_code()
                    }
                    else{
                        $("#fail_modal").text(json.response);
                    }
                });
            }
        },
        codePassword:function(){
            var self = this;
            var email = this.user.email;
            var code = $("#field_code")[0].value;
            var password = $("#field_password")[0].value;

            if(this.empty($("#field_password")) && this.empty($("#field_code"))){
                $("#fail_modal").text("Fill all form");
            }
            else {
                new this.password.Reset(email,code,password, function (json) {
                    if (json.res) {
                        self.modal_login()
                        self.pop_alert("success",json.response);
                    }
                    else {
                        $("#fail_modal").text(json.response);
                    }
                });
            }
        }
    });

    return LoginView;
});
