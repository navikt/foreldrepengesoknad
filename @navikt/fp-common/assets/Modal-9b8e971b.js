import{r as i,R as m,a as ee}from"./index-76fb7be0.js";import{r as te}from"./index-d3ea75b5.js";import{c as x}from"./clsx.m-1229b3e0.js";import{o as oe,L as ne}from"./Loader-f448091f.js";import{L as re}from"./Label-25b8f92d.js";import{u as ae}from"./useId-b2ee2642.js";import{t as ie}from"./util-5af9592f.js";import{H as le}from"./Heading-4c0371fa.js";import{u as se}from"./useId-3db0ed0c.js";function $(e){return o=>{e.forEach(n=>{typeof n=="function"?n(o):n!=null&&(n.current=o)})}}const de=()=>typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",ce=de()?i.useLayoutEffect:()=>{};var ue=globalThis&&globalThis.__rest||function(e,o){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(n[t[r]]=e[t[r]]);return n};const fe=i.forwardRef((e,o)=>{var{className:n,size:t="medium",spacing:r,uppercase:a,as:s="p",truncate:c,weight:f="regular",align:p,visuallyHidden:h,textColor:y}=e,w=ue(e,["className","size","spacing","uppercase","as","truncate","weight","align","visuallyHidden","textColor"]);return m.createElement(s,Object.assign({},w,{ref:o,className:x(n,"navds-detail",ie({spacing:r,truncate:c,weight:f,align:p,visuallyHidden:h,textColor:y,uppercase:a}),{"navds-detail--small":t==="small"})}))}),me=fe;var he=globalThis&&globalThis.__rest||function(e,o){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(n[t[r]]=e[t[r]]);return n};const pe=i.forwardRef((e,o)=>{var{title:n,titleId:t}=e,r=he(e,["title","titleId"]);let a=ae();return a=n?t||"title-"+a:void 0,i.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:o,"aria-labelledby":a},r),n?i.createElement("title",{id:a},n):null,i.createElement("path",{d:"M6.53 5.47a.75.75 0 0 0-1.06 1.06L10.94 12l-5.47 5.47a.75.75 0 1 0 1.06 1.06L12 13.06l5.47 5.47a.75.75 0 1 0 1.06-1.06L13.06 12l5.47-5.47a.75.75 0 0 0-1.06-1.06L12 10.94 6.53 5.47Z",fill:"currentColor"}))}),be=pe;var ge=globalThis&&globalThis.__rest||function(e,o){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(n[t[r]]=e[t[r]]);return n};const ve=i.forwardRef((e,o)=>{var{as:n="button",variant:t="primary",className:r,children:a,size:s="medium",loading:c=!1,disabled:f,style:p,icon:h,iconPosition:y="left"}=e,w=ge(e,["as","variant","className","children","size","loading","disabled","style","icon","iconPosition"]);const g=i.useRef(null),[b,u]=i.useState(),_=i.useMemo(()=>$([g,o]),[o]);ce(()=>{if(c){const O=window.requestAnimationFrame(()=>{var v,S;u((S=(v=g==null?void 0:g.current)===null||v===void 0?void 0:v.getBoundingClientRect())===null||S===void 0?void 0:S.width)});return()=>{u(void 0),cancelAnimationFrame(O)}}},[c,a]);const d=f??b?oe(w,["href"]):w;return m.createElement(n,Object.assign({},n!=="button"?{role:"button"}:{},d,{ref:_,onKeyUp:O=>{var v;(v=d.onKeyUp)===null||v===void 0||v.call(d,O),O.key===" "&&!f&&!b&&!O.isDefaultPrevented()&&O.currentTarget.click()},className:x(r,"navds-button",`navds-button--${t}`,`navds-button--${s}`,{"navds-button--loading":b,"navds-button--icon-only":!!h&&!a,"navds-button--disabled":f??b}),style:Object.assign(Object.assign({},p),{width:b}),disabled:f??b?!0:void 0}),b?m.createElement(ne,{size:s}):m.createElement(m.Fragment,null,h&&y==="left"&&m.createElement("span",{className:"navds-button__icon"},h),a&&m.createElement(re,{as:"span",size:s==="medium"?"medium":"small"},a),h&&y==="right"&&m.createElement("span",{className:"navds-button__icon"},h)))}),ye=ve,we=i.createContext(null);function _e(e){var o;return(e==null||(o=e.ownerDocument)==null?void 0:o.defaultView)||window}function Oe(e){return e instanceof Element||e instanceof _e(e).Element}var j=typeof document<"u"?i.useLayoutEffect:i.useEffect;let T=!1,Ee=0;const R=()=>"floating-ui-"+Ee++;function Me(){const[e,o]=i.useState(()=>T?R():void 0);return j(()=>{e==null&&o(R())},[]),i.useEffect(()=>{T||(T=!0)},[]),e}const xe=ee["useId".toString()],Se=xe||Me;function Ce(e){return"data-floating-ui-"+e}const De=i.createContext(null);function ke(e){let{id:o,root:n}=e===void 0?{}:e;const[t,r]=i.useState(null),a=Se(),s=Pe(),c=i.useMemo(()=>({id:o,root:n,portalContext:s,uniqueId:a}),[o,n,s,a]),f=i.useRef();return j(()=>()=>{t==null||t.remove()},[t,c]),j(()=>{if(f.current===c)return;f.current=c;const{id:p,root:h,portalContext:y,uniqueId:w}=c,g=p?document.getElementById(p):null,b=Ce("portal");if(g){const u=document.createElement("div");u.id=w,u.setAttribute(b,""),g.appendChild(u),r(u)}else{let u=h||(y==null?void 0:y.portalNode);u&&!Oe(u)&&(u=u.current),u=u||document.body;let _=null;p&&(_=document.createElement("div"),_.id=p,u.appendChild(_));const d=document.createElement("div");d.id=w,d.setAttribute(b,""),u=_||u,u.appendChild(d),r(d)}},[c]),t}const Pe=()=>i.useContext(De);globalThis&&globalThis.__rest;const Ne=i.createContext(void 0),Te=()=>i.useContext(Ne);var Ie=globalThis&&globalThis.__rest||function(e,o){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(n[t[r]]=e[t[r]]);return n};const je=i.forwardRef((e,o)=>{var{className:n}=e,t=Ie(e,["className"]);return m.createElement("div",Object.assign({},t,{ref:o,className:x("navds-modal__body",n)}))}),Le=je,L=m.createContext(null);var Ae=globalThis&&globalThis.__rest||function(e,o){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(n[t[r]]=e[t[r]]);return n};const He=i.forwardRef((e,o)=>{var{className:n}=e,t=Ae(e,["className"]);return m.createElement("div",Object.assign({},t,{ref:o,className:x("navds-modal__footer",n)}))}),Re=He;var Fe=globalThis&&globalThis.__rest||function(e,o){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(n[t[r]]=e[t[r]]);return n};const Be=i.forwardRef((e,o)=>{var{children:n,className:t,closeButton:r=!0}=e,a=Fe(e,["children","className","closeButton"]);const s=i.useContext(L);return s===null?(console.error("<Modal.Header> has to be used within a <Modal>"),null):m.createElement("div",Object.assign({},a,{ref:o,className:x("navds-modal__header",t)}),s.closeHandler&&r&&m.createElement(ye,{type:"button",className:"navds-modal__button",size:"small",variant:"tertiary-neutral",onClick:s.closeHandler,icon:m.createElement(be,{title:"Lukk modalvindu"})}),n)}),z=Be;function $e(e,o,n){if(!(o&&o.closeButton===!1))return n?()=>{var t;return n()!==!1&&((t=e.current)===null||t===void 0?void 0:t.close())}:()=>{var t;return(t=e.current)===null||t===void 0?void 0:t.close()}}const P="navds-modal__document-body";function ze(e,o){m.useEffect(()=>{if(!e.current||!o)return;e.current.open&&document.body.classList.add(P);const n=new MutationObserver(()=>{var t;!((t=e.current)===null||t===void 0)&&t.open?document.body.classList.add(P):document.body.classList.remove(P)});return n.observe(e.current,{attributes:!0,attributeFilter:["open"]}),()=>{n.disconnect(),document.body.classList.remove(P)}},[e,o])}const D=typeof window<"u"&&(window.HTMLDialogElement===void 0||navigator.userAgent.includes("jsdom"));function K(e,o){var n="on"+o.type.toLowerCase();return typeof e[n]=="function"&&e[n](o),e.dispatchEvent(o)}function k(e){for(;e;){if(e.localName==="dialog")return e;e.parentElement?e=e.parentElement:e.parentNode?e=e.parentNode.host:e=null}return null}function q(e){for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;e&&e.blur&&e!==document.body&&e.blur()}function Ke(e,o){for(var n=0;n<e.length;++n)if(e[n]===o)return!0;return!1}function I(e){return!e||!e.hasAttribute("method")?!1:e.getAttribute("method").toLowerCase()==="dialog"}function V(e){var o=["button","input","keygen","select","textarea"],n=o.map(function(s){return s+":not([disabled])"});n.push('[tabindex]:not([disabled]):not([tabindex=""])');var t=e.querySelector(n.join(", "));if(!t&&"attachShadow"in Element.prototype)for(var r=e.querySelectorAll("*"),a=0;a<r.length&&!(r[a].tagName&&r[a].shadowRoot&&(t=V(r[a].shadowRoot),t));a++);return t}function F(e){return e.isConnected||document.body.contains(e)}function U(e){if(e.submitter)return e.submitter;var o=e.target;if(!(o instanceof HTMLFormElement))return null;var n=l.formSubmitter;if(!n){var t=e.target,r="getRootNode"in t&&t.getRootNode()||document;n=r.activeElement}return!n||n.form!==o?null:n}function qe(e){if(!e.defaultPrevented){var o=e.target,n=l.imagemapUseValue,t=U(e);n===null&&t&&(n=t.value);var r=k(o);if(r){var a=t&&t.getAttribute("formmethod")||o.getAttribute("method");a==="dialog"&&(e.preventDefault(),n!=null?r.close(n):r.close())}}}function W(e){if(this.dialog_=e,this.replacedStyleTop_=!1,this.openAsModal_=!1,e.hasAttribute("role")||e.setAttribute("role","dialog"),e.show=this.show.bind(this),e.showModal=this.showModal.bind(this),e.close=this.close.bind(this),e.addEventListener("submit",qe,!1),"returnValue"in e||(e.returnValue=""),"MutationObserver"in window){var o=new MutationObserver(this.maybeHideModal.bind(this));o.observe(e,{attributes:!0,attributeFilter:["open"]})}else{var n=!1,t=(function(){n?this.downgradeModal():this.maybeHideModal(),n=!1}).bind(this),r,a=function(s){if(s.target===e){var c="DOMNodeRemoved";n|=s.type.substr(0,c.length)===c,window.clearTimeout(r),r=window.setTimeout(t,0)}};["DOMAttrModified","DOMNodeRemoved","DOMNodeRemovedFromDocument"].forEach(function(s){e.addEventListener(s,a)})}Object.defineProperty(e,"open",{set:this.setOpen.bind(this),get:e.hasAttribute.bind(e,"open")}),this.backdrop_=document.createElement("div"),this.backdrop_.className="backdrop",this.backdrop_.addEventListener("mouseup",this.backdropMouseEvent_.bind(this)),this.backdrop_.addEventListener("mousedown",this.backdropMouseEvent_.bind(this)),this.backdrop_.addEventListener("click",this.backdropMouseEvent_.bind(this))}W.prototype={get dialog(){return this.dialog_},maybeHideModal:function(){this.dialog_.hasAttribute("open")&&F(this.dialog_)||this.downgradeModal()},downgradeModal:function(){this.openAsModal_&&(this.openAsModal_=!1,this.dialog_.style.zIndex="",this.replacedStyleTop_&&(this.dialog_.style.top="",this.replacedStyleTop_=!1),this.backdrop_.parentNode&&this.backdrop_.parentNode.removeChild(this.backdrop_),l.dm.removeDialog(this))},setOpen:function(e){e?this.dialog_.hasAttribute("open")||this.dialog_.setAttribute("open",""):(this.dialog_.removeAttribute("open"),this.maybeHideModal())},backdropMouseEvent_:function(e){if(this.dialog_.hasAttribute("tabindex"))this.dialog_.focus();else{var o=document.createElement("div");this.dialog_.insertBefore(o,this.dialog_.firstChild),o.tabIndex=-1,o.focus(),this.dialog_.removeChild(o)}var n=document.createEvent("MouseEvents");n.initMouseEvent(e.type,e.bubbles,e.cancelable,window,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget),this.dialog_.dispatchEvent(n),e.stopPropagation()},focus_:function(){var e=this.dialog_.querySelector("[autofocus]:not([disabled])");!e&&this.dialog_.tabIndex>=0&&(e=this.dialog_),e||(e=V(this.dialog_)),q(document.activeElement),e&&e.focus()},updateZIndex:function(e,o){if(e<o)throw new Error("dialogZ should never be < backdropZ");this.dialog_.style.zIndex=e,this.backdrop_.style.zIndex=o},show:function(){this.dialog_.open||(this.setOpen(!0),this.focus_())},showModal:function(){if(this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'showModal' on dialog: The element is already open, and therefore cannot be opened modally.");if(!F(this.dialog_))throw new Error("Failed to execute 'showModal' on dialog: The element is not in a Document.");if(!l.dm.pushDialog(this))throw new Error("Failed to execute 'showModal' on dialog: There are too many open modal dialogs.");this.setOpen(!0),this.openAsModal_=!0,l.needsCentering(this.dialog_)?(l.reposition(this.dialog_),this.replacedStyleTop_=!0):this.replacedStyleTop_=!1,this.dialog_.parentNode.insertBefore(this.backdrop_,this.dialog_.nextSibling),this.focus_()},close:function(e){if(!this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'close' on dialog: The element does not have an 'open' attribute, and therefore cannot be closed.");this.setOpen(!1),e!==void 0&&(this.dialog_.returnValue=e);var o=new window.CustomEvent("close",{bubbles:!1,cancelable:!1});K(this.dialog_,o)}};var l={};l.reposition=function(e){var o=document.body.scrollTop||document.documentElement.scrollTop,n=o+(window.innerHeight-e.offsetHeight)/2;e.style.top=Math.max(o,n)+"px"};l.isInlinePositionSetByStylesheet=function(e){for(var o=0;o<document.styleSheets.length;++o){var n=document.styleSheets[o],t=null;try{t=n.cssRules}catch{}if(t)for(var r=0;r<t.length;++r){var a=t[r],s=null;try{s=document.querySelectorAll(a.selectorText)}catch{}if(!(!s||!Ke(s,e))){var c=a.style.getPropertyValue("top"),f=a.style.getPropertyValue("bottom");if(c&&c!=="auto"||f&&f!=="auto")return!0}}}return!1};l.needsCentering=function(e){var o=window.getComputedStyle(e);return o.position!=="absolute"||e.style.top!=="auto"&&e.style.top!==""||e.style.bottom!=="auto"&&e.style.bottom!==""?!1:!l.isInlinePositionSetByStylesheet(e)};l.forceRegisterDialog=function(e){if(e.showModal&&console.warn("This browser already supports <dialog>, the polyfill may not work correctly",e),e.localName!=="dialog")throw new Error("Failed to register dialog: The element is not a dialog.");new W(e)};l.registerDialog=function(e){e.showModal||l.forceRegisterDialog(e)};l.DialogManager=function(){this.pendingDialogStack=[];var e=this.checkDOM_.bind(this);this.overlay=document.createElement("div"),this.overlay.className="_dialog_overlay",this.overlay.addEventListener("click",(function(o){this.forwardTab_=void 0,o.stopPropagation(),e([])}).bind(this)),this.handleKey_=this.handleKey_.bind(this),this.handleFocus_=this.handleFocus_.bind(this),this.zIndexLow_=1e5,this.zIndexHigh_=1e5+150,this.forwardTab_=void 0,"MutationObserver"in window&&(this.mo_=new MutationObserver(function(o){var n=[];o.forEach(function(t){for(var r=0,a;a=t.removedNodes[r];++r){if(a instanceof Element)a.localName==="dialog"&&n.push(a);else continue;n=n.concat(a.querySelectorAll("dialog"))}}),n.length&&e(n)}))};l.DialogManager.prototype.blockDocument=function(){document.documentElement.addEventListener("focus",this.handleFocus_,!0),document.addEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.observe(document,{childList:!0,subtree:!0})};l.DialogManager.prototype.unblockDocument=function(){document.documentElement.removeEventListener("focus",this.handleFocus_,!0),document.removeEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.disconnect()};l.DialogManager.prototype.updateStacking=function(){for(var e=this.zIndexHigh_,o=0,n;n=this.pendingDialogStack[o];++o)n.updateZIndex(--e,--e),o===0&&(this.overlay.style.zIndex=--e);var t=this.pendingDialogStack[0];if(t){var r=t.dialog.parentNode||document.body;r.appendChild(this.overlay)}else this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay)};l.DialogManager.prototype.containedByTopDialog_=function(e){for(;e=k(e);){for(var o=0,n;n=this.pendingDialogStack[o];++o)if(n.dialog===e)return o===0;e=e.parentElement}return!1};l.DialogManager.prototype.handleFocus_=function(e){var o=e.composedPath?e.composedPath()[0]:e.target;if(!this.containedByTopDialog_(o)&&document.activeElement!==document.documentElement&&(e.preventDefault(),e.stopPropagation(),q(o),this.forwardTab_!==void 0)){var n=this.pendingDialogStack[0],t=n.dialog,r=t.compareDocumentPosition(o);return r&Node.DOCUMENT_POSITION_PRECEDING&&(this.forwardTab_?n.focus_():o!==document.documentElement&&document.documentElement.focus()),!1}};l.DialogManager.prototype.handleKey_=function(e){if(this.forwardTab_=void 0,e.keyCode===27){e.preventDefault(),e.stopPropagation();var o=new window.CustomEvent("cancel",{bubbles:!1,cancelable:!0}),n=this.pendingDialogStack[0];n&&K(n.dialog,o)&&n.dialog.close()}else e.keyCode===9&&(this.forwardTab_=!e.shiftKey)};l.DialogManager.prototype.checkDOM_=function(e){var o=this.pendingDialogStack.slice();o.forEach(function(n){e.indexOf(n.dialog)!==-1?n.downgradeModal():n.maybeHideModal()})};l.DialogManager.prototype.pushDialog=function(e){var o=(this.zIndexHigh_-this.zIndexLow_)/2-1;return this.pendingDialogStack.length>=o?!1:(this.pendingDialogStack.unshift(e)===1&&this.blockDocument(),this.updateStacking(),!0)};l.DialogManager.prototype.removeDialog=function(e){var o=this.pendingDialogStack.indexOf(e);o!==-1&&(this.pendingDialogStack.splice(o,1),this.pendingDialogStack.length===0&&this.unblockDocument(),this.updateStacking())};D&&(l.dm=new l.DialogManager,l.formSubmitter=null,l.imagemapUseValue=null);if(D){var B=document.createElement("form");if(B.setAttribute("method","dialog"),B.method!=="dialog"){var M=Object.getOwnPropertyDescriptor(HTMLFormElement.prototype,"method");if(M){var Ve=M.get;M.get=function(){return I(this)?"dialog":Ve.call(this)};var Ue=M.set;M.set=function(e){return typeof e=="string"&&e.toLowerCase()==="dialog"?this.setAttribute("method",e):Ue.call(this,e)},Object.defineProperty(HTMLFormElement.prototype,"method",M)}}document.addEventListener("click",function(e){if(l.formSubmitter=null,l.imagemapUseValue=null,!e.defaultPrevented){var o=e.target;if("composedPath"in e){var n=e.composedPath();o=n.shift()||o}if(!(!o||!I(o.form))){var t=o.type==="submit"&&["button","input"].indexOf(o.localName)>-1;if(!t){if(!(o.localName==="input"&&o.type==="image"))return;l.imagemapUseValue=e.offsetX+","+e.offsetY}var r=k(o);r&&(l.formSubmitter=o)}}},!1),document.addEventListener("submit",function(e){var o=e.target,n=k(o);if(!n){var t=U(e),r=t&&t.getAttribute("formmethod")||o.getAttribute("method");r==="dialog"&&e.preventDefault()}});var We=HTMLFormElement.prototype.submit,Xe=function(){if(!I(this))return We.call(this);var e=k(this);e&&e.close()};HTMLFormElement.prototype.submit=Xe}const Ye=l;var Ze=globalThis&&globalThis.__rest||function(e,o){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(n[t[r]]=e[t[r]]);return n};const N=i.forwardRef((e,o)=>{var n,t,{header:r,children:a,open:s,onBeforeClose:c,onCancel:f,closeOnBackdropClick:p,width:h,portal:y,className:w,"aria-labelledby":g,style:b,onClick:u}=e,_=Ze(e,["header","children","open","onBeforeClose","onCancel","closeOnBackdropClick","width","portal","className","aria-labelledby","style","onClick"]);const d=i.useRef(null),O=i.useMemo(()=>$([d,o]),[o]),v=se(),S=(n=Te())===null||n===void 0?void 0:n.rootElement,E=ke({root:S}),X=i.useContext(we);i.useContext(L)&&!X&&console.error("Modals should not be nested"),i.useEffect(()=>{D&&d.current&&E&&Ye.registerDialog(d.current),d.current&&E&&(d.current.autofocus=!0)},[d,E]),i.useEffect(()=>{d.current&&E&&s!==void 0&&(s&&!d.current.open?d.current.showModal():!s&&d.current.open&&d.current.close())},[d,E,s]),ze(d,E);const A=typeof h=="string"&&["small","medium"].includes(h),Y=x("navds-modal",w,{"navds-modal--polyfilled":D,"navds-modal--autowidth":!h,[`navds-modal--${h}`]:A}),Z=Object.assign(Object.assign({},b),A?{}:{width:h}),G=C=>{c&&c()===!1?C.preventDefault():f&&f(C)},J=p&&!D?C=>{u&&u(C),C.target===d.current&&(!c||c()!==!1)&&d.current.close()}:u,Q=!g&&!_["aria-label"]&&r?v:g,H=m.createElement("dialog",Object.assign({},_,{ref:O,className:Y,style:Z,onCancel:G,onClick:J,"aria-labelledby":Q}),m.createElement(L.Provider,{value:{closeHandler:$e(d,r,c),ref:d}},r&&m.createElement(z,null,r.label&&m.createElement(me,{className:"navds-modal__label"},r.label),m.createElement(le,{size:(t=r.size)!==null&&t!==void 0?t:"medium",level:"1",id:v},m.createElement("span",{className:"navds-modal__header-icon"},r.icon),r.heading)),a));return y?E?te.createPortal(H,E):null:H});N.Header=z;N.Body=Le;N.Footer=Re;const lt=N;export{ye as B,lt as M};
