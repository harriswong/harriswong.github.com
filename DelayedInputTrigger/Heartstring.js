/*************************************************************************
 * Heartstring.js
 * https://github.com/writersky/DelayedInputTrigger
 * Copyright 2013 Writersky.
 *
 * Licensed under the The GNU Lesser General Public License,
 * version 2.1 (LGPL-2.1).
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/lgpl-2.1.php
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **************************************************************************/
/************************************************************************/
/* Heartstring JS Framework                                             */
/*                                                                      */
/* @author  Harris Wong                                                 */
/* @date    Jul 26th, 2011                                              */
/************************************************************************/
// $Id: Heartstring.js 512 2013-07-01 23:10:25Z harris $

var Heartstring = Heartstring || {};

/** Constants */
Heartstring.BASE_URL = '';
/**
 * @param   string      ID name 
 * @param   object      Scope in which we want to preform select on.
 * @return  jQuery Object
 */
Heartstring.selectId = function(selector, scope) {
    if (!scope) {
        scope = $(document);
    };
    return $('[id|="' + selector + '"]', scope);
};


/**
 * @param   string      Class name 
 * @param   object      Scope in which we want to preform select on.
 * @return  jQuery Object
 */
Heartstring.selectClass = function(selector, scope) {
    if (!scope) {
        scope = $(document);
    };
    return $('[class|="' + selector + '"]', scope);
};


/**
 * Attempt to automatically search via ID and if not found, use class. If not found, search for prefix.
 * Careful for bubbling if the prefix is the same.  
 *
 * [Experiimental]
 * @param   string      Class name 
 * @param   object      Scope in which we want to preform select on.
 * @return  jQuery Object
 */
Heartstring.select = function (selector, scope) {
    var obj = $(selector);
    if (obj.length === 0) {
        //Remove '.' and '#' so then the code below won't append extra selectors in front.
        if (selector.substr(0, 1) === '.' || selector.substr(0, 1) === '#') {
            selector = selector.substring(1);
        }
    } else {
        return obj;
    }
    //Search through all selectors possible.
    if (obj.length === 0) {
        obj = $("#" + selector, scope);
    } 
    if (obj.length === 0) {
        obj = $("." + selector, scope);
    } 
    if (obj.length === 0) {
        obj = Heartstring.selectId(selector, scope);
    }
    if (obj.length === 0) {
        obj = Heartstring.selectClass(selector, scope);
    }
    return obj;
}

/**
 * Initialize a component configuration.  Override defaults value by the given ones.
 * @param   object      The component itself
 * @param   object      JSON format configuration
 */
Heartstring.init = function (component, customConfig) {
    var that = {};
    /**
     * This private function merges config options
     * @param   Default options in json format, usually the ones from template.
     * @param   Custom options in json format, usually rhe ones from js default
     */
    var configMerger = function (defaultConfig, customConfig) {
        if ($.isEmptyObject(defaultConfig)) {
            return customConfig;
        }
        $.each(customConfig, function(configName, configValue) {
            if ($.isPlainObject(configValue)) {
                defaultConfig[configName] = configMerger(defaultConfig[configName], configValue);
            } else {
                defaultConfig[configName] = configValue;
            }
        });
        return defaultConfig;
    };
    if (customConfig) {
        that.config = configMerger(component.defaults.config, customConfig);
        that.container = customConfig.container || component.defaults.container; 
    } else {
        that.config = component.defaults.config;
        that.container = component.defaults.container;
    }
    return that;
}