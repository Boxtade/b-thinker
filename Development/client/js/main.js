/**
 * Created by Kevin on 2015-10-26.
 */
/*global require*/
'use strict';

require.config({
     paths: {
        jquery: 'https://ajax.cdnjs.com/ajax/libs/jquery/1.11.3/jquery.min',
        underscore: 'http://ajax.cdnjs.com/ajax/libs/underscore.js/1.8.3/underscore-min',
        backbone: 'http://ajax.cdnjs.com/ajax/libs/backbone.js/1.2.3/backbone-min',
        text: 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text',
        config:'config'
     }
});

require(
    ['app'],
    function(App){
        App.initialize();
    }
);