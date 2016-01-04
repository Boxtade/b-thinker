/**
 * Created by Kevin on 2015-10-26.
 */
/*global require*/
'use strict';

require.config({
     paths: {
        jquery: 'libs/jquery/jquery-min',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone-min',
        templates: '../templates',
        text: "libs/require/require-text",
        headerView: 'views/HeaderView',
        headerTemplate: '../templates/header_template',
        router: 'router',
        app: "app"
      },
    shim: {
        backbone: {
            deps: [ "underscore", "jquery" ],
            exports: "backbone"  //attaches "Backbone" to the window object
        }

    }
});

require(
    ['app'],
    function(App){
        debugger;
        //App.initialize();
    }
);