var ve=Object.defineProperty;var Te=(r,e,t)=>e in r?ve(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var E=(r,e,t)=>Te(r,typeof e!="symbol"?e+"":e,t);import{i as we,d as F,s as be,a as xe,c as Re,R as _e,t as Ee,n as D,b as Se}from"./decorators-86JrGkCj.js";import{j as w}from"./jsx-runtime-Cw0GR0a5.js";import{u as Pe,a as Ce,b as K,C as B,c as ke,n as Ae}from"./useEsNavigator-DKfFqsld.js";import{c as De,g as Oe,r as je}from"./index-CTjT7uj6.js";import{e as Ue,u as Ne,R as Ie,E as qe,S as Le}from"./ErrorSummaryHookForm-BO3Tu2sE.js";import{u as W,a9 as Z,M as V,d as U,a as Me,p as $e,q as Be,S as He,V as Fe,aa as Ve}from"./dateFormValidation-BBoKdaqt.js";import{A as ee,S as te,e as ze,a as Je}from"./OmBarnet-BV6De4cI.js";class Y extends Error{constructor(t,n,o){const s=t.status||t.status===0?t.status:"",a=t.statusText||"",i=`${s} ${a}`.trim(),f=i?`status code ${i}`:"an unknown error";super(`Request failed with ${f}: ${n.method} ${n.url}`);E(this,"response");E(this,"request");E(this,"options");this.name="HTTPError",this.response=t,this.request=n,this.options=o}}class re extends Error{constructor(t){super(`Request timed out: ${t.method} ${t.url}`);E(this,"request");this.name="TimeoutError",this.request=t}}const I=r=>r!==null&&typeof r=="object",q=(...r)=>{for(const e of r)if((!I(e)||Array.isArray(e))&&e!==void 0)throw new TypeError("The `options` argument must be an object");return G({},...r)},ne=(r={},e={})=>{const t=new globalThis.Headers(r),n=e instanceof globalThis.Headers,o=new globalThis.Headers(e);for(const[s,a]of o.entries())n&&a==="undefined"||a===void 0?t.delete(s):t.set(s,a);return t};function L(r,e,t){return Object.hasOwn(e,t)&&e[t]===void 0?[]:G(r[t]??[],e[t]??[])}const oe=(r={},e={})=>({beforeRequest:L(r,e,"beforeRequest"),beforeRetry:L(r,e,"beforeRetry"),afterResponse:L(r,e,"afterResponse"),beforeError:L(r,e,"beforeError")}),G=(...r)=>{let e={},t={},n={};for(const o of r)if(Array.isArray(o))Array.isArray(e)||(e=[]),e=[...e,...o];else if(I(o)){for(let[s,a]of Object.entries(o))I(a)&&s in e&&(a=G(e[s],a)),e={...e,[s]:a};I(o.hooks)&&(n=oe(n,o.hooks),e.hooks=n),I(o.headers)&&(t=ne(t,o.headers),e.headers=t)}return e},We=(()=>{let r=!1,e=!1;const t=typeof globalThis.ReadableStream=="function",n=typeof globalThis.Request=="function";if(t&&n)try{e=new globalThis.Request("https://empty.invalid",{body:new globalThis.ReadableStream,method:"POST",get duplex(){return r=!0,"half"}}).headers.has("Content-Type")}catch(o){if(o instanceof Error&&o.message==="unsupported BodyInit type")return!1;throw o}return r&&!e})(),Ge=typeof globalThis.AbortController=="function",Ke=typeof globalThis.ReadableStream=="function",Ye=typeof globalThis.FormData=="function",se=["get","post","put","patch","head","delete"],Xe={json:"application/json",text:"text/*",formData:"multipart/form-data",arrayBuffer:"*/*",blob:"*/*"},H=2147483647,ae=Symbol("stop"),Qe={json:!0,parseJson:!0,stringifyJson:!0,searchParams:!0,prefixUrl:!0,retry:!0,timeout:!0,hooks:!0,throwHttpErrors:!0,onDownloadProgress:!0,fetch:!0},Ze={method:!0,headers:!0,body:!0,mode:!0,credentials:!0,cache:!0,redirect:!0,referrer:!0,referrerPolicy:!0,integrity:!0,keepalive:!0,signal:!0,window:!0,dispatcher:!0,duplex:!0,priority:!0},et=r=>se.includes(r)?r.toUpperCase():r,tt=["get","put","head","delete","options","trace"],rt=[408,413,429,500,502,503,504],nt=[413,429,503],X={limit:2,methods:tt,statusCodes:rt,afterStatusCodes:nt,maxRetryAfter:Number.POSITIVE_INFINITY,backoffLimit:Number.POSITIVE_INFINITY,delay:r=>.3*2**(r-1)*1e3},ot=(r={})=>{if(typeof r=="number")return{...X,limit:r};if(r.methods&&!Array.isArray(r.methods))throw new Error("retry.methods must be an array");if(r.statusCodes&&!Array.isArray(r.statusCodes))throw new Error("retry.statusCodes must be an array");return{...X,...r}};async function st(r,e,t,n){return new Promise((o,s)=>{const a=setTimeout(()=>{t&&t.abort(),s(new re(r))},n.timeout);n.fetch(r,e).then(o).catch(s).then(()=>{clearTimeout(a)})})}async function at(r,{signal:e}){return new Promise((t,n)=>{e&&(e.throwIfAborted(),e.addEventListener("abort",o,{once:!0}));function o(){clearTimeout(s),n(e.reason)}const s=setTimeout(()=>{e==null||e.removeEventListener("abort",o),t()},r)})}const it=(r,e)=>{const t={};for(const n in e)!(n in Ze)&&!(n in Qe)&&!(n in r)&&(t[n]=e[n]);return t};class M{constructor(e,t={}){E(this,"request");E(this,"abortController");E(this,"_retryCount",0);E(this,"_input");E(this,"_options");var n,o;if(this._input=e,this._options={...t,headers:ne(this._input.headers,t.headers),hooks:oe({beforeRequest:[],beforeRetry:[],beforeError:[],afterResponse:[]},t.hooks),method:et(t.method??this._input.method),prefixUrl:String(t.prefixUrl||""),retry:ot(t.retry),throwHttpErrors:t.throwHttpErrors!==!1,timeout:t.timeout??1e4,fetch:t.fetch??globalThis.fetch.bind(globalThis)},typeof this._input!="string"&&!(this._input instanceof URL||this._input instanceof globalThis.Request))throw new TypeError("`input` must be a string, URL, or Request");if(this._options.prefixUrl&&typeof this._input=="string"){if(this._input.startsWith("/"))throw new Error("`input` must not begin with a slash when using `prefixUrl`");this._options.prefixUrl.endsWith("/")||(this._options.prefixUrl+="/"),this._input=this._options.prefixUrl+this._input}if(Ge){this.abortController=new globalThis.AbortController;const s=this._options.signal??this._input.signal;s==null||s.addEventListener("abort",()=>{this.abortController.abort(s.reason)}),this._options.signal=this.abortController.signal}if(We&&(this._options.duplex="half"),this._options.json!==void 0&&(this._options.body=((o=(n=this._options).stringifyJson)==null?void 0:o.call(n,this._options.json))??JSON.stringify(this._options.json),this._options.headers.set("content-type",this._options.headers.get("content-type")??"application/json")),this.request=new globalThis.Request(this._input,this._options),this._options.searchParams){const a="?"+(typeof this._options.searchParams=="string"?this._options.searchParams.replace(/^\?/,""):new URLSearchParams(this._options.searchParams).toString()),i=this.request.url.replace(/(?:\?.*?)?(?=#|$)/,a);(Ye&&this._options.body instanceof globalThis.FormData||this._options.body instanceof URLSearchParams)&&!(this._options.headers&&this._options.headers["content-type"])&&this.request.headers.delete("content-type"),this.request=new globalThis.Request(new globalThis.Request(i,{...this.request}),this._options)}}static create(e,t){const n=new M(e,t),o=async()=>{if(typeof n._options.timeout=="number"&&n._options.timeout>H)throw new RangeError(`The \`timeout\` option cannot be greater than ${H}`);await Promise.resolve();let i=await n._fetch();for(const f of n._options.hooks.afterResponse){const c=await f(n.request,n._options,n._decorateResponse(i.clone()));c instanceof globalThis.Response&&(i=c)}if(n._decorateResponse(i),!i.ok&&n._options.throwHttpErrors){let f=new Y(i,n.request,n._options);for(const c of n._options.hooks.beforeError)f=await c(f);throw f}if(n._options.onDownloadProgress){if(typeof n._options.onDownloadProgress!="function")throw new TypeError("The `onDownloadProgress` option must be a function");if(!Ke)throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");return n._stream(i.clone(),n._options.onDownloadProgress)}return i},a=n._options.retry.methods.includes(n.request.method.toLowerCase())?n._retry(o):o();for(const[i,f]of Object.entries(Xe))a[i]=async()=>{n.request.headers.set("accept",n.request.headers.get("accept")||f);const d=(await a).clone();if(i==="json"){if(d.status===204||(await d.clone().arrayBuffer()).byteLength===0)return"";if(t.parseJson)return t.parseJson(await d.text())}return d[i]()};return a}_calculateRetryDelay(e){if(this._retryCount++,this._retryCount>this._options.retry.limit||e instanceof re)throw e;if(e instanceof Y){if(!this._options.retry.statusCodes.includes(e.response.status))throw e;const n=e.response.headers.get("Retry-After")??e.response.headers.get("RateLimit-Reset")??e.response.headers.get("X-RateLimit-Reset")??e.response.headers.get("X-Rate-Limit-Reset");if(n&&this._options.retry.afterStatusCodes.includes(e.response.status)){let o=Number(n)*1e3;Number.isNaN(o)?o=Date.parse(n)-Date.now():o>=Date.parse("2024-01-01")&&(o-=Date.now());const s=this._options.retry.maxRetryAfter??o;return o<s?o:s}if(e.response.status===413)throw e}const t=this._options.retry.delay(this._retryCount);return Math.min(this._options.retry.backoffLimit,t)}_decorateResponse(e){return this._options.parseJson&&(e.json=async()=>this._options.parseJson(await e.text())),e}async _retry(e){try{return await e()}catch(t){const n=Math.min(this._calculateRetryDelay(t),H);if(this._retryCount<1)throw t;await at(n,{signal:this._options.signal});for(const o of this._options.hooks.beforeRetry)if(await o({request:this.request,options:this._options,error:t,retryCount:this._retryCount})===ae)return;return this._retry(e)}}async _fetch(){for(const n of this._options.hooks.beforeRequest){const o=await n(this.request,this._options);if(o instanceof Request){this.request=o;break}if(o instanceof Response)return o}const e=it(this.request,this._options),t=this.request;return this.request=t.clone(),this._options.timeout===!1?this._options.fetch(t,e):st(t,e,this.abortController,this._options)}_stream(e,t){const n=Number(e.headers.get("content-length"))||0;let o=0;return e.status===204?(t&&t({percent:1,totalBytes:n,transferredBytes:o},new Uint8Array),new globalThis.Response(null,{status:e.status,statusText:e.statusText,headers:e.headers})):new globalThis.Response(new globalThis.ReadableStream({async start(s){const a=e.body.getReader();t&&t({percent:0,transferredBytes:0,totalBytes:n},new Uint8Array);async function i(){const{done:f,value:c}=await a.read();if(f){s.close();return}if(t){o+=c.byteLength;const d=n===0?0:o/n;t({percent:d,transferredBytes:o,totalBytes:n},c)}s.enqueue(c),await i()}await i()}}),{status:e.status,statusText:e.statusText,headers:e.headers})}}/*! MIT License © Sindre Sorhus */const z=r=>{const e=(t,n)=>M.create(t,q(r,n));for(const t of se)e[t]=(n,o)=>M.create(n,q(r,o,{method:t}));return e.create=t=>z(q(t)),e.extend=t=>(typeof t=="function"&&(t=t(r??{})),z(q(r,t))),e.stop=ae,e},ct=z(),ut=()=>{const r=document.getElementById("nav:appSettings");if(!r)return{};const e=JSON.parse(r.text);return{APP_VERSION:e.APP_VERSION,INNSYN:e.INNSYN,PUBLIC_PATH:e.PUBLIC_PATH}},ie=ut();function ft(){we(typeof URL<"u",F.formatMessage(`Global "URL" class is not defined. This likely means that you're running MSW in an environment that doesn't support all Node.js standard API (e.g. React Native). If that's the case, please use an appropriate polyfill for the "URL" class, like "react-native-url-polyfill".`))}function lt(r,e){return r.toLowerCase()===e.toLowerCase()}function dt(r){return r<300?"#69AB32":r<400?"#F0BB4B":"#E95F5D"}function ht(){const r=new Date;return[r.getHours(),r.getMinutes(),r.getSeconds()].map(String).map(e=>e.slice(0,2)).map(e=>e.padStart(2,"0")).join(":")}async function pt(r){const t=await r.clone().text();return{url:new URL(r.url),method:r.method,headers:Object.fromEntries(r.headers.entries()),body:t}}const{message:mt}=be;async function gt(r){const e=r.clone(),t=await e.text(),n=e.status||200,o=e.statusText||mt[n]||"OK";return{status:n,statusText:o,headers:Object.fromEntries(e.headers.entries()),body:t}}function yt(r){for(var e=[],t=0;t<r.length;){var n=r[t];if(n==="*"||n==="+"||n==="?"){e.push({type:"MODIFIER",index:t,value:r[t++]});continue}if(n==="\\"){e.push({type:"ESCAPED_CHAR",index:t++,value:r[t++]});continue}if(n==="{"){e.push({type:"OPEN",index:t,value:r[t++]});continue}if(n==="}"){e.push({type:"CLOSE",index:t,value:r[t++]});continue}if(n===":"){for(var o="",s=t+1;s<r.length;){var a=r.charCodeAt(s);if(a>=48&&a<=57||a>=65&&a<=90||a>=97&&a<=122||a===95){o+=r[s++];continue}break}if(!o)throw new TypeError("Missing parameter name at ".concat(t));e.push({type:"NAME",index:t,value:o}),t=s;continue}if(n==="("){var i=1,f="",s=t+1;if(r[s]==="?")throw new TypeError('Pattern cannot start with "?" at '.concat(s));for(;s<r.length;){if(r[s]==="\\"){f+=r[s++]+r[s++];continue}if(r[s]===")"){if(i--,i===0){s++;break}}else if(r[s]==="("&&(i++,r[s+1]!=="?"))throw new TypeError("Capturing groups are not allowed at ".concat(s));f+=r[s++]}if(i)throw new TypeError("Unbalanced pattern at ".concat(t));if(!f)throw new TypeError("Missing pattern at ".concat(t));e.push({type:"PATTERN",index:t,value:f}),t=s;continue}e.push({type:"CHAR",index:t,value:r[t++]})}return e.push({type:"END",index:t,value:""}),e}function vt(r,e){e===void 0&&(e={});for(var t=yt(r),n=e.prefixes,o=n===void 0?"./":n,s=e.delimiter,a=s===void 0?"/#?":s,i=[],f=0,c=0,d="",l=function(R){if(c<t.length&&t[c].type===R)return t[c++].value},u=function(R){var T=l(R);if(T!==void 0)return T;var _=t[c],$=_.type,ye=_.index;throw new TypeError("Unexpected ".concat($," at ").concat(ye,", expected ").concat(R))},p=function(){for(var R="",T;T=l("CHAR")||l("ESCAPED_CHAR");)R+=T;return R},g=function(R){for(var T=0,_=a;T<_.length;T++){var $=_[T];if(R.indexOf($)>-1)return!0}return!1},h=function(R){var T=i[i.length-1],_=R||(T&&typeof T=="string"?T:"");if(T&&!_)throw new TypeError('Must have text between two parameters, missing text after "'.concat(T.name,'"'));return!_||g(_)?"[^".concat(k(a),"]+?"):"(?:(?!".concat(k(_),")[^").concat(k(a),"])+?")};c<t.length;){var v=l("CHAR"),y=l("NAME"),b=l("PATTERN");if(y||b){var x=v||"";o.indexOf(x)===-1&&(d+=x,x=""),d&&(i.push(d),d=""),i.push({name:y||f++,prefix:x,suffix:"",pattern:b||h(x),modifier:l("MODIFIER")||""});continue}var m=v||l("ESCAPED_CHAR");if(m){d+=m;continue}d&&(i.push(d),d="");var A=l("OPEN");if(A){var x=p(),S=l("NAME")||"",N=l("PATTERN")||"",j=p();u("CLOSE"),i.push({name:S||(N?f++:""),pattern:S&&!N?h(x):N,prefix:x,suffix:j,modifier:l("MODIFIER")||""});continue}u("END")}return i}function Tt(r,e){var t=[],n=ue(r,t,e);return wt(n,t,e)}function wt(r,e,t){t===void 0&&(t={});var n=t.decode,o=n===void 0?function(s){return s}:n;return function(s){var a=r.exec(s);if(!a)return!1;for(var i=a[0],f=a.index,c=Object.create(null),d=function(u){if(a[u]===void 0)return"continue";var p=e[u-1];p.modifier==="*"||p.modifier==="+"?c[p.name]=a[u].split(p.prefix+p.suffix).map(function(g){return o(g,p)}):c[p.name]=o(a[u],p)},l=1;l<a.length;l++)d(l);return{path:i,index:f,params:c}}}function k(r){return r.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function ce(r){return r&&r.sensitive?"":"i"}function bt(r,e){if(!e)return r;for(var t=/\((?:\?<(.*?)>)?(?!\?)/g,n=0,o=t.exec(r.source);o;)e.push({name:o[1]||n++,prefix:"",suffix:"",modifier:"",pattern:""}),o=t.exec(r.source);return r}function xt(r,e,t){var n=r.map(function(o){return ue(o,e,t).source});return new RegExp("(?:".concat(n.join("|"),")"),ce(t))}function Rt(r,e,t){return _t(vt(r,t),e,t)}function _t(r,e,t){t===void 0&&(t={});for(var n=t.strict,o=n===void 0?!1:n,s=t.start,a=s===void 0?!0:s,i=t.end,f=i===void 0?!0:i,c=t.encode,d=c===void 0?function(T){return T}:c,l=t.delimiter,u=l===void 0?"/#?":l,p=t.endsWith,g=p===void 0?"":p,h="[".concat(k(g),"]|$"),v="[".concat(k(u),"]"),y=a?"^":"",b=0,x=r;b<x.length;b++){var m=x[b];if(typeof m=="string")y+=k(d(m));else{var A=k(d(m.prefix)),S=k(d(m.suffix));if(m.pattern)if(e&&e.push(m),A||S)if(m.modifier==="+"||m.modifier==="*"){var N=m.modifier==="*"?"?":"";y+="(?:".concat(A,"((?:").concat(m.pattern,")(?:").concat(S).concat(A,"(?:").concat(m.pattern,"))*)").concat(S,")").concat(N)}else y+="(?:".concat(A,"(").concat(m.pattern,")").concat(S,")").concat(m.modifier);else{if(m.modifier==="+"||m.modifier==="*")throw new TypeError('Can not repeat "'.concat(m.name,'" without a prefix and suffix'));y+="(".concat(m.pattern,")").concat(m.modifier)}else y+="(?:".concat(A).concat(S,")").concat(m.modifier)}}if(f)o||(y+="".concat(v,"?")),y+=t.endsWith?"(?=".concat(h,")"):"$";else{var j=r[r.length-1],R=typeof j=="string"?v.indexOf(j[j.length-1])>-1:j===void 0;o||(y+="(?:".concat(v,"(?=").concat(h,"))?")),R||(y+="(?=".concat(v,"|").concat(h,")"))}return new RegExp(y,ce(t))}function ue(r,e,t){return r instanceof RegExp?bt(r,e):Array.isArray(r)?xt(r,e,t):Rt(r,e,t)}new TextEncoder;var Et=Object.defineProperty,St=(r,e)=>{for(var t in e)Et(r,t,{get:e[t],enumerable:!0})},Pt={};St(Pt,{blue:()=>kt,gray:()=>At,green:()=>Ot,red:()=>Dt,yellow:()=>Ct});function Ct(r){return`\x1B[33m${r}\x1B[0m`}function kt(r){return`\x1B[34m${r}\x1B[0m`}function At(r){return`\x1B[90m${r}\x1B[0m`}function Dt(r){return`\x1B[31m${r}\x1B[0m`}function Ot(r){return`\x1B[32m${r}\x1B[0m`}xe();function jt(r,e=!0){return[e&&r.origin,r.pathname].filter(Boolean).join("")}const Ut=/[\?|#].*$/g;function Nt(r){return new URL(`/${r}`,"http://localhost").searchParams}function fe(r){return r.endsWith("?")?r:r.replace(Ut,"")}function It(r){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(r)}function qt(r,e){if(It(r)||r.startsWith("*"))return r;const t=e||typeof document<"u"&&document.baseURI;return t?decodeURI(new URL(encodeURI(r),t).href):r}function Lt(r,e){if(r instanceof RegExp)return r;const t=qt(r,e);return fe(t)}function Mt(r){return r.replace(/([:a-zA-Z_-]*)(\*{1,2})+/g,(e,t,n)=>{const o="(.*)";return t?t.startsWith(":")?`${t}${n}`:`${t}${o}`:o}).replace(/([^\/])(:)(?=\d+)/,"$1\\$2").replace(/^([^\/]+)(:)(?=\/\/)/,"$1\\$2")}function $t(r,e,t){const n=Lt(e,t),o=typeof n=="string"?Mt(n):n,s=jt(r),a=Tt(o,{decode:decodeURIComponent})(s),i=a&&a.params||{};return{matches:a!==!1,params:i}}var Bt=Object.create,le=Object.defineProperty,Ht=Object.getOwnPropertyDescriptor,de=Object.getOwnPropertyNames,Ft=Object.getPrototypeOf,Vt=Object.prototype.hasOwnProperty,zt=(r,e)=>function(){return e||(0,r[de(r)[0]])((e={exports:{}}).exports,e),e.exports},Jt=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of de(e))!Vt.call(r,o)&&o!==t&&le(r,o,{get:()=>e[o],enumerable:!(n=Ht(e,o))||n.enumerable});return r},Wt=(r,e,t)=>(t=r!=null?Bt(Ft(r)):{},Jt(le(t,"default",{value:r,enumerable:!0}),r)),Gt=zt({"node_modules/cookie/index.js"(r){r.parse=n,r.serialize=o;var e=Object.prototype.toString,t=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function n(c,d){if(typeof c!="string")throw new TypeError("argument str must be a string");for(var l={},u=d||{},p=u.decode||s,g=0;g<c.length;){var h=c.indexOf("=",g);if(h===-1)break;var v=c.indexOf(";",g);if(v===-1)v=c.length;else if(v<h){g=c.lastIndexOf(";",h-1)+1;continue}var y=c.slice(g,h).trim();if(l[y]===void 0){var b=c.slice(h+1,v).trim();b.charCodeAt(0)===34&&(b=b.slice(1,-1)),l[y]=f(b,p)}g=v+1}return l}function o(c,d,l){var u=l||{},p=u.encode||a;if(typeof p!="function")throw new TypeError("option encode is invalid");if(!t.test(c))throw new TypeError("argument name is invalid");var g=p(d);if(g&&!t.test(g))throw new TypeError("argument val is invalid");var h=c+"="+g;if(u.maxAge!=null){var v=u.maxAge-0;if(isNaN(v)||!isFinite(v))throw new TypeError("option maxAge is invalid");h+="; Max-Age="+Math.floor(v)}if(u.domain){if(!t.test(u.domain))throw new TypeError("option domain is invalid");h+="; Domain="+u.domain}if(u.path){if(!t.test(u.path))throw new TypeError("option path is invalid");h+="; Path="+u.path}if(u.expires){var y=u.expires;if(!i(y)||isNaN(y.valueOf()))throw new TypeError("option expires is invalid");h+="; Expires="+y.toUTCString()}if(u.httpOnly&&(h+="; HttpOnly"),u.secure&&(h+="; Secure"),u.priority){var b=typeof u.priority=="string"?u.priority.toLowerCase():u.priority;switch(b){case"low":h+="; Priority=Low";break;case"medium":h+="; Priority=Medium";break;case"high":h+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(u.sameSite){var x=typeof u.sameSite=="string"?u.sameSite.toLowerCase():u.sameSite;switch(x){case!0:h+="; SameSite=Strict";break;case"lax":h+="; SameSite=Lax";break;case"strict":h+="; SameSite=Strict";break;case"none":h+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return h}function s(c){return c.indexOf("%")!==-1?decodeURIComponent(c):c}function a(c){return encodeURIComponent(c)}function i(c){return e.call(c)==="[object Date]"||c instanceof Date}function f(c,d){try{return d(c)}catch{return c}}}}),Kt=Wt(Gt()),J=Kt.default;/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/function Q(){return J.parse(document.cookie)}function Yt(r){if(typeof document>"u"||typeof location>"u")return{};switch(r.credentials){case"same-origin":{const e=new URL(r.url);return location.origin===e.origin?Q():{}}case"include":return Q();default:return{}}}function Xt(r){const e=r.headers.get("cookie"),t=e?J.parse(e):{},n=Yt(r);for(const a in n)r.headers.append("cookie",J.serialize(a,n[a]));const o=Re.getCookiesSync(r.url),s=Object.fromEntries(o.map(a=>[a.key,a.value]));for(const a of o)r.headers.append("cookie",a.toString());return{...n,...s,...t}}var C=(r=>(r.HEAD="HEAD",r.GET="GET",r.POST="POST",r.PUT="PUT",r.PATCH="PATCH",r.OPTIONS="OPTIONS",r.DELETE="DELETE",r))(C||{});class Qt extends _e{constructor(e,t,n,o){super({info:{header:`${e} ${t}`,path:t,method:e},resolver:n,options:o}),this.checkRedundantQueryParameters()}checkRedundantQueryParameters(){const{method:e,path:t}=this.info;if(t instanceof RegExp||fe(t)===t)return;Nt(t).forEach((s,a)=>{}),F.warn(`Found a redundant usage of query parameters in the request handler URL for "${e} ${t}". Please match against a path instead and access query parameters using "new URL(request.url).searchParams" instead. Learn more: https://mswjs.io/docs/recipes/query-parameters`)}async parse(e){var s;const t=new URL(e.request.url),n=$t(t,this.info.path,(s=e.resolutionContext)==null?void 0:s.baseUrl),o=Xt(e.request);return{match:n,cookies:o}}predicate(e){const t=this.matchMethod(e.request.method),n=e.parsedResult.match.matches;return t&&n}matchMethod(e){return this.info.method instanceof RegExp?this.info.method.test(e):lt(this.info.method,e)}extendResolverArgs(e){var t;return{params:((t=e.parsedResult.match)==null?void 0:t.params)||{},cookies:e.parsedResult.cookies}}async log(e){const t=Ee(e.request.url),n=await pt(e.request),o=await gt(e.response),s=dt(o.status);console.groupCollapsed(F.formatMessage(`${ht()} ${e.request.method} ${t} (%c${o.status} ${o.statusText}%c)`),`color:${s}`,"color:inherit"),console.log("Request",n),console.log("Handler:",this),console.log("Response",o),console.groupEnd()}}function P(r){return(e,t,n={})=>new Qt(r,e,t,n)}const pr={all:P(/.+/),head:P(C.HEAD),get:P(C.GET),post:P(C.POST),put:P(C.PUT),delete:P(C.DELETE),patch:P(C.PATCH),options:P(C.OPTIONS)};class O extends Response{constructor(e,t){const n=D(t);super(e,n),Se(this,n)}static text(e,t){const n=D(t);return n.headers.has("Content-Type")||n.headers.set("Content-Type","text/plain"),n.headers.has("Content-Length")||n.headers.set("Content-Length",e?new Blob([e]).size.toString():"0"),new O(e,n)}static json(e,t){const n=D(t);n.headers.has("Content-Type")||n.headers.set("Content-Type","application/json");const o=JSON.stringify(e);return n.headers.has("Content-Length")||n.headers.set("Content-Length",o?new Blob([o]).size.toString():"0"),new O(o,n)}static xml(e,t){const n=D(t);return n.headers.has("Content-Type")||n.headers.set("Content-Type","text/xml"),new O(e,n)}static html(e,t){const n=D(t);return n.headers.has("Content-Type")||n.headers.set("Content-Type","text/html"),new O(e,n)}static arrayBuffer(e,t){const n=D(t);return e&&!n.headers.has("Content-Length")&&n.headers.set("Content-Length",e.byteLength.toString()),new O(e,n)}static formData(e,t){return new O(e,D(t))}}ft();const he=(r,e)=>async t=>{const n=new FormData;n.append("id",t.id),n.append("vedlegg",t.file,t.filename);const o=await ct.post(`${r}/rest/storage/${e}/vedlegg`,{body:n});return{headers:{location:o.headers.get("Location")},data:await o.text()}},pe=({attachments:r,updateAttachments:e})=>{const t=W();return w.jsx(Z,{label:t.formatMessage({id:"AdopsjonDokPanel.Vedlegg.Adopsjon"}),description:w.jsx(V,{id:"AdopsjonDokPanel.Veilederpanel.Text"}),attachmentType:ee.OMSORGSOVERTAKELSE,skjemanummer:te.OMSORGSOVERTAKELSE,existingAttachments:r,updateAttachments:e,saveAttachment:he(ie.PUBLIC_PATH,"engangsstonad")})};pe.__docgenInfo={description:"",methods:[],displayName:"AdopsjonDokPanel"};var me={exports:{}};(function(r,e){(function(t,n){r.exports=n()})(De,function(){return function(t,n,o){var s=function(a,i){if(!i||!i.length||i.length===1&&!i[0]||i.length===1&&Array.isArray(i[0])&&!i[0].length)return null;var f;i.length===1&&i[0].length>0&&(i=i[0]),f=(i=i.filter(function(d){return d}))[0];for(var c=1;c<i.length;c+=1)i[c].isValid()&&!i[c][a](f)||(f=i[c]);return f};o.max=function(){var a=[].slice.call(arguments,0);return s("isAfter",a)},o.min=function(){var a=[].slice.call(arguments,0);return s("isBefore",a)}}})})(me);var Zt=me.exports;const er=Oe(Zt);U.extend(er);const tr=18,rr=3,nr=tr*7+rr,or=(r,e)=>t=>{const n=U(t).startOf("day"),s=U(r).startOf("day").subtract(nr,"days");return U.max(s,n).isSame(n)?null:e.formatMessage({id:"TerminDokPanel.Validering.TerminBekreftelsedato.DuMåVæreIUke22"})},ge=({attachments:r,updateAttachments:e,omBarnet:t})=>{const n=W();return w.jsxs(w.Fragment,{children:[w.jsx(Ue,{name:"terminbekreftelsedato",label:w.jsx(V,{id:"TerminDokPanel.Terminbekreftelsesdato"}),minDate:U(t.termindato).subtract(18,"week").subtract(3,"day").toDate(),maxDate:U().toDate(),validate:[Me(n.formatMessage({id:"TerminDokPanel.Validering.TerminbekreftelseDato.DuMåOppgi"})),$e(n.formatMessage({id:"TerminDokPanel.Validering.TerminBekreftelsedato"})),Be(n.formatMessage({id:"TerminDokPanel.Validering.TerminBekreftelsedato.MåVæreIdagEllerTidligere"})),or(t.termindato,n)]}),w.jsx(Z,{label:n.formatMessage({id:"TerminDokPanel.Vedlegg.Terminbekreftelse"}),description:w.jsx(V,{id:"TerminDokPanel.Vedlegg.Terminbekreftelse.Info"}),attachmentType:ee.TERMINBEKREFTELSE,skjemanummer:te.TERMINBEKREFTELSE,existingAttachments:r,updateAttachments:e,saveAttachment:he(ie.PUBLIC_PATH,"engangsstonad")})]})};ge.__docgenInfo={description:"",methods:[],displayName:"TerminDokPanel"};const sr=({mellomlagreOgNaviger:r})=>{const e=W(),t=Pe(),n=Ce(r),[o,s]=je.useState(!1),a=K(B.DOKUMENTASJON),i=ke(B.DOKUMENTASJON),f=Ae(K(B.OM_BARNET)),c=ze(f),d=Je(f),l=Ne({defaultValues:a}),u=g=>g.vedlegg.length===0?(l.setError("vedlegg",{message:c?e.formatMessage({id:"DokumentasjonSteg.MinstEttDokumentAdopsjon"}):e.formatMessage({id:"DokumentasjonSteg.MinstEttDokumentTermin"})}),Promise.resolve()):(i(g),n.goToNextDefaultStep()),p=(g,h)=>{s(h),l.setValue("vedlegg",g,{shouldDirty:!0,shouldTouch:!0}),l.clearErrors("vedlegg")};return w.jsx(He,{bannerTitle:e.formatMessage({id:"Søknad.Pageheading"}),onCancel:n.avbrytSøknad,onContinueLater:n.fortsettSøknadSenere,onStepChange:n.goToNextStep,steps:t,noFieldsRequired:!0,children:w.jsx(Ie,{formMethods:l,onSubmit:u,children:w.jsxs(Fe,{gap:"10",children:[w.jsx(qe,{}),c&&w.jsx(pe,{attachments:a==null?void 0:a.vedlegg,updateAttachments:p}),d&&w.jsx(ge,{attachments:a==null?void 0:a.vedlegg,updateAttachments:p,omBarnet:f}),w.jsx(Ve,{}),w.jsx(Le,{goToPreviousStep:n.goToPreviousDefaultStep,saveDataOnPreviousClick:i,isDisabledAndLoading:o})]})})})};sr.__docgenInfo={description:"",methods:[],displayName:"DokumentasjonSteg"};export{sr as D,ie as E,O as H,Y as a,pr as h,ct as k};
