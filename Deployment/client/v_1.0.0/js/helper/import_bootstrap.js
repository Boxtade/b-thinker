/**
 * Created by kevinsalles on 06/01/2016.
 */

var _path_bootstrap = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css";
var _path_bootstrap_theme = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css";
var _path_bootstrap_js = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js";
var _path_jquery = "https://code.jquery.com/jquery-1.11.3.min.js";

function import_bootstrap() {
    var link_base = document.createElement("link");
    var link_theme = document.createElement("link");
    var script_jquery = document.createElement("script");
    var script_js = document.createElement("script");

    script_jquery.setAttribute("src",_path_jquery);
    link_base.setAttribute("rel","stylesheet");
    link_theme.setAttribute("rel","stylesheet");
    link_base.setAttribute("href",_path_bootstrap);
    link_theme.setAttribute("href",_path_bootstrap_theme);
    script_js.setAttribute("src",_path_bootstrap_js);

    var head = document.getElementsByTagName("head")[0];
    head.appendChild(script_jquery);
    head.appendChild(link_base);
    head.appendChild(link_theme);
    head.appendChild(script_js);
}