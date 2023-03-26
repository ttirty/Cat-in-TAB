(this["webpackJsonpdroptabs"] = this["webpackJsonpdroptabs"] || []).push([[6],{

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(242);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(44);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
/* harmony import */ var _stores_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1);
/* harmony import */ var _stores_persistStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(32);
/* harmony import */ var use_sound__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(51);
/* harmony import */ var _fx_selectFx_mp3__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(105);
/* harmony import */ var _fx_selectFx_mp3__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_fx_selectFx_mp3__WEBPACK_IMPORTED_MODULE_9__);
var fxStateZu=function fxStateZu(state){return state.fxState;};function ThemeSelector(){var _useColorMode=Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* useColorMode */ "b"])(),colorMode=_useColorMode.colorMode,toggleColorMode=_useColorMode.toggleColorMode;var fxState=Object(_stores_persistStore__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(fxStateZu);var _useSound=Object(use_sound__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(_fx_selectFx_mp3__WEBPACK_IMPORTED_MODULE_9___default.a),_useSound2=Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useSound,1),playSelectFx=_useSound2[0];var text={light:"#1A202C",dark:"#FFF"};var bg={light:"gray.200",dark:"#FFFFFF29"};var _useState=Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("3"),_useState2=Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useState,2),value=_useState2[0],setValue=_useState2[1];Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function(){var themeState=localStorage.getItem("themeState");if(themeState==="light"){setValue("1");}if(themeState==="dark"){setValue("2");}else return;},[]);var setDarkMode=function setDarkMode(value){setValue(value);if(value==="1"){localStorage.setItem("themeState","light");if(colorMode==="dark"){toggleColorMode();}}if(value==="2"){localStorage.setItem("themeState","dark");if(colorMode==="light"){toggleColorMode();}}if(value==="3"){localStorage.setItem("themeState","auto");checkCurrentMode();}if(fxState){playSelectFx();}};var checkCurrentMode=function checkCurrentMode(){if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches){if(colorMode==="light"){toggleColorMode();}else return;}else{if(colorMode==="dark"){toggleColorMode();}else return;}};return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"],{spacing:3,ml:"auto"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"],{size:"sm",bg:bg[colorMode],color:text[colorMode],transition:"0.1s cubic-bezier(0.22,0.61,0.36,1)",onClick:function onClick(){return setDarkMode("1");},boxShadow:value==="1"?"0px 0px 0px 2px #4299E1":"none"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"],{name:"sunIcon",color:colorMode==="light"?"gray.600":"#FFE300"})),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"],{size:"sm",bg:bg[colorMode],color:text[colorMode],transition:"0.1s cubic-bezier(0.22,0.61,0.36,1)",onClick:function onClick(){return setDarkMode("2");},boxShadow:value==="2"?"0px 0px 0px 2px #4299E1":"none"},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"],{name:"moonIcon",color:colorMode==="light"?"gray.600":"#FFE300"})),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"],{size:"sm",bg:bg[colorMode],color:text[colorMode],transition:"0.1s cubic-bezier(0.22,0.61,0.36,1)",onClick:function onClick(){return setDarkMode("3");},boxShadow:value==="3"?"0px 0px 0px 2px #4299E1":"none"},"Auto")));}/* harmony default export */ __webpack_exports__["a"] = (ThemeSelector);

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);




function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
/** @jsx jsx */






var ButtonGroup = Object(react__WEBPACK_IMPORTED_MODULE_4__["forwardRef"])(function (props, ref) {
  var size = props.size,
      variantColor = props.variantColor,
      variant = props.variant,
      isAttached = props.isAttached,
      _props$spacing = props.spacing,
      spacing = _props$spacing === void 0 ? 2 : _props$spacing,
      children = props.children,
      rest = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_2___default()(props, ["size", "variantColor", "variant", "isAttached", "spacing", "children"]);

  var validChildren = Object(_utils__WEBPACK_IMPORTED_MODULE_6__[/* cleanChildren */ "a"])(children);
  var clones = validChildren.map(function (child, index) {
    var isFirst = index === 0;
    var isLast = index === validChildren.length - 1;
    return Object(react__WEBPACK_IMPORTED_MODULE_4__["cloneElement"])(child, _objectSpread({
      size: size || child.props.size,
      variantColor: child.props.variantColor || variantColor,
      variant: child.props.variant || variant,
      _focus: {
        boxShadow: "outline",
        zIndex: 1
      }
    }, !isLast && !isAttached && {
      mr: spacing
    }, {}, isFirst && isAttached && {
      roundedRight: 0
    }, {}, isLast && isAttached && {
      roundedLeft: 0
    }, {}, !isLast && isAttached && {
      borderRight: 0
    }, {}, !isFirst && !isLast && isAttached && {
      rounded: 0
    }));
  });
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_3__[/* jsx */ "d"])(_Box__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    ref: ref,
    display: "inline-block"
  }, rest), clones);
});
/* harmony default export */ __webpack_exports__["a"] = (ButtonGroup);

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _ColorModeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18);
/* harmony import */ var _ControlBox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(109);
/* harmony import */ var _VisuallyHidden__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(71);


