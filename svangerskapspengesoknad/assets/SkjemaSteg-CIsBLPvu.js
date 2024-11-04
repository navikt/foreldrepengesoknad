var fe=Object.defineProperty;var de=(r,e,t)=>e in r?fe(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var C=(r,e,t)=>de(r,typeof e!="symbol"?e+"":e,t);import{i as pe,d as F,s as he,a as me,c as ge,R as ye,t as ve,n as L,b as we}from"./decorators-86JrGkCj.js";import{j as E}from"./jsx-runtime-Cw0GR0a5.js";import{u as z,C as M,b as be}from"./routes-Cd7jN6RC.js";import{u as Te,a as _e,h as Re,k as Ee,i as xe,F as Q}from"./useSvpNavigator-B3F_qXR5.js";import{r as Se}from"./index-CTjT7uj6.js";import{u as Ce,R as Ae,E as Pe,S as ke}from"./ErrorSummaryHookForm-BYm0lOzV.js";import{u as Oe,c as Le,V as J,af as Ne,M as W,b as Ie}from"./VeiviserPage-DFVY7kb3.js";import{A as je,S as qe}from"./attachmentType-CO8SwnHI.js";import{n as De,E as Z}from"./minMax-BlSSLQ_O.js";import{B as Ue}from"./Bedriftsbanner-CSoToEfC.js";function $e(){pe(typeof URL<"u",F.formatMessage(`Global "URL" class is not defined. This likely means that you're running MSW in an environment that doesn't support all Node.js standard API (e.g. React Native). If that's the case, please use an appropriate polyfill for the "URL" class, like "react-native-url-polyfill".`))}function Me(r,e){return r.toLowerCase()===e.toLowerCase()}function Be(r){return r<300?"#69AB32":r<400?"#F0BB4B":"#E95F5D"}function Fe(){const r=new Date;return[r.getHours(),r.getMinutes(),r.getSeconds()].map(String).map(e=>e.slice(0,2)).map(e=>e.padStart(2,"0")).join(":")}async function He(r){const t=await r.clone().text();return{url:new URL(r.url),method:r.method,headers:Object.fromEntries(r.headers.entries()),body:t}}const{message:Ge}=he;async function Ve(r){const e=r.clone(),t=await e.text(),n=e.status||200,s=e.statusText||Ge[n]||"OK";return{status:n,statusText:s,headers:Object.fromEntries(e.headers.entries()),body:t}}function ze(r){for(var e=[],t=0;t<r.length;){var n=r[t];if(n==="*"||n==="+"||n==="?"){e.push({type:"MODIFIER",index:t,value:r[t++]});continue}if(n==="\\"){e.push({type:"ESCAPED_CHAR",index:t++,value:r[t++]});continue}if(n==="{"){e.push({type:"OPEN",index:t,value:r[t++]});continue}if(n==="}"){e.push({type:"CLOSE",index:t,value:r[t++]});continue}if(n===":"){for(var s="",o=t+1;o<r.length;){var a=r.charCodeAt(o);if(a>=48&&a<=57||a>=65&&a<=90||a>=97&&a<=122||a===95){s+=r[o++];continue}break}if(!s)throw new TypeError("Missing parameter name at ".concat(t));e.push({type:"NAME",index:t,value:s}),t=o;continue}if(n==="("){var u=1,l="",o=t+1;if(r[o]==="?")throw new TypeError('Pattern cannot start with "?" at '.concat(o));for(;o<r.length;){if(r[o]==="\\"){l+=r[o++]+r[o++];continue}if(r[o]===")"){if(u--,u===0){o++;break}}else if(r[o]==="("&&(u++,r[o+1]!=="?"))throw new TypeError("Capturing groups are not allowed at ".concat(o));l+=r[o++]}if(u)throw new TypeError("Unbalanced pattern at ".concat(t));if(!l)throw new TypeError("Missing pattern at ".concat(t));e.push({type:"PATTERN",index:t,value:l}),t=o;continue}e.push({type:"CHAR",index:t,value:r[t++]})}return e.push({type:"END",index:t,value:""}),e}function Je(r,e){e===void 0&&(e={});for(var t=ze(r),n=e.prefixes,s=n===void 0?"./":n,o=e.delimiter,a=o===void 0?"/#?":o,u=[],l=0,i=0,p="",h=function(b){if(i<t.length&&t[i].type===b)return t[i++].value},c=function(b){var v=h(b);if(v!==void 0)return v;var S=t[i],$=S.type,le=S.index;throw new TypeError("Unexpected ".concat($," at ").concat(le,", expected ").concat(b))},y=function(){for(var b="",v;v=h("CHAR")||h("ESCAPED_CHAR");)b+=v;return b},w=function(b){for(var v=0,S=a;v<S.length;v++){var $=S[v];if(b.indexOf($)>-1)return!0}return!1},f=function(b){var v=u[u.length-1],S=b||(v&&typeof v=="string"?v:"");if(v&&!S)throw new TypeError('Must have text between two parameters, missing text after "'.concat(v.name,'"'));return!S||w(S)?"[^".concat(O(a),"]+?"):"(?:(?!".concat(O(S),")[^").concat(O(a),"])+?")};i<t.length;){var m=h("CHAR"),g=h("NAME"),T=h("PATTERN");if(g||T){var _=m||"";s.indexOf(_)===-1&&(p+=_,_=""),p&&(u.push(p),p=""),u.push({name:g||l++,prefix:_,suffix:"",pattern:T||f(_),modifier:h("MODIFIER")||""});continue}var d=m||h("ESCAPED_CHAR");if(d){p+=d;continue}p&&(u.push(p),p="");var R=h("OPEN");if(R){var _=y(),x=h("NAME")||"",I=h("PATTERN")||"",A=y();c("CLOSE"),u.push({name:x||(I?l++:""),pattern:x&&!I?f(_):I,prefix:_,suffix:A,modifier:h("MODIFIER")||""});continue}c("END")}return u}function We(r,e){var t=[],n=te(r,t,e);return Xe(n,t,e)}function Xe(r,e,t){t===void 0&&(t={});var n=t.decode,s=n===void 0?function(o){return o}:n;return function(o){var a=r.exec(o);if(!a)return!1;for(var u=a[0],l=a.index,i=Object.create(null),p=function(c){if(a[c]===void 0)return"continue";var y=e[c-1];y.modifier==="*"||y.modifier==="+"?i[y.name]=a[c].split(y.prefix+y.suffix).map(function(w){return s(w,y)}):i[y.name]=s(a[c],y)},h=1;h<a.length;h++)p(h);return{path:u,index:l,params:i}}}function O(r){return r.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function ee(r){return r&&r.sensitive?"":"i"}function Ye(r,e){if(!e)return r;for(var t=/\((?:\?<(.*?)>)?(?!\?)/g,n=0,s=t.exec(r.source);s;)e.push({name:s[1]||n++,prefix:"",suffix:"",modifier:"",pattern:""}),s=t.exec(r.source);return r}function Ke(r,e,t){var n=r.map(function(s){return te(s,e,t).source});return new RegExp("(?:".concat(n.join("|"),")"),ee(t))}function Qe(r,e,t){return Ze(Je(r,t),e,t)}function Ze(r,e,t){t===void 0&&(t={});for(var n=t.strict,s=n===void 0?!1:n,o=t.start,a=o===void 0?!0:o,u=t.end,l=u===void 0?!0:u,i=t.encode,p=i===void 0?function(v){return v}:i,h=t.delimiter,c=h===void 0?"/#?":h,y=t.endsWith,w=y===void 0?"":y,f="[".concat(O(w),"]|$"),m="[".concat(O(c),"]"),g=a?"^":"",T=0,_=r;T<_.length;T++){var d=_[T];if(typeof d=="string")g+=O(p(d));else{var R=O(p(d.prefix)),x=O(p(d.suffix));if(d.pattern)if(e&&e.push(d),R||x)if(d.modifier==="+"||d.modifier==="*"){var I=d.modifier==="*"?"?":"";g+="(?:".concat(R,"((?:").concat(d.pattern,")(?:").concat(x).concat(R,"(?:").concat(d.pattern,"))*)").concat(x,")").concat(I)}else g+="(?:".concat(R,"(").concat(d.pattern,")").concat(x,")").concat(d.modifier);else{if(d.modifier==="+"||d.modifier==="*")throw new TypeError('Can not repeat "'.concat(d.name,'" without a prefix and suffix'));g+="(".concat(d.pattern,")").concat(d.modifier)}else g+="(?:".concat(R).concat(x,")").concat(d.modifier)}}if(l)s||(g+="".concat(m,"?")),g+=t.endsWith?"(?=".concat(f,")"):"$";else{var A=r[r.length-1],b=typeof A=="string"?m.indexOf(A[A.length-1])>-1:A===void 0;s||(g+="(?:".concat(m,"(?=").concat(f,"))?")),b||(g+="(?=".concat(m,"|").concat(f,")"))}return new RegExp(g,ee(t))}function te(r,e,t){return r instanceof RegExp?Ye(r,e):Array.isArray(r)?Ke(r,e,t):Qe(r,e,t)}new TextEncoder;var et=Object.defineProperty,tt=(r,e)=>{for(var t in e)et(r,t,{get:e[t],enumerable:!0})},rt={};tt(rt,{blue:()=>st,gray:()=>ot,green:()=>it,red:()=>at,yellow:()=>nt});function nt(r){return`\x1B[33m${r}\x1B[0m`}function st(r){return`\x1B[34m${r}\x1B[0m`}function ot(r){return`\x1B[90m${r}\x1B[0m`}function at(r){return`\x1B[31m${r}\x1B[0m`}function it(r){return`\x1B[32m${r}\x1B[0m`}me();function ut(r,e=!0){return[e&&r.origin,r.pathname].filter(Boolean).join("")}const ct=/[\?|#].*$/g;function lt(r){return new URL(`/${r}`,"http://localhost").searchParams}function re(r){return r.endsWith("?")?r:r.replace(ct,"")}function ft(r){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(r)}function dt(r,e){if(ft(r)||r.startsWith("*"))return r;const t=e||typeof document<"u"&&document.baseURI;return t?decodeURI(new URL(encodeURI(r),t).href):r}function pt(r,e){if(r instanceof RegExp)return r;const t=dt(r,e);return re(t)}function ht(r){return r.replace(/([:a-zA-Z_-]*)(\*{1,2})+/g,(e,t,n)=>{const s="(.*)";return t?t.startsWith(":")?`${t}${n}`:`${t}${s}`:s}).replace(/([^\/])(:)(?=\d+)/,"$1\\$2").replace(/^([^\/]+)(:)(?=\/\/)/,"$1\\$2")}function mt(r,e,t){const n=pt(e,t),s=typeof n=="string"?ht(n):n,o=ut(r),a=We(s,{decode:decodeURIComponent})(o),u=a&&a.params||{};return{matches:a!==!1,params:u}}var gt=Object.create,ne=Object.defineProperty,yt=Object.getOwnPropertyDescriptor,se=Object.getOwnPropertyNames,vt=Object.getPrototypeOf,wt=Object.prototype.hasOwnProperty,bt=(r,e)=>function(){return e||(0,r[se(r)[0]])((e={exports:{}}).exports,e),e.exports},Tt=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of se(e))!wt.call(r,s)&&s!==t&&ne(r,s,{get:()=>e[s],enumerable:!(n=yt(e,s))||n.enumerable});return r},_t=(r,e,t)=>(t=r!=null?gt(vt(r)):{},Tt(ne(t,"default",{value:r,enumerable:!0}),r)),Rt=bt({"node_modules/cookie/index.js"(r){r.parse=n,r.serialize=s;var e=Object.prototype.toString,t=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function n(i,p){if(typeof i!="string")throw new TypeError("argument str must be a string");for(var h={},c=p||{},y=c.decode||o,w=0;w<i.length;){var f=i.indexOf("=",w);if(f===-1)break;var m=i.indexOf(";",w);if(m===-1)m=i.length;else if(m<f){w=i.lastIndexOf(";",f-1)+1;continue}var g=i.slice(w,f).trim();if(h[g]===void 0){var T=i.slice(f+1,m).trim();T.charCodeAt(0)===34&&(T=T.slice(1,-1)),h[g]=l(T,y)}w=m+1}return h}function s(i,p,h){var c=h||{},y=c.encode||a;if(typeof y!="function")throw new TypeError("option encode is invalid");if(!t.test(i))throw new TypeError("argument name is invalid");var w=y(p);if(w&&!t.test(w))throw new TypeError("argument val is invalid");var f=i+"="+w;if(c.maxAge!=null){var m=c.maxAge-0;if(isNaN(m)||!isFinite(m))throw new TypeError("option maxAge is invalid");f+="; Max-Age="+Math.floor(m)}if(c.domain){if(!t.test(c.domain))throw new TypeError("option domain is invalid");f+="; Domain="+c.domain}if(c.path){if(!t.test(c.path))throw new TypeError("option path is invalid");f+="; Path="+c.path}if(c.expires){var g=c.expires;if(!u(g)||isNaN(g.valueOf()))throw new TypeError("option expires is invalid");f+="; Expires="+g.toUTCString()}if(c.httpOnly&&(f+="; HttpOnly"),c.secure&&(f+="; Secure"),c.priority){var T=typeof c.priority=="string"?c.priority.toLowerCase():c.priority;switch(T){case"low":f+="; Priority=Low";break;case"medium":f+="; Priority=Medium";break;case"high":f+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(c.sameSite){var _=typeof c.sameSite=="string"?c.sameSite.toLowerCase():c.sameSite;switch(_){case!0:f+="; SameSite=Strict";break;case"lax":f+="; SameSite=Lax";break;case"strict":f+="; SameSite=Strict";break;case"none":f+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return f}function o(i){return i.indexOf("%")!==-1?decodeURIComponent(i):i}function a(i){return encodeURIComponent(i)}function u(i){return e.call(i)==="[object Date]"||i instanceof Date}function l(i,p){try{return p(i)}catch{return i}}}}),Et=_t(Rt()),H=Et.default;/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/function X(){return H.parse(document.cookie)}function xt(r){if(typeof document>"u"||typeof location>"u")return{};switch(r.credentials){case"same-origin":{const e=new URL(r.url);return location.origin===e.origin?X():{}}case"include":return X();default:return{}}}function St(r){const e=r.headers.get("cookie"),t=e?H.parse(e):{},n=xt(r);for(const a in n)r.headers.append("cookie",H.serialize(a,n[a]));const s=ge.getCookiesSync(r.url),o=Object.fromEntries(s.map(a=>[a.key,a.value]));for(const a of s)r.headers.append("cookie",a.toString());return{...n,...o,...t}}var k=(r=>(r.HEAD="HEAD",r.GET="GET",r.POST="POST",r.PUT="PUT",r.PATCH="PATCH",r.OPTIONS="OPTIONS",r.DELETE="DELETE",r))(k||{});class Ct extends ye{constructor(e,t,n,s){super({info:{header:`${e} ${t}`,path:t,method:e},resolver:n,options:s}),this.checkRedundantQueryParameters()}checkRedundantQueryParameters(){const{method:e,path:t}=this.info;if(t instanceof RegExp||re(t)===t)return;lt(t).forEach((o,a)=>{}),F.warn(`Found a redundant usage of query parameters in the request handler URL for "${e} ${t}". Please match against a path instead and access query parameters using "new URL(request.url).searchParams" instead. Learn more: https://mswjs.io/docs/recipes/query-parameters`)}async parse(e){var o;const t=new URL(e.request.url),n=mt(t,this.info.path,(o=e.resolutionContext)==null?void 0:o.baseUrl),s=St(e.request);return{match:n,cookies:s}}predicate(e){const t=this.matchMethod(e.request.method),n=e.parsedResult.match.matches;return t&&n}matchMethod(e){return this.info.method instanceof RegExp?this.info.method.test(e):Me(this.info.method,e)}extendResolverArgs(e){var t;return{params:((t=e.parsedResult.match)==null?void 0:t.params)||{},cookies:e.parsedResult.cookies}}async log(e){const t=ve(e.request.url),n=await He(e.request),s=await Ve(e.response),o=Be(s.status);console.groupCollapsed(F.formatMessage(`${Fe()} ${e.request.method} ${t} (%c${s.status} ${s.statusText}%c)`),`color:${o}`,"color:inherit"),console.log("Request",n),console.log("Handler:",this),console.log("Response",s),console.groupEnd()}}function P(r){return(e,t,n={})=>new Ct(r,e,t,n)}const ir={all:P(/.+/),head:P(k.HEAD),get:P(k.GET),post:P(k.POST),put:P(k.PUT),delete:P(k.DELETE),patch:P(k.PATCH),options:P(k.OPTIONS)};class N extends Response{constructor(e,t){const n=L(t);super(e,n),we(this,n)}static text(e,t){const n=L(t);return n.headers.has("Content-Type")||n.headers.set("Content-Type","text/plain"),n.headers.has("Content-Length")||n.headers.set("Content-Length",e?new Blob([e]).size.toString():"0"),new N(e,n)}static json(e,t){const n=L(t);n.headers.has("Content-Type")||n.headers.set("Content-Type","application/json");const s=JSON.stringify(e);return n.headers.has("Content-Length")||n.headers.set("Content-Length",s?new Blob([s]).size.toString():"0"),new N(s,n)}static xml(e,t){const n=L(t);return n.headers.has("Content-Type")||n.headers.set("Content-Type","text/xml"),new N(e,n)}static html(e,t){const n=L(t);return n.headers.has("Content-Type")||n.headers.set("Content-Type","text/html"),new N(e,n)}static arrayBuffer(e,t){const n=L(t);return e&&!n.headers.has("Content-Length")&&n.headers.set("Content-Length",e.byteLength.toString()),new N(e,n)}static formData(e,t){return new N(e,L(t))}}$e();const At=()=>{const r=document.getElementById("nav:appSettings");if(!r)return{};const e=JSON.parse(r.text);return{LOG_VALIDATION:e.LOG_VALIDATION,INNSYN:e.INNSYN,PUBLIC_PATH:e.PUBLIC_PATH}},Pt=At();class Y extends Error{constructor(t,n,s){const o=t.status||t.status===0?t.status:"",a=t.statusText||"",u=`${o} ${a}`.trim(),l=u?`status code ${u}`:"an unknown error";super(`Request failed with ${l}: ${n.method} ${n.url}`);C(this,"response");C(this,"request");C(this,"options");this.name="HTTPError",this.response=t,this.request=n,this.options=s}}class oe extends Error{constructor(t){super(`Request timed out: ${t.method} ${t.url}`);C(this,"request");this.name="TimeoutError",this.request=t}}const j=r=>r!==null&&typeof r=="object",q=(...r)=>{for(const e of r)if((!j(e)||Array.isArray(e))&&e!==void 0)throw new TypeError("The `options` argument must be an object");return V({},...r)},ae=(r={},e={})=>{const t=new globalThis.Headers(r),n=e instanceof globalThis.Headers,s=new globalThis.Headers(e);for(const[o,a]of s.entries())n&&a==="undefined"||a===void 0?t.delete(o):t.set(o,a);return t};function D(r,e,t){return Object.hasOwn(e,t)&&e[t]===void 0?[]:V(r[t]??[],e[t]??[])}const ie=(r={},e={})=>({beforeRequest:D(r,e,"beforeRequest"),beforeRetry:D(r,e,"beforeRetry"),afterResponse:D(r,e,"afterResponse"),beforeError:D(r,e,"beforeError")}),V=(...r)=>{let e={},t={},n={};for(const s of r)if(Array.isArray(s))Array.isArray(e)||(e=[]),e=[...e,...s];else if(j(s)){for(let[o,a]of Object.entries(s))j(a)&&o in e&&(a=V(e[o],a)),e={...e,[o]:a};j(s.hooks)&&(n=ie(n,s.hooks),e.hooks=n),j(s.headers)&&(t=ae(t,s.headers),e.headers=t)}return e},kt=(()=>{let r=!1,e=!1;const t=typeof globalThis.ReadableStream=="function",n=typeof globalThis.Request=="function";if(t&&n)try{e=new globalThis.Request("https://empty.invalid",{body:new globalThis.ReadableStream,method:"POST",get duplex(){return r=!0,"half"}}).headers.has("Content-Type")}catch(s){if(s instanceof Error&&s.message==="unsupported BodyInit type")return!1;throw s}return r&&!e})(),Ot=typeof globalThis.AbortController=="function",Lt=typeof globalThis.ReadableStream=="function",Nt=typeof globalThis.FormData=="function",ue=["get","post","put","patch","head","delete"],It={json:"application/json",text:"text/*",formData:"multipart/form-data",arrayBuffer:"*/*",blob:"*/*"},B=2147483647,ce=Symbol("stop"),jt={json:!0,parseJson:!0,stringifyJson:!0,searchParams:!0,prefixUrl:!0,retry:!0,timeout:!0,hooks:!0,throwHttpErrors:!0,onDownloadProgress:!0,fetch:!0},qt={method:!0,headers:!0,body:!0,mode:!0,credentials:!0,cache:!0,redirect:!0,referrer:!0,referrerPolicy:!0,integrity:!0,keepalive:!0,signal:!0,window:!0,dispatcher:!0,duplex:!0,priority:!0},Dt=r=>ue.includes(r)?r.toUpperCase():r,Ut=["get","put","head","delete","options","trace"],$t=[408,413,429,500,502,503,504],Mt=[413,429,503],K={limit:2,methods:Ut,statusCodes:$t,afterStatusCodes:Mt,maxRetryAfter:Number.POSITIVE_INFINITY,backoffLimit:Number.POSITIVE_INFINITY,delay:r=>.3*2**(r-1)*1e3},Bt=(r={})=>{if(typeof r=="number")return{...K,limit:r};if(r.methods&&!Array.isArray(r.methods))throw new Error("retry.methods must be an array");if(r.statusCodes&&!Array.isArray(r.statusCodes))throw new Error("retry.statusCodes must be an array");return{...K,...r}};async function Ft(r,e,t,n){return new Promise((s,o)=>{const a=setTimeout(()=>{t&&t.abort(),o(new oe(r))},n.timeout);n.fetch(r,e).then(s).catch(o).then(()=>{clearTimeout(a)})})}async function Ht(r,{signal:e}){return new Promise((t,n)=>{e&&(e.throwIfAborted(),e.addEventListener("abort",s,{once:!0}));function s(){clearTimeout(o),n(e.reason)}const o=setTimeout(()=>{e==null||e.removeEventListener("abort",s),t()},r)})}const Gt=(r,e)=>{const t={};for(const n in e)!(n in qt)&&!(n in jt)&&!(n in r)&&(t[n]=e[n]);return t};class U{constructor(e,t={}){C(this,"request");C(this,"abortController");C(this,"_retryCount",0);C(this,"_input");C(this,"_options");var n,s;if(this._input=e,this._options={...t,headers:ae(this._input.headers,t.headers),hooks:ie({beforeRequest:[],beforeRetry:[],beforeError:[],afterResponse:[]},t.hooks),method:Dt(t.method??this._input.method),prefixUrl:String(t.prefixUrl||""),retry:Bt(t.retry),throwHttpErrors:t.throwHttpErrors!==!1,timeout:t.timeout??1e4,fetch:t.fetch??globalThis.fetch.bind(globalThis)},typeof this._input!="string"&&!(this._input instanceof URL||this._input instanceof globalThis.Request))throw new TypeError("`input` must be a string, URL, or Request");if(this._options.prefixUrl&&typeof this._input=="string"){if(this._input.startsWith("/"))throw new Error("`input` must not begin with a slash when using `prefixUrl`");this._options.prefixUrl.endsWith("/")||(this._options.prefixUrl+="/"),this._input=this._options.prefixUrl+this._input}if(Ot){this.abortController=new globalThis.AbortController;const o=this._options.signal??this._input.signal;o==null||o.addEventListener("abort",()=>{this.abortController.abort(o.reason)}),this._options.signal=this.abortController.signal}if(kt&&(this._options.duplex="half"),this._options.json!==void 0&&(this._options.body=((s=(n=this._options).stringifyJson)==null?void 0:s.call(n,this._options.json))??JSON.stringify(this._options.json),this._options.headers.set("content-type",this._options.headers.get("content-type")??"application/json")),this.request=new globalThis.Request(this._input,this._options),this._options.searchParams){const a="?"+(typeof this._options.searchParams=="string"?this._options.searchParams.replace(/^\?/,""):new URLSearchParams(this._options.searchParams).toString()),u=this.request.url.replace(/(?:\?.*?)?(?=#|$)/,a);(Nt&&this._options.body instanceof globalThis.FormData||this._options.body instanceof URLSearchParams)&&!(this._options.headers&&this._options.headers["content-type"])&&this.request.headers.delete("content-type"),this.request=new globalThis.Request(new globalThis.Request(u,{...this.request}),this._options)}}static create(e,t){const n=new U(e,t),s=async()=>{if(typeof n._options.timeout=="number"&&n._options.timeout>B)throw new RangeError(`The \`timeout\` option cannot be greater than ${B}`);await Promise.resolve();let u=await n._fetch();for(const l of n._options.hooks.afterResponse){const i=await l(n.request,n._options,n._decorateResponse(u.clone()));i instanceof globalThis.Response&&(u=i)}if(n._decorateResponse(u),!u.ok&&n._options.throwHttpErrors){let l=new Y(u,n.request,n._options);for(const i of n._options.hooks.beforeError)l=await i(l);throw l}if(n._options.onDownloadProgress){if(typeof n._options.onDownloadProgress!="function")throw new TypeError("The `onDownloadProgress` option must be a function");if(!Lt)throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");return n._stream(u.clone(),n._options.onDownloadProgress)}return u},a=n._options.retry.methods.includes(n.request.method.toLowerCase())?n._retry(s):s();for(const[u,l]of Object.entries(It))a[u]=async()=>{n.request.headers.set("accept",n.request.headers.get("accept")||l);const p=(await a).clone();if(u==="json"){if(p.status===204||(await p.clone().arrayBuffer()).byteLength===0)return"";if(t.parseJson)return t.parseJson(await p.text())}return p[u]()};return a}_calculateRetryDelay(e){if(this._retryCount++,this._retryCount>this._options.retry.limit||e instanceof oe)throw e;if(e instanceof Y){if(!this._options.retry.statusCodes.includes(e.response.status))throw e;const n=e.response.headers.get("Retry-After")??e.response.headers.get("RateLimit-Reset")??e.response.headers.get("X-RateLimit-Reset")??e.response.headers.get("X-Rate-Limit-Reset");if(n&&this._options.retry.afterStatusCodes.includes(e.response.status)){let s=Number(n)*1e3;Number.isNaN(s)?s=Date.parse(n)-Date.now():s>=Date.parse("2024-01-01")&&(s-=Date.now());const o=this._options.retry.maxRetryAfter??s;return s<o?s:o}if(e.response.status===413)throw e}const t=this._options.retry.delay(this._retryCount);return Math.min(this._options.retry.backoffLimit,t)}_decorateResponse(e){return this._options.parseJson&&(e.json=async()=>this._options.parseJson(await e.text())),e}async _retry(e){try{return await e()}catch(t){const n=Math.min(this._calculateRetryDelay(t),B);if(this._retryCount<1)throw t;await Ht(n,{signal:this._options.signal});for(const s of this._options.hooks.beforeRetry)if(await s({request:this.request,options:this._options,error:t,retryCount:this._retryCount})===ce)return;return this._retry(e)}}async _fetch(){for(const n of this._options.hooks.beforeRequest){const s=await n(this.request,this._options);if(s instanceof Request){this.request=s;break}if(s instanceof Response)return s}const e=Gt(this.request,this._options),t=this.request;return this.request=t.clone(),this._options.timeout===!1?this._options.fetch(t,e):Ft(t,e,this.abortController,this._options)}_stream(e,t){const n=Number(e.headers.get("content-length"))||0;let s=0;return e.status===204?(t&&t({percent:1,totalBytes:n,transferredBytes:s},new Uint8Array),new globalThis.Response(null,{status:e.status,statusText:e.statusText,headers:e.headers})):new globalThis.Response(new globalThis.ReadableStream({async start(o){const a=e.body.getReader();t&&t({percent:0,transferredBytes:0,totalBytes:n},new Uint8Array);async function u(){const{done:l,value:i}=await a.read();if(l){o.close();return}if(t){s+=i.byteLength;const p=n===0?0:s/n;t({percent:p,transferredBytes:s,totalBytes:n},i)}o.enqueue(i),await u()}await u()}}),{status:e.status,statusText:e.statusText,headers:e.headers})}}/*! MIT License © Sindre Sorhus */const G=r=>{const e=(t,n)=>U.create(t,q(r,n));for(const t of ue)e[t]=(n,s)=>U.create(n,q(r,s,{method:t}));return e.create=t=>G(q(t)),e.extend=t=>(typeof t=="function"&&(t=t(r??{})),G(q(r,t))),e.stop=ce,e},Vt=G(),zt=(r,e)=>async t=>{const n=new FormData;n.append("id",t.id),n.append("vedlegg",t.file,t.filename);const s=await Vt.post(`${r}/rest/storage/${e}/vedlegg`,{body:n});return{headers:{location:s.headers.get("Location")},data:await s.text()}},Jt=40,Wt=(r,e)=>e===Z?r.formatMessage({id:"skjema.vedlegg.label.selvstendig"}):e===Q?r.formatMessage({id:"skjema.vedlegg.label.frilanser"}):r.formatMessage({id:"skjema.vedlegg.label.arbeidsgiver"}),Xt=({mellomlagreSøknadOgNaviger:r,avbrytSøknad:e,arbeidsforhold:t,maxAntallVedlegg:n=Jt})=>{const s=Oe(),o=Te(t),a=_e(r,t),u=Re(),l=De(u.tilretteleggingId),i=z(M.TILRETTELEGGINGER_VEDLEGG),p=z(M.VALGTE_ARBEIDSFORHOLD),h=be(M.TILRETTELEGGINGER_VEDLEGG),[c,y]=Se.useState(!1),w=d=>{if(d.vedlegg.length===0)return m.setError("vedlegg",{message:s.formatMessage({id:"SkjemaSteg.MinstEttDokument"})}),Promise.resolve();const R=i?Object.keys(i).filter(b=>b!==l).reduce((b,v)=>b+i[v].length,0):0,x=d.vedlegg?d.vedlegg.length:0,A=R+x-n;return A>0?(m.setError("vedlegg",{message:s.formatMessage({id:"skjema.maks40Filer"},{antallVedlegg:A})}),Promise.resolve()):(h({...i,[l]:d.vedlegg}),a.goToNextDefaultStep())},f={vedlegg:i?i[l]:void 0},m=Ce({defaultValues:f}),g=(d,R)=>{y(R),m.setValue("vedlegg",d,{shouldDirty:!0,shouldTouch:!0}),R||m.clearErrors("vedlegg")},T=Ee(l,t),_=xe(s,l,t);return E.jsx(Le,{bannerTitle:s.formatMessage({id:"søknad.pageheading"}),onCancel:e,steps:o,onContinueLater:a.fortsettSøknadSenere,onStepChange:a.goToStep,noFieldsRequired:!0,children:E.jsx(Ae,{formMethods:m,onSubmit:w,children:E.jsxs(J,{gap:"10",children:[E.jsx(Pe,{}),p&&p.length>1&&E.jsx(Ue,{arbeidsforholdType:T,arbeidsforholdNavn:_}),E.jsx(J,{gap:"4",children:E.jsx(Ne,{label:Wt(s,l),description:l===Q||l===Z?E.jsx(W,{id:"skjema.vedlegg.description.frilansSN"}):E.jsx(W,{id:"skjema.vedlegg.description.arbeidsgiver",values:{a:d=>E.jsx("a",{className:"lenke",rel:"noopener noreferrer",href:Ie.arbeidstilsynetSkjema,target:"_blank",children:d})}}),attachmentType:je.TILRETTELEGGING,skjemanummer:qe.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,existingAttachments:f==null?void 0:f.vedlegg,updateAttachments:g,saveAttachment:zt(Pt.PUBLIC_PATH,"svangerskapspenger")})}),E.jsx(ke,{goToPreviousStep:a.goToPreviousDefaultStep,isDisabledAndLoading:c})]})})})};Xt.__docgenInfo={description:"",methods:[],displayName:"SkjemaSteg",props:{mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]"},description:""},maxAntallVedlegg:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"40",computed:!1}}}};export{Pt as E,N as H,Xt as S,Y as a,ir as h,Vt as k};
