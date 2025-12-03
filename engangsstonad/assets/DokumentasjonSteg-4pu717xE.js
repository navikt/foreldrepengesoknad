import{F as me,G as de,J as ce,K as V,N as pe,O as fe,k as j,Q as Ee,W as P,X as ge,h as B,j as A,Y as Q,M as F,g as ve,Z as ye,_ as Te,$ as he,a0 as Ae,a1 as Re,D as x,r as Le,a2 as ke,S as Se,a3 as Oe,a4 as Ge,V as Ie,a5 as De,a6 as Ne,a7 as _e}from"./iframe-DR5yN_zT.js";import{i as Pe,j as be,k as z,C as K,l as Me,n as we,e as xe,h as qe}from"./useEsNavigator-CwEdPwT6.js";import{S as X,A as Z}from"./attachmentType-DJ1vFT-G.js";function Ue(e,n){return e.toLowerCase()===n.toLowerCase()}function je(e){return e<300?"#69AB32":e<400?"#F0BB4B":"#E95F5D"}async function Ce(e){const r=await e.clone().text();return{url:new URL(e.url),method:e.method,headers:Object.fromEntries(e.headers.entries()),body:r}}const{message:Ke}=me;async function Ve(e){const n=e.clone(),r=await n.text(),t=n.status||200,a=n.statusText||Ke[t]||"OK";return{status:t,statusText:a,headers:Object.fromEntries(n.headers.entries()),body:r}}function Fe(e){for(var n=[],r=0;r<e.length;){var t=e[r];if(t==="*"||t==="+"||t==="?"){n.push({type:"MODIFIER",index:r,value:e[r++]});continue}if(t==="\\"){n.push({type:"ESCAPED_CHAR",index:r++,value:e[r++]});continue}if(t==="{"){n.push({type:"OPEN",index:r,value:e[r++]});continue}if(t==="}"){n.push({type:"CLOSE",index:r,value:e[r++]});continue}if(t===":"){for(var a="",i=r+1;i<e.length;){var o=e.charCodeAt(i);if(o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122||o===95){a+=e[i++];continue}break}if(!a)throw new TypeError("Missing parameter name at ".concat(r));n.push({type:"NAME",index:r,value:a}),r=i;continue}if(t==="("){var l=1,E="",i=r+1;if(e[i]==="?")throw new TypeError('Pattern cannot start with "?" at '.concat(i));for(;i<e.length;){if(e[i]==="\\"){E+=e[i++]+e[i++];continue}if(e[i]===")"){if(l--,l===0){i++;break}}else if(e[i]==="("&&(l++,e[i+1]!=="?"))throw new TypeError("Capturing groups are not allowed at ".concat(i));E+=e[i++]}if(l)throw new TypeError("Unbalanced pattern at ".concat(r));if(!E)throw new TypeError("Missing pattern at ".concat(r));n.push({type:"PATTERN",index:r,value:E}),r=i;continue}n.push({type:"CHAR",index:r,value:e[r++]})}return n.push({type:"END",index:r,value:""}),n}function Be(e,n){n===void 0&&(n={});for(var r=Fe(e),t=n.prefixes,a=t===void 0?"./":t,i=n.delimiter,o=i===void 0?"/#?":i,l=[],E=0,p=0,g="",d=function(R){if(p<r.length&&r[p].type===R)return r[p++].value},L=function(R){var T=d(R);if(T!==void 0)return T;var S=r[p],C=S.type,le=S.index;throw new TypeError("Unexpected ".concat(C," at ").concat(le,", expected ").concat(R))},u=function(){for(var R="",T;T=d("CHAR")||d("ESCAPED_CHAR");)R+=T;return R},f=function(R){for(var T=0,S=o;T<S.length;T++){var C=S[T];if(R.indexOf(C)>-1)return!0}return!1},s=function(R){var T=l[l.length-1],S=R||(T&&typeof T=="string"?T:"");if(T&&!S)throw new TypeError('Must have text between two parameters, missing text after "'.concat(T.name,'"'));return!S||f(S)?"[^".concat(N(o),"]+?"):"(?:(?!".concat(N(S),")[^").concat(N(o),"])+?")};p<r.length;){var y=d("CHAR"),h=d("NAME"),m=d("PATTERN");if(h||m){var v=y||"";a.indexOf(v)===-1&&(g+=v,v=""),g&&(l.push(g),g=""),l.push({name:h||E++,prefix:v,suffix:"",pattern:m||s(v),modifier:d("MODIFIER")||""});continue}var c=y||d("ESCAPED_CHAR");if(c){g+=c;continue}g&&(l.push(g),g="");var k=d("OPEN");if(k){var v=u(),O=d("NAME")||"",_=d("PATTERN")||"",G=u();L("CLOSE"),l.push({name:O||(_?E++:""),pattern:O&&!_?s(v):_,prefix:v,suffix:G,modifier:d("MODIFIER")||""});continue}L("END")}return l}function $e(e,n){var r=[],t=ne(e,r,n);return ze(t,r,n)}function ze(e,n,r){r===void 0&&(r={});var t=r.decode,a=t===void 0?function(i){return i}:t;return function(i){var o=e.exec(i);if(!o)return!1;for(var l=o[0],E=o.index,p=Object.create(null),g=function(L){if(o[L]===void 0)return"continue";var u=n[L-1];u.modifier==="*"||u.modifier==="+"?p[u.name]=o[L].split(u.prefix+u.suffix).map(function(f){return a(f,u)}):p[u.name]=a(o[L],u)},d=1;d<o.length;d++)g(d);return{path:l,index:E,params:p}}}function N(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function ee(e){return e&&e.sensitive?"":"i"}function He(e,n){if(!n)return e;for(var r=/\((?:\?<(.*?)>)?(?!\?)/g,t=0,a=r.exec(e.source);a;)n.push({name:a[1]||t++,prefix:"",suffix:"",modifier:"",pattern:""}),a=r.exec(e.source);return e}function Ye(e,n,r){var t=e.map(function(a){return ne(a,n,r).source});return new RegExp("(?:".concat(t.join("|"),")"),ee(r))}function We(e,n,r){return Je(Be(e,r),n,r)}function Je(e,n,r){r===void 0&&(r={});for(var t=r.strict,a=t===void 0?!1:t,i=r.start,o=i===void 0?!0:i,l=r.end,E=l===void 0?!0:l,p=r.encode,g=p===void 0?function(T){return T}:p,d=r.delimiter,L=d===void 0?"/#?":d,u=r.endsWith,f=u===void 0?"":u,s="[".concat(N(f),"]|$"),y="[".concat(N(L),"]"),h=o?"^":"",m=0,v=e;m<v.length;m++){var c=v[m];if(typeof c=="string")h+=N(g(c));else{var k=N(g(c.prefix)),O=N(g(c.suffix));if(c.pattern)if(n&&n.push(c),k||O)if(c.modifier==="+"||c.modifier==="*"){var _=c.modifier==="*"?"?":"";h+="(?:".concat(k,"((?:").concat(c.pattern,")(?:").concat(O).concat(k,"(?:").concat(c.pattern,"))*)").concat(O,")").concat(_)}else h+="(?:".concat(k,"(").concat(c.pattern,")").concat(O,")").concat(c.modifier);else{if(c.modifier==="+"||c.modifier==="*")throw new TypeError('Can not repeat "'.concat(c.name,'" without a prefix and suffix'));h+="(".concat(c.pattern,")").concat(c.modifier)}else h+="(?:".concat(k).concat(O,")").concat(c.modifier)}}if(E)a||(h+="".concat(y,"?")),h+=r.endsWith?"(?=".concat(s,")"):"$";else{var G=e[e.length-1],R=typeof G=="string"?y.indexOf(G[G.length-1])>-1:G===void 0;a||(h+="(?:".concat(y,"(?=").concat(s,"))?")),R||(h+="(?=".concat(y,"|").concat(s,")"))}return new RegExp(h,ee(r))}function ne(e,n,r){return e instanceof RegExp?He(e,n):Array.isArray(e)?Ye(e,n,r):We(e,n,r)}new TextEncoder;function Qe(e){try{return new URL(e),!0}catch{return!1}}function H(e,n){const t=Object.getOwnPropertySymbols(n).find(a=>a.description===e);if(t)return Reflect.get(n,t)}var w=class extends Response{static isConfigurableStatusCode(e){return e>=200&&e<=599}static isRedirectResponse(e){return w.STATUS_CODES_WITH_REDIRECT.includes(e)}static isResponseWithBody(e){return!w.STATUS_CODES_WITHOUT_BODY.includes(e)}static setUrl(e,n){if(!e||e==="about:"||!Qe(e))return;const r=H("state",n);r?r.urlList.push(new URL(e)):Object.defineProperty(n,"url",{value:e,enumerable:!0,configurable:!0,writable:!1})}static parseRawHeaders(e){const n=new Headers;for(let r=0;r<e.length;r+=2)n.append(e[r],e[r+1]);return n}constructor(e,n={}){var r;const t=(r=n.status)!=null?r:200,a=w.isConfigurableStatusCode(t)?t:200,i=w.isResponseWithBody(t)?e:null;if(super(i,{status:a,statusText:n.statusText,headers:n.headers}),t!==a){const o=H("state",this);o?o.status=t:Object.defineProperty(this,"status",{value:t,enumerable:!0,configurable:!0,writable:!1})}w.setUrl(n.url,this)}},$=w;$.STATUS_CODES_WITHOUT_BODY=[101,103,204,205,304];$.STATUS_CODES_WITH_REDIRECT=[301,302,303,307,308];function Xe(e,n=!0){return[n&&e.origin,e.pathname].filter(Boolean).join("")}const Ze=/[?|#].*$/g;function re(e){return e.endsWith("?")?e:e.replace(Ze,"")}function en(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function nn(e,n){if(en(e)||e.startsWith("*"))return e;const r=n||typeof location<"u"&&location.href;return r?decodeURI(new URL(encodeURI(e),r).href):e}function rn(e,n){if(e instanceof RegExp)return e;const r=nn(e,n);return re(r)}function tn(e){return e.replace(/([:a-zA-Z_-]*)(\*{1,2})+/g,(n,r,t)=>{const a="(.*)";return r?r.startsWith(":")?`${r}${t}`:`${r}${a}`:a}).replace(/([^/])(:)(?=\d+)/,"$1\\$2").replace(/^([^/]+)(:)(?=\/\/)/,"$1\\$2")}function an(e,n,r){const t=rn(n,r),a=typeof t=="string"?tn(t):t,i=Xe(e),o=$e(a,{decode:decodeURIComponent})(i),l=o&&o.params||{};return{matches:o!==!1,params:l}}var sn=Object.create,te=Object.defineProperty,on=Object.getOwnPropertyDescriptor,ae=Object.getOwnPropertyNames,un=Object.getPrototypeOf,ln=Object.prototype.hasOwnProperty,mn=(e,n)=>function(){return n||(0,e[ae(e)[0]])((n={exports:{}}).exports,n),n.exports},dn=(e,n,r,t)=>{if(n&&typeof n=="object"||typeof n=="function")for(let a of ae(n))!ln.call(e,a)&&a!==r&&te(e,a,{get:()=>n[a],enumerable:!(t=on(n,a))||t.enumerable});return e},cn=(e,n,r)=>(r=e!=null?sn(un(e)):{},dn(te(r,"default",{value:e,enumerable:!0}),e)),pn=mn({"node_modules/.pnpm/cookie@1.0.2/node_modules/cookie/dist/index.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.parse=l,e.serialize=g;var n=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,r=/^[\u0021-\u003A\u003C-\u007E]*$/,t=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,a=/^[\u0020-\u003A\u003D-\u007E]*$/,i=Object.prototype.toString,o=(()=>{const u=function(){};return u.prototype=Object.create(null),u})();function l(u,f){const s=new o,y=u.length;if(y<2)return s;const h=f?.decode||d;let m=0;do{const v=u.indexOf("=",m);if(v===-1)break;const c=u.indexOf(";",m),k=c===-1?y:c;if(v>k){m=u.lastIndexOf(";",v-1)+1;continue}const O=E(u,m,v),_=p(u,v,O),G=u.slice(O,_);if(s[G]===void 0){let R=E(u,v+1,k),T=p(u,k,R);const S=h(u.slice(R,T));s[G]=S}m=k+1}while(m<y);return s}function E(u,f,s){do{const y=u.charCodeAt(f);if(y!==32&&y!==9)return f}while(++f<s);return s}function p(u,f,s){for(;f>s;){const y=u.charCodeAt(--f);if(y!==32&&y!==9)return f+1}return s}function g(u,f,s){const y=s?.encode||encodeURIComponent;if(!n.test(u))throw new TypeError(`argument name is invalid: ${u}`);const h=y(f);if(!r.test(h))throw new TypeError(`argument val is invalid: ${f}`);let m=u+"="+h;if(!s)return m;if(s.maxAge!==void 0){if(!Number.isInteger(s.maxAge))throw new TypeError(`option maxAge is invalid: ${s.maxAge}`);m+="; Max-Age="+s.maxAge}if(s.domain){if(!t.test(s.domain))throw new TypeError(`option domain is invalid: ${s.domain}`);m+="; Domain="+s.domain}if(s.path){if(!a.test(s.path))throw new TypeError(`option path is invalid: ${s.path}`);m+="; Path="+s.path}if(s.expires){if(!L(s.expires)||!Number.isFinite(s.expires.valueOf()))throw new TypeError(`option expires is invalid: ${s.expires}`);m+="; Expires="+s.expires.toUTCString()}if(s.httpOnly&&(m+="; HttpOnly"),s.secure&&(m+="; Secure"),s.partitioned&&(m+="; Partitioned"),s.priority)switch(typeof s.priority=="string"?s.priority.toLowerCase():void 0){case"low":m+="; Priority=Low";break;case"medium":m+="; Priority=Medium";break;case"high":m+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${s.priority}`)}if(s.sameSite)switch(typeof s.sameSite=="string"?s.sameSite.toLowerCase():s.sameSite){case!0:case"strict":m+="; SameSite=Strict";break;case"lax":m+="; SameSite=Lax";break;case"none":m+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${s.sameSite}`)}return m}function d(u){if(u.indexOf("%")===-1)return u;try{return decodeURIComponent(u)}catch{return u}}function L(u){return i.call(u)==="[object Date]"}}}),Y=cn(pn()),ie=Y.default||Y,fn=ie.parse,En=ie.serialize;function se(e){const n=fn(e),r={};for(const t in n)typeof n[t]<"u"&&(r[t]=n[t]);return r}function W(){return se(document.cookie)}function gn(e){if(typeof document>"u"||typeof location>"u")return{};switch(e.credentials){case"same-origin":{const n=new URL(e.url);return location.origin===n.origin?W():{}}case"include":return W();default:return{}}}function vn(e){const n=e.headers.get("cookie"),r=n?se(n):{},t=gn(e);for(const o in t)e.headers.append("cookie",En(o,t[o]));const a=de.getCookies(e.url),i=Object.fromEntries(a.map(o=>[o.key,o.value]));for(const o of a)e.headers.append("cookie",o.toString());return{...t,...i,...r}}var D=(e=>(e.HEAD="HEAD",e.GET="GET",e.POST="POST",e.PUT="PUT",e.PATCH="PATCH",e.OPTIONS="OPTIONS",e.DELETE="DELETE",e))(D||{});class yn extends ce{constructor(n,r,t,a){const i=typeof r=="function"?"[custom predicate]":r;super({info:{header:`${n}${i?` ${i}`:""}`,path:r,method:n},resolver:t,options:a}),this.checkRedundantQueryParameters()}checkRedundantQueryParameters(){const{method:n,path:r}=this.info;!r||r instanceof RegExp||typeof r=="function"||re(r)===r||V.warn(`Found a redundant usage of query parameters in the request handler URL for "${n} ${r}". Please match against a path instead and access query parameters using "new URL(request.url).searchParams" instead. Learn more: https://mswjs.io/docs/http/intercepting-requests#querysearch-parameters`)}async parse(n){const r=new URL(n.request.url),t=vn(n.request);if(typeof this.info.path=="function"){const i=await this.info.path({request:n.request,cookies:t});return{match:typeof i=="boolean"?{matches:i,params:{}}:i,cookies:t}}return{match:this.info.path?an(r,this.info.path,n.resolutionContext?.baseUrl):{matches:!1,params:{}},cookies:t}}async predicate(n){const r=this.matchMethod(n.request.method),t=n.parsedResult.match.matches;return r&&t}matchMethod(n){return this.info.method instanceof RegExp?this.info.method.test(n):Ue(this.info.method,n)}extendResolverArgs(n){return{params:n.parsedResult.match?.params||{},cookies:n.parsedResult.cookies}}async log(n){const r=pe(n.request.url),t=await Ce(n.request),a=await Ve(n.response),i=je(a.status);console.groupCollapsed(V.formatMessage(`${fe()} ${n.request.method} ${r} (%c${a.status} ${a.statusText}%c)`),`color:${i}`,"color:inherit"),console.log("Request",t),console.log("Handler:",this),console.log("Response",a),console.groupEnd()}}function I(e){return(n,r,t={})=>new yn(e,n,r,t)}const bn={all:I(/.+/),head:I(D.HEAD),get:I(D.GET),post:I(D.POST),put:I(D.PUT),delete:I(D.DELETE),patch:I(D.PATCH),options:I(D.OPTIONS)},M="./",q={personInfo:`${M}/fpoversikt/api/person/info`,erOppdatert:`${M}/fpoversikt/api/saker/erOppdatert`,mellomlagring:`${M}/fpsoknad/api/storage/ENGANGSSTONAD`,status:`${M}/fpsoknad/api/soknad/status`,sendSøknad:`${M}/fpsoknad/api/soknad/engangsstonad`,sendVedlegg:`${M}/fpsoknad/api/storage/ENGANGSSTONAD/vedlegg`},Mn=()=>({queryKey:["PERSONINFO"],queryFn:()=>j.get(q.personInfo).json(),staleTime:1/0}),wn=()=>({queryKey:["MELLOMLAGRET_INFO"],queryFn:()=>j.get(q.mellomlagring).json(),staleTime:1/0}),xn=()=>({queryKey:["STATUS"],queryFn:async()=>{const e=await j.get(q.status).json();return e.saksnummer!==void 0?await j.get(q.erOppdatert).json()?e:{status:"PENDING"}:e},staleTime:1/0});function Tn(){Ee(typeof URL<"u",V.formatMessage(`Global "URL" class is not defined. This likely means that you're running MSW in an environment that doesn't support all Node.js standard API (e.g. React Native). If that's the case, please use an appropriate polyfill for the "URL" class, like "react-native-url-polyfill".`))}const hn=Symbol("bodyType");class b extends ${[hn]=null;constructor(n,r){const t=P(r);super(n,t),ge(this,t)}static error(){return super.error()}static text(n,r){const t=P(r);return t.headers.has("Content-Type")||t.headers.set("Content-Type","text/plain"),t.headers.has("Content-Length")||t.headers.set("Content-Length",n?new Blob([n]).size.toString():"0"),new b(n,t)}static json(n,r){const t=P(r);t.headers.has("Content-Type")||t.headers.set("Content-Type","application/json");const a=JSON.stringify(n);return t.headers.has("Content-Length")||t.headers.set("Content-Length",a?new Blob([a]).size.toString():"0"),new b(a,t)}static xml(n,r){const t=P(r);return t.headers.has("Content-Type")||t.headers.set("Content-Type","text/xml"),new b(n,t)}static html(n,r){const t=P(r);return t.headers.has("Content-Type")||t.headers.set("Content-Type","text/html"),new b(n,t)}static arrayBuffer(n,r){const t=P(r);return t.headers.has("Content-Type")||t.headers.set("Content-Type","application/octet-stream"),n&&!t.headers.has("Content-Length")&&t.headers.set("Content-Length",n.byteLength.toString()),new b(n,t)}static formData(n,r){return new b(n,P(r))}}Tn();const oe=({attachments:e,updateAttachments:n})=>{const r=B();return A.jsx(Q,{label:r.formatMessage({id:"AdopsjonDokPanel.Vedlegg.Adopsjon"}),description:A.jsx(F,{id:"AdopsjonDokPanel.Veilederpanel.Text"}),attachmentType:Z.OMSORGSOVERTAKELSE,skjemanummer:X.OMSORGSOVERTAKELSE,existingAttachments:e,updateAttachments:n,uploadPath:q.sendVedlegg})};oe.__docgenInfo={description:"",methods:[],displayName:"AdopsjonDokPanel",props:{attachments:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| 'KRYPTERING_MELLOMLAGRING'`,elements:[{name:"literal",value:"'IKKE_TILGANG'"},{name:"literal",value:"'DUPLIKAT_FORSENDELSE'"},{name:"literal",value:"'MELLOMLAGRING'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT'"},{name:"literal",value:"'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET'"},{name:"literal",value:"'KRYPTERING_MELLOMLAGRING'"}]},{name:"literal",value:"'NO_DATA'"}],required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},name:"attachments"},{type:{name:"boolean"},name:"hasPendingUploads"}],return:{name:"void"}}},description:""}}};var U={exports:{}},An=U.exports,J;function Rn(){return J||(J=1,(function(e,n){(function(r,t){e.exports=t()})(An,(function(){return function(r,t,a){var i=function(o,l){if(!l||!l.length||l.length===1&&!l[0]||l.length===1&&Array.isArray(l[0])&&!l[0].length)return null;var E;l.length===1&&l[0].length>0&&(l=l[0]),E=(l=l.filter((function(g){return g})))[0];for(var p=1;p<l.length;p+=1)l[p].isValid()&&!l[p][o](E)||(E=l[p]);return E};a.max=function(){var o=[].slice.call(arguments,0);return i("isAfter",o)},a.min=function(){var o=[].slice.call(arguments,0);return i("isBefore",o)}}}))})(U)),U.exports}var Ln=Rn();const kn=ve(Ln);x.extend(kn);const Sn=18,On=3,Gn=Sn*7+On,In=(e,n)=>r=>{const t=x(r).startOf("day"),i=x(e).startOf("day").subtract(Gn,"days");return x.max(i,t).isSame(t)?null:n.formatMessage({id:"TerminDokPanel.Validering.TerminBekreftelsedato.DuMåVæreIUke22"})},ue=({attachments:e,updateAttachments:n,omBarnet:r})=>{const t=B(),{control:a}=ye();return A.jsxs(A.Fragment,{children:[A.jsx(Te,{name:"terminbekreftelsedato",control:a,label:A.jsx(F,{id:"TerminDokPanel.Terminbekreftelsesdato"}),minDate:x(r.termindato).subtract(18,"week").subtract(3,"day").toDate(),maxDate:x().toDate(),validate:[he(t.formatMessage({id:"TerminDokPanel.Validering.TerminbekreftelseDato.DuMåOppgi"})),Ae(t.formatMessage({id:"TerminDokPanel.Validering.TerminBekreftelsedato"})),Re(t.formatMessage({id:"TerminDokPanel.Validering.TerminBekreftelsedato.MåVæreIdagEllerTidligere"})),In(r.termindato,t)]}),A.jsx(Q,{label:t.formatMessage({id:"TerminDokPanel.Vedlegg.Terminbekreftelse"}),description:A.jsx(F,{id:"TerminDokPanel.Vedlegg.Terminbekreftelse.Info"}),attachmentType:Z.TERMINBEKREFTELSE,skjemanummer:X.TERMINBEKREFTELSE,existingAttachments:e,updateAttachments:n,uploadPath:q.sendVedlegg})]})};ue.__docgenInfo={description:"",methods:[],displayName:"TerminDokPanel",props:{attachments:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erBarnetFødt",value:{name:"literal",value:"false",required:!0}},{key:"antallBarn",value:{name:"number",required:!0}},{key:"termindato",value:{name:"string",required:!0}}]}},description:""}}};const Dn=({mellomlagreOgNaviger:e})=>{const n=B(),r=Pe(),t=be(e),[a,i]=Le.useState(!1),o=z(K.DOKUMENTASJON),l=Me(K.DOKUMENTASJON),E=we(z(K.OM_BARNET)),p=xe(E),g=qe(E),d=ke({defaultValues:o}),L=f=>f.vedlegg.length===0?(d.setError("vedlegg",{message:p?n.formatMessage({id:"DokumentasjonSteg.MinstEttDokumentAdopsjon"}):n.formatMessage({id:"DokumentasjonSteg.MinstEttDokumentTermin"})}),Promise.resolve()):(l(f),t.goToNextDefaultStep()),u=(f,s)=>{i(s),d.setValue("vedlegg",f,{shouldDirty:!0,shouldTouch:!0}),d.clearErrors("vedlegg")};return A.jsx(Se,{pageTitle:n.formatMessage({id:"Søknad.Pageheading"}),children:A.jsx(Oe,{onStepChange:void 0,steps:r,noFieldsRequired:!0,children:A.jsx(Ge,{formMethods:d,onSubmit:L,children:A.jsxs(Ie,{gap:"space-40",children:[A.jsx(De,{}),p&&A.jsx(oe,{attachments:o?.vedlegg,updateAttachments:u}),g&&A.jsx(ue,{attachments:o?.vedlegg,updateAttachments:u,omBarnet:E}),A.jsx(Ne,{}),A.jsx(_e,{onAvsluttOgSlett:t.avbrytSøknad,onFortsettSenere:t.fortsettSøknadSenere,goToPreviousStep:t.goToPreviousDefaultStep,saveDataOnPreviousClick:l,isDisabledAndLoading:a})]})})})})};Dn.__docgenInfo={description:"",methods:[],displayName:"DokumentasjonSteg",props:{mellomlagreOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{q as A,Dn as D,b as H,bn as h,wn as m,Mn as p,xn as s};
