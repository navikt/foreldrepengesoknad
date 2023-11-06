import{r as b,R}from"./index-61bf1805.js";import{c as Z}from"./clsx.m-266f4de0.js";import{a as Ze,g as Ge}from"./_commonjsHelpers-de833af9.js";import{r as Je}from"./index-2801d3c9.js";import{p as Ae}from"./index-9d475cdf.js";import{u as Qe}from"./useId-c9351ca0.js";import{u as et}from"./useId-a104c71e.js";import{L as tt}from"./Loader-bb5a2050.js";import{L as nt}from"./Label-e660a0cb.js";var ot=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]]);return n};const rt=b.forwardRef((e,t)=>{var{title:n,titleId:o}=e,a=ot(e,["title","titleId"]);let f=Qe();return f=n?o||"title-"+f:void 0,b.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:t,"aria-labelledby":f},a),n?b.createElement("title",{id:f},n):null,b.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M6.53 5.47a.75.75 0 0 0-1.06 1.06L10.94 12l-5.47 5.47a.75.75 0 1 0 1.06 1.06L12 13.06l5.47 5.47a.75.75 0 1 0 1.06-1.06L13.06 12l5.47-5.47a.75.75 0 0 0-1.06-1.06L12 10.94 6.53 5.47Z",fill:"currentColor"}))}),at=rt;function Oe(e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}function lt(e,t=166){let n;function o(...a){const f=()=>{e.apply(this,a)};clearTimeout(n),n=setTimeout(f,t)}return o.clear=()=>{clearTimeout(n)},o}const st=()=>typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",xe=st()?b.useLayoutEffect:()=>{},Le=(e,t)=>Object.entries(e).filter(([n])=>!t.includes(n)).reduce((n,[o,a])=>Object.assign(Object.assign({},n),{[o]:a}),{}),it=(e,t,n=typeof window<"u"?window:null)=>{b.useEffect(()=>{if(n)return n==null||n.addEventListener(e,t),()=>{n==null||n.removeEventListener(e,t)}},[e,t,n])},ut=(e,t)=>function(o){if(e==null||e(o),!o.defaultPrevented)return t==null?void 0:t(o)},Dn=Object.freeze(Object.defineProperty({__proto__:null,composeEventHandlers:ut,debounce:lt,mergeRefs:Oe,omit:Le,useClientLayoutEffect:xe,useEventListener:it,useId:et},Symbol.toStringTag,{value:"Module"}));var ft=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]]);return n};const ct=b.forwardRef((e,t)=>{var{as:n="button",variant:o="primary",className:a,children:f,size:m="medium",loading:l=!1,disabled:i,style:s,icon:d,iconPosition:h="left"}=e,S=ft(e,["as","variant","className","children","size","loading","disabled","style","icon","iconPosition"]);const C=b.useRef(null),[E,M]=b.useState(),D=b.useMemo(()=>Oe([C,t]),[t]);xe(()=>{if(l){const K=window.requestAnimationFrame(()=>{var U,F;M((F=(U=C==null?void 0:C.current)===null||U===void 0?void 0:U.getBoundingClientRect())===null||F===void 0?void 0:F.width)});return()=>{M(void 0),cancelAnimationFrame(K)}}},[l,f]);const N=i??E?Le(S,["href"]):S;return R.createElement(n,Object.assign({},N,{ref:D,className:Z(a,"navds-button",`navds-button--${o}`,`navds-button--${m}`,{"navds-button--loading":E,"navds-button--icon-only":!!d&&!f,"navds-button--disabled":i??E}),style:Object.assign(Object.assign({},s),{width:E}),disabled:i??E?!0:void 0}),E?R.createElement(tt,{size:m}):R.createElement(R.Fragment,null,d&&h==="left"&&R.createElement("span",{className:"navds-button__icon"},d),f&&R.createElement(nt,{as:"span",size:m==="medium"?"medium":"small"},f),d&&h==="right"&&R.createElement("span",{className:"navds-button__icon"},d)))}),dt=ct;var ve={exports:{}},H={},me={exports:{}},x={},he={exports:{}};(function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=l;/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */var n=/input|select|textarea|button|object|iframe/;function o(i){var s=i.offsetWidth<=0&&i.offsetHeight<=0;if(s&&!i.innerHTML)return!0;try{var d=window.getComputedStyle(i);return s?d.getPropertyValue("overflow")!=="visible"||i.scrollWidth<=0&&i.scrollHeight<=0:d.getPropertyValue("display")=="none"}catch{return console.warn("Failed to inspect element style"),!1}}function a(i){for(var s=i,d=i.getRootNode&&i.getRootNode();s&&s!==document.body;){if(d&&s===d&&(s=d.host.parentNode),o(s))return!1;s=s.parentNode}return!0}function f(i,s){var d=i.nodeName.toLowerCase(),h=n.test(d)&&!i.disabled||d==="a"&&i.href||s;return h&&a(i)}function m(i){var s=i.getAttribute("tabindex");s===null&&(s=void 0);var d=isNaN(s);return(d||s>=0)&&f(i,!d)}function l(i){var s=[].slice.call(i.querySelectorAll("*"),0).reduce(function(d,h){return d.concat(h.shadowRoot?l(h.shadowRoot):[h])},[]);return s.filter(m)}e.exports=t.default})(he,he.exports);var De=he.exports;Object.defineProperty(x,"__esModule",{value:!0});x.resetState=ht;x.log=yt;x.handleBlur=Q;x.handleFocus=ee;x.markForFocusLater=bt;x.returnFocus=Ot;x.popWithoutFocus=gt;x.setupScopedFocus=_t;x.teardownScopedFocus=Et;var pt=De,vt=mt(pt);function mt(e){return e&&e.__esModule?e:{default:e}}var $=[],q=null,ye=!1;function ht(){$=[]}function yt(){}function Q(){ye=!0}function ee(){if(ye){if(ye=!1,!q)return;setTimeout(function(){if(!q.contains(document.activeElement)){var e=(0,vt.default)(q)[0]||q;e.focus()}},0)}}function bt(){$.push(document.activeElement)}function Ot(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,t=null;try{$.length!==0&&(t=$.pop(),t.focus({preventScroll:e}));return}catch{console.warn(["You tried to return focus to",t,"but it is not in the DOM anymore"].join(" "))}}function gt(){$.length>0&&$.pop()}function _t(e){q=e,window.addEventListener?(window.addEventListener("blur",Q,!1),document.addEventListener("focus",ee,!0)):(window.attachEvent("onBlur",Q),document.attachEvent("onFocus",ee))}function Et(){q=null,window.addEventListener?(window.removeEventListener("blur",Q),document.removeEventListener("focus",ee)):(window.detachEvent("onBlur",Q),document.detachEvent("onFocus",ee))}var be={exports:{}};(function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=m;var n=De,o=a(n);function a(l){return l&&l.__esModule?l:{default:l}}function f(){var l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:document;return l.activeElement.shadowRoot?f(l.activeElement.shadowRoot):l.activeElement}function m(l,i){var s=(0,o.default)(l);if(!s.length){i.preventDefault();return}var d=void 0,h=i.shiftKey,S=s[0],C=s[s.length-1],E=f();if(l===E){if(!h)return;d=C}if(C===E&&!h&&(d=S),S===E&&h&&(d=C),d){i.preventDefault(),d.focus();return}var M=/(\bChrome\b|\bSafari\b)\//.exec(navigator.userAgent),D=M!=null&&M[1]!="Chrome"&&/\biPod\b|\biPad\b/g.exec(navigator.userAgent)==null;if(D){var N=s.indexOf(E);if(N>-1&&(N+=h?-1:1),d=s[N],typeof d>"u"){i.preventDefault(),d=h?C:S,d.focus();return}i.preventDefault(),d.focus()}}e.exports=t.default})(be,be.exports);var Ct=be.exports,L={},wt=function(){},St=wt,A={},Fe={exports:{}};/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/(function(e){(function(){var t=!!(typeof window<"u"&&window.document&&window.document.createElement),n={canUseDOM:t,canUseWorkers:typeof Worker<"u",canUseEventListeners:t&&!!(window.addEventListener||window.attachEvent),canUseViewport:t&&!!window.screen};e.exports?e.exports=n:window.ExecutionEnvironment=n})()})(Fe);var Mt=Fe.exports;Object.defineProperty(A,"__esModule",{value:!0});A.canUseDOM=A.SafeNodeList=A.SafeHTMLCollection=void 0;var Rt=Mt,Pt=Nt(Rt);function Nt(e){return e&&e.__esModule?e:{default:e}}var fe=Pt.default,Tt=fe.canUseDOM?window.HTMLElement:{};A.SafeHTMLCollection=fe.canUseDOM?window.HTMLCollection:{};A.SafeNodeList=fe.canUseDOM?window.NodeList:{};A.canUseDOM=fe.canUseDOM;A.default=Tt;Object.defineProperty(L,"__esModule",{value:!0});L.resetState=Ft;L.log=Ut;L.assertNodeList=Ue;L.setElement=kt;L.validateElement=ge;L.hide=It;L.show=Wt;L.documentNotReadyOrSSRTesting=jt;var At=St,xt=Dt(At),Lt=A;function Dt(e){return e&&e.__esModule?e:{default:e}}var P=null;function Ft(){P&&(P.removeAttribute?P.removeAttribute("aria-hidden"):P.length!=null?P.forEach(function(e){return e.removeAttribute("aria-hidden")}):document.querySelectorAll(P).forEach(function(e){return e.removeAttribute("aria-hidden")})),P=null}function Ut(){}function Ue(e,t){if(!e||!e.length)throw new Error("react-modal: No elements were found for selector "+t+".")}function kt(e){var t=e;if(typeof t=="string"&&Lt.canUseDOM){var n=document.querySelectorAll(t);Ue(n,t),t=n}return P=t||P,P}function ge(e){var t=e||P;return t?Array.isArray(t)||t instanceof HTMLCollection||t instanceof NodeList?t:[t]:((0,xt.default)(!1,["react-modal: App element is not defined.","Please use `Modal.setAppElement(el)` or set `appElement={el}`.","This is needed so screen readers don't see main content","when modal is opened. It is not recommended, but you can opt-out","by setting `ariaHideApp={false}`."].join(" ")),[])}function It(e){var t=!0,n=!1,o=void 0;try{for(var a=ge(e)[Symbol.iterator](),f;!(t=(f=a.next()).done);t=!0){var m=f.value;m.setAttribute("aria-hidden","true")}}catch(l){n=!0,o=l}finally{try{!t&&a.return&&a.return()}finally{if(n)throw o}}}function Wt(e){var t=!0,n=!1,o=void 0;try{for(var a=ge(e)[Symbol.iterator](),f;!(t=(f=a.next()).done);t=!0){var m=f.value;m.removeAttribute("aria-hidden")}}catch(l){n=!0,o=l}finally{try{!t&&a.return&&a.return()}finally{if(n)throw o}}}function jt(){P=null}var B={};Object.defineProperty(B,"__esModule",{value:!0});B.resetState=Ht;B.log=qt;var G={},J={};function Ee(e,t){e.classList.remove(t)}function Ht(){var e=document.getElementsByTagName("html")[0];for(var t in G)Ee(e,G[t]);var n=document.body;for(var o in J)Ee(n,J[o]);G={},J={}}function qt(){}var $t=function(t,n){return t[n]||(t[n]=0),t[n]+=1,n},Bt=function(t,n){return t[n]&&(t[n]-=1),n},zt=function(t,n,o){o.forEach(function(a){$t(n,a),t.add(a)})},Kt=function(t,n,o){o.forEach(function(a){Bt(n,a),n[a]===0&&t.remove(a)})};B.add=function(t,n){return zt(t.classList,t.nodeName.toLowerCase()=="html"?G:J,n.split(" "))};B.remove=function(t,n){return Kt(t.classList,t.nodeName.toLowerCase()=="html"?G:J,n.split(" "))};var z={};Object.defineProperty(z,"__esModule",{value:!0});z.log=Xt;z.resetState=Yt;function Vt(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var ke=function e(){var t=this;Vt(this,e),this.register=function(n){t.openInstances.indexOf(n)===-1&&(t.openInstances.push(n),t.emit("register"))},this.deregister=function(n){var o=t.openInstances.indexOf(n);o!==-1&&(t.openInstances.splice(o,1),t.emit("deregister"))},this.subscribe=function(n){t.subscribers.push(n)},this.emit=function(n){t.subscribers.forEach(function(o){return o(n,t.openInstances.slice())})},this.openInstances=[],this.subscribers=[]},se=new ke;function Xt(){console.log("portalOpenInstances ----------"),console.log(se.openInstances.length),se.openInstances.forEach(function(e){return console.log(e)}),console.log("end portalOpenInstances ----------")}function Yt(){se=new ke}z.default=se;var _e={};Object.defineProperty(_e,"__esModule",{value:!0});_e.resetState=Qt;_e.log=en;var Zt=z,Gt=Jt(Zt);function Jt(e){return e&&e.__esModule?e:{default:e}}var _=void 0,T=void 0,j=[];function Qt(){for(var e=[_,T],t=0;t<e.length;t++){var n=e[t];n&&n.parentNode&&n.parentNode.removeChild(n)}_=T=null,j=[]}function en(){console.log("bodyTrap ----------"),console.log(j.length);for(var e=[_,T],t=0;t<e.length;t++){var n=e[t],o=n||{};console.log(o.nodeName,o.className,o.id)}console.log("edn bodyTrap ----------")}function Ce(){j.length!==0&&j[j.length-1].focusContent()}function tn(e,t){!_&&!T&&(_=document.createElement("div"),_.setAttribute("data-react-modal-body-trap",""),_.style.position="absolute",_.style.opacity="0",_.setAttribute("tabindex","0"),_.addEventListener("focus",Ce),T=_.cloneNode(),T.addEventListener("focus",Ce)),j=t,j.length>0?(document.body.firstChild!==_&&document.body.insertBefore(_,document.body.firstChild),document.body.lastChild!==T&&document.body.appendChild(T)):(_.parentElement&&_.parentElement.removeChild(_),T.parentElement&&T.parentElement.removeChild(T))}Gt.default.subscribe(tn);(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(p){for(var v=1;v<arguments.length;v++){var y=arguments[v];for(var r in y)Object.prototype.hasOwnProperty.call(y,r)&&(p[r]=y[r])}return p},o=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(p){return typeof p}:function(p){return p&&typeof Symbol=="function"&&p.constructor===Symbol&&p!==Symbol.prototype?"symbol":typeof p},a=function(){function p(v,y){for(var r=0;r<y.length;r++){var u=y[r];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(v,u.key,u)}}return function(v,y,r){return y&&p(v.prototype,y),r&&p(v,r),v}}(),f=b,m=Ae,l=k(m),i=x,s=F(i),d=Ct,h=k(d),S=L,C=F(S),E=B,M=F(E),D=A,N=k(D),K=z,U=k(K);function F(p){if(p&&p.__esModule)return p;var v={};if(p!=null)for(var y in p)Object.prototype.hasOwnProperty.call(p,y)&&(v[y]=p[y]);return v.default=p,v}function k(p){return p&&p.__esModule?p:{default:p}}function oe(p,v){if(!(p instanceof v))throw new TypeError("Cannot call a class as a function")}function V(p,v){if(!p)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return v&&(typeof v=="object"||typeof v=="function")?v:p}function de(p,v){if(typeof v!="function"&&v!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof v);p.prototype=Object.create(v&&v.prototype,{constructor:{value:p,enumerable:!1,writable:!0,configurable:!0}}),v&&(Object.setPrototypeOf?Object.setPrototypeOf(p,v):p.__proto__=v)}var X={overlay:"ReactModal__Overlay",content:"ReactModal__Content"},Y=9,Be=27,re=0,pe=function(p){de(v,p);function v(y){oe(this,v);var r=V(this,(v.__proto__||Object.getPrototypeOf(v)).call(this,y));return r.setOverlayRef=function(u){r.overlay=u,r.props.overlayRef&&r.props.overlayRef(u)},r.setContentRef=function(u){r.content=u,r.props.contentRef&&r.props.contentRef(u)},r.afterClose=function(){var u=r.props,g=u.appElement,w=u.ariaHideApp,O=u.htmlOpenClassName,ae=u.bodyOpenClassName;ae&&M.remove(document.body,ae),O&&M.remove(document.getElementsByTagName("html")[0],O),w&&re>0&&(re-=1,re===0&&C.show(g)),r.props.shouldFocusAfterRender&&(r.props.shouldReturnFocusAfterClose?(s.returnFocus(r.props.preventScroll),s.teardownScopedFocus()):s.popWithoutFocus()),r.props.onAfterClose&&r.props.onAfterClose(),U.default.deregister(r)},r.open=function(){r.beforeOpen(),r.state.afterOpen&&r.state.beforeClose?(clearTimeout(r.closeTimer),r.setState({beforeClose:!1})):(r.props.shouldFocusAfterRender&&(s.setupScopedFocus(r.node),s.markForFocusLater()),r.setState({isOpen:!0},function(){r.openAnimationFrame=requestAnimationFrame(function(){r.setState({afterOpen:!0}),r.props.isOpen&&r.props.onAfterOpen&&r.props.onAfterOpen({overlayEl:r.overlay,contentEl:r.content})})}))},r.close=function(){r.props.closeTimeoutMS>0?r.closeWithTimeout():r.closeWithoutTimeout()},r.focusContent=function(){return r.content&&!r.contentHasFocus()&&r.content.focus({preventScroll:!0})},r.closeWithTimeout=function(){var u=Date.now()+r.props.closeTimeoutMS;r.setState({beforeClose:!0,closesAt:u},function(){r.closeTimer=setTimeout(r.closeWithoutTimeout,r.state.closesAt-Date.now())})},r.closeWithoutTimeout=function(){r.setState({beforeClose:!1,isOpen:!1,afterOpen:!1,closesAt:null},r.afterClose)},r.handleKeyDown=function(u){u.keyCode===Y&&(0,h.default)(r.content,u),r.props.shouldCloseOnEsc&&u.keyCode===Be&&(u.stopPropagation(),r.requestClose(u))},r.handleOverlayOnClick=function(u){r.shouldClose===null&&(r.shouldClose=!0),r.shouldClose&&r.props.shouldCloseOnOverlayClick&&(r.ownerHandlesClose()?r.requestClose(u):r.focusContent()),r.shouldClose=null},r.handleContentOnMouseUp=function(){r.shouldClose=!1},r.handleOverlayOnMouseDown=function(u){!r.props.shouldCloseOnOverlayClick&&u.target==r.overlay&&u.preventDefault()},r.handleContentOnClick=function(){r.shouldClose=!1},r.handleContentOnMouseDown=function(){r.shouldClose=!1},r.requestClose=function(u){return r.ownerHandlesClose()&&r.props.onRequestClose(u)},r.ownerHandlesClose=function(){return r.props.onRequestClose},r.shouldBeClosed=function(){return!r.state.isOpen&&!r.state.beforeClose},r.contentHasFocus=function(){return document.activeElement===r.content||r.content.contains(document.activeElement)},r.buildClassName=function(u,g){var w=(typeof g>"u"?"undefined":o(g))==="object"?g:{base:X[u],afterOpen:X[u]+"--after-open",beforeClose:X[u]+"--before-close"},O=w.base;return r.state.afterOpen&&(O=O+" "+w.afterOpen),r.state.beforeClose&&(O=O+" "+w.beforeClose),typeof g=="string"&&g?O+" "+g:O},r.attributesFromObject=function(u,g){return Object.keys(g).reduce(function(w,O){return w[u+"-"+O]=g[O],w},{})},r.state={afterOpen:!1,beforeClose:!1},r.shouldClose=null,r.moveFromContentToOverlay=null,r}return a(v,[{key:"componentDidMount",value:function(){this.props.isOpen&&this.open()}},{key:"componentDidUpdate",value:function(r,u){this.props.isOpen&&!r.isOpen?this.open():!this.props.isOpen&&r.isOpen&&this.close(),this.props.shouldFocusAfterRender&&this.state.isOpen&&!u.isOpen&&this.focusContent()}},{key:"componentWillUnmount",value:function(){this.state.isOpen&&this.afterClose(),clearTimeout(this.closeTimer),cancelAnimationFrame(this.openAnimationFrame)}},{key:"beforeOpen",value:function(){var r=this.props,u=r.appElement,g=r.ariaHideApp,w=r.htmlOpenClassName,O=r.bodyOpenClassName;O&&M.add(document.body,O),w&&M.add(document.getElementsByTagName("html")[0],w),g&&(re+=1,C.hide(u)),U.default.register(this)}},{key:"render",value:function(){var r=this.props,u=r.id,g=r.className,w=r.overlayClassName,O=r.defaultStyles,ae=r.children,ze=g?{}:O.content,Ke=w?{}:O.overlay;if(this.shouldBeClosed())return null;var Ve={ref:this.setOverlayRef,className:this.buildClassName("overlay",w),style:n({},Ke,this.props.style.overlay),onClick:this.handleOverlayOnClick,onMouseDown:this.handleOverlayOnMouseDown},Xe=n({id:u,ref:this.setContentRef,style:n({},ze,this.props.style.content),className:this.buildClassName("content",g),tabIndex:"-1",onKeyDown:this.handleKeyDown,onMouseDown:this.handleContentOnMouseDown,onMouseUp:this.handleContentOnMouseUp,onClick:this.handleContentOnClick,role:this.props.role,"aria-label":this.props.contentLabel},this.attributesFromObject("aria",n({modal:!0},this.props.aria)),this.attributesFromObject("data",this.props.data||{}),{"data-testid":this.props.testId}),Ye=this.props.contentElement(Xe,ae);return this.props.overlayElement(Ve,Ye)}}]),v}(f.Component);pe.defaultProps={style:{overlay:{},content:{}},defaultStyles:{}},pe.propTypes={isOpen:l.default.bool.isRequired,defaultStyles:l.default.shape({content:l.default.object,overlay:l.default.object}),style:l.default.shape({content:l.default.object,overlay:l.default.object}),className:l.default.oneOfType([l.default.string,l.default.object]),overlayClassName:l.default.oneOfType([l.default.string,l.default.object]),bodyOpenClassName:l.default.string,htmlOpenClassName:l.default.string,ariaHideApp:l.default.bool,appElement:l.default.oneOfType([l.default.instanceOf(N.default),l.default.instanceOf(D.SafeHTMLCollection),l.default.instanceOf(D.SafeNodeList),l.default.arrayOf(l.default.instanceOf(N.default))]),onAfterOpen:l.default.func,onAfterClose:l.default.func,onRequestClose:l.default.func,closeTimeoutMS:l.default.number,shouldFocusAfterRender:l.default.bool,shouldCloseOnOverlayClick:l.default.bool,shouldReturnFocusAfterClose:l.default.bool,preventScroll:l.default.bool,role:l.default.string,contentLabel:l.default.string,aria:l.default.object,data:l.default.object,children:l.default.node,shouldCloseOnEsc:l.default.bool,overlayRef:l.default.func,contentRef:l.default.func,id:l.default.string,overlayElement:l.default.func,contentElement:l.default.func,testId:l.default.string},t.default=pe,e.exports=t.default})(me,me.exports);var nn=me.exports;function Ie(){var e=this.constructor.getDerivedStateFromProps(this.props,this.state);e!=null&&this.setState(e)}function We(e){function t(n){var o=this.constructor.getDerivedStateFromProps(e,n);return o??null}this.setState(t.bind(this))}function je(e,t){try{var n=this.props,o=this.state;this.props=e,this.state=t,this.__reactInternalSnapshotFlag=!0,this.__reactInternalSnapshot=this.getSnapshotBeforeUpdate(n,o)}finally{this.props=n,this.state=o}}Ie.__suppressDeprecationWarning=!0;We.__suppressDeprecationWarning=!0;je.__suppressDeprecationWarning=!0;function on(e){var t=e.prototype;if(!t||!t.isReactComponent)throw new Error("Can only polyfill class components");if(typeof e.getDerivedStateFromProps!="function"&&typeof t.getSnapshotBeforeUpdate!="function")return e;var n=null,o=null,a=null;if(typeof t.componentWillMount=="function"?n="componentWillMount":typeof t.UNSAFE_componentWillMount=="function"&&(n="UNSAFE_componentWillMount"),typeof t.componentWillReceiveProps=="function"?o="componentWillReceiveProps":typeof t.UNSAFE_componentWillReceiveProps=="function"&&(o="UNSAFE_componentWillReceiveProps"),typeof t.componentWillUpdate=="function"?a="componentWillUpdate":typeof t.UNSAFE_componentWillUpdate=="function"&&(a="UNSAFE_componentWillUpdate"),n!==null||o!==null||a!==null){var f=e.displayName||e.name,m=typeof e.getDerivedStateFromProps=="function"?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";throw Error(`Unsafe legacy lifecycles will not be called for components using new component APIs.

`+f+" uses "+m+" but also contains the following legacy lifecycles:"+(n!==null?`
  `+n:"")+(o!==null?`
  `+o:"")+(a!==null?`
  `+a:"")+`

The above lifecycles should be removed. Learn more about this warning here:
https://fb.me/react-async-component-lifecycle-hooks`)}if(typeof e.getDerivedStateFromProps=="function"&&(t.componentWillMount=Ie,t.componentWillReceiveProps=We),typeof t.getSnapshotBeforeUpdate=="function"){if(typeof t.componentDidUpdate!="function")throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");t.componentWillUpdate=je;var l=t.componentDidUpdate;t.componentDidUpdate=function(s,d,h){var S=this.__reactInternalSnapshotFlag?this.__reactInternalSnapshot:h;l.call(this,s,d,S)}}return e}const rn=Object.freeze(Object.defineProperty({__proto__:null,polyfill:on},Symbol.toStringTag,{value:"Module"})),an=Ze(rn);Object.defineProperty(H,"__esModule",{value:!0});H.bodyOpenClassName=H.portalClassName=void 0;var we=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},ln=function(){function e(t,n){for(var o=0;o<n.length;o++){var a=n[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),He=b,ie=te(He),sn=Je,ue=te(sn),un=Ae,c=te(un),fn=nn,Se=te(fn),cn=L,dn=vn(cn),I=A,Me=te(I),pn=an;function vn(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function te(e){return e&&e.__esModule?e:{default:e}}function mn(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Re(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t&&(typeof t=="object"||typeof t=="function")?t:e}function hn(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var yn=H.portalClassName="ReactModalPortal",bn=H.bodyOpenClassName="ReactModal__Body--open",W=I.canUseDOM&&ue.default.createPortal!==void 0,Pe=function(t){return document.createElement(t)},Ne=function(){return W?ue.default.createPortal:ue.default.unstable_renderSubtreeIntoContainer};function le(e){return e()}var ne=function(e){hn(t,e);function t(){var n,o,a,f;mn(this,t);for(var m=arguments.length,l=Array(m),i=0;i<m;i++)l[i]=arguments[i];return f=(o=(a=Re(this,(n=t.__proto__||Object.getPrototypeOf(t)).call.apply(n,[this].concat(l))),a),a.removePortal=function(){!W&&ue.default.unmountComponentAtNode(a.node);var s=le(a.props.parentSelector);s&&s.contains(a.node)?s.removeChild(a.node):console.warn('React-Modal: "parentSelector" prop did not returned any DOM element. Make sure that the parent element is unmounted to avoid any memory leaks.')},a.portalRef=function(s){a.portal=s},a.renderPortal=function(s){var d=Ne(),h=d(a,ie.default.createElement(Se.default,we({defaultStyles:t.defaultStyles},s)),a.node);a.portalRef(h)},o),Re(a,f)}return ln(t,[{key:"componentDidMount",value:function(){if(I.canUseDOM){W||(this.node=Pe("div")),this.node.className=this.props.portalClassName;var o=le(this.props.parentSelector);o.appendChild(this.node),!W&&this.renderPortal(this.props)}}},{key:"getSnapshotBeforeUpdate",value:function(o){var a=le(o.parentSelector),f=le(this.props.parentSelector);return{prevParent:a,nextParent:f}}},{key:"componentDidUpdate",value:function(o,a,f){if(I.canUseDOM){var m=this.props,l=m.isOpen,i=m.portalClassName;o.portalClassName!==i&&(this.node.className=i);var s=f.prevParent,d=f.nextParent;d!==s&&(s.removeChild(this.node),d.appendChild(this.node)),!(!o.isOpen&&!l)&&!W&&this.renderPortal(this.props)}}},{key:"componentWillUnmount",value:function(){if(!(!I.canUseDOM||!this.node||!this.portal)){var o=this.portal.state,a=Date.now(),f=o.isOpen&&this.props.closeTimeoutMS&&(o.closesAt||a+this.props.closeTimeoutMS);f?(o.beforeClose||this.portal.closeWithTimeout(),setTimeout(this.removePortal,f-a)):this.removePortal()}}},{key:"render",value:function(){if(!I.canUseDOM||!W)return null;!this.node&&W&&(this.node=Pe("div"));var o=Ne();return o(ie.default.createElement(Se.default,we({ref:this.portalRef,defaultStyles:t.defaultStyles},this.props)),this.node)}}],[{key:"setAppElement",value:function(o){dn.setElement(o)}}]),t}(He.Component);ne.propTypes={isOpen:c.default.bool.isRequired,style:c.default.shape({content:c.default.object,overlay:c.default.object}),portalClassName:c.default.string,bodyOpenClassName:c.default.string,htmlOpenClassName:c.default.string,className:c.default.oneOfType([c.default.string,c.default.shape({base:c.default.string.isRequired,afterOpen:c.default.string.isRequired,beforeClose:c.default.string.isRequired})]),overlayClassName:c.default.oneOfType([c.default.string,c.default.shape({base:c.default.string.isRequired,afterOpen:c.default.string.isRequired,beforeClose:c.default.string.isRequired})]),appElement:c.default.oneOfType([c.default.instanceOf(Me.default),c.default.instanceOf(I.SafeHTMLCollection),c.default.instanceOf(I.SafeNodeList),c.default.arrayOf(c.default.instanceOf(Me.default))]),onAfterOpen:c.default.func,onRequestClose:c.default.func,closeTimeoutMS:c.default.number,ariaHideApp:c.default.bool,shouldFocusAfterRender:c.default.bool,shouldCloseOnOverlayClick:c.default.bool,shouldReturnFocusAfterClose:c.default.bool,preventScroll:c.default.bool,parentSelector:c.default.func,aria:c.default.object,data:c.default.object,role:c.default.string,contentLabel:c.default.string,shouldCloseOnEsc:c.default.bool,overlayRef:c.default.func,contentRef:c.default.func,id:c.default.string,overlayElement:c.default.func,contentElement:c.default.func};ne.defaultProps={isOpen:!1,portalClassName:yn,bodyOpenClassName:bn,role:"dialog",ariaHideApp:!0,closeTimeoutMS:0,shouldFocusAfterRender:!0,shouldCloseOnEsc:!0,shouldCloseOnOverlayClick:!0,shouldReturnFocusAfterClose:!0,preventScroll:!1,parentSelector:function(){return document.body},overlayElement:function(t,n){return ie.default.createElement("div",t,n)},contentElement:function(t,n){return ie.default.createElement("div",t,n)}};ne.defaultStyles={overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(255, 255, 255, 0.75)"},content:{position:"absolute",top:"40px",left:"40px",right:"40px",bottom:"40px",border:"1px solid #ccc",background:"#fff",overflow:"auto",WebkitOverflowScrolling:"touch",borderRadius:"4px",outline:"none",padding:"20px"}};(0,pn.polyfill)(ne);H.default=ne;(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n=H,o=a(n);function a(f){return f&&f.__esModule?f:{default:f}}t.default=o.default,e.exports=t.default})(ve,ve.exports);var On=ve.exports;const qe=Ge(On);var gn=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]]);return n};const _n=b.forwardRef((e,t)=>{var{className:n}=e,o=gn(e,["className"]);return R.createElement("div",Object.assign({},o,{ref:t,className:Z("navds-modal__content",n)}))}),En=_n;var Cn=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]]);return n};const ce=b.forwardRef((e,t)=>{var n,o,{children:a,open:f,onClose:m,className:l,overlayClassName:i,shouldCloseOnOverlayClick:s=!0,shouldCloseOnEsc:d=!0,closeButton:h=!0,"aria-describedby":S,"aria-labelledby":C,"aria-modal":E,"aria-label":M,style:D,parentSelector:N}=e,K=Cn(e,["children","open","onClose","className","overlayClassName","shouldCloseOnOverlayClick","shouldCloseOnEsc","closeButton","aria-describedby","aria-labelledby","aria-modal","aria-label","style","parentSelector"]);const U=b.useRef(null),F=b.useMemo(()=>Oe([U,t]),[t]),k=b.useRef(null),oe=(n=Te())===null||n===void 0?void 0:n.rootElement,V=(o=Te())===null||o===void 0?void 0:o.appElement;b.useEffect(()=>{V&&ce.setAppElement(V)},[V]);const de=Y=>{s||Y.type==="keydown"?m():k.current&&k.current.focus()},X=()=>N||(oe!==void 0?()=>oe:void 0);return R.createElement(qe,Object.assign({},K,{parentSelector:X(),style:D,isOpen:f,ref:F,className:Z("navds-modal",l),overlayClassName:Z("navds-modal__overlay",i),shouldCloseOnOverlayClick:s,shouldCloseOnEsc:d,onRequestClose:Y=>de(Y),aria:{describedby:S,labelledby:C,modal:E},contentLabel:M}),a,h&&R.createElement(dt,{className:Z("navds-modal__button",{"navds-modal__button--shake":s}),size:"small",variant:"tertiary-neutral",ref:k,onClick:m,icon:R.createElement(at,{title:"Lukk modalvindu"})}))});ce.setAppElement=e=>qe.setAppElement(e);ce.Content=En;const Fn=ce;var wn=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]]);return n};const $e=b.createContext(void 0),Te=()=>b.useContext($e),Un=e=>{var{children:t}=e,n=wn(e,["children"]);return R.createElement($e.Provider,{value:n},t)};export{dt as B,Fn as M,Un as P,at as X,xe as a,Te as b,ut as c,lt as d,Dn as e,Oe as m,Le as o,it as u};
//# sourceMappingURL=Provider-9ffbd410.js.map
