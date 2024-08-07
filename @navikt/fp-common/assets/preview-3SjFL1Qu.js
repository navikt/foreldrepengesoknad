import{i as Te,T as Se,M as Ie,a as Y,I as Oe,b as F,f as D,g as X,F as $,E as U,c as _e,D as Fe,d as we,e as ae,h as fe,j as Pe,k as Re,s as je,l as De,P as Ce,m as Le}from"./index-C3aMHI7V.js";import{a as p,_ as Me,b as Ne,c as ke}from"./tslib.es6-BntfKcQG.js";import{r as z}from"./index-CTjT7uj6.js";function x(e,a){return Object.keys(e).reduce(function(n,t){return n[t]=p({timeZone:a},e[t]),n},{})}function oe(e,a){var n=Object.keys(p(p({},e),a));return n.reduce(function(t,o){return t[o]=p(p({},e[o]||{}),a[o]||{}),t},{})}function ie(e,a){if(!a)return e;var n=Oe.formats;return p(p(p({},n),e),{date:oe(x(n.date,a),x(e.date||{},a)),time:oe(x(n.time,a),x(e.time||{},a))})}var H=function(e,a,n,t,o){var i=e.locale,u=e.formats,s=e.messages,f=e.defaultLocale,S=e.defaultFormats,m=e.fallbackOnEmptyString,w=e.onError,P=e.timeZone,L=e.defaultRichTextElements;n===void 0&&(n={id:""});var C=n.id,I=n.defaultMessage;Te(!!C,"[@formatjs/intl] An `id` must be provided to format a message. You can either:\n1. Configure your build toolchain with [babel-plugin-formatjs](https://formatjs.io/docs/tooling/babel-plugin)\nor [@formatjs/ts-transformer](https://formatjs.io/docs/tooling/ts-transformer) OR\n2. Configure your `eslint` config to include [eslint-plugin-formatjs](https://formatjs.io/docs/tooling/linter#enforce-id)\nto autofix this issue");var O=String(C),g=s&&Object.prototype.hasOwnProperty.call(s,O)&&s[O];if(Array.isArray(g)&&g.length===1&&g[0].type===Se.literal)return g[0].value;if(!t&&g&&typeof g=="string"&&!L)return g.replace(/'\{(.*?)\}'/gi,"{$1}");if(t=p(p({},L),t||{}),u=ie(u,P),S=ie(S,P),!g){if(m===!1&&g==="")return g;if((!I||i&&i.toLowerCase()!==f.toLowerCase())&&w(new Ie(n,i)),I)try{var j=a.getMessageFormat(I,f,S,o);return j.format(t)}catch(R){return w(new Y('Error formatting default message for: "'.concat(O,'", rendering default message verbatim'),i,n,R)),typeof I=="string"?I:O}return O}try{var j=a.getMessageFormat(g,i,u,p({formatters:a},o||{}));return j.format(t)}catch(R){w(new Y('Error formatting message: "'.concat(O,'", using ').concat(I?"default message":"id"," as fallback."),i,n,R))}if(I)try{var j=a.getMessageFormat(I,f,S,o);return j.format(t)}catch(R){w(new Y('Error formatting the default message for: "'.concat(O,'", rendering message verbatim'),i,n,R))}return typeof g=="string"?g:typeof I=="string"?I:O},ce=["formatMatcher","timeZone","hour12","weekday","era","year","month","day","hour","minute","second","timeZoneName","hourCycle","dateStyle","timeStyle","calendar","numberingSystem","fractionalSecondDigits"];function Z(e,a,n,t){var o=e.locale,i=e.formats,u=e.onError,s=e.timeZone;t===void 0&&(t={});var f=t.format,S=p(p({},s&&{timeZone:s}),f&&X(i,a,f,u)),m=D(t,ce,S);return a==="time"&&!m.hour&&!m.minute&&!m.second&&!m.timeStyle&&!m.dateStyle&&(m=p(p({},m),{hour:"numeric",minute:"numeric"})),n(o,m)}function xe(e,a){for(var n=[],t=2;t<arguments.length;t++)n[t-2]=arguments[t];var o=n[0],i=n[1],u=i===void 0?{}:i,s=typeof o=="string"?new Date(o||0):o;try{return Z(e,"date",a,u).format(s)}catch(f){e.onError(new F("Error formatting date.",e.locale,f))}return String(s)}function Ae(e,a){for(var n=[],t=2;t<arguments.length;t++)n[t-2]=arguments[t];var o=n[0],i=n[1],u=i===void 0?{}:i,s=typeof o=="string"?new Date(o||0):o;try{return Z(e,"time",a,u).format(s)}catch(f){e.onError(new F("Error formatting time.",e.locale,f))}return String(s)}function $e(e,a){for(var n=[],t=2;t<arguments.length;t++)n[t-2]=arguments[t];var o=n[0],i=n[1],u=n[2],s=u===void 0?{}:u,f=e.timeZone,S=e.locale,m=e.onError,w=D(s,ce,f?{timeZone:f}:{});try{return a(S,w).formatRange(o,i)}catch(P){m(new F("Error formatting date time range.",e.locale,P))}return String(o)}function Ue(e,a){for(var n=[],t=2;t<arguments.length;t++)n[t-2]=arguments[t];var o=n[0],i=n[1],u=i===void 0?{}:i,s=typeof o=="string"?new Date(o||0):o;try{return Z(e,"date",a,u).formatToParts(s)}catch(f){e.onError(new F("Error formatting date.",e.locale,f))}return[]}function Ze(e,a){for(var n=[],t=2;t<arguments.length;t++)n[t-2]=arguments[t];var o=n[0],i=n[1],u=i===void 0?{}:i,s=typeof o=="string"?new Date(o||0):o;try{return Z(e,"time",a,u).formatToParts(s)}catch(f){e.onError(new F("Error formatting time.",e.locale,f))}return[]}var Ge=["style","type","fallback","languageDisplay"];function qe(e,a,n,t){var o=e.locale,i=e.onError,u=Intl.DisplayNames;u||i(new $(`Intl.DisplayNames is not available in this environment.
Try polyfilling it using "@formatjs/intl-displaynames"
`,U.MISSING_INTL_API));var s=D(t,Ge);try{return a(o,s).of(n)}catch(f){i(new F("Error formatting display name.",o,f))}}var Ve=["type","style"],le=Date.now();function We(e){return"".concat(le,"_").concat(e,"_").concat(le)}function Ye(e,a,n,t){t===void 0&&(t={});var o=me(e,a,n,t).reduce(function(i,u){var s=u.value;return typeof s!="string"?i.push(s):typeof i[i.length-1]=="string"?i[i.length-1]+=s:i.push(s),i},[]);return o.length===1?o[0]:o.length===0?"":o}function me(e,a,n,t){var o=e.locale,i=e.onError;t===void 0&&(t={});var u=Intl.ListFormat;u||i(new $(`Intl.ListFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-listformat"
`,U.MISSING_INTL_API));var s=D(t,Ve);try{var f={},S=n.map(function(m,w){if(typeof m=="object"){var P=We(w);return f[P]=m,P}return String(m)});return a(o,s).formatToParts(S).map(function(m){return m.type==="literal"?m:p(p({},m),{value:f[m.value]||m.value})})}catch(m){i(new F("Error formatting list.",o,m))}return n}var Be=["type"];function Ke(e,a,n,t){var o=e.locale,i=e.onError;t===void 0&&(t={}),Intl.PluralRules||i(new $(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`,U.MISSING_INTL_API));var u=D(t,Be);try{return a(o,u).select(n)}catch(s){i(new F("Error formatting plural.",o,s))}return"other"}var ze=["numeric","style"];function He(e,a,n){var t=e.locale,o=e.formats,i=e.onError;n===void 0&&(n={});var u=n.format,s=!!u&&X(o,"relative",u,i)||{},f=D(n,ze,s);return a(t,f)}function Xe(e,a,n,t,o){o===void 0&&(o={}),t||(t="second");var i=Intl.RelativeTimeFormat;i||e.onError(new $(`Intl.RelativeTimeFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-relativetimeformat"
`,U.MISSING_INTL_API));try{return He(e,a,o).format(n,t)}catch(u){e.onError(new F("Error formatting relative time.",e.locale,u))}return String(n)}var Je=["style","currency","unit","unitDisplay","useGrouping","minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits","compactDisplay","currencyDisplay","currencySign","notation","signDisplay","unit","unitDisplay","numberingSystem","trailingZeroDisplay","roundingPriority","roundingIncrement","roundingMode"];function de(e,a,n){var t=e.locale,o=e.formats,i=e.onError;n===void 0&&(n={});var u=n.format,s=u&&X(o,"number",u,i)||{},f=D(n,Je,s);return a(t,f)}function Qe(e,a,n,t){t===void 0&&(t={});try{return de(e,a,t).format(n)}catch(o){e.onError(new F("Error formatting number.",e.locale,o))}return String(n)}function er(e,a,n,t){t===void 0&&(t={});try{return de(e,a,t).formatToParts(n)}catch(o){e.onError(new F("Error formatting number.",e.locale,o))}return[]}function rr(e){var a=e?e[Object.keys(e)[0]]:void 0;return typeof a=="string"}function tr(e){e.onWarn&&e.defaultRichTextElements&&rr(e.messages||{})&&e.onWarn(`[@formatjs/intl] "defaultRichTextElements" was specified but "message" was not pre-compiled. 
Please consider using "@formatjs/cli" to pre-compile your messages for performance.
For more details see https://formatjs.io/docs/getting-started/message-distribution`)}function nr(e,a){var n=_e(a),t=p(p({},Fe),e),o=t.locale,i=t.defaultLocale,u=t.onError;return o?!Intl.NumberFormat.supportedLocalesOf(o).length&&u?u(new ae('Missing locale data for locale: "'.concat(o,'" in Intl.NumberFormat. Using default locale: "').concat(i,'" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details'))):!Intl.DateTimeFormat.supportedLocalesOf(o).length&&u&&u(new ae('Missing locale data for locale: "'.concat(o,'" in Intl.DateTimeFormat. Using default locale: "').concat(i,'" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details'))):(u&&u(new we('"locale" was not configured, using "'.concat(i,'" as fallback. See https://formatjs.io/docs/react-intl/api#intlshape for more details'))),t.locale=t.defaultLocale||"en"),tr(t),p(p({},t),{formatters:n,formatNumber:Qe.bind(null,t,n.getNumberFormat),formatNumberToParts:er.bind(null,t,n.getNumberFormat),formatRelativeTime:Xe.bind(null,t,n.getRelativeTimeFormat),formatDate:xe.bind(null,t,n.getDateTimeFormat),formatDateToParts:Ue.bind(null,t,n.getDateTimeFormat),formatTime:Ae.bind(null,t,n.getDateTimeFormat),formatDateTimeRange:$e.bind(null,t,n.getDateTimeFormat),formatTimeToParts:Ze.bind(null,t,n.getDateTimeFormat),formatPlural:Ke.bind(null,t,n.getPluralRules),formatMessage:H.bind(null,t,n),$t:H.bind(null,t,n),formatList:Ye.bind(null,t,n.getListFormat),formatListToParts:me.bind(null,t,n.getListFormat),formatDisplayName:qe.bind(null,t,n.getDisplayNames)})}function pe(e){return e&&Object.keys(e).reduce(function(a,n){var t=e[n];return a[n]=Pe(t)?Re(t):t,a},{})}var ue=function(e,a,n,t){for(var o=[],i=4;i<arguments.length;i++)o[i-4]=arguments[i];var u=pe(t),s=H.apply(void 0,Ne([e,a,n,u],o,!1));return Array.isArray(s)?z.Children.toArray(s):s},se=function(e,a){var n=e.defaultRichTextElements,t=Me(e,["defaultRichTextElements"]),o=pe(n),i=nr(p(p(p({},fe),t),{defaultRichTextElements:o}),a),u={locale:i.locale,timeZone:i.timeZone,fallbackOnEmptyString:i.fallbackOnEmptyString,formats:i.formats,defaultLocale:i.defaultLocale,defaultFormats:i.defaultFormats,messages:i.messages,onError:i.onError,defaultRichTextElements:o};return p(p({},i),{formatMessage:ue.bind(null,u,i.formatters),$t:ue.bind(null,u,i.formatters)})};function B(e){return{locale:e.locale,timeZone:e.timeZone,fallbackOnEmptyString:e.fallbackOnEmptyString,formats:e.formats,textComponent:e.textComponent,messages:e.messages,defaultLocale:e.defaultLocale,defaultFormats:e.defaultFormats,onError:e.onError,onWarn:e.onWarn,wrapRichTextChunksInFragment:e.wrapRichTextChunksInFragment,defaultRichTextElements:e.defaultRichTextElements}}var ar=function(e){ke(a,e);function a(){var n=e!==null&&e.apply(this,arguments)||this;return n.cache=Le(),n.state={cache:n.cache,intl:se(B(n.props),n.cache),prevConfig:B(n.props)},n}return a.getDerivedStateFromProps=function(n,t){var o=t.prevConfig,i=t.cache,u=B(n);return je(o,u)?null:{intl:se(u,i),prevConfig:u}},a.prototype.render=function(){return De(this.state.intl),z.createElement(Ce,{value:this.state.intl},this.props.children)},a.displayName="IntlProvider",a.defaultProps=fe,a}(z.PureComponent);const{useGlobals:or,useEffect:ir}=__STORYBOOK_MODULE_PREVIEW_API__;var lr=(e,a)=>{let[n,t]=or();return ir(()=>{let{parameters:{locale:o}}=a;o&&t({locale:o})},[]),e(a)},ur={decorators:[lr],initialGlobals:{locale:"",locales:{}}},A=ur;const{useGlobals:sr}=__STORYBOOK_MODULE_PREVIEW_API__;var fr=Object.create,ye=Object.defineProperty,cr=Object.getOwnPropertyDescriptor,mr=Object.getOwnPropertyNames,dr=Object.getPrototypeOf,pr=Object.prototype.hasOwnProperty,ve=(e,a)=>()=>(a||e((a={exports:{}}).exports,a),a.exports),yr=(e,a,n,t)=>{if(a&&typeof a=="object"||typeof a=="function")for(let o of mr(a))!pr.call(e,o)&&o!==n&&ye(e,o,{get:()=>a[o],enumerable:!(t=cr(a,o))||t.enumerable});return e},vr=(e,a,n)=>(n=e!=null?fr(dr(e)):{},yr(ye(n,"default",{value:e,enumerable:!0}),e)),gr=ve(e=>{var a=Symbol.for("react.element"),n=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),s=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),S=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),P=Symbol.iterator;function L(r){return r===null||typeof r!="object"?null:(r=P&&r[P]||r["@@iterator"],typeof r=="function"?r:null)}var C={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},I=Object.assign,O={};function g(r,l,c){this.props=r,this.context=l,this.refs=O,this.updater=c||C}g.prototype.isReactComponent={},g.prototype.setState=function(r,l){if(typeof r!="object"&&typeof r!="function"&&r!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,r,l,"setState")},g.prototype.forceUpdate=function(r){this.updater.enqueueForceUpdate(this,r,"forceUpdate")};function j(){}j.prototype=g.prototype;function R(r,l,c){this.props=r,this.context=l,this.refs=O,this.updater=c||C}var G=R.prototype=new j;G.constructor=R,I(G,g.prototype),G.isPureReactComponent=!0;var J=Array.isArray,Q=Object.prototype.hasOwnProperty,q={current:null},ee={key:!0,ref:!0,__self:!0,__source:!0};function re(r,l,c){var y,d={},h=null,E=null;if(l!=null)for(y in l.ref!==void 0&&(E=l.ref),l.key!==void 0&&(h=""+l.key),l)Q.call(l,y)&&!ee.hasOwnProperty(y)&&(d[y]=l[y]);var b=arguments.length-2;if(b===1)d.children=c;else if(1<b){for(var v=Array(b),_=0;_<b;_++)v[_]=arguments[_+2];d.children=v}if(r&&r.defaultProps)for(y in b=r.defaultProps,b)d[y]===void 0&&(d[y]=b[y]);return{$$typeof:a,type:r,key:h,ref:E,props:d,_owner:q.current}}function ge(r,l){return{$$typeof:a,type:r.type,key:l,ref:r.ref,props:r.props,_owner:r._owner}}function V(r){return typeof r=="object"&&r!==null&&r.$$typeof===a}function he(r){var l={"=":"=0",":":"=2"};return"$"+r.replace(/[=:]/g,function(c){return l[c]})}var te=/\/+/g;function W(r,l){return typeof r=="object"&&r!==null&&r.key!=null?he(""+r.key):l.toString(36)}function M(r,l,c,y,d){var h=typeof r;(h==="undefined"||h==="boolean")&&(r=null);var E=!1;if(r===null)E=!0;else switch(h){case"string":case"number":E=!0;break;case"object":switch(r.$$typeof){case a:case n:E=!0}}if(E)return E=r,d=d(E),r=y===""?"."+W(E,0):y,J(d)?(c="",r!=null&&(c=r.replace(te,"$&/")+"/"),M(d,l,c,"",function(_){return _})):d!=null&&(V(d)&&(d=ge(d,c+(!d.key||E&&E.key===d.key?"":(""+d.key).replace(te,"$&/")+"/")+r)),l.push(d)),1;if(E=0,y=y===""?".":y+":",J(r))for(var b=0;b<r.length;b++){h=r[b];var v=y+W(h,b);E+=M(h,l,c,v,d)}else if(v=L(r),typeof v=="function")for(r=v.call(r),b=0;!(h=r.next()).done;)h=h.value,v=y+W(h,b++),E+=M(h,l,c,v,d);else if(h==="object")throw l=String(r),Error("Objects are not valid as a React child (found: "+(l==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":l)+"). If you meant to render a collection of children, use an array instead.");return E}function N(r,l,c){if(r==null)return r;var y=[],d=0;return M(r,y,"","",function(h){return l.call(c,h,d++)}),y}function be(r){if(r._status===-1){var l=r._result;l=l(),l.then(function(c){(r._status===0||r._status===-1)&&(r._status=1,r._result=c)},function(c){(r._status===0||r._status===-1)&&(r._status=2,r._result=c)}),r._status===-1&&(r._status=0,r._result=l)}if(r._status===1)return r._result.default;throw r._result}var T={current:null},k={transition:null},Ee={ReactCurrentDispatcher:T,ReactCurrentBatchConfig:k,ReactCurrentOwner:q};function ne(){throw Error("act(...) is not supported in production builds of React.")}e.Children={map:N,forEach:function(r,l,c){N(r,function(){l.apply(this,arguments)},c)},count:function(r){var l=0;return N(r,function(){l++}),l},toArray:function(r){return N(r,function(l){return l})||[]},only:function(r){if(!V(r))throw Error("React.Children.only expected to receive a single React element child.");return r}},e.Component=g,e.Fragment=t,e.Profiler=i,e.PureComponent=R,e.StrictMode=o,e.Suspense=S,e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ee,e.act=ne,e.cloneElement=function(r,l,c){if(r==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+r+".");var y=I({},r.props),d=r.key,h=r.ref,E=r._owner;if(l!=null){if(l.ref!==void 0&&(h=l.ref,E=q.current),l.key!==void 0&&(d=""+l.key),r.type&&r.type.defaultProps)var b=r.type.defaultProps;for(v in l)Q.call(l,v)&&!ee.hasOwnProperty(v)&&(y[v]=l[v]===void 0&&b!==void 0?b[v]:l[v])}var v=arguments.length-2;if(v===1)y.children=c;else if(1<v){b=Array(v);for(var _=0;_<v;_++)b[_]=arguments[_+2];y.children=b}return{$$typeof:a,type:r.type,key:d,ref:h,props:y,_owner:E}},e.createContext=function(r){return r={$$typeof:s,_currentValue:r,_currentValue2:r,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},r.Provider={$$typeof:u,_context:r},r.Consumer=r},e.createElement=re,e.createFactory=function(r){var l=re.bind(null,r);return l.type=r,l},e.createRef=function(){return{current:null}},e.forwardRef=function(r){return{$$typeof:f,render:r}},e.isValidElement=V,e.lazy=function(r){return{$$typeof:w,_payload:{_status:-1,_result:r},_init:be}},e.memo=function(r,l){return{$$typeof:m,type:r,compare:l===void 0?null:l}},e.startTransition=function(r){var l=k.transition;k.transition={};try{r()}finally{k.transition=l}},e.unstable_act=ne,e.useCallback=function(r,l){return T.current.useCallback(r,l)},e.useContext=function(r){return T.current.useContext(r)},e.useDebugValue=function(){},e.useDeferredValue=function(r){return T.current.useDeferredValue(r)},e.useEffect=function(r,l){return T.current.useEffect(r,l)},e.useId=function(){return T.current.useId()},e.useImperativeHandle=function(r,l,c){return T.current.useImperativeHandle(r,l,c)},e.useInsertionEffect=function(r,l){return T.current.useInsertionEffect(r,l)},e.useLayoutEffect=function(r,l){return T.current.useLayoutEffect(r,l)},e.useMemo=function(r,l){return T.current.useMemo(r,l)},e.useReducer=function(r,l,c){return T.current.useReducer(r,l,c)},e.useRef=function(r){return T.current.useRef(r)},e.useState=function(r){return T.current.useState(r)},e.useSyncExternalStore=function(r,l,c){return T.current.useSyncExternalStore(r,l,c)},e.useTransition=function(){return T.current.useTransition()},e.version="18.3.1"}),hr=ve((e,a)=>{a.exports=gr()}),K=vr(hr()),br=(e,a)=>{let[{locale:n}]=sr(),{parameters:{reactIntl:t,locale:o}}=a,i=n||o;if(i&&t){let{formats:u,messages:s,defaultRichTextElements:f}=t,S=u?u[i]:void 0;if(s)return K.default.createElement(ar,{key:n,formats:S,messages:s[i],locale:i,defaultLocale:o,defaultRichTextElements:f},K.default.createElement(K.default.Fragment,null,e(a)))}return e(a)},Er=(A==null?void 0:A.decorators)||[],Tr={...A,decorators:[...Er,br]},_r=Tr;/*! Bundled license information:

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
*/export{_r as default};
