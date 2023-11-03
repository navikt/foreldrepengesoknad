import{j as u}from"./jsx-runtime-4ca860c5.js";import{r as x}from"./index-61bf1805.js";import{p as E}from"./index-9d475cdf.js";import{u as fe}from"./index-b1d09ef8.js";import{i as ne}from"./intlUtils-93c7918a.js";import{E as le}from"./Expand-48a8ed38.js";import"./_commonjsHelpers-de833af9.js";import"./tslib.es6-74570fde.js";import"./useId-4401db27.js";var I={},re="a menu outside a mounted Wrapper with an id, or a menu that does not exist";function pe(t,e){I[t]=e}function de(t){delete I[t]}function he(t,e){var r=I[t];if(!r)throw new Error("Cannot open "+re);r.openMenu(e)}function me(t,e){var r=I[t];if(!r)throw new Error("Cannot close "+re);r.closeMenu(e)}var oe={registerManager:pe,unregisterManager:de,openMenu:he,closeMenu:me};function c(t){t=t||{};var e=t.keybindings||{};this._settings={keybindings:{next:e.next||{keyCode:40},prev:e.prev||{keyCode:38},first:e.first,last:e.last},wrap:t.wrap,stringSearch:t.stringSearch,stringSearchDelay:800},this._keybindingsLookup=[];var r,n;for(r in this._settings.keybindings)n=this._settings.keybindings[r],n&&[].concat(n).forEach((function(o){o.metaKey=o.metaKey||!1,o.ctrlKey=o.ctrlKey||!1,o.altKey=o.altKey||!1,o.shiftKey=o.shiftKey||!1,this._keybindingsLookup.push({action:r,eventMatcher:o})}).bind(this));this._searchString="",this._members=[],t.members&&this.setMembers(t.members),this._boundHandleKeydownEvent=this._handleKeydownEvent.bind(this)}c.prototype.activate=function(){return document.addEventListener("keydown",this._boundHandleKeydownEvent,!0),this};c.prototype.deactivate=function(){return document.removeEventListener("keydown",this._boundHandleKeydownEvent,!0),this._clearSearchStringRefreshTimer(),this};c.prototype._handleKeydownEvent=function(t){var e=this._getActiveElementIndex();if(e!==-1){var r=!1;this._keybindingsLookup.forEach((function(n){if(ge(n.eventMatcher,t))switch(r=!0,t.preventDefault(),n.action){case"next":this.moveFocusForward();break;case"prev":this.moveFocusBack();break;case"first":this.moveFocusToFirst();break;case"last":this.moveFocusToLast();break;default:return}}).bind(this)),r||this._handleUnboundKey(t)}};c.prototype.moveFocusForward=function(){var t=this._getActiveElementIndex(),e;return t<this._members.length-1?e=t+1:this._settings.wrap?e=0:e=t,this.focusNodeAtIndex(e),e};c.prototype.moveFocusBack=function(){var t=this._getActiveElementIndex(),e;return t>0?e=t-1:this._settings.wrap?e=this._members.length-1:e=t,this.focusNodeAtIndex(e),e};c.prototype.moveFocusToFirst=function(){this.focusNodeAtIndex(0)};c.prototype.moveFocusToLast=function(){this.focusNodeAtIndex(this._members.length-1)};c.prototype._handleUnboundKey=function(t){if(this._settings.stringSearch){if(this._searchString!==""&&(t.key===" "||t.keyCode===32))return t.preventDefault(),-1;if(!ve(t.keyCode)||t.ctrlKey||t.metaKey||t.altKey)return-1;t.preventDefault(),this._addToSearchString(String.fromCharCode(t.keyCode)),this._runStringSearch()}};c.prototype._clearSearchString=function(){this._searchString=""};c.prototype._addToSearchString=function(t){this._searchString+=t.toLowerCase()};c.prototype._startSearchStringRefreshTimer=function(){var t=this;this._clearSearchStringRefreshTimer(),this._stringSearchTimer=setTimeout(function(){t._clearSearchString()},this._settings.stringSearchDelay)};c.prototype._clearSearchStringRefreshTimer=function(){clearTimeout(this._stringSearchTimer)};c.prototype._runStringSearch=function(){this._startSearchStringRefreshTimer(),this.moveFocusByString(this._searchString)};c.prototype.moveFocusByString=function(t){for(var e,r=0,n=this._members.length;r<n;r++)if(e=this._members[r],!!e.text&&e.text.indexOf(t)===0)return ie(e.node)};c.prototype._findIndexOfNode=function(t){for(var e=0,r=this._members.length;e<r;e++)if(this._members[e].node===t)return e;return-1};c.prototype._getActiveElementIndex=function(){return this._findIndexOfNode(document.activeElement)};c.prototype.focusNodeAtIndex=function(t){var e=this._members[t];return e&&ie(e.node),this};c.prototype.addMember=function(t,e){var r=t.node||t,n=t.text||r.getAttribute("data-focus-group-text")||r.textContent||"";this._checkNode(r);var o=n.replace(/[\W_]/g,"").toLowerCase(),s={node:r,text:o};return e!=null?this._members.splice(e,0,s):this._members.push(s),this};c.prototype.removeMember=function(t){var e=typeof t=="number"?t:this._findIndexOfNode(t);if(e!==-1)return this._members.splice(e,1),this};c.prototype.clearMembers=function(){return this._members=[],this};c.prototype.setMembers=function(t){this.clearMembers();for(var e=0,r=t.length;e<r;e++)this.addMember(t[e]);return this};c.prototype.getMembers=function(){return this._members};c.prototype._checkNode=function(t){if(!t.nodeType||t.nodeType!==window.Node.ELEMENT_NODE)throw new Error("focus-group: only DOM nodes allowed");return t};function ge(t,e){for(var r in t)if(e[r]!==void 0&&t[r]!==e[r])return!1;return!0}function ve(t){return t>=65&&t<=90}function ie(t){!t||!t.focus||(t.focus(),t.tagName.toLowerCase()==="input"&&t.select())}var ye=function(e){return new c(e)},be=ye,z=oe,_e={wrap:!0,stringSearch:!0},Me={init:function(e){this.updateOptions(e),this.handleBlur=we.bind(this),this.handleSelection=Te.bind(this),this.handleMenuKey=xe.bind(this),this.focusGroup=be(_e),this.button=null,this.menu=null,this.isOpen=!1},updateOptions:function(e){var r=this.options;this.options=e||this.options||{},typeof this.options.closeOnSelection>"u"&&(this.options.closeOnSelection=!0),typeof this.options.closeOnBlur>"u"&&(this.options.closeOnBlur=!0),this.options.id&&z.registerManager(this.options.id,this),r&&r.id&&r.id!==this.options.id&&z.unregisterManager(this.options.id,this)},focusItem:function(e){this.focusGroup.focusNodeAtIndex(e)},addItem:function(e){this.focusGroup.addMember(e)},clearItems:function(){this.focusGroup.clearMembers()},handleButtonNonArrowKey:function(e){this.focusGroup._handleUnboundKey(e)},destroy:function(){this.button=null,this.menu=null,this.focusGroup.deactivate(),clearTimeout(this.blurTimer),clearTimeout(this.moveFocusTimer)},update:function(){this.menu.setState({isOpen:this.isOpen}),this.button.setState({menuOpen:this.isOpen}),this.options.onMenuToggle&&this.options.onMenuToggle({isOpen:this.isOpen})},openMenu:function(e){if(!this.isOpen&&(e=e||{},e.focusMenu===void 0&&(e.focusMenu=!0),this.isOpen=!0,this.update(),this.focusGroup.activate(),e.focusMenu)){var r=this;this.moveFocusTimer=setTimeout(function(){r.focusItem(0)},0)}},closeMenu:function(e){this.isOpen&&(e=e||{},this.isOpen=!1,this.update(),e.focusButton&&this.button.ref.current.focus())},toggleMenu:function(e,r){e=e||{},r=r||{},this.isOpen?this.closeMenu(e):this.openMenu(r)}};function we(){var t=this;t.blurTimer=setTimeout(function(){if(t.button){var e=t.button.ref.current;if(e){var r=e.ownerDocument.activeElement;if(!(e&&r===e)){var n=t.menu.ref.current;if(n===r){t.focusItem(0);return}n&&n.contains(r)||t.isOpen&&t.closeMenu({focusButton:!1})}}}},0)}function Te(t,e){this.options.closeOnSelection&&this.closeMenu({focusButton:!0}),this.options.onSelection&&this.options.onSelection(t,e)}function xe(t){if(this.isOpen)switch(t.key){case"Escape":t.preventDefault(),this.closeMenu({focusButton:!0});break;case"Home":t.preventDefault(),this.focusGroup.moveFocusToFirst();break;case"End":t.preventDefault(),this.focusGroup.moveFocusToLast();break}}var Ee=function(t){var e=Object.create(Me);return e.init(t),e},Se=x,Oe=Se.createContext(),B=Oe,S=E,k={refType:S.oneOfType([S.func,S.shape({current:S.elementType})])},K=function(t,e,r){r=r||{};for(var n in e)e.hasOwnProperty(n)&&(r[n]||(t[n]=e[n]))};function Re(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Le(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function je(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var _=x,d=E,Ie=Ee,Be=B,ke=k,Ke=ke.refType,N=K,j={children:d.node.isRequired,forwardedRef:Ke,onMenuToggle:d.func,onSelection:d.func,closeOnSelection:d.bool,closeOnBlur:d.bool,tag:d.string},X=function(e){return{onMenuToggle:e.onMenuToggle,onSelection:e.onSelection,closeOnSelection:e.closeOnSelection,closeOnBlur:e.closeOnBlur,id:e.id}},P=function(t){je(e,t);function e(r){Re(this,e);var n=Le(this,t.call(this,r));return n.manager=Ie(X(r)),n}return e.prototype.componentDidUpdate=function(){this.manager.updateOptions(X(this.props))},e.prototype.render=function(){var n={};return N(n,this.props,j),_.createElement(Be.Provider,{value:this.manager},_.createElement(this.props.tag,n,this.props.children))},e}(_.Component);P.propTypes=j;P.defaultProps={tag:"div"};var Ne=_.forwardRef(function(t,e){var r={forwardedRef:e};return N(r,t,{children:j.children,forwardedRef:j.forwardedRef}),N(r,{forwardedRef:e}),_.createElement(P,r,t.children)});function De(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Y(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Fe(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var h=x,O=E,Pe=B,$e=k,Ae=$e.refType,R=K,M={ambManager:O.object.isRequired,children:O.node.isRequired,disabled:O.bool,forwardedRef:Ae,tag:O.string},qe=function(){return["button","fieldset","input","optgroup","option","select","textarea"]},$=function(t){Fe(e,t);function e(){var r,n,o;De(this,e);for(var s=arguments.length,a=Array(s),f=0;f<s;f++)a[f]=arguments[f];return o=(r=(n=Y(this,t.call.apply(t,[this].concat(a))),n),n.ref=h.createRef(),n.handleKeyDown=function(i){if(!n.props.disabled){var l=n.props.ambManager;switch(i.key){case"ArrowDown":i.preventDefault(),l.isOpen?l.focusItem(0):l.openMenu();break;case"Enter":case" ":i.preventDefault(),l.toggleMenu();break;case"Escape":l.handleMenuKey(i);break;default:l.handleButtonNonArrowKey(i)}}},n.handleClick=function(){n.props.disabled||n.props.ambManager.toggleMenu({},{focusMenu:!1})},n.setRef=function(i){n.ref.current=i,typeof n.props.forwardedRef=="function"?n.props.forwardedRef(i):n.props.forwardedRef&&(n.props.forwardedRef.current=i)},r),Y(n,o)}return e.prototype.componentDidMount=function(){this.props.ambManager.button=this},e.prototype.componentWillUnmount=function(){this.props.ambManager.destroy()},e.prototype.render=function(){var n=this.props,o=this.props.ambManager,s={role:"button",tabIndex:n.disabled?"":"0","aria-haspopup":!0,"aria-expanded":o.isOpen,"aria-disabled":n.disabled,onKeyDown:this.handleKeyDown,onClick:this.handleClick},a={};return R(a,M),qe().indexOf(n.tag)>=0&&delete a.disabled,o.options.closeOnBlur&&(s.onBlur=o.handleBlur),R(s,n,a),R(s,{ref:this.setRef}),h.createElement(n.tag,s,n.children)},e}(h.Component);$.propTypes=M;$.defaultProps={tag:"span"};var Ge=h.forwardRef(function(t,e){return h.createElement(Pe.Consumer,null,function(r){var n={ambManager:r,forwardedRef:e};return R(n,t,{ambManager:M.ambManager,children:M.children,forwardedRef:M.forwardedRef}),h.createElement($,n,t.children)})}),Ue=function(e,r,n){var o=0,s=0,a=!1,f=!1,i=!1;e.addEventListener("click",l,n),e.addEventListener("touchstart",G,n);function l(p){i||r(p)}function G(p){i=!0,!a&&(a=!0,e.addEventListener("touchmove",U,n),e.addEventListener("touchend",W,n),e.addEventListener("touchcancel",H,n),f=!1,o=p.touches[0].clientX,s=p.touches[0].clientY)}function U(p){f||Math.abs(p.touches[0].clientX-o)<=10&&Math.abs(p.touches[0].clientY-s)<=10||(f=!0)}function W(p){a=!1,V(),f||r(p)}function H(){a=!1,f=!1,o=0,s=0}function V(){e.removeEventListener("touchmove",U,n),e.removeEventListener("touchend",W,n),e.removeEventListener("touchcancel",H,n)}function ce(){e.removeEventListener("click",l,n),e.removeEventListener("touchstart",G,n),V()}return{remove:ce}};function We(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function J(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function He(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var m=x,v=E,Ve=Ue,ze=B,Xe=k,Ye=Xe.refType,D=K,w={ambManager:v.object.isRequired,children:v.oneOfType([v.func,v.node]).isRequired,forwardedRef:Ye,tag:v.string},A=function(t){He(e,t);function e(){var r,n,o;We(this,e);for(var s=arguments.length,a=Array(s),f=0;f<s;f++)a[f]=arguments[f];return o=(r=(n=J(this,t.call.apply(t,[this].concat(a))),n),n.ref=m.createRef(),n.addTapListener=function(){var i=n.ref.current;if(i){var l=i.ownerDocument;l&&(n.tapListener=Ve(l.documentElement,n.handleTap))}},n.handleTap=function(i){n.ref.current.contains(i.target)||n.props.ambManager.button.ref.current.contains(i.target)||n.props.ambManager.closeMenu()},n.setRef=function(i){n.ref.current=i,typeof n.props.forwardedRef=="function"?n.props.forwardedRef(i):n.props.forwardedRef&&(n.props.forwardedRef.current=i)},r),J(n,o)}return e.prototype.componentDidMount=function(){this.props.ambManager.menu=this},e.prototype.componentDidUpdate=function(){var n=this.props.ambManager;n.options.closeOnBlur&&(n.isOpen&&!this.tapListener?this.addTapListener():!n.isOpen&&this.tapListener&&(this.tapListener.remove(),delete this.tapListener),n.isOpen||n.clearItems())},e.prototype.componentWillUnmount=function(){this.tapListener&&this.tapListener.remove(),this.props.ambManager.destroy()},e.prototype.render=function(){var n=this.props,o=this.props.ambManager,s=function(){return typeof n.children=="function"?n.children({isOpen:o.isOpen}):o.isOpen?n.children:!1}();if(!s)return!1;var a={onKeyDown:o.handleMenuKey,role:"menu",tabIndex:-1};return o.options.closeOnBlur&&(a.onBlur=o.handleBlur),D(a,n,w),D(a,{ref:this.setRef}),m.createElement(n.tag,a,s)},e}(m.Component);A.propTypes=w;A.defaultProps={tag:"div"};var Je=m.forwardRef(function(t,e){return m.createElement(ze.Consumer,null,function(r){var n={ambManager:r,forwardedRef:e};return D(n,t,{ambManager:w.ambManager,children:w.children,forwardedRef:w.forwardedRef}),m.createElement(A,n,t.children)})});function Qe(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Q(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Ze(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var g=x,y=E,Ce=B,et=k,tt=et.refType,ae=K,T={ambManager:y.object.isRequired,children:y.node.isRequired,forwardedRef:tt,tag:y.string,text:y.string,value:y.any},q=function(t){Ze(e,t);function e(){var r,n,o;Qe(this,e);for(var s=arguments.length,a=Array(s),f=0;f<s;f++)a[f]=arguments[f];return o=(r=(n=Q(this,t.call.apply(t,[this].concat(a))),n),n.ref=g.createRef(),n.handleKeyDown=function(i){i.key!=="Enter"&&i.key!==" "||n.props.tag==="a"&&n.props.href||(i.preventDefault(),n.selectItem(i))},n.selectItem=function(i){var l=typeof n.props.value<"u"?n.props.value:n.props.children;n.props.ambManager.handleSelection(l,i)},n.setRef=function(i){n.ref.current=i,typeof n.props.forwardedRef=="function"?n.props.forwardedRef(i):n.props.forwardedRef&&(n.props.forwardedRef.current=i)},r),Q(n,o)}return e.prototype.componentDidMount=function(){this.props.ambManager.addItem({node:this.ref.current,text:this.props.text})},e.prototype.render=function(){var n={onClick:this.selectItem,onKeyDown:this.handleKeyDown,role:"menuitem",tabIndex:"-1",ref:this.setRef};return ae(n,this.props,T),g.createElement(this.props.tag,n,this.props.children)},e}(g.Component);q.propTypes=T;q.defaultProps={tag:"div"};var nt=g.forwardRef(function(t,e){return g.createElement(Ce.Consumer,null,function(r){var n={ambManager:r,forwardedRef:e};return ae(n,t,{ambManager:T.ambManager,children:T.children,forwardedRef:T.forwardedRef}),g.createElement(q,n,t.children)})}),Z=oe,L={Wrapper:Ne,Button:Ge,Menu:Je,MenuItem:nt,openMenu:Z.openMenu,closeMenu:Z.closeMenu};const se=()=>u.jsxs("svg",{focusable:"false",role:"img","aria-hidden":"true",width:25,height:18,children:[u.jsx("title",{children:"Flag_of_Norway"}),u.jsxs("g",{fill:"none",fillRule:"evenodd",children:[u.jsx("path",{fill:"#EF2B2D",d:"M0 0h25v18H0z"}),u.jsx("path",{fill:"#FFF",d:"M6.875 0h4.688v18H6.875z"}),u.jsx("path",{fill:"#FFF",d:"M0 6.9h25v4.5H0z"}),u.jsx("path",{fill:"#002868",d:"M8.125 0h2.188v18H8.125z"}),u.jsx("path",{fill:"#002868",d:"M0 7.8h25v2.4H0z"})]})]});const rt=(t,e)=>u.jsx("li",{children:u.jsxs(L.MenuItem,{className:"languageToggle__menu__item",children:[u.jsx("div",{className:"languageToggle__button__flag",children:u.jsx(se,{})}),u.jsx("div",{className:"languageToggle__button__language","data-locale":e,children:ne(t,`locale.${e}`)})]})},e),F=({locale:t,toggle:e,availableLocales:r,isCleanVersion:n=!1})=>{const o=[...r].filter(a=>a!==t),s=fe();return u.jsx("div",{className:n?"languageToggle__without_background":"languageToggle__background",children:u.jsxs(L.Wrapper,{className:"languageToggle__wrapper",onSelection:a=>e(a[1].props["data-locale"]),children:[u.jsxs(L.Button,{className:"languageToggle__button",children:[u.jsx("div",{className:"languageToggle__button__flag",children:u.jsx(se,{})}),u.jsx("div",{className:"languageToggle__button__language",children:ne(s,`locale.${t}`)}),u.jsx("div",{children:u.jsx(le,{})})]}),u.jsx(L.Menu,{className:"languageToggle__menu",children:u.jsx("ul",{children:o.map(a=>rt(s,a))})})]})})},ue=F;try{F.displayName="LanguageToggle",F.__docgenInfo={description:"",displayName:"LanguageToggle",props:{toggle:{defaultValue:null,description:"",name:"toggle",required:!0,type:{name:"(locale: Locale) => void"}},locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'},{value:'"en"'}]}},availableLocales:{defaultValue:null,description:"",name:"availableLocales",required:!0,type:{name:"Locale[]"}},isCleanVersion:{defaultValue:{value:"false"},description:"",name:"isCleanVersion",required:!1,type:{name:"boolean"}}}}}catch{}const ht={title:"components/LanguageToggle",component:ue},ot=t=>u.jsx(ue,{...t}),b=ot.bind({});b.args={toggle:()=>null,locale:"nb",availableLocales:["nb","nn"]};var C,ee,te;b.parameters={...b.parameters,docs:{...(C=b.parameters)==null?void 0:C.docs,source:{originalSource:"args => <LanguageToggle {...args} />",...(te=(ee=b.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};const mt=["Default"];export{b as Default,mt as __namedExportsOrder,ht as default};
//# sourceMappingURL=LanguageToggle.stories-1e8cc0a4.js.map
