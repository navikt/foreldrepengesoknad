import{k as j,F as le,G as V,J as me,K as de,N as ce,O as pe,Q as fe,W as P,X as Ee,h as B,j as R,Y as J,M as F,g as ve,Z as ge,_ as ye,$ as Te,a0 as he,a1 as Ae,D as x,r as Re,a2 as Le,S as Se,a3 as ke,a4 as Oe,V as Ge,a5 as De,a6 as Ie,a7 as Ne}from"./iframe-B_j3q0qo.js";import{i as _e,j as Pe,k as z,C as K,l as we,n as be,e as Me,h as xe}from"./useEsNavigator-Bk76EyBf.js";import{S as Q,A as Z}from"./attachmentType-DJ1vFT-G.js";function qe(e){for(var r=[],n=0;n<e.length;){var t=e[n];if(t==="*"||t==="+"||t==="?"){r.push({type:"MODIFIER",index:n,value:e[n++]});continue}if(t==="\\"){r.push({type:"ESCAPED_CHAR",index:n++,value:e[n++]});continue}if(t==="{"){r.push({type:"OPEN",index:n,value:e[n++]});continue}if(t==="}"){r.push({type:"CLOSE",index:n,value:e[n++]});continue}if(t===":"){for(var a="",i=n+1;i<e.length;){var s=e.charCodeAt(i);if(s>=48&&s<=57||s>=65&&s<=90||s>=97&&s<=122||s===95){a+=e[i++];continue}break}if(!a)throw new TypeError("Missing parameter name at ".concat(n));r.push({type:"NAME",index:n,value:a}),n=i;continue}if(t==="("){var u=1,E="",i=n+1;if(e[i]==="?")throw new TypeError('Pattern cannot start with "?" at '.concat(i));for(;i<e.length;){if(e[i]==="\\"){E+=e[i++]+e[i++];continue}if(e[i]===")"){if(u--,u===0){i++;break}}else if(e[i]==="("&&(u++,e[i+1]!=="?"))throw new TypeError("Capturing groups are not allowed at ".concat(i));E+=e[i++]}if(u)throw new TypeError("Unbalanced pattern at ".concat(n));if(!E)throw new TypeError("Missing pattern at ".concat(n));r.push({type:"PATTERN",index:n,value:E}),n=i;continue}r.push({type:"CHAR",index:n,value:e[n++]})}return r.push({type:"END",index:n,value:""}),r}function Ue(e,r){r===void 0&&(r={});for(var n=qe(e),t=r.prefixes,a=t===void 0?"./":t,i=r.delimiter,s=i===void 0?"/#?":i,u=[],E=0,f=0,y="",c=function(A){if(f<n.length&&n[f].type===A)return n[f++].value},L=function(A){var g=c(A);if(g!==void 0)return g;var k=n[f],C=k.type,ue=k.index;throw new TypeError("Unexpected ".concat(C," at ").concat(ue,", expected ").concat(A))},T=function(){for(var A="",g;g=c("CHAR")||c("ESCAPED_CHAR");)A+=g;return A},l=function(A){for(var g=0,k=s;g<k.length;g++){var C=k[g];if(A.indexOf(C)>-1)return!0}return!1},v=function(A){var g=u[u.length-1],k=A||(g&&typeof g=="string"?g:"");if(g&&!k)throw new TypeError('Must have text between two parameters, missing text after "'.concat(g.name,'"'));return!k||l(k)?"[^".concat(_(s),"]+?"):"(?:(?!".concat(_(k),")[^").concat(_(s),"])+?")};f<n.length;){var o=c("CHAR"),p=c("NAME"),O=c("PATTERN");if(p||O){var m=o||"";a.indexOf(m)===-1&&(y+=m,m=""),y&&(u.push(y),y=""),u.push({name:p||E++,prefix:m,suffix:"",pattern:O||v(m),modifier:c("MODIFIER")||""});continue}var d=o||c("ESCAPED_CHAR");if(d){y+=d;continue}y&&(u.push(y),y="");var h=c("OPEN");if(h){var m=T(),S=c("NAME")||"",G=c("PATTERN")||"",D=T();L("CLOSE"),u.push({name:S||(G?E++:""),pattern:S&&!G?v(m):G,prefix:m,suffix:D,modifier:c("MODIFIER")||""});continue}L("END")}return u}function je(e,r){var n=[],t=ee(e,n,r);return Ce(t,n,r)}function Ce(e,r,n){n===void 0&&(n={});var t=n.decode,a=t===void 0?function(i){return i}:t;return function(i){var s=e.exec(i);if(!s)return!1;for(var u=s[0],E=s.index,f=Object.create(null),y=function(L){if(s[L]===void 0)return"continue";var T=r[L-1];T.modifier==="*"||T.modifier==="+"?f[T.name]=s[L].split(T.prefix+T.suffix).map(function(l){return a(l,T)}):f[T.name]=a(s[L],T)},c=1;c<s.length;c++)y(c);return{path:u,index:E,params:f}}}function _(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function X(e){return e&&e.sensitive?"":"i"}function Ke(e,r){if(!r)return e;for(var n=/\((?:\?<(.*?)>)?(?!\?)/g,t=0,a=n.exec(e.source);a;)r.push({name:a[1]||t++,prefix:"",suffix:"",modifier:"",pattern:""}),a=n.exec(e.source);return e}function Ve(e,r,n){var t=e.map(function(a){return ee(a,r,n).source});return new RegExp("(?:".concat(t.join("|"),")"),X(n))}function Fe(e,r,n){return Be(Ue(e,n),r,n)}function Be(e,r,n){n===void 0&&(n={});for(var t=n.strict,a=t===void 0?!1:t,i=n.start,s=i===void 0?!0:i,u=n.end,E=u===void 0?!0:u,f=n.encode,y=f===void 0?function(g){return g}:f,c=n.delimiter,L=c===void 0?"/#?":c,T=n.endsWith,l=T===void 0?"":T,v="[".concat(_(l),"]|$"),o="[".concat(_(L),"]"),p=s?"^":"",O=0,m=e;O<m.length;O++){var d=m[O];if(typeof d=="string")p+=_(y(d));else{var h=_(y(d.prefix)),S=_(y(d.suffix));if(d.pattern)if(r&&r.push(d),h||S)if(d.modifier==="+"||d.modifier==="*"){var G=d.modifier==="*"?"?":"";p+="(?:".concat(h,"((?:").concat(d.pattern,")(?:").concat(S).concat(h,"(?:").concat(d.pattern,"))*)").concat(S,")").concat(G)}else p+="(?:".concat(h,"(").concat(d.pattern,")").concat(S,")").concat(d.modifier);else{if(d.modifier==="+"||d.modifier==="*")throw new TypeError('Can not repeat "'.concat(d.name,'" without a prefix and suffix'));p+="(".concat(d.pattern,")").concat(d.modifier)}else p+="(?:".concat(h).concat(S,")").concat(d.modifier)}}if(E)a||(p+="".concat(o,"?")),p+=n.endsWith?"(?=".concat(v,")"):"$";else{var D=e[e.length-1],A=typeof D=="string"?o.indexOf(D[D.length-1])>-1:D===void 0;a||(p+="(?:".concat(o,"(?=").concat(v,"))?")),A||(p+="(?=".concat(o,"|").concat(v,")"))}return new RegExp(p,X(n))}function ee(e,r,n){return e instanceof RegExp?Ke(e,r):Array.isArray(e)?Ve(e,r,n):Fe(e,r,n)}new TextEncoder;function $e(e){try{return new URL(e),!0}catch{return!1}}function H(e,r){const t=Object.getOwnPropertySymbols(r).find(a=>a.description===e);if(t)return Reflect.get(r,t)}var M=class extends Response{static isConfigurableStatusCode(e){return e>=200&&e<=599}static isRedirectResponse(e){return M.STATUS_CODES_WITH_REDIRECT.includes(e)}static isResponseWithBody(e){return!M.STATUS_CODES_WITHOUT_BODY.includes(e)}static setUrl(e,r){if(!e||e==="about:"||!$e(e))return;const n=H("state",r);n?n.urlList.push(new URL(e)):Object.defineProperty(r,"url",{value:e,enumerable:!0,configurable:!0,writable:!1})}static parseRawHeaders(e){const r=new Headers;for(let n=0;n<e.length;n+=2)r.append(e[n],e[n+1]);return r}constructor(e,r={}){var n;const t=(n=r.status)!=null?n:200,a=M.isConfigurableStatusCode(t)?t:200,i=M.isResponseWithBody(t)?e:null;if(super(i,{status:a,statusText:r.statusText,headers:r.headers}),t!==a){const s=H("state",this);s?s.status=t:Object.defineProperty(this,"status",{value:t,enumerable:!0,configurable:!0,writable:!1})}M.setUrl(r.url,this)}},$=M;$.STATUS_CODES_WITHOUT_BODY=[101,103,204,205,304];$.STATUS_CODES_WITH_REDIRECT=[301,302,303,307,308];function ze(e,r=!0){return[r&&e.origin,e.pathname].filter(Boolean).join("")}var He=Object.create,re=Object.defineProperty,Ye=Object.getOwnPropertyDescriptor,ne=Object.getOwnPropertyNames,We=Object.getPrototypeOf,Je=Object.prototype.hasOwnProperty,Qe=(e,r)=>function(){return r||(0,e[ne(e)[0]])((r={exports:{}}).exports,r),r.exports},Ze=(e,r,n,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let a of ne(r))!Je.call(e,a)&&a!==n&&re(e,a,{get:()=>r[a],enumerable:!(t=Ye(r,a))||t.enumerable});return e},Xe=(e,r,n)=>(n=e!=null?He(We(e)):{},Ze(re(n,"default",{value:e,enumerable:!0}),e)),er=Qe({"node_modules/cookie/index.js"(e){e.parse=u,e.serialize=y;var r=Object.prototype.toString,n=Object.prototype.hasOwnProperty,t=/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/,a=/^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/,i=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,s=/^[\u0020-\u003A\u003D-\u007E]*$/;function u(l,v){if(typeof l!="string")throw new TypeError("argument str must be a string");var o={},p=l.length;if(p<2)return o;var O=v&&v.decode||c,m=0,d=0,h=0;do{if(d=l.indexOf("=",m),d===-1)break;if(h=l.indexOf(";",m),h===-1)h=p;else if(d>h){m=l.lastIndexOf(";",d-1)+1;continue}var S=E(l,m,d),G=f(l,d,S),D=l.slice(S,G);if(!n.call(o,D)){var A=E(l,d+1,h),g=f(l,h,A);l.charCodeAt(A)===34&&l.charCodeAt(g-1)===34&&(A++,g--);var k=l.slice(A,g);o[D]=T(k,O)}m=h+1}while(m<p);return o}function E(l,v,o){do{var p=l.charCodeAt(v);if(p!==32&&p!==9)return v}while(++v<o);return o}function f(l,v,o){for(;v>o;){var p=l.charCodeAt(--v);if(p!==32&&p!==9)return v+1}return o}function y(l,v,o){var p=o&&o.encode||encodeURIComponent;if(typeof p!="function")throw new TypeError("option encode is invalid");if(!t.test(l))throw new TypeError("argument name is invalid");var O=p(v);if(!a.test(O))throw new TypeError("argument val is invalid");var m=l+"="+O;if(!o)return m;if(o.maxAge!=null){var d=Math.floor(o.maxAge);if(!isFinite(d))throw new TypeError("option maxAge is invalid");m+="; Max-Age="+d}if(o.domain){if(!i.test(o.domain))throw new TypeError("option domain is invalid");m+="; Domain="+o.domain}if(o.path){if(!s.test(o.path))throw new TypeError("option path is invalid");m+="; Path="+o.path}if(o.expires){var h=o.expires;if(!L(h)||isNaN(h.valueOf()))throw new TypeError("option expires is invalid");m+="; Expires="+h.toUTCString()}if(o.httpOnly&&(m+="; HttpOnly"),o.secure&&(m+="; Secure"),o.partitioned&&(m+="; Partitioned"),o.priority){var S=typeof o.priority=="string"?o.priority.toLowerCase():o.priority;switch(S){case"low":m+="; Priority=Low";break;case"medium":m+="; Priority=Medium";break;case"high":m+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(o.sameSite){var G=typeof o.sameSite=="string"?o.sameSite.toLowerCase():o.sameSite;switch(G){case!0:m+="; SameSite=Strict";break;case"lax":m+="; SameSite=Lax";break;case"strict":m+="; SameSite=Strict";break;case"none":m+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return m}function c(l){return l.indexOf("%")!==-1?decodeURIComponent(l):l}function L(l){return r.call(l)==="[object Date]"}function T(l,v){try{return v(l)}catch{return l}}}}),rr=Xe(er()),te=rr.default;/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/const b="./",q={personInfo:`${b}/fpoversikt/api/person/info`,erOppdatert:`${b}/fpoversikt/api/saker/erOppdatert`,mellomlagring:`${b}/fpsoknad/api/storage/ENGANGSSTONAD`,status:`${b}/fpsoknad/api/soknad/status`,sendSøknad:`${b}/fpsoknad/api/soknad/engangsstonad`,sendVedlegg:`${b}/fpsoknad/api/storage/ENGANGSSTONAD/vedlegg`},_r=()=>({queryKey:["PERSONINFO"],queryFn:()=>j.get(q.personInfo).json(),staleTime:1/0}),Pr=()=>({queryKey:["MELLOMLAGRET_INFO"],queryFn:()=>j.get(q.mellomlagring).json(),staleTime:1/0}),wr=()=>({queryKey:["STATUS"],queryFn:async()=>{const e=await j.get(q.status).json();return e.saksnummer!==void 0?await j.get(q.erOppdatert).json()?e:{status:"PENDING"}:e},staleTime:1/0});function nr(){le(typeof URL<"u",V.formatMessage(`Global "URL" class is not defined. This likely means that you're running MSW in an environment that doesn't support all Node.js standard API (e.g. React Native). If that's the case, please use an appropriate polyfill for the "URL" class, like "react-native-url-polyfill".`))}function tr(e,r){return e.toLowerCase()===r.toLowerCase()}function ar(e){return e<300?"#69AB32":e<400?"#F0BB4B":"#E95F5D"}async function ir(e){const n=await e.clone().text();return{url:new URL(e.url),method:e.method,headers:Object.fromEntries(e.headers.entries()),body:n}}const{message:sr}=me;async function or(e){const r=e.clone(),n=await r.text(),t=r.status||200,a=r.statusText||sr[t]||"OK";return{status:t,statusText:a,headers:Object.fromEntries(r.headers.entries()),body:n}}const ur=/[?|#].*$/g;function lr(e){return new URL(`/${e}`,"http://localhost").searchParams}function ae(e){return e.endsWith("?")?e:e.replace(ur,"")}function mr(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function dr(e,r){if(mr(e)||e.startsWith("*"))return e;const n=r||typeof location<"u"&&location.href;return n?decodeURI(new URL(encodeURI(e),n).href):e}function cr(e,r){if(e instanceof RegExp)return e;const n=dr(e,r);return ae(n)}function pr(e){return e.replace(/([:a-zA-Z_-]*)(\*{1,2})+/g,(r,n,t)=>{const a="(.*)";return n?n.startsWith(":")?`${n}${t}`:`${n}${a}`:a}).replace(/([^/])(:)(?=\d+)/,"$1\\$2").replace(/^([^/]+)(:)(?=\/\/)/,"$1\\$2")}function fr(e,r,n){const t=cr(r,n),a=typeof t=="string"?pr(t):t,i=ze(e),s=je(a,{decode:decodeURIComponent})(i),u=s&&s.params||{};return{matches:s!==!1,params:u}}function ie(e){const r=te.parse(e),n={};for(const t in r)typeof r[t]<"u"&&(n[t]=r[t]);return n}function Y(){return ie(document.cookie)}function Er(e){if(typeof document>"u"||typeof location>"u")return{};switch(e.credentials){case"same-origin":{const r=new URL(e.url);return location.origin===r.origin?Y():{}}case"include":return Y();default:return{}}}function vr(e){const r=e.headers.get("cookie"),n=r?ie(r):{},t=Er(e);for(const s in t)e.headers.append("cookie",te.serialize(s,t[s]));const a=de.getCookies(e.url),i=Object.fromEntries(a.map(s=>[s.key,s.value]));for(const s of a)e.headers.append("cookie",s.toString());return{...t,...i,...n}}var N=(e=>(e.HEAD="HEAD",e.GET="GET",e.POST="POST",e.PUT="PUT",e.PATCH="PATCH",e.OPTIONS="OPTIONS",e.DELETE="DELETE",e))(N||{});class gr extends ce{constructor(r,n,t,a){const i=typeof n=="function"?"[custom predicate]":n;super({info:{header:`${r}${i?` ${i}`:""}`,path:n,method:r},resolver:t,options:a}),this.checkRedundantQueryParameters()}checkRedundantQueryParameters(){const{method:r,path:n}=this.info;if(!n||n instanceof RegExp||typeof n=="function"||ae(n)===n)return;lr(n).forEach((i,s)=>{}),V.warn(`Found a redundant usage of query parameters in the request handler URL for "${r} ${n}". Please match against a path instead and access query parameters using "new URL(request.url).searchParams" instead. Learn more: https://mswjs.io/docs/http/intercepting-requests#querysearch-parameters`)}async parse(r){const n=new URL(r.request.url),t=vr(r.request);if(typeof this.info.path=="function"){const i=await this.info.path({request:r.request,cookies:t});return{match:typeof i=="boolean"?{matches:i,params:{}}:i,cookies:t}}return{match:this.info.path?fr(n,this.info.path,r.resolutionContext?.baseUrl):{matches:!1,params:{}},cookies:t}}async predicate(r){const n=this.matchMethod(r.request.method),t=r.parsedResult.match.matches;return n&&t}matchMethod(r){return this.info.method instanceof RegExp?this.info.method.test(r):tr(this.info.method,r)}extendResolverArgs(r){return{params:r.parsedResult.match?.params||{},cookies:r.parsedResult.cookies}}async log(r){const n=pe(r.request.url),t=await ir(r.request),a=await or(r.response),i=ar(a.status);console.groupCollapsed(V.formatMessage(`${fe()} ${r.request.method} ${n} (%c${a.status} ${a.statusText}%c)`),`color:${i}`,"color:inherit"),console.log("Request",t),console.log("Handler:",this),console.log("Response",a),console.groupEnd()}}function I(e){return(r,n,t={})=>new gr(e,r,n,t)}const br={all:I(/.+/),head:I(N.HEAD),get:I(N.GET),post:I(N.POST),put:I(N.PUT),delete:I(N.DELETE),patch:I(N.PATCH),options:I(N.OPTIONS)},yr=Symbol("bodyType");class w extends ${[yr]=null;constructor(r,n){const t=P(n);super(r,t),Ee(this,t)}static error(){return super.error()}static text(r,n){const t=P(n);return t.headers.has("Content-Type")||t.headers.set("Content-Type","text/plain"),t.headers.has("Content-Length")||t.headers.set("Content-Length",r?new Blob([r]).size.toString():"0"),new w(r,t)}static json(r,n){const t=P(n);t.headers.has("Content-Type")||t.headers.set("Content-Type","application/json");const a=JSON.stringify(r);return t.headers.has("Content-Length")||t.headers.set("Content-Length",a?new Blob([a]).size.toString():"0"),new w(a,t)}static xml(r,n){const t=P(n);return t.headers.has("Content-Type")||t.headers.set("Content-Type","text/xml"),new w(r,t)}static html(r,n){const t=P(n);return t.headers.has("Content-Type")||t.headers.set("Content-Type","text/html"),new w(r,t)}static arrayBuffer(r,n){const t=P(n);return t.headers.has("Content-Type")||t.headers.set("Content-Type","application/octet-stream"),r&&!t.headers.has("Content-Length")&&t.headers.set("Content-Length",r.byteLength.toString()),new w(r,t)}static formData(r,n){return new w(r,P(n))}}nr();const se=({attachments:e,updateAttachments:r})=>{const n=B();return R.jsx(J,{label:n.formatMessage({id:"AdopsjonDokPanel.Vedlegg.Adopsjon"}),description:R.jsx(F,{id:"AdopsjonDokPanel.Veilederpanel.Text"}),attachmentType:Z.OMSORGSOVERTAKELSE,skjemanummer:Q.OMSORGSOVERTAKELSE,existingAttachments:e,updateAttachments:r,uploadPath:q.sendVedlegg})};se.__docgenInfo={description:"",methods:[],displayName:"AdopsjonDokPanel",props:{attachments:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: InnsendingType;
    error?: AttachmentError;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: Array<ÅpenPeriodeDto>;
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Array<ÅpenPeriodeDto>",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"union",raw:"GenerelleErrorKoder | ProblemDetailsErrorKode | InternError",elements:[{name:"union",raw:"'TIMEOUT' | 'SERVER_ERROR'",elements:[{name:"literal",value:"'TIMEOUT'"},{name:"literal",value:"'SERVER_ERROR'"}]},{name:"union",raw:`| 'IKKE_TILGANG'
| 'DUPLIKAT_FORSENDELSE'
| 'MELLOMLAGRING'
| 'MELLOMLAGRING_VEDLEGG'
| 'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'
| 'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'
| 'KRYPTERING_MELLOMLAGRING'`,elements:[{name:"literal",value:"'IKKE_TILGANG'"},{name:"literal",value:"'DUPLIKAT_FORSENDELSE'"},{name:"literal",value:"'MELLOMLAGRING'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'"},{name:"literal",value:"'KRYPTERING_MELLOMLAGRING'"}]},{name:"literal",value:"'NO_DATA'"}],required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(attachments: Attachment[], hasPendingUploads: boolean) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: InnsendingType;
    error?: AttachmentError;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: Array<ÅpenPeriodeDto>;
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Array<ÅpenPeriodeDto>",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"union",raw:"GenerelleErrorKoder | ProblemDetailsErrorKode | InternError",elements:[{name:"union",raw:"'TIMEOUT' | 'SERVER_ERROR'",elements:[{name:"literal",value:"'TIMEOUT'"},{name:"literal",value:"'SERVER_ERROR'"}]},{name:"union",raw:`| 'IKKE_TILGANG'
| 'DUPLIKAT_FORSENDELSE'
| 'MELLOMLAGRING'
| 'MELLOMLAGRING_VEDLEGG'
| 'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'
| 'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'
| 'KRYPTERING_MELLOMLAGRING'`,elements:[{name:"literal",value:"'IKKE_TILGANG'"},{name:"literal",value:"'DUPLIKAT_FORSENDELSE'"},{name:"literal",value:"'MELLOMLAGRING'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'"},{name:"literal",value:"'KRYPTERING_MELLOMLAGRING'"}]},{name:"literal",value:"'NO_DATA'"}],required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"},{type:{name:"boolean"},name:"hasPendingUploads"}],return:{name:"void"}}},description:""}}};var U={exports:{}},Tr=U.exports,W;function hr(){return W||(W=1,(function(e,r){(function(n,t){e.exports=t()})(Tr,(function(){return function(n,t,a){var i=function(s,u){if(!u||!u.length||u.length===1&&!u[0]||u.length===1&&Array.isArray(u[0])&&!u[0].length)return null;var E;u.length===1&&u[0].length>0&&(u=u[0]),E=(u=u.filter((function(y){return y})))[0];for(var f=1;f<u.length;f+=1)u[f].isValid()&&!u[f][s](E)||(E=u[f]);return E};a.max=function(){var s=[].slice.call(arguments,0);return i("isAfter",s)},a.min=function(){var s=[].slice.call(arguments,0);return i("isBefore",s)}}}))})(U)),U.exports}var Ar=hr();const Rr=ve(Ar);x.extend(Rr);const Lr=18,Sr=3,kr=Lr*7+Sr,Or=(e,r)=>n=>{const t=x(n).startOf("day"),i=x(e).startOf("day").subtract(kr,"days");return x.max(i,t).isSame(t)?null:r.formatMessage({id:"TerminDokPanel.Validering.TerminBekreftelsedato.DuMåVæreIUke22"})},oe=({attachments:e,updateAttachments:r,omBarnet:n})=>{const t=B(),{control:a}=ge();return R.jsxs(R.Fragment,{children:[R.jsx(ye,{name:"terminbekreftelsedato",control:a,label:R.jsx(F,{id:"TerminDokPanel.Terminbekreftelsesdato"}),minDate:x(n.termindato).subtract(18,"week").subtract(3,"day").toDate(),maxDate:x().toDate(),validate:[Te(t.formatMessage({id:"TerminDokPanel.Validering.TerminbekreftelseDato.DuMåOppgi"})),he(t.formatMessage({id:"TerminDokPanel.Validering.TerminBekreftelsedato"})),Ae(t.formatMessage({id:"TerminDokPanel.Validering.TerminBekreftelsedato.MåVæreIdagEllerTidligere"})),Or(n.termindato,t)]}),R.jsx(J,{label:t.formatMessage({id:"TerminDokPanel.Vedlegg.Terminbekreftelse"}),description:R.jsx(F,{id:"TerminDokPanel.Vedlegg.Terminbekreftelse.Info"}),attachmentType:Z.TERMINBEKREFTELSE,skjemanummer:Q.TERMINBEKREFTELSE,existingAttachments:e,updateAttachments:r,uploadPath:q.sendVedlegg})]})};oe.__docgenInfo={description:"",methods:[],displayName:"TerminDokPanel",props:{attachments:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: InnsendingType;
    error?: AttachmentError;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: Array<ÅpenPeriodeDto>;
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Array<ÅpenPeriodeDto>",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"union",raw:"GenerelleErrorKoder | ProblemDetailsErrorKode | InternError",elements:[{name:"union",raw:"'TIMEOUT' | 'SERVER_ERROR'",elements:[{name:"literal",value:"'TIMEOUT'"},{name:"literal",value:"'SERVER_ERROR'"}]},{name:"union",raw:`| 'IKKE_TILGANG'
| 'DUPLIKAT_FORSENDELSE'
| 'MELLOMLAGRING'
| 'MELLOMLAGRING_VEDLEGG'
| 'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'
| 'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'
| 'KRYPTERING_MELLOMLAGRING'`,elements:[{name:"literal",value:"'IKKE_TILGANG'"},{name:"literal",value:"'DUPLIKAT_FORSENDELSE'"},{name:"literal",value:"'MELLOMLAGRING'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'"},{name:"literal",value:"'KRYPTERING_MELLOMLAGRING'"}]},{name:"literal",value:"'NO_DATA'"}],required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},updateAttachments:{required:!0,tsType:{name:"signature",type:"function",raw:"(attachments: Attachment[], hasPendingUploads: boolean) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: InnsendingType;
    error?: AttachmentError;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    arbeidsforhold?: ArbeidsforholdDto;
    perioder?: Array<ÅpenPeriodeDto>;
    type: DokumentererType;
}`,signature:{properties:[{key:"arbeidsforhold",value:{name:"intersection",raw:`(
    | ({
          type: 'frilanser';
      } & FrilanserDto)
    | ({
          type: 'privat';
      } & PrivatArbeidsgiverDto)
    | ({
          type: 'selvstendig';
      } & SelvstendigNæringsdrivendeDto)
    | ({
          type: 'virksomhet';
      } & VirksomhetDto)
) & {
    type: string;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Array<ÅpenPeriodeDto>",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"union",raw:"GenerelleErrorKoder | ProblemDetailsErrorKode | InternError",elements:[{name:"union",raw:"'TIMEOUT' | 'SERVER_ERROR'",elements:[{name:"literal",value:"'TIMEOUT'"},{name:"literal",value:"'SERVER_ERROR'"}]},{name:"union",raw:`| 'IKKE_TILGANG'
| 'DUPLIKAT_FORSENDELSE'
| 'MELLOMLAGRING'
| 'MELLOMLAGRING_VEDLEGG'
| 'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'
| 'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'
| 'KRYPTERING_MELLOMLAGRING'`,elements:[{name:"literal",value:"'IKKE_TILGANG'"},{name:"literal",value:"'DUPLIKAT_FORSENDELSE'"},{name:"literal",value:"'MELLOMLAGRING'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'"},{name:"literal",value:"'KRYPTERING_MELLOMLAGRING'"}]},{name:"literal",value:"'NO_DATA'"}],required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"},{type:{name:"boolean"},name:"hasPendingUploads"}],return:{name:"void"}}},description:""},omBarnet:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    erBarnetFødt: false;
    antallBarn: number;
    termindato: string;
}`,signature:{properties:[{key:"erBarnetFødt",value:{name:"literal",value:"false",required:!0}},{key:"antallBarn",value:{name:"number",required:!0}},{key:"termindato",value:{name:"string",required:!0}}]}},description:""}}};const Gr=({mellomlagreOgNaviger:e})=>{const r=B(),n=_e(),t=Pe(e),[a,i]=Re.useState(!1),s=z(K.DOKUMENTASJON),u=we(K.DOKUMENTASJON),E=be(z(K.OM_BARNET)),f=Me(E),y=xe(E),c=Le({defaultValues:s}),L=l=>l.vedlegg.length===0?(c.setError("vedlegg",{message:f?r.formatMessage({id:"DokumentasjonSteg.MinstEttDokumentAdopsjon"}):r.formatMessage({id:"DokumentasjonSteg.MinstEttDokumentTermin"})}),Promise.resolve()):(u(l),t.goToNextDefaultStep()),T=(l,v)=>{i(v),c.setValue("vedlegg",l,{shouldDirty:!0,shouldTouch:!0}),c.clearErrors("vedlegg")};return R.jsx(Se,{pageTitle:r.formatMessage({id:"Søknad.Pageheading"}),children:R.jsx(ke,{onStepChange:t.goToNextStep,steps:n,noFieldsRequired:!0,children:R.jsx(Oe,{formMethods:c,onSubmit:L,children:R.jsxs(Ge,{gap:"space-40",children:[R.jsx(De,{}),f&&R.jsx(se,{attachments:s?.vedlegg,updateAttachments:T}),y&&R.jsx(oe,{attachments:s?.vedlegg,updateAttachments:T,omBarnet:E}),R.jsx(Ie,{}),R.jsx(Ne,{onAvsluttOgSlett:t.avbrytSøknad,onFortsettSenere:t.fortsettSøknadSenere,goToPreviousStep:t.goToPreviousDefaultStep,saveDataOnPreviousClick:u,isDisabledAndLoading:a})]})})})})};Gr.__docgenInfo={description:"",methods:[],displayName:"DokumentasjonSteg",props:{mellomlagreOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{q as A,Gr as D,w as H,br as h,Pr as m,_r as p,wr as s};
