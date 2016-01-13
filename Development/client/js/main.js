/**
 * Created by Kevin on 2015-10-26.
 */
/*global require*/
'use strict';

$.getScript("js/config.js",function(){
    require([
            'app'
        ],
        function(App){
            App.initialize();
        }
    );
});

