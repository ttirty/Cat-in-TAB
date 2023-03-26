(this["webpackJsonpdroptabs"] = this["webpackJsonpdroptabs"] || []).push([[9],{

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Images_EmptyState_Spaces_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(169);
/* harmony import */ var _Images_EmptyState_Spaces_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Images_EmptyState_Spaces_png__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Images_EmptyState_SpacesDark_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(170);
/* harmony import */ var _Images_EmptyState_SpacesDark_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Images_EmptyState_SpacesDark_png__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(167);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(23);
/* harmony import */ var _dropTabNewSpace__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(137);
/* harmony import */ var _stores_dndStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(11);
var beforeDragStartZu=function beforeDragStartZu(state){return state.beforeDragStart;};var EmptyStateContainer=function EmptyStateContainer(_ref){var hoverSide=_ref.hoverSide;var beforeDragStart=Object(_stores_dndStore__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(beforeDragStartZu);//Colorstuff
var _useColorMode=Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* useColorMode */ "b"])(),colorMode=_useColorMode.colorMode,toggleColorMode=_useColorMode.toggleColorMode;var emptyStateText={light:"gray.600",dark:"#FFF"};var bg={light:"#E2E4E9",dark:"#6D7073"};var _useState=Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),_useState2=Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useState,2),loaded=_useState2[0],setLoaded=_useState2[1];return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment,null,beforeDragStart?react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_dropTabNewSpace__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"],null):react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"],{flexDir:"column",m:"auto",alignItems:"center",pb:"84px",pointerEvents:"none",userSelect:"none",transform:hoverSide?"scale(0.94) translateX(-184px)":"",transition:"transform 0.14s cubic-bezier(0.77,0,0.18,1)"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"],null,react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"],{onLoad:function onLoad(){return setLoaded(true);},visibility:loaded?"visible":"hidden",src:colorMode==="light"?_Images_EmptyState_Spaces_png__WEBPACK_IMPORTED_MODULE_2___default.a:_Images_EmptyState_SpacesDark_png__WEBPACK_IMPORTED_MODULE_3___default.a,size:"245px",mb:"24px",borderStyle:"none",border:"0px",borderColor:"transparent",pointerEvents:"none",userSelect:"none"})),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]/* initial={{filter: "blur(4px)", opacity: "0", scale: 1.25}} animate={{filter: "blur(0px)", opacity: "0.4", scale: 1}} transition={{ duration: 1.2 }} */,{m:"auto",fontSize:"15px",color:emptyStateText[colorMode],letterSpacing:"1.38px",textAlign:"center",fontWeight:"bold",opacity:"0.5"},"EMPTY CATEGORY"),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{mt:"10px",fontSize:"16px",color:emptyStateText[colorMode],textAlign:"center",fontWeight:"medium",opacity:"0.4"},"Drag and drop tab for new group(Ctrl + G)")));};/* harmony default export */ __webpack_exports__["default"] = (EmptyStateContainer);

/***/ })

}]);