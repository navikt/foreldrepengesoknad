import{k as j,F as le,G as V,J as me,K as de,N as ce,O as pe,Q as fe,W as P,X as Ee,h as B,j as A,Y as J,M as F,g as ve,Z as ge,_ as ye,$ as Te,a0 as he,a1 as Re,D as x,r as Ae,a2 as Le,S as ke,a3 as Se,a4 as Oe,V as Ge,a5 as De,a6 as Ie,a7 as Ne}from"./iframe-NKDFzwRL.js";import{i as _e,j as Pe,k as z,C as K,l as we,n as be,e as Me,h as xe}from"./useEsNavigator-C64AuJ9E.js";import{S as Q,A as Z}from"./attachmentType-DJ1vFT-G.js";function qe(e){for(var n=[],r=0;r<e.length;){var t=e[r];if(t==="*"||t==="+"||t==="?"){n.push({type:"MODIFIER",index:r,value:e[r++]});continue}if(t==="\\"){n.push({type:"ESCAPED_CHAR",index:r++,value:e[r++]});continue}if(t==="{"){n.push({type:"OPEN",index:r,value:e[r++]});continue}if(t==="}"){n.push({type:"CLOSE",index:r,value:e[r++]});continue}if(t===":"){for(var a="",i=r+1;i<e.length;){var s=e.charCodeAt(i);if(s>=48&&s<=57||s>=65&&s<=90||s>=97&&s<=122||s===95){a+=e[i++];continue}break}if(!a)throw new TypeError("Missing parameter name at ".concat(r));n.push({type:"NAME",index:r,value:a}),r=i;continue}if(t==="("){var u=1,E="",i=r+1;if(e[i]==="?")throw new TypeError('Pattern cannot start with "?" at '.concat(i));for(;i<e.length;){if(e[i]==="\\"){E+=e[i++]+e[i++];continue}if(e[i]===")"){if(u--,u===0){i++;break}}else if(e[i]==="("&&(u++,e[i+1]!=="?"))throw new TypeError("Capturing groups are not allowed at ".concat(i));E+=e[i++]}if(u)throw new TypeError("Unbalanced pattern at ".concat(r));if(!E)throw new TypeError("Missing pattern at ".concat(r));n.push({type:"PATTERN",index:r,value:E}),r=i;continue}n.push({type:"CHAR",index:r,value:e[r++]})}return n.push({type:"END",index:r,value:""}),n}function Ue(e,n){n===void 0&&(n={});for(var r=qe(e),t=n.prefixes,a=t===void 0?"./":t,i=n.delimiter,s=i===void 0?"/#?":i,u=[],E=0,f=0,y="",c=function(R){if(f<r.length&&r[f].type===R)return r[f++].value},L=function(R){var g=c(R);if(g!==void 0)return g;var S=r[f],C=S.type,ue=S.index;throw new TypeError("Unexpected ".concat(C," at ").concat(ue,", expected ").concat(R))},T=function(){for(var R="",g;g=c("CHAR")||c("ESCAPED_CHAR");)R+=g;return R},l=function(R){for(var g=0,S=s;g<S.length;g++){var C=S[g];if(R.indexOf(C)>-1)return!0}return!1},v=function(R){var g=u[u.length-1],S=R||(g&&typeof g=="string"?g:"");if(g&&!S)throw new TypeError('Must have text between two parameters, missing text after "'.concat(g.name,'"'));return!S||l(S)?"[^".concat(_(s),"]+?"):"(?:(?!".concat(_(S),")[^").concat(_(s),"])+?")};f<r.length;){var o=c("CHAR"),p=c("NAME"),O=c("PATTERN");if(p||O){var m=o||"";a.indexOf(m)===-1&&(y+=m,m=""),y&&(u.push(y),y=""),u.push({name:p||E++,prefix:m,suffix:"",pattern:O||v(m),modifier:c("MODIFIER")||""});continue}var d=o||c("ESCAPED_CHAR");if(d){y+=d;continue}y&&(u.push(y),y="");var h=c("OPEN");if(h){var m=T(),k=c("NAME")||"",G=c("PATTERN")||"",D=T();L("CLOSE"),u.push({name:k||(G?E++:""),pattern:k&&!G?v(m):G,prefix:m,suffix:D,modifier:c("MODIFIER")||""});continue}L("END")}return u}function je(e,n){var r=[],t=ee(e,r,n);return Ce(t,r,n)}function Ce(e,n,r){r===void 0&&(r={});var t=r.decode,a=t===void 0?function(i){return i}:t;return function(i){var s=e.exec(i);if(!s)return!1;for(var u=s[0],E=s.index,f=Object.create(null),y=function(L){if(s[L]===void 0)return"continue";var T=n[L-1];T.modifier==="*"||T.modifier==="+"?f[T.name]=s[L].split(T.prefix+T.suffix).map(function(l){return a(l,T)}):f[T.name]=a(s[L],T)},c=1;c<s.length;c++)y(c);return{path:u,index:E,params:f}}}function _(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function X(e){return e&&e.sensitive?"":"i"}function Ke(e,n){if(!n)return e;for(var r=/\((?:\?<(.*?)>)?(?!\?)/g,t=0,a=r.exec(e.source);a;)n.push({name:a[1]||t++,prefix:"",suffix:"",modifier:"",pattern:""}),a=r.exec(e.source);return e}function Ve(e,n,r){var t=e.map(function(a){return ee(a,n,r).source});return new RegExp("(?:".concat(t.join("|"),")"),X(r))}function Fe(e,n,r){return Be(Ue(e,r),n,r)}function Be(e,n,r){r===void 0&&(r={});for(var t=r.strict,a=t===void 0?!1:t,i=r.start,s=i===void 0?!0:i,u=r.end,E=u===void 0?!0:u,f=r.encode,y=f===void 0?function(g){return g}:f,c=r.delimiter,L=c===void 0?"/#?":c,T=r.endsWith,l=T===void 0?"":T,v="[".concat(_(l),"]|$"),o="[".concat(_(L),"]"),p=s?"^":"",O=0,m=e;O<m.length;O++){var d=m[O];if(typeof d=="string")p+=_(y(d));else{var h=_(y(d.prefix)),k=_(y(d.suffix));if(d.pattern)if(n&&n.push(d),h||k)if(d.modifier==="+"||d.modifier==="*"){var G=d.modifier==="*"?"?":"";p+="(?:".concat(h,"((?:").concat(d.pattern,")(?:").concat(k).concat(h,"(?:").concat(d.pattern,"))*)").concat(k,")").concat(G)}else p+="(?:".concat(h,"(").concat(d.pattern,")").concat(k,")").concat(d.modifier);else{if(d.modifier==="+"||d.modifier==="*")throw new TypeError('Can not repeat "'.concat(d.name,'" without a prefix and suffix'));p+="(".concat(d.pattern,")").concat(d.modifier)}else p+="(?:".concat(h).concat(k,")").concat(d.modifier)}}if(E)a||(p+="".concat(o,"?")),p+=r.endsWith?"(?=".concat(v,")"):"$";else{var D=e[e.length-1],R=typeof D=="string"?o.indexOf(D[D.length-1])>-1:D===void 0;a||(p+="(?:".concat(o,"(?=").concat(v,"))?")),R||(p+="(?=".concat(o,"|").concat(v,")"))}return new RegExp(p,X(r))}function ee(e,n,r){return e instanceof RegExp?Ke(e,n):Array.isArray(e)?Ve(e,n,r):Fe(e,n,r)}new TextEncoder;function $e(e){try{return new URL(e),!0}catch{return!1}}function H(e,n){const t=Object.getOwnPropertySymbols(n).find(a=>a.description===e);if(t)return Reflect.get(n,t)}var M=class extends Response{static isConfigurableStatusCode(e){return e>=200&&e<=599}static isRedirectResponse(e){return M.STATUS_CODES_WITH_REDIRECT.includes(e)}static isResponseWithBody(e){return!M.STATUS_CODES_WITHOUT_BODY.includes(e)}static setUrl(e,n){if(!e||e==="about:"||!$e(e))return;const r=H("state",n);r?r.urlList.push(new URL(e)):Object.defineProperty(n,"url",{value:e,enumerable:!0,configurable:!0,writable:!1})}static parseRawHeaders(e){const n=new Headers;for(let r=0;r<e.length;r+=2)n.append(e[r],e[r+1]);return n}constructor(e,n={}){var r;const t=(r=n.status)!=null?r:200,a=M.isConfigurableStatusCode(t)?t:200,i=M.isResponseWithBody(t)?e:null;if(super(i,{status:a,statusText:n.statusText,headers:n.headers}),t!==a){const s=H("state",this);s?s.status=t:Object.defineProperty(this,"status",{value:t,enumerable:!0,configurable:!0,writable:!1})}M.setUrl(n.url,this)}},$=M;$.STATUS_CODES_WITHOUT_BODY=[101,103,204,205,304];$.STATUS_CODES_WITH_REDIRECT=[301,302,303,307,308];function ze(e,n=!0){return[n&&e.origin,e.pathname].filter(Boolean).join("")}var He=Object.create,ne=Object.defineProperty,Ye=Object.getOwnPropertyDescriptor,re=Object.getOwnPropertyNames,We=Object.getPrototypeOf,Je=Object.prototype.hasOwnProperty,Qe=(e,n)=>function(){return n||(0,e[re(e)[0]])((n={exports:{}}).exports,n),n.exports},Ze=(e,n,r,t)=>{if(n&&typeof n=="object"||typeof n=="function")for(let a of re(n))!Je.call(e,a)&&a!==r&&ne(e,a,{get:()=>n[a],enumerable:!(t=Ye(n,a))||t.enumerable});return e},Xe=(e,n,r)=>(r=e!=null?He(We(e)):{},Ze(ne(r,"default",{value:e,enumerable:!0}),e)),en=Qe({"node_modules/cookie/index.js"(e){e.parse=u,e.serialize=y;var n=Object.prototype.toString,r=Object.prototype.hasOwnProperty,t=/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/,a=/^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/,i=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,s=/^[\u0020-\u003A\u003D-\u007E]*$/;function u(l,v){if(typeof l!="string")throw new TypeError("argument str must be a string");var o={},p=l.length;if(p<2)return o;var O=v&&v.decode||c,m=0,d=0,h=0;do{if(d=l.indexOf("=",m),d===-1)break;if(h=l.indexOf(";",m),h===-1)h=p;else if(d>h){m=l.lastIndexOf(";",d-1)+1;continue}var k=E(l,m,d),G=f(l,d,k),D=l.slice(k,G);if(!r.call(o,D)){var R=E(l,d+1,h),g=f(l,h,R);l.charCodeAt(R)===34&&l.charCodeAt(g-1)===34&&(R++,g--);var S=l.slice(R,g);o[D]=T(S,O)}m=h+1}while(m<p);return o}function E(l,v,o){do{var p=l.charCodeAt(v);if(p!==32&&p!==9)return v}while(++v<o);return o}function f(l,v,o){for(;v>o;){var p=l.charCodeAt(--v);if(p!==32&&p!==9)return v+1}return o}function y(l,v,o){var p=o&&o.encode||encodeURIComponent;if(typeof p!="function")throw new TypeError("option encode is invalid");if(!t.test(l))throw new TypeError("argument name is invalid");var O=p(v);if(!a.test(O))throw new TypeError("argument val is invalid");var m=l+"="+O;if(!o)return m;if(o.maxAge!=null){var d=Math.floor(o.maxAge);if(!isFinite(d))throw new TypeError("option maxAge is invalid");m+="; Max-Age="+d}if(o.domain){if(!i.test(o.domain))throw new TypeError("option domain is invalid");m+="; Domain="+o.domain}if(o.path){if(!s.test(o.path))throw new TypeError("option path is invalid");m+="; Path="+o.path}if(o.expires){var h=o.expires;if(!L(h)||isNaN(h.valueOf()))throw new TypeError("option expires is invalid");m+="; Expires="+h.toUTCString()}if(o.httpOnly&&(m+="; HttpOnly"),o.secure&&(m+="; Secure"),o.partitioned&&(m+="; Partitioned"),o.priority){var k=typeof o.priority=="string"?o.priority.toLowerCase():o.priority;switch(k){case"low":m+="; Priority=Low";break;case"medium":m+="; Priority=Medium";break;case"high":m+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(o.sameSite){var G=typeof o.sameSite=="string"?o.sameSite.toLowerCase():o.sameSite;switch(G){case!0:m+="; SameSite=Strict";break;case"lax":m+="; SameSite=Lax";break;case"strict":m+="; SameSite=Strict";break;case"none":m+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return m}function c(l){return l.indexOf("%")!==-1?decodeURIComponent(l):l}function L(l){return n.call(l)==="[object Date]"}function T(l,v){try{return v(l)}catch{return l}}}}),nn=Xe(en()),te=nn.default;/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/const b="./",q={personInfo:`${b}/fpoversikt/api/person/info`,erOppdatert:`${b}/fpoversikt/api/saker/erOppdatert`,mellomlagring:`${b}/fpsoknad/api/storage/ENGANGSSTONAD`,status:`${b}/fpsoknad/api/soknad/status`,sendSøknad:`${b}/fpsoknad/api/soknad/engangsstonad`,sendVedlegg:`${b}/fpsoknad/api/storage/ENGANGSSTONAD/vedlegg`},Pn=()=>({queryKey:["PERSONINFO"],queryFn:()=>j.get(q.personInfo).json(),staleTime:1/0}),wn=()=>({queryKey:["MELLOMLAGRET_INFO"],queryFn:()=>j.get(q.mellomlagring).json(),staleTime:1/0}),bn=()=>({queryKey:["STATUS"],queryFn:async()=>{const e=await j.get(q.status).json();return e.saksnummer!==void 0?await j.get(q.erOppdatert).json()?e:{status:"PENDING"}:e},staleTime:1/0});function rn(){le(typeof URL<"u",V.formatMessage(`Global "URL" class is not defined. This likely means that you're running MSW in an environment that doesn't support all Node.js standard API (e.g. React Native). If that's the case, please use an appropriate polyfill for the "URL" class, like "react-native-url-polyfill".`))}function tn(e,n){return e.toLowerCase()===n.toLowerCase()}function an(e){return e<300?"#69AB32":e<400?"#F0BB4B":"#E95F5D"}async function sn(e){const r=await e.clone().text();return{url:new URL(e.url),method:e.method,headers:Object.fromEntries(e.headers.entries()),body:r}}const{message:on}=me;async function un(e){const n=e.clone(),r=await n.text(),t=n.status||200,a=n.statusText||on[t]||"OK";return{status:t,statusText:a,headers:Object.fromEntries(n.headers.entries()),body:r}}const ln=/[?|#].*$/g;function mn(e){return new URL(`/${e}`,"http://localhost").searchParams}function ae(e){return e.endsWith("?")?e:e.replace(ln,"")}function dn(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function cn(e,n){if(dn(e)||e.startsWith("*"))return e;const r=n||typeof location<"u"&&location.href;return r?decodeURI(new URL(encodeURI(e),r).href):e}function pn(e,n){if(e instanceof RegExp)return e;const r=cn(e,n);return ae(r)}function fn(e){return e.replace(/([:a-zA-Z_-]*)(\*{1,2})+/g,(n,r,t)=>{const a="(.*)";return r?r.startsWith(":")?`${r}${t}`:`${r}${a}`:a}).replace(/([^/])(:)(?=\d+)/,"$1\\$2").replace(/^([^/]+)(:)(?=\/\/)/,"$1\\$2")}function En(e,n,r){const t=pn(n,r),a=typeof t=="string"?fn(t):t,i=ze(e),s=je(a,{decode:decodeURIComponent})(i),u=s&&s.params||{};return{matches:s!==!1,params:u}}function ie(e){const n=te.parse(e),r={};for(const t in n)typeof n[t]<"u"&&(r[t]=n[t]);return r}function Y(){return ie(document.cookie)}function vn(e){if(typeof document>"u"||typeof location>"u")return{};switch(e.credentials){case"same-origin":{const n=new URL(e.url);return location.origin===n.origin?Y():{}}case"include":return Y();default:return{}}}function gn(e){const n=e.headers.get("cookie"),r=n?ie(n):{},t=vn(e);for(const s in t)e.headers.append("cookie",te.serialize(s,t[s]));const a=de.getCookies(e.url),i=Object.fromEntries(a.map(s=>[s.key,s.value]));for(const s of a)e.headers.append("cookie",s.toString());return{...t,...i,...r}}var N=(e=>(e.HEAD="HEAD",e.GET="GET",e.POST="POST",e.PUT="PUT",e.PATCH="PATCH",e.OPTIONS="OPTIONS",e.DELETE="DELETE",e))(N||{});class yn extends ce{constructor(n,r,t,a){const i=typeof r=="function"?"[custom predicate]":r;super({info:{header:`${n}${i?` ${i}`:""}`,path:r,method:n},resolver:t,options:a}),this.checkRedundantQueryParameters()}checkRedundantQueryParameters(){const{method:n,path:r}=this.info;if(!r||r instanceof RegExp||typeof r=="function"||ae(r)===r)return;mn(r).forEach((i,s)=>{}),V.warn(`Found a redundant usage of query parameters in the request handler URL for "${n} ${r}". Please match against a path instead and access query parameters using "new URL(request.url).searchParams" instead. Learn more: https://mswjs.io/docs/http/intercepting-requests#querysearch-parameters`)}async parse(n){const r=new URL(n.request.url),t=gn(n.request);if(typeof this.info.path=="function"){const i=await this.info.path({request:n.request,cookies:t});return{match:typeof i=="boolean"?{matches:i,params:{}}:i,cookies:t}}return{match:this.info.path?En(r,this.info.path,n.resolutionContext?.baseUrl):{matches:!1,params:{}},cookies:t}}async predicate(n){const r=this.matchMethod(n.request.method),t=n.parsedResult.match.matches;return r&&t}matchMethod(n){return this.info.method instanceof RegExp?this.info.method.test(n):tn(this.info.method,n)}extendResolverArgs(n){return{params:n.parsedResult.match?.params||{},cookies:n.parsedResult.cookies}}async log(n){const r=pe(n.request.url),t=await sn(n.request),a=await un(n.response),i=an(a.status);console.groupCollapsed(V.formatMessage(`${fe()} ${n.request.method} ${r} (%c${a.status} ${a.statusText}%c)`),`color:${i}`,"color:inherit"),console.log("Request",t),console.log("Handler:",this),console.log("Response",a),console.groupEnd()}}function I(e){return(n,r,t={})=>new yn(e,n,r,t)}const Mn={all:I(/.+/),head:I(N.HEAD),get:I(N.GET),post:I(N.POST),put:I(N.PUT),delete:I(N.DELETE),patch:I(N.PATCH),options:I(N.OPTIONS)},Tn=Symbol("bodyType");class w extends ${[Tn]=null;constructor(n,r){const t=P(r);super(n,t),Ee(this,t)}static error(){return super.error()}static text(n,r){const t=P(r);return t.headers.has("Content-Type")||t.headers.set("Content-Type","text/plain"),t.headers.has("Content-Length")||t.headers.set("Content-Length",n?new Blob([n]).size.toString():"0"),new w(n,t)}static json(n,r){const t=P(r);t.headers.has("Content-Type")||t.headers.set("Content-Type","application/json");const a=JSON.stringify(n);return t.headers.has("Content-Length")||t.headers.set("Content-Length",a?new Blob([a]).size.toString():"0"),new w(a,t)}static xml(n,r){const t=P(r);return t.headers.has("Content-Type")||t.headers.set("Content-Type","text/xml"),new w(n,t)}static html(n,r){const t=P(r);return t.headers.has("Content-Type")||t.headers.set("Content-Type","text/html"),new w(n,t)}static arrayBuffer(n,r){const t=P(r);return t.headers.has("Content-Type")||t.headers.set("Content-Type","application/octet-stream"),n&&!t.headers.has("Content-Length")&&t.headers.set("Content-Length",n.byteLength.toString()),new w(n,t)}static formData(n,r){return new w(n,P(r))}}rn();const se=({attachments:e,updateAttachments:n})=>{const r=B();return A.jsx(J,{label:r.formatMessage({id:"AdopsjonDokPanel.Vedlegg.Adopsjon"}),description:A.jsx(F,{id:"AdopsjonDokPanel.Veilederpanel.Text"}),attachmentType:Z.OMSORGSOVERTAKELSE,skjemanummer:Q.OMSORGSOVERTAKELSE,existingAttachments:e,updateAttachments:n,uploadPath:q.sendVedlegg})};se.__docgenInfo={description:"",methods:[],displayName:"AdopsjonDokPanel",props:{attachments:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    perioder?: ÅpenPeriodeDto[];
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
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"union",raw:"GenerelleErrorKoder | ProblemDetailsErrorKode | InternError",elements:[{name:"union",raw:"'TIMEOUT' | 'SERVER_ERROR'",elements:[{name:"literal",value:"'TIMEOUT'"},{name:"literal",value:"'SERVER_ERROR'"}]},{name:"union",raw:`| 'IKKE_TILGANG'
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
    perioder?: ÅpenPeriodeDto[];
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
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"union",raw:"GenerelleErrorKoder | ProblemDetailsErrorKode | InternError",elements:[{name:"union",raw:"'TIMEOUT' | 'SERVER_ERROR'",elements:[{name:"literal",value:"'TIMEOUT'"},{name:"literal",value:"'SERVER_ERROR'"}]},{name:"union",raw:`| 'IKKE_TILGANG'
| 'DUPLIKAT_FORSENDELSE'
| 'MELLOMLAGRING'
| 'MELLOMLAGRING_VEDLEGG'
| 'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'
| 'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'
| 'KRYPTERING_MELLOMLAGRING'`,elements:[{name:"literal",value:"'IKKE_TILGANG'"},{name:"literal",value:"'DUPLIKAT_FORSENDELSE'"},{name:"literal",value:"'MELLOMLAGRING'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'"},{name:"literal",value:"'KRYPTERING_MELLOMLAGRING'"}]},{name:"literal",value:"'NO_DATA'"}],required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"},{type:{name:"boolean"},name:"hasPendingUploads"}],return:{name:"void"}}},description:""}}};var U={exports:{}},hn=U.exports,W;function Rn(){return W||(W=1,(function(e,n){(function(r,t){e.exports=t()})(hn,(function(){return function(r,t,a){var i=function(s,u){if(!u||!u.length||u.length===1&&!u[0]||u.length===1&&Array.isArray(u[0])&&!u[0].length)return null;var E;u.length===1&&u[0].length>0&&(u=u[0]),E=(u=u.filter((function(y){return y})))[0];for(var f=1;f<u.length;f+=1)u[f].isValid()&&!u[f][s](E)||(E=u[f]);return E};a.max=function(){var s=[].slice.call(arguments,0);return i("isAfter",s)},a.min=function(){var s=[].slice.call(arguments,0);return i("isBefore",s)}}}))})(U)),U.exports}var An=Rn();const Ln=ve(An);x.extend(Ln);const kn=18,Sn=3,On=kn*7+Sn,Gn=(e,n)=>r=>{const t=x(r).startOf("day"),i=x(e).startOf("day").subtract(On,"days");return x.max(i,t).isSame(t)?null:n.formatMessage({id:"TerminDokPanel.Validering.TerminBekreftelsedato.DuMåVæreIUke22"})},oe=({attachments:e,updateAttachments:n,omBarnet:r})=>{const t=B(),{control:a}=ge();return A.jsxs(A.Fragment,{children:[A.jsx(ye,{name:"terminbekreftelsedato",control:a,label:A.jsx(F,{id:"TerminDokPanel.Terminbekreftelsesdato"}),minDate:x(r.termindato).subtract(18,"week").subtract(3,"day").toDate(),maxDate:x().toDate(),validate:[Te(t.formatMessage({id:"TerminDokPanel.Validering.TerminbekreftelseDato.DuMåOppgi"})),he(t.formatMessage({id:"TerminDokPanel.Validering.TerminBekreftelsedato"})),Re(t.formatMessage({id:"TerminDokPanel.Validering.TerminBekreftelsedato.MåVæreIdagEllerTidligere"})),Gn(r.termindato,t)]}),A.jsx(J,{label:t.formatMessage({id:"TerminDokPanel.Vedlegg.Terminbekreftelse"}),description:A.jsx(F,{id:"TerminDokPanel.Vedlegg.Terminbekreftelse.Info"}),attachmentType:Z.TERMINBEKREFTELSE,skjemanummer:Q.TERMINBEKREFTELSE,existingAttachments:e,updateAttachments:n,uploadPath:q.sendVedlegg})]})};oe.__docgenInfo={description:"",methods:[],displayName:"TerminDokPanel",props:{attachments:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
    perioder?: ÅpenPeriodeDto[];
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
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"union",raw:"GenerelleErrorKoder | ProblemDetailsErrorKode | InternError",elements:[{name:"union",raw:"'TIMEOUT' | 'SERVER_ERROR'",elements:[{name:"literal",value:"'TIMEOUT'"},{name:"literal",value:"'SERVER_ERROR'"}]},{name:"union",raw:`| 'IKKE_TILGANG'
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
    perioder?: ÅpenPeriodeDto[];
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
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}},{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"union",raw:"GenerelleErrorKoder | ProblemDetailsErrorKode | InternError",elements:[{name:"union",raw:"'TIMEOUT' | 'SERVER_ERROR'",elements:[{name:"literal",value:"'TIMEOUT'"},{name:"literal",value:"'SERVER_ERROR'"}]},{name:"union",raw:`| 'IKKE_TILGANG'
| 'DUPLIKAT_FORSENDELSE'
| 'MELLOMLAGRING'
| 'MELLOMLAGRING_VEDLEGG'
| 'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'
| 'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'
| 'KRYPTERING_MELLOMLAGRING'`,elements:[{name:"literal",value:"'IKKE_TILGANG'"},{name:"literal",value:"'DUPLIKAT_FORSENDELSE'"},{name:"literal",value:"'MELLOMLAGRING'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'"},{name:"literal",value:"'KRYPTERING_MELLOMLAGRING'"}]},{name:"literal",value:"'NO_DATA'"}],required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"},{type:{name:"boolean"},name:"hasPendingUploads"}],return:{name:"void"}}},description:""},omBarnet:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    erBarnetFødt: false;
    antallBarn: number;
    termindato: string;
}`,signature:{properties:[{key:"erBarnetFødt",value:{name:"literal",value:"false",required:!0}},{key:"antallBarn",value:{name:"number",required:!0}},{key:"termindato",value:{name:"string",required:!0}}]}},description:""}}};const Dn=({mellomlagreOgNaviger:e})=>{const n=B(),r=_e(),t=Pe(e),[a,i]=Ae.useState(!1),s=z(K.DOKUMENTASJON),u=we(K.DOKUMENTASJON),E=be(z(K.OM_BARNET)),f=Me(E),y=xe(E),c=Le({defaultValues:s}),L=l=>l.vedlegg.length===0?(c.setError("vedlegg",{message:f?n.formatMessage({id:"DokumentasjonSteg.MinstEttDokumentAdopsjon"}):n.formatMessage({id:"DokumentasjonSteg.MinstEttDokumentTermin"})}),Promise.resolve()):(u(l),t.goToNextDefaultStep()),T=(l,v)=>{i(v),c.setValue("vedlegg",l,{shouldDirty:!0,shouldTouch:!0}),c.clearErrors("vedlegg")};return A.jsx(ke,{pageTitle:n.formatMessage({id:"Søknad.Pageheading"}),children:A.jsx(Se,{onStepChange:void 0,steps:r,noFieldsRequired:!0,children:A.jsx(Oe,{formMethods:c,onSubmit:L,children:A.jsxs(Ge,{gap:"space-40",children:[A.jsx(De,{}),f&&A.jsx(se,{attachments:s?.vedlegg,updateAttachments:T}),y&&A.jsx(oe,{attachments:s?.vedlegg,updateAttachments:T,omBarnet:E}),A.jsx(Ie,{}),A.jsx(Ne,{onAvsluttOgSlett:t.avbrytSøknad,onFortsettSenere:t.fortsettSøknadSenere,goToPreviousStep:t.goToPreviousDefaultStep,saveDataOnPreviousClick:u,isDisabledAndLoading:a})]})})})})};Dn.__docgenInfo={description:"",methods:[],displayName:"DokumentasjonSteg",props:{mellomlagreOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{q as A,Dn as D,w as H,Mn as h,wn as m,Pn as p,bn as s};
