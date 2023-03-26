(this["webpackJsonpdroptabs"] = this["webpackJsonpdroptabs"] || []).push([[10],{

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
var objectWithoutPropertiesLoose = __webpack_require__(54);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = Object(objectWithoutPropertiesLoose["a" /* default */])(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./src/Components/menuRowMoveTo.js
var menuRowMoveTo = __webpack_require__(73);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/ColorModeProvider/index.js
var ColorModeProvider = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Accordion/index.js
var Accordion = __webpack_require__(226);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Box/index.js + 1 modules
var Box = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Icon/index.js
var Icon = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Text/index.js
var Text = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Image/index.js
var Image = __webpack_require__(167);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Popover/index.js
var Popover = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/IconButton/index.js
var IconButton = __webpack_require__(217);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/PseudoBox/index.js
var PseudoBox = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Button/index.js + 1 modules
var Button = __webpack_require__(44);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Flex/index.js
var Flex = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Switch/index.js
var Switch = __webpack_require__(247);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Tooltip/index.js
var Tooltip = __webpack_require__(165);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Transition/index.js
var Transition = __webpack_require__(245);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/AlertDialog/index.js
var AlertDialog = __webpack_require__(225);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Modal/index.js + 2 modules
var Modal = __webpack_require__(43);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/InputGroup/index.js
var InputGroup = __webpack_require__(216);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Input/index.js + 1 modules
var Input = __webpack_require__(102);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/extends.js
var helpers_extends = __webpack_require__(6);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(12);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js
var helpers_objectWithoutPropertiesLoose = __webpack_require__(10);
var objectWithoutPropertiesLoose_default = /*#__PURE__*/__webpack_require__.n(helpers_objectWithoutPropertiesLoose);

// EXTERNAL MODULE: ./node_modules/@emotion/core/dist/core.browser.esm.js + 4 modules
var core_browser_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Input/styles.js
var Input_styles = __webpack_require__(57);

// CONCATENATED MODULE: ./node_modules/@chakra-ui/core/dist/es/InputAddon/index.js




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
        defineProperty_default()(target, key, source[key]);
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







var InputAddon_InputAddon = function InputAddon(_ref) {
  var _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? "left" : _ref$placement,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "md" : _ref$size,
      props = objectWithoutPropertiesLoose_default()(_ref, ["placement", "size"]);

  var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */])(),
      colorMode = _useColorMode.colorMode;

  var bg = {
    dark: "whiteAlpha.300",
    light: "gray.100"
  };
  var _placement = {
    left: {
      mr: "-1px",
      roundedRight: 0,
      borderRightColor: "transparent"
    },
    right: {
      order: 1,
      roundedLeft: 0,
      borderLeftColor: "transparent"
    }
  };

  var styleProps = _objectSpread({}, Object(Input_styles["a" /* default */])({
    size: size,
    variant: "outline"
  }), {
    flex: "0 0 auto",
    whiteSpace: "nowrap",
    bg: bg[colorMode]
  }, _placement[placement]);

  return Object(core_browser_esm["d" /* jsx */])(Box["a" /* default */], extends_default()({}, styleProps, props));
};

var InputAddon_InputLeftAddon = function InputLeftAddon(props) {
  return Object(core_browser_esm["d" /* jsx */])(InputAddon_InputAddon, extends_default()({
    placement: "left"
  }, props));
};

var InputAddon_InputRightAddon = function InputRightAddon(props) {
  return Object(core_browser_esm["d" /* jsx */])(InputAddon_InputAddon, extends_default()({
    placement: "right"
  }, props));
};


/* harmony default export */ var es_InputAddon = (InputAddon_InputAddon);
// EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/SimpleGrid/index.js + 1 modules
var SimpleGrid = __webpack_require__(233);

// EXTERNAL MODULE: ./node_modules/uuid/dist/esm-browser/v1.js + 2 modules
var v1 = __webpack_require__(221);

// EXTERNAL MODULE: ./node_modules/react-hook-form/dist/index.esm.js
var index_esm = __webpack_require__(88);

// EXTERNAL MODULE: ./src/stores/store.js + 4 modules
var store = __webpack_require__(1);

// EXTERNAL MODULE: ./src/Images/calendar.png
var calendar = __webpack_require__(121);
var calendar_default = /*#__PURE__*/__webpack_require__.n(calendar);

// EXTERNAL MODULE: ./src/Images/docs.png
var docs = __webpack_require__(122);
var docs_default = /*#__PURE__*/__webpack_require__.n(docs);

// EXTERNAL MODULE: ./src/Images/excel.png
var excel = __webpack_require__(123);
var excel_default = /*#__PURE__*/__webpack_require__.n(excel);

// EXTERNAL MODULE: ./src/Images/figma.png
var figma = __webpack_require__(124);
var figma_default = /*#__PURE__*/__webpack_require__.n(figma);

// EXTERNAL MODULE: ./src/Images/forms.png
var Images_forms = __webpack_require__(125);
var forms_default = /*#__PURE__*/__webpack_require__.n(Images_forms);

// EXTERNAL MODULE: ./src/Images/github.png
var github = __webpack_require__(126);
var github_default = /*#__PURE__*/__webpack_require__.n(github);

// EXTERNAL MODULE: ./src/Images/medium.png
var medium = __webpack_require__(127);
var medium_default = /*#__PURE__*/__webpack_require__.n(medium);

// EXTERNAL MODULE: ./src/Images/meet.png
var meet = __webpack_require__(128);
var meet_default = /*#__PURE__*/__webpack_require__.n(meet);

// EXTERNAL MODULE: ./src/Images/notion.png
var notion = __webpack_require__(129);
var notion_default = /*#__PURE__*/__webpack_require__.n(notion);

// EXTERNAL MODULE: ./src/Images/photoshop.png
var photoshop = __webpack_require__(130);
var photoshop_default = /*#__PURE__*/__webpack_require__.n(photoshop);

// EXTERNAL MODULE: ./src/Images/powerpoint.png
var powerpoint = __webpack_require__(131);
var powerpoint_default = /*#__PURE__*/__webpack_require__.n(powerpoint);

// EXTERNAL MODULE: ./src/Images/sheets.png
var sheets = __webpack_require__(132);
var sheets_default = /*#__PURE__*/__webpack_require__.n(sheets);

// EXTERNAL MODULE: ./src/Images/slides.png
var slides = __webpack_require__(133);
var slides_default = /*#__PURE__*/__webpack_require__.n(slides);

// EXTERNAL MODULE: ./src/Images/spotify.png
var spotify = __webpack_require__(134);
var spotify_default = /*#__PURE__*/__webpack_require__.n(spotify);

// EXTERNAL MODULE: ./src/Images/twitter.png
var twitter = __webpack_require__(135);
var twitter_default = /*#__PURE__*/__webpack_require__.n(twitter);

// EXTERNAL MODULE: ./src/Images/word.png
var word = __webpack_require__(136);
var word_default = /*#__PURE__*/__webpack_require__.n(word);

// CONCATENATED MODULE: ./src/Components/openSitesDialog.js
/* global chrome */var tabsZu=function tabsZu(state){return state.tabs;};var userStateZu=function userStateZu(state){return state.userState;};var setTabsZu=function setTabsZu(state){return state.setTabs;};var setLimitDialogOpenZu=function setLimitDialogOpenZu(state){return state.setLimitDialogOpen;};var openSitesDialog_ShortcutFavIcon=function ShortcutFavIcon(_ref){var title=_ref.title,subtitle=_ref.subtitle,url=_ref.url,addShortcut=_ref.addShortcut,icon=_ref.icon;var _useColorMode=Object(ColorModeProvider["b" /* useColorMode */])(),colorMode=_useColorMode.colorMode;var favIconBg={light:'#FFF',dark:'transparent'};var outerShadow={light:'0 1px 6px -1px rgba(78,80,81,0.30)',dark:''};var hoverShadow={light:'0 3px 12px -3px rgba(78,80,81,0.50)',dark:'0 3px 10px -3px rgba(0,0,0,0.90), 0 2px 3px 1px rgba(0,0,0,0.80)'};return react_default.a.createElement(Tooltip["a" /* default */],{placement:"bottom"//onOpen={() => getThumbnailUri()}
,zIndex:"500000",rounded:"6px",px:"12px",py:"6px",showDelay:"200",label:react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement(Box["a" /* default */],null,react_default.a.createElement(Text["a" /* default */],{fontWeight:"bold",letterSpacing:"0.64px",fontSize:"16px"},title),react_default.a.createElement(Text["a" /* default */],{fontSize:"14px",opacity:"0.8",wordBreak:"break-all"//isTruncated
},subtitle),react_default.a.createElement(Text["a" /* default */],{fontSize:"12px",opacity:"0.6",mt:"2px",wordBreak:"break-all"//isTruncated
},url)))},react_default.a.createElement(PseudoBox["a" /* default */],{cursor:"pointer",display:"flex",alignItems:"center",rounded:"6px",h:"36px",minW:"36px",maxW:"36px",minH:"36px",bg:favIconBg[colorMode],boxShadow:outerShadow[colorMode],_hover:{boxShadow:hoverShadow[colorMode],transform:'scale(1.075)'},_active:{boxShadow:outerShadow[colorMode],transform:'scale(0.975)'},mr:"0px",ml:"0px"//my="6px"
,transition:'0.16s cubic-bezier(0.22,0.61,0.36,1)',position:"relative",onClick:function onClick(){return addShortcut(title,url);},p:"2px"},react_default.a.createElement(Image["a" /* default */],{src:icon,h:"25px",w:"25px",maxW:"25px",maxH:"25px",minW:"25px",m:"auto",alt:"shortcut",rounded:"4px",textAlign:"center",willChange:"transform"})));};var openSitesDialog_OpenSitesDialog=function OpenSitesDialog(_ref2){var openSiteDialog=_ref2.openSiteDialog,closeSiteDialog=_ref2.closeSiteDialog,spaceId=_ref2.spaceId;//Zustate
var tabs=Object(store["a" /* default */])(tabsZu);var userState=Object(store["a" /* default */])(userStateZu);var setTabs=Object(store["a" /* default */])(setTabsZu);var setLimitDialogOpen=Object(store["a" /* default */])(setLimitDialogOpenZu);//Colorstuff
var _useColorMode2=Object(ColorModeProvider["b" /* useColorMode */])(),colorMode=_useColorMode2.colorMode,toggleColorMode=_useColorMode2.toggleColorMode;var color={light:'#FFF',dark:'#262A2D'};var icon={light:'gray.500',dark:'#A1A2A4'};var input={light:'gray.200',dark:'#A1A2A4'};var text={light:'#1A202C',dark:'#FFF'};var secondaryButton={light:'solid',dark:'outline'};var errorColor={light:'red.500',dark:'#FFF'};var iconColor={light:'gray.600',dark:'#B3BAC6'};var subTitle={light:'gray.600',dark:'#A1A2A4'};//const { isOpen, onOpen, onClose } = useDisclosure();
var cancelRef=react_default.a.useRef();var trailimitReached=userState.userPlan==='trialLimitReached'||userState.userPlan==='paused';//let favIconUrl = "chrome://favicon/size/16@3x/" + a.url;
var _useForm=Object(index_esm["a" /* useForm */])({mode:'onTouched',reValidateMode:'onBlur'}),register=_useForm.register,getValues=_useForm.getValues,handleSubmit=_useForm.handleSubmit,errors=_useForm.errors,formState=_useForm.formState;var onSubmit=function onSubmit(data){var siteUrl=data.siteUrl;var urlFromInput;var favIconUrl;if(siteUrl.substring(0,8)==='slack://'){urlFromInput=siteUrl;favIconUrl='chrome://favicon/size/16@3x/'+urlFromInput;}else if(siteUrl.substring(0,8)==='file:///'){urlFromInput=siteUrl;favIconUrl='localIcon';}else{var cleanUrl=data.siteUrl.replace('https://','');urlFromInput='https://'+cleanUrl;/* + "/"; */favIconUrl='chrome://favicon/size/16@3x/'+urlFromInput;}var newId=Object(v1["a" /* default */])();var dateobj=new Date().toString();var dateCreated=dateobj;var newData=Object(toConsumableArray["a" /* default */])(tabs);var spaceIndex=newData.findIndex(function(target){return target.id===spaceId;});var newTabs=[].concat(Object(toConsumableArray["a" /* default */])(newData[spaceIndex].tabs),[{id:newId,title:data.siteTitle,favIcon:favIconUrl,url:urlFromInput,comment:'',commentColor:false,note:false,dateCreated:dateCreated}]);newData[spaceIndex].tabs=newTabs;setTabs(newData,'fullUpdate');closeSiteDialog();};var newLinksArr=[{title:'Calendar',subtitle:'New event in Google Calendar',url:'https://cal.new',icon:calendar_default.a},{title:'Docs',subtitle:'New Google doc',url:'https://docs.new',icon:docs_default.a},{title:'Meet',subtitle:'Start new Google Meeting',url:'https://meet.new',icon:meet_default.a},{title:'Form',subtitle:'Create new Google form',url:'https://forms.new',icon:forms_default.a},{title:'Sheets',subtitle:'Create new Google Sheet',url:'https://sheets.new',icon:sheets_default.a},{title:'Slides',subtitle:'Create new Google Slide project',url:'https://slides.new',icon:slides_default.a},{title:'Figma',subtitle:'Create Figma file',url:'https://figma.new',icon:figma_default.a},{title:'Github',subtitle:'Create new Github repository',url:'https://github.new',icon:github_default.a},{title:'Spotify',subtitle:'Create new playlist in Spotify',url:'https://playlist.new',icon:spotify_default.a},{title:'Medium',subtitle:'Write new post',url:'https://story.new',icon:medium_default.a},{title:'Photoshop',subtitle:'Create new Adobe Photoshop file',url:'https://photo.new',icon:photoshop_default.a},{title:'Notion',subtitle:'Create new page',url:'https://notion.new',icon:notion_default.a},{title:'Twitter',subtitle:'Write a new tweet',url:'https://twitter.com/intent/tweet',icon:twitter_default.a},{title:'Word',subtitle:'Create new Microsoft Word document',url:'https://word.new',icon:word_default.a},{title:'Powerpoint',subtitle:'Create new Microsoft Powerpoint',url:'https://powerpoint.new',icon:powerpoint_default.a},{title:'Excel',subtitle:'Create new Microsoft Excel',url:'https://excel.new',icon:excel_default.a}];var addShortcut=function addShortcut(title,url){if(trailimitReached){setLimitDialogOpen(true);closeSiteDialog();return;}var newId=Object(v1["a" /* default */])();var dateobj=new Date().toString();var dateCreated=dateobj;var newData=Object(toConsumableArray["a" /* default */])(tabs);var spaceIndex=newData.findIndex(function(target){return target.id===spaceId;});var newTabs=[].concat(Object(toConsumableArray["a" /* default */])(newData[spaceIndex].tabs),[{id:newId,title:title,favIcon:'localIcon',url:url,comment:'',commentColor:false,note:false,dateCreated:dateCreated}]);newData[spaceIndex].tabs=newTabs;setTabs(newData,'fullUpdate');closeSiteDialog();};return react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement(Transition["b" /* SlideIn */],{in:openSiteDialog},function(styles){return react_default.a.createElement(AlertDialog["a" /* AlertDialog */],{leastDestructiveRef:cancelRef,onClose:closeSiteDialog,isOpen:true},react_default.a.createElement(Modal["g" /* ModalOverlay */],{opacity:styles.opacity,style:{backdropFilter:'blur(1px)'}}),react_default.a.createElement(AlertDialog["b" /* AlertDialogContent */],Object.assign({},styles,{rounded:"9px",bg:color[colorMode],px:"2rem",minW:"576px"}),react_default.a.createElement(Modal["f" /* ModalHeader */],{pt:"2.5rem",px:"0rem",pb:"8px",textAlign:"left",color:text[colorMode]},react_default.a.createElement(Text["a" /* default */],null,"Add a custom url"),react_default.a.createElement(Text["a" /* default */],{fontSize:"12px",color:subTitle[colorMode],mt:"8px"},"You can also use file:/// to link to local files")),react_default.a.createElement(Modal["c" /* ModalCloseButton */],{top:"1.25rem",right:"1.5rem",color:icon[colorMode],transition:"0s"}),react_default.a.createElement("form",{onSubmit:handleSubmit(onSubmit),style:{display:'flex',flexDirection:'column'}},react_default.a.createElement(InputGroup["a" /* default */],{mt:"12px"},react_default.a.createElement(Input["a" /* default */],{color:text[colorMode],focusBorderColor:"#63B3ED",variant:"filled",type:"text",name:"siteTitle",ref:register({required:true}),placeholder:"Title",className:colorMode==='light'?'signup':'signupdark'})),errors.siteTitle&&formState.touched.siteTitle&&react_default.a.createElement(Text["a" /* default */],{color:errorColor[colorMode],mt:"4px"},"Title of site is required"),react_default.a.createElement(InputGroup["a" /* default */],{mt:"12px"},react_default.a.createElement(InputAddon_InputLeftAddon,{children:"https://",bg:input[colorMode]}),react_default.a.createElement(Input["a" /* default */],{size:"sm",color:text[colorMode],focusBorderColor:"#63B3ED",variant:"filled",type:"text",name:"siteUrl",ref:register({required:true}),placeholder:"www...",className:colorMode==='light'?'signup':'signupdark',roundedLeft:"0rem",roundedRight:"0.25rem"})),errors.siteUrl&&formState.touched.siteUrl&&react_default.a.createElement(Text["a" /* default */],{color:errorColor[colorMode],mt:"4px"},"Url of site is required"),react_default.a.createElement(Button["a" /* default */],{type:"submit",isDisabled:trailimitReached,w:"100%",size:"md",color:"#FFF",mt:"2rem",mb:"32px",ml:"auto",backgroundImage:"linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)",_hover:{backgroundImage:'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)',boxShadow:'0 10px 16px -8px rgba(49, 144, 255,0.5)'},boxShadow:"0 12px 18px -10px rgba(49, 144, 255,0.35)",rounded:"4px",transition:"all 0.12s cubic-bezier(.374,.019,.035,1.861)"},react_default.a.createElement(Icon["a" /* default */],{mr:"8px",name:"plusCircle",fontSize:"20px"}),"Add site")),react_default.a.createElement(Text["a" /* default */],{color:subTitle[colorMode],mb:"16px",fontSize:"12px"},"Or add a predefined ",react_default.a.createElement("b",null,".new "),"shortcut to the group:"),react_default.a.createElement(SimpleGrid["a" /* default */],{columns:8,spacing:"32px",pb:"32px"},newLinksArr.map(function(item,index){return react_default.a.createElement(openSitesDialog_ShortcutFavIcon,{key:index,title:item.title,subtitle:item.subtitle,url:item.url,addShortcut:addShortcut,icon:item.icon});}))));}));};/* harmony default export */ var openSitesDialog = (openSitesDialog_OpenSitesDialog);
// EXTERNAL MODULE: ./src/stores/persistStore.js
var persistStore = __webpack_require__(32);

