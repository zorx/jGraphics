var jGraphics;

// Begin jGraphics Kernel
// create closure
(function($) {

    'use strict';

    // jGraphics object
    $.jGraphics = {};

    // Internals plugin data
    var _internals = {};

    // create a uniqId
    var _uniqId = function(prefix) {
        var rnd = (Math.random() * 1e9).toString(16).substr(0, 6) + (new Date().getTime()).toString(16);
        return (prefix ? prefix : '') + rnd;
    }

    // jQuery jGraphics function definition
    jGraphics = function(selector) {
        var el = $(selector);
        // Unique Canvas id
        this.id = _uniqId("jGraphics_");
        //append jGraphics content
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("id", this.id);
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        el.append(svg);
    }

    // Create state "object" for plugin
    var jGPlugin = function(id, args, pluginName, pluginPosition, svgId) {

        this.id = id;
        this.args = $.extend({}, args, {
            id: id
        });
        var _attr = {};

        // Get plugin Name
        this.getPluginName = function() {
            return pluginName;
        }

        // Get plugin Name
        this.getPluginPosition = function() {
            if (pluginPosition) {
                pluginPosition.x = $.makeArray(pluginPosition.x);
                pluginPosition.y = $.makeArray(pluginPosition.y);
            }
            return pluginPosition;
        }

        // Set internal values
        this.setInternal = function(data) {

            var _data = ($.isPlainObject(_internals[pluginName + "_" + id])) ? _internals[pluginName + "_" + id] : {};
            _internals[pluginName + "_" + id] = $.extend(true, {}, _data, data);
        }

        // Retrieve internal value
        this.getInternal = function(key) {
            return ($.isPlainObject(_internals[pluginName + "_" + id])) ? _internals[pluginName + "_" + id][key] : undefined;
        }

        // Retrieve internal values (all)
        this.getInternals = function() {
            return _internals[pluginName + "_" + id];
        }

        this.attr = function(attr, value) {
            $("#" + id).attr(attr, value);
            if ($.isPlainObject(attr)) {
                _attr = $.extend({}, _attr, attr);
                return this;
            } else if ($.type(attr) === 'string') {
                if (value !== undefined) {
                    _attr[attr] = value;
                    return this;
                } else {
                    return _attr[attr];
                }
            } else if (attr === undefined) {
                return _attr;
            } else {
                return null;
            }
        }

        this.removeAttr = function(attributeName) {
            $("#" + id).removeAttr(attributeName);
        }

        this.children = function() {

        }

        // Remove this instance
        this.remove = function() {
            $("#" + id).remove();
        }

        this.hide = function(callback) {
            $("#" + id).hide(callback);
        }

        this.show = function() {
            $("#" + id).show();
        }

        this.on = function(eventName, callback) {
            $(document).on(eventName, "#" + id, callback);
        }

        // Trigger
        this.trigger = function(eventName, data) {
            $("#" + id).trigger(eventName, data);
        }

        this.animate = function(properties, duration, easing, complete) {
            //$("#"+id).animate.apply(arguments);
            $("#" + id).animate(properties);
        }

        this.attach = function(plugins) {

        }

        // Get parent (plugin "class")
        this.parent = function() {
            return _plugins[pluginName];
        }
    };

    /* -- Actions config -- */

    // Retrieve all actions
    $.jGraphics.getActions = function() {
        return jGPlugin.prototype;
    }

    // Retrieve action by name
    $.jGraphics.getAction = function(name) {
        // return existing action (undefined otherwise)
        return jGPlugin.prototype[name];
    }

    // Check wether a action exists or nor
    $.jGraphics.isAction = function(name) {
        return ($.isFunction(jGPlugin.prototype[name]));
    }

    // Register a action
    $.jGraphics.registerAction = function(action) {
        // Check wether the name has been set
        if (action.name) {
            // Register action function
            jGPlugin.prototype[action.name] = action.fn;
        }
    }

    /* -- Plugins config  -- */

    // Retrieve all plugins
    $.jGraphics.getPlugins = function() {
        return Object.keys(jGraphics.prototype);
    }

    // Check wether a Plugin exists or nor
    $.jGraphics.isPlugin = function(name) {
        return ($.isFunction(jGraphics.prototype[name]));
    }

    $.jGraphics.isInstance = function(plugin) {
        return (plugin instanceof jGPlugin);
    }

    // Register Plugin
    $.jGraphics.registerPlugin = function(plugin) {

        var pName = plugin.name,
            pPosition = plugin.position;

        // Check wether the name has been set
        if (!pName) {
            throw "jGraphics error: can't register plugin without name !";
        }

        // Add plugin function
        // Ex : jG.circle(...) adds a circle into the controller
        jGraphics.prototype[pName] = function() {
            var id = _uniqId("jGPlugin_"),
                svgId = this.id,
                args = $.isFunction(plugin.construct) ? Object.create(new plugin.construct(arguments)) : {},
                _state = new jGPlugin(id, args, pName, pPosition, svgId);

            $("#" + svgId).append(plugin.render(_state));

            return _state;
        }
    }
})(jQuery); // jGraphics Kernel end
