var ve=Object.defineProperty;var Te=(r,e,t)=>e in r?ve(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var E=(r,e,t)=>Te(r,typeof e!="symbol"?e+"":e,t);import{i as be,d as z,s as ke,c as we,R as xe,t as Re,g as Ae,n as D,a as qe}from"./decorators-DIzpaN6C.js";import{j as w}from"./jsx-runtime-DwRxq3ZX.js";import{u as Ee,a as _e,b as G,C as $,c as Se,n as Ce}from"./useEsNavigator-8jnwrcOk.js";import{c as Pe,g as je,r as De}from"./index-BX3iQpgp.js";import{e as Oe,u as Me,R as Ue,E as Ie,S as Le}from"./ErrorSummaryHookForm-DSvQt0ZC.js";import{u as J,a0 as Y,M as H,d as M,i as Ne,n as Fe,p as $e,S as Be,V as ze,a1 as He}from"./dateFormValidation-Bl3Cxj6E.js";import{A as Z,S as ee,e as Ve,a as Je}from"./OmBarnet-BV6De4cI.js";class K extends Error{constructor(t,n,a){const s=t.status||t.status===0?t.status:"",o=t.statusText||"",i=`${s} ${o}`.trim(),l=i?`status code ${i}`:"an unknown error";super(`Request failed with ${l}: ${n.method} ${n.url}`);E(this,"response");E(this,"request");E(this,"options");this.name="HTTPError",this.response=t,this.request=n,this.options=a}}class te extends Error{constructor(t){super(`Request timed out: ${t.method} ${t.url}`);E(this,"request");this.name="TimeoutError",this.request=t}}const U=r=>r!==null&&typeof r=="object",I=(...r)=>{for(const e of r)if((!U(e)||Array.isArray(e))&&e!==void 0)throw new TypeError("The `options` argument must be an object");return W({},...r)},re=(r={},e={})=>{const t=new globalThis.Headers(r),n=e instanceof globalThis.Headers,a=new globalThis.Headers(e);for(const[s,o]of a.entries())n&&o==="undefined"||o===void 0?t.delete(s):t.set(s,o);return t};function L(r,e,t){return Object.hasOwn(e,t)&&e[t]===void 0?[]:W(r[t]??[],e[t]??[])}const ne=(r={},e={})=>({beforeRequest:L(r,e,"beforeRequest"),beforeRetry:L(r,e,"beforeRetry"),afterResponse:L(r,e,"afterResponse"),beforeError:L(r,e,"beforeError")}),W=(...r)=>{let e={},t={},n={};for(const a of r)if(Array.isArray(a))Array.isArray(e)||(e=[]),e=[...e,...a];else if(U(a)){for(let[s,o]of Object.entries(a))U(o)&&s in e&&(o=W(e[s],o)),e={...e,[s]:o};U(a.hooks)&&(n=ne(n,a.hooks),e.hooks=n),U(a.headers)&&(t=re(t,a.headers),e.headers=t)}return e},We=(()=>{let r=!1,e=!1;const t=typeof globalThis.ReadableStream=="function",n=typeof globalThis.Request=="function";if(t&&n)try{e=new globalThis.Request("https://empty.invalid",{body:new globalThis.ReadableStream,method:"POST",get duplex(){return r=!0,"half"}}).headers.has("Content-Type")}catch(a){if(a instanceof Error&&a.message==="unsupported BodyInit type")return!1;throw a}return r&&!e})(),Ge=typeof globalThis.AbortController=="function",Ke=typeof globalThis.ReadableStream=="function",Xe=typeof globalThis.FormData=="function",ae=["get","post","put","patch","head","delete"],Qe={json:"application/json",text:"text/*",formData:"multipart/form-data",arrayBuffer:"*/*",blob:"*/*"},B=2147483647,se=Symbol("stop"),Ye={json:!0,parseJson:!0,stringifyJson:!0,searchParams:!0,prefixUrl:!0,retry:!0,timeout:!0,hooks:!0,throwHttpErrors:!0,onDownloadProgress:!0,fetch:!0},Ze={method:!0,headers:!0,body:!0,mode:!0,credentials:!0,cache:!0,redirect:!0,referrer:!0,referrerPolicy:!0,integrity:!0,keepalive:!0,signal:!0,window:!0,dispatcher:!0,duplex:!0,priority:!0},et=r=>ae.includes(r)?r.toUpperCase():r,tt=["get","put","head","delete","options","trace"],rt=[408,413,429,500,502,503,504],nt=[413,429,503],X={limit:2,methods:tt,statusCodes:rt,afterStatusCodes:nt,maxRetryAfter:Number.POSITIVE_INFINITY,backoffLimit:Number.POSITIVE_INFINITY,delay:r=>.3*2**(r-1)*1e3},at=(r={})=>{if(typeof r=="number")return{...X,limit:r};if(r.methods&&!Array.isArray(r.methods))throw new Error("retry.methods must be an array");if(r.statusCodes&&!Array.isArray(r.statusCodes))throw new Error("retry.statusCodes must be an array");return{...X,...r}};async function st(r,e,t,n){return new Promise((a,s)=>{const o=setTimeout(()=>{t&&t.abort(),s(new te(r))},n.timeout);n.fetch(r,e).then(a).catch(s).then(()=>{clearTimeout(o)})})}async function ot(r,{signal:e}){return new Promise((t,n)=>{e&&(e.throwIfAborted(),e.addEventListener("abort",a,{once:!0}));function a(){clearTimeout(s),n(e.reason)}const s=setTimeout(()=>{e==null||e.removeEventListener("abort",a),t()},r)})}const it=(r,e)=>{const t={};for(const n in e)!(n in Ze)&&!(n in Ye)&&!(n in r)&&(t[n]=e[n]);return t};class N{constructor(e,t={}){E(this,"request");E(this,"abortController");E(this,"_retryCount",0);E(this,"_input");E(this,"_options");var n,a;if(this._input=e,this._options={...t,headers:re(this._input.headers,t.headers),hooks:ne({beforeRequest:[],beforeRetry:[],beforeError:[],afterResponse:[]},t.hooks),method:et(t.method??this._input.method),prefixUrl:String(t.prefixUrl||""),retry:at(t.retry),throwHttpErrors:t.throwHttpErrors!==!1,timeout:t.timeout??1e4,fetch:t.fetch??globalThis.fetch.bind(globalThis)},typeof this._input!="string"&&!(this._input instanceof URL||this._input instanceof globalThis.Request))throw new TypeError("`input` must be a string, URL, or Request");if(this._options.prefixUrl&&typeof this._input=="string"){if(this._input.startsWith("/"))throw new Error("`input` must not begin with a slash when using `prefixUrl`");this._options.prefixUrl.endsWith("/")||(this._options.prefixUrl+="/"),this._input=this._options.prefixUrl+this._input}if(Ge){this.abortController=new globalThis.AbortController;const s=this._options.signal??this._input.signal;s!=null&&s.aborted&&this.abortController.abort(s==null?void 0:s.reason),s==null||s.addEventListener("abort",()=>{this.abortController.abort(s.reason)}),this._options.signal=this.abortController.signal}if(We&&(this._options.duplex="half"),this._options.json!==void 0&&(this._options.body=((a=(n=this._options).stringifyJson)==null?void 0:a.call(n,this._options.json))??JSON.stringify(this._options.json),this._options.headers.set("content-type",this._options.headers.get("content-type")??"application/json")),this.request=new globalThis.Request(this._input,this._options),this._options.searchParams){const o="?"+(typeof this._options.searchParams=="string"?this._options.searchParams.replace(/^\?/,""):new URLSearchParams(this._options.searchParams).toString()),i=this.request.url.replace(/(?:\?.*?)?(?=#|$)/,o);(Xe&&this._options.body instanceof globalThis.FormData||this._options.body instanceof URLSearchParams)&&!(this._options.headers&&this._options.headers["content-type"])&&this.request.headers.delete("content-type"),this.request=new globalThis.Request(new globalThis.Request(i,{...this.request}),this._options)}}static create(e,t){const n=new N(e,t),a=async()=>{if(typeof n._options.timeout=="number"&&n._options.timeout>B)throw new RangeError(`The \`timeout\` option cannot be greater than ${B}`);await Promise.resolve();let i=await n._fetch();for(const l of n._options.hooks.afterResponse){const d=await l(n.request,n._options,n._decorateResponse(i.clone()));d instanceof globalThis.Response&&(i=d)}if(n._decorateResponse(i),!i.ok&&n._options.throwHttpErrors){let l=new K(i,n.request,n._options);for(const d of n._options.hooks.beforeError)l=await d(l);throw l}if(n._options.onDownloadProgress){if(typeof n._options.onDownloadProgress!="function")throw new TypeError("The `onDownloadProgress` option must be a function");if(!Ke)throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");return n._stream(i.clone(),n._options.onDownloadProgress)}return i},o=n._options.retry.methods.includes(n.request.method.toLowerCase())?n._retry(a):a();for(const[i,l]of Object.entries(Qe))o[i]=async()=>{n.request.headers.set("accept",n.request.headers.get("accept")||l);const d=await o;if(i==="json"){if(d.status===204||(await d.clone().arrayBuffer()).byteLength===0)return"";if(t.parseJson)return t.parseJson(await d.text())}return d[i]()};return o}_calculateRetryDelay(e){if(this._retryCount++,this._retryCount>this._options.retry.limit||e instanceof te)throw e;if(e instanceof K){if(!this._options.retry.statusCodes.includes(e.response.status))throw e;const n=e.response.headers.get("Retry-After")??e.response.headers.get("RateLimit-Reset")??e.response.headers.get("X-RateLimit-Reset")??e.response.headers.get("X-Rate-Limit-Reset");if(n&&this._options.retry.afterStatusCodes.includes(e.response.status)){let a=Number(n)*1e3;Number.isNaN(a)?a=Date.parse(n)-Date.now():a>=Date.parse("2024-01-01")&&(a-=Date.now());const s=this._options.retry.maxRetryAfter??a;return a<s?a:s}if(e.response.status===413)throw e}const t=this._options.retry.delay(this._retryCount);return Math.min(this._options.retry.backoffLimit,t)}_decorateResponse(e){return this._options.parseJson&&(e.json=async()=>this._options.parseJson(await e.text())),e}async _retry(e){try{return await e()}catch(t){const n=Math.min(this._calculateRetryDelay(t),B);if(this._retryCount<1)throw t;await ot(n,{signal:this._options.signal});for(const a of this._options.hooks.beforeRetry)if(await a({request:this.request,options:this._options,error:t,retryCount:this._retryCount})===se)return;return this._retry(e)}}async _fetch(){for(const n of this._options.hooks.beforeRequest){const a=await n(this.request,this._options);if(a instanceof Request){this.request=a;break}if(a instanceof Response)return a}const e=it(this.request,this._options),t=this.request;return this.request=t.clone(),this._options.timeout===!1?this._options.fetch(t,e):st(t,e,this.abortController,this._options)}_stream(e,t){const n=Number(e.headers.get("content-length"))||0;let a=0;return e.status===204?(t&&t({percent:1,totalBytes:n,transferredBytes:a},new Uint8Array),new globalThis.Response(null,{status:e.status,statusText:e.statusText,headers:e.headers})):new globalThis.Response(new globalThis.ReadableStream({async start(s){const o=e.body.getReader();t&&t({percent:0,transferredBytes:0,totalBytes:n},new Uint8Array);async function i(){const{done:l,value:d}=await o.read();if(l){s.close();return}if(t){a+=d.byteLength;const y=n===0?0:a/n;t({percent:y,transferredBytes:a,totalBytes:n},d)}s.enqueue(d),await i()}await i()}}),{status:e.status,statusText:e.statusText,headers:e.headers})}}/*! MIT License © Sindre Sorhus */const V=r=>{const e=(t,n)=>N.create(t,I(r,n));for(const t of ae)e[t]=(n,a)=>N.create(n,I(r,a,{method:t}));return e.create=t=>V(I(t)),e.extend=t=>(typeof t=="function"&&(t=t(r??{})),V(I(r,t))),e.stop=se,e},ut=V();function ct(){be(typeof URL<"u",z.formatMessage(`Global "URL" class is not defined. This likely means that you're running MSW in an environment that doesn't support all Node.js standard API (e.g. React Native). If that's the case, please use an appropriate polyfill for the "URL" class, like "react-native-url-polyfill".`))}function dt(r,e){return r.toLowerCase()===e.toLowerCase()}function lt(r){return r<300?"#69AB32":r<400?"#F0BB4B":"#E95F5D"}async function ft(r){const t=await r.clone().text();return{url:new URL(r.url),method:r.method,headers:Object.fromEntries(r.headers.entries()),body:t}}const{message:mt}=ke;async function pt(r){const e=r.clone(),t=await e.text(),n=e.status||200,a=e.statusText||mt[n]||"OK";return{status:n,statusText:a,headers:Object.fromEntries(e.headers.entries()),body:t}}function ht(r){for(var e=[],t=0;t<r.length;){var n=r[t];if(n==="*"||n==="+"||n==="?"){e.push({type:"MODIFIER",index:t,value:r[t++]});continue}if(n==="\\"){e.push({type:"ESCAPED_CHAR",index:t++,value:r[t++]});continue}if(n==="{"){e.push({type:"OPEN",index:t,value:r[t++]});continue}if(n==="}"){e.push({type:"CLOSE",index:t,value:r[t++]});continue}if(n===":"){for(var a="",s=t+1;s<r.length;){var o=r.charCodeAt(s);if(o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122||o===95){a+=r[s++];continue}break}if(!a)throw new TypeError("Missing parameter name at ".concat(t));e.push({type:"NAME",index:t,value:a}),t=s;continue}if(n==="("){var i=1,l="",s=t+1;if(r[s]==="?")throw new TypeError('Pattern cannot start with "?" at '.concat(s));for(;s<r.length;){if(r[s]==="\\"){l+=r[s++]+r[s++];continue}if(r[s]===")"){if(i--,i===0){s++;break}}else if(r[s]==="("&&(i++,r[s+1]!=="?"))throw new TypeError("Capturing groups are not allowed at ".concat(s));l+=r[s++]}if(i)throw new TypeError("Unbalanced pattern at ".concat(t));if(!l)throw new TypeError("Missing pattern at ".concat(t));e.push({type:"PATTERN",index:t,value:l}),t=s;continue}e.push({type:"CHAR",index:t,value:r[t++]})}return e.push({type:"END",index:t,value:""}),e}function yt(r,e){e===void 0&&(e={});for(var t=ht(r),n=e.prefixes,a=n===void 0?"./":n,s=e.delimiter,o=s===void 0?"/#?":s,i=[],l=0,d=0,y="",p=function(k){if(d<t.length&&t[d].type===k)return t[d++].value},x=function(k){var v=p(k);if(v!==void 0)return v;var A=t[d],F=A.type,ge=A.index;throw new TypeError("Unexpected ".concat(F," at ").concat(ge,", expected ").concat(k))},T=function(){for(var k="",v;v=p("CHAR")||p("ESCAPED_CHAR");)k+=v;return k},c=function(k){for(var v=0,A=o;v<A.length;v++){var F=A[v];if(k.indexOf(F)>-1)return!0}return!1},g=function(k){var v=i[i.length-1],A=k||(v&&typeof v=="string"?v:"");if(v&&!A)throw new TypeError('Must have text between two parameters, missing text after "'.concat(v.name,'"'));return!A||c(A)?"[^".concat(j(o),"]+?"):"(?:(?!".concat(j(A),")[^").concat(j(o),"])+?")};d<t.length;){var u=p("CHAR"),h=p("NAME"),q=p("PATTERN");if(h||q){var f=u||"";a.indexOf(f)===-1&&(y+=f,f=""),y&&(i.push(y),y=""),i.push({name:h||l++,prefix:f,suffix:"",pattern:q||g(f),modifier:p("MODIFIER")||""});continue}var m=u||p("ESCAPED_CHAR");if(m){y+=m;continue}y&&(i.push(y),y="");var b=p("OPEN");if(b){var f=T(),R=p("NAME")||"",_=p("PATTERN")||"",S=T();x("CLOSE"),i.push({name:R||(_?l++:""),pattern:R&&!_?g(f):_,prefix:f,suffix:S,modifier:p("MODIFIER")||""});continue}x("END")}return i}function gt(r,e){var t=[],n=ie(r,t,e);return vt(n,t,e)}function vt(r,e,t){t===void 0&&(t={});var n=t.decode,a=n===void 0?function(s){return s}:n;return function(s){var o=r.exec(s);if(!o)return!1;for(var i=o[0],l=o.index,d=Object.create(null),y=function(x){if(o[x]===void 0)return"continue";var T=e[x-1];T.modifier==="*"||T.modifier==="+"?d[T.name]=o[x].split(T.prefix+T.suffix).map(function(c){return a(c,T)}):d[T.name]=a(o[x],T)},p=1;p<o.length;p++)y(p);return{path:i,index:l,params:d}}}function j(r){return r.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function oe(r){return r&&r.sensitive?"":"i"}function Tt(r,e){if(!e)return r;for(var t=/\((?:\?<(.*?)>)?(?!\?)/g,n=0,a=t.exec(r.source);a;)e.push({name:a[1]||n++,prefix:"",suffix:"",modifier:"",pattern:""}),a=t.exec(r.source);return r}function bt(r,e,t){var n=r.map(function(a){return ie(a,e,t).source});return new RegExp("(?:".concat(n.join("|"),")"),oe(t))}function kt(r,e,t){return wt(yt(r,t),e,t)}function wt(r,e,t){t===void 0&&(t={});for(var n=t.strict,a=n===void 0?!1:n,s=t.start,o=s===void 0?!0:s,i=t.end,l=i===void 0?!0:i,d=t.encode,y=d===void 0?function(v){return v}:d,p=t.delimiter,x=p===void 0?"/#?":p,T=t.endsWith,c=T===void 0?"":T,g="[".concat(j(c),"]|$"),u="[".concat(j(x),"]"),h=o?"^":"",q=0,f=r;q<f.length;q++){var m=f[q];if(typeof m=="string")h+=j(y(m));else{var b=j(y(m.prefix)),R=j(y(m.suffix));if(m.pattern)if(e&&e.push(m),b||R)if(m.modifier==="+"||m.modifier==="*"){var _=m.modifier==="*"?"?":"";h+="(?:".concat(b,"((?:").concat(m.pattern,")(?:").concat(R).concat(b,"(?:").concat(m.pattern,"))*)").concat(R,")").concat(_)}else h+="(?:".concat(b,"(").concat(m.pattern,")").concat(R,")").concat(m.modifier);else{if(m.modifier==="+"||m.modifier==="*")throw new TypeError('Can not repeat "'.concat(m.name,'" without a prefix and suffix'));h+="(".concat(m.pattern,")").concat(m.modifier)}else h+="(?:".concat(b).concat(R,")").concat(m.modifier)}}if(l)a||(h+="".concat(u,"?")),h+=t.endsWith?"(?=".concat(g,")"):"$";else{var S=r[r.length-1],k=typeof S=="string"?u.indexOf(S[S.length-1])>-1:S===void 0;a||(h+="(?:".concat(u,"(?=").concat(g,"))?")),k||(h+="(?=".concat(u,"|").concat(g,")"))}return new RegExp(h,oe(t))}function ie(r,e,t){return r instanceof RegExp?Tt(r,e):Array.isArray(r)?bt(r,e,t):kt(r,e,t)}function xt(r,e=!0){return[e&&r.origin,r.pathname].filter(Boolean).join("")}const Rt=/[\?|#].*$/g;function At(r){return new URL(`/${r}`,"http://localhost").searchParams}function ue(r){return r.endsWith("?")?r:r.replace(Rt,"")}function qt(r){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(r)}function Et(r,e){if(qt(r)||r.startsWith("*"))return r;const t=e||typeof document<"u"&&document.baseURI;return t?decodeURI(new URL(encodeURI(r),t).href):r}function _t(r,e){if(r instanceof RegExp)return r;const t=Et(r,e);return ue(t)}function St(r){return r.replace(/([:a-zA-Z_-]*)(\*{1,2})+/g,(e,t,n)=>{const a="(.*)";return t?t.startsWith(":")?`${t}${n}`:`${t}${a}`:a}).replace(/([^\/])(:)(?=\d+)/,"$1\\$2").replace(/^([^\/]+)(:)(?=\/\/)/,"$1\\$2")}function Ct(r,e,t){const n=_t(e,t),a=typeof n=="string"?St(n):n,s=xt(r),o=gt(a,{decode:decodeURIComponent})(s),i=o&&o.params||{};return{matches:o!==!1,params:i}}var Pt=Object.create,ce=Object.defineProperty,jt=Object.getOwnPropertyDescriptor,de=Object.getOwnPropertyNames,Dt=Object.getPrototypeOf,Ot=Object.prototype.hasOwnProperty,Mt=(r,e)=>function(){return e||(0,r[de(r)[0]])((e={exports:{}}).exports,e),e.exports},Ut=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of de(e))!Ot.call(r,a)&&a!==t&&ce(r,a,{get:()=>e[a],enumerable:!(n=jt(e,a))||n.enumerable});return r},It=(r,e,t)=>(t=r!=null?Pt(Dt(r)):{},Ut(ce(t,"default",{value:r,enumerable:!0}),r)),Lt=Mt({"node_modules/cookie/index.js"(r){r.parse=i,r.serialize=y;var e=Object.prototype.toString,t=Object.prototype.hasOwnProperty,n=/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/,a=/^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/,s=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,o=/^[\u0020-\u003A\u003D-\u007E]*$/;function i(c,g){if(typeof c!="string")throw new TypeError("argument str must be a string");var u={},h=c.length;if(h<2)return u;var q=g&&g.decode||p,f=0,m=0,b=0;do{if(m=c.indexOf("=",f),m===-1)break;if(b=c.indexOf(";",f),b===-1)b=h;else if(m>b){f=c.lastIndexOf(";",m-1)+1;continue}var R=l(c,f,m),_=d(c,m,R),S=c.slice(R,_);if(!t.call(u,S)){var k=l(c,m+1,b),v=d(c,b,k);c.charCodeAt(k)===34&&c.charCodeAt(v-1)===34&&(k++,v--);var A=c.slice(k,v);u[S]=T(A,q)}f=b+1}while(f<h);return u}function l(c,g,u){do{var h=c.charCodeAt(g);if(h!==32&&h!==9)return g}while(++g<u);return u}function d(c,g,u){for(;g>u;){var h=c.charCodeAt(--g);if(h!==32&&h!==9)return g+1}return u}function y(c,g,u){var h=u&&u.encode||encodeURIComponent;if(typeof h!="function")throw new TypeError("option encode is invalid");if(!n.test(c))throw new TypeError("argument name is invalid");var q=h(g);if(!a.test(q))throw new TypeError("argument val is invalid");var f=c+"="+q;if(!u)return f;if(u.maxAge!=null){var m=Math.floor(u.maxAge);if(!isFinite(m))throw new TypeError("option maxAge is invalid");f+="; Max-Age="+m}if(u.domain){if(!s.test(u.domain))throw new TypeError("option domain is invalid");f+="; Domain="+u.domain}if(u.path){if(!o.test(u.path))throw new TypeError("option path is invalid");f+="; Path="+u.path}if(u.expires){var b=u.expires;if(!x(b)||isNaN(b.valueOf()))throw new TypeError("option expires is invalid");f+="; Expires="+b.toUTCString()}if(u.httpOnly&&(f+="; HttpOnly"),u.secure&&(f+="; Secure"),u.partitioned&&(f+="; Partitioned"),u.priority){var R=typeof u.priority=="string"?u.priority.toLowerCase():u.priority;switch(R){case"low":f+="; Priority=Low";break;case"medium":f+="; Priority=Medium";break;case"high":f+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(u.sameSite){var _=typeof u.sameSite=="string"?u.sameSite.toLowerCase():u.sameSite;switch(_){case!0:f+="; SameSite=Strict";break;case"lax":f+="; SameSite=Lax";break;case"strict":f+="; SameSite=Strict";break;case"none":f+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return f}function p(c){return c.indexOf("%")!==-1?decodeURIComponent(c):c}function x(c){return e.call(c)==="[object Date]"}function T(c,g){try{return g(c)}catch{return c}}}}),Nt=It(Lt()),le=Nt.default;/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/function fe(r){const e=le.parse(r),t={};for(const n in e)typeof e[n]<"u"&&(t[n]=e[n]);return t}function Q(){return fe(document.cookie)}function Ft(r){if(typeof document>"u"||typeof location>"u")return{};switch(r.credentials){case"same-origin":{const e=new URL(r.url);return location.origin===e.origin?Q():{}}case"include":return Q();default:return{}}}function $t(r){const e=r.headers.get("cookie"),t=e?fe(e):{},n=Ft(r);for(const o in n)r.headers.append("cookie",le.serialize(o,n[o]));const a=we.getCookiesSync(r.url),s=Object.fromEntries(a.map(o=>[o.key,o.value]));for(const o of a)r.headers.append("cookie",o.toString());return{...n,...s,...t}}var P=(r=>(r.HEAD="HEAD",r.GET="GET",r.POST="POST",r.PUT="PUT",r.PATCH="PATCH",r.OPTIONS="OPTIONS",r.DELETE="DELETE",r))(P||{});class Bt extends xe{constructor(e,t,n,a){super({info:{header:`${e} ${t}`,path:t,method:e},resolver:n,options:a}),this.checkRedundantQueryParameters()}checkRedundantQueryParameters(){const{method:e,path:t}=this.info;if(t instanceof RegExp||ue(t)===t)return;At(t).forEach((s,o)=>{}),z.warn(`Found a redundant usage of query parameters in the request handler URL for "${e} ${t}". Please match against a path instead and access query parameters using "new URL(request.url).searchParams" instead. Learn more: https://mswjs.io/docs/recipes/query-parameters`)}async parse(e){var s;const t=new URL(e.request.url),n=Ct(t,this.info.path,(s=e.resolutionContext)==null?void 0:s.baseUrl),a=$t(e.request);return{match:n,cookies:a}}predicate(e){const t=this.matchMethod(e.request.method),n=e.parsedResult.match.matches;return t&&n}matchMethod(e){return this.info.method instanceof RegExp?this.info.method.test(e):dt(this.info.method,e)}extendResolverArgs(e){var t;return{params:((t=e.parsedResult.match)==null?void 0:t.params)||{},cookies:e.parsedResult.cookies}}async log(e){const t=Re(e.request.url),n=await ft(e.request),a=await pt(e.response),s=lt(a.status);console.groupCollapsed(z.formatMessage(`${Ae()} ${e.request.method} ${t} (%c${a.status} ${a.statusText}%c)`),`color:${s}`,"color:inherit"),console.log("Request",n),console.log("Handler:",this),console.log("Response",a),console.groupEnd()}}function C(r){return(e,t,n={})=>new Bt(r,e,t,n)}const ar={all:C(/.+/),head:C(P.HEAD),get:C(P.GET),post:C(P.POST),put:C(P.PUT),delete:C(P.DELETE),patch:C(P.PATCH),options:C(P.OPTIONS)};class O extends Response{constructor(e,t){const n=D(t);super(e,n),qe(this,n)}static text(e,t){const n=D(t);return n.headers.has("Content-Type")||n.headers.set("Content-Type","text/plain"),n.headers.has("Content-Length")||n.headers.set("Content-Length",e?new Blob([e]).size.toString():"0"),new O(e,n)}static json(e,t){const n=D(t);n.headers.has("Content-Type")||n.headers.set("Content-Type","application/json");const a=JSON.stringify(e);return n.headers.has("Content-Length")||n.headers.set("Content-Length",a?new Blob([a]).size.toString():"0"),new O(a,n)}static xml(e,t){const n=D(t);return n.headers.has("Content-Type")||n.headers.set("Content-Type","text/xml"),new O(e,n)}static html(e,t){const n=D(t);return n.headers.has("Content-Type")||n.headers.set("Content-Type","text/html"),new O(e,n)}static arrayBuffer(e,t){const n=D(t);return n.headers.has("Content-Type")||n.headers.set("Content-Type","application/octet-stream"),e&&!n.headers.has("Content-Length")&&n.headers.set("Content-Length",e.byteLength.toString()),new O(e,n)}static formData(e,t){return new O(e,D(t))}}ct();const me=(r,e)=>async t=>{const n=new FormData;n.append("id",t.id),n.append("vedlegg",t.file,t.filename);const a=await ut.post(`${r}/rest/storage/${e}/vedlegg`,{body:n});return{headers:{location:a.headers.get("Location")},data:await a.text()}},pe=({attachments:r,updateAttachments:e})=>{const t=J();return w.jsx(Y,{label:t.formatMessage({id:"AdopsjonDokPanel.Vedlegg.Adopsjon"}),description:w.jsx(H,{id:"AdopsjonDokPanel.Veilederpanel.Text"}),attachmentType:Z.OMSORGSOVERTAKELSE,skjemanummer:ee.OMSORGSOVERTAKELSE,existingAttachments:r,updateAttachments:e,saveAttachment:me("./","engangsstonad")})};pe.__docgenInfo={description:"",methods:[],displayName:"AdopsjonDokPanel",props:{attachments:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(attachments: Attachment[], hasPendingUploads: boolean) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"},{type:{name:"boolean"},name:"hasPendingUploads"}],return:{name:"void"}}},description:""}}};var he={exports:{}};(function(r,e){(function(t,n){r.exports=n()})(Pe,function(){return function(t,n,a){var s=function(o,i){if(!i||!i.length||i.length===1&&!i[0]||i.length===1&&Array.isArray(i[0])&&!i[0].length)return null;var l;i.length===1&&i[0].length>0&&(i=i[0]),l=(i=i.filter(function(y){return y}))[0];for(var d=1;d<i.length;d+=1)i[d].isValid()&&!i[d][o](l)||(l=i[d]);return l};a.max=function(){var o=[].slice.call(arguments,0);return s("isAfter",o)},a.min=function(){var o=[].slice.call(arguments,0);return s("isBefore",o)}}})})(he);var zt=he.exports;const Ht=je(zt);M.extend(Ht);const Vt=18,Jt=3,Wt=Vt*7+Jt,Gt=(r,e)=>t=>{const n=M(t).startOf("day"),s=M(r).startOf("day").subtract(Wt,"days");return M.max(s,n).isSame(n)?null:e.formatMessage({id:"TerminDokPanel.Validering.TerminBekreftelsedato.DuMåVæreIUke22"})},ye=({attachments:r,updateAttachments:e,omBarnet:t})=>{const n=J();return w.jsxs(w.Fragment,{children:[w.jsx(Oe,{name:"terminbekreftelsedato",label:w.jsx(H,{id:"TerminDokPanel.Terminbekreftelsesdato"}),minDate:M(t.termindato).subtract(18,"week").subtract(3,"day").toDate(),maxDate:M().toDate(),validate:[Ne(n.formatMessage({id:"TerminDokPanel.Validering.TerminbekreftelseDato.DuMåOppgi"})),Fe(n.formatMessage({id:"TerminDokPanel.Validering.TerminBekreftelsedato"})),$e(n.formatMessage({id:"TerminDokPanel.Validering.TerminBekreftelsedato.MåVæreIdagEllerTidligere"})),Gt(t.termindato,n)]}),w.jsx(Y,{label:n.formatMessage({id:"TerminDokPanel.Vedlegg.Terminbekreftelse"}),description:w.jsx(H,{id:"TerminDokPanel.Vedlegg.Terminbekreftelse.Info"}),attachmentType:Z.TERMINBEKREFTELSE,skjemanummer:ee.TERMINBEKREFTELSE,existingAttachments:r,updateAttachments:e,saveAttachment:me("./","engangsstonad")})]})};ye.__docgenInfo={description:"",methods:[],displayName:"TerminDokPanel",props:{attachments:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(attachments: Attachment[], hasPendingUploads: boolean) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"},{type:{name:"boolean"},name:"hasPendingUploads"}],return:{name:"void"}}},description:""},omBarnet:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    erBarnetFødt: false;
    antallBarn: number;
    termindato: string;
}`,signature:{properties:[{key:"erBarnetFødt",value:{name:"literal",value:"false",required:!0}},{key:"antallBarn",value:{name:"number",required:!0}},{key:"termindato",value:{name:"string",required:!0}}]}},description:""}}};const Kt=({mellomlagreOgNaviger:r})=>{const e=J(),t=Ee(),n=_e(r),[a,s]=De.useState(!1),o=G($.DOKUMENTASJON),i=Se($.DOKUMENTASJON),l=Ce(G($.OM_BARNET)),d=Ve(l),y=Je(l),p=Me({defaultValues:o}),x=c=>c.vedlegg.length===0?(p.setError("vedlegg",{message:d?e.formatMessage({id:"DokumentasjonSteg.MinstEttDokumentAdopsjon"}):e.formatMessage({id:"DokumentasjonSteg.MinstEttDokumentTermin"})}),Promise.resolve()):(i(c),n.goToNextDefaultStep()),T=(c,g)=>{s(g),p.setValue("vedlegg",c,{shouldDirty:!0,shouldTouch:!0}),p.clearErrors("vedlegg")};return w.jsx(Be,{bannerTitle:e.formatMessage({id:"Søknad.Pageheading"}),onCancel:n.avbrytSøknad,onContinueLater:n.fortsettSøknadSenere,onStepChange:n.goToNextStep,steps:t,noFieldsRequired:!0,children:w.jsx(Ue,{formMethods:p,onSubmit:x,children:w.jsxs(ze,{gap:"10",children:[w.jsx(Ie,{}),d&&w.jsx(pe,{attachments:o==null?void 0:o.vedlegg,updateAttachments:T}),y&&w.jsx(ye,{attachments:o==null?void 0:o.vedlegg,updateAttachments:T,omBarnet:l}),w.jsx(He,{}),w.jsx(Le,{goToPreviousStep:n.goToPreviousDefaultStep,saveDataOnPreviousClick:i,isDisabledAndLoading:a})]})})})};Kt.__docgenInfo={description:"",methods:[],displayName:"DokumentasjonSteg",props:{mellomlagreOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{Kt as D,O as H,K as a,ar as h,ut as k};