/** @jsx jsx */







var switchSizes = {
  sm: {
    width: "1.375rem",
    height: "0.75rem"
  },
  md: {
    width: "1.875rem",
    height: "1rem"
  },
  lg: {
    width: "2.875rem",
    height: "1.5rem"
  }
};
var Switch = Object(react__WEBPACK_IMPORTED_MODULE_3__["forwardRef"])(function (_ref, ref) {
  var id = _ref.id,
      name = _ref.name,
      value = _ref.value,
      ariaLabel = _ref["aria-label"],
      ariaLabelledBy = _ref["aria-labelledby"],
      color = _ref.color,
      defaultIsChecked = _ref.defaultIsChecked,
      isChecked = _ref.isChecked,
      size = _ref.size,
      isDisabled = _ref.isDisabled,
      isInvalid = _ref.isInvalid,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus,
      children = _ref.children,
      rest = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["id", "name", "value", "aria-label", "aria-labelledby", "color", "defaultIsChecked", "isChecked", "size", "isDisabled", "isInvalid", "onChange", "onBlur", "onFocus", "children"]);

  var _useColorMode = Object(_ColorModeProvider__WEBPACK_IMPORTED_MODULE_5__[/* useColorMode */ "b"])(),
      colorMode = _useColorMode.colorMode;

  var width = switchSizes[size] && switchSizes[size]["width"];
  var height = switchSizes[size] && switchSizes[size]["height"];
  var stylesProps = {
    rounded: "full",
    justifyContent: "flex-start",
    width: width,
    height: height,
    bg: colorMode === "dark" ? "whiteAlpha.400" : "gray.300",
    boxSizing: "content-box",
    p: "2px",
    _checked: {
      bg: color + ".500"
    },
    _child: {
      transform: "translateX(0)"
    },
    _checkedAndChild: {
      transform: "translateX(calc(" + width + " - " + height + "))"
    },
    _focus: {
      boxShadow: "outline"
    },
    _hover: {
      cursor: "pointer"
    },
    _checkedAndHover: {
      cursor: "pointer"
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    }
  };
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "d"])(_Box__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    as: "label",
    display: "inline-block",
    verticalAlign: "middle"
  }, rest), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "d"])(_VisuallyHidden__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    as: "input",
    type: "checkbox",
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    id: id,
    ref: ref,
    name: name,
    value: value,
    "aria-invalid": isInvalid,
    defaultChecked: defaultIsChecked,
    onChange: onChange,
    onBlur: onBlur,
    onFocus: onFocus,
    checked: isChecked,
    disabled: isDisabled
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "d"])(_ControlBox__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], stylesProps, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_2__[/* jsx */ "d"])(_Box__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    bg: "white",
    transition: "transform 250ms",
    rounded: "full",
    size: height
  })));
});
Switch.displayName = "Switch";
Switch.defaultProps = {
  color: "blue",
  size: "md"
};
/* harmony default export */ __webpack_exports__["a"] = (Switch);

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);
/* harmony import */ var _Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(247);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(225);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(43);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(23);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(22);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(20);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(44);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(37);
/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(103);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(27);
/* harmony import */ var _stores_store__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(1);
/* harmony import */ var _stores_persistStore__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(32);
/* harmony import */ var use_sound__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(51);
/* harmony import */ var _fx_addFx_mp3__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(87);
/* harmony import */ var _fx_addFx_mp3__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_fx_addFx_mp3__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _fx_removeFx_mp3__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(108);
/* harmony import */ var _fx_removeFx_mp3__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_fx_removeFx_mp3__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _fx_selectFx_mp3__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(105);
/* harmony import */ var _fx_selectFx_mp3__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_fx_selectFx_mp3__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _themeSelector__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(237);
var fxStateZu=function fxStateZu(state){return state.fxState;};var toggleFxStateZu=function toggleFxStateZu(state){return state.toggleFxState;};function ColorModeExample(){var _useColorMode=Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* useColorMode */ "b"])(),colorMode=_useColorMode.colorMode,toggleColorMode=_useColorMode.toggleColorMode;var fxState=Object(_stores_persistStore__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"])(fxStateZu);var _useSound=Object(use_sound__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"])(_fx_selectFx_mp3__WEBPACK_IMPORTED_MODULE_21___default.a),_useSound2=Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_useSound,1),playSelectFx=_useSound2[0];var toggleDarkMode=function toggleDarkMode(){toggleColorMode();if(fxState){playSelectFx();}};return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"],{ml:"auto",size:"md",onChange:function onChange(){return toggleDarkMode();},isChecked:colorMode==='light'?false:true}));}function timeout(delay){return new Promise(function(res){return setTimeout(res,delay);});}var Step1=function Step1(_ref){var cancelTour=_ref.cancelTour,setCurrentStep=_ref.setCurrentStep;var fxState=Object(_stores_persistStore__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"])(fxStateZu);var toggleFxState=Object(_stores_persistStore__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"])(toggleFxStateZu);//Sound
var _useSound3=Object(use_sound__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"])(_fx_addFx_mp3__WEBPACK_IMPORTED_MODULE_19___default.a),_useSound4=Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_useSound3,1),playHappyBell=_useSound4[0];var _useSound5=Object(use_sound__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"])(_fx_removeFx_mp3__WEBPACK_IMPORTED_MODULE_20___default.a),_useSound6=Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_useSound5,1),playUndone=_useSound6[0];Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function(){if(fxState){playHappyBell();}else{playUndone();}},[fxState]);//Colorstuff
var _useColorMode2=Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* useColorMode */ "b"])(),colorMode=_useColorMode2.colorMode,toggleColorMode=_useColorMode2.toggleColorMode;var color={light:'#FFF',dark:'#262A2D'};var icon={light:'gray.500',dark:'#A1A2A4'};var text={light:'#1A202C',dark:'#FFF'};var subTitle={light:'gray.600',dark:'#A1A2A4'};var ctaRef=react__WEBPACK_IMPORTED_MODULE_3___default.a.useRef();var MotionContent=framer_motion__WEBPACK_IMPORTED_MODULE_15__[/* motion */ "c"].custom(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[/* AlertDialogContent */ "b"]);return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[/* AlertDialog */ "a"],{leastDestructiveRef:ctaRef,onClose:cancelTour,isOpen:true,size:"md",isCentered:true,closeOnOverlayClick:false},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* ModalOverlay */ "g"],{style:{backdropFilter:'blur(1px)'}}),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(MotionContent/* initial={{
            opacity: 0,
            scale: 0.8,
            y: 30,
            transformOrigin: "50% 100%",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transformOrigin: "50% 0%",
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            y: 30,
            transformOrigin: "50% 100%",
          }}
          transition={{ duration: 0.2 }} */,{rounded:"8px",bg:color[colorMode],mt:"-2%",border:colorMode==='dark'?'none':''},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* ModalHeader */ "f"],{pt:"2.5rem",pb:"0px"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{mt:"4px",mb:"4px",letterSpacing:"0.94px",color:subTitle[colorMode],fontWeight:"500",fontSize:"14px"},"STEP 1/7"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{color:text[colorMode],fontSize:"24px",fontWeight:"700"},"Welcome to tabExtend")),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* ModalCloseButton */ "c"],{transition:"all 0s",top:"1.25rem",right:"1.5rem",color:icon[colorMode]}),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* ModalBody */ "b"],null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{fontSize:"16px",mt:"8px",color:text[colorMode]},"We begin with a quick tour. Let's start with preferences (can also be changed later in settings)."),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"],{alignItems:"center",mt:"32px",mb:"24px"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"],{name:fxState?'soundOn':'soundOff',color:colorMode==='light'?'gray.600':'#FFF',size:"20px",mr:"16px",mt:"-4px"}),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{color:text[colorMode],fontSize:"md",fontWeight:"medium",mt:"-4px"},"Sound Effects"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"],{ml:"auto",size:"md",onChange:function onChange(){return toggleFxState();},isChecked:fxState?true:false})),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"],{alignItems:"center",mt:"24px",mb:"48px"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"],{name:"ThemeIcon",color:colorMode==='light'?'gray.600':'#FFF',size:"20px",mr:"16px",mt:"-4px"}),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{color:text[colorMode],fontSize:"md",fontWeight:"medium",mt:"-4px"},"Theme"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_themeSelector__WEBPACK_IMPORTED_MODULE_22__[/* default */ "a"],null))),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* ModalFooter */ "e"],null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"],{onClick:function onClick(){return cancelTour();},transition:"all 0s",color:text[colorMode]},"Skip tour"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"],{ref:ctaRef,onClick:function onClick(){setCurrentStep(2);},ml:3,fontSize:"16px",minWidth:"40%",color:"#FFF",backgroundImage:"linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)",_hover:{backgroundImage:'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)',boxShadow:'0 8px 16px -8px rgba(49, 144, 255,0.4)'},boxShadow:"0 12px 18x -10px rgba(49, 144, 255,0.35)",transition:"all 0.12s cubic-bezier(.374,.019,.035,1.861)"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"],{name:"arrowCircleRight",mr:"12px",ml:"-12px",fontSize:"18px"}),"Next")))));};var Step2=function Step2(_ref2){var cancelTour=_ref2.cancelTour,setCurrentStep=_ref2.setCurrentStep,currentStep=_ref2.currentStep;var initialFocusRef=react__WEBPACK_IMPORTED_MODULE_3___default.a.useRef();//Colorstuff