// EXTERNAL MODULE: ./node_modules/use-sound/dist/use-sound.esm.js
var use_sound_esm = __webpack_require__(51);

// EXTERNAL MODULE: ./src/fx/selectFx.mp3
var selectFx = __webpack_require__(105);
var selectFx_default = /*#__PURE__*/__webpack_require__.n(selectFx);

// EXTERNAL MODULE: ./src/fx/addFx.mp3
var addFx = __webpack_require__(87);

// CONCATENATED MODULE: ./src/Components/spaceMenu.js
/* global chrome *///zuStore
var categoriesZu=function categoriesZu(state){return state.categories;};//const addNoteZu = (state) => state.addNote;
var deleteSpaceZu=function deleteSpaceZu(state){return state.deleteSpace;};var moveToCategoryZu=function moveToCategoryZu(state){return state.moveToCategory;};var fxStateZu=function fxStateZu(state){return state.fxState;};var copyContentZu=function copyContentZu(state){return state.copyContent;};var setCompactViewZu=function setCompactViewZu(state){return state.setCompactView;};var setLockGroupZu=function setLockGroupZu(state){return state.setLockGroup;};var sortAlphabeticallyZu=function sortAlphabeticallyZu(state){return state.sortAlphabetically;};var spaceMenu_userStateZu=function userStateZu(state){return state.userState;};var currentWSidZu=function currentWSidZu(state){return state.currentWSid;};var moveToWorkspaceZu=function moveToWorkspaceZu(state){return state.moveToWorkspace;};var duplicateGroupZu=function duplicateGroupZu(state){return state.duplicateGroup;};var spaceMenu_AccordionGroup=function AccordionGroup(_ref){var header=_ref.header,emptystate=_ref.emptystate,noIcon=_ref.noIcon,emoji=_ref.emoji,props=_objectWithoutProperties(_ref,["header","emptystate","noIcon","emoji"]);var _useColorMode=Object(ColorModeProvider["b" /* useColorMode */])(),colorMode=_useColorMode.colorMode,toggleColorMode=_useColorMode.toggleColorMode;var hoverButton={light:'gray.100',dark:'#32363A'};var iconSmall={light:'gray.700',dark:'#FFF'};var text={light:'#1A202C',dark:'#FFF'};var fxState=Object(persistStore["a" /* default */])(fxStateZu);//Fx
var _useSound=Object(use_sound_esm["a" /* default */])(selectFx_default.a),_useSound2=Object(slicedToArray["a" /* default */])(_useSound,1),playSelectFx=_useSound2[0];/*   const accordionOpen = () => {
    if (fxState) {
      playSelectFx();
    }
  }; */return react_default.a.createElement(Accordion["d" /* AccordionItem */],{borderBottomColor:"transparent",borderTopWidth:"0px"},react_default.a.createElement(Accordion["b" /* AccordionHeader */],{height:"40px",py:"0px",pl:"0px",pr:"12px",fontSize:"sm",fontWeight:"600",_focus:{outline:'0'},_hover:{bg:hoverButton[colorMode]}//onClick={() => accordionOpen()}
},react_default.a.createElement(Box["a" /* default */],{display:emoji?'flex':'',flex:"1",textAlign:"left",ml:"16px",color:text[colorMode]},!noIcon&&react_default.a.createElement(Icon["a" /* default */],{fontSize:"17px",name:"collection",mr:"10px",ml:"0px",color:iconSmall[colorMode]}),emoji&&react_default.a.createElement(Text["a" /* default */],{mr:"10px",ml:"0px"},(emoji===null||emoji===void 0?void 0:emoji.length)>10?react_default.a.createElement(Image["a" /* default */],{src:emoji,boxSize:"18px",minW:"18px",minH:"18px",maxW:"18px",maxH:"18px",overflow:"hidden",rounded:"2px"}):emoji),header),react_default.a.createElement(Accordion["c" /* AccordionIcon */],{color:iconSmall[colorMode]})),react_default.a.createElement(Accordion["e" /* AccordionPanel */],{p:"0px",m:"0px",mt:"4px"},props.children));};var spaceMenu_SpaceMenu=function SpaceMenu(_ref2){var _currentWS$,_currentWS$2;var isDraggingLocal=_ref2.isDraggingLocal,spaceId=_ref2.spaceId,spaceCategoryId=_ref2.spaceCategoryId,menuOpen=_ref2.menuOpen,menuClosed=_ref2.menuClosed,numberOfsites=_ref2.numberOfsites,allTabsUrls=_ref2.allTabsUrls,lastPosition=_ref2.lastPosition,compactViewState=_ref2.compactViewState,lockGroupState=_ref2.lockGroupState,setLoadingList=_ref2.setLoadingList;//zustate
var categories=Object(store["a" /* default */])(categoriesZu);//const addNote = useStore(addNoteZu);
var deleteSpace=Object(store["a" /* default */])(deleteSpaceZu);var moveToCategory=Object(store["a" /* default */])(moveToCategoryZu);var fxState=Object(persistStore["a" /* default */])(fxStateZu);var copyContent=Object(store["a" /* default */])(copyContentZu);var setCompactView=Object(store["a" /* default */])(setCompactViewZu);var setLockGroup=Object(store["a" /* default */])(setLockGroupZu);var sortAlphabetically=Object(store["a" /* default */])(sortAlphabeticallyZu);var userState=Object(store["a" /* default */])(spaceMenu_userStateZu);var currentWSid=Object(store["a" /* default */])(currentWSidZu);var moveToWorkspace=Object(store["a" /* default */])(moveToWorkspaceZu);var duplicateGroup=Object(store["a" /* default */])(duplicateGroupZu);//Fx
var _useSound3=Object(use_sound_esm["a" /* default */])(selectFx_default.a),_useSound4=Object(slicedToArray["a" /* default */])(_useSound3,1),playSelectFx=_useSound4[0];var _useState=Object(react["useState"])(false),_useState2=Object(slicedToArray["a" /* default */])(_useState,2),accOpen=_useState2[0],setAccOpen=_useState2[1];var accordionOpen=function accordionOpen(){if(fxState){playSelectFx();}};var closeMenuMiddleware=function closeMenuMiddleware(){setAccOpen(false);menuClosed();};var _useColorMode2=Object(ColorModeProvider["b" /* useColorMode */])(),colorMode=_useColorMode2.colorMode,toggleColorMode=_useColorMode2.toggleColorMode;var hoverButton={light:'gray.100',dark:'#32363A'};var icon={light:'gray.600',dark:'#A1A2A4'};var color={light:'#FFF',dark:'#262A2D'};var iconSmall={light:'gray.700',dark:'#FFF'};var text={light:'#1A202C',dark:'#FFF'};var red={light:'red.100',dark:'red.300'};var linkShadow={light:'2px 5px 35px 0 rgba(152,169,185,0.50)',dark:'0px 14px 54px 0 rgba(0,0,0,0.90)'};var btnRef=Object(react["useRef"])();var _useState3=Object(react["useState"])(false),_useState4=Object(slicedToArray["a" /* default */])(_useState3,2),openSiteDialog=_useState4[0],setDialogOpen=_useState4[1];var intialCompactState=compactViewState===undefined?false:compactViewState;var _useState5=Object(react["useState"])(intialCompactState),_useState6=Object(slicedToArray["a" /* default */])(_useState5,2),compactLocalState=_useState6[0],setCompactLocal=_useState6[1];var toggleCompactView=function toggleCompactView(){setLoadingList();setCompactView(spaceId,!compactLocalState);setCompactLocal(!compactLocalState);};var intialLockState=lockGroupState===undefined?false:lockGroupState;var _useState7=Object(react["useState"])(intialLockState),_useState8=Object(slicedToArray["a" /* default */])(_useState7,2),lockLocalState=_useState8[0],setLocalLock=_useState8[1];var toggleLockGroup=function toggleLockGroup(){setLoadingList();setLockGroup(spaceId,!lockLocalState);setLocalLock(!lockLocalState);};var openInNewWindow=function openInNewWindow(){chrome.windows.create({height:lastPosition===null||lastPosition===void 0?void 0:lastPosition.height,width:lastPosition===null||lastPosition===void 0?void 0:lastPosition.width,top:lastPosition===null||lastPosition===void 0?void 0:lastPosition.top,left:lastPosition===null||lastPosition===void 0?void 0:lastPosition.left,url:allTabsUrls});};var moveToWorkspaceInner=function moveToWorkspaceInner(workspaceId,toCategory,title){moveToWorkspace(workspaceId,spaceId,title,toCategory);};//Data to first move to accordion item
var currentWS=userState.workspaces?userState.workspaces.filter(function(ws){return ws.id===currentWSid;}):false;var currentWSemoji=currentWS?(_currentWS$=currentWS[0])===null||_currentWS$===void 0?void 0:_currentWS$.emoji:'📒';var currentWSname=currentWS?(_currentWS$2=currentWS[0])===null||_currentWS$2===void 0?void 0:_currentWS$2.name:'Workspace 1';return react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement(Popover["a" /* Popover */],{usePortal:true,_focus:{outline:'0'},onOpen:menuOpen,onClose:closeMenuMiddleware,returnFocusOnClose:false,placement:"bottom-end"},function(_ref3){var isOpen=_ref3.isOpen,_onClose=_ref3.onClose;return react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement(Popover["h" /* PopoverTrigger */],null,react_default.a.createElement(IconButton["a" /* default */],{opacity:isDraggingLocal?'0':'1',icon:"dotdotdot",h:"36px",minW:"36px",color:icon[colorMode],bg:"transparent",_hover:{bg:hoverButton[colorMode]},rounded:"8px",fontSize:"16px",pl:"4px",pr:"5px",py:"8px",cursor:"pointer"})),react_default.a.createElement(Popover["e" /* PopoverContent */],{maxH:"98vh"//overflow="hidden"
,overflow:"auto",rounded:"7px",zIndex:4,width:"240px",py:"12px",_focus:{outline:'0'},bg:color[colorMode],border:colorMode==='dark'?'none':'',boxShadow:linkShadow[colorMode]},react_default.a.createElement(PseudoBox["a" /* default */],{role:"group",opacity:accOpen?0.5:1,style:{filter:accOpen?'blur(2px)':''}},react_default.a.createElement(Button["a" /* default */],{width:"100%",fontSize:"sm",justifyContent:"left",variant:"ghost",rounded:"0px",isDisabled:allTabsUrls.length>0?false:true,ref:btnRef,onClick:function onClick(){return openInNewWindow();}},react_default.a.createElement(PseudoBox["a" /* default */],{transition:"0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275)"},react_default.a.createElement(Icon["a" /* default */],{fontSize:"17px",name:"externalLink",mr:"10px",ml:"0px"})),"Open in new window")),react_default.a.createElement(PseudoBox["a" /* default */],{role:"group",opacity:accOpen?0.5:1,style:{filter:accOpen?'blur(2px)':''},display:"flex"},react_default.a.createElement(Button["a" /* default */],{width:"100%",fontSize:"sm",justifyContent:"left",variant:"ghost",rounded:"0px",ref:btnRef,onClick:function onClick(){return setDialogOpen(true);}},react_default.a.createElement(PseudoBox["a" /* default */],{transition:"0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275)"},react_default.a.createElement(Icon["a" /* default */],{fontSize:"17px",name:"plusCircle",mr:"10px",ml:"0px"})),"Add site")),react_default.a.createElement(PseudoBox["a" /* default */],{role:"group",opacity:accOpen?0.5:1,style:{filter:accOpen?'blur(2px)':''},display:"flex"},react_default.a.createElement(Button["a" /* default */],{width:"100%",fontSize:"sm",justifyContent:"left",variant:"ghost",rounded:"0px",ref:btnRef,onClick:function onClick(){duplicateGroup(spaceId);_onClose();}},react_default.a.createElement(PseudoBox["a" /* default */],{transition:"0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275)"},react_default.a.createElement(Icon["a" /* default */],{fontSize:"17px",name:"duplicateIcon",mr:"10px",ml:"0px"})),"Duplicate group")),react_default.a.createElement(PseudoBox["a" /* default */],{role:"group",opacity:accOpen?0.5:1,style:{filter:accOpen?'blur(2px)':''}},react_default.a.createElement(Button["a" /* default */],{width:"100%",fontSize:"sm",justifyContent:"left",variant:"ghost",rounded:"0px",ref:btnRef,onClick:function onClick(){copyContent(spaceId);_onClose();}},react_default.a.createElement(PseudoBox["a" /* default */],{transition:"0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275)"},react_default.a.createElement(Icon["a" /* default */],{fontSize:"17px",name:"copyToClipboard",mr:"10px",ml:"0px"})),"Copy content")),react_default.a.createElement(Accordion["a" /* Accordion */],{allowMultiple:true,onChange:function onChange(){return setAccOpen(!accOpen);},defaultIsOpen:false},react_default.a.createElement(Accordion["d" /* AccordionItem */],{borderBottomColor:"transparent",borderTopWidth:"0px"},react_default.a.createElement(Accordion["b" /* AccordionHeader */],{height:"40px",py:"0px",pl:"0px",pr:"12px",fontSize:"sm",fontWeight:"600",_focus:{outline:'0'},_hover:{bg:hoverButton[colorMode]},onClick:function onClick(){return accordionOpen();}},react_default.a.createElement(Box["a" /* default */],{flex:"1",textAlign:"left",ml:"16px",color:text[colorMode]},react_default.a.createElement(Icon["a" /* default */],{fontSize:"17px",name:"switch",mr:"10px",ml:"0px",color:iconSmall[colorMode]}),"Move to"),react_default.a.createElement(Accordion["c" /* AccordionIcon */],{color:iconSmall[colorMode]})),react_default.a.createElement(Accordion["e" /* AccordionPanel */],{p:"0px",m:"0px",mt:"4px"},react_default.a.createElement(Accordion["a" /* Accordion */]//onChange={() => setAccOpen(!accOpen)}
//defaultIsOpen={false}
,{allowToggle:true},react_default.a.createElement(spaceMenu_AccordionGroup,{header:currentWSname,emoji:currentWSemoji,noIcon:true},categories.length>1?categories.filter(function(item){return item.id!==spaceCategoryId;}).map(function(item,index){return react_default.a.createElement(menuRowMoveTo["a" /* default */],{moveToCategory:moveToCategory,key:index,categoryId:item.id,title:item.name,spaceId:spaceId,onClose:closeMenuMiddleware,emoji:item.emoji});}):react_default.a.createElement(Button["a" /* default */],{fontSize:"sm",justifyContent:"left",variant:"ghost",rounded:"0px",isDisabled:true,w:"100%"},"No other categories")),(userState===null||userState===void 0?void 0:userState.workspaces)?userState.workspaces.filter(function(ws){return ws.id!==currentWSid;}).map(function(item,index){return react_default.a.createElement(spaceMenu_AccordionGroup,{key:index,header:item.name,emoji:item.emoji,noIcon:true},item.catData.length>0?item.catData.map(function(cat,index){return react_default.a.createElement(menuRowMoveTo["a" /* default */],{key:index,moveToCategory:moveToWorkspaceInner,spaceId:item.id,categoryId:cat.id,toCategory:cat.id,title:cat.name,onClose:function onClose(){return _onClose();},emoji:false,extraSmall:true});}):react_default.a.createElement(Button["a" /* default */],{fontSize:"sm",justifyContent:"left",variant:"ghost",rounded:"0px",isDisabled:true,w:"100%"},"No categories"));}):react_default.a.createElement(Button["a" /* default */],{fontSize:"sm",justifyContent:"left",variant:"ghost",rounded:"0px",isDisabled:true,w:"100%"},"No other workspaces"))))),react_default.a.createElement(Accordion["a" /* Accordion */],{allowMultiple:true,defaultIsOpen:false},react_default.a.createElement(Accordion["d" /* AccordionItem */],{borderBottomColor:"transparent",borderTopWidth:"0px",opacity:accOpen?0.5:1,style:{filter:accOpen?'blur(2px)':''}},react_default.a.createElement(Accordion["b" /* AccordionHeader */],{height:"40px",py:"0px",pl:"0px",pr:"12px",fontSize:"sm",fontWeight:"600",_focus:{outline:'0'},_hover:{bg:hoverButton[colorMode]}},react_default.a.createElement(Box["a" /* default */],{flex:"1",textAlign:"left",ml:"16px",color:text[colorMode]},react_default.a.createElement(Icon["a" /* default */],{fontSize:"17px",name:"sortByIcon",mr:"10px",ml:"0px",color:iconSmall[colorMode]}),"Sort by"),react_default.a.createElement(Accordion["c" /* AccordionIcon */],{color:iconSmall[colorMode]})),react_default.a.createElement(Accordion["e" /* AccordionPanel */],{p:"0px",m:"0px",mt:"4px"},react_default.a.createElement(PseudoBox["a" /* default */],{role:"group"//opacity={accOpen ? 0.5 : 1}
//style={{ filter: accOpen ? "blur(2px)" : "" }}
},react_default.a.createElement(Button["a" /* default */],{width:"100%",fontSize:"sm",justifyContent:"left",variant:"ghost",rounded:"0px",ref:btnRef,onClick:function onClick(){sortAlphabetically(spaceId,'alphabetically');_onClose();}},"Alphabetically")),react_default.a.createElement(PseudoBox["a" /* default */],{role:"group"//opacity={accOpen ? 0.5 : 1}
//style={{ filter: accOpen ? "blur(2px)" : "" }}
},react_default.a.createElement(Button["a" /* default */],{width:"100%",fontSize:"sm",justifyContent:"left",variant:"ghost",rounded:"0px",ref:btnRef,onClick:function onClick(){sortAlphabetically(spaceId,'date');_onClose();}},"Date created"))))),react_default.a.createElement(PseudoBox["a" /* default */],{role:"group",opacity:accOpen?0.5:1,style:{filter:accOpen?'blur(2px)':''}},react_default.a.createElement(Flex["a" /* default */],{width:"100%",fontSize:"sm",textAlign:"left",rounded:"0px",height:"40px",px:"16px"//bg={hoverButton[colorMode]}
},react_default.a.createElement(Icon["a" /* default */],{fontSize:"17px",name:"compactView",mr:"10px",ml:"0px",my:"auto",color:text[colorMode]}),react_default.a.createElement(Text["a" /* default */],{fontSize:"15px",fontWeight:"500",my:"auto",cursor:"default",color:text[colorMode]},"Compact view"),react_default.a.createElement(Switch["a" /* default */],{size:"sm",ml:"auto",mt:"11px"//isChecked={compactViewState ? true : false}
,value:compactLocalState,isChecked:compactLocalState//onChange={() => setCompactView(spaceId, !compactViewState)}
,onChange:function onChange(){return toggleCompactView();}}))),react_default.a.createElement(PseudoBox["a" /* default */],{role:"group",opacity:accOpen?0.5:1,style:{filter:accOpen?'blur(2px)':''}},react_default.a.createElement(Flex["a" /* default */],{width:"100%",fontSize:"sm",textAlign:"left",rounded:"0px",height:"40px",px:"16px"//bg={hoverButton[colorMode]}
},react_default.a.createElement(Icon["a" /* default */],{fontSize:"17px",name:lockLocalState?'unlockIcon':'lockIcon',mr:"10px",ml:"0px",my:"auto",color:text[colorMode]}),react_default.a.createElement(Text["a" /* default */],{fontSize:"15px",fontWeight:"500",my:"auto",cursor:"default",color:text[colorMode]},lockLocalState?'Unlock':'Lock',' ',"group"),react_default.a.createElement(Switch["a" /* default */],{size:"sm",ml:"auto",mt:"11px"//isChecked={compactViewState ? true : false}
,value:lockLocalState,isChecked:lockLocalState//onChange={() => setCompactView(spaceId, !compactViewState)}
,onChange:function onChange(){return toggleLockGroup();}}))),react_default.a.createElement(PseudoBox["a" /* default */],{role:"group",opacity:accOpen?0.5:1,style:{filter:accOpen?'blur(2px)':''}},react_default.a.createElement(Button["a" /* default */],{width:"100%",_hover:{bg:red[colorMode]},fontSize:"sm",justifyContent:"left",variant:"ghost",rounded:"0px",onClick:function onClick(){deleteSpace(spaceId);_onClose();}},react_default.a.createElement(PseudoBox["a" /* default */],{transition:"0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275)",_groupHover:{color:'red.900'}},react_default.a.createElement(Icon["a" /* default */],{fontSize:"17px",name:"trash",mr:"10px",ml:"0px"}),"Delete group")))));}),react_default.a.createElement(openSitesDialog,{openSiteDialog:openSiteDialog,spaceId:spaceId,closeSiteDialog:function closeSiteDialog(){return setDialogOpen(false);}}));};/* harmony default export */ var spaceMenu = __webpack_exports__["default"] = (spaceMenu_SpaceMenu);

/***/ })

}]);