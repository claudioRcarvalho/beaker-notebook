/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
/**
 * 'Help' menu plugin
 * This creates the 'Help' menu.
 */
(function () {
    'use strict';
    var menuItems = [
//        {
//            name: "Tutorial notebook",
//            action: function () {
//                bkHelper.openURI("file:config/tutorial.bkr");
//            },
//            tooltip: "Open the tutorial notebook"
//        },
        {
            name: "Keyboard shortcuts...",
            action: function () {
                window.open("./keyboardShortcuts.html");
            },
            tooltip: "Show keyboard shortcuts"
        }
    ];
    var toAdd = {items: menuItems, parent: "Help"};
    pluginObj.onReady(toAdd);
})();