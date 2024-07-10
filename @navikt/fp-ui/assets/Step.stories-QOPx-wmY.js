import{j as l}from"./jsx-runtime-_e34SzbC.js";import{b as ie}from"./Uttaksdagen-4XRuHfYI.js";import"./dayjs.min-Dkhc0ShP.js";import{r as i,R as g,$ as Ne}from"./index-DVXBtNgz.js";import"./dates-BztWV_n-.js";import{c as je,P as Pe}from"./ProgressStepper-Cd5rwxe-.js";import{u as H}from"./index-DSUmsmzI.js";import{B as Te}from"./Banner-CgjgqX-V.js";import{D as Re,H as B,a as Ae}from"./Label-Cf_oUe96.js";import{r as Ie}from"./index-Cbx7Fas8.js";import{c as A}from"./clsx-B-dksMZM.js";import{c as I}from"./composeEventHandlers-DeH74NdU.js";import{u as Le}from"./BasePrimitive-2Q3imcnG.js";import{u as qe}from"./useId-BBol7gfI.js";import{B as R}from"./Button-Bo6XR0GR.js";import{S as Fe}from"./XMark-cB-Nzsrx.js";import{V as J}from"./VStack-CXjZFfcj.js";import"./isoWeek-D9jlLv__.js";import"./ChevronDown-CeOwSfas.js";import"./useId-DbilmxAP.js";import"./tslib.es6-BvlsdGqA.js";var j=function(){return j=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++){r=arguments[n];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a])}return t},j.apply(this,arguments)};var se={exports:{}},C={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Z;function He(){if(Z)return C;Z=1;var e=g,t=Symbol.for("react.element"),r=Symbol.for("react.fragment"),n=Object.prototype.hasOwnProperty,o=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function d(u,c,h){var f,v={},b=null,w=null;h!==void 0&&(b=""+h),c.key!==void 0&&(b=""+c.key),c.ref!==void 0&&(w=c.ref);for(f in c)n.call(c,f)&&!a.hasOwnProperty(f)&&(v[f]=c[f]);if(u&&u.defaultProps)for(f in c=u.defaultProps,c)v[f]===void 0&&(v[f]=c[f]);return{$$typeof:t,type:u,key:b,ref:w,props:v,_owner:o.current}}return C.Fragment=r,C.jsx=d,C.jsxs=d,C}se.exports=He();var Be=se.exports,$e=i.createContext(void 0);function ze(){var e=i.useContext($e);if(!e)throw new Error("useDayPicker must be used within a DayPickerProvider.");return e}i.createContext(void 0);i.forwardRef(function(e,t){var r=ze(),n=r.classNames,o=r.styles,a=[n.button_reset,n.button];e.className&&a.push(e.className);var d=a.join(" "),u=j(j({},o.button_reset),o.button);return e.style&&Object.assign(u,e.style),Be.jsx("button",j({},e,{ref:t,type:"button",className:d,style:u}))});i.createContext(void 0);i.createContext(void 0);var y;(function(e){e.Outside="outside",e.Disabled="disabled",e.Selected="selected",e.Hidden="hidden",e.Today="today",e.RangeStart="range_start",e.RangeEnd="range_end",e.RangeMiddle="range_middle"})(y||(y={}));y.Selected;y.Disabled;y.Hidden;y.Today;y.RangeEnd;y.RangeMiddle;y.RangeStart;y.Outside;i.createContext(void 0);i.createContext(void 0);i.createContext(void 0);const Ve=i.createContext(null);i.createContext({hasDropdown:!1,year:new Date,toYear:()=>null,disabled:[],onSelect:()=>null});function Ke(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function Ue(e){return e instanceof Element||e instanceof Ke(e).Element}var F=typeof document<"u"?i.useLayoutEffect:i.useEffect;let L=!1,Ye=0;const G=()=>"floating-ui-"+Ye++;function We(){const[e,t]=i.useState(()=>L?G():void 0);return F(()=>{e==null&&t(G())},[]),i.useEffect(()=>{L||(L=!0)},[]),e}const Xe=Ne.useId,Je=Xe||We;function Ze(e){return"data-floating-ui-"+e}const Ge=i.createContext(null);function Qe(e){let{id:t,root:r}=e===void 0?{}:e;const[n,o]=i.useState(null),a=Je(),d=et(),u=i.useMemo(()=>({id:t,root:r,portalContext:d,uniqueId:a}),[t,r,d,a]),c=i.useRef();return F(()=>()=>{n==null||n.remove()},[n,u]),F(()=>{if(c.current===u)return;c.current=u;const{id:h,root:f,portalContext:v,uniqueId:b}=u,w=h?document.getElementById(h):null,D=Ze("portal");if(w){const p=document.createElement("div");p.id=b,p.setAttribute(D,""),w.appendChild(p),o(p)}else{let p=f||(v==null?void 0:v.portalNode);p&&!Ue(p)&&(p=p.current),p=p||document.body;let x=null;h&&(x=document.createElement("div"),x.id=h,p.appendChild(x));const E=document.createElement("div");E.id=b,E.setAttribute(D,""),p=x||p,p.appendChild(E),o(E)}},[u]),n}const et=()=>i.useContext(Ge),tt=i.createContext(void 0),nt=()=>i.useContext(tt),[rt,le]=je({name:"ModalContext",errorMessage:"<Modal.Header> must be used within a <Modal>"});var ot=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};const at=i.forwardRef((e,t)=>{var{className:r}=e,n=ot(e,["className"]);return g.createElement("div",Object.assign({},n,{ref:t,className:A("navds-modal__body",r)}))});var it=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};const st=i.forwardRef((e,t)=>{var{className:r}=e,n=it(e,["className"]);return g.createElement("div",Object.assign({},n,{ref:t,className:A("navds-modal__footer",r)}))});var lt=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};const de=i.forwardRef((e,t)=>{var{children:r,className:n,closeButton:o=!0}=e,a=lt(e,["children","className","closeButton"]);const d=le();return g.createElement("div",Object.assign({},a,{ref:t,className:A("navds-modal__header",n)}),d.closeHandler&&o&&g.createElement(R,{type:"button",className:"navds-modal__button",size:"small",variant:"tertiary-neutral",onClick:d.closeHandler,icon:g.createElement(Fe,{title:"Lukk"})}),r)}),Q=({clientX:e,clientY:t},{left:r,top:n,right:o,bottom:a})=>!(e<r||t<n||e>o||t>a);function dt(e,t,r){if(!(t&&t.closeButton===!1))return r?()=>{var n;return r()!==!1&&((n=e.current)===null||n===void 0?void 0:n.close())}:()=>{var n;return(n=e.current)===null||n===void 0?void 0:n.close()}}const T="navds-modal__document-body";function ut(e,t,r){g.useEffect(()=>{if(r||!e.current||!t)return;e.current.open&&document.body.classList.add(T);const n=new MutationObserver(()=>{var o;!((o=e.current)===null||o===void 0)&&o.open?document.body.classList.add(T):document.body.classList.remove(T)});return n.observe(e.current,{attributes:!0,attributeFilter:["open"]}),()=>{n.disconnect(),document.body.classList.remove(T)}},[e,t,r])}const k=typeof window<"u"&&(window.HTMLDialogElement===void 0||navigator.userAgent.includes("jsdom"));function ue(e,t){var r="on"+t.type.toLowerCase();return typeof e[r]=="function"&&e[r](t),e.dispatchEvent(t)}function P(e){for(;e;){if(e.localName==="dialog")return e;e.parentElement?e=e.parentElement:e.parentNode?e=e.parentNode.host:e=null}return null}function ce(e){for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;e&&e.blur&&e!==document.body&&e.blur()}function ct(e,t){for(var r=0;r<e.length;++r)if(e[r]===t)return!0;return!1}function q(e){return!e||!e.hasAttribute("method")?!1:e.getAttribute("method").toLowerCase()==="dialog"}function fe(e){var t=["button","input","keygen","select","textarea"],r=t.map(function(d){return d+":not([disabled])"});r.push('[tabindex]:not([disabled]):not([tabindex=""])');var n=e.querySelector(r.join(", "));if(!n&&"attachShadow"in Element.prototype)for(var o=e.querySelectorAll("*"),a=0;a<o.length&&!(o[a].tagName&&o[a].shadowRoot&&(n=fe(o[a].shadowRoot),n));a++);return n}function ee(e){return e.isConnected||document.body.contains(e)}function me(e){if(e.submitter)return e.submitter;var t=e.target;if(!(t instanceof HTMLFormElement))return null;var r=s.formSubmitter;if(!r){var n=e.target,o="getRootNode"in n&&n.getRootNode()||document;r=o.activeElement}return!r||r.form!==t?null:r}function ft(e){if(!e.defaultPrevented){var t=e.target,r=s.imagemapUseValue,n=me(e);r===null&&n&&(r=n.value);var o=P(t);if(o){var a=n&&n.getAttribute("formmethod")||t.getAttribute("method");a==="dialog"&&(e.preventDefault(),r!=null?o.close(r):o.close())}}}function pe(e){if(this.dialog_=e,this.replacedStyleTop_=!1,this.openAsModal_=!1,e.hasAttribute("role")||e.setAttribute("role","dialog"),e.show=this.show.bind(this),e.showModal=this.showModal.bind(this),e.close=this.close.bind(this),e.addEventListener("submit",ft,!1),"returnValue"in e||(e.returnValue=""),"MutationObserver"in window){var t=new MutationObserver(this.maybeHideModal.bind(this));t.observe(e,{attributes:!0,attributeFilter:["open"]})}else{var r=!1,n=(function(){r?this.downgradeModal():this.maybeHideModal(),r=!1}).bind(this),o,a=function(d){if(d.target===e){var u="DOMNodeRemoved";r|=d.type.substr(0,u.length)===u,window.clearTimeout(o),o=window.setTimeout(n,0)}};["DOMAttrModified","DOMNodeRemoved","DOMNodeRemovedFromDocument"].forEach(function(d){e.addEventListener(d,a)})}Object.defineProperty(e,"open",{set:this.setOpen.bind(this),get:e.hasAttribute.bind(e,"open")}),this.backdrop_=document.createElement("div"),this.backdrop_.className="backdrop",this.backdrop_.addEventListener("mouseup",this.backdropMouseEvent_.bind(this)),this.backdrop_.addEventListener("mousedown",this.backdropMouseEvent_.bind(this)),this.backdrop_.addEventListener("click",this.backdropMouseEvent_.bind(this))}pe.prototype={get dialog(){return this.dialog_},maybeHideModal:function(){this.dialog_.hasAttribute("open")&&ee(this.dialog_)||this.downgradeModal()},downgradeModal:function(){this.openAsModal_&&(this.openAsModal_=!1,this.dialog_.style.zIndex="",this.replacedStyleTop_&&(this.dialog_.style.top="",this.replacedStyleTop_=!1),this.backdrop_.parentNode&&this.backdrop_.parentNode.removeChild(this.backdrop_),s.dm.removeDialog(this))},setOpen:function(e){e?this.dialog_.hasAttribute("open")||this.dialog_.setAttribute("open",""):(this.dialog_.removeAttribute("open"),this.maybeHideModal())},backdropMouseEvent_:function(e){if(this.dialog_.hasAttribute("tabindex"))this.dialog_.focus();else{var t=document.createElement("div");this.dialog_.insertBefore(t,this.dialog_.firstChild),t.tabIndex=-1,t.focus(),this.dialog_.removeChild(t)}var r=document.createEvent("MouseEvents");r.initMouseEvent(e.type,e.bubbles,e.cancelable,window,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget),this.dialog_.dispatchEvent(r),e.stopPropagation()},focus_:function(){var e=this.dialog_.querySelector("[autofocus]:not([disabled])");!e&&this.dialog_.tabIndex>=0&&(e=this.dialog_),e||(e=fe(this.dialog_)),ce(document.activeElement),e&&e.focus()},updateZIndex:function(e,t){if(e<t)throw new Error("dialogZ should never be < backdropZ");this.dialog_.style.zIndex=e,this.backdrop_.style.zIndex=t},show:function(){this.dialog_.open||(this.setOpen(!0),this.focus_())},showModal:function(){if(this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'showModal' on dialog: The element is already open, and therefore cannot be opened modally.");if(!ee(this.dialog_))throw new Error("Failed to execute 'showModal' on dialog: The element is not in a Document.");if(!s.dm.pushDialog(this))throw new Error("Failed to execute 'showModal' on dialog: There are too many open modal dialogs.");this.setOpen(!0),this.openAsModal_=!0,s.needsCentering(this.dialog_)?(s.reposition(this.dialog_),this.replacedStyleTop_=!0):this.replacedStyleTop_=!1,this.dialog_.parentNode.insertBefore(this.backdrop_,this.dialog_.nextSibling),this.focus_()},close:function(e){if(!this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'close' on dialog: The element does not have an 'open' attribute, and therefore cannot be closed.");this.setOpen(!1),e!==void 0&&(this.dialog_.returnValue=e);var t=new window.CustomEvent("close",{bubbles:!1,cancelable:!1});ue(this.dialog_,t)}};var s={};s.reposition=function(e){var t=document.body.scrollTop||document.documentElement.scrollTop,r=t+(window.innerHeight-e.offsetHeight)/2;e.style.top=Math.max(t,r)+"px"};s.isInlinePositionSetByStylesheet=function(e){for(var t=0;t<document.styleSheets.length;++t){var r=document.styleSheets[t],n=null;try{n=r.cssRules}catch{}if(n)for(var o=0;o<n.length;++o){var a=n[o],d=null;try{d=document.querySelectorAll(a.selectorText)}catch{}if(!(!d||!ct(d,e))){var u=a.style.getPropertyValue("top"),c=a.style.getPropertyValue("bottom");if(u&&u!=="auto"||c&&c!=="auto")return!0}}}return!1};s.needsCentering=function(e){var t=window.getComputedStyle(e);return t.position!=="absolute"||e.style.top!=="auto"&&e.style.top!==""||e.style.bottom!=="auto"&&e.style.bottom!==""?!1:!s.isInlinePositionSetByStylesheet(e)};s.forceRegisterDialog=function(e){if(e.showModal&&console.warn("This browser already supports <dialog>, the polyfill may not work correctly",e),e.localName!=="dialog")throw new Error("Failed to register dialog: The element is not a dialog.");new pe(e)};s.registerDialog=function(e){e.showModal||s.forceRegisterDialog(e)};s.DialogManager=function(){this.pendingDialogStack=[];var e=this.checkDOM_.bind(this);this.overlay=document.createElement("div"),this.overlay.className="_dialog_overlay",this.overlay.addEventListener("click",(function(t){this.forwardTab_=void 0,t.stopPropagation(),e([])}).bind(this)),this.handleKey_=this.handleKey_.bind(this),this.handleFocus_=this.handleFocus_.bind(this),this.zIndexLow_=1e5,this.zIndexHigh_=100150,this.forwardTab_=void 0,"MutationObserver"in window&&(this.mo_=new MutationObserver(function(t){var r=[];t.forEach(function(n){for(var o=0,a;a=n.removedNodes[o];++o)a instanceof Element&&(a.localName==="dialog"&&r.push(a),r=r.concat(a.querySelectorAll("dialog")))}),r.length&&e(r)}))};s.DialogManager.prototype.blockDocument=function(){document.documentElement.addEventListener("focus",this.handleFocus_,!0),document.addEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.observe(document,{childList:!0,subtree:!0})};s.DialogManager.prototype.unblockDocument=function(){document.documentElement.removeEventListener("focus",this.handleFocus_,!0),document.removeEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.disconnect()};s.DialogManager.prototype.updateStacking=function(){for(var e=this.zIndexHigh_,t=0,r;r=this.pendingDialogStack[t];++t)r.updateZIndex(--e,--e),t===0&&(this.overlay.style.zIndex=--e);var n=this.pendingDialogStack[0];if(n){var o=n.dialog.parentNode||document.body;o.appendChild(this.overlay)}else this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay)};s.DialogManager.prototype.containedByTopDialog_=function(e){for(;e=P(e);){for(var t=0,r;r=this.pendingDialogStack[t];++t)if(r.dialog===e)return t===0;e=e.parentElement}return!1};s.DialogManager.prototype.handleFocus_=function(e){var t=e.composedPath?e.composedPath()[0]:e.target;if(!this.containedByTopDialog_(t)&&document.activeElement!==document.documentElement&&(e.preventDefault(),e.stopPropagation(),ce(t),this.forwardTab_!==void 0)){var r=this.pendingDialogStack[0],n=r.dialog,o=n.compareDocumentPosition(t);return o&Node.DOCUMENT_POSITION_PRECEDING&&(this.forwardTab_?r.focus_():t!==document.documentElement&&document.documentElement.focus()),!1}};s.DialogManager.prototype.handleKey_=function(e){if(this.forwardTab_=void 0,e.keyCode===27){e.preventDefault(),e.stopPropagation();var t=new window.CustomEvent("cancel",{bubbles:!1,cancelable:!0}),r=this.pendingDialogStack[0];r&&ue(r.dialog,t)&&r.dialog.close()}else e.keyCode===9&&(this.forwardTab_=!e.shiftKey)};s.DialogManager.prototype.checkDOM_=function(e){var t=this.pendingDialogStack.slice();t.forEach(function(r){e.indexOf(r.dialog)!==-1?r.downgradeModal():r.maybeHideModal()})};s.DialogManager.prototype.pushDialog=function(e){var t=(this.zIndexHigh_-this.zIndexLow_)/2-1;return this.pendingDialogStack.length>=t?!1:(this.pendingDialogStack.unshift(e)===1&&this.blockDocument(),this.updateStacking(),!0)};s.DialogManager.prototype.removeDialog=function(e){var t=this.pendingDialogStack.indexOf(e);t!==-1&&(this.pendingDialogStack.splice(t,1),this.pendingDialogStack.length===0&&this.unblockDocument(),this.updateStacking())};k&&(s.dm=new s.DialogManager,s.formSubmitter=null,s.imagemapUseValue=null);if(k){var te=document.createElement("form");if(te.setAttribute("method","dialog"),te.method!=="dialog"){var M=Object.getOwnPropertyDescriptor(HTMLFormElement.prototype,"method");if(M){var mt=M.get;M.get=function(){return q(this)?"dialog":mt.call(this)};var pt=M.set;M.set=function(e){return typeof e=="string"&&e.toLowerCase()==="dialog"?this.setAttribute("method",e):pt.call(this,e)},Object.defineProperty(HTMLFormElement.prototype,"method",M)}}document.addEventListener("click",function(e){if(s.formSubmitter=null,s.imagemapUseValue=null,!e.defaultPrevented){var t=e.target;if("composedPath"in e){var r=e.composedPath();t=r.shift()||t}if(!(!t||!q(t.form))){var n=t.type==="submit"&&["button","input"].indexOf(t.localName)>-1;if(!n){if(!(t.localName==="input"&&t.type==="image"))return;s.imagemapUseValue=e.offsetX+","+e.offsetY}var o=P(t);o&&(s.formSubmitter=t)}}},!1),document.addEventListener("submit",function(e){var t=e.target,r=P(t);if(!r){var n=me(e),o=n&&n.getAttribute("formmethod")||t.getAttribute("method");o==="dialog"&&e.preventDefault()}});var ht=HTMLFormElement.prototype.submit,gt=function(){if(!q(this))return ht.call(this);var e=P(this);e&&e.close()};HTMLFormElement.prototype.submit=gt}var vt=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};const ne="navds-modal--polyfilled",O=i.forwardRef((e,t)=>{var r,n,{header:o,children:a,open:d,onBeforeClose:u,onCancel:c,closeOnBackdropClick:h,width:f,placement:v,portal:b,className:w,"aria-labelledby":D,style:p,onClick:x,onMouseDown:E}=e,$=vt(e,["header","children","open","onBeforeClose","onCancel","closeOnBackdropClick","width","placement","portal","className","aria-labelledby","style","onClick","onMouseDown"]);const m=i.useRef(null),we=Le(m,t),z=qe(),xe=(r=nt())===null||r===void 0?void 0:r.rootElement,_=Qe({root:xe}),Ee=i.useContext(Ve),V=le(!1)!==void 0;V&&!Ee&&console.error("Modals should not be nested"),i.useEffect(()=>{k&&m.current&&_&&(s.registerDialog(m.current),m.current.classList.add(ne)),m.current&&_&&(m.current.autofocus=!0)},[m,_]),i.useEffect(()=>{m.current&&_&&d!==void 0&&(d&&!m.current.open?m.current.showModal():!d&&m.current.open&&m.current.close())},[m,_,d]),ut(m,_,V);const K=typeof f=="string"&&["small","medium"].includes(f),Oe=A("navds-modal",w,{[ne]:k,"navds-modal--autowidth":!f,[`navds-modal--${f}`]:K,"navds-modal--top":v==="top"&&!k}),Se=Object.assign(Object.assign({},p),K?{}:{width:f}),U=i.useRef({clientX:0,clientY:0}),Me=S=>{U.current=S},Y=h&&!k,ke=S=>{if(S.target!==m.current)return;const X=m.current.getBoundingClientRect();Q(U.current,X)||Q(S,X)||u!==void 0&&u()===!1||m.current.close()},De=S=>{u&&u()===!1&&S.preventDefault()},Ce=!D&&!$["aria-label"]&&o?z:D,W=g.createElement("dialog",Object.assign({},$,{ref:we,className:Oe,style:Se,onCancel:I(c,De),onClick:Y?I(x,ke):x,onMouseDown:Y?I(E,Me):E,"aria-labelledby":Ce}),g.createElement(rt,{closeHandler:dt(m,o,u),ref:m},o&&g.createElement(de,null,o.label&&g.createElement(Re,{className:"navds-modal__label"},o.label),g.createElement(B,{size:(n=o.size)!==null&&n!==void 0?n:"medium",level:"1",id:z},o.icon&&g.createElement("span",{className:"navds-modal__header-icon"},o.icon),o.heading)),a));return b?_?Ie.createPortal(W,_):null:W});O.Header=de;O.Body=at;O.Footer=st;const he=({ariaLabel:e,id:t="pageMainContent",className:r,topContentRenderer:n,children:o})=>{i.useEffect(()=>{window.scrollTo(0,0)},[]);const a=H(),d=e?a.formatMessage({id:"Page.DefaultMainRoleLabel"}):void 0;return l.jsxs("div",{role:"main","aria-label":d,id:t,children:[n==null?void 0:n(),l.jsx("div",{className:`page ${r}`,children:o})]})};he.__docgenInfo={description:"",methods:[],displayName:"Page",props:{className:{required:!1,tsType:{name:"string"},description:""},id:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'pageMainContent'",computed:!1}},ariaLabel:{required:!1,tsType:{name:"string"},description:""},topContentRenderer:{required:!1,tsType:{name:"signature",type:"function",raw:"() => React.ReactElement<any>",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}}},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const ge=({text:e,level:t="1"})=>l.jsx(Te,{size:"small",children:l.jsx(B,{size:"large",level:t,children:e})});ge.__docgenInfo={description:"",methods:[],displayName:"StepBanner",props:{text:{required:!0,tsType:{name:"string"},description:""},level:{required:!1,tsType:{name:"union",raw:"'1' | '2' | '3'",elements:[{name:"literal",value:"'1'"},{name:"literal",value:"'2'"},{name:"literal",value:"'3'"}]},description:"",defaultValue:{value:"'1'",computed:!1}}}};const ve=({isOpen:e,setIsOpen:t,onAvbrytOgSlett:r,onAvbrytOgFortsettSenere:n})=>{const o=H();return l.jsxs(O,{open:e,onClose:()=>t(!1),"aria-label":o.formatMessage({id:"AvsluttModal.ContinueLater"}),children:[l.jsx(O.Header,{children:l.jsx(B,{size:"medium",children:o.formatMessage({id:"AvsluttModal.ContinueLater"})})}),l.jsx(O.Body,{children:l.jsx(Ae,{children:o.formatMessage({id:"AvsluttModal.CompleteLater"})})}),l.jsxs(O.Footer,{children:[l.jsx(R,{variant:"primary",onClick:n,children:o.formatMessage({id:"AvsluttModal.Ok"})}),l.jsx(R,{variant:"tertiary",onClick:r,children:o.formatMessage({id:"AvsluttModal.Delete"})})]})]})};ve.__docgenInfo={description:"",methods:[],displayName:"AvsluttModal",props:{isOpen:{required:!0,tsType:{name:"boolean"},description:""},setIsOpen:{required:!0,tsType:{name:"signature",type:"function",raw:"(isOpen: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"isOpen"}],return:{name:"void"}}},description:""},onAvbrytOgFortsettSenere:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onAvbrytOgSlett:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const ye=({onAvbrytOgFortsettSenere:e,onAvbrytOgSlett:t})=>{const[r,n]=i.useState(!1),o=H(),a=ie("stepFooter");return l.jsxs("div",{className:a.block,children:[l.jsx("div",{className:a.element("divider")}),l.jsx(ve,{isOpen:r,setIsOpen:n,onAvbrytOgFortsettSenere:e,onAvbrytOgSlett:t}),l.jsx(R,{variant:"tertiary",onClick:()=>n(!0),children:o.formatMessage({id:"StepFooter.Avslutt"})})]})};ye.__docgenInfo={description:"",methods:[],displayName:"StepFooter",props:{onAvbrytOgFortsettSenere:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onAvbrytOgSlett:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const be=({bannerTitle:e,steps:t,onCancel:r,onContinueLater:n,cancelOrContinueLaterAriaLabel:o,children:a,pageAriaLabel:d,infoMessage:u})=>{const c=t.findIndex(v=>v.isSelected);if(c===-1)return null;const h=t[c].label,f=ie("step");return l.jsxs(he,{className:f.block,ariaLabel:d,topContentRenderer:()=>l.jsx(l.Fragment,{children:e&&l.jsx(ge,{text:e})}),children:[u!==void 0&&l.jsx("div",{className:f.element("infoMessage"),children:u}),l.jsxs(J,{gap:"6",children:[l.jsx("div",{role:"presentation",children:l.jsx(Pe,{steps:t})}),l.jsx("section",{"aria-label":`Steg ${c+1} av ${t.length}:  ${h}`,children:l.jsxs(J,{gap:"4",children:[a,(r||n)&&l.jsx("div",{role:o?"complementary":void 0,"aria-label":o,children:l.jsx(ye,{onAvbrytOgSlett:r,onAvbrytOgFortsettSenere:n})})]})})]})]})},_e=be;be.__docgenInfo={description:"",methods:[],displayName:"Step",props:{bannerTitle:{required:!1,tsType:{name:"string"},description:""},steps:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label?: string;
    isSelected: boolean;
    completed?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!0}},{key:"completed",value:{name:"boolean",required:!1}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},cancelOrContinueLaterAriaLabel:{required:!1,tsType:{name:"string"},description:""},pageAriaLabel:{required:!1,tsType:{name:"string"},description:""},infoMessage:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const Ht={title:"step/Step",component:_e},yt=e=>l.jsx(_e,{...e}),N=yt.bind({});N.args={steps:[{id:"test",label:"Om Barnet",isSelected:!1},{id:"test2",label:"Annet",isSelected:!0},{id:"test3",label:"Oppsummering",isSelected:!1}],children:l.jsx(l.Fragment,{children:"Her er det noe kult innhold"})};var re,oe,ae;N.parameters={...N.parameters,docs:{...(re=N.parameters)==null?void 0:re.docs,source:{originalSource:"args => <Step {...args} />",...(ae=(oe=N.parameters)==null?void 0:oe.docs)==null?void 0:ae.source}}};const Bt=["Default"];export{N as Default,Bt as __namedExportsOrder,Ht as default};
