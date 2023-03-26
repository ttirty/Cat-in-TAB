(this["webpackJsonpdroptabs"] = this["webpackJsonpdroptabs"] || []).push([
    [0], {

        /***/
        236:
            /***/
            (function(module, __webpack_exports__, __webpack_require__) {

                "use strict";
                /* harmony export (binding) */
                __webpack_require__.d(__webpack_exports__, "b", function() { return formatLocalStorageValue; });
                /* unused harmony export OutsideAlerter */
                /* harmony import */
                var _Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
                /* harmony import */
                var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
                /* harmony import */
                var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
                /* harmony import */
                var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);
                /* harmony import */
                var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
                /* harmony import */
                var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
                /* harmony import */
                var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(165);
                /* harmony import */
                var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(217);
                /* harmony import */
                var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(23);
                /* harmony import */
                var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(0);
                /* harmony import */
                var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/ __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
                /* harmony import */
                var _stores_persistStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(32);
                var formatLocalStorageValue = function formatLocalStorageValue(value, isUsingMac) { var formattedValue = value.toUpperCase(); if (isUsingMac) { formattedValue = formattedValue.replace('CMD', '⌘');
                        formattedValue = formattedValue.replace('ALT', '⌥'); } formattedValue = formattedValue.replace('SHIFT', '⇧');
                    formattedValue = formattedValue.replace('ALT', 'Alt');
                    formattedValue = formattedValue.replace('CMD', 'Cmd');
                    formattedValue = formattedValue.replace('CTRL', 'Ctrl');
                    formattedValue = formattedValue.replaceAll('+', ' + '); return formattedValue; };

                function useOutsideAlerter(ref) {
                    Object(react__WEBPACK_IMPORTED_MODULE_9__["useEffect"])(function() {
                        /**
                         * Alert if clicked on outside of element
                         */
                        function handleClickOutside(event) { if (ref.current && !ref.current.contains(event.target)) { alert('You clicked outside of me2!'); } } // Bind the event listener
                        document.addEventListener('mousedown', handleClickOutside);
                        return function() { // Unbind the event listener on clean up
                            document.removeEventListener('mousedown', handleClickOutside);
                        };
                    }, [ref]);
                }

                function OutsideAlerter(props) { var wrapperRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(null);
                    useOutsideAlerter(wrapperRef); return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", { ref: wrapperRef }, props.children); }
                var ShortcutRecorder = function ShortcutRecorder(_ref) {
                    var _navigator, _navigator$userAgentD, _navigator$userAgentD2;
                    var label = _ref.label,
                        setLocalStorage = _ref.setLocalStorage,
                        localStorageValue = _ref.localStorageValue,
                        defaultValue = _ref.defaultValue,
                        setIndexSel = _ref.setIndexSel,
                        indexSel = _ref.indexSel,
                        index = _ref.index;
                    var _useState = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(true),
                        _useState2 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(_useState, 2),
                        collapsed = _useState2[0],
                        setCollapsed = _useState2[1];
                    var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(''),
                        _useState4 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(_useState3, 2),
                        invalidText = _useState4[0],
                        setInvalidText = _useState4[1];
                    var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(localStorageValue),
                        _useState6 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(_useState5, 2),
                        inputValue = _useState6[0],
                        setInputValue = _useState6[1];
                    var _useColorMode = Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[ /* useColorMode */ "b"])(),
                        colorMode = _useColorMode.colorMode,
                        toggleColorMode = _useColorMode.toggleColorMode;
                    var isUsingMac = ((_navigator = navigator) === null || _navigator === void 0 ? void 0 : (_navigator$userAgentD = _navigator.userAgentData) === null || _navigator$userAgentD === void 0 ? void 0 : (_navigator$userAgentD2 = _navigator$userAgentD.platform) === null || _navigator$userAgentD2 === void 0 ? void 0 : _navigator$userAgentD2.indexOf('macOS')) >= 0;
                    var iconSmall = { light: 'gray.700', dark: '#FFF' };
                    var bgColor = { light: 'gray.100', dark: '#3F454D' };
                    var subTitle = { light: 'gray.500', dark: 'gray.400' };
                    var text = { light: '#1A202C', dark: '#FFF' };
                    var icon = { light: 'gray.500', dark: '#A1A2A4' };
                    var iconColor = { light: 'gray.600', dark: 'gray.400' };
                    var hoverText = { light: 'gray.700', dark: 'gray.300' };
                    Object(react__WEBPACK_IMPORTED_MODULE_9__["useEffect"])(function() { if (collapsed) { setIndexSel(null); return; } setIndexSel(index);
                        window.addEventListener('keyup', upHandler);
                        window.addEventListener('keydown', downHandler);
                        document.addEventListener('mousedown', handleClickOutside); return function() { window.removeEventListener('keydown', downHandler);
                            window.removeEventListener('keyup', upHandler);
                            document.removeEventListener('mousedown', handleClickOutside); }; }, [collapsed]);
                    var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(false),
                        _useState8 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(_useState7, 2),
                        shiftHeld = _useState8[0],
                        setShiftHeld = _useState8[1];
                    var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(false),
                        _useState10 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(_useState9, 2),
                        altHeld = _useState10[0],
                        setAltHeld = _useState10[1];
                    var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(false),
                        _useState12 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(_useState11, 2),
                        controlHeld = _useState12[0],
                        setControlHeld = _useState12[1];
                    var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(false),
                        _useState14 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(_useState13, 2),
                        commandHeld = _useState14[0],
                        setCommandHeld = _useState14[1];
                    var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(false),
                        _useState16 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(_useState15, 2),
                        letterHeld = _useState16[0],
                        setLetterHeld = _useState16[1];
                    var searchInput = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(null);
                    var boxRef = Object(react__WEBPACK_IMPORTED_MODULE_9__["useRef"])(null);
                    var recordShortcut = function recordShortcut() {
                        setInputValue('');
                        setLocalStorage('');
                        setCollapsed(false);
                        setInvalidText(''); //searchInput.current.focus();
                    };
                    var turnOffKeyRecording = function turnOffKeyRecording() {
                        setCollapsed(true);
                        setShiftHeld(false);
                        setAltHeld(false);
                        setCommandHeld(false);
                        setControlHeld(false);
                        setLetterHeld(false);
                        setInvalidText(''); //searchInput.current.blur();
                    };

                    function handleClickOutside(event) { if (boxRef.current && !boxRef.current.contains(event.target)) { setCollapsed(true); } }
                    var isLetter = function isLetter(str) { return str.length === 1 && str.match(/[a-z]/i); };
                    var invalidTextDefault = 'Include Shift, alt, ctrl or cmd';
                    if (isUsingMac) { invalidTextDefault = 'Include ⇧, ⌥, Ctrl or ⌘'; }
                    var invalidMissingLetter = 'Include a letter';
                    var downHandler = function downHandler(keyEvent) { var invalidMissingLetter = 'Include a letter'; var keyValue; if (keyEvent.code.includes('Key')) { keyValue = keyEvent.code.replace('Key', ''); } else { keyValue = keyEvent.key; } if (keyValue === 'Shift') { setShiftHeld('shift');
                            setInvalidText(invalidMissingLetter); } if (keyValue === 'Alt') { setAltHeld('alt');
                            setInvalidText(invalidMissingLetter); } if (keyValue === 'Meta') { setCommandHeld('cmd');
                            setInvalidText(invalidMissingLetter); } if (keyValue === 'Control') { setControlHeld('ctrl');
                            setInvalidText(invalidMissingLetter); } if (isLetter(keyValue)) { setLetterHeld(keyValue);
                            setInvalidText(invalidTextDefault); } if (keyValue === 'Escape') { turnOffKeyRecording(); } };
                    var upHandler = function upHandler(keyEvent) { if (altHeld || shiftHeld || commandHeld || controlHeld) { setInvalidText(invalidMissingLetter); } else { setInvalidText(invalidTextDefault); } var keyValue; if (keyEvent.code.includes('Key')) { keyValue = keyEvent.code.replace('Key', ''); } else { keyValue = keyEvent.key; } if (keyValue === 'Shift') { setShiftHeld(false); } if (keyValue === 'Alt') { setAltHeld(false); } if (keyValue === 'Meta') { setCommandHeld(false); } if (keyValue === 'Control') { setControlHeld(false); } if (isLetter(keyValue)) { setLetterHeld(false); } };
                    if ((altHeld || shiftHeld || commandHeld || controlHeld) && letterHeld) { setInvalidText(''); var hotkeyTextArray = []; if (altHeld) { hotkeyTextArray.push(altHeld); } if (shiftHeld) { hotkeyTextArray.push(shiftHeld); } if (commandHeld) { hotkeyTextArray.push(commandHeld); } if (controlHeld) { hotkeyTextArray.push(controlHeld); } hotkeyTextArray.push(letterHeld.toLowerCase()); var localStorageString = hotkeyTextArray.join('+');
                        setInputValue(formatLocalStorageValue(localStorageString, isUsingMac));
                        setLocalStorage(localStorageString);
                        turnOffKeyRecording(); }
                    return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_2__[ /* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[ /* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], {
                        display: "flex",
                        alignItems: "center",
                        role: "group",
                        cursor: "pointer",
                        w: "278px",
                        bg: bgColor[colorMode],
                        pr: "0px",
                        pl: "16px",
                        ref: boxRef,
                        opacity: indexSel !== index && indexSel !== null ? '0.6' : '1',
                        style: { filter: indexSel !== index && indexSel !== null ? 'grayscale(0.75)' : 'none' } //borderWidth="2px"
                        ,
                        borderRadius: "5px" //borderColor={collapsed ? 'black.300' : 'blue.300'}
                            ,
                        boxShadow: collapsed ? 'none' : '0px 0px 0px 2px #4299E1',
                        onClick: function onClick() { if (collapsed) { recordShortcut(); } else { turnOffKeyRecording(); } }
                    }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[ /* default */ "a"], { my: "auto", w: "100%" }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { as: "p", my: "auto", mr: "auto", letterSpacing: "0.42px", fontSize: "14px", color: collapsed ? iconColor[colorMode] : subTitle[colorMode], _groupHover: { color: collapsed ? hoverText[colorMode] : iconColor[colorMode] } }, collapsed ? inputValue ? inputValue : formatLocalStorageValue(defaultValue, isUsingMac) : 'Type shortcut'), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { as: "button", borderRadius: "lg", outline: "none", my: "auto", width: "70px", height: "44px", roundedRight: "4px", roundedLeft: "0px", fontSize: "14px", color: "#FFF", fontWeight: "600", transition: "all 0.12s cubic-bezier(.374,.019,.035,1.861)", backgroundImage: 'linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)', _hover: { backgroundImage: 'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)', boxShadow: '0 10px 16px -8px rgba(49, 144, 255,0.5)' }, boxShadow: '0 12px 18px -10px rgba(49, 144, 255,0.35)' }, collapsed ? react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { name: "editPen", color: "#FFF" }) : 'done'))), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[ /* default */ "a"], { zIndex: "500000", label: "Reset to default", rounded: "4px", py: "1px", px: "8px" }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[ /* default */ "a"], { my: "auto", mr: "auto", ml: "12px", padding: "22px", transition: "0s", color: iconSmall[colorMode], icon: "refreshIcon", onClick: function onClick() { setLocalStorage(defaultValue);
                            setInputValue(formatLocalStorageValue(defaultValue, isUsingMac)); } }))), !collapsed && react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[ /* default */ "a"], { mt: "4px", ml: "auto", letterSpacing: "0.30px", fontSize: "12px", color: "red.600" }, invalidText));
                }; /* harmony default export */
                __webpack_exports__["a"] = (ShortcutRecorder);

                /***/
            }),

        /***/
        240:
            /***/
            (function(module, exports, __webpack_require__) {

                module.exports = __webpack_require__.p + "static/media/EmptyState_Search.ac97dfe1.png";

                /***/
            }),

        /***/
        241:
            /***/
            (function(module, exports, __webpack_require__) {

                module.exports = __webpack_require__.p + "static/media/EmptyState_SearchDark.c036f665.png";

                /***/
            }),

        /***/
        263:
            /***/
            (function(module, __webpack_exports__, __webpack_require__) {

                "use strict";
                __webpack_require__.r(__webpack_exports__);

                // EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
                var toConsumableArray = __webpack_require__(7);

                // EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
                var regenerator = __webpack_require__(14);
                var regenerator_default = /*#__PURE__*/ __webpack_require__.n(regenerator);

                // EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
                var asyncToGenerator = __webpack_require__(25);

                // EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
                var slicedToArray = __webpack_require__(3);

                // EXTERNAL MODULE: ./node_modules/react/index.js
                var react = __webpack_require__(0);
                var react_default = /*#__PURE__*/ __webpack_require__.n(react);

                // CONCATENATED MODULE: ./node_modules/react-infinite-scroll-component/dist/index.es.js

                /*! *****************************************************************************
                Copyright (c) Microsoft Corporation. All rights reserved.
                Licensed under the Apache License, Version 2.0 (the "License"); you may not use
                this file except in compliance with the License. You may obtain a copy of the
                License at http://www.apache.org/licenses/LICENSE-2.0

                THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
                KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
                WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
                MERCHANTABLITY OR NON-INFRINGEMENT.

                See the Apache Version 2.0 License for specific language governing permissions
                and limitations under the License.
                ***************************************************************************** */

                /* global Reflect, Promise */

                var _extendStatics = function extendStatics(d, b) {
                    _extendStatics = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(d, b) {
                        d.__proto__ = b;
                    } || function(d, b) {
                        for (var p in b) {
                            if (b.hasOwnProperty(p)) d[p] = b[p];
                        }
                    };

                    return _extendStatics(d, b);
                };

                function __extends(d, b) {
                    _extendStatics(d, b);

                    function __() {
                        this.constructor = d;
                    }

                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                }

                var _assign = function __assign() {
                    _assign = Object.assign || function __assign(t) {
                        for (var s, i = 1, n = arguments.length; i < n; i++) {
                            s = arguments[i];

                            for (var p in s) {
                                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                            }
                        }

                        return t;
                    };

                    return _assign.apply(this, arguments);
                };
                /* eslint-disable no-undefined,no-param-reassign,no-shadow */

                /**
                 * Throttle execution of a function. Especially useful for rate limiting
                 * execution of handlers on events like resize and scroll.
                 *
                 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
                 * @param  {Boolean}   [noTrailing]   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
                 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
                 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
                 *                                    the internal counter is reset)
                 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
                 *                                    to `callback` when the throttled-function is executed.
                 * @param  {Boolean}   [debounceMode] If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
                 *                                    schedule `callback` to execute after `delay` ms.
                 *
                 * @return {Function}  A new, throttled, function.
                 */


                function throttle(delay, noTrailing, callback, debounceMode) {
                    /*
                     * After wrapper has stopped being called, this timeout ensures that
                     * `callback` is executed at the proper times in `throttle` and `end`
                     * debounce modes.
                     */
                    var timeoutID;
                    var cancelled = false; // Keep track of the last time `callback` was executed.

                    var lastExec = 0; // Function to clear existing timeout

                    function clearExistingTimeout() {
                        if (timeoutID) {
                            clearTimeout(timeoutID);
                        }
                    } // Function to cancel next exec


                    function cancel() {
                        clearExistingTimeout();
                        cancelled = true;
                    } // `noTrailing` defaults to falsy.


                    if (typeof noTrailing !== 'boolean') {
                        debounceMode = callback;
                        callback = noTrailing;
                        noTrailing = undefined;
                    }
                    /*
                     * The `wrapper` function encapsulates all of the throttling / debouncing
                     * functionality and when executed will limit the rate at which `callback`
                     * is executed.
                     */


                    function wrapper() {
                        var self = this;
                        var elapsed = Date.now() - lastExec;
                        var args = arguments;

                        if (cancelled) {
                            return;
                        } // Execute `callback` and update the `lastExec` timestamp.


                        function exec() {
                            lastExec = Date.now();
                            callback.apply(self, args);
                        }
                        /*
                         * If `debounceMode` is true (at begin) this is used to clear the flag
                         * to allow future `callback` executions.
                         */


                        function clear() {
                            timeoutID = undefined;
                        }

                        if (debounceMode && !timeoutID) {
                            /*
                             * Since `wrapper` is being called for the first time and
                             * `debounceMode` is true (at begin), execute `callback`.
                             */
                            exec();
                        }

                        clearExistingTimeout();

                        if (debounceMode === undefined && elapsed > delay) {
                            /*
                             * In throttle mode, if `delay` time has been exceeded, execute
                             * `callback`.
                             */
                            exec();
                        } else if (noTrailing !== true) {
                            /*
                             * In trailing throttle mode, since `delay` time has not been
                             * exceeded, schedule `callback` to execute `delay` ms after most
                             * recent execution.
                             *
                             * If `debounceMode` is true (at begin), schedule `clear` to execute
                             * after `delay` ms.
                             *
                             * If `debounceMode` is false (at end), schedule `callback` to
                             * execute after `delay` ms.
                             */
                            timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
                        }
                    }

                    wrapper.cancel = cancel; // Return the wrapper function.

                    return wrapper;
                }

                var ThresholdUnits = {
                    Pixel: 'Pixel',
                    Percent: 'Percent'
                };
                var defaultThreshold = {
                    unit: ThresholdUnits.Percent,
                    value: 0.8
                };

                function parseThreshold(scrollThreshold) {
                    if (typeof scrollThreshold === 'number') {
                        return {
                            unit: ThresholdUnits.Percent,
                            value: scrollThreshold * 100
                        };
                    }

                    if (typeof scrollThreshold === 'string') {
                        if (scrollThreshold.match(/^(\d*(\.\d+)?)px$/)) {
                            return {
                                unit: ThresholdUnits.Pixel,
                                value: parseFloat(scrollThreshold)
                            };
                        }

                        if (scrollThreshold.match(/^(\d*(\.\d+)?)%$/)) {
                            return {
                                unit: ThresholdUnits.Percent,
                                value: parseFloat(scrollThreshold)
                            };
                        }

                        console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...');
                        return defaultThreshold;
                    }

                    console.warn('scrollThreshold should be string or number');
                    return defaultThreshold;
                }

                var index_es_InfiniteScroll =
                    /** @class */
                    function(_super) {
                        __extends(InfiniteScroll, _super);

                        function InfiniteScroll(props) {
                            var _this = _super.call(this, props) || this;

                            _this.lastScrollTop = 0;
                            _this.actionTriggered = false; // variables to keep track of pull down behaviour

                            _this.startY = 0;
                            _this.currentY = 0;
                            _this.dragging = false; // will be populated in componentDidMount
                            // based on the height of the pull down element

                            _this.maxPullDownDistance = 0;

                            _this.getScrollableTarget = function() {
                                if (_this.props.scrollableTarget instanceof HTMLElement) return _this.props.scrollableTarget;

                                if (typeof _this.props.scrollableTarget === 'string') {
                                    return document.getElementById(_this.props.scrollableTarget);
                                }

                                if (_this.props.scrollableTarget === null) {
                                    console.warn("You are trying to pass scrollableTarget but it is null. This might\n        happen because the element may not have been added to DOM yet.\n        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.\n      ");
                                }

                                return null;
                            };

                            _this.onStart = function(evt) {
                                if (_this.lastScrollTop) return;
                                _this.dragging = true;

                                if (evt instanceof MouseEvent) {
                                    _this.startY = evt.pageY;
                                } else if (evt instanceof TouchEvent) {
                                    _this.startY = evt.touches[0].pageY;
                                }

                                _this.currentY = _this.startY;

                                if (_this._infScroll) {
                                    _this._infScroll.style.willChange = 'transform';
                                    _this._infScroll.style.transition = "transform 0.2s cubic-bezier(0,0,0.31,1)";
                                }
                            };

                            _this.onMove = function(evt) {
                                if (!_this.dragging) return;

                                if (evt instanceof MouseEvent) {
                                    _this.currentY = evt.pageY;
                                } else if (evt instanceof TouchEvent) {
                                    _this.currentY = evt.touches[0].pageY;
                                } // user is scrolling down to up


                                if (_this.currentY < _this.startY) return;

                                if (_this.currentY - _this.startY >= Number(_this.props.pullDownToRefreshThreshold)) {
                                    _this.setState({
                                        pullToRefreshThresholdBreached: true
                                    });
                                } // so you can drag upto 1.5 times of the maxPullDownDistance


                                if (_this.currentY - _this.startY > _this.maxPullDownDistance * 1.5) return;

                                if (_this._infScroll) {
                                    _this._infScroll.style.overflow = 'visible';
                                    _this._infScroll.style.transform = "translate3d(0px, " + (_this.currentY - _this.startY) + "px, 0px)";
                                }
                            };

                            _this.onEnd = function() {
                                _this.startY = 0;
                                _this.currentY = 0;
                                _this.dragging = false;

                                if (_this.state.pullToRefreshThresholdBreached) {
                                    _this.props.refreshFunction && _this.props.refreshFunction();

                                    _this.setState({
                                        pullToRefreshThresholdBreached: false
                                    });
                                }

                                requestAnimationFrame(function() {
                                    // this._infScroll
                                    if (_this._infScroll) {
                                        _this._infScroll.style.overflow = 'auto';
                                        _this._infScroll.style.transform = 'none';
                                        _this._infScroll.style.willChange = 'none';
                                    }
                                });
                            };

                            _this.onScrollListener = function(event) {
                                if (typeof _this.props.onScroll === 'function') {
                                    // Execute this callback in next tick so that it does not affect the
                                    // functionality of the library.
                                    setTimeout(function() {
                                        return _this.props.onScroll && _this.props.onScroll(event);
                                    }, 0);
                                }

                                var target = _this.props.height || _this._scrollableNode ? event.target : document.documentElement.scrollTop ? document.documentElement : document.body; // return immediately if the action has already been triggered,
                                // prevents multiple triggers.

                                if (_this.actionTriggered) return;
                                var atBottom = _this.props.inverse ? _this.isElementAtTop(target, _this.props.scrollThreshold) : _this.isElementAtBottom(target, _this.props.scrollThreshold); // call the `next` function in the props to trigger the next data fetch

                                if (atBottom && _this.props.hasMore) {
                                    _this.actionTriggered = true;

                                    _this.setState({
                                        showLoader: true
                                    });

                                    _this.props.next && _this.props.next();
                                }

                                _this.lastScrollTop = target.scrollTop;
                            };

                            _this.state = {
                                showLoader: false,
                                pullToRefreshThresholdBreached: false
                            };
                            _this.throttledOnScrollListener = throttle(150, _this.onScrollListener).bind(_this);
                            _this.onStart = _this.onStart.bind(_this);
                            _this.onMove = _this.onMove.bind(_this);
                            _this.onEnd = _this.onEnd.bind(_this);
                            return _this;
                        }

                        InfiniteScroll.prototype.componentDidMount = function() {
                            if (typeof this.props.dataLength === 'undefined') {
                                throw new Error("mandatory prop \"dataLength\" is missing. The prop is needed" + " when loading more content. Check README.md for usage");
                            }

                            this._scrollableNode = this.getScrollableTarget();
                            this.el = this.props.height ? this._infScroll : this._scrollableNode || window;

                            if (this.el) {
                                this.el.addEventListener('scroll', this.throttledOnScrollListener);
                            }

                            if (typeof this.props.initialScrollY === 'number' && this.el && this.el instanceof HTMLElement && this.el.scrollHeight > this.props.initialScrollY) {
                                this.el.scrollTo(0, this.props.initialScrollY);
                            }

                            if (this.props.pullDownToRefresh && this.el) {
                                this.el.addEventListener('touchstart', this.onStart);
                                this.el.addEventListener('touchmove', this.onMove);
                                this.el.addEventListener('touchend', this.onEnd);
                                this.el.addEventListener('mousedown', this.onStart);
                                this.el.addEventListener('mousemove', this.onMove);
                                this.el.addEventListener('mouseup', this.onEnd); // get BCR of pullDown element to position it above

                                this.maxPullDownDistance = this._pullDown && this._pullDown.firstChild && this._pullDown.firstChild.getBoundingClientRect().height || 0;
                                this.forceUpdate();

                                if (typeof this.props.refreshFunction !== 'function') {
                                    throw new Error("Mandatory prop \"refreshFunction\" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage'");
                                }
                            }
                        };

                        InfiniteScroll.prototype.componentWillUnmount = function() {
                            if (this.el) {
                                this.el.removeEventListener('scroll', this.throttledOnScrollListener);

                                if (this.props.pullDownToRefresh) {
                                    this.el.removeEventListener('touchstart', this.onStart);
                                    this.el.removeEventListener('touchmove', this.onMove);
                                    this.el.removeEventListener('touchend', this.onEnd);
                                    this.el.removeEventListener('mousedown', this.onStart);
                                    this.el.removeEventListener('mousemove', this.onMove);
                                    this.el.removeEventListener('mouseup', this.onEnd);
                                }
                            }
                        };

                        InfiniteScroll.prototype.UNSAFE_componentWillReceiveProps = function(props) {
                            // do nothing when dataLength is unchanged
                            if (this.props.dataLength === props.dataLength) return;
                            this.actionTriggered = false; // update state when new data was sent in

                            this.setState({
                                showLoader: false
                            });
                        };

                        InfiniteScroll.prototype.isElementAtTop = function(target, scrollThreshold) {
                            if (scrollThreshold === void 0) {
                                scrollThreshold = 0.8;
                            }

                            var clientHeight = target === document.body || target === document.documentElement ? window.screen.availHeight : target.clientHeight;
                            var threshold = parseThreshold(scrollThreshold);

                            if (threshold.unit === ThresholdUnits.Pixel) {
                                return target.scrollTop <= threshold.value + clientHeight - target.scrollHeight + 1 || target.scrollTop === 0;
                            }

                            return target.scrollTop <= threshold.value / 100 + clientHeight - target.scrollHeight + 1 || target.scrollTop === 0;
                        };

                        InfiniteScroll.prototype.isElementAtBottom = function(target, scrollThreshold) {
                            if (scrollThreshold === void 0) {
                                scrollThreshold = 0.8;
                            }

                            var clientHeight = target === document.body || target === document.documentElement ? window.screen.availHeight : target.clientHeight;
                            var threshold = parseThreshold(scrollThreshold);

                            if (threshold.unit === ThresholdUnits.Pixel) {
                                return target.scrollTop + clientHeight >= target.scrollHeight - threshold.value;
                            }

                            return target.scrollTop + clientHeight >= threshold.value / 100 * target.scrollHeight;
                        };

                        InfiniteScroll.prototype.render = function() {
                            var _this = this;

                            var style = _assign({
                                height: this.props.height || 'auto',
                                overflow: 'auto',
                                WebkitOverflowScrolling: 'touch'
                            }, this.props.style);

                            var hasChildren = this.props.hasChildren || !!(this.props.children && this.props.children instanceof Array && this.props.children.length); // because heighted infiniteScroll visualy breaks
                            // on drag down as overflow becomes visible

                            var outerDivStyle = this.props.pullDownToRefresh && this.props.height ? {
                                overflow: 'auto'
                            } : {};
                            return react_default.a.createElement("div", {
                                style: outerDivStyle,
                                className: "infinite-scroll-component__outerdiv"
                            }, react_default.a.createElement("div", {
                                className: "infinite-scroll-component " + (this.props.className || ''),
                                ref: function ref(infScroll) {
                                    return _this._infScroll = infScroll;
                                },
                                style: style
                            }, this.props.pullDownToRefresh && react_default.a.createElement("div", {
                                style: {
                                    position: 'relative'
                                },
                                ref: function ref(pullDown) {
                                    return _this._pullDown = pullDown;
                                }
                            }, react_default.a.createElement("div", {
                                style: {
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: -1 * this.maxPullDownDistance
                                }
                            }, this.state.pullToRefreshThresholdBreached ? this.props.releaseToRefreshContent : this.props.pullDownToRefreshContent)), this.props.children, !this.state.showLoader && !hasChildren && this.props.hasMore && this.props.loader, this.state.showLoader && this.props.hasMore && this.props.loader, !this.props.hasMore && this.props.endMessage));
                        };

                        return InfiniteScroll;
                    }(react["Component"]);

                /* harmony default export */
                var index_es = (index_es_InfiniteScroll);
                // EXTERNAL MODULE: ./src/Utils/commentBg.js
                var commentBg = __webpack_require__(31);

                // EXTERNAL MODULE: ./src/Images/EmptyState_Search.png
                var EmptyState_Search = __webpack_require__(240);
                var EmptyState_Search_default = /*#__PURE__*/ __webpack_require__.n(EmptyState_Search);

                // EXTERNAL MODULE: ./src/Images/EmptyState_SearchDark.png
                var EmptyState_SearchDark = __webpack_require__(241);
                var EmptyState_SearchDark_default = /*#__PURE__*/ __webpack_require__.n(EmptyState_SearchDark);

                // EXTERNAL MODULE: ./src/fallBackSvg.svg
                var fallBackSvg = __webpack_require__(62);
                var fallBackSvg_default = /*#__PURE__*/ __webpack_require__.n(fallBackSvg);

                // EXTERNAL MODULE: ./src/fallBackSvgDark.svg
                var fallBackSvgDark = __webpack_require__(63);
                var fallBackSvgDark_default = /*#__PURE__*/ __webpack_require__.n(fallBackSvgDark);

                // EXTERNAL MODULE: ./node_modules/react-hotkeys-hook/dist-web/index.js + 1 modules
                var dist_web = __webpack_require__(53);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/ColorModeProvider/index.js
                var ColorModeProvider = __webpack_require__(18);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/PseudoBox/index.js
                var PseudoBox = __webpack_require__(21);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Flex/index.js
                var Flex = __webpack_require__(22);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Icon/index.js
                var Icon = __webpack_require__(20);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Text/index.js
                var Text = __webpack_require__(23);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Badge/index.js + 1 modules
                var Badge = __webpack_require__(234);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Box/index.js + 1 modules
                var Box = __webpack_require__(8);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Image/index.js
                var Image = __webpack_require__(167);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Tooltip/index.js
                var Tooltip = __webpack_require__(165);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/IconButton/index.js
                var IconButton = __webpack_require__(217);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Spinner/index.js
                var Spinner = __webpack_require__(98);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Grid/index.js
                var Grid = __webpack_require__(148);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Button/index.js + 1 modules
                var Button = __webpack_require__(44);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Modal/index.js + 2 modules
                var Modal = __webpack_require__(43);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/InputGroup/index.js
                var InputGroup = __webpack_require__(216);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/InputElement/index.js
                var InputElement = __webpack_require__(95);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Input/index.js + 1 modules
                var Input = __webpack_require__(102);

                // EXTERNAL MODULE: ./src/stores/store.js + 4 modules
                var store = __webpack_require__(1);

                // EXTERNAL MODULE: ./node_modules/zustand/index.js
                var zustand = __webpack_require__(64);

                // CONCATENATED MODULE: ./src/stores/searchStore.js
                /* global chrome */ //findLocation ->
                //const tabIsSaved = tabs?.find((tab) =>
                //tab.tabs.some((item) => item.url === url)
                //);
                //    const tabInCategorie = tabIsSaved
                //? categories.find((cat) => cat.id === tabIsSaved.categoryID)
                //: false;
                var useSearchStore = Object(zustand["a" /* default */ ])(function(set, get) { return { allWSData: [], setAllWSData: function setAllWSData(value) { return set(function(state) { return { allWSData: value }; }); }, allGroups: [], setAllGroups: function setAllGroups(value) { return set(function(state) { return { allGroups: value }; }); }, searchModalOpen: false, closeSearchModal: function closeSearchModal() { return set(function() { return { searchModalOpen: false }; }); }, openSearchModal: function openSearchModal() { return set(function() { return { searchModalOpen: true }; }); }, hideSearchModal: false, setHideSearchModal: function setHideSearchModal(value) { return set(function(state) { return { hideSearchModal: value }; }); } }; }); /* harmony default export */
                var searchStore = (useSearchStore);
                // EXTERNAL MODULE: ./src/stores/persistStore.js
                var persistStore = __webpack_require__(32);

                // EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
                var objectSpread2 = __webpack_require__(38);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Alert/index.js + 1 modules
                var Alert = __webpack_require__(70);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Link/index.js
                var Link = __webpack_require__(103);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/CircularProgress/index.js
                var CircularProgress = __webpack_require__(218);

                // EXTERNAL MODULE: ./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js + 30 modules
                var react_beautiful_dnd_esm = __webpack_require__(30);

                // EXTERNAL MODULE: ./src/Components/workspaceModal.js
                var workspaceModal = __webpack_require__(114);

                // EXTERNAL MODULE: ./node_modules/@chakra-ui/portal/dist/esm/portal.js
                var portal = __webpack_require__(228);

                // EXTERNAL MODULE: ./src/stores/dndStore.js
                var dndStore = __webpack_require__(11);

                // EXTERNAL MODULE: ./node_modules/framer-motion/dist/framer-motion.es.js + 6 modules
                var framer_motion_es = __webpack_require__(27);

                // CONCATENATED MODULE: ./src/Utils/useKeyPress.js
                /* function useKeyPress(targetKey) {
                    // State for keeping track of whether key is pressed
                    const [keyPressed, setKeyPressed] = useState(false);

                    // If pressed key is our target key then set to true
                    function downHandler(e) {
                        // e.stopPropagation();
                        // e.stopImmediatePropagation();
                        const { key } = e;
                        if (key === targetKey) {
                            //console.log('DOWN HANDLER EXECUTED', key, targetKey);
                            setKeyPressed(true);
                        }
                    }
                    // If released key is our target key then set to false
                    const upHandler = (e) => {
                        // e.stopPropagation();
                        // e.stopImmediatePropagation();
                        const { key } = e;
                        if (key === targetKey) {
                            //console.log('UP HANDLER EXECUTED', key, targetKey);
                            setKeyPressed(false);
                        }
                    };

                    // Add event listeners
                    useEffect(() => {
                        //console.log('useKeyPress called', targetKey);
                        window.addEventListener('keydown', downHandler);
                        window.addEventListener('keyup', upHandler);
                        // Remove event listeners on cleanup
                        return () => {
                            window.removeEventListener('keydown', downHandler);
                            window.removeEventListener('keyup', upHandler);
                        };
                    }, []); // Empty array ensures that effect is only run on mount and unmount
                    return keyPressed;
                } */
                var useKeyPress_useKeyPress = function useKeyPress(targetKey, fn) {
                    function downHandler(_ref) { var key = _ref.key; if (key === targetKey) { fn(); } } Object(react["useEffect"])(function() { window.addEventListener('keydown', downHandler); return function() { window.removeEventListener('keydown', downHandler); }; }, []); }; /* harmony default export */
                var Utils_useKeyPress = (useKeyPress_useKeyPress);
                // CONCATENATED MODULE: ./src/Components/miniSpace.js
                var miniSpace_MiniSpace = function MiniSpace(_ref) {
                    var groupsToShow = _ref.groupsToShow,
                        catId = _ref.catId,
                        isShared = _ref.isShared,
                        isMarked = _ref.isMarked,
                        isChosen = _ref.isChosen;
                    var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                        colorMode = _useColorMode.colorMode,
                        toggleColorMode = _useColorMode.toggleColorMode;
                    var title = { light: '#1A202C', dark: '#FFF' };
                    var miniSpaceBg = { light: '#FFF', dark: '#35393c' };
                    var globeMarked = { light: '#3391FF', dark: '#FFFFFF60' };
                    var globeChosen = { light: '#9ECDFE', dark: '#FFFFFF60' };
                    var miniSpaceShadows = { light: '0 4px 6px -2px rgba(165,182,185,0.36), 0 2px 8px -1px rgba(171,174,181,0.18)', dark: '0 40px 40px -30px rgba(0,0,0,0.50), 0 8px 16px -4px rgba(0,0,0,0.30)' };
                    var emptyStateText = { light: 'gray.600', dark: '#A1A2A4' };
                    var iconColor = { light: 'gray.500', dark: '#FFFFFF60' };
                    var groupsLength = groupsToShow.filter(function(cat) { return cat.categoryID === catId; }).length;
                    var categoriesToShow = Object(toConsumableArray["a" /* default */ ])(Array(groupsLength));
                    var threeCats = Object(toConsumableArray["a" /* default */ ])(Array(3));
                    var spaceW = '18px';
                    var spaceH = '28px';
                    return react_default.a.createElement(react_default.a.Fragment, null, isShared ? react_default.a.createElement(Icon["a" /* default */ ], { name: "globeIcon", m: "auto", ml: "8px", size: "22px", mt: "6px", color: isMarked ? globeMarked[colorMode] : isChosen ? globeChosen[colorMode] : iconColor[colorMode] }) : groupsLength > 0 && groupsLength < 5 ? categoriesToShow.map(function(group, index) {
                        return react_default.a.createElement(Flex["a" /* default */ ], {
                            key: index //alignItems="center"
                                ,
                            h: spaceH,
                            w: spaceW //px="4px"
                                //overflow="hidden"
                                ,
                            bg: miniSpaceBg[colorMode],
                            boxShadow: miniSpaceShadows[colorMode],
                            rounded: "4px",
                            ml: "6px"
                        });
                    }) : groupsLength > 4 ? react_default.a.createElement(react_default.a.Fragment, null, threeCats.map(function(group, index) {
                        return react_default.a.createElement(Flex["a" /* default */ ], {
                            key: index //alignItems="center"
                                ,
                            h: spaceH,
                            w: spaceW //px="4px"
                                //overflow="hidden"
                                ,
                            bg: miniSpaceBg[colorMode],
                            boxShadow: miniSpaceShadows[colorMode],
                            rounded: "4px",
                            ml: "6px"
                        });
                    }), react_default.a.createElement(Flex["a" /* default */ ] //alignItems="center"
                        , {
                            h: spaceH,
                            w: spaceW //px="4px"
                                //overflow="hidden"
                                ,
                            bg: miniSpaceBg[colorMode],
                            boxShadow: miniSpaceShadows[colorMode],
                            rounded: "4px",
                            ml: "6px"
                        }, react_default.a.createElement(Text["a" /* default */ ], { m: "auto", color: title[colorMode], fontSize: "11px", fontWeight: "600", opacity: "0.6" }, "+", groupsLength - 4))) : react_default.a.createElement(Text["a" /* default */ ], { color: emptyStateText[colorMode], fontWeight: "700", opacity: "0.75", fontSize: "8px", letterSpacing: "0.16px", m: "auto", ml: "8px" }, "EMPTY CATEGORY"));
                }; /* harmony default export */
                var miniSpace = (miniSpace_MiniSpace);
                /* {groupsLength > 0 && groupsLength < 5 ? (
                    groupsToShow
                        .filter((cat) => cat.categoryID === catId)
                        .map((group) => (
                            <Flex
                                //alignItems="center"
                                h="36px"
                                w="24px"
                                //px="4px"
                                //overflow="hidden"
                                bg={miniSpaceBg[colorMode]}
                                boxShadow={miniSpaceShadows[colorMode]}
                                rounded="4px"
                                ml="8px"
                            >
                             EMOJIS AND NAME IN HERE !!!
                            </Flex>
                        ))
                ) */
                // CONCATENATED MODULE: ./src/Components/workspacePicker.js
                /* global chrome */
                var setUserStateZu = function setUserStateZu(state) { return state.setUserState; };
                var correctCategoryLengthZu = function correctCategoryLengthZu(state) { return state.correctCategoryLength; };
                var categoryZu = function categoryZu(state) { return state.category; };
                var tabsZu = function tabsZu(state) { return state.tabs; };
                var categoriesZu = function categoriesZu(state) { return state.categories; };
                var userStateZu = function userStateZu(state) { return state.userState; };
                var currentWSidZu = function currentWSidZu(state) { return state.currentWSid; };
                var saveWSinfoZu = function saveWSinfoZu(state) { return state.saveWSinfo; };
                var deleteWSZu = function deleteWSZu(state) { return state.deleteWS; };
                var setCategoryZu = function setCategoryZu(state) { return state.setCategorySelected; };
                var isLoadingUserZu = function isLoadingUserZu(state) { return state.isLoadingUser; };
                var setIsLoadingUserZu = function setIsLoadingUserZu(state) { return state.setIsLoadingUser; };
                var setIsLoadingCategoriesZu = function setIsLoadingCategoriesZu(state) { return state.setIsLoadingCategories; };
                var denyInviteZu = function denyInviteZu(state) { return state.denyInvite; };
                var changeWorkspaceZu = function changeWorkspaceZu(state) { return state.changeWorkspace; };
                var setWorkspaceMenuOpenZu = function setWorkspaceMenuOpenZu(state) { return state.setWorkspaceMenuOpen; };
                var setBlockHoverSideZu = function setBlockHoverSideZu(state) { return state.setBlockHoverSide; };
                var allWSDataZu = function allWSDataZu(state) { return state.allWSData; };
                var closeSearchModalZu = function closeSearchModalZu(state) { return state.closeSearchModal; };
                var changeWorkspaceToZu = function changeWorkspaceToZu(state) { return state.changeWorkspaceTo; };
                var setHideSearchModalZu = function setHideSearchModalZu(state) { return state.setHideSearchModal; };
                var setAllWSDataZu = function setAllWSDataZu(state) { return state.setAllWSData; };
                var workspacePicker_InvitedRow = function InvitedRow(_ref) {
                    var index = _ref.index,
                        userName = _ref.userName,
                        name = _ref.name,
                        id = _ref.id,
                        catLength = _ref.catLength,
                        emoji = _ref.emoji,
                        from = _ref.from,
                        provided = _ref.provided,
                        snapshot = _ref.snapshot,
                        setIsLoadingUser = _ref.setIsLoadingUser,
                        workspaces = _ref.workspaces,
                        email = _ref.email,
                        data = _ref.data,
                        deny = _ref.deny,
                        setAllWSloaded = _ref.setAllWSloaded; //zuState
                    var userState = Object(store["a" /* default */ ])(userStateZu);
                    var setAllWSData = searchStore(setAllWSDataZu); //Colorstuff
                    var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                        colorMode = _useColorMode.colorMode,
                        toggleColorMode = _useColorMode.toggleColorMode;
                    var color = { light: '#FFF', dark: '#262A2D' };
                    var title = { light: '#1A202C', dark: '#FFF' };
                    var boxes = { light: 'gray.200', dark: '#32363A' };
                    var iconDarkerColor = { light: 'gray.600', dark: '#A1A2A4' };
                    var listBG = { light: '#f6f7f9', dark: '#202326' };
                    var redBG = { light: 'rgb(255 218 218)', dark: 'gray.200' };
                    var linkColor = { light: 'blue.500', dark: 'blue.400' };
                    var alertBg = { light: 'blue.100', dark: 'gray.700' };
                    var join = function join(id) { setIsLoadingUser(true); if (userState.workspaces !== undefined) { var newWorkspaces = userState.workspaces; var _index = newWorkspaces.findIndex(function(target) { return target.id === id; });
                            newWorkspaces[_index].inviteAccepted = true; var docRef = newWorkspaces[_index].sharedRef;
                            /* let userIndex = workspaces[index].roles.findIndex(
                                    (key) => key.email === email
                                  );
                                  workspaces[index].roles[userIndex].name = userName;
                                  workspaces[index].roles[userIndex].status = "collaborator"; */
                            chrome.runtime.sendMessage({ msg: 'joinWorkspace', ws: newWorkspaces, docRef: docRef, email: email, name: userName }, function(resp) {}); } else { console.log('Workspaces undefined'); } };
                    var denyInvite = function denyInvite() { setAllWSloaded(false);
                        setAllWSData([]);
                        deny(id); };
                    var isOnProPlan = userState.stripeSubscriptionStatus === 'active' ? false : true;
                    return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(PseudoBox["a" /* default */ ], Object.assign({ bg: listBG[colorMode], key: id, cursor: "pointer", role: "group", px: "8px", py: "4px", zIndex: "1", overflow: "visible"
                            /* _hover={{
                                      boxShadow: hoverShadow[colorMode],
                                      zIndex: "2",
                                    }} */
                            , transition: "0.18s cubic-bezier(0.22,0.61,0.36,1)", position: "relative", ref: provided.innerRef }, provided.droppableProps), react_default.a.createElement(Tooltip["a" /* default */ ], { showDelay: "150", rounded: "4px", label: react_default.a.createElement(Box["a" /* default */ ], { p: "2px", rounded: "4px" }, react_default.a.createElement(Text["a" /* default */ ], { fontWeight: "500", fontSize: "13px", w: "100%", textAlign: "center" }, "Invited by:"), react_default.a.createElement(Text["a" /* default */ ], { fontWeight: "500", fontSize: "15px", w: "100%", textAlign: "center" }, from)), placement: "top", zIndex: "50000" }, react_default.a.createElement(PseudoBox["a" /* default */ ], { display: "flex", h: "58px", maxH: "58", alignItems: "center", _hover: { filter: 'blur(2px)' }, transition: "0.25s" }, react_default.a.createElement(Flex["a" /* default */ ], { position: "relative", h: "24px", w: "24px", ml: "16px" }, (emoji === null || emoji === void 0 ? void 0 : emoji.length) > 10 ? react_default.a.createElement(Image["a" /* default */ ], { src: emoji, boxSize: "24px", maxH: "24px", maxW: "24px", mt: "3px", overflow: "hidden", rounded: "4px" }) : react_default.a.createElement(Text["a" /* default */ ], {
                        fontSize: "20px",
                        position: "absolute",
                        left: "2px",
                        top: "0px" //style={{ filter: "blur(2px)" }}
                    }, emoji)), react_default.a.createElement(Text["a" /* default */ ], { ml: "12px", fontSize: "16px", fontWeight: "600", color: title[colorMode] }, name))), react_default.a.createElement(PseudoBox["a" /* default */ ], { ml: "4px", mr: "4px", position: "absolute", right: "2px", top: "24px", minWidth: "28px", height: "28px", alignItems: "center", transition: "0.25s cubic-bezier(.374,.019,.035,1.861)" }, react_default.a.createElement(Icon["a" /* default */ ], { m: "auto", name: "sharedIcon", color: iconDarkerColor[colorMode] })), react_default.a.createElement(Flex["a" /* default */ ], { pt: "4px", pb: "8px" }, react_default.a.createElement(Button["a" /* default */ ], { isDisabled: isOnProPlan, mr: "12px", ml: "16px", w: "55%", h: "36px", backgroundImage: "linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)", _hover: { backgroundImage: 'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)', boxShadow: '0 4px 10px -8px rgba(49, 144, 255,0.5)' }, boxShadow: "0 6px 12px -10px rgba(49, 144, 255,0.35)", rounded: "4px", transition: "all 0.4s cubic-bezier(.374,.019,.035,1.861)", color: "#FFF", fontSize: "14px", onClick: function onClick() { return join(id); } }, "Join workspace"), react_default.a.createElement(Button["a" /* default */ ], { mr: "16px", w: "45%", h: "36px", fontSize: "14px", rounded: "4px", transition: "0s", bg: redBG[colorMode], _hover: { bg: 'rgb(255 198 198)' }, color: "#d60a25", onClick: function onClick() { return denyInvite(); } }, "Deny invite")), isOnProPlan && index === 1 && react_default.a.createElement(Alert["a" /* Alert */ ], { status: "info", rounded: "4px", fontWeight: "500", display: "flex", my: "4px", mx: "16px", bg: alertBg[colorMode] }, react_default.a.createElement(Alert["c" /* AlertIcon */ ], null), react_default.a.createElement(Text["a" /* default */ ], { mr: "24px", color: title[colorMode] }, "Please", ' ', react_default.a.createElement(Link["a" /* default */ ], {
                        href: "https://www.tabextend.com/pricing",
                        target: "_blank",
                        rel: "noopener noreferrer" //color="blue.500"
                            ,
                        _hover: { textDecoration: 'underline' },
                        color: linkColor[colorMode]
                    }, "upgrade your plan"), ' ', "to join shared workspaces"))));
                };
                var workspacePicker_PortalAwareItem = function PortalAwareItem(_ref2) {
                    var provided = _ref2.provided,
                        snapshot = _ref2.snapshot,
                        changeWorkspace = _ref2.changeWorkspace,
                        name = _ref2.name,
                        id = _ref2.id,
                        emoji = _ref2.emoji,
                        catLength = _ref2.catLength,
                        currentWSid = _ref2.currentWSid,
                        setIsLoadingUser = _ref2.setIsLoadingUser,
                        shared = _ref2.shared,
                        sharedRef = _ref2.sharedRef,
                        isOwner = _ref2.isOwner,
                        deny = _ref2.deny,
                        isDeleted = _ref2.isDeleted,
                        selectedRow = _ref2.selectedRow,
                        setSelectedRow = _ref2.setSelectedRow,
                        index = _ref2.index,
                        categoryMarked = _ref2.categoryMarked,
                        setCategoryMarked = _ref2.setCategoryMarked,
                        markedCatRef = _ref2.markedCatRef,
                        selectedRowRef = _ref2.selectedRowRef;
                    var usePortal = snapshot.isDragging;
                    var child = react_default.a.createElement("div", Object.assign({ ref: provided.innerRef }, provided.droppableProps, provided.draggableProps, provided.dragHandleProps), react_default.a.createElement(workspacePicker_WorkspaceRow, { usePortal: usePortal, changeWorkspace: changeWorkspace, name: name, id: id, emoji: emoji, shared: shared, isOwner: isOwner, sharedRef: sharedRef, catLength: catLength, currentWSid: currentWSid, setIsLoadingUser: setIsLoadingUser, deny: deny, isDeleted: isDeleted, selectedRow: selectedRow, setSelectedRow: setSelectedRow, index: index, categoryMarked: categoryMarked, markedCatRef: markedCatRef, setCategoryMarked: setCategoryMarked, selectedRowRef: selectedRowRef })); // if dragging - put the item in a portal
                    if (!usePortal) { return child; } else { return react_default.a.createElement(portal["a" /* Portal */ ], null, child); }
                };
                var workspacePicker_WorkspaceRow = function WorkspaceRow(_ref3) {
                    var changeWorkspace = _ref3.changeWorkspace,
                        name = _ref3.name,
                        id = _ref3.id,
                        catLength = _ref3.catLength,
                        currentWSid = _ref3.currentWSid,
                        emoji = _ref3.emoji,
                        shared = _ref3.shared,
                        usePortal = _ref3.usePortal,
                        setIsLoadingUser = _ref3.setIsLoadingUser,
                        sharedRef = _ref3.sharedRef,
                        isOwner = _ref3.isOwner,
                        deny = _ref3.deny,
                        isDeleted = _ref3.isDeleted,
                        selectedRow = _ref3.selectedRow,
                        setSelectedRow = _ref3.setSelectedRow,
                        index = _ref3.index,
                        categoryMarked = _ref3.categoryMarked,
                        setCategoryMarked = _ref3.setCategoryMarked,
                        markedCatRef = _ref3.markedCatRef,
                        selectedRowRef = _ref3.selectedRowRef; //zuState
                    var saveWSinfo = Object(store["a" /* default */ ])(saveWSinfoZu);
                    var tabs = Object(store["a" /* default */ ])(tabsZu);
                    var categories = Object(store["a" /* default */ ])(categoriesZu);
                    var deleteWS = Object(store["a" /* default */ ])(deleteWSZu);
                    var setCategory = Object(store["a" /* default */ ])(setCategoryZu);
                    var correctCategoryLength = Object(store["a" /* default */ ])(correctCategoryLengthZu); //const setRolesData = useStore(setRolesDataZu);
                    //const roles = useStore(rolesZu);
                    var setWorkspaceMenuOpen = Object(store["a" /* default */ ])(setWorkspaceMenuOpenZu); //const setCurrentWSid = useStore(setCurrentWSidZu);
                    //const setBlockHoverSide = useDndStore(setBlockHoverSideZu);
                    var allWSData = searchStore(allWSDataZu);
                    var closeSearchModal = searchStore(closeSearchModalZu);
                    var setHideSearchModal = searchStore(setHideSearchModalZu);
                    /* const setIsLoadingCats = useStore(setIsLoadingCatsZu);
                        const setIsLoadingCategories = useStore(setIsLoadingCategoriesZu);
                        const setIsLoadingSpacesToShow = useStore(setIsLoadingSpacesToShowZu); */
                    var changeWorkspaceTo = Object(store["a" /* default */ ])(changeWorkspaceToZu);
                    var category = Object(store["a" /* default */ ])(categoryZu);
                    var _useState = Object(react["useState"])(false),
                        _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                        isLoading = _useState2[0],
                        setIsLoading = _useState2[1];
                    var _useState3 = Object(react["useState"])(true),
                        _useState4 = Object(slicedToArray["a" /* default */ ])(_useState3, 2),
                        loadingInnerData = _useState4[0],
                        setLoadingInner = _useState4[1];
                    var _useState5 = Object(react["useState"])(false),
                        _useState6 = Object(slicedToArray["a" /* default */ ])(_useState5, 2),
                        siteModalOpen = _useState6[0],
                        setSiteModalOpen = _useState6[1]; //Colorstuff
                    var _useColorMode2 = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                        colorMode = _useColorMode2.colorMode,
                        toggleColorMode = _useColorMode2.toggleColorMode;
                    var color = { light: '#FFF', dark: '#262A2D' };
                    var title = { light: '#1A202C', dark: '#FFF' };
                    var titleColor = { light: 'gray.700', dark: '#63656C' };
                    var titleActive = { light: 'gray.400', dark: '#FFFFFF80' };
                    var boxes = { light: 'gray.200', dark: '#32363A' };
                    var iconDarkerColor = { light: 'gray.600', dark: '#A1A2A4' };
                    var iconBG = { light: 'transparent', dark: '#32363A' };
                    var markedBG = { light: 'linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)', dark: 'linear-gradient(178deg, #52595D 0%, #40484F 100%)' };
                    var selectedBG = { light: 'linear-gradient(145deg, #9ECDFE 0%, #85BDFF 100%)', dark: 'linear-gradient(178deg, #979B9E80 0%, #8C919580 100%)' };
                    var hoverShadow = { light: '0 1px 10px 0px rgba(152,169,185,0.50)', dark: '0 0px 10px 0px rgba(0,0,0,0.60)' };
                    var selectedShadow = {
                        light: '0 8px 18px -10px rgba(49, 144, 255,0.54)', //dark: "0 12px 18px -10px rgba(0,0,0,0.60)",
                        dark: '0 6px 8px -4px rgba(3,4,5,0.40), inset 1px 1px 2px 0 rgba(154,160,164,0.40), inset -1px -1px 2px 0 #2A2F34'
                    };
                    var spacesBG = { light: 'gray.50', dark: '#1d1e21' };
                    var spinnerBg = { light: 'gray.200', dark: 'gray.600' };
                    /* const { value: hoverWS, on: hoverWSOn, off: hoverWSOff } = useBoolean(
                            false
                        ); */
                    function timeout(delay) { return new Promise(function(res) { return setTimeout(res, delay); }); }
                    var changeWorkSpaceInner = /*#__PURE__*/ function() { var _ref4 = Object(asyncToGenerator["a" /* default */ ])( /*#__PURE__*/ regenerator_default.a.mark(function _callee(idToChangeTo, catToChangeTo) { return regenerator_default.a.wrap(function _callee$(_context) { while (1) { switch (_context.prev = _context.next) {
                                        case 0:
                                            if (!(isDeleted === true)) { _context.next = 2; break; } return _context.abrupt("return");
                                        case 2:
                                            setIsLoading(true);
                                            setLoadingInner(true);
                                            changeWorkspaceTo(idToChangeTo, catToChangeTo);
                                            _context.next = 7; return timeout(400);
                                        case 7:
                                            setLoadingInner(false);
                                            setIsLoading(false);
                                            closeSearchModal();
                                            /* else if (currentWSid !== id) {
                                                        setIsLoadingCats(true);
                                                        setIsLoadingCategories(true);
                                                        setIsLoadingSpacesToShow(true);
                                                        setRolesData([]);
                                                        changeWorkspace(idToChangeTo, markedCatRef.current);
                                                        setIsLoading(true);
                                                        await timeout(360);
                                                        setCurrentWSid(idToChangeTo);
                                                        setIsLoading(false);
                                                        setBlockHoverSide(false);
                                                        closeSearchModal();
                                                        //await timeout(360);
                                                        //setWorkspaceMenuOpen(false);
                                                    } else return; */
                                        case 10:
                                        case "end":
                                            return _context.stop(); } } }, _callee); })); return function changeWorkSpaceInner(_x, _x2) { return _ref4.apply(this, arguments); }; }();
                    var changeCategorySameRow = function changeCategorySameRow(e, index) {
                        e.stopPropagation();
                        setCategoryMarked(index);
                        changeWorkSpaceInner(id, index); //setCategory(index);
                        //closeSearchModal();
                    };
                    Utils_useKeyPress('Enter', function() {
                        if (selectedRowRef.current === index) { //<- raden är markted
                            if (currentWSid === id) { setCategory(markedCatRef.current);
                                closeSearchModal(); } else { changeWorkSpaceInner(id, markedCatRef.current); }
                        } else return;
                    });
                    Object(react["useEffect"])(function() { if (currentWSid === id) { setIsLoading(false); } else return; }, [currentWSid, id]);
                    var openModalClick = function openModalClick(e) {
                        e.stopPropagation();
                        setHideSearchModal(true);
                        setSiteModalOpen(true); //closeSearchModal();
                    };
                    var closeSiteModal = function closeSiteModal() { setSiteModalOpen(false);
                        setWorkspaceMenuOpen(false);
                        setHideSearchModal(false);
                        closeSearchModal(); };
                    var saveWSchanges = function saveWSchanges(id, newName, emoji, withLoading) { withLoading && setIsLoadingUser(true);
                        saveWSinfo(id, newName, emoji);
                        withLoading && closeSiteModal(); };
                    var deleteCurrentWS = function deleteCurrentWS(id, isOwner, isShared) { closeSiteModal(); if (isOwner === true) { deleteWS(id, isShared); } else { deny(id); } };
                    var MotionBox = framer_motion_es["c" /* motion */ ].custom(PseudoBox["a" /* default */ ]);
                    /* useEffect(() => {
                            selectedRow === index && console.log('Rerender:: ', selectedRow);
                        }); */ //let currentData =
                    var categoriesToShow = Object(toConsumableArray["a" /* default */ ])(Array(catLength));
                    var _useState7 = Object(react["useState"])([]),
                        _useState8 = Object(slicedToArray["a" /* default */ ])(_useState7, 2),
                        groupsToShow = _useState8[0],
                        setGroupsToShow = _useState8[1];
                    var _useState9 = Object(react["useState"])(categoriesToShow),
                        _useState10 = Object(slicedToArray["a" /* default */ ])(_useState9, 2),
                        catsToShow = _useState10[0],
                        setCatsToShow = _useState10[1];
                    var horizontalScrollRef = Object(react["useRef"])(null);
                    var doSideScroll = function doSideScroll(pix) { return horizontalScrollRef.current.scrollBy(pix, 0); };
                    Object(react["useEffect"])(function() { if (currentWSid === id) { setGroupsToShow(tabs);
                            setCatsToShow(categories);
                            setLoadingInner(false); if (catsToShow.length > 6 && category > 5) { var scrollBy = (category - 5) * 224;
                                doSideScroll(scrollBy); } else return; } else return; }, []);
                    Object(react["useEffect"])(function() { if (currentWSid === id) { return; } if (selectedRow === index && allWSData.length > 0 && allWSData) { var wsIndex = allWSData.findIndex(function(item) { return item.WSid === id; }); if (wsIndex > -1) { setGroupsToShow(allWSData[wsIndex].tabData);
                                setCatsToShow(allWSData[wsIndex].categories);
                                setLoadingInner(false); if (allWSData[wsIndex].categories.length !== catLength) { var newLength = allWSData[wsIndex].categories.length;
                                    correctCategoryLength(id, newLength); } } else return; } }, [selectedRow, allWSData]);
                    Object(react["useEffect"])(function() { if (selectedRow !== index || catsToShow.length < 6) { return; } else { var scrollBy = markedCatRef.current < 2 ? -300 : markedCatRef.current > 5 ? 300 : 0;
                            doSideScroll(scrollBy); } }, [markedCatRef.current]);
                    return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(PseudoBox["a" /* default */ ], {
                        opacity: isDeleted !== undefined ? 0.25 : 1,
                        bg: color[colorMode],
                        key: id,
                        onClick: function onClick() { return changeWorkSpaceInner(id, markedCatRef.current); },
                        onMouseEnter: function onMouseEnter() { return setSelectedRow(index); } //onMouseLeave={hoverWSOff}
                            ,
                        cursor: isDeleted !== undefined ? 'not-allowed' : 'pointer',
                        role: "group",
                        px: "8px",
                        py: "4px",
                        zIndex: selectedRow === index ? '2' : '1',
                        minHeight: "64px"
                            /* _hover={{
                                                boxShadow: hoverShadow[colorMode],
                                                zIndex: '2'
                                            }} */
                            ,
                        transition: "0.18s cubic-bezier(0.22,0.61,0.36,1)",
                        position: "relative",
                        boxShadow: selectedRow === index ? hoverShadow[colorMode] : usePortal ? hoverShadow[colorMode] : '',
                        rounded: usePortal ? '8px' : ''
                    }, react_default.a.createElement(Flex["a" /* default */ ], { py: "6px", alignItems: "center", overflow: "hidden", ref: horizontalScrollRef, className: colorMode === 'dark' ? selectedRow === index ? 'groupScrollAreaDarkHover' : 'groupScrollAreaDark' : selectedRow === index ? 'groupScrollAreaHover' : 'groupScrollArea' }, react_default.a.createElement(Box["a" /* default */ ], null, react_default.a.createElement(Flex["a" /* default */ ], { pt: "4px", pb: "8px", position: "absolute" }, react_default.a.createElement(Flex["a" /* default */ ], { position: "relative", w: "24px", ml: "16px" }, isLoading && react_default.a.createElement(CircularProgress["a" /* default */ ], {
                        transform: isLoading ? 'scale(1.5)' : '' //opacity={isLoading ? "1" : "0"}
                            ,
                        transition: "0.4s 0.5 linear",
                        fontSize: "24px",
                        thickness: "0.25",
                        isIndeterminate: true //trackColor={boxes[colorMode]}
                            ,
                        color: "blue",
                        position: "absolute",
                        left: "2px",
                        top: "4px",
                        willChange: "transform"
                    }), (emoji === null || emoji === void 0 ? void 0 : emoji.length) > 10 ? react_default.a.createElement(Image["a" /* default */ ], { src: emoji, boxSize: "24px", maxH: "24px", maxW: "24px", overflow: "hidden", rounded: "2px" }) : react_default.a.createElement(Text["a" /* default */ ], { fontSize: "20px", position: "absolute", left: "2px", top: "0px", transform: isLoading ? 'scale(0.5)' : 'scale(1)', willChange: "transform", transition: "0.35s cubic-bezier(.21,.36,.83,1.21)" }, emoji)), react_default.a.createElement(Text["a" /* default */ ], { mt: "2px", ml: "12px", fontSize: "16px", fontWeight: "600", color: currentWSid !== id ? titleActive[colorMode] : title[colorMode] }, name)), react_default.a.createElement(framer_motion_es["a" /* AnimatePresence */ ] //isCurrent -> show
                        , null, react_default.a.createElement(Flex["a" /* default */ ], { mt: "48px", ml: "16px", mb: "6px" }, catsToShow === null || catsToShow === void 0 ? void 0 : catsToShow.map(function(item, i) {
                            return react_default.a.createElement(MotionBox, {
                                key: i,
                                onClick: function onClick(e) { return changeCategorySameRow(e, i); },
                                onMouseEnter: function onMouseEnter() { return setCategoryMarked(i); },
                                minH: "16px",
                                minW: "108px",
                                maxW: "108px",
                                h: "auto"
                                    /* initial={{ scaleY: 1 }}
                                                                            animate={{
                                                                                scaleY: selectedRow === index && 2
                                                                            }}
                                                                            exit={{ scaleY: 1 }} */
                                    /* transition={{
                                                                               duration: 0.16,
                                                                               ease: [0.17, 0.67, 0.83, 0.67],
                                                                               //type: 'spring',
                                                                               duration: 2,
                                                                               delay: 0.04
                                                                           }} */
                                    ,
                                backgroundImage: categoryMarked === i && selectedRow === index ? markedBG[colorMode] : category === i && currentWSid === id ? selectedBG[colorMode] : '',
                                boxShadow: categoryMarked === i && selectedRow === index && selectedShadow[colorMode],
                                animate: { scale: categoryMarked === i && selectedRow === index && !usePortal ? 1.05 : 1 },
                                exit: { scale: 1 },
                                whileTap: { scale: 0.975, opacity: 0.4 },
                                bg: boxes[colorMode],
                                rounded: "4px",
                                mr: "10px",
                                p: "3px" //willChange="transform"
                            }, selectedRow === index && !usePortal && react_default.a.createElement(react_default.a.Fragment, null, !loadingInnerData ? react_default.a.createElement(Text["a" /* default */ ], {
                                ml: "6px",
                                mt: "4px",
                                fontWeight: "600",
                                isTruncated: true,
                                maxW: "100%" //willChange="transform"
                                    ,
                                color: categoryMarked === i && selectedRow === index || category === i && currentWSid === id ? '#FFF' : titleColor[colorMode]
                            }, (item === null || item === void 0 ? void 0 : item.shared) && react_default.a.createElement(Icon["a" /* default */ ], { name: "globeIcon", mr: "4px", mt: "-1px", size: "10px" }), (item === null || item === void 0 ? void 0 : item.name.length) > 0 ? item.name : 'Untitled') : react_default.a.createElement(Box["a" /* default */ ], { minH: "21px", w: "100%" }), react_default.a.createElement(MotionBox, { h: "auto", minH: "40px", w: "102px", mt: "4px", bg: spacesBG[colorMode], rounded: "2px", display: "flex", alignItems: "center", pr: "6px", py: "4px"
                                /* initial={{
                                                                                    scale: 0.5,
                                                                                    opacity: 0
                                                                                }}
                                                                                animate={{
                                                                                    scale:
                                                                                        selectedRow === index &&
                                                                                        1,
                                                                                    opacity: 1
                                                                                }}
                                                                                exit={{
                                                                                    scale: 0.5,
                                                                                    opacity: 0
                                                                                }} */
                                /* transition={{
                                                                                   delay: 0.02
                                                                               }} */
                            }, react_default.a.createElement(Flex["a" /* default */ ], { m: "auto", minH: "36px", alignItems: "center" }, !loadingInnerData ? react_default.a.createElement(miniSpace, { groupsToShow: groupsToShow, catId: item === null || item === void 0 ? void 0 : item.id, isShared: item === null || item === void 0 ? void 0 : item.shared, isMarked: categoryMarked === i && selectedRow === index ? true : false, isChosen: category === i && currentWSid === id ? true : false }) : react_default.a.createElement(Spinner["a" /* default */ ], { m: "auto", size: "16px", emptyColor: spinnerBg[colorMode], color: "blue.500" })))));
                        }))))), shared && react_default.a.createElement(PseudoBox["a" /* default */ ], { _groupHover: { transform: 'scale(0.5) translateX(-2px)', opacity: '0' }, ml: "4px", mr: "4px", position: "absolute", right: "26px", top: "20px", minWidth: "28px", height: "28px", alignItems: "center", transition: "0.25s cubic-bezier(.374,.019,.035,1.861)" }, react_default.a.createElement(Icon["a" /* default */ ], { m: "auto", name: "sharedIcon", color: iconDarkerColor[colorMode] })), react_default.a.createElement(Flex["a" /* default */ ], { position: "absolute", right: "26px", top: "18px" }, react_default.a.createElement(PseudoBox["a" /* default */ ], { ml: "4px", mr: "12px", opacity: "0", transition: "0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275)", transform: "scale(0.5) translateX(2px)", _groupHover: { transform: 'scale(1) translateX(0px)', opacity: '1' }, willChange: "transform" }, react_default.a.createElement(IconButton["a" /* default */ ], { icon: "dotdotdot", onClick: function onClick(e) { return openModalClick(e); }, color: iconDarkerColor[colorMode], minWidth: "28px", height: "28px", bg: iconBG[colorMode], returnFocusOnClose: false }))), react_default.a.createElement(Box["a" /* default */ ], { h: "90%", w: "5px", roundedRight: "3px", opacity: usePortal ? '0' : '1', bgImage: "linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)", pos: "absolute", top: "5%", left: "0", transform: currentWSid === id && !isLoading ? 'translateX(0px)' : 'translateX(-6px)', transition: "0.6s", willChange: "transform" })), react_default.a.createElement(workspaceModal["a" /* default */ ], {
                        siteModalOpen: siteModalOpen,
                        closeSiteModal: closeSiteModal //deleteNoteAction={deleteNoteAction}
                            ,
                        name: name,
                        emoji: emoji,
                        id: id,
                        catLength: catLength,
                        saveWSchanges: saveWSchanges,
                        deleteCurrentWS: deleteCurrentWS,
                        currentWSid: currentWSid,
                        sharedRef: sharedRef,
                        owner: isOwner,
                        shared: shared
                    }));
                };
                /* export function useKeyPress(targetKey) {
                    // State for keeping track of whether key is pressed
                    const [keyPressed, setKeyPressed] = useState(false);
                    // Add event listeners
                    useEffect(() => {
                        // If pressed key is our target key then set to true
                        function downHandler({ key }) {
                            if (!keyPressed && key === targetKey) {
                                setKeyPressed(true);
                                // rather than rely on keyup to unpress, use a timeout to workaround the fact that
                                // keyup events are unreliable when the meta key is down. See Issue #3:
                                // http://web.archive.org/web/20160304022453/http://bitspushedaround.com/on-a-few-things-you-may-not-know-about-the-hellish-command-key-and-javascript-events/
                                setTimeout(() => {
                                    setKeyPressed(false);
                                }, 1000);
                            }
                        }

                        window.addEventListener('keydown', downHandler);
                        // Remove event listeners on cleanup
                        return () => {
                            window.removeEventListener('keydown', downHandler);
                        };
                    }, []); // Empty array ensures that effect is only run on mount and unmount
                    return keyPressed;
                } */
                var workspacePicker_WorkspacePicker = function WorkspacePicker(_ref5) {
                    var fetchAllWS = _ref5.fetchAllWS,
                        setAllWSloaded = _ref5.setAllWSloaded; //zustate
                    var setUserState = Object(store["a" /* default */ ])(setUserStateZu);
                    var categories = Object(store["a" /* default */ ])(categoriesZu);
                    var userState = Object(store["a" /* default */ ])(userStateZu);
                    var currentWSid = Object(store["a" /* default */ ])(currentWSidZu);
                    var isLoadingUser = Object(store["a" /* default */ ])(isLoadingUserZu);
                    var setIsLoadingUser = Object(store["a" /* default */ ])(setIsLoadingUserZu);
                    var changeWorkspace = Object(store["a" /* default */ ])(changeWorkspaceZu);
                    var denyInvite = Object(store["a" /* default */ ])(denyInviteZu);
                    var setIsLoadingCategories = Object(store["a" /* default */ ])(setIsLoadingCategoriesZu);
                    var setBlockHoverSide = Object(dndStore["a" /* default */ ])(setBlockHoverSideZu);
                    var category = Object(store["a" /* default */ ])(categoryZu); //Colorstuff
                    var _useColorMode3 = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                        colorMode = _useColorMode3.colorMode,
                        toggleColorMode = _useColorMode3.toggleColorMode;
                    var iconSmall = { light: 'gray.600', dark: '#FFF' };
                    var subTitle = { light: 'gray.600', dark: '#A1A2A4' };
                    var hoverCreateButton = { light: 'gray.200', dark: '#32363A' };
                    var title = { light: '#1A202C', dark: '#FFF' };
                    var hoverButton = { light: 'gray.100', dark: '#32363A' };
                    var boxes = { light: 'gray.200', dark: '#32363A' };
                    var color = { light: '#FFF', dark: '#262A2D' };
                    var menuCubic = '0s';
                    var createWorkspace = function createWorkspace() { if (userState.stripeSubscriptionStatus === 'active') { setIsLoadingUser(true); var catData = [{ id: '1', name: 'Untitled', tabIndex: 0 }]; var currentCatLength = catData.length;
                            chrome.runtime.sendMessage({ msg: 'newWorkspace', data: userState, currentCatLength: currentCatLength, currentWSid: currentWSid, catData: catData }, function(response) {}); } else return; };
                    var wsInvites = userState.invites !== undefined ? userState.invites : false;
                    var wsLength = userState.workspaces !== undefined ? userState.workspaces.length > 99 ? false : true : true;
                    var onDragEnd = function onDragEnd(result) { //setIsDraggingCategory(false);
                        if (!result.destination) { return; } else { var currentUserState = Object(objectSpread2["a" /* default */ ])({}, userState); var newData = Object(toConsumableArray["a" /* default */ ])(userState.workspaces); var fromIndex = result.source.index; var toIndex = result.destination.index; var payload = newData[fromIndex];
                            newData.splice(fromIndex, 1);
                            newData.splice([toIndex], 0, payload);
                            newData.forEach(function(item, index) { item.tabIndex = index; });
                            currentUserState.workspaces = newData;
                            setUserState(currentUserState);
                            chrome.runtime.sendMessage({ msg: 'saveWSinfo', ws: { workspaces: newData } }); }
                    };
                    /* const open = () => setWorkspaceMenuOpen(!isWorkspaceMenuOpen);
                        const close = () => {
                            setBlockHoverSide(false);
                            setWorkspaceMenuOpen(false);
                        }; */ //chosenWS -> selectedRow(chosenWS) -> onHover -> change selected row
                    //let initialSelected = userState.workspaces.filter(ws => ws.id === currentWSid)[0]
                    var initialSelected = userState.workspaces.findIndex(function(ws) { return ws.id === currentWSid; }); //3. Register mouseLeft + mouseRight + MouseHover ++ Enter !!
                    //1. Groups in row
                    //2. load selected workspace - on index change || on search
                    //4. merge search result osv
                    //5. Open WS modal -> close search modal?
                    var _useState11 = Object(react["useState"])(category),
                        _useState12 = Object(slicedToArray["a" /* default */ ])(_useState11, 2),
                        categoryMarked = _useState12[0],
                        setCategoryMarkedInner = _useState12[1];
                    var setCategoryMarked = function setCategoryMarked(index) { setCategoryMarkedInner(index);
                        setMarkedCatRef(index); };
                    var _useState13 = Object(react["useState"])(initialSelected),
                        _useState14 = Object(slicedToArray["a" /* default */ ])(_useState13, 2),
                        selectedRowState = _useState14[0],
                        setSelectedRowStateInner = _useState14[1];
                    var setSelectedRowState = function setSelectedRowState(index) { setSelectedRowStateInner(index);
                        setSelectedRow(index);
                        fetchAllWS(); };
                    var selectedRow = Object(react["useRef"])(initialSelected);
                    var setSelectedRow = function setSelectedRow(value) { selectedRow.current = value; };
                    var markedCatRef = Object(react["useRef"])(category);
                    var setMarkedCatRef = function setMarkedCatRef(value) { markedCatRef.current = value; };
                    Utils_useKeyPress('ArrowUp', function() { changeSelectedRow('up');
                        fetchAllWS(); });
                    Utils_useKeyPress('ArrowDown', function() { changeSelectedRow('down');
                        fetchAllWS(); });
                    var scrollCompRef = Object(react["useRef"])(null);
                    var doScroll = function doScroll(pix) { return scrollCompRef.current.scrollBy(0, pix); };
                    var changeSelectedRow = function changeSelectedRow(dir) {
                        var length = userState.workspaces.length;
                        var height = scrollCompRef.current.clientHeight;
                        if (dir === 'up') {
                            if (selectedRow.current === 0) { return; } else { //setSelectedRow((selectedRow) => selectedRow - 1);
                                if (selectedRow.current * 164 - height > 0) { doScroll(-164); } setCategoryMarked(0);
                                setMarkedCatRef(0);
                                setSelectedRow(selectedRow.current - 1);
                                setSelectedRowStateInner(selectedRow.current);
                            }
                        } else if (dir === 'down') {
                            if (selectedRow.current === length - 1) { return; } else { //setSelectedRow((selectedRow) => selectedRow + 1);
                                if (selectedRow.current * 164 - height > 0) { doScroll(164); } setCategoryMarked(0);
                                setMarkedCatRef(0);
                                setSelectedRow(selectedRow.current + 1);
                                setSelectedRowStateInner(selectedRow.current);
                            }
                        }
                    };
                    Utils_useKeyPress('ArrowLeft', function() { moveCategoryMarked('left'); });
                    Utils_useKeyPress('ArrowRight', function() { moveCategoryMarked('right'); });
                    var moveCategoryMarked = function moveCategoryMarked(dir) { var length = userState.workspaces[selectedRow.current].catLength; if (dir === 'left') { if (markedCatRef.current === 0) { return; } else { setMarkedCatRef(markedCatRef.current - 1);
                                setCategoryMarked(markedCatRef.current); } } else if (dir === 'right') { if (markedCatRef.current === length - 1) { return; } else { setMarkedCatRef(markedCatRef.current + 1);
                                setCategoryMarked(markedCatRef.current); } } };
                    return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Box["a" /* default */ ], {
                        maxHeight: "calc(92vh - 144px)",
                        overflow: "auto",
                        ref: scrollCompRef,
                        pb: "44px",
                        className: colorMode === 'dark' ? 'groupScrollAreaDarkHover' : 'groupScrollAreaHover' //style={{ scrollbarGutter: 'stable' }}
                    }, !isLoadingUser ? react_default.a.createElement(react_default.a.Fragment, null, (userState === null || userState === void 0 ? void 0 : userState.workspaces) ? react_default.a.createElement(react_beautiful_dnd_esm["a" /* DragDropContext */ ], {
                        onDragEnd: onDragEnd //onBeforeDragStart={onBeforeDragStart}
                    }, react_default.a.createElement(react_beautiful_dnd_esm["c" /* Droppable */ ], { droppableId: "droppable" }, function(provided, snapshot) { return react_default.a.createElement(Box["a" /* default */ ], Object.assign({}, provided.droppableProps, { ref: provided.innerRef, bg: snapshot.isDraggingOver ? hoverButton[colorMode] : '', rounded: "8px" }), userState.workspaces.map(function(item, index) { return react_default.a.createElement(react_beautiful_dnd_esm["b" /* Draggable */ ], { key: item.id, draggableId: item.id, index: index }, function(provided, snapshot) { return item.inviteAccepted === undefined || item.inviteAccepted === true ? react_default.a.createElement(workspacePicker_PortalAwareItem, { changeWorkspace: changeWorkspace, name: item.name, sharedRef: item.sharedRef, id: item.id, emoji: item.emoji, shared: item.shared, isOwner: item.owner, catLength: item.catLength, isDeleted: item.isDeleted, currentWSid: currentWSid, setIsLoadingUser: setIsLoadingUser, provided: provided, snapshot: snapshot, deny: denyInvite, setBlockHoverSide: setBlockHoverSide, selectedRow: selectedRowState, setSelectedRow: setSelectedRowState, index: index, categoryMarked: categoryMarked, markedCatRef: markedCatRef, setCategoryMarked: setCategoryMarked, selectedRowRef: selectedRow }) : react_default.a.createElement(workspacePicker_InvitedRow, { index: index, userName: userState.name, email: userState.email, name: item.name, id: item.id, emoji: item.emoji, catLength: item.catLength, from: item.from, setIsLoadingUser: setIsLoadingUser, provided: provided, snapshot: snapshot, workspaces: userState.workspaces, deny: denyInvite, setAllWSloaded: setAllWSloaded }); }); }), provided.placeholder); })) : react_default.a.createElement(workspacePicker_WorkspaceRow, { changeWorkspace: function changeWorkspace() { return console.log('Change to workspace 1'); }, name: 'Workspace 1', id: '1', emoji: '📒', catLength: categories ? categories.length : 3, currentWSid: '1', setIsLoadingUser: setIsLoadingUser, selectedRow: selectedRowState, setSelectedRow: setSelectedRowState, index: 0 })) : react_default.a.createElement(Flex["a" /* default */ ], { h: "100%", w: "100%", alignItem: "center" }, react_default.a.createElement(Spinner["a" /* default */ ], { m: "auto", emptyColor: boxes[colorMode], color: "blue.500", thickness: "4px" }))), react_default.a.createElement(PseudoBox["a" /* default */ ], { pl: "24px", pr: "24px", pt: "16px", display: "flex", flexDirection: "column", position: "sticky", bottom: "0", zIndex: "100", bg: color[colorMode] }, react_default.a.createElement(Button["a" /* default */ ], {
                        _hover: { bg: hoverCreateButton[colorMode] },
                        transition: menuCubic,
                        onClick: function onClick() { return createWorkspace(); },
                        cursor: "pointer" //mx="16px"
                            //bg="gray.100"
                            ,
                        w: "100%" //mt="auto"
                            //mb="auto"
                            ,
                        h: "48px",
                        rounded: "6px",
                        alignItems: "center",
                        isDisabled: !isLoadingUser && userState.stripeSubscriptionStatus === 'active' && wsLength ? false : true
                    }, react_default.a.createElement(Icon["a" /* default */ ], { size: "16px", name: "plusCircle", mr: "8px", ml: "auto", color: iconSmall[colorMode], mt: "1px" }), react_default.a.createElement(Text["a" /* default */ ], { mr: "auto", fontSize: "14px", fontWeight: "600", color: title[colorMode] }, "New")), !isLoadingUser && userState.stripeSubscriptionStatus !== 'active' && react_default.a.createElement(Text["a" /* default */ ], { color: subTitle[colorMode], px: "30px", mt: "14px", textAlign: "center", letterSpacing: "0.34px" }, react_default.a.createElement(Link["a" /* default */ ], { href: "https://www.tabextend.com/pricing", alt: "See pricing", textDecoration: "underline" }, "upgrade your plan"), ' ', "to create more", ' ', react_default.a.createElement(Link["a" /* default */ ], { href: "https://www.tabextend.com/guide/workspaces", alt: "See pricing", textDecoration: "underline" }, "workspaces"))));
                }; /* harmony default export */
                var workspacePicker = (workspacePicker_WorkspacePicker);
                // EXTERNAL MODULE: ./src/Components/shortcutRecorder.js
                var shortcutRecorder = __webpack_require__(236);

                // CONCATENATED MODULE: ./src/Components/searchModal.js
                /* global chrome */
                var searchModal_currentWSidZu = function currentWSidZu(state) { return state.currentWSid; };
                var setDoneStatusZu = function setDoneStatusZu(state) { return state.setDoneStatus; };
                var openNewTabStateZu = function openNewTabStateZu(state) { return state.openNewTabState; };
                var jumpNewTabStateZu = function jumpNewTabStateZu(state) { return state.jumpNewTabState; };
                var searchModal_isLoadingUserZu = function isLoadingUserZu(state) { return state.isLoadingUser; };
                var setShowToastZu = function setShowToastZu(state) { return state.setShowToast; };
                var allGroupsZu = function allGroupsZu(state) { return state.allGroups; };
                var setAllGroupsZu = function setAllGroupsZu(state) { return state.setAllGroups; };
                var searchModal_allWSDataZu = function allWSDataZu(state) { return state.allWSData; };
                var searchModal_setAllWSDataZu = function setAllWSDataZu(state) { return state.setAllWSData; };
                var searchModal_userStateZu = function userStateZu(state) { return state.userState; };
                var searchModalOpenZu = function searchModalOpenZu(state) { return state.searchModalOpen; };
                var searchModal_closeSearchModalZu = function closeSearchModalZu(state) { return state.closeSearchModal; };
                var openSearchModalZu = function openSearchModalZu(state) { return state.openSearchModal; };
                var searchModal_changeWorkspaceToZu = function changeWorkspaceToZu(state) { return state.changeWorkspaceTo; };
                var hideSearchModalZu = function hideSearchModalZu(state) { return state.hideSearchModal; };
                var showWorkspaceEmojiZu = function showWorkspaceEmojiZu(state) { return state.showWorkspaceEmoji; };
                var shortcutOpenWorkspacePickerZu = function shortcutOpenWorkspacePickerZu(state) { return state.shortcutOpenWorkspacePicker; };
                var searchModal_OptionSelect = function OptionSelect(_ref) { var option = _ref.option,
                        iconName = _ref.iconName,
                        filter = _ref.filter,
                        changeShowItems = _ref.changeShowItems,
                        showItems = _ref.showItems; var _useState = Object(react["useState"])(true),
                        _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                        isChecked = _useState2[0],
                        setIsChecked = _useState2[1];
                    Object(react["useEffect"])(function() { if (showItems[filter] !== isChecked) { changeShowItems(filter, isChecked); } }, [isChecked]); var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                        colorMode = _useColorMode.colorMode,
                        toggleColorMode = _useColorMode.toggleColorMode; var lightColor = { light: 'linear-gradient(0deg, #EDF0F4 0%, #EDF0F4 100%)', dark: 'linear-gradient(0deg, #464D52 0%, #343B43 100%)' }; var selectedBG = { light: 'linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)', dark: 'linear-gradient(178deg, #52595D 0%, #40484F 100%)' }; var selectedShadow = { light: '0 12px 16px -10px rgba(49, 144, 255,0.40)', dark: '0 12px 16px -10px rgba(0,0,0,0.40)' }; var toDoBorder = { light: '#63B3ED', dark: '#6f6f6f' }; var toDoBorderOff = { light: '#dde3ea', dark: '#6f6f6f' }; var bgColor = { light: 'gray.200', dark: '#262A2D' }; var boxBG = { light: '#FFF', dark: '#262A2D' }; var iconColor = { light: 'gray.600', dark: 'gray.400' }; var textColor = { light: '#17212D', dark: 'gray.300' }; var selectedBox = { light: '#479dfe', dark: '#40484F' }; return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(PseudoBox["a" /* default */ ], { as: "button", outline: "none", mb: "8px", cursor: "pointer", h: "36px", display: "flex", rounded: "6px", alignItems: "left", backgroundImage: isChecked ? selectedBG[colorMode] : lightColor[colorMode], onClick: function onClick() { return setIsChecked(!isChecked); }, boxShadow: isChecked ? selectedShadow[colorMode] : '', _hover: { filter: isChecked ? 'brightness(110%)' : 'brightness(94%)' }, _active: { transform: 'scale(0.96)' }, transition: "opacity 0.35s cubic-bezier(.374,.019,.035,1.861)" }, react_default.a.createElement(Flex["a" /* default */ ], { ml: "12px", my: "auto", alignItems: "center" }, react_default.a.createElement(Icon["a" /* default */ ], { name: iconName, color: isChecked ? '#FFF' : iconColor[colorMode], size: "20px", my: "auto" }), react_default.a.createElement(Text["a" /* default */ ], { cursor: "pointer", fontWeight: "500", fontSize: "16px", ml: "8px", my: "auto", color: isChecked ? '#FFF' : textColor[colorMode] }, option)), react_default.a.createElement(PseudoBox["a" /* default */ ], { _hover: { transform: 'scale(1.075)' }, outline: "none", onClick: function onClick() { return setIsChecked(!isChecked); }, bg: isChecked ? selectedBox[colorMode] : boxBG[colorMode], _active: { boxShadow: '0 1px 10px -2px rgba(152,169,185,0.50), inset 0px 0px 0px 2px ' + toDoBorder[colorMode], transform: 'scale(0.96)' }, my: "auto", ml: "auto", mr: "12px", height: "24px", width: "24px", rounded: "6px", cursor: "pointer", display: "flex", alignItems: "center", boxShadow: 'inset 0px 0px 0px 2px ' + (isChecked ? toDoBorder[colorMode] : toDoBorderOff[colorMode]) }, react_default.a.createElement(Icon["a" /* default */ ], { m: "auto", fontSize: "18px", color: isChecked ? '#FFF' : 'transparent', name: "checkDone" })))); };
                var searchModal_RowDate = function RowDate(_ref2) {
                    var date = _ref2.date,
                        items = _ref2.items,
                        prevYear = _ref2.prevYear; //const [isChecked, setIsChecked] = useState(true);
                    var _useColorMode2 = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                        colorMode = _useColorMode2.colorMode,
                        toggleColorMode = _useColorMode2.toggleColorMode;
                    var lightColor = { light: 'linear-gradient(0deg, #EDF2F8 0%, #EDF2F8 100%)', dark: '#3F454D' };
                    var text = { light: '#1A202C', dark: '#FFF' };
                    var day = { light: 'gray.500', dark: '#A1A2A4' };
                    var monthText = { light: 'gray.400', dark: '#A1A2A4' };
                    var timeLineColor = { light: 'gray.100', dark: '#3C4042' };
                    var month = date.substring(3, 7).toUpperCase();
                    var dayName = date.substring(0, 3);
                    var dayNumber = date.substring(7, 10);
                    var year = date.substring(10, 15);
                    return react_default.a.createElement(react_default.a.Fragment, null, year !== prevYear ? react_default.a.createElement(Badge["a" /* default */ ], { fontSize: "22px", rounded: "5px" }, year) : '', react_default.a.createElement(PseudoBox["a" /* default */ ], { py: "16px", cursor: "pointer" }, react_default.a.createElement(Flex["a" /* default */ ], { minHeight: "36px" }, react_default.a.createElement(PseudoBox["a" /* default */ ], { minWidth: "60px", display: "flex" }, react_default.a.createElement(Flex["a" /* default */ ], { flexDir: "column" }, react_default.a.createElement(Text["a" /* default */ ], { fontSize: "14px", color: day[colorMode], lineHeight: "14px", fontWeight: "600" }, dayName), react_default.a.createElement(Text["a" /* default */ ], { color: text[colorMode], fontSize: "20px", lineHeight: "30px", fontWeight: "500", letterSpacing: "1.2px" }, dayNumber), react_default.a.createElement(Text["a" /* default */ ], { fontSize: "12px", color: monthText[colorMode], fontWeight: "600", letterSpacing: "0.64px" }, month)), react_default.a.createElement(Box["a" /* default */ ], { h: "100%", ml: "auto", bg: timeLineColor[colorMode], w: "8px", borderRadius: "4px" })), react_default.a.createElement(Flex["a" /* default */ ], { flexDir: "column", w: "100%" }, items.map(function(el, index) { return react_default.a.createElement(searchModal_RowItem, { key: el.id, data: el }); })))));
                };
                var searchModal_SavedInRow = function SavedInRow(_ref3) { var type = _ref3.type,
                        emoji = _ref3.emoji,
                        name = _ref3.name; return react_default.a.createElement(Flex["a" /* default */ ], { mt: "4px", fontSize: "14px" }, react_default.a.createElement(Text["a" /* default */ ], { opacity: "0.6", mr: "4px" }, type), emoji && react_default.a.createElement(Text["a" /* default */ ], { mr: "8px" }, (emoji === null || emoji === void 0 ? void 0 : emoji.length) > 10 ? react_default.a.createElement(Image["a" /* default */ ], { src: emoji, minW: "16px", minH: "16px", maxW: "16px", maxH: "16px", overflow: "hidden", rounded: "2px", mt: "4px" }) : emoji), react_default.a.createElement(Text["a" /* default */ ], { fontWeight: "600" }, name)); };
                var searchModal_RowItem = function RowItem(_ref4) {
                    var _data$url;
                    var data = _ref4.data; //Zustate
                    var userState = Object(store["a" /* default */ ])(searchModal_userStateZu);
                    var setDoneStatus = Object(store["a" /* default */ ])(setDoneStatusZu);
                    var openNewTabState = Object(persistStore["a" /* default */ ])(openNewTabStateZu);
                    var jumpNewTabState = Object(persistStore["a" /* default */ ])(jumpNewTabStateZu);
                    var allGroups = searchStore(allGroupsZu);
                    var allWSData = searchStore(searchModal_allWSDataZu);
                    var closeSearchModal = searchStore(searchModal_closeSearchModalZu);
                    var changeWorkspaceTo = Object(store["a" /* default */ ])(searchModal_changeWorkspaceToZu); //const [isChecked, setIsChecked] = useState(true);
                    var _useColorMode3 = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                        colorMode = _useColorMode3.colorMode;
                    var urlText = { light: 'gray.400', dark: '#A1A2A4' };
                    var weight = { light: '500', dark: '700' };
                    var text = { light: '#1A202C', dark: '#FFF' };
                    var favIconBg = { light: '#FFF', dark: 'transparent' };
                    var commentBgColor = { light: 'gray.100', dark: '#35393c' };
                    var textComment = { light: 'gray.700', dark: '#FFFFFF' };
                    var todoBorder = { light: '#B0B7C1', dark: '#4A5568' };
                    var icon = { light: 'gray.600', dark: '#A1A2A4' };
                    var hoverButton = { light: 'gray.100', dark: '#32363A' };
                    var tooltipBG = { light: 'gray.800', dark: 'gray.400' };
                    var timeRounded = data.dateCreated.substring(16, 21);
                    var _useState3 = Object(react["useState"])(false),
                        _useState4 = Object(slicedToArray["a" /* default */ ])(_useState3, 2),
                        tabInSpace = _useState4[0],
                        setTabInSpace = _useState4[1];
                    var _useState5 = Object(react["useState"])(false),
                        _useState6 = Object(slicedToArray["a" /* default */ ])(_useState5, 2),
                        tabInWS = _useState6[0],
                        setInWS = _useState6[1];
                    var _useState7 = Object(react["useState"])(false),
                        _useState8 = Object(slicedToArray["a" /* default */ ])(_useState7, 2),
                        goToWSdetails = _useState8[0],
                        setGoToDetails = _useState8[1];
                    var _useState9 = Object(react["useState"])(false),
                        _useState10 = Object(slicedToArray["a" /* default */ ])(_useState9, 2),
                        invitePending = _useState10[0],
                        setInvitePending = _useState10[1];
                    var findDetails = function findDetails() { var info = allGroups.find(function(tab) { return tab.tabs.some(function(item) { return item.id === data.id; }); }); if (!info) { return; } setTabInSpace(info); var inWS = allWSData.find(function(group) { return group.tabData.some(function(item) { return item.id === info.id; }); }); var inCategoryIndex = inWS.categories.findIndex(function(cat) { return cat.id === info.categoryID; }); var inCategoryName = inWS.categories[inCategoryIndex].name; if (userState.workspaces !== undefined) { var workspaces = userState.workspaces; var wsIndex = userState.workspaces.findIndex(function(ws) { return ws.id === inWS.WSid; }); var emoji = workspaces[wsIndex].emoji; var name = workspaces[wsIndex].name;
                            setInWS({ emoji: emoji, name: name, category: inCategoryName });
                            setGoToDetails({ toWsId: inWS.WSid, inCategoryIndex: inCategoryIndex }); var _invitePending = workspaces[wsIndex].inviteAccepted === false ? true : false;
                            setInvitePending(_invitePending); } }; //const [isDone, setIsDone] = useState(data.doneStatus);
                    //const spaceIndex = data.todo ? tabs.findIndex(target => target.id === tabInSpace.id) : ""
                    /* const toggleDone = (e) => {
                            setIsDone(!isDone);
                            setDoneStatus(!isDone, tabInSpace.id, data.id);
                            e.stopPropagation();
                        }; */
                    var _useState11 = Object(react["useState"])(false),
                        _useState12 = Object(slicedToArray["a" /* default */ ])(_useState11, 2),
                        loading = _useState12[0],
                        setLoadingState = _useState12[1];
                    var openLink = function openLink(e) { e.stopPropagation(); if (e.metaKey || e.ctrlKey || e.which === 2 || e.button === 4) { chrome.tabs.create({ active: false, url: data.url }, function() { setLoadingState(false); }); return; } else if (openNewTabState) { chrome.tabs.create({ active: jumpNewTabState, url: data.url }, function() { setLoadingState(false); }); return; } else { chrome.tabs.update({ url: data.url });
                            setLoadingState(true); } };

                    function timeout(delay) { return new Promise(function(res) { return setTimeout(res, delay); }); }
                    var _useState13 = Object(react["useState"])(false),
                        _useState14 = Object(slicedToArray["a" /* default */ ])(_useState13, 2),
                        isLoading = _useState14[0],
                        setIsLoading = _useState14[1];
                    var changeToWorkspace = /*#__PURE__*/ function() {
                        var _ref5 = Object(asyncToGenerator["a" /* default */ ])( /*#__PURE__*/ regenerator_default.a.mark(function _callee() {
                            return regenerator_default.a.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            if (!data.isDeleted) { _context.next = 2; break; }
                                            return _context.abrupt("return");
                                        case 2:
                                            if (!goToWSdetails) { _context.next = 11; break; } //console.log('goToWSdetails: ', goToWSdetails);
                                            setIsLoading(true);
                                            changeWorkspaceTo(goToWSdetails.toWsId, goToWSdetails.inCategoryIndex);
                                            _context.next = 7;
                                            return timeout(400);
                                        case 7:
                                            setIsLoading(false);
                                            closeSearchModal();
                                            _context.next = 12;
                                            break;
                                        case 11:
                                            return _context.abrupt("return");
                                        case 12:
                                        case "end":
                                            return _context.stop();
                                    }
                                }
                            }, _callee);
                        }));
                        return function changeToWorkspace() { return _ref5.apply(this, arguments); };
                    }();
                    return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Tooltip["a" /* default */ ], { rounded: "6px", px: "0px", py: "12px", showDelay: "400", minW: "300px", onOpen: function onOpen() { return findDetails(); }, label: react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Text["a" /* default */ ], { fontSize: "18px", fontWeight: "bold", px: "16px" }, !data.todo ? data.title : 'To-do'), tabInSpace ? react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Text["a" /* default */ ], { px: "16px", mt: "8px", fontSize: "11px", letterSpacing: "0.30px", wordBreak: "break-all", mb: "2px" }, data.note ? 'WRITTEN IN:' : 'SAVED IN:'), react_default.a.createElement(Box["a" /* default */ ], { bg: tooltipBG[colorMode], px: "16px", pb: "10px", pt: "6px" }, react_default.a.createElement(searchModal_SavedInRow, { type: 'Workspace: ', emoji: tabInWS === null || tabInWS === void 0 ? void 0 : tabInWS.emoji, name: tabInWS === null || tabInWS === void 0 ? void 0 : tabInWS.name }), react_default.a.createElement(searchModal_SavedInRow, { type: 'Category: ', name: tabInWS === null || tabInWS === void 0 ? void 0 : tabInWS.category }), react_default.a.createElement(searchModal_SavedInRow, { type: 'Group: ', emoji: tabInSpace === null || tabInSpace === void 0 ? void 0 : tabInSpace.emoji, name: tabInSpace === null || tabInSpace === void 0 ? void 0 : tabInSpace.title })), invitePending ? react_default.a.createElement(Text["a" /* default */ ], { mt: "8px", fontSize: "14px", px: "16px" }, react_default.a.createElement("b", null, "Invite pending"), ", see workspace list") : react_default.a.createElement(Text["a" /* default */ ], { mt: "8px", fontSize: "14px", px: "16px" }, "Go to by clicking:", ' ', react_default.a.createElement(Icon["a" /* default */ ], { name: "arrowCircleRight" }))) : ''), zIndex: "10000" }, react_default.a.createElement(PseudoBox["a" /* default */ ], { display: "flex", pb: "8px", pt: "8px", _first: { pt: '0px', pb: '8px' }, _last: { pt: '8px', pb: '0px' }, _hover: { filter: 'brightness(94%)' }, role: "group", transition: "transform 0.15s cubic-bezier(.374,.019,.035,1.861)", opacity: loading ? 0.6 : 1 }, react_default.a.createElement(PseudoBox["a" /* default */ ], { w: "796px", display: "flex", ml: "8px" }, ((_data$url = data.url) === null || _data$url === void 0 ? void 0 : _data$url.length) > 0 ? react_default.a.createElement(Box["a" /* default */ ], { w: "774px" }, react_default.a.createElement(Flex["a" /* default */ ], { alignItems: "center", position: "relative", w: "96%" }, react_default.a.createElement(PseudoBox["a" /* default */ ], {
                        display: "flex",
                        alignItems: "center",
                        rounded: "8px",
                        minWidth: "32px",
                        minHeight: "32px",
                        px: "2px",
                        bg: favIconBg[colorMode],
                        boxShadow: "0 1px 6px -1px rgba(78,80,81,0.30)",
                        mr: "16px",
                        ml: "16px" //my="6px"
                    }, react_default.a.createElement(Image["a" /* default */ ], { src: data.favIcon, mx: "auto", size: "24px", rounded: "2px", fallbackSrc: colorMode === 'light' ? fallBackSvg_default.a : fallBackSvgDark_default.a, css: { userDrag: 'none', userSelect: 'none' } })), react_default.a.createElement(Flex["a" /* default */ ], { mr: "16px", maxWidth: "80%", flexDirection: "column" }, react_default.a.createElement(Text["a" /* default */ ], { my: "auto", letterSpacing: "0.42px", color: text[colorMode], fontWeight: weight[colorMode], fontSize: "15px", isTruncated: true }, data.title), react_default.a.createElement(Tooltip["a" /* default */ ], { zIndex: "1000", rounded: "4px", px: "12px", py: "6px", label: react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Text["a" /* default */ ], { fontWeight: "bold" }, "Open ", data.title), react_default.a.createElement(Text["a" /* default */ ], { fontSize: "xs" }, data.url)), showDelay: "400" }, react_default.a.createElement(PseudoBox["a" /* default */ ], {
                        _hover: { textDecoration: 'underline' } //as="a"
                        //href={data.url}
                        ,
                        onClick: function onClick(e) { return openLink(e); },
                        mt: "2px",
                        my: "auto",
                        color: urlText[colorMode],
                        fontWeight: "500",
                        fontSize: "12px",
                        isTruncated: true
                    }, data.url.replace(/(^\w+:|^)\/\//, ''))))), data.note && react_default.a.createElement(PseudoBox["a" /* default */ ], { opacity: data.doneStatus ? '0.5' : '1', textDecoration: data.doneStatus ? 'line-through' : 'initial', mt: "6px", paddingTop: "6px", paddingBottom: "8px", paddingLeft: "12px", paddingRight: "12px", w: "724px", wordBreak: "break-word", fontStyle: data.type === 'textCopied' ? 'italic' : 'normal', fontSize: "14px", fontWeight: "500", whiteSpace: "pre-line", rounded: "6px", minHeight: "35px", color: data.commentColor !== false ? commentBg["a" /* default */ ][data.commentColor].text : textComment[colorMode], bg: data.commentColor !== false ? commentBg["a" /* default */ ][data.commentColor].bg : commentBgColor[colorMode], mr: "24px", ml: "16px" }, data.comment)) : react_default.a.createElement(Flex["a" /* default */ ], { alignItems: "center", w: "100%" }, data.todo ? react_default.a.createElement(PseudoBox["a" /* default */ ], { as: "button" /* onClick={(e) => toggleDone(e)} */ , outline: "none", bg: data.doneStatus ? data.commentColor !== false ? commentBg["a" /* default */ ][data.commentColor].iconLight : 'blue.300' : 'transparent', ml: "16px", my: "auto", height: "24px", width: "24px", minW: "24px", rounded: "6px", cursor: "pointer", display: "flex", alignItems: "center", boxShadow: 'inset 0px 0px 0px 2px ' + (data.doneStatus ? data.commentColor !== false ? commentBg["a" /* default */ ][data.commentColor].bg : '#90CDF4' : todoBorder[colorMode]) }, react_default.a.createElement(Icon["a" /* default */ ], { m: "auto", fontSize: "18px", color: data.doneStatus ? '#FFF' : 'transparent', name: "checkDone" })) : '', react_default.a.createElement(PseudoBox["a" /* default */ ], { opacity: data.doneStatus ? '0.5' : '1', textDecoration: data.doneStatus ? 'line-through' : 'initial', paddingTop: "6px", paddingBottom: "8px", paddingLeft: "12px", paddingRight: "12px", width: "98%", wordBreak: "break-word", fontStyle: data.type === 'textCopied' ? 'italic' : 'normal', fontSize: "14px", fontWeight: "500", whiteSpace: "pre-line", rounded: "6px", minHeight: "35px", color: data.commentColor !== false ? commentBg["a" /* default */ ][data.commentColor].text : textComment[colorMode], bg: data.commentColor !== false ? commentBg["a" /* default */ ][data.commentColor].bg : commentBgColor[colorMode], mr: "24px", ml: "16px" }, data.comment)), react_default.a.createElement(PseudoBox["a" /* default */ ], {
                        zIndex: "2" //opacity={menuOpen ? '0.6' : '0'}
                            ,
                        transform: 'translateX(-20px)',
                        transition: "opacity 0.15s, transform 0.18s",
                        opacity: "0",
                        _groupHover: { opacity: '1', transform: 'translateX(-8px)' }
                    }, react_default.a.createElement(IconButton["a" /* default */ ], { onClick: function onClick() { return changeToWorkspace(); }, size: "sm", isLoading: isLoading, icon: "arrowCircleRight", color: icon[colorMode], bg: "transparent", _hover: { bg: hoverButton[colorMode] }, fontSize: "20px", minH: "36px", minW: "36px", isDisabled: invitePending }))), react_default.a.createElement(PseudoBox["a" /* default */ ], { minWidth: "16px", fontSize: "14px", color: "gray.500", fontWeight: "500", textAlign: "right", pr: "4px", ml: "auto" }, timeRounded))));
                };
                var searchModal_SearchContent = function SearchContent(_ref6) {
                    var filterText = _ref6.filterText,
                        loaded = _ref6.loaded,
                        setLoaded = _ref6.setLoaded,
                        fetchAllWS = _ref6.fetchAllWS;
                    var _useColorMode4 = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                        colorMode = _useColorMode4.colorMode,
                        toggleColorMode = _useColorMode4.toggleColorMode;
                    var hairlineColor = { light: '0px 1px 0px 0 rgba(191,193,205,0.35)', dark: '0px 1px 0px 0 rgba(255,255,255,0.10)' };
                    var spinnerBg = { light: 'gray.200', dark: 'gray.600' };
                    var setAllGroups = searchStore(setAllGroupsZu);
                    var allWSData = searchStore(searchModal_allWSDataZu);
                    var searchModalOpen = searchStore(searchModalOpenZu); //const [, forceUpdate] = useReducer((x) => x + 1, 0);
                    var changeShowItems = function changeShowItems(filter, isChecked) {
                        var newOptions = showItems;
                        newOptions[filter] = isChecked;
                        setShowItems(newOptions); //forceUpdate();
                        updateFilterRes();
                    }; //Följande kod hanterar tabs arrayen, filtrerar, sorterar osv
                    // Sök -> kolla om datan är hämtad ? hämta ->
                    // Map over all workspaces.tabData -> merge ->
                    var searchOptions = [{ option: 'Sites', icon: 'linkFilled', filter: 'sites', id: 1 }, { option: 'Notes', icon: 'comment', filter: 'note', id: 2 }, { option: 'To-dos', icon: 'checkCircle', filter: 'todo', id: 3 }, { option: 'Snippets', icon: 'book', filter: 'copied', id: 4 }];
                    var _useState15 = Object(react["useState"])({ sites: true, note: true, todo: true, copied: true }),
                        _useState16 = Object(slicedToArray["a" /* default */ ])(_useState15, 2),
                        showItems = _useState16[0],
                        setShowItems = _useState16[1];
                    var _useState17 = Object(react["useState"])(true),
                        _useState18 = Object(slicedToArray["a" /* default */ ])(_useState17, 2),
                        loadingSearchRes = _useState18[0],
                        setLoadingSearchRes = _useState18[1];
                    var _useState19 = Object(react["useState"])(),
                        _useState20 = Object(slicedToArray["a" /* default */ ])(_useState19, 2),
                        sortedWSdata = _useState20[0],
                        setSortedWSdata = _useState20[1];
                    var _useState21 = Object(react["useState"])({}),
                        _useState22 = Object(slicedToArray["a" /* default */ ])(_useState21, 2),
                        finalObj = _useState22[0],
                        setFinalOjb = _useState22[1];
                    var _useState23 = Object(react["useState"])([]),
                        _useState24 = Object(slicedToArray["a" /* default */ ])(_useState23, 2),
                        itemsToDisplay = _useState24[0],
                        setItemsToDisplay = _useState24[1];
                    var updateFilterRes = function updateFilterRes() { var itemsToShow = sortedWSdata.filter(function(item) { var _item$url; return (showItems.sites ? ((_item$url = item.url) === null || _item$url === void 0 ? void 0 : _item$url.length) > 0 && item.type !== 'textCopied' : '') || (showItems.note ? item.note === true && item.todo === false : '') || (showItems.todo ? item.todo : '') || (showItems.copied ? item.type === 'textCopied' : ''); });
                        sortData(itemsToShow, 'filter'); };

                    function debounce(func, timeout) { var timer; return function() { for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) { args[_key] = arguments[_key]; } var next = function next() { return func.apply(void 0, args); }; if (timer) { clearTimeout(timer); } timer = setTimeout(next, timeout > 0 ? timeout : 1200); }; }
                    var sortData = debounce(function(allItems, from) { //let stackedItems = allItems.filter(tab => tab.isStacked === true);
                        //let filteredItems = allItems.filter(tab => tab.isStacked !== true);
                        /* const flattenArr =  allItems.map((item) => {
                                    if (item.isStacked) {
                                        item.stackedItems.map(tab => {return tab})
                                    }
                                    return item * 3;
                                    })  */
                        /* let flattenArr = allItems.reduce((acc, curVal) => {
                                   if (curVal.isStacked) {
                                       curVal.stackedItems.forEach((tab) => {
                                           acc.push(tab);
                                       });
                                       return curVal;
                                   } else {
                                       return curVal;
                                   }
                               }); */
                        var flattenItems = [];
                        allItems.forEach(function(item) { if (item.isStacked) { item.stackedItems.forEach(function(tab) { var tabItem = tab;
                                    tab.id = item.id;
                                    flattenItems.push(tabItem); }); } else { flattenItems.push(item); } });
                        var filteredItems = flattenItems.filter(function(item) { var _item$title, _item$comment, _item$url2; return ((_item$title = item.title) === null || _item$title === void 0 ? void 0 : _item$title.toLocaleLowerCase().includes(filterText)) || ((_item$comment = item.comment) === null || _item$comment === void 0 ? void 0 : _item$comment.toLocaleLowerCase().includes(filterText)) || ((_item$url2 = item.url) === null || _item$url2 === void 0 ? void 0 : _item$url2.toLocaleLowerCase().includes(filterText)); });
                        var newItemsToDisplay = filterText ? filteredItems : allItems;
                        setItemsToDisplay(newItemsToDisplay);
                        var newfinalObj = {};
                        newItemsToDisplay.forEach(function(el, index) {
                            var date = el.dateCreated.toString().substring(0, 15); //const year = el.dateCreated.toString().substring(10,15);
                            if (newfinalObj[date]) { newfinalObj[date].push(el); } else { newfinalObj[date] = [el]; }
                        });
                        setFinalOjb(newfinalObj);
                        setLoadingSearchRes(false);
                    }, 500);
                    Object(react["useEffect"])(function() { //filter tex -> see if data is fetched, return loading / f
                        if (!searchModalOpen || filterText.length < 0) { return; } //if allWSData ?
                        setLoadingSearchRes(true);
                        if ((allWSData === null || allWSData === void 0 ? void 0 : allWSData.length) > 0) { if (sortedWSdata) { sortData(sortedWSdata, 'useEffect'); } else { mergeWSdata(); } } else { fetchAllWS(); }
                    }, [filterText, allWSData]); //if
                    var mergeWSdata = function mergeWSdata() { var _ref7; var allTabData = [];
                        allWSData.forEach(function(ws) { ws.tabData.length > 0 && allTabData.push.apply(allTabData, Object(toConsumableArray["a" /* default */ ])(ws.tabData)); });
                        setAllGroups(allTabData); var allItems = (_ref7 = []).concat.apply(_ref7, Object(toConsumableArray["a" /* default */ ])(allTabData.map(function(_ref8) { var tabs = _ref8.tabs; return tabs || []; }))).sort(function(x, y) { var a = new Date(x.dateCreated),
                                b = new Date(y.dateCreated); return b - a; });
                        setSortedWSdata(allItems);
                        sortData(allItems, 'mergeData'); };
                    var _useState25 = Object(react["useState"])({ prev: 0, next: 10 }),
                        _useState26 = Object(slicedToArray["a" /* default */ ])(_useState25, 2),
                        count = _useState26[0],
                        setCount = _useState26[1];
                    var _useState27 = Object(react["useState"])(true),
                        _useState28 = Object(slicedToArray["a" /* default */ ])(_useState27, 2),
                        hasMore = _useState28[0],
                        setHasMore = _useState28[1];
                    var _useState29 = Object(react["useState"])(itemsToDisplay.slice(count.prev, count.next)),
                        _useState30 = Object(slicedToArray["a" /* default */ ])(_useState29, 2),
                        current = _useState30[0],
                        setCurrent = _useState30[1];
                    var getMoreData = function getMoreData() { if (current.length === itemsToDisplay.length) { setHasMore(false); return; } setCurrent(current.concat(itemsToDisplay.slice(count.prev + 10, count.next + 10)));
                        setCount(function(prevState) { return { prev: prevState.prev + 10, next: prevState.next + 10 }; }); };
                    if (loadingSearchRes) return react_default.a.createElement(Flex["a" /* default */ ], { w: "100%", h: "64px" }, react_default.a.createElement(Spinner["a" /* default */ ], { m: "auto", size: "24px", emptyColor: spinnerBg[colorMode], color: "blue.500" }));
                    return react_default.a.createElement(Box["a" /* default */ ], { px: "24px", pb: "32px" }, react_default.a.createElement(Grid["a" /* default */ ], { templateColumns: "repeat(4, 1fr)", gap: "12px" }, searchOptions.map(function(el, index) { return react_default.a.createElement(searchModal_OptionSelect, { key: el.id, option: el.option, iconName: el.icon, filter: el.filter, changeShowItems: changeShowItems, showItems: showItems }); })), react_default.a.createElement(Flex["a" /* default */ ], { mt: "16px" }, react_default.a.createElement(Text["a" /* default */ ], { w: "10%", fontWeight: "600", letterSpacing: "0.64px", color: "gray.400", fontSize: "14px" }, "DATE"), react_default.a.createElement(Text["a" /* default */ ], { w: "78%", fontWeight: "600", letterSpacing: "0.64px", color: "gray.400", fontSize: "14px", ml: "12px" }, "ITEM"), react_default.a.createElement(Text["a" /* default */ ], { w: "12%", fontWeight: "600", letterSpacing: "0.64px", color: "gray.400", fontSize: "14px", textAlign: "right" }, "ADDED")), react_default.a.createElement(Box["a" /* default */ ], { boxShadow: hairlineColor[colorMode], w: "100%", height: "12px" }), react_default.a.createElement(Box["a" /* default */ ], { height: "calc(92vh - 184px)", overflow: "auto", id: "scrollableDiv", className: colorMode === 'dark' ? 'groupScrollAreaDarkHover' : 'groupScrollAreaHover' }, react_default.a.createElement(index_es, { dataLength: current.length, next: getMoreData, hasMore: hasMore, scrollableTarget: "scrollableDiv", style: { marginBottom: '24px' } }, itemsToDisplay.length > 0 ? Object.entries(finalObj).map(function(_ref9, index, arr) { var _ref10 = Object(slicedToArray["a" /* default */ ])(_ref9, 2),
                            key = _ref10[0],
                            value = _ref10[1]; var previousItem = arr[index - 1 > 0 ? index - 1 : 0]; return react_default.a.createElement(searchModal_RowDate, { key: key, date: key, prevYear: previousItem[0].substring(10, 15), items: value }); }) : filterText.length > 0 ? react_default.a.createElement(Flex["a" /* default */ ], { flexDir: "column", m: "auto", alignItems: "center" }, react_default.a.createElement(Image["a" /* default */ ], { src: colorMode === 'light' ? EmptyState_Search_default.a : EmptyState_SearchDark_default.a, size: "164px", mb: "16px", mt: "48px", borderStyle: "none", border: "0px", borderColor: "transparent", pointerEvents: "none" }), react_default.a.createElement(Text["a" /* default */ ], { color: "gray.400", fontSize: "18px", mx: "auto" }, "No matching items")) : react_default.a.createElement(Flex["a" /* default */ ], { flexDir: "column", m: "auto", alignItems: "center" }, react_default.a.createElement(Image["a" /* default */ ], { onLoad: function onLoad() { return setLoaded(true); }, visibility: loaded ? 'visible' : 'hidden', src: colorMode === 'light' ? EmptyState_Search_default.a : EmptyState_SearchDark_default.a, size: "185px", mb: "16px", mt: "32px", borderStyle: "none", border: "0px", borderColor: "transparent", pointerEvents: "none" }), react_default.a.createElement(Text["a" /* default */ ], { color: "gray.400", fontSize: "18px", fontWeight: "500", opacity: "0.8", mx: "auto" }, "No items to show")))));
                };
                var searchModal_SearchModal = function SearchModal() {
                    var _navigator, _navigator$userAgentD, _navigator$userAgentD2, _userState$workspaces, _wsModalData$emoji, _wsModalData$emoji2; //Zustate
                    var isLoadingUser = Object(store["a" /* default */ ])(searchModal_isLoadingUserZu);
                    var userState = Object(store["a" /* default */ ])(searchModal_userStateZu);
                    var currentWSid = Object(store["a" /* default */ ])(searchModal_currentWSidZu);
                    var setShowToast = Object(store["a" /* default */ ])(setShowToastZu);
                    var setAllWSData = searchStore(searchModal_setAllWSDataZu);
                    var searchModalOpen = searchStore(searchModalOpenZu);
                    var closeSearchModal = searchStore(searchModal_closeSearchModalZu);
                    var openSearchModal = searchStore(openSearchModalZu);
                    var hideSearchModal = searchStore(hideSearchModalZu);
                    var showWorkspaceEmoji = Object(persistStore["a" /* default */ ])(showWorkspaceEmojiZu);
                    var shortcutOpenWorkspacePicker = Object(persistStore["a" /* default */ ])(shortcutOpenWorkspacePickerZu);
                    var isUsingMac = ((_navigator = navigator) === null || _navigator === void 0 ? void 0 : (_navigator$userAgentD = _navigator.userAgentData) === null || _navigator$userAgentD === void 0 ? void 0 : (_navigator$userAgentD2 = _navigator$userAgentD.platform) === null || _navigator$userAgentD2 === void 0 ? void 0 : _navigator$userAgentD2.indexOf('macOS')) >= 0;
                    var searchShortcut = isUsingMac ? 'cmd+k' : 'ctrl+shift+k';
                    if (shortcutOpenWorkspacePicker) { searchShortcut = shortcutOpenWorkspacePicker; } Object(dist_web["a" /* useHotkeys */ ])(searchShortcut, function() { return openSearchModal(); }, {}, []);
                    var formattedShortcut = Object(shortcutRecorder["b" /* formatLocalStorageValue */ ])(searchShortcut, isUsingMac);
                    var initialRef = react_default.a.useRef();
                    var _useState31 = Object(react["useState"])(false),
                        _useState32 = Object(slicedToArray["a" /* default */ ])(_useState31, 2),
                        loaded = _useState32[0],
                        setLoaded = _useState32[1]; //Colormodestuff
                    var _useColorMode5 = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                        colorMode = _useColorMode5.colorMode;
                    var color = { light: '#FFF', dark: '#262A2D' };
                    var text = { light: '#1A202C', dark: '#FFF' };
                    var iconColor = { light: 'gray.700', dark: '#B3BAC6' };
                    var spinnerBg = { light: 'gray.200', dark: 'gray.600' };
                    var buttonBg = { light: 'gray.50', dark: '#41484F' };
                    var buttonBgActive = { light: 'gray.300', dark: '#41484F' };
                    var hoverMainButton = { light: '#FFF', dark: '#32363A' };
                    var mainButtonShadow = { light: '0 2px 6px 0 rgba(142,149,173,0.50), inset 1px 1px 1px 0 rgba(255,255,255,0.81), inset -1px -1px 1px 0 #E2E4E9', dark: '0 2px 6px 0 rgba(3,4,5,0.40), inset 1px 1px 2px 0 rgba(154,160,164,0.40), inset -1px -1px 2px 0 #2A2F34' };
                    var _useState33 = Object(react["useState"])(''),
                        _useState34 = Object(slicedToArray["a" /* default */ ])(_useState33, 2),
                        filterText = _useState34[0],
                        setFilterText = _useState34[1];
                    var clearSearch = function clearSearch() { setFilterText(''); };
                    var onCloseMiddleware = function onCloseMiddleware() { closeSearchModal();
                        setFilterText(''); };
                    var allWSloaded = Object(react["useRef"])(false);
                    var setAllWSloaded = function setAllWSloaded(value) { allWSloaded.current = value; };
                    var fetchAllWS = function fetchAllWS() { if (allWSloaded.current === true) { return; } setAllWSloaded(true);
                        chrome.runtime.sendMessage({ msg: 'fetchAllWS' }, function(resp) { if (resp.msg === 'success') { var allWSdata = resp.allWSdata;
                                setAllWSData(allWSdata); } else { setAllWSloaded(false);
                                setShowToast('Could not fetch all workspaces', 'Try reloading', 'error'); } }); }; //Bryt ut fetchAllWS logik -> passa ner till deny i invite och hämta igen när detta händer
                    var wsModalData = userState === null || userState === void 0 ? void 0 : (_userState$workspaces = userState.workspaces) === null || _userState$workspaces === void 0 ? void 0 : _userState$workspaces.filter(function(target) { return target.id === currentWSid || false; })[0];
                    Object(react["useEffect"])(function() { if (wsModalData) { var emojiToShow = wsModalData.emoji.length > 10 ? ' ◩ ' : wsModalData.emoji; var title = 'Cat in Action: ' + ' ' + '(🤖,⏱,💰)' ;
                            document.title = title; } }, [wsModalData]);
                    var finalRef = react_default.a.useRef();
                    return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Tooltip["a" /* default */ ], {
                        closeOnClick: true //isOpen={!searchModalOpen}
                            ,
                        zIndex: "100000",
                        rounded: "4px",
                        placement: "bottom",
                        label: react_default.a.createElement(Box["a" /* default */ ], { p: "2px" }, react_default.a.createElement(Flex["a" /* default */ ], { fontWeight: "500", fontSize: "13px", w: "100%", textAlign: "center" }, react_default.a.createElement(Text["a" /* default */ ], { style: { opacity: '0.65' } }, "Current:"), ' ', !showWorkspaceEmoji && ((wsModalData === null || wsModalData === void 0 ? void 0 : (_wsModalData$emoji = wsModalData.emoji) === null || _wsModalData$emoji === void 0 ? void 0 : _wsModalData$emoji.length) > 10 ? react_default.a.createElement(Image["a" /* default */ ], {
                            src: wsModalData === null || wsModalData === void 0 ? void 0 : wsModalData.emoji,
                            boxSize: "16px",
                            minW: "16px",
                            maxW: "16px",
                            maxH: "16px",
                            overflow: "hidden",
                            rounded: "2px",
                            mt: "2px",
                            border: "none",
                            mx: "4px" //ml="4px"
                        }) : react_default.a.createElement(Text["a" /* default */ ], { fontSize: "12px", ml: "4px", mr: "4px", mt: "1px" }, wsModalData === null || wsModalData === void 0 ? void 0 : wsModalData.emoji)), wsModalData === null || wsModalData === void 0 ? void 0 : wsModalData.name), react_default.a.createElement(Text["a" /* default */ ], { fontWeight: "500", fontSize: "12px", w: "100%", textAlign: "center", opacity: "0.8", letterSpacing: "0.34px" }, formattedShortcut))
                    }, react_default.a.createElement(Button["a" /* default */ ], {
                        ref: finalRef,
                        onClick: openSearchModal,
                        rounded: "7px",
                        height: "32px",
                        minWidth: "32px" //icon="collection"
                            ,
                        fontSize: "12px",
                        color: iconColor[colorMode],
                        px: "0px",
                        mr: "12px",
                        mb: "24px",
                        mt: "16px",
                        bg: searchModalOpen ? buttonBgActive[colorMode] : buttonBg[colorMode],
                        boxShadow: searchModalOpen ? '' : mainButtonShadow[colorMode],
                        _hover: { bg: searchModalOpen ? buttonBgActive[colorMode] : hoverMainButton[colorMode] },
                        _active: { transform: 'scale(0.925)' },
                        outline: "none",
                        transition: "transform 0.10s",
                        willChange: "transform" //pr={isLoadingUser || !showWorkspaceEmoji ? '' : '3px'}
                    }, isLoadingUser || !showWorkspaceEmoji ? react_default.a.createElement(Icon["a" /* default */ ], { name: "collection", fontSize: "20px" }) : (wsModalData === null || wsModalData === void 0 ? void 0 : (_wsModalData$emoji2 = wsModalData.emoji) === null || _wsModalData$emoji2 === void 0 ? void 0 : _wsModalData$emoji2.length) > 10 ? react_default.a.createElement(Image["a" /* default */ ], {
                        src: wsModalData === null || wsModalData === void 0 ? void 0 : wsModalData.emoji,
                        boxSize: "16px",
                        minW: "16px",
                        maxW: "16px",
                        maxH: "16px",
                        overflow: "hidden",
                        rounded: "4px",
                        border: "none" //ml="4px"
                    }) : react_default.a.createElement(Text["a" /* default */ ], null, wsModalData === null || wsModalData === void 0 ? void 0 : wsModalData.emoji))), react_default.a.createElement(Modal["a" /* Modal */ ], { onClose: onCloseMiddleware, isOpen: searchModalOpen, size: "994px", initialFocusRef: initialRef, finalFocusRef: finalRef }, react_default.a.createElement(Modal["g" /* ModalOverlay */ ], { style: { backdropFilter: 'blur(1px)' } }), react_default.a.createElement(framer_motion_es["b" /* AnimateSharedLayout */ ], null, react_default.a.createElement(Modal["d" /* ModalContent */ ], { opacity: hideSearchModal ? '0' : '1' /* {...styles} */ , rounded: "12px", bg: color[colorMode], height: filterText.length > 0 ? '92vh' : 'auto', maxH: '92vh', mt: "4vh", mb: "4vh" }, react_default.a.createElement(Modal["b" /* ModalBody */ ], { py: "24px", px: "0px", overflow: "hidden" }, react_default.a.createElement(InputGroup["a" /* default */ ], { size: "lg", mb: "16px", mx: "24px" }, react_default.a.createElement(InputElement["a" /* InputLeftElement */ ], { children: react_default.a.createElement(Icon["a" /* default */ ], { w: "2rem", ml: "0.4rem", name: "search", color: "gray.400" }) }), react_default.a.createElement(InputElement["b" /* InputRightElement */ ], null, filterText.length > 0 && react_default.a.createElement(Tooltip["a" /* default */ ], { label: "Clear input", zIndex: "10000" }, react_default.a.createElement(IconButton["a" /* default */ ], { icon: "small-close", bg: "transparent", h: "34px", maxW: "34px", mr: "8px", my: "auto", size: "md", color: iconColor[colorMode], onClick: clearSearch }))), react_default.a.createElement(Input["a" /* default */ ], { ref: initialRef, value: filterText, onChange: function onChange(e) { return setFilterText(e.target.value.toLocaleLowerCase()); }, placeholder: "Search title, url or text", variant: "filled", rounded: "6px", color: text[colorMode] })), filterText.length > 0 ? react_default.a.createElement(searchModal_SearchContent, { filterText: filterText, loaded: loaded, setLoaded: setLoaded, fetchAllWS: fetchAllWS }) : isLoadingUser ? react_default.a.createElement(Flex["a" /* default */ ], { w: "100%", h: "64px" }, react_default.a.createElement(Spinner["a" /* default */ ], { m: "auto", size: "24px", emptyColor: spinnerBg[colorMode], color: "blue.500" })) : react_default.a.createElement(workspacePicker, { fetchAllWS: fetchAllWS, setAllWSloaded: setAllWSloaded }))))));
                }; /* harmony default export */
                var searchModal = __webpack_exports__["default"] = (Object(react["memo"])(searchModal_SearchModal));

                /***/
            })

    }
]);