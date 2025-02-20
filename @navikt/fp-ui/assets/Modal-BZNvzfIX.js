import{r as c,b as fe,R as l}from"./index-CZMpeKRu.js";import{r as me}from"./index-Dy_t9DXc.js";import{c as M,o as he,u as pe}from"./useId-Dd4CLFiT.js";import{a as be}from"./ReadOnlyIcon-BqcO9TlQ.js";import{u as ge}from"./useFormField-DVwrBBoT.js";import{L as ve,B as ye,E as _e,D as we,H as Ee}from"./Label-qgu6Xy-0.js";import{c as A,u as Me}from"./create-context-Cu5JotWs.js";import{S as Oe}from"./Calendar-BX_0Tntc.js";import{u as De,a as xe}from"./i18n.hooks-Dta7jMm_.js";import{B as ke,c as P}from"./Button-DT2crm37.js";import{S as Se}from"./XMark-CZWGGJa2.js";const[Ce,Y]=A({name:"ModalContext",errorMessage:"<Modal.Header> must be used within a <Modal>"});function Ne(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function Pe(e){return e instanceof Element||e instanceof Ne(e).Element}var T=typeof document<"u"?c.useLayoutEffect:c.useEffect;let I=!1,Ie=0;const q=()=>"floating-ui-"+Ie++;function Le(){const[e,t]=c.useState(()=>I?q():void 0);return T(()=>{e==null&&t(q())},[]),c.useEffect(()=>{I||(I=!0)},[]),e}const Te=fe.useId,Ae=Te||Le;function Re(e){return"data-floating-ui-"+e}const je=c.createContext(null);function He(e){let{id:t,root:o}=e===void 0?{}:e;const[n,r]=c.useState(null),i=Ae(),s=Fe(),d=c.useMemo(()=>({id:t,root:o,portalContext:s,uniqueId:i}),[t,o,s,i]),h=c.useRef();return T(()=>()=>{n==null||n.remove()},[n,d]),T(()=>{if(h.current===d)return;h.current=d;const{id:p,root:g,portalContext:v,uniqueId:O}=d,m=p?document.getElementById(p):null,b=Re("portal");if(m){const u=document.createElement("div");u.id=O,u.setAttribute(b,""),m.appendChild(u),r(u)}else{let u=g||(v==null?void 0:v.portalNode);u&&!Pe(u)&&(u=u.current),u=u||document.body;let y=null;p&&(y=document.createElement("div"),y.id=p,u.appendChild(y));const _=document.createElement("div");_.id=O,_.setAttribute(b,""),u=y||u,u.appendChild(_),r(_)}},[d]),n}const Fe=()=>c.useContext(je),[mt,Be]=A();var ze=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]]);return o};const[ht,Z]=A({errorMessage:"useDateInputContext must be used with DateInputContext"}),G=c.forwardRef((e,t)=>{const{className:o,hideLabel:n=!1,label:r,description:i,variant:s="datepicker",setAnchorRef:d}=e,h=ze(e,["className","hideLabel","label","description","variant","setAnchorRef"]),p=c.useRef(null),g=Be().translate,v=s==="datepicker",O={prefix:v?"datepicker-input":"monthpicker-input",iconTitle:{open:v?"openDatePicker":"openMonthPicker",close:v?"closeDatePicker":"closeMonthPicker"}},m=Z(),{inputProps:b,size:u="medium",inputDescriptionId:y,errorId:_,showErrorMsg:C,hasError:f,readOnly:w}=ge(e,O.prefix);return l.createElement("div",{className:M(o,"navds-form-field",`navds-form-field--${u}`,"navds-date__field",{"navds-text-field--error":f,"navds-date__field--error":f,"navds-form-field--disabled":!!b.disabled,"navds-text-field--disabled":!!b.disabled,"navds-form-field--readonly":w,"navds-text-field--readonly":w,"navds-date__field--readonly":w})},l.createElement(ve,{htmlFor:b.id,size:u,className:M("navds-form-field__label",{"navds-sr-only":n})},w&&l.createElement(be,null),r),!!i&&l.createElement(ye,{as:"div",className:M("navds-form-field__description",{"navds-sr-only":n}),id:y,size:u},i),l.createElement("div",{className:"navds-date__field-wrapper"},l.createElement("input",Object.assign({ref:t},he(h,["error","errorId","size"]),b,{autoComplete:"off","aria-controls":m!=null&&m.open?m.ariaId:void 0,readOnly:w,className:M("navds-date__field-input","navds-text-field__input","navds-body-short",`navds-body-short--${u}`),size:v?11:14})),l.createElement("button",{disabled:b.disabled||w,tabIndex:w||m!=null&&m.open?-1:0,onClick:()=>{m==null||m.onOpen(),d==null||d(p.current)},type:"button",className:"navds-date__field-button",ref:p},l.createElement(Oe,{title:g(O.iconTitle[m!=null&&m.open?"close":"open"])}))),l.createElement("div",{className:"navds-form-field__error",id:_,"aria-relevant":"additions removals","aria-live":"polite"},C&&l.createElement(_e,{size:u,showIcon:!0},e.error)))});c.forwardRef((e,t)=>l.createElement(G,Object.assign({},e,{ref:t})));c.forwardRef((e,t)=>l.createElement(G,Object.assign({},e,{variant:"monthpicker",ref:t})));var Ve=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]]);return o};const Ke=c.forwardRef((e,t)=>{var{className:o}=e,n=Ve(e,["className"]);return l.createElement("div",Object.assign({},n,{ref:t,className:M("navds-modal__body",o)}))});var qe=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]]);return o};const $e=c.forwardRef((e,t)=>{var{className:o}=e,n=qe(e,["className"]);return l.createElement("div",Object.assign({},n,{ref:t,className:M("navds-modal__footer",o)}))});var Ue=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]]);return o};const J=c.forwardRef((e,t)=>{var{children:o,className:n,closeButton:r=!0}=e,i=Ue(e,["children","className","closeButton"]);const s=Y(),d=De("global");return l.createElement("div",Object.assign({},i,{ref:t,className:M("navds-modal__header",n)}),s.closeHandler&&r&&l.createElement(ke,{type:"button",className:"navds-modal__button",size:"small",variant:"tertiary-neutral",onKeyDown:h=>{["Enter"," "].includes(h.key)&&h.repeat&&h.preventDefault()},onClick:s.closeHandler,icon:l.createElement(Se,{title:d("close")})}),o)}),$=({clientX:e,clientY:t},{left:o,top:n,right:r,bottom:i})=>!(e<o||t<n||e>r||t>i);function We(e,t,o){if(!(t&&t.closeButton===!1))return o?()=>{var n;return o()!==!1&&((n=e.current)===null||n===void 0?void 0:n.close())}:()=>{var n;return(n=e.current)===null||n===void 0?void 0:n.close()}}const N="navds-modal__document-body";function Xe(e,t,o){l.useEffect(()=>{if(o||!e.current||!t)return;e.current.open&&document.body.classList.add(N);const n=new MutationObserver(()=>{var r;!((r=e.current)===null||r===void 0)&&r.open?document.body.classList.add(N):document.body.classList.remove(N)});return n.observe(e.current,{attributes:!0,attributeFilter:["open"]}),()=>{n.disconnect(),document.body.classList.remove(N)}},[e,t,o])}const k=typeof window<"u"&&(window.HTMLDialogElement===void 0||navigator.userAgent.includes("jsdom"));function Q(e,t){var o="on"+t.type.toLowerCase();return typeof e[o]=="function"&&e[o](t),e.dispatchEvent(t)}function S(e){for(;e;){if(e.localName==="dialog")return e;e.parentElement?e=e.parentElement:e.parentNode?e=e.parentNode.host:e=null}return null}function ee(e){for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;e&&e.blur&&e!==document.body&&e.blur()}function Ye(e,t){for(var o=0;o<e.length;++o)if(e[o]===t)return!0;return!1}function L(e){return!e||!e.hasAttribute("method")?!1:e.getAttribute("method").toLowerCase()==="dialog"}function te(e){var t=["button","input","keygen","select","textarea"],o=t.map(function(s){return s+":not([disabled])"});o.push('[tabindex]:not([disabled]):not([tabindex=""])');var n=e.querySelector(o.join(", "));if(!n&&"attachShadow"in Element.prototype)for(var r=e.querySelectorAll("*"),i=0;i<r.length&&!(r[i].tagName&&r[i].shadowRoot&&(n=te(r[i].shadowRoot),n));i++);return n}function U(e){return e.isConnected||document.body.contains(e)}function ne(e){if(e.submitter)return e.submitter;var t=e.target;if(!(t instanceof HTMLFormElement))return null;var o=a.formSubmitter;if(!o){var n=e.target,r="getRootNode"in n&&n.getRootNode()||document;o=r.activeElement}return!o||o.form!==t?null:o}function Ze(e){if(!e.defaultPrevented){var t=e.target,o=a.imagemapUseValue,n=ne(e);o===null&&n&&(o=n.value);var r=S(t);if(r){var i=n&&n.getAttribute("formmethod")||t.getAttribute("method");i==="dialog"&&(e.preventDefault(),o!=null?r.close(o):r.close())}}}function oe(e){if(this.dialog_=e,this.replacedStyleTop_=!1,this.openAsModal_=!1,e.hasAttribute("role")||e.setAttribute("role","dialog"),e.show=this.show.bind(this),e.showModal=this.showModal.bind(this),e.close=this.close.bind(this),e.addEventListener("submit",Ze,!1),"returnValue"in e||(e.returnValue=""),"MutationObserver"in window){var t=new MutationObserver(this.maybeHideModal.bind(this));t.observe(e,{attributes:!0,attributeFilter:["open"]})}else{var o=!1,n=(function(){o?this.downgradeModal():this.maybeHideModal(),o=!1}).bind(this),r,i=function(s){if(s.target===e){var d="DOMNodeRemoved";o|=s.type.substr(0,d.length)===d,window.clearTimeout(r),r=window.setTimeout(n,0)}};["DOMAttrModified","DOMNodeRemoved","DOMNodeRemovedFromDocument"].forEach(function(s){e.addEventListener(s,i)})}Object.defineProperty(e,"open",{set:this.setOpen.bind(this),get:e.hasAttribute.bind(e,"open")}),this.backdrop_=document.createElement("div"),this.backdrop_.className="backdrop",this.backdrop_.addEventListener("mouseup",this.backdropMouseEvent_.bind(this)),this.backdrop_.addEventListener("mousedown",this.backdropMouseEvent_.bind(this)),this.backdrop_.addEventListener("click",this.backdropMouseEvent_.bind(this))}oe.prototype={get dialog(){return this.dialog_},maybeHideModal:function(){this.dialog_.hasAttribute("open")&&U(this.dialog_)||this.downgradeModal()},downgradeModal:function(){this.openAsModal_&&(this.openAsModal_=!1,this.dialog_.style.zIndex="",this.replacedStyleTop_&&(this.dialog_.style.top="",this.replacedStyleTop_=!1),this.backdrop_.parentNode&&this.backdrop_.parentNode.removeChild(this.backdrop_),a.dm.removeDialog(this))},setOpen:function(e){e?this.dialog_.hasAttribute("open")||this.dialog_.setAttribute("open",""):(this.dialog_.removeAttribute("open"),this.maybeHideModal())},backdropMouseEvent_:function(e){if(this.dialog_.hasAttribute("tabindex"))this.dialog_.focus();else{var t=document.createElement("div");this.dialog_.insertBefore(t,this.dialog_.firstChild),t.tabIndex=-1,t.focus(),this.dialog_.removeChild(t)}var o=document.createEvent("MouseEvents");o.initMouseEvent(e.type,e.bubbles,e.cancelable,window,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget),this.dialog_.dispatchEvent(o),e.stopPropagation()},focus_:function(){var e=this.dialog_.querySelector("[autofocus]:not([disabled])");!e&&this.dialog_.tabIndex>=0&&(e=this.dialog_),e||(e=te(this.dialog_)),ee(document.activeElement),e&&e.focus()},updateZIndex:function(e,t){if(e<t)throw new Error("dialogZ should never be < backdropZ");this.dialog_.style.zIndex=e,this.backdrop_.style.zIndex=t},show:function(){this.dialog_.open||(this.setOpen(!0),this.focus_())},showModal:function(){if(this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'showModal' on dialog: The element is already open, and therefore cannot be opened modally.");if(!U(this.dialog_))throw new Error("Failed to execute 'showModal' on dialog: The element is not in a Document.");if(!a.dm.pushDialog(this))throw new Error("Failed to execute 'showModal' on dialog: There are too many open modal dialogs.");this.setOpen(!0),this.openAsModal_=!0,a.needsCentering(this.dialog_)?(a.reposition(this.dialog_),this.replacedStyleTop_=!0):this.replacedStyleTop_=!1,this.dialog_.parentNode.insertBefore(this.backdrop_,this.dialog_.nextSibling),this.focus_()},close:function(e){if(!this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'close' on dialog: The element does not have an 'open' attribute, and therefore cannot be closed.");this.setOpen(!1),e!==void 0&&(this.dialog_.returnValue=e);var t=new window.CustomEvent("close",{bubbles:!1,cancelable:!1});Q(this.dialog_,t)}};var a={};a.reposition=function(e){var t=document.body.scrollTop||document.documentElement.scrollTop,o=t+(window.innerHeight-e.offsetHeight)/2;e.style.top=Math.max(t,o)+"px"};a.isInlinePositionSetByStylesheet=function(e){for(var t=0;t<document.styleSheets.length;++t){var o=document.styleSheets[t],n=null;try{n=o.cssRules}catch{}if(n)for(var r=0;r<n.length;++r){var i=n[r],s=null;try{s=document.querySelectorAll(i.selectorText)}catch{}if(!(!s||!Ye(s,e))){var d=i.style.getPropertyValue("top"),h=i.style.getPropertyValue("bottom");if(d&&d!=="auto"||h&&h!=="auto")return!0}}}return!1};a.needsCentering=function(e){var t=window.getComputedStyle(e);return t.position!=="absolute"||e.style.top!=="auto"&&e.style.top!==""||e.style.bottom!=="auto"&&e.style.bottom!==""?!1:!a.isInlinePositionSetByStylesheet(e)};a.forceRegisterDialog=function(e){if(e.showModal&&console.warn("This browser already supports <dialog>, the polyfill may not work correctly",e),e.localName!=="dialog")throw new Error("Failed to register dialog: The element is not a dialog.");new oe(e)};a.registerDialog=function(e){e.showModal||a.forceRegisterDialog(e)};a.DialogManager=function(){this.pendingDialogStack=[];var e=this.checkDOM_.bind(this);this.overlay=document.createElement("div"),this.overlay.className="_dialog_overlay",this.overlay.addEventListener("click",(function(t){this.forwardTab_=void 0,t.stopPropagation(),e([])}).bind(this)),this.handleKey_=this.handleKey_.bind(this),this.handleFocus_=this.handleFocus_.bind(this),this.zIndexLow_=1e5,this.zIndexHigh_=100150,this.forwardTab_=void 0,"MutationObserver"in window&&(this.mo_=new MutationObserver(function(t){var o=[];t.forEach(function(n){for(var r=0,i;i=n.removedNodes[r];++r)i instanceof Element&&(i.localName==="dialog"&&o.push(i),o=o.concat(i.querySelectorAll("dialog")))}),o.length&&e(o)}))};a.DialogManager.prototype.blockDocument=function(){document.documentElement.addEventListener("focus",this.handleFocus_,!0),document.addEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.observe(document,{childList:!0,subtree:!0})};a.DialogManager.prototype.unblockDocument=function(){document.documentElement.removeEventListener("focus",this.handleFocus_,!0),document.removeEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.disconnect()};a.DialogManager.prototype.updateStacking=function(){for(var e=this.zIndexHigh_,t=0,o;o=this.pendingDialogStack[t];++t)o.updateZIndex(--e,--e),t===0&&(this.overlay.style.zIndex=--e);var n=this.pendingDialogStack[0];if(n){var r=n.dialog.parentNode||document.body;r.appendChild(this.overlay)}else this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay)};a.DialogManager.prototype.containedByTopDialog_=function(e){for(;e=S(e);){for(var t=0,o;o=this.pendingDialogStack[t];++t)if(o.dialog===e)return t===0;e=e.parentElement}return!1};a.DialogManager.prototype.handleFocus_=function(e){var t=e.composedPath?e.composedPath()[0]:e.target;if(!this.containedByTopDialog_(t)&&document.activeElement!==document.documentElement&&(e.preventDefault(),e.stopPropagation(),ee(t),this.forwardTab_!==void 0)){var o=this.pendingDialogStack[0],n=o.dialog,r=n.compareDocumentPosition(t);return r&Node.DOCUMENT_POSITION_PRECEDING&&(this.forwardTab_?o.focus_():t!==document.documentElement&&document.documentElement.focus()),!1}};a.DialogManager.prototype.handleKey_=function(e){if(this.forwardTab_=void 0,e.keyCode===27){e.preventDefault(),e.stopPropagation();var t=new window.CustomEvent("cancel",{bubbles:!1,cancelable:!0}),o=this.pendingDialogStack[0];o&&Q(o.dialog,t)&&o.dialog.close()}else e.keyCode===9&&(this.forwardTab_=!e.shiftKey)};a.DialogManager.prototype.checkDOM_=function(e){var t=this.pendingDialogStack.slice();t.forEach(function(o){e.indexOf(o.dialog)!==-1?o.downgradeModal():o.maybeHideModal()})};a.DialogManager.prototype.pushDialog=function(e){var t=(this.zIndexHigh_-this.zIndexLow_)/2-1;return this.pendingDialogStack.length>=t?!1:(this.pendingDialogStack.unshift(e)===1&&this.blockDocument(),this.updateStacking(),!0)};a.DialogManager.prototype.removeDialog=function(e){var t=this.pendingDialogStack.indexOf(e);t!==-1&&(this.pendingDialogStack.splice(t,1),this.pendingDialogStack.length===0&&this.unblockDocument(),this.updateStacking())};k&&(a.dm=new a.DialogManager,a.formSubmitter=null,a.imagemapUseValue=null);if(k){var W=document.createElement("form");if(W.setAttribute("method","dialog"),W.method!=="dialog"){var x=Object.getOwnPropertyDescriptor(HTMLFormElement.prototype,"method");if(x){var Ge=x.get;x.get=function(){return L(this)?"dialog":Ge.call(this)};var Je=x.set;x.set=function(e){return typeof e=="string"&&e.toLowerCase()==="dialog"?this.setAttribute("method",e):Je.call(this,e)},Object.defineProperty(HTMLFormElement.prototype,"method",x)}}document.addEventListener("click",function(e){if(a.formSubmitter=null,a.imagemapUseValue=null,!e.defaultPrevented){var t=e.target;if("composedPath"in e){var o=e.composedPath();t=o.shift()||t}if(!(!t||!L(t.form))){var n=t.type==="submit"&&["button","input"].indexOf(t.localName)>-1;if(!n){if(!(t.localName==="input"&&t.type==="image"))return;a.imagemapUseValue=e.offsetX+","+e.offsetY}var r=S(t);r&&(a.formSubmitter=t)}}},!1),document.addEventListener("submit",function(e){var t=e.target,o=S(t);if(!o){var n=ne(e),r=n&&n.getAttribute("formmethod")||t.getAttribute("method");r==="dialog"&&e.preventDefault()}});var Qe=HTMLFormElement.prototype.submit,et=function(){if(!L(this))return Qe.call(this);var e=S(this);e&&e.close()};HTMLFormElement.prototype.submit=et}var tt=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]]);return o};const X="navds-modal--polyfilled",R=c.forwardRef((e,t)=>{var o,n,{header:r,children:i,open:s,onBeforeClose:d,onCancel:h,closeOnBackdropClick:p,width:g,placement:v,portal:O,className:m,"aria-labelledby":b,style:u,onClick:y,onMouseDown:_}=e,C=tt(e,["header","children","open","onBeforeClose","onCancel","closeOnBackdropClick","width","placement","portal","className","aria-labelledby","style","onClick","onMouseDown"]);const f=c.useRef(null),w=Me(f,t),j=pe(),re=(o=xe())===null||o===void 0?void 0:o.rootElement,E=He({root:re}),ae=Z(!1),H=Y(!1)!==void 0;H&&!ae&&console.error("Modals should not be nested"),c.useEffect(()=>{k&&f.current&&E&&(a.registerDialog(f.current),f.current.classList.add(X)),f.current&&E&&(f.current.autofocus=!0)},[E]),c.useEffect(()=>{f.current&&E&&s!==void 0&&(s&&!f.current.open?f.current.showModal():!s&&f.current.open&&f.current.close())},[E,s]),Xe(f,E,H);const F=typeof g=="string"&&["small","medium"].includes(g),ie=M("navds-modal",m,{[X]:k,"navds-modal--autowidth":!g,[`navds-modal--${g}`]:F,"navds-modal--top":v==="top"&&!k}),le=Object.assign(Object.assign({},u),F?{}:{width:g}),B=c.useRef({clientX:0,clientY:0}),se=D=>{B.current=D},z=p&&!k,de=D=>{if(D.target!==f.current)return;const K=f.current.getBoundingClientRect();$(B.current,K)||$(D,K)||d!==void 0&&d()===!1||f.current.close()},ue=D=>{d&&d()===!1&&D.preventDefault()},ce=!b&&!C["aria-label"]&&r?j:b,V=l.createElement("dialog",Object.assign({},C,{ref:w,className:ie,style:le,onCancel:P(h,ue),onClick:z?P(y,de):y,onMouseDown:z?P(_,se):_,"aria-labelledby":ce}),l.createElement(Ce,{closeHandler:We(f,r,d),ref:f},r&&l.createElement(J,null,r.label&&l.createElement(we,{className:"navds-modal__label"},r.label),l.createElement(Ee,{size:(n=r.size)!==null&&n!==void 0?n:"medium",level:"1",id:j},r.icon&&l.createElement("span",{className:"navds-modal__header-icon"},r.icon),r.heading)),i));return O?E?me.createPortal(V,E):null:V});R.Header=J;R.Body=Ke;R.Footer=$e;export{R as M};
