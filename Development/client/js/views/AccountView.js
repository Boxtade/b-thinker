/**
 * Created by kvins on 09/09/2016.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    '../models/User',
    '../models/Password',
    'text!../../templates/account_template.html',
],function($,_,Backbone,User,Password,AccountTemplate){
    var AccountView = Backbone.View.extend({
        el: $('#wrapper'),
        template: _.template(AccountTemplate),
        events: {
            'click a': 'changeState',
            'click #apply_pwd': "change_pwd",
            'click #cancel_pwd': "cancel_pwd"
        },
        password: new Password(),
        user: new User(),
        section: "Password",
        options: [
            {name:"Password"},
            {name:"About"}
        ],
        initialize: function () {
            _.bindAll(this, 'render');
        },
        render: function(){
            var self = this;
            new this.user.Email(TOKEN,function(json){
                if(json.res){
                    self.section = self.options[0].name;
                    var opt = {
                        options:self.options
                    };
                    self.$el.html(self.template({email:json.email,opt:opt}));
                    $("#"+self.section).addClass("active");
                    self._setPanel(self.section);
                }
                else{
                    self.pop_alert("error",json.response);
                }
            });
        },
        destroy:function(){
            this.$el.html("");
        },
        changeState:function(obj){
            var id = obj.currentTarget.id;
            $("#"+this.section).removeClass("active");
            this.section = id;
            $("#"+this.section).addClass("active");
            this._setPanel(this.section);
        },
        change_pwd:function(){
            var self = this;
            var oldpwd = $("#old_pwd")[0].value;
            var newpwd = $("#new_pwd")[0].value;
            var confirmpwd = $("#confirm_pwd")[0].value;
            if(newpwd === confirmpwd){
                new this.password.Change(TOKEN,oldpwd,newpwd,function(json){
                    console.log(json.response);
                    if(json.res){
                        self.cancel_pwd();
                        self.pop_alert("success",json.response);
                    }
                    else{
                        self.cancel_pwd();
                        self.pop_alert("error",json.response);
                    }
                });
            }
            else{
                self.pop_alert("error","Passwords do not match.");
            }

        },
        cancel_pwd:function(){
            $("#old_pwd")[0].value = "";
            $("#new_pwd")[0].value = "";
            $("#confirm_pwd")[0].value = "";
        },
        _setPanel:function(s){
            switch(s){
                case "Password":
                    $("#account_panel").load("templates/password_panel.html");
                    break;
                case "About":
                    $("#account_panel").load("templates/about_panel.html");
                    break;
            }
        }
    });

    return AccountView;
});
