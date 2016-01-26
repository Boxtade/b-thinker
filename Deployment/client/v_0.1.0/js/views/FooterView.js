/**
 * Created by Kevin on 2015-10-14.
 * @author Kévin Salles
 */

/**
 * @requires jquery
 * @requires underscore
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../templates/footer_template.html'
],function($,_,Backbone,FooterTemplate){
    var FooterView = Backbone.View.extend({
        el: $("#wrapper_footer"),

        template: _.template(FooterTemplate),
        initialize: function () {
            this.render();
        },
        render: function(){
            this.$el.html(this.template({year:YEAR,version:VERSION,contact_url:CONTACT}));
        }
    });

    return FooterView;
});
