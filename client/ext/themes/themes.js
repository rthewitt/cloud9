/**
 * Code Editor for the Cloud9 IDE
 *
 * @copyright 2010, Ajax.org B.V.
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */

define(function(require, exports, module) {

var ide = require("core/ide");
var ext = require("core/ext");
var settings = require("ext/settings/settings");

module.exports = ext.register("ext/themes/themes", {
    name    : "Themes",
    dev     : "Ajax.org",
    alone   : true,
    offline : false,
    type    : ext.GENERAL,
    nodes   : [],

    register : function(themes){
        for (var name in themes) {
            this.nodes.push(
                mnuThemes.appendChild(new apf.item({
                    caption : name,
                    type    : "radio",
                    value   : themes[name]
                }))
            );
        }
    },

    set : function(path){
        //Save theme settings
        settings.model.setQueryValue("editors/code/@theme", path);
        settings.save();
        ide.dispatchEvent("theme_change", {theme: path});
        ide.dispatchEvent("track_action", {type: "theme change", theme: path});
    },

    init : function(){
        var _self = this;
        var menuItem = new apf.item({
                caption : "Themes",
                submenu : "mnuThemes"
            });
        this.nodes.push(
            mnuView.appendChild(menuItem),
            apf.document.body.appendChild(new apf.menu({
                id : "mnuThemes",
                onitemclick : function(e){
                    _self.set(e.relatedNode.value);
                }
            }))
        );
        
        require("ext/statusbar/statusbar").addPrefsItem(menuItem.cloneNode(true));
    },

    enable : function(){
    },

    disable : function(){
    },

    destroy : function(){
    }
});

});