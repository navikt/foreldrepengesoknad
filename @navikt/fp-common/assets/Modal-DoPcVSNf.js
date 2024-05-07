import{r as i,R as f,a as me}from"./index-Dl6G-zuu.js";import{r as he}from"./index-D1_ZHIBm.js";import{c as R}from"./clsx-B-dksMZM.js";import{L as pe,D as be,H as ge}from"./Label-DWFI51kd.js";import{c as I}from"./composeEventHandlers-DeH74NdU.js";import{u as ve}from"./useId-W0kGORNo.js";import{o as ye,L as _e}from"./Loader-DLi21HaR.js";import{u as we}from"./useId-BnKOV0D5.js";const Ee=globalThis!=null&&globalThis.document?i.useLayoutEffect:()=>{};var Oe=function(e,o){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(n[t[r]]=e[t[r]]);return n};const xe=i.forwardRef((e,o)=>{var{title:n,titleId:t}=e,r=Oe(e,["title","titleId"]);let a=we();return a=n?t||"title-"+a:void 0,i.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:o,"aria-labelledby":a},r),n?i.createElement("title",{id:a},n):null,i.createElement("path",{d:"M6.53 5.47a.75.75 0 0 0-1.06 1.06L10.94 12l-5.47 5.47a.75.75 0 1 0 1.06 1.06L12 13.06l5.47 5.47a.75.75 0 1 0 1.06-1.06L13.06 12l5.47-5.47a.75.75 0 0 0-1.06-1.06L12 10.94 6.53 5.47Z",fill:"currentColor"}))}),Me=xe;function Se(e){return o=>{e.forEach(n=>{typeof n=="function"?n(o):n!=null&&(n.current=o)})}}function Z(...e){return f.useCallback(Se(e),e)}var Ce=function(e,o){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(n[t[r]]=e[t[r]]);return n};const De=i.forwardRef((e,o)=>{var{as:n="button",variant:t="primary",className:r,children:a,size:l="medium",loading:u=!1,disabled:s,style:p,icon:c,iconPosition:g="left"}=e,b=Ce(e,["as","variant","className","children","size","loading","disabled","style","icon","iconPosition"]);const v=i.useRef(null),[y,m]=i.useState(),E=Z(v,o);Ee(()=>{if(u){const x=window.requestAnimationFrame(()=>{var M,D;m((D=(M=v==null?void 0:v.current)===null||M===void 0?void 0:M.getBoundingClientRect())===null||D===void 0?void 0:D.width)});return()=>{m(void 0),cancelAnimationFrame(x)}}},[u,a]);const _=s??y?ye(b,["href"]):b,h=x=>{x.key===" "&&!s&&!y&&x.currentTarget.click()};return f.createElement(n,Object.assign({},n!=="button"?{role:"button"}:{},_,{ref:E,onKeyUp:I(_.onKeyUp,h),className:R(r,"navds-button",`navds-button--${t}`,`navds-button--${l}`,{"navds-button--loading":y,"navds-button--icon-only":!!c&&!a,"navds-button--disabled":s??y}),style:Object.assign(Object.assign({},p),{width:y}),disabled:s??y?!0:void 0}),y?f.createElement(_e,{size:l}):f.createElement(f.Fragment,null,c&&g==="left"&&f.createElement("span",{className:"navds-button__icon"},c),a&&f.createElement(pe,{as:"span",size:l==="medium"?"medium":"small"},a),c&&g==="right"&&f.createElement("span",{className:"navds-button__icon"},c)))}),ke=De;var P=function(){return P=Object.assign||function(o){for(var n,t=1,r=arguments.length;t<r;t++){n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(o[a]=n[a])}return o},P.apply(this,arguments)};var G={exports:{}},k={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var U;function Pe(){if(U)return k;U=1;var e=f,o=Symbol.for("react.element"),n=Symbol.for("react.fragment"),t=Object.prototype.hasOwnProperty,r=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function l(u,s,p){var c,g={},b=null,v=null;p!==void 0&&(b=""+p),s.key!==void 0&&(b=""+s.key),s.ref!==void 0&&(v=s.ref);for(c in s)t.call(s,c)&&!a.hasOwnProperty(c)&&(g[c]=s[c]);if(u&&u.defaultProps)for(c in s=u.defaultProps,s)g[c]===void 0&&(g[c]=s[c]);return{$$typeof:o,type:u,key:b,ref:v,props:g,_owner:r.current}}return k.Fragment=n,k.jsx=l,k.jsxs=l,k}G.exports=Pe();var Ne=G.exports,je=i.createContext(void 0);function Re(){var e=i.useContext(je);if(!e)throw new Error("useDayPicker must be used within a DayPickerProvider.");return e}i.createContext(void 0);i.forwardRef(function(e,o){var n=Re(),t=n.classNames,r=n.styles,a=[t.button_reset,t.button];e.className&&a.push(e.className);var l=a.join(" "),u=P(P({},r.button_reset),r.button);return e.style&&Object.assign(u,e.style),Ne.jsx("button",P({},e,{ref:o,type:"button",className:l,style:u}))});i.createContext(void 0);i.createContext(void 0);var w;(function(e){e.Outside="outside",e.Disabled="disabled",e.Selected="selected",e.Hidden="hidden",e.Today="today",e.RangeStart="range_start",e.RangeEnd="range_end",e.RangeMiddle="range_middle"})(w||(w={}));w.Selected;w.Disabled;w.Hidden;w.Today;w.RangeEnd;w.RangeMiddle;w.RangeStart;w.Outside;i.createContext(void 0);i.createContext(void 0);i.createContext(void 0);const Le=i.createContext(null);i.createContext({hasDropdown:!1,year:new Date,toYear:()=>null,disabled:[],onSelect:()=>null});function Ie(e){var o;return(e==null||(o=e.ownerDocument)==null?void 0:o.defaultView)||window}function Te(e){return e instanceof Element||e instanceof Ie(e).Element}var F=typeof document<"u"?i.useLayoutEffect:i.useEffect;let A=!1,Ae=0;const W=()=>"floating-ui-"+Ae++;function He(){const[e,o]=i.useState(()=>A?W():void 0);return F(()=>{e==null&&o(W())},[]),i.useEffect(()=>{A||(A=!0)},[]),e}const Fe=me.useId,Be=Fe||He;function $e(e){return"data-floating-ui-"+e}const ze=i.createContext(null);function qe(e){let{id:o,root:n}=e===void 0?{}:e;const[t,r]=i.useState(null),a=Be(),l=Ke(),u=i.useMemo(()=>({id:o,root:n,portalContext:l,uniqueId:a}),[o,n,l,a]),s=i.useRef();return F(()=>()=>{t==null||t.remove()},[t,u]),F(()=>{if(s.current===u)return;s.current=u;const{id:p,root:c,portalContext:g,uniqueId:b}=u,v=p?document.getElementById(p):null,y=$e("portal");if(v){const m=document.createElement("div");m.id=b,m.setAttribute(y,""),v.appendChild(m),r(m)}else{let m=c||(g==null?void 0:g.portalNode);m&&!Te(m)&&(m=m.current),m=m||document.body;let E=null;p&&(E=document.createElement("div"),E.id=p,m.appendChild(E));const _=document.createElement("div");_.id=b,_.setAttribute(y,""),m=E||m,m.appendChild(_),r(_)}},[u]),t}const Ke=()=>i.useContext(ze),Ve=i.createContext(void 0),Ue=()=>i.useContext(Ve);var We=function(e,o){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(n[t[r]]=e[t[r]]);return n};function Ye(e,o){return`${e} returned \`undefined\`. Seems you forgot to wrap component within ${o}`}function Xe(e={}){const{name:o,hookName:n="useContext",providerName:t="Provider",errorMessage:r,defaultValue:a}=e,l=i.createContext(a),u=i.forwardRef((p,c)=>{var{children:g}=p,b=We(p,["children"]);const v=f.useMemo(()=>b,Object.values(b));return f.createElement(l.Provider,{value:c?Object.assign(Object.assign({},v),{ref:c}):v},g)});function s(p=!0){var c;const g=i.useContext(l);if(!g&&p){const b=new Error(r??Ye(n,t));throw b.name="ContextError",(c=Error.captureStackTrace)===null||c===void 0||c.call(Error,b,s),b}return g}return l.displayName=o,[u,s]}const[Je,Q]=Xe({name:"ModalContext",errorMessage:"<Modal.Header> must be used within a <Modal>"});var Ze=function(e,o){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(n[t[r]]=e[t[r]]);return n};const Ge=i.forwardRef((e,o)=>{var{className:n}=e,t=Ze(e,["className"]);return f.createElement("div",Object.assign({},t,{ref:o,className:R("navds-modal__body",n)}))});var Qe=function(e,o){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(n[t[r]]=e[t[r]]);return n};const et=i.forwardRef((e,o)=>{var{className:n}=e,t=Qe(e,["className"]);return f.createElement("div",Object.assign({},t,{ref:o,className:R("navds-modal__footer",n)}))});var tt=function(e,o){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(n[t[r]]=e[t[r]]);return n};const ee=i.forwardRef((e,o)=>{var{children:n,className:t,closeButton:r=!0}=e,a=tt(e,["children","className","closeButton"]);const l=Q();return f.createElement("div",Object.assign({},a,{ref:o,className:R("navds-modal__header",t)}),l.closeHandler&&r&&f.createElement(ke,{type:"button",className:"navds-modal__button",size:"small",variant:"tertiary-neutral",onClick:l.closeHandler,icon:f.createElement(Me,{title:"Lukk"})}),n)}),Y=({clientX:e,clientY:o},{left:n,top:t,right:r,bottom:a})=>!(e<n||o<t||e>r||o>a);function ot(e,o,n){if(!(o&&o.closeButton===!1))return n?()=>{var t;return n()!==!1&&((t=e.current)===null||t===void 0?void 0:t.close())}:()=>{var t;return(t=e.current)===null||t===void 0?void 0:t.close()}}const L="navds-modal__document-body";function nt(e,o,n){f.useEffect(()=>{if(n||!e.current||!o)return;e.current.open&&document.body.classList.add(L);const t=new MutationObserver(()=>{var r;!((r=e.current)===null||r===void 0)&&r.open?document.body.classList.add(L):document.body.classList.remove(L)});return t.observe(e.current,{attributes:!0,attributeFilter:["open"]}),()=>{t.disconnect(),document.body.classList.remove(L)}},[e,o,n])}const N=typeof window<"u"&&(window.HTMLDialogElement===void 0||navigator.userAgent.includes("jsdom"));function te(e,o){var n="on"+o.type.toLowerCase();return typeof e[n]=="function"&&e[n](o),e.dispatchEvent(o)}function j(e){for(;e;){if(e.localName==="dialog")return e;e.parentElement?e=e.parentElement:e.parentNode?e=e.parentNode.host:e=null}return null}function oe(e){for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;e&&e.blur&&e!==document.body&&e.blur()}function rt(e,o){for(var n=0;n<e.length;++n)if(e[n]===o)return!0;return!1}function H(e){return!e||!e.hasAttribute("method")?!1:e.getAttribute("method").toLowerCase()==="dialog"}function ne(e){var o=["button","input","keygen","select","textarea"],n=o.map(function(l){return l+":not([disabled])"});n.push('[tabindex]:not([disabled]):not([tabindex=""])');var t=e.querySelector(n.join(", "));if(!t&&"attachShadow"in Element.prototype)for(var r=e.querySelectorAll("*"),a=0;a<r.length&&!(r[a].tagName&&r[a].shadowRoot&&(t=ne(r[a].shadowRoot),t));a++);return t}function X(e){return e.isConnected||document.body.contains(e)}function re(e){if(e.submitter)return e.submitter;var o=e.target;if(!(o instanceof HTMLFormElement))return null;var n=d.formSubmitter;if(!n){var t=e.target,r="getRootNode"in t&&t.getRootNode()||document;n=r.activeElement}return!n||n.form!==o?null:n}function at(e){if(!e.defaultPrevented){var o=e.target,n=d.imagemapUseValue,t=re(e);n===null&&t&&(n=t.value);var r=j(o);if(r){var a=t&&t.getAttribute("formmethod")||o.getAttribute("method");a==="dialog"&&(e.preventDefault(),n!=null?r.close(n):r.close())}}}function ae(e){if(this.dialog_=e,this.replacedStyleTop_=!1,this.openAsModal_=!1,e.hasAttribute("role")||e.setAttribute("role","dialog"),e.show=this.show.bind(this),e.showModal=this.showModal.bind(this),e.close=this.close.bind(this),e.addEventListener("submit",at,!1),"returnValue"in e||(e.returnValue=""),"MutationObserver"in window){var o=new MutationObserver(this.maybeHideModal.bind(this));o.observe(e,{attributes:!0,attributeFilter:["open"]})}else{var n=!1,t=(function(){n?this.downgradeModal():this.maybeHideModal(),n=!1}).bind(this),r,a=function(l){if(l.target===e){var u="DOMNodeRemoved";n|=l.type.substr(0,u.length)===u,window.clearTimeout(r),r=window.setTimeout(t,0)}};["DOMAttrModified","DOMNodeRemoved","DOMNodeRemovedFromDocument"].forEach(function(l){e.addEventListener(l,a)})}Object.defineProperty(e,"open",{set:this.setOpen.bind(this),get:e.hasAttribute.bind(e,"open")}),this.backdrop_=document.createElement("div"),this.backdrop_.className="backdrop",this.backdrop_.addEventListener("mouseup",this.backdropMouseEvent_.bind(this)),this.backdrop_.addEventListener("mousedown",this.backdropMouseEvent_.bind(this)),this.backdrop_.addEventListener("click",this.backdropMouseEvent_.bind(this))}ae.prototype={get dialog(){return this.dialog_},maybeHideModal:function(){this.dialog_.hasAttribute("open")&&X(this.dialog_)||this.downgradeModal()},downgradeModal:function(){this.openAsModal_&&(this.openAsModal_=!1,this.dialog_.style.zIndex="",this.replacedStyleTop_&&(this.dialog_.style.top="",this.replacedStyleTop_=!1),this.backdrop_.parentNode&&this.backdrop_.parentNode.removeChild(this.backdrop_),d.dm.removeDialog(this))},setOpen:function(e){e?this.dialog_.hasAttribute("open")||this.dialog_.setAttribute("open",""):(this.dialog_.removeAttribute("open"),this.maybeHideModal())},backdropMouseEvent_:function(e){if(this.dialog_.hasAttribute("tabindex"))this.dialog_.focus();else{var o=document.createElement("div");this.dialog_.insertBefore(o,this.dialog_.firstChild),o.tabIndex=-1,o.focus(),this.dialog_.removeChild(o)}var n=document.createEvent("MouseEvents");n.initMouseEvent(e.type,e.bubbles,e.cancelable,window,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget),this.dialog_.dispatchEvent(n),e.stopPropagation()},focus_:function(){var e=this.dialog_.querySelector("[autofocus]:not([disabled])");!e&&this.dialog_.tabIndex>=0&&(e=this.dialog_),e||(e=ne(this.dialog_)),oe(document.activeElement),e&&e.focus()},updateZIndex:function(e,o){if(e<o)throw new Error("dialogZ should never be < backdropZ");this.dialog_.style.zIndex=e,this.backdrop_.style.zIndex=o},show:function(){this.dialog_.open||(this.setOpen(!0),this.focus_())},showModal:function(){if(this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'showModal' on dialog: The element is already open, and therefore cannot be opened modally.");if(!X(this.dialog_))throw new Error("Failed to execute 'showModal' on dialog: The element is not in a Document.");if(!d.dm.pushDialog(this))throw new Error("Failed to execute 'showModal' on dialog: There are too many open modal dialogs.");this.setOpen(!0),this.openAsModal_=!0,d.needsCentering(this.dialog_)?(d.reposition(this.dialog_),this.replacedStyleTop_=!0):this.replacedStyleTop_=!1,this.dialog_.parentNode.insertBefore(this.backdrop_,this.dialog_.nextSibling),this.focus_()},close:function(e){if(!this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'close' on dialog: The element does not have an 'open' attribute, and therefore cannot be closed.");this.setOpen(!1),e!==void 0&&(this.dialog_.returnValue=e);var o=new window.CustomEvent("close",{bubbles:!1,cancelable:!1});te(this.dialog_,o)}};var d={};d.reposition=function(e){var o=document.body.scrollTop||document.documentElement.scrollTop,n=o+(window.innerHeight-e.offsetHeight)/2;e.style.top=Math.max(o,n)+"px"};d.isInlinePositionSetByStylesheet=function(e){for(var o=0;o<document.styleSheets.length;++o){var n=document.styleSheets[o],t=null;try{t=n.cssRules}catch{}if(t)for(var r=0;r<t.length;++r){var a=t[r],l=null;try{l=document.querySelectorAll(a.selectorText)}catch{}if(!(!l||!rt(l,e))){var u=a.style.getPropertyValue("top"),s=a.style.getPropertyValue("bottom");if(u&&u!=="auto"||s&&s!=="auto")return!0}}}return!1};d.needsCentering=function(e){var o=window.getComputedStyle(e);return o.position!=="absolute"||e.style.top!=="auto"&&e.style.top!==""||e.style.bottom!=="auto"&&e.style.bottom!==""?!1:!d.isInlinePositionSetByStylesheet(e)};d.forceRegisterDialog=function(e){if(e.showModal&&console.warn("This browser already supports <dialog>, the polyfill may not work correctly",e),e.localName!=="dialog")throw new Error("Failed to register dialog: The element is not a dialog.");new ae(e)};d.registerDialog=function(e){e.showModal||d.forceRegisterDialog(e)};d.DialogManager=function(){this.pendingDialogStack=[];var e=this.checkDOM_.bind(this);this.overlay=document.createElement("div"),this.overlay.className="_dialog_overlay",this.overlay.addEventListener("click",(function(o){this.forwardTab_=void 0,o.stopPropagation(),e([])}).bind(this)),this.handleKey_=this.handleKey_.bind(this),this.handleFocus_=this.handleFocus_.bind(this),this.zIndexLow_=1e5,this.zIndexHigh_=100150,this.forwardTab_=void 0,"MutationObserver"in window&&(this.mo_=new MutationObserver(function(o){var n=[];o.forEach(function(t){for(var r=0,a;a=t.removedNodes[r];++r){if(a instanceof Element)a.localName==="dialog"&&n.push(a);else continue;n=n.concat(a.querySelectorAll("dialog"))}}),n.length&&e(n)}))};d.DialogManager.prototype.blockDocument=function(){document.documentElement.addEventListener("focus",this.handleFocus_,!0),document.addEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.observe(document,{childList:!0,subtree:!0})};d.DialogManager.prototype.unblockDocument=function(){document.documentElement.removeEventListener("focus",this.handleFocus_,!0),document.removeEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.disconnect()};d.DialogManager.prototype.updateStacking=function(){for(var e=this.zIndexHigh_,o=0,n;n=this.pendingDialogStack[o];++o)n.updateZIndex(--e,--e),o===0&&(this.overlay.style.zIndex=--e);var t=this.pendingDialogStack[0];if(t){var r=t.dialog.parentNode||document.body;r.appendChild(this.overlay)}else this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay)};d.DialogManager.prototype.containedByTopDialog_=function(e){for(;e=j(e);){for(var o=0,n;n=this.pendingDialogStack[o];++o)if(n.dialog===e)return o===0;e=e.parentElement}return!1};d.DialogManager.prototype.handleFocus_=function(e){var o=e.composedPath?e.composedPath()[0]:e.target;if(!this.containedByTopDialog_(o)&&document.activeElement!==document.documentElement&&(e.preventDefault(),e.stopPropagation(),oe(o),this.forwardTab_!==void 0)){var n=this.pendingDialogStack[0],t=n.dialog,r=t.compareDocumentPosition(o);return r&Node.DOCUMENT_POSITION_PRECEDING&&(this.forwardTab_?n.focus_():o!==document.documentElement&&document.documentElement.focus()),!1}};d.DialogManager.prototype.handleKey_=function(e){if(this.forwardTab_=void 0,e.keyCode===27){e.preventDefault(),e.stopPropagation();var o=new window.CustomEvent("cancel",{bubbles:!1,cancelable:!0}),n=this.pendingDialogStack[0];n&&te(n.dialog,o)&&n.dialog.close()}else e.keyCode===9&&(this.forwardTab_=!e.shiftKey)};d.DialogManager.prototype.checkDOM_=function(e){var o=this.pendingDialogStack.slice();o.forEach(function(n){e.indexOf(n.dialog)!==-1?n.downgradeModal():n.maybeHideModal()})};d.DialogManager.prototype.pushDialog=function(e){var o=(this.zIndexHigh_-this.zIndexLow_)/2-1;return this.pendingDialogStack.length>=o?!1:(this.pendingDialogStack.unshift(e)===1&&this.blockDocument(),this.updateStacking(),!0)};d.DialogManager.prototype.removeDialog=function(e){var o=this.pendingDialogStack.indexOf(e);o!==-1&&(this.pendingDialogStack.splice(o,1),this.pendingDialogStack.length===0&&this.unblockDocument(),this.updateStacking())};N&&(d.dm=new d.DialogManager,d.formSubmitter=null,d.imagemapUseValue=null);if(N){var J=document.createElement("form");if(J.setAttribute("method","dialog"),J.method!=="dialog"){var C=Object.getOwnPropertyDescriptor(HTMLFormElement.prototype,"method");if(C){var it=C.get;C.get=function(){return H(this)?"dialog":it.call(this)};var lt=C.set;C.set=function(e){return typeof e=="string"&&e.toLowerCase()==="dialog"?this.setAttribute("method",e):lt.call(this,e)},Object.defineProperty(HTMLFormElement.prototype,"method",C)}}document.addEventListener("click",function(e){if(d.formSubmitter=null,d.imagemapUseValue=null,!e.defaultPrevented){var o=e.target;if("composedPath"in e){var n=e.composedPath();o=n.shift()||o}if(!(!o||!H(o.form))){var t=o.type==="submit"&&["button","input"].indexOf(o.localName)>-1;if(!t){if(!(o.localName==="input"&&o.type==="image"))return;d.imagemapUseValue=e.offsetX+","+e.offsetY}var r=j(o);r&&(d.formSubmitter=o)}}},!1),document.addEventListener("submit",function(e){var o=e.target,n=j(o);if(!n){var t=re(e),r=t&&t.getAttribute("formmethod")||o.getAttribute("method");r==="dialog"&&e.preventDefault()}});var st=HTMLFormElement.prototype.submit,dt=function(){if(!H(this))return st.call(this);var e=j(this);e&&e.close()};HTMLFormElement.prototype.submit=dt}var ut=function(e,o){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(n[t[r]]=e[t[r]]);return n};const T=i.forwardRef((e,o)=>{var n,t,{header:r,children:a,open:l,onBeforeClose:u,onCancel:s,closeOnBackdropClick:p,width:c,portal:g,className:b,"aria-labelledby":v,style:y,onClick:m,onMouseDown:E}=e,_=ut(e,["header","children","open","onBeforeClose","onCancel","closeOnBackdropClick","width","portal","className","aria-labelledby","style","onClick","onMouseDown"]);const h=i.useRef(null),x=Z(h,o),M=ve(),D=(n=Ue())===null||n===void 0?void 0:n.rootElement,O=qe({root:D}),ie=i.useContext(Le),B=Q(!1)!==void 0;B&&!ie&&console.error("Modals should not be nested"),i.useEffect(()=>{N&&h.current&&O&&d.registerDialog(h.current),h.current&&O&&(h.current.autofocus=!0)},[h,O]),i.useEffect(()=>{h.current&&O&&l!==void 0&&(l&&!h.current.open?h.current.showModal():!l&&h.current.open&&h.current.close())},[h,O,l]),nt(h,O,B);const $=typeof c=="string"&&["small","medium"].includes(c),le=R("navds-modal",b,{"navds-modal--polyfilled":N,"navds-modal--autowidth":!c,[`navds-modal--${c}`]:$}),se=Object.assign(Object.assign({},y),$?{}:{width:c}),z=i.useRef({clientX:0,clientY:0}),de=S=>{z.current=S},q=p&&!N,ue=S=>{if(S.target!==h.current)return;const V=h.current.getBoundingClientRect();Y(z.current,V)||Y(S,V)||u!==void 0&&u()===!1||h.current.close()},ce=S=>{u&&u()===!1&&S.preventDefault()},fe=!v&&!_["aria-label"]&&r?M:v,K=f.createElement("dialog",Object.assign({},_,{ref:x,className:le,style:se,onCancel:I(s,ce),onClick:q?I(m,ue):m,onMouseDown:q?I(E,de):E,"aria-labelledby":fe}),f.createElement(Je,{closeHandler:ot(h,r,u),ref:h},r&&f.createElement(ee,null,r.label&&f.createElement(be,{className:"navds-modal__label"},r.label),f.createElement(ge,{size:(t=r.size)!==null&&t!==void 0?t:"medium",level:"1",id:M},f.createElement("span",{className:"navds-modal__header-icon"},r.icon),r.heading)),a));return g?O?he.createPortal(K,O):null:K});T.Header=ee;T.Body=Ge;T.Footer=et;const yt=T;export{ke as B,yt as M};
