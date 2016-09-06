/**
 * @file Config file for requires.js and constant values
 * @author Kévin Salles
 */


URL = "localhost";
VERSION = "0.1.1";
YEAR = new Date().getFullYear();
CONTACT = "boxtade.com";

require.config({
    paths: {
        jquery: 'https://ajax.cdnjs.com/ajax/libs/jquery/1.11.3/jquery.min',
        underscore: 'http://ajax.cdnjs.com/ajax/libs/underscore.js/1.8.3/underscore-min',
        backbone: 'http://ajax.cdnjs.com/ajax/libs/backbone.js/1.2.3/backbone-min',
        text: 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text'
    }
});