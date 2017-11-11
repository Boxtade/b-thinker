/**
 * Created by kvins on 06/01/2016.
 */

/**
 *  @constant
 *  @default
 */
var _path_bootstrap = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css";
var _path_bootstrap_theme = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css";
var _path_bootstrap_js = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js";

/**
 * @function
 * @name import_script
 * @description import the scripts of Bootstrap
 * */
function import_script() {
    var link_base = document.createElement("link");
    var link_theme = document.createElement("link");
    var script_js = document.createElement("script");

    link_base.setAttribute("rel","stylesheet");
    link_theme.setAttribute("rel","stylesheet");
    link_base.setAttribute("href",_path_bootstrap);
    link_theme.setAttribute("href",_path_bootstrap_theme);
    script_js.setAttribute("src",_path_bootstrap_js);

    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link_base);
    head.appendChild(link_theme);
    head.appendChild(script_js);
}