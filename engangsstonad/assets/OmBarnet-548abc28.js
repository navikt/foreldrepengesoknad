function Ee(e,t){return function(){return e.apply(t,arguments)}}const{toString:Me}=Object.prototype,{getPrototypeOf:Q}=Object,K=(e=>t=>{const n=Me.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),T=e=>(e=e.toLowerCase(),t=>K(t)===e),k=e=>t=>typeof t===e,{isArray:I}=Array,F=k("undefined");function Ke(e){return e!==null&&!F(e)&&e.constructor!==null&&!F(e.constructor)&&b(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const me=T("ArrayBuffer");function ke(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&me(e.buffer),t}const He=k("string"),b=k("function"),Re=k("number"),H=e=>e!==null&&typeof e=="object",je=e=>e===!0||e===!1,C=e=>{if(K(e)!=="object")return!1;const t=Q(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},Ve=T("Date"),qe=T("File"),Ge=T("Blob"),Je=T("FileList"),ze=e=>H(e)&&b(e.pipe),$e=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||b(e.append)&&((t=K(e))==="formdata"||t==="object"&&b(e.toString)&&e.toString()==="[object FormData]"))},ve=T("URLSearchParams"),We=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function x(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,s;if(typeof e!="object"&&(e=[e]),I(e))for(r=0,s=e.length;r<s;r++)t.call(null,e[r],r,e);else{const o=n?Object.getOwnPropertyNames(e):Object.keys(e),i=o.length;let c;for(r=0;r<i;r++)c=o[r],t.call(null,e[c],c,e)}}function Se(e,t){t=t.toLowerCase();const n=Object.keys(e);let r=n.length,s;for(;r-- >0;)if(s=n[r],t===s.toLowerCase())return s;return null}const ye=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),Oe=e=>!F(e)&&e!==ye;function $(){const{caseless:e}=Oe(this)&&this||{},t={},n=(r,s)=>{const o=e&&Se(t,s)||s;C(t[o])&&C(r)?t[o]=$(t[o],r):C(r)?t[o]=$({},r):I(r)?t[o]=r.slice():t[o]=r};for(let r=0,s=arguments.length;r<s;r++)arguments[r]&&x(arguments[r],n);return t}const Xe=(e,t,n,{allOwnKeys:r}={})=>(x(t,(s,o)=>{n&&b(s)?e[o]=Ee(s,n):e[o]=s},{allOwnKeys:r}),e),Ye=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Qe=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},Ze=(e,t,n,r)=>{let s,o,i;const c={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),o=s.length;o-- >0;)i=s[o],(!r||r(i,e,t))&&!c[i]&&(t[i]=e[i],c[i]=!0);e=n!==!1&&Q(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},et=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},tt=e=>{if(!e)return null;if(I(e))return e;let t=e.length;if(!Re(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},nt=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Q(Uint8Array)),rt=(e,t)=>{const r=(e&&e[Symbol.iterator]).call(e);let s;for(;(s=r.next())&&!s.done;){const o=s.value;t.call(e,o[0],o[1])}},st=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},ot=T("HTMLFormElement"),it=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,s){return r.toUpperCase()+s}),se=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),at=T("RegExp"),be=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};x(n,(s,o)=>{let i;(i=t(s,o,e))!==!1&&(r[o]=i||s)}),Object.defineProperties(e,r)},ct=e=>{be(e,(t,n)=>{if(b(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(b(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},ut=(e,t)=>{const n={},r=s=>{s.forEach(o=>{n[o]=!0})};return I(e)?r(e):r(String(e).split(t)),n},lt=()=>{},ft=(e,t)=>(e=+e,Number.isFinite(e)?e:t),q="abcdefghijklmnopqrstuvwxyz",oe="0123456789",we={DIGIT:oe,ALPHA:q,ALPHA_DIGIT:q+q.toUpperCase()+oe},dt=(e=16,t=we.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n};function pt(e){return!!(e&&b(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const ht=e=>{const t=new Array(10),n=(r,s)=>{if(H(r)){if(t.indexOf(r)>=0)return;if(!("toJSON"in r)){t[s]=r;const o=I(r)?[]:{};return x(r,(i,c)=>{const p=n(i,s+1);!F(p)&&(o[c]=p)}),t[s]=void 0,o}}return r};return n(e,0)},Et=T("AsyncFunction"),mt=e=>e&&(H(e)||b(e))&&b(e.then)&&b(e.catch),a={isArray:I,isArrayBuffer:me,isBuffer:Ke,isFormData:$e,isArrayBufferView:ke,isString:He,isNumber:Re,isBoolean:je,isObject:H,isPlainObject:C,isUndefined:F,isDate:Ve,isFile:qe,isBlob:Ge,isRegExp:at,isFunction:b,isStream:ze,isURLSearchParams:ve,isTypedArray:nt,isFileList:Je,forEach:x,merge:$,extend:Xe,trim:We,stripBOM:Ye,inherits:Qe,toFlatObject:Ze,kindOf:K,kindOfTest:T,endsWith:et,toArray:tt,forEachEntry:rt,matchAll:st,isHTMLForm:ot,hasOwnProperty:se,hasOwnProp:se,reduceDescriptors:be,freezeMethods:ct,toObjectSet:ut,toCamelCase:it,noop:lt,toFiniteNumber:ft,findKey:Se,global:ye,isContextDefined:Oe,ALPHABET:we,generateString:dt,isSpecCompliantForm:pt,toJSONObject:ht,isAsyncFn:Et,isThenable:mt};function E(e,t,n,r,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),s&&(this.response=s)}a.inherits(E,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:a.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const Te=E.prototype,Ae={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{Ae[e]={value:e}});Object.defineProperties(E,Ae);Object.defineProperty(Te,"isAxiosError",{value:!0});E.from=(e,t,n,r,s,o)=>{const i=Object.create(Te);return a.toFlatObject(e,i,function(p){return p!==Error.prototype},c=>c!=="isAxiosError"),E.call(i,e.message,t,n,r,s),i.cause=e,i.name=e.name,o&&Object.assign(i,o),i};const Rt=null;function v(e){return a.isPlainObject(e)||a.isArray(e)}function Ne(e){return a.endsWith(e,"[]")?e.slice(0,-2):e}function ie(e,t,n){return e?e.concat(t).map(function(s,o){return s=Ne(s),!n&&o?"["+s+"]":s}).join(n?".":""):t}function St(e){return a.isArray(e)&&!e.some(v)}const yt=a.toFlatObject(a,{},null,function(t){return/^is[A-Z]/.test(t)});function j(e,t,n){if(!a.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=a.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(d,S){return!a.isUndefined(S[d])});const r=n.metaTokens,s=n.visitor||l,o=n.dots,i=n.indexes,p=(n.Blob||typeof Blob<"u"&&Blob)&&a.isSpecCompliantForm(t);if(!a.isFunction(s))throw new TypeError("visitor must be a function");function h(f){if(f===null)return"";if(a.isDate(f))return f.toISOString();if(!p&&a.isBlob(f))throw new E("Blob is not supported. Use a Buffer instead.");return a.isArrayBuffer(f)||a.isTypedArray(f)?p&&typeof Blob=="function"?new Blob([f]):Buffer.from(f):f}function l(f,d,S){let y=f;if(f&&!S&&typeof f=="object"){if(a.endsWith(d,"{}"))d=r?d:d.slice(0,-2),f=JSON.stringify(f);else if(a.isArray(f)&&St(f)||(a.isFileList(f)||a.endsWith(d,"[]"))&&(y=a.toArray(f)))return d=Ne(d),y.forEach(function(_,Ue){!(a.isUndefined(_)||_===null)&&t.append(i===!0?ie([d],Ue,o):i===null?d:d+"[]",h(_))}),!1}return v(f)?!0:(t.append(ie(S,d,o),h(f)),!1)}const u=[],R=Object.assign(yt,{defaultVisitor:l,convertValue:h,isVisitable:v});function O(f,d){if(!a.isUndefined(f)){if(u.indexOf(f)!==-1)throw Error("Circular reference detected in "+d.join("."));u.push(f),a.forEach(f,function(y,N){(!(a.isUndefined(y)||y===null)&&s.call(t,y,a.isString(N)?N.trim():N,d,R))===!0&&O(y,d?d.concat(N):[N])}),u.pop()}}if(!a.isObject(e))throw new TypeError("data must be an object");return O(e),t}function ae(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function Z(e,t){this._pairs=[],e&&j(e,this,t)}const _e=Z.prototype;_e.append=function(t,n){this._pairs.push([t,n])};_e.toString=function(t){const n=t?function(r){return t.call(this,r,ae)}:ae;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function Ot(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function ge(e,t,n){if(!t)return e;const r=n&&n.encode||Ot,s=n&&n.serialize;let o;if(s?o=s(t,n):o=a.isURLSearchParams(t)?t.toString():new Z(t,n).toString(r),o){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+o}return e}class bt{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){a.forEach(this.handlers,function(r){r!==null&&t(r)})}}const ce=bt,Le={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},wt=typeof URLSearchParams<"u"?URLSearchParams:Z,Tt=typeof FormData<"u"?FormData:null,At=typeof Blob<"u"?Blob:null,Nt={isBrowser:!0,classes:{URLSearchParams:wt,FormData:Tt,Blob:At},protocols:["http","https","file","blob","url","data"]},Ie=typeof window<"u"&&typeof document<"u",_t=(e=>Ie&&["ReactNative","NativeScript","NS"].indexOf(e)<0)(typeof navigator<"u"&&navigator.product),gt=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),Lt=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Ie,hasStandardBrowserEnv:_t,hasStandardBrowserWebWorkerEnv:gt},Symbol.toStringTag,{value:"Module"})),w={...Lt,...Nt};function It(e,t){return j(e,new w.classes.URLSearchParams,Object.assign({visitor:function(n,r,s,o){return w.isNode&&a.isBuffer(n)?(this.append(r,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)}},t))}function Pt(e){return a.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Ft(e){const t={},n=Object.keys(e);let r;const s=n.length;let o;for(r=0;r<s;r++)o=n[r],t[o]=e[o];return t}function Pe(e){function t(n,r,s,o){let i=n[o++];const c=Number.isFinite(+i),p=o>=n.length;return i=!i&&a.isArray(s)?s.length:i,p?(a.hasOwnProp(s,i)?s[i]=[s[i],r]:s[i]=r,!c):((!s[i]||!a.isObject(s[i]))&&(s[i]=[]),t(n,r,s[i],o)&&a.isArray(s[i])&&(s[i]=Ft(s[i])),!c)}if(a.isFormData(e)&&a.isFunction(e.entries)){const n={};return a.forEachEntry(e,(r,s)=>{t(Pt(r),s,n,0)}),n}return null}function xt(e,t,n){if(a.isString(e))try{return(t||JSON.parse)(e),a.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const ee={transitional:Le,adapter:["xhr","http"],transformRequest:[function(t,n){const r=n.getContentType()||"",s=r.indexOf("application/json")>-1,o=a.isObject(t);if(o&&a.isHTMLForm(t)&&(t=new FormData(t)),a.isFormData(t))return s&&s?JSON.stringify(Pe(t)):t;if(a.isArrayBuffer(t)||a.isBuffer(t)||a.isStream(t)||a.isFile(t)||a.isBlob(t))return t;if(a.isArrayBufferView(t))return t.buffer;if(a.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let c;if(o){if(r.indexOf("application/x-www-form-urlencoded")>-1)return It(t,this.formSerializer).toString();if((c=a.isFileList(t))||r.indexOf("multipart/form-data")>-1){const p=this.env&&this.env.FormData;return j(c?{"files[]":t}:t,p&&new p,this.formSerializer)}}return o||s?(n.setContentType("application/json",!1),xt(t)):t}],transformResponse:[function(t){const n=this.transitional||ee.transitional,r=n&&n.forcedJSONParsing,s=this.responseType==="json";if(t&&a.isString(t)&&(r&&!this.responseType||s)){const i=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(t)}catch(c){if(i)throw c.name==="SyntaxError"?E.from(c,E.ERR_BAD_RESPONSE,this,null,this.response):c}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:w.classes.FormData,Blob:w.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};a.forEach(["delete","get","head","post","put","patch"],e=>{ee.headers[e]={}});const te=ee,Dt=a.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Ct=e=>{const t={};let n,r,s;return e&&e.split(`
`).forEach(function(i){s=i.indexOf(":"),n=i.substring(0,s).trim().toLowerCase(),r=i.substring(s+1).trim(),!(!n||t[n]&&Dt[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},ue=Symbol("internals");function P(e){return e&&String(e).trim().toLowerCase()}function B(e){return e===!1||e==null?e:a.isArray(e)?e.map(B):String(e)}function Bt(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const Ut=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function G(e,t,n,r,s){if(a.isFunction(r))return r.call(this,t,n);if(s&&(t=n),!!a.isString(t)){if(a.isString(r))return t.indexOf(r)!==-1;if(a.isRegExp(r))return r.test(t)}}function Mt(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function Kt(e,t){const n=a.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(s,o,i){return this[r].call(this,t,s,o,i)},configurable:!0})})}class V{constructor(t){t&&this.set(t)}set(t,n,r){const s=this;function o(c,p,h){const l=P(p);if(!l)throw new Error("header name must be a non-empty string");const u=a.findKey(s,l);(!u||s[u]===void 0||h===!0||h===void 0&&s[u]!==!1)&&(s[u||p]=B(c))}const i=(c,p)=>a.forEach(c,(h,l)=>o(h,l,p));return a.isPlainObject(t)||t instanceof this.constructor?i(t,n):a.isString(t)&&(t=t.trim())&&!Ut(t)?i(Ct(t),n):t!=null&&o(n,t,r),this}get(t,n){if(t=P(t),t){const r=a.findKey(this,t);if(r){const s=this[r];if(!n)return s;if(n===!0)return Bt(s);if(a.isFunction(n))return n.call(this,s,r);if(a.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=P(t),t){const r=a.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||G(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let s=!1;function o(i){if(i=P(i),i){const c=a.findKey(r,i);c&&(!n||G(r,r[c],c,n))&&(delete r[c],s=!0)}}return a.isArray(t)?t.forEach(o):o(t),s}clear(t){const n=Object.keys(this);let r=n.length,s=!1;for(;r--;){const o=n[r];(!t||G(this,this[o],o,t,!0))&&(delete this[o],s=!0)}return s}normalize(t){const n=this,r={};return a.forEach(this,(s,o)=>{const i=a.findKey(r,o);if(i){n[i]=B(s),delete n[o];return}const c=t?Mt(o):String(o).trim();c!==o&&delete n[o],n[c]=B(s),r[c]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return a.forEach(this,(r,s)=>{r!=null&&r!==!1&&(n[s]=t&&a.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(s=>r.set(s)),r}static accessor(t){const r=(this[ue]=this[ue]={accessors:{}}).accessors,s=this.prototype;function o(i){const c=P(i);r[c]||(Kt(s,i),r[c]=!0)}return a.isArray(t)?t.forEach(o):o(t),this}}V.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);a.reduceDescriptors(V.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});a.freezeMethods(V);const A=V;function J(e,t){const n=this||te,r=t||n,s=A.from(r.headers);let o=r.data;return a.forEach(e,function(c){o=c.call(n,o,s.normalize(),t?t.status:void 0)}),s.normalize(),o}function Fe(e){return!!(e&&e.__CANCEL__)}function D(e,t,n){E.call(this,e??"canceled",E.ERR_CANCELED,t,n),this.name="CanceledError"}a.inherits(D,E,{__CANCEL__:!0});function kt(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new E("Request failed with status code "+n.status,[E.ERR_BAD_REQUEST,E.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const Ht=w.hasStandardBrowserEnv?{write(e,t,n,r,s,o){const i=[e+"="+encodeURIComponent(t)];a.isNumber(n)&&i.push("expires="+new Date(n).toGMTString()),a.isString(r)&&i.push("path="+r),a.isString(s)&&i.push("domain="+s),o===!0&&i.push("secure"),document.cookie=i.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function jt(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Vt(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function xe(e,t){return e&&!jt(t)?Vt(e,t):t}const qt=w.hasStandardBrowserEnv?function(){const t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let r;function s(o){let i=o;return t&&(n.setAttribute("href",i),i=n.href),n.setAttribute("href",i),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=s(window.location.href),function(i){const c=a.isString(i)?s(i):i;return c.protocol===r.protocol&&c.host===r.host}}():function(){return function(){return!0}}();function Gt(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Jt(e,t){e=e||10;const n=new Array(e),r=new Array(e);let s=0,o=0,i;return t=t!==void 0?t:1e3,function(p){const h=Date.now(),l=r[o];i||(i=h),n[s]=p,r[s]=h;let u=o,R=0;for(;u!==s;)R+=n[u++],u=u%e;if(s=(s+1)%e,s===o&&(o=(o+1)%e),h-i<t)return;const O=l&&h-l;return O?Math.round(R*1e3/O):void 0}}function le(e,t){let n=0;const r=Jt(50,250);return s=>{const o=s.loaded,i=s.lengthComputable?s.total:void 0,c=o-n,p=r(c),h=o<=i;n=o;const l={loaded:o,total:i,progress:i?o/i:void 0,bytes:c,rate:p||void 0,estimated:p&&i&&h?(i-o)/p:void 0,event:s};l[t?"download":"upload"]=!0,e(l)}}const zt=typeof XMLHttpRequest<"u",$t=zt&&function(e){return new Promise(function(n,r){let s=e.data;const o=A.from(e.headers).normalize();let{responseType:i,withXSRFToken:c}=e,p;function h(){e.cancelToken&&e.cancelToken.unsubscribe(p),e.signal&&e.signal.removeEventListener("abort",p)}let l;if(a.isFormData(s)){if(w.hasStandardBrowserEnv||w.hasStandardBrowserWebWorkerEnv)o.setContentType(!1);else if((l=o.getContentType())!==!1){const[d,...S]=l?l.split(";").map(y=>y.trim()).filter(Boolean):[];o.setContentType([d||"multipart/form-data",...S].join("; "))}}let u=new XMLHttpRequest;if(e.auth){const d=e.auth.username||"",S=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.set("Authorization","Basic "+btoa(d+":"+S))}const R=xe(e.baseURL,e.url);u.open(e.method.toUpperCase(),ge(R,e.params,e.paramsSerializer),!0),u.timeout=e.timeout;function O(){if(!u)return;const d=A.from("getAllResponseHeaders"in u&&u.getAllResponseHeaders()),y={data:!i||i==="text"||i==="json"?u.responseText:u.response,status:u.status,statusText:u.statusText,headers:d,config:e,request:u};kt(function(_){n(_),h()},function(_){r(_),h()},y),u=null}if("onloadend"in u?u.onloadend=O:u.onreadystatechange=function(){!u||u.readyState!==4||u.status===0&&!(u.responseURL&&u.responseURL.indexOf("file:")===0)||setTimeout(O)},u.onabort=function(){u&&(r(new E("Request aborted",E.ECONNABORTED,e,u)),u=null)},u.onerror=function(){r(new E("Network Error",E.ERR_NETWORK,e,u)),u=null},u.ontimeout=function(){let S=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const y=e.transitional||Le;e.timeoutErrorMessage&&(S=e.timeoutErrorMessage),r(new E(S,y.clarifyTimeoutError?E.ETIMEDOUT:E.ECONNABORTED,e,u)),u=null},w.hasStandardBrowserEnv&&(c&&a.isFunction(c)&&(c=c(e)),c||c!==!1&&qt(R))){const d=e.xsrfHeaderName&&e.xsrfCookieName&&Ht.read(e.xsrfCookieName);d&&o.set(e.xsrfHeaderName,d)}s===void 0&&o.setContentType(null),"setRequestHeader"in u&&a.forEach(o.toJSON(),function(S,y){u.setRequestHeader(y,S)}),a.isUndefined(e.withCredentials)||(u.withCredentials=!!e.withCredentials),i&&i!=="json"&&(u.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&u.addEventListener("progress",le(e.onDownloadProgress,!0)),typeof e.onUploadProgress=="function"&&u.upload&&u.upload.addEventListener("progress",le(e.onUploadProgress)),(e.cancelToken||e.signal)&&(p=d=>{u&&(r(!d||d.type?new D(null,e,u):d),u.abort(),u=null)},e.cancelToken&&e.cancelToken.subscribe(p),e.signal&&(e.signal.aborted?p():e.signal.addEventListener("abort",p)));const f=Gt(R);if(f&&w.protocols.indexOf(f)===-1){r(new E("Unsupported protocol "+f+":",E.ERR_BAD_REQUEST,e));return}u.send(s||null)})},W={http:Rt,xhr:$t};a.forEach(W,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const fe=e=>`- ${e}`,vt=e=>a.isFunction(e)||e===null||e===!1,De={getAdapter:e=>{e=a.isArray(e)?e:[e];const{length:t}=e;let n,r;const s={};for(let o=0;o<t;o++){n=e[o];let i;if(r=n,!vt(n)&&(r=W[(i=String(n)).toLowerCase()],r===void 0))throw new E(`Unknown adapter '${i}'`);if(r)break;s[i||"#"+o]=r}if(!r){const o=Object.entries(s).map(([c,p])=>`adapter ${c} `+(p===!1?"is not supported by the environment":"is not available in the build"));let i=t?o.length>1?`since :
`+o.map(fe).join(`
`):" "+fe(o[0]):"as no adapter specified";throw new E("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return r},adapters:W};function z(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new D(null,e)}function de(e){return z(e),e.headers=A.from(e.headers),e.data=J.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),De.getAdapter(e.adapter||te.adapter)(e).then(function(r){return z(e),r.data=J.call(e,e.transformResponse,r),r.headers=A.from(r.headers),r},function(r){return Fe(r)||(z(e),r&&r.response&&(r.response.data=J.call(e,e.transformResponse,r.response),r.response.headers=A.from(r.response.headers))),Promise.reject(r)})}const pe=e=>e instanceof A?e.toJSON():e;function L(e,t){t=t||{};const n={};function r(h,l,u){return a.isPlainObject(h)&&a.isPlainObject(l)?a.merge.call({caseless:u},h,l):a.isPlainObject(l)?a.merge({},l):a.isArray(l)?l.slice():l}function s(h,l,u){if(a.isUndefined(l)){if(!a.isUndefined(h))return r(void 0,h,u)}else return r(h,l,u)}function o(h,l){if(!a.isUndefined(l))return r(void 0,l)}function i(h,l){if(a.isUndefined(l)){if(!a.isUndefined(h))return r(void 0,h)}else return r(void 0,l)}function c(h,l,u){if(u in t)return r(h,l);if(u in e)return r(void 0,h)}const p={url:o,method:o,data:o,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,withXSRFToken:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:c,headers:(h,l)=>s(pe(h),pe(l),!0)};return a.forEach(Object.keys(Object.assign({},e,t)),function(l){const u=p[l]||s,R=u(e[l],t[l],l);a.isUndefined(R)&&u!==c||(n[l]=R)}),n}const Ce="1.6.3",ne={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{ne[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const he={};ne.transitional=function(t,n,r){function s(o,i){return"[Axios v"+Ce+"] Transitional option '"+o+"'"+i+(r?". "+r:"")}return(o,i,c)=>{if(t===!1)throw new E(s(i," has been removed"+(n?" in "+n:"")),E.ERR_DEPRECATED);return n&&!he[i]&&(he[i]=!0,console.warn(s(i," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,i,c):!0}};function Wt(e,t,n){if(typeof e!="object")throw new E("options must be an object",E.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let s=r.length;for(;s-- >0;){const o=r[s],i=t[o];if(i){const c=e[o],p=c===void 0||i(c,o,e);if(p!==!0)throw new E("option "+o+" must be "+p,E.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new E("Unknown option "+o,E.ERR_BAD_OPTION)}}const X={assertOptions:Wt,validators:ne},g=X.validators;class M{constructor(t){this.defaults=t,this.interceptors={request:new ce,response:new ce}}request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=L(this.defaults,n);const{transitional:r,paramsSerializer:s,headers:o}=n;r!==void 0&&X.assertOptions(r,{silentJSONParsing:g.transitional(g.boolean),forcedJSONParsing:g.transitional(g.boolean),clarifyTimeoutError:g.transitional(g.boolean)},!1),s!=null&&(a.isFunction(s)?n.paramsSerializer={serialize:s}:X.assertOptions(s,{encode:g.function,serialize:g.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let i=o&&a.merge(o.common,o[n.method]);o&&a.forEach(["delete","get","head","post","put","patch","common"],f=>{delete o[f]}),n.headers=A.concat(i,o);const c=[];let p=!0;this.interceptors.request.forEach(function(d){typeof d.runWhen=="function"&&d.runWhen(n)===!1||(p=p&&d.synchronous,c.unshift(d.fulfilled,d.rejected))});const h=[];this.interceptors.response.forEach(function(d){h.push(d.fulfilled,d.rejected)});let l,u=0,R;if(!p){const f=[de.bind(this),void 0];for(f.unshift.apply(f,c),f.push.apply(f,h),R=f.length,l=Promise.resolve(n);u<R;)l=l.then(f[u++],f[u++]);return l}R=c.length;let O=n;for(u=0;u<R;){const f=c[u++],d=c[u++];try{O=f(O)}catch(S){d.call(this,S);break}}try{l=de.call(this,O)}catch(f){return Promise.reject(f)}for(u=0,R=h.length;u<R;)l=l.then(h[u++],h[u++]);return l}getUri(t){t=L(this.defaults,t);const n=xe(t.baseURL,t.url);return ge(n,t.params,t.paramsSerializer)}}a.forEach(["delete","get","head","options"],function(t){M.prototype[t]=function(n,r){return this.request(L(r||{},{method:t,url:n,data:(r||{}).data}))}});a.forEach(["post","put","patch"],function(t){function n(r){return function(o,i,c){return this.request(L(c||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:o,data:i}))}}M.prototype[t]=n(),M.prototype[t+"Form"]=n(!0)});const U=M;class re{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const r=this;this.promise.then(s=>{if(!r._listeners)return;let o=r._listeners.length;for(;o-- >0;)r._listeners[o](s);r._listeners=null}),this.promise.then=s=>{let o;const i=new Promise(c=>{r.subscribe(c),o=c}).then(s);return i.cancel=function(){r.unsubscribe(o)},i},t(function(o,i,c){r.reason||(r.reason=new D(o,i,c),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}static source(){let t;return{token:new re(function(s){t=s}),cancel:t}}}const Xt=re;function Yt(e){return function(n){return e.apply(null,n)}}function Qt(e){return a.isObject(e)&&e.isAxiosError===!0}const Y={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Y).forEach(([e,t])=>{Y[t]=e});const Zt=Y;function Be(e){const t=new U(e),n=Ee(U.prototype.request,t);return a.extend(n,U.prototype,t,{allOwnKeys:!0}),a.extend(n,t,null,{allOwnKeys:!0}),n.create=function(s){return Be(L(e,s))},n}const m=Be(te);m.Axios=U;m.CanceledError=D;m.CancelToken=Xt;m.isCancel=Fe;m.VERSION=Ce;m.toFormData=j;m.AxiosError=E;m.Cancel=m.CanceledError;m.all=function(t){return Promise.all(t)};m.spread=Yt;m.isAxiosError=Qt;m.mergeConfig=L;m.AxiosHeaders=A;m.formToJSON=e=>Pe(a.isHTMLForm(e)?new FormData(e):e);m.getAdapter=De.getAdapter;m.HttpStatusCode=Zt;m.default=m;const en=m,tn=en.create(),sn=(e,t)=>n=>{const r={withCredentials:!0,timeout:45e3,headers:{"content-type":"multipart/form-data"}},s=new FormData;s.append("id",n.id),s.append("vedlegg",n.file,n.filename);const o=`${e}/storage/${t}/vedlegg`;return tn.post(o,s,r)};var nn=(e=>(e.ANNET="I000060",e.TERMINBEKREFTELSE="I000062",e.OMSORGSOVERTAKELSE="I000042",e.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM="I000051",e.BEKREFTELSE_FRA_ARBEIDSGIVER="I000065",e.BEKREFTELSE_FRA_STUDIESTED="I000061",e.BEKREFTELSE_PÅ_AVTALT_FERIE="I000036",e.DOK_AV_ALENEOMSORG="I000110",e.DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID="I000111",e.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET="I000112",e.DOK_INNLEGGELSE="I000037",e.DOK_MILITÆR_SILVIL_TJENESTE="I000039",e.DOK_MORS_UTDANNING_ARBEID_SYKDOM="I000038",e.DOK_OVERFØRING_FOR_SYK="I000023",e.ETTERLØNN_ELLER_SLUTTVEDERLAG="I000044",e.FØDSELSATTEST="I000063",e.INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG="I000007",e.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING="I000109",e.TILBAKEBETALING="I000114",e.HV_ØVELSE="I000116",e.NAV_TILTAK="I000117",e.RESULTATREGNSKAP="I000032",e.KOPI_SKATTEMELDING="I000066",e))(nn||{}),rn=(e=>(e.OMSORGSOVERTAKELSE="omsorgsovertakelse",e.ADOPSJONSVEDTAK="adopsjonsvedtak",e.TERMINBEKREFTELSE="terminbekreftelse",e.FØDSELSATTEST="fødselsattest",e.ANNEN_INNTEKT="anneninntektDokumentasjon",e.UTSETTELSE_SYKDOM="utsettelseSykdomUttaksplan",e.MORS_AKTIVITET_DOKUMENTASJON="morsaktivitetdokumentasjon",e.OVERFØRING_KVOTE="dokumentasjonOverføringAvKvote",e.ALENEOMSORG="dokumentasjonAvAleneomsorg",e.SEN_ENDRING="senEndring",e.HV_ØVELSE="hvØvelse",e.NAV_TILTAK="navTiltak",e.TILBAKEBETALING="tilbakebetaling",e.TILRETTELEGGING="tilrettelegging",e))(rn||{});const on=e=>!!e.adopsjonsdato,an=e=>!!e.termindato,cn=e=>e.erBarnetFødt===!0;export{rn as A,nn as S,tn as a,an as b,cn as c,en as d,on as e,sn as g};