var _useColorMode3=Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* useColorMode */ "b"])(),colorMode=_useColorMode3.colorMode,toggleColorMode=_useColorMode3.toggleColorMode;var color={light:'#FFF',dark:'#262A2D'};var icon={light:'gray.500',dark:'#A1A2A4'};var text={light:'#1A202C',dark:'#FFF'};var subTitle={light:'gray.600',dark:'#A1A2A4'};//await fix to get popover to right pos.
var _useState=Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),_useState2=Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_useState,2),popOpen=_useState2[0],setPopOpen=_useState2[1];var openPop=/*#__PURE__*/function(){var _ref3=Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(/*#__PURE__*/_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(){return _Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return timeout(100);case 2:setPopOpen(true);case 3:case"end":return _context.stop();}}},_callee);}));return function openPop(){return _ref3.apply(this,arguments);};}();Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function(){openPop();},[currentStep]);return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment,null,currentStep===2&&react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* ModalOverlay */ "g"],{bg:"transparent"//pointerEvents="none" /* onClick={() => cancelTour()} */
},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"],{h:"100%",w:"80px",position:"absolute",top:"0",left:"0",bg:"transparent",opacity:"0.3",display:"flex",alignItems:"center"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* Popover */ "a"],{isOpen:popOpen,zIndex:"3000",placement:"left",usePortal:true,initialFocusRef:initialFocusRef,closeOnBlur:false,maxWidth:"420px",onClose:function onClose(){return cancelTour();}},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverTrigger */ "h"],null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"],{zIndex:"1000",mb:"84px",bg:"transparent",color:"transparent",w:"100px",h:"10px"})),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverContent */ "e"],{rounded:"8px",w:"420px",p:"8px",maxWidth:"420px",bg:color[colorMode],zIndex:4,boxShadow:"0 12px 34px -10px rgba(0,0,0,0.50)",borderColor:"#ffffff25"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverHeader */ "g"],{pt:4,fontWeight:"bold",border:"0"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{mt:"16px",letterSpacing:"0.94px",color:subTitle[colorMode],fontWeight:"500"},"STEP 2/7"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{w:"355px",fontSize:"20px",mt:"4px",fontWeight:"500",color:text[colorMode]},"In the left sidebar, all your open tabs in this window is shown.")),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverArrow */ "b"],null),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverCloseButton */ "d"],{transition:"all 0s",top:"12px",right:"12px",color:icon[colorMode]}),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverBody */ "c"],null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"],{mt:"8px"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"],{ml:"auto",transition:"all 0s",color:text[colorMode],onClick:function onClick(){return cancelTour();}},"Skip tour"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"],{ref:initialFocusRef,onClick:function onClick(){setCurrentStep(3);},ml:3,fontSize:"16px",minWidth:"40%",color:"#FFF",backgroundImage:"linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)",_hover:{backgroundImage:'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)',boxShadow:'0 8px 16px -8px rgba(49, 144, 255,0.4)'},boxShadow:"0 12px 18x -10px rgba(49, 144, 255,0.35)",transition:"all 0.12s cubic-bezier(.374,.019,.035,1.861)"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"],{name:"arrowCircleRight",mr:"12px",ml:"-12px",fontSize:"18px"}),"Next")))))),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"],{left:"80px",position:"absolute",top:"0",h:"100%",w:"100%",bg:"rgba(0,0,0,0.6)",style:{backdropFilter:'blur(1px)'}})));};var Step3=function Step3(_ref4){var cancelTour=_ref4.cancelTour,setCurrentStep=_ref4.setCurrentStep,currentStep=_ref4.currentStep;var initialFocusRef=react__WEBPACK_IMPORTED_MODULE_3___default.a.useRef();//Colorstuff
var _useColorMode4=Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* useColorMode */ "b"])(),colorMode=_useColorMode4.colorMode,toggleColorMode=_useColorMode4.toggleColorMode;var color={light:'#FFF',dark:'#262A2D'};var icon={light:'gray.500',dark:'#A1A2A4'};var text={light:'#1A202C',dark:'#FFF'};var subTitle={light:'gray.600',dark:'#A1A2A4'};var _useState3=Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),_useState4=Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_useState3,2),popOpen=_useState4[0],setPopOpen=_useState4[1];var openPop=/*#__PURE__*/function(){var _ref5=Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(/*#__PURE__*/_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(){return _Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.next=2;return timeout(50);case 2:setPopOpen(true);case 3:case"end":return _context2.stop();}}},_callee2);}));return function openPop(){return _ref5.apply(this,arguments);};}();Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function(){openPop();},[currentStep]);return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* ModalOverlay */ "g"],{bg:"transparent"//pointerEvents="none" /* onClick={() => cancelTour()} */
},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"],{left:"0",position:"absolute",top:"0",h:"100%",w:"100%",bg:"rgba(0,0,0,0.6)",style:{backdropFilter:'blur(1px)'}}),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"],{minHeight:"calc(80vh - 164px)",h:"84%",w:"240px",width:"21.850vw",borderRadius:"16px",position:"absolute",top:"96px",left:"118px",bg:"rgb(65, 225, 139, 0.1)",mb:"64px",display:"flex",alignItems:"center",border:"2px solid #41E18B"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* Popover */ "a"],{isOpen:popOpen,onClose:function onClose(){return cancelTour();},zIndex:"3000",placement:"left",usePortal:true,initialFocusRef:initialFocusRef,closeOnBlur:false,maxWidth:"460px"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverTrigger */ "h"],null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"],{zIndex:"1000",mb:"168px",bg:"transparent",color:"transparent",w:"20vw",h:"10px"})),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverContent */ "e"],{rounded:"8px",w:"460px",p:"8px",maxWidth:"460px",bg:color[colorMode],zIndex:4,boxShadow:"0 12px 34px -10px rgba(0,0,0,0.50)",borderColor:"#ffffff25"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverHeader */ "g"],{pt:4,fontWeight:"bold",border:"0"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{mt:"16px",letterSpacing:"0.94px",color:subTitle[colorMode],fontWeight:"500"},"STEP 3/7"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{w:"395px",fontSize:"20px",mt:"4px",fontWeight:"500",color:text[colorMode]},"Drag and drop tabs from the sidebar into the drop-zone to save and close them.")),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverArrow */ "b"],null),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverCloseButton */ "d"],{transition:"all 0s",top:"12px",right:"12px",color:icon[colorMode]}),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverBody */ "c"],null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"],{mt:"8px"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"],{ml:"auto",onClick:function onClick(){return cancelTour();},transition:"all 0s",color:text[colorMode]},"Skip tour"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"],{ref:initialFocusRef,onClick:function onClick(){setCurrentStep(4);},ml:3,fontSize:"16px",minWidth:"40%",color:"#FFF",backgroundImage:"linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)",_hover:{backgroundImage:'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)',boxShadow:'0 8px 16px -8px rgba(49, 144, 255,0.4)'},boxShadow:"0 12px 18x -10px rgba(49, 144, 255,0.35)",transition:"all 0.12s cubic-bezier(.374,.019,.035,1.861)"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"],{name:"arrowCircleRight",mr:"12px",ml:"-12px",fontSize:"18px"}),"Next")))))),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"],{left:"20vw",position:"absolute",top:"0",h:"100%",w:"100%"//bg="rgba(0,0,0,0.6)"
//style={{ backdropFilter: "blur(1px)" }}
})));};var Step4=function Step4(_ref6){var cancelTour=_ref6.cancelTour,setCurrentStep=_ref6.setCurrentStep,currentStep=_ref6.currentStep;var initialFocusRef=react__WEBPACK_IMPORTED_MODULE_3___default.a.useRef();//Colorstuff
var _useColorMode5=Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* useColorMode */ "b"])(),colorMode=_useColorMode5.colorMode,toggleColorMode=_useColorMode5.toggleColorMode;var color={light:'#FFF',dark:'#262A2D'};var icon={light:'gray.500',dark:'#A1A2A4'};var text={light:'#1A202C',dark:'#FFF'};var subTitle={light:'gray.600',dark:'#A1A2A4'};var buttonBg={light:'gray.50',dark:'#41484F'};var mainButtonShadow={light:'0 2px 6px 0 rgba(142,149,173,0.50), inset 1px 1px 1px 0 rgba(255,255,255,0.81), inset -1px -1px 1px 0 #E2E4E9',dark:'0 2px 6px 0 rgba(3,4,5,0.40), inset 1px 1px 1px 0 rgba(154,160,164,0.40), inset -1px -1px 1px 0 #2A2F34'};var iconColor={light:'gray.700',dark:'#B3BAC6'};var _useState5=Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),_useState6=Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_useState5,2),popOpen=_useState6[0],setPopOpen=_useState6[1];var openPop=/*#__PURE__*/function(){var _ref7=Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(/*#__PURE__*/_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(){return _Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:_context3.next=2;return timeout(50);case 2:setPopOpen(true);case 3:case"end":return _context3.stop();}}},_callee3);}));return function openPop(){return _ref7.apply(this,arguments);};}();Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function(){openPop();},[currentStep]);return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* ModalOverlay */ "g"],{bg:"transparent"//pointerEvents="none" /* onClick={() => cancelTour()} */
},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"],{h:"100%",w:"100%",position:"absolute",top:"0",left:"0",display:"flex",bg:"rgba(0,0,0,0.6)",style:{backdropFilter:'blur(1px)'}//alignItems="center"
},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* Popover */ "a"],{isOpen:popOpen,onClose:function onClose(){return cancelTour();},zIndex:"3000",placement:"left",usePortal:true,initialFocusRef:initialFocusRef,closeOnBlur:false,maxWidth:"420px"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverTrigger */ "h"],null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"],{mt:"32px",ml:"24px",zIndex:"1000",display:"flex",alignItems:"center"//isActive={isOpen}
/* onClick={() => setMenuIsOpen(true)} */,rounded:"7px",height:"32px",minWidth:"32px",px:"0px",bg:buttonBg[colorMode],boxShadow:mainButtonShadow[colorMode],outline:"none",transition:"transform 0.10s"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"],{name:"chevronDown",m:"auto",fontSize:"24px",color:iconColor[colorMode]}))),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverContent */ "e"],{rounded:"8px",w:"420px",p:"8px",maxWidth:"420px",bg:color[colorMode],zIndex:4,boxShadow:"0 12px 34px -10px rgba(0,0,0,0.50)",borderColor:"#ffffff25"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverHeader */ "g"],{pt:4,fontWeight:"bold",border:"0"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{mt:"16px",letterSpacing:"0.94px",color:subTitle[colorMode],fontWeight:"500"},"STEP 4/7"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{w:"355px",fontSize:"20px",mt:"4px",fontWeight:"500",color:text[colorMode]},"To save and close all tabs at once, choose an option in the top left menu.")),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverArrow */ "b"],null),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverCloseButton */ "d"],{transition:"all 0s",top:"12px",right:"12px",color:icon[colorMode]}),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverBody */ "c"],null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"],{mt:"8px"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"],{ml:"auto",onClick:function onClick(){return cancelTour();},transition:"all 0s",color:text[colorMode]},"Skip tour"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"],{ref:initialFocusRef,onClick:function onClick(){setCurrentStep(5);},ml:3,fontSize:"16px",minWidth:"40%",color:"#FFF",backgroundImage:"linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)",_hover:{backgroundImage:'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)',boxShadow:'0 8px 16px -8px rgba(49, 144, 255,0.4)'},boxShadow:"0 12px 18x -10px rgba(49, 144, 255,0.35)",transition:"all 0.12s cubic-bezier(.374,.019,.035,1.861)"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"],{name:"arrowCircleRight",mr:"12px",ml:"-12px",fontSize:"18px"}),"Next"))))))));};var Step5=function Step5(_ref8){var cancelTour=_ref8.cancelTour,setCurrentStep=_ref8.setCurrentStep,currentStep=_ref8.currentStep;var initialFocusRef=react__WEBPACK_IMPORTED_MODULE_3___default.a.useRef();//Colorstuff
var _useColorMode6=Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* useColorMode */ "b"])(),colorMode=_useColorMode6.colorMode,toggleColorMode=_useColorMode6.toggleColorMode;var color={light:'#FFF',dark:'#262A2D'};var icon={light:'gray.500',dark:'#A1A2A4'};var text={light:'#1A202C',dark:'#FFF'};var subTitle={light:'gray.600',dark:'#A1A2A4'};var buttonBg={light:'gray.50',dark:'#41484F'};var mainButtonShadow={light:'0 2px 6px 0 rgba(142,149,173,0.50), inset 1px 1px 1px 0 rgba(255,255,255,0.81), inset -1px -1px 1px 0 #E2E4E9',dark:'0 2px 6px 0 rgba(3,4,5,0.40), inset 1px 1px 1px 0 rgba(154,160,164,0.40), inset -1px -1px 1px 0 #2A2F34'};var iconColor={light:'gray.700',dark:'#B3BAC6'};var _useState7=Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),_useState8=Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_useState7,2),popOpen=_useState8[0],setPopOpen=_useState8[1];var openPop=/*#__PURE__*/function(){var _ref9=Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(/*#__PURE__*/_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(){return _Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:_context4.next=2;return timeout(50);case 2:setPopOpen(true);case 3:case"end":return _context4.stop();}}},_callee4);}));return function openPop(){return _ref9.apply(this,arguments);};}();Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function(){openPop();},[currentStep]);return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* ModalOverlay */ "g"],{bg:"transparent"//pointerEvents="none" /* onClick={() => cancelTour()} */
},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"],{h:"100%",w:"100%",position:"absolute",top:"0",left:"0",display:"flex"//bg="rgba(0,0,0,0.6)"
//style={{ backdropFilter: "blur(1px)" }}
//alignItems="center"
},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* Popover */ "a"],{isOpen:popOpen,onClose:function onClose(){return cancelTour();},zIndex:"3000",placement:"bottom",usePortal:true,initialFocusRef:initialFocusRef,closeOnBlur:false,maxWidth:"420px"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverTrigger */ "h"],null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"],{position:"absolute",rounded:"8px",top:"32px",left:"116px",width:"479px",height:"32px",boxShadow:"0 0 0 9999px rgba(0,0,0,0.6)"})),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverContent */ "e"],{rounded:"8px",w:"420px",p:"8px",maxWidth:"420px",bg:color[colorMode],zIndex:4,boxShadow:"0 12px 34px -10px rgba(0,0,0,0.50)",borderColor:"#ffffff25"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverHeader */ "g"],{pt:4,fontWeight:"bold",border:"0"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{mt:"16px",letterSpacing:"0.94px",color:subTitle[colorMode],fontWeight:"500"},"STEP 5/7"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{w:"355px",fontSize:"20px",mt:"4px",fontWeight:"500",color:text[colorMode]},"Groups can be sorted into categories and workspaces.")),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverArrow */ "b"],null),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverCloseButton */ "d"],{transition:"all 0s",top:"12px",right:"12px",color:icon[colorMode]}),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverBody */ "c"],null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"],{mt:"8px"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"],{ml:"auto",onClick:function onClick(){return cancelTour();},transition:"all 0s",color:text[colorMode]},"Skip tour"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"],{ref:initialFocusRef,onClick:function onClick(){setCurrentStep(6);},ml:3,fontSize:"16px",minWidth:"40%",color:"#FFF",backgroundImage:"linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)",_hover:{backgroundImage:'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)',boxShadow:'0 8px 16px -8px rgba(49, 144, 255,0.4)'},boxShadow:"0 12px 18x -10px rgba(49, 144, 255,0.35)",transition:"all 0.12s cubic-bezier(.374,.019,.035,1.861)"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"],{name:"arrowCircleRight",mr:"12px",ml:"-12px",fontSize:"18px"}),"Next"))))))));};var Step6=function Step6(_ref10){var cancelTour=_ref10.cancelTour,setCurrentStep=_ref10.setCurrentStep,currentStep=_ref10.currentStep;var initialFocusRef=react__WEBPACK_IMPORTED_MODULE_3___default.a.useRef();//Colorstuff
var _useColorMode7=Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* useColorMode */ "b"])(),colorMode=_useColorMode7.colorMode,toggleColorMode=_useColorMode7.toggleColorMode;var color={light:'#FFF',dark:'#262A2D'};var icon={light:'gray.500',dark:'#A1A2A4'};var text={light:'#1A202C',dark:'#FFF'};var subTitle={light:'gray.600',dark:'#A1A2A4'};var buttonBg={light:'gray.50',dark:'#41484F'};var mainButtonShadow={light:'0 2px 6px 0 rgba(142,149,173,0.50), inset 1px 1px 1px 0 rgba(255,255,255,0.81), inset -1px -1px 1px 0 #E2E4E9',dark:'0 2px 6px 0 rgba(3,4,5,0.40), inset 1px 1px 1px 0 rgba(154,160,164,0.40), inset -1px -1px 1px 0 #2A2F34'};var iconColor={light:'gray.700',dark:'#B3BAC6'};var _useState9=Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),_useState10=Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_useState9,2),popOpen=_useState10[0],setPopOpen=_useState10[1];var openPop=/*#__PURE__*/function(){var _ref11=Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(/*#__PURE__*/_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(){return _Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:_context5.next=2;return timeout(50);case 2:setPopOpen(true);case 3:case"end":return _context5.stop();}}},_callee5);}));return function openPop(){return _ref11.apply(this,arguments);};}();Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function(){openPop();},[currentStep]);return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* ModalOverlay */ "g"],{bg:"transparent"//pointerEvents="none" /* onClick={() => cancelTour()} */
},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"],{h:"100%",w:"100%",position:"absolute",top:"0",left:"0",display:"flex"//bg="rgba(0,0,0,0.6)"
//style={{ backdropFilter: "blur(1px)" }}
//alignItems="center"
},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* Popover */ "a"],{isOpen:popOpen,onClose:function onClose(){return cancelTour();},zIndex:"3000",placement:"bottom",usePortal:true,initialFocusRef:initialFocusRef,closeOnBlur:false,maxWidth:"420px"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverTrigger */ "h"],null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"],{position:"absolute",rounded:"8px",top:"32px",right:"40px",width:"128px",height:"34px",boxShadow:"0 0 0 9999px rgba(0,0,0,0.6)"})),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverContent */ "e"],{rounded:"8px",w:"420px",p:"8px",maxWidth:"420px",bg:color[colorMode],zIndex:4,boxShadow:"0 12px 34px -10px rgba(0,0,0,0.50)",borderColor:"#ffffff25"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverHeader */ "g"],{pt:4,fontWeight:"bold",border:"0"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{mt:"16px",letterSpacing:"0.94px",color:subTitle[colorMode],fontWeight:"500"},"STEP 6/7"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{w:"355px",fontSize:"20px",mt:"4px",fontWeight:"500",color:text[colorMode]},"In the top right corner you'll find:"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{fontSize:"16px",mt:"8px",fontWeight:"500",color:text[colorMode]},"\u2022 Edit categories and other settings"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{fontSize:"16px",mt:"8px",fontWeight:"500",color:text[colorMode]},"\u2022 Share workspace"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{fontSize:"16px",mt:"8px",fontWeight:"500",color:text[colorMode]},"\u2022 Account details")),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverArrow */ "b"],null),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverCloseButton */ "d"],{transition:"all 0s",top:"12px",right:"12px",color:icon[colorMode]}),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[/* PopoverBody */ "c"],null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"],{mt:"8px"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"],{ml:"auto",onClick:function onClick(){return cancelTour();},transition:"all 0s",color:text[colorMode]},"Skip tour"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"],{ref:initialFocusRef,onClick:function onClick(){setCurrentStep(7);},ml:3,fontSize:"16px",minWidth:"40%",color:"#FFF",backgroundImage:"linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)",_hover:{backgroundImage:'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)',boxShadow:'0 8px 16px -8px rgba(49, 144, 255,0.4)'},boxShadow:"0 12px 18x -10px rgba(49, 144, 255,0.35)",transition:"all 0.1s cubic-bezier(.374,.019,.035,1.861)"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"],{name:"arrowCircleRight",mr:"12px",ml:"-12px",fontSize:"18px"}),"Next"))))))));};var Step7=function Step7(_ref12){var cancelTour=_ref12.cancelTour,setCurrentStep=_ref12.setCurrentStep;//Colorstuff
var _useColorMode8=Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* useColorMode */ "b"])(),colorMode=_useColorMode8.colorMode,toggleColorMode=_useColorMode8.toggleColorMode;var color={light:'#FFF',dark:'#262A2D'};var icon={light:'gray.600',dark:'#A1A2A4'};var text={light:'#1A202C',dark:'#FFF'};var subTitle={light:'gray.600',dark:'#A1A2A4'};var ctaRef=react__WEBPACK_IMPORTED_MODULE_3___default.a.useRef();var MotionContent=framer_motion__WEBPACK_IMPORTED_MODULE_15__[/* motion */ "c"].custom(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[/* AlertDialogContent */ "b"]);return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[/* AlertDialog */ "a"],{leastDestructiveRef:ctaRef,onClose:cancelTour,isOpen:true,size:"md",isCentered:true},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* ModalOverlay */ "g"],{style:{backdropFilter:'blur(1px)'}}),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(MotionContent,{rounded:"8px",bg:color[colorMode],mt:"-2%",order:colorMode==='dark'?'none':''},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* ModalHeader */ "f"],{pt:"2.5rem",pb:"0px"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{mt:"4px",mb:"4px",letterSpacing:"0.94px",color:subTitle[colorMode],fontWeight:"500",fontSize:"14px"},"STEP 7/7"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{color:text[colorMode],fontSize:"24px",fontWeight:"700"},"That's it! \uD83C\uDF89")),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* ModalCloseButton */ "c"],{transition:"all 0s",top:"1.25rem",right:"1.5rem",color:icon[colorMode]}),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* ModalBody */ "b"],null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],{fontSize:"16px",mt:"8px",mb:"12px",color:text[colorMode]},"Find more tips in our guide, including how to save text-snippets from websites, creating/sharing workspaces, multi-select, shortcuts, and more at:",' '),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"],{fontSize:"18px",color:text[colorMode],href:"https://www.tabextend.com/guide",target:"_blank",rel:"noopener noreferrer"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"],{mr:"8px",name:"externalLink",fontSize:"20px",color:icon[colorMode]}),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("u",null,"www.tabextend.com/guide"))),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* ModalFooter */ "e"],{mt:"12px"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"],null,react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"],{ml:"auto",onClick:function onClick(){return setCurrentStep(2);},color:text[colorMode]},"Retake tour"),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"],{ref:ctaRef,onClick:function onClick(){cancelTour();},ml:3,fontSize:"16px",minWidth:"40%",color:"#FFF",backgroundImage:"linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)",_hover:{backgroundImage:'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)',boxShadow:'0 8px 16px -8px rgba(49, 144, 255,0.4)'},boxShadow:"0 12px 18x -10px rgba(49, 144, 255,0.35)",transition:"all 0.12s cubic-bezier(.374,.019,.035,1.861)",pl:"32px",pr:"36px"},react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"],{name:"arrowCircleRight",mr:"8px",fontSize:"18px"}),"Done"))))));};var ProductTour=function ProductTour(_ref13){var showTour=_ref13.showTour,cancelTour=_ref13.cancelTour;//const showTourInitial = userState.userPlan === "tour";
//const [showTour, setShowTour] = useState(true);
var _useState11=Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(1),_useState12=Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_useState11,2),currentStep=_useState12[0],setCurrentStep=_useState12[1];var TOURSTEP={1:react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Step1,{cancelTour:cancelTour,setCurrentStep:setCurrentStep}),2:react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Step2,{cancelTour:cancelTour,setCurrentStep:setCurrentStep,currentStep:currentStep}),3:react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Step3,{cancelTour:cancelTour,setCurrentStep:setCurrentStep,currentStep:currentStep}),4:react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Step4,{cancelTour:cancelTour,setCurrentStep:setCurrentStep,currentStep:currentStep}),5:react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Step5,{cancelTour:cancelTour,setCurrentStep:setCurrentStep,currentStep:currentStep}),6:react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Step6,{cancelTour:cancelTour,setCurrentStep:setCurrentStep,currentStep:currentStep}),7:react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Step7,{cancelTour:cancelTour,setCurrentStep:setCurrentStep,currentStep:currentStep})};//Tour && (step[currentStep])
return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment,null,showTour&&TOURSTEP[currentStep]);};/* harmony default export */ __webpack_exports__["default"] = (ProductTour);

/***/ })

}]);