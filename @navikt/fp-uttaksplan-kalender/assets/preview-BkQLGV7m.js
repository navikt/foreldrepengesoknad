import{_ as te,s as re,i as ne,P as oe,D as ae,c as ue}from"./index-Cp_BLgYG.js";import{r as W}from"./index-RYns6xqu.js";import{c as B}from"./createIntl-B0kZ1fMD.js";function $(r){return{locale:r.locale,timeZone:r.timeZone,fallbackOnEmptyString:r.fallbackOnEmptyString,formats:r.formats,textComponent:r.textComponent,messages:r.messages,defaultLocale:r.defaultLocale,defaultFormats:r.defaultFormats,onError:r.onError,onWarn:r.onWarn,wrapRichTextChunksInFragment:r.wrapRichTextChunksInFragment,defaultRichTextElements:r.defaultRichTextElements}}var le=function(r){te(n,r);function n(){var c=r!==null&&r.apply(this,arguments)||this;return c.cache=ue(),c.state={cache:c.cache,intl:B($(c.props),c.cache),prevConfig:$(c.props)},c}return n.getDerivedStateFromProps=function(c,d){var p=d.prevConfig,v=d.cache,h=$(c);return re(p,h)?null:{intl:B(h,v),prevConfig:h}},n.prototype.render=function(){return ne(this.state.intl),W.createElement(oe,{value:this.state.intl},this.props.children)},n.displayName="IntlProvider",n.defaultProps=ae,n}(W.PureComponent);const{useGlobals:ce,useEffect:se}=__STORYBOOK_MODULE_PREVIEW_API__;var ie=(r,n)=>{let[c,d]=ce();return se(()=>{let{parameters:{locale:p}}=n;p&&d({locale:p})},[]),r(n)},fe={decorators:[ie],initialGlobals:{locale:"",locales:{}}},C=fe;const{useGlobals:pe}=__STORYBOOK_MODULE_PREVIEW_API__;var ye=Object.create,Y=Object.defineProperty,de=Object.getOwnPropertyDescriptor,me=Object.getOwnPropertyNames,ve=Object.getPrototypeOf,he=Object.prototype.hasOwnProperty,z=(r,n)=>()=>(n||r((n={exports:{}}).exports,n),n.exports),_e=(r,n,c,d)=>{if(n&&typeof n=="object"||typeof n=="function")for(let p of me(n))!he.call(r,p)&&p!==c&&Y(r,p,{get:()=>n[p],enumerable:!(d=de(n,p))||d.enumerable});return r},be=(r,n,c)=>(c=r!=null?ye(ve(r)):{},_e(Y(c,"default",{value:r,enumerable:!0}),r)),Ee=z(r=>{var n=Symbol.for("react.element"),c=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),p=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),h=Symbol.for("react.provider"),b=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),H=Symbol.for("react.memo"),K=Symbol.for("react.lazy"),T=Symbol.iterator;function Z(e){return e===null||typeof e!="object"?null:(e=T&&e[T]||e["@@iterator"],typeof e=="function"?e:null)}var F={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D=Object.assign,L={};function _(e,t,o){this.props=e,this.context=t,this.refs=L,this.updater=o||F}_.prototype.isReactComponent={},_.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},_.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function A(){}A.prototype=_.prototype;function P(e,t,o){this.props=e,this.context=t,this.refs=L,this.updater=o||F}var w=P.prototype=new A;w.constructor=P,D(w,_.prototype),w.isPureReactComponent=!0;var U=Array.isArray,V=Object.prototype.hasOwnProperty,x={current:null},N={key:!0,ref:!0,__self:!0,__source:!0};function q(e,t,o){var u,a={},s=null,f=null;if(t!=null)for(u in t.ref!==void 0&&(f=t.ref),t.key!==void 0&&(s=""+t.key),t)V.call(t,u)&&!N.hasOwnProperty(u)&&(a[u]=t[u]);var i=arguments.length-2;if(i===1)a.children=o;else if(1<i){for(var l=Array(i),m=0;m<i;m++)l[m]=arguments[m+2];a.children=l}if(e&&e.defaultProps)for(u in i=e.defaultProps,i)a[u]===void 0&&(a[u]=i[u]);return{$$typeof:n,type:e,key:s,ref:f,props:a,_owner:x.current}}function J(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function k(e){return typeof e=="object"&&e!==null&&e.$$typeof===n}function Q(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(o){return t[o]})}var M=/\/+/g;function I(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Q(""+e.key):t.toString(36)}function E(e,t,o,u,a){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var f=!1;if(e===null)f=!0;else switch(s){case"string":case"number":f=!0;break;case"object":switch(e.$$typeof){case n:case c:f=!0}}if(f)return f=e,a=a(f),e=u===""?"."+I(f,0):u,U(a)?(o="",e!=null&&(o=e.replace(M,"$&/")+"/"),E(a,t,o,"",function(m){return m})):a!=null&&(k(a)&&(a=J(a,o+(!a.key||f&&f.key===a.key?"":(""+a.key).replace(M,"$&/")+"/")+e)),t.push(a)),1;if(f=0,u=u===""?".":u+":",U(e))for(var i=0;i<e.length;i++){s=e[i];var l=u+I(s,i);f+=E(s,t,o,l,a)}else if(l=Z(e),typeof l=="function")for(e=l.call(e),i=0;!(s=e.next()).done;)s=s.value,l=u+I(s,i++),f+=E(s,t,o,l,a);else if(s==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return f}function S(e,t,o){if(e==null)return e;var u=[],a=0;return E(e,u,"","",function(s){return t.call(o,s,a++)}),u}function X(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(o){(e._status===0||e._status===-1)&&(e._status=1,e._result=o)},function(o){(e._status===0||e._status===-1)&&(e._status=2,e._result=o)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var y={current:null},O={transition:null},ee={ReactCurrentDispatcher:y,ReactCurrentBatchConfig:O,ReactCurrentOwner:x};function G(){throw Error("act(...) is not supported in production builds of React.")}r.Children={map:S,forEach:function(e,t,o){S(e,function(){t.apply(this,arguments)},o)},count:function(e){var t=0;return S(e,function(){t++}),t},toArray:function(e){return S(e,function(t){return t})||[]},only:function(e){if(!k(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},r.Component=_,r.Fragment=d,r.Profiler=v,r.PureComponent=P,r.StrictMode=p,r.Suspense=g,r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ee,r.act=G,r.cloneElement=function(e,t,o){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var u=D({},e.props),a=e.key,s=e.ref,f=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,f=x.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(l in t)V.call(t,l)&&!N.hasOwnProperty(l)&&(u[l]=t[l]===void 0&&i!==void 0?i[l]:t[l])}var l=arguments.length-2;if(l===1)u.children=o;else if(1<l){i=Array(l);for(var m=0;m<l;m++)i[m]=arguments[m+2];u.children=i}return{$$typeof:n,type:e.type,key:a,ref:s,props:u,_owner:f}},r.createContext=function(e){return e={$$typeof:b,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:h,_context:e},e.Consumer=e},r.createElement=q,r.createFactory=function(e){var t=q.bind(null,e);return t.type=e,t},r.createRef=function(){return{current:null}},r.forwardRef=function(e){return{$$typeof:R,render:e}},r.isValidElement=k,r.lazy=function(e){return{$$typeof:K,_payload:{_status:-1,_result:e},_init:X}},r.memo=function(e,t){return{$$typeof:H,type:e,compare:t===void 0?null:t}},r.startTransition=function(e){var t=O.transition;O.transition={};try{e()}finally{O.transition=t}},r.unstable_act=G,r.useCallback=function(e,t){return y.current.useCallback(e,t)},r.useContext=function(e){return y.current.useContext(e)},r.useDebugValue=function(){},r.useDeferredValue=function(e){return y.current.useDeferredValue(e)},r.useEffect=function(e,t){return y.current.useEffect(e,t)},r.useId=function(){return y.current.useId()},r.useImperativeHandle=function(e,t,o){return y.current.useImperativeHandle(e,t,o)},r.useInsertionEffect=function(e,t){return y.current.useInsertionEffect(e,t)},r.useLayoutEffect=function(e,t){return y.current.useLayoutEffect(e,t)},r.useMemo=function(e,t){return y.current.useMemo(e,t)},r.useReducer=function(e,t,o){return y.current.useReducer(e,t,o)},r.useRef=function(e){return y.current.useRef(e)},r.useState=function(e){return y.current.useState(e)},r.useSyncExternalStore=function(e,t,o){return y.current.useSyncExternalStore(e,t,o)},r.useTransition=function(){return y.current.useTransition()},r.version="18.3.1"}),Se=z((r,n)=>{n.exports=Ee()}),j=be(Se()),Oe=(r,n)=>{let[{locale:c}]=pe(),{parameters:{reactIntl:d,locale:p}}=n,v=c||p;if(v&&d){let{formats:h,messages:b,defaultRichTextElements:R}=d,g=h?h[v]:void 0;if(b)return j.default.createElement(le,{key:c,formats:g,messages:b[v],locale:v,defaultLocale:p,defaultRichTextElements:R},j.default.createElement(j.default.Fragment,null,r(n)))}return r(n)},Ce=(C==null?void 0:C.decorators)||[],Re={...C,decorators:[...Ce,Oe]},xe=Re;/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/export{xe as default};
