import{A as Se,T as pe,d as _,U as Ie,j as ae}from"./Uttaksdagen-DrQ0Oxxl.js";import{r as u,R as ke}from"./index-BP8_t0zE.js";import{K as oe}from"./dateFormValidation-DXkRFCUV.js";const Ut=e=>e.kanIkkeOppgis===!1,Ct=e=>e.kanIkkeOppgis===!0;var Oe=(e=>(e.FØDT="født",e.UFØDT="ufødt",e.ADOPTERT_STEBARN="adoptertStebarn",e.ADOPTERT_ANNET_BARN="adoptertAnnetBarn",e.IKKE_UTFYLT="ikkeUtfylt",e))(Oe||{});const _t=e=>e.type==="ikkeUtfylt",bt=e=>e.type==="født",Bt=e=>e.type==="ufødt",Kt=e=>e.type==="adoptertStebarn"||e.type==="adoptertAnnetBarn",Mt=e=>e.type==="adoptertStebarn",wt=e=>e.type==="adoptertAnnetBarn";var K=(e=>(e.mor="mor",e.farMedmor="farMedmor",e))(K||{}),P=(e=>(e.Arbeid="ARBEID",e.Utdanning="UTDANNING",e.ArbeidOgUtdanning="ARBEID_OG_UTDANNING",e.TrengerHjelp="TRENGER_HJELP",e.Innlagt="INNLAGT",e.Kvalifiseringsprogrammet="KVALPROG",e.Introduksjonsprogrammet="INTROPROG",e.Uføre="UFØRE",e.IkkeOppgitt="IKKE_OPPGITT",e))(P||{}),M=(e=>(e.institusjonsoppholdAnnenForelder="INSTITUSJONSOPPHOLD_ANNEN_FORELDER",e.sykdomAnnenForelder="SYKDOM_ANNEN_FORELDER",e.aleneomsorg="ALENEOMSORG",e.ikkeRettAnnenForelder="IKKE_RETT_ANNEN_FORELDER",e))(M||{}),I=(e=>(e.avslåttPeriode="avslåttPeriode",e.uttakAnnenPart="uttakAnnenPart",e.utsettelseAnnenPart="utsettelseAnnenPart",e))(I||{}),O=(e=>(e.Mødrekvote="MØDREKVOTE",e.Fedrekvote="FEDREKVOTE",e.Fellesperiode="FELLESPERIODE",e.Foreldrepenger="FORELDREPENGER",e.ForeldrepengerFørFødsel="FORELDREPENGER_FØR_FØDSEL",e.Flerbarnsdager="FLERBARNSDAGER",e.AktivitetsfriKvote="AKTIVITETSFRI_KVOTE",e))(O||{}),F=(e=>(e.Ferie="LOVBESTEMT_FERIE",e.Arbeid="ARBEID",e.Sykdom="SYKDOM",e.InstitusjonSøker="INSTITUSJONSOPPHOLD_SØKER",e.InstitusjonBarnet="INSTITUSJONSOPPHOLD_BARNET",e.HvØvelse="HV_OVELSE",e.NavTiltak="NAV_TILTAK",e.Fri="FRI",e))(F||{}),C=(e=>(e.Uttak="uttak",e.Utsettelse="utsettelse",e.Opphold="opphold",e.Overføring="overføring",e.Hull="ubegrunnetOpphold",e.Info="info",e.PeriodeUtenUttak="periodeUtenUttak",e))(C||{}),Fe=(e=>(e.Ferie="FERIE",e.Arbeid="ARBEID",e.Gradering="GRADERING",e))(Fe||{});function T(e){return e.type==="uttak"}const se=e=>e.type==="uttak"&&e.konto===O.ForeldrepengerFørFødsel,he=e=>e.type==="uttak"&&e.konto===O.Fellesperiode,Te=e=>e.type==="uttak"&&e.konto===O.ForeldrepengerFørFødsel,jt=e=>e.type==="uttak"&&e.erMorForSyk===!0&&e.konto===O.Fedrekvote,Gt=e=>J(e)&&e.årsak===M.institusjonsoppholdAnnenForelder&&e.forelder===K.farMedmor,Ht=e=>J(e)&&e.forelder===K.farMedmor&&e.årsak===M.sykdomAnnenForelder,$t=e=>J(e)&&e.årsak===M.institusjonsoppholdAnnenForelder&&e.forelder===K.mor,Jt=e=>J(e)&&e.forelder===K.mor&&e.årsak===M.sykdomAnnenForelder,Vt=e=>w(e)&&e.årsak===F.InstitusjonBarnet,Wt=e=>T(e)&&e.morsAktivitetIPerioden===P.Utdanning,qt=e=>T(e)&&e.morsAktivitetIPerioden===P.Arbeid,zt=e=>T(e)&&e.morsAktivitetIPerioden===P.ArbeidOgUtdanning,Yt=e=>T(e)&&e.morsAktivitetIPerioden===P.Introduksjonsprogrammet,Qt=e=>T(e)&&e.morsAktivitetIPerioden===P.Kvalifiseringsprogrammet,Xt=e=>T(e)&&e.konto===O.Foreldrepenger&&e.morsAktivitetIPerioden===P.Innlagt,Zt=e=>T(e)&&e.konto===O.Foreldrepenger&&e.morsAktivitetIPerioden===P.TrengerHjelp,en=e=>w(e)&&e.årsak===F.InstitusjonSøker,tn=e=>he(e)&&e.morsAktivitetIPerioden===P.Innlagt,nn=e=>he(e)&&e.morsAktivitetIPerioden===P.TrengerHjelp,rn=e=>w(e)&&e.årsak===F.Sykdom,an=e=>Te(e)&&e.skalIkkeHaUttakFørTermin===!0,w=e=>e.type==="utsettelse",on=e=>w(e)&&e.årsak===F.Ferie,sn=e=>w(e)&&e.årsak===F.Arbeid,J=e=>e.type==="overføring",ln=e=>e.type==="opphold",un=e=>e.type==="info"&&e.overskrives===!0,cn=e=>e.type==="info"&&(e.infotype===I.uttakAnnenPart||e.infotype===I.utsettelseAnnenPart),dn=e=>e.type==="ubegrunnetOpphold",fn=e=>e.type==="info"&&e.infotype===I.utsettelseAnnenPart,xe=e=>e.type==="info"&&e.infotype===I.avslåttPeriode,pn=e=>xe(e)&&e.kanSlettes,hn=e=>e.type==="info"&&e.infotype===I.uttakAnnenPart,De=e=>e.type==="utsettelse"&&e.årsak===F.Fri,Le=e=>e.type==="periodeUtenUttak",mn=e=>e.type==="info"&&e.overskrives===!0||e.type==="ubegrunnetOpphold"||Le(e)||De(e),Ue=e=>e.infotype===I.uttakAnnenPart,Ce=e=>e.infotype===I.utsettelseAnnenPart,En=e=>e.type==="info"&&(Ue(e)||Ce(e));var L=(e=>(e.FØDT="født",e.UFØDT="ufødt",e.ADOPTERT_STEBARN="adoptertStebarn",e.ADOPTERT_ANNET_BARN="adoptertAnnetBarn",e.IKKE_UTFYLT="ikkeUtfylt",e))(L||{});const vn=e=>e.type===L.IKKE_UTFYLT,gn=e=>e.type===L.FØDT,Rn=e=>e.type===L.UFØDT,yn=e=>e.type===L.ADOPTERT_STEBARN||e.type===L.ADOPTERT_ANNET_BARN,Nn=e=>({setStartdato:t=>Be(e,t),setUttaksdager:t=>e.tidsperiode=Se(e.tidsperiode.fom,t),getAntallUttaksdager:()=>pe(e.tidsperiode).getAntallUttaksdager(),erLik:(t,n=!1,r=!1)=>be(e,t,n,r),erSammenhengende:t=>_e(e,t),starterFør:t=>_(e.tidsperiode.fom).isBefore(t,"day"),slutterEtter:t=>_(e.tidsperiode.tom).isAfter(t,"day"),slutterSammeDagEllerEtter:t=>_(e.tidsperiode.tom).isSameOrAfter(t,"day")});function _e(e,t){const n=Ie(_(e.tidsperiode.tom).toDate()).neste(),r=t.tidsperiode.fom;return _(n).isSame(r,"day")}function be(e,t,n=!1,r=!1){if(e.type!==t.type||r===!1&&(e.type===C.Utsettelse||t.type===C.Utsettelse))return!1;if(e.type===C.Hull&&t.type===C.Hull)return!0;if(se(e)&&se(t)){const o=G({...e,skalIkkeHaUttakFørTermin:e.skalIkkeHaUttakFørTermin||!1},n),i=G({...t,skalIkkeHaUttakFørTermin:t.skalIkkeHaUttakFørTermin||!1},n);return o===i}const a=G(e,n),s=G(t,n);return a===s}function G(e,t=!1){const{tidsperiode:n,id:r,...a}=e,s={};return Object.keys(a).sort((o,i)=>o.localeCompare(i)).filter(o=>a[o]!==void 0).forEach(o=>{s[o]=a[o]}),t&&n&&(s.tidsperiode={fom:n.fom?oe(n.fom):void 0,tom:n.tom?oe(n.tom):void 0}),JSON.stringify({...s})}function Be(e,t){const{tidsperiode:n}=e;return{...e,tidsperiode:pe({fom:n.fom,tom:n.tom}).setStartdato(t)}}/**
 * @remix-run/router v1.19.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function b(){return b=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},b.apply(this,arguments)}var N;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(N||(N={}));const ie="popstate";function Ke(e){e===void 0&&(e={});let{initialEntries:t=["/"],initialIndex:n,v5Compat:r=!1}=e,a;a=t.map((p,m)=>f(p,typeof p=="string"?null:p.state,m===0?"default":void 0));let s=l(n??a.length-1),o=N.Pop,i=null;function l(p){return Math.min(Math.max(p,0),a.length-1)}function d(){return a[s]}function f(p,m,E){m===void 0&&(m=null);let h=H(a?d().pathname:"/",p,m,E);return Z(h.pathname.charAt(0)==="/","relative pathnames are not supported in memory history: "+JSON.stringify(p)),h}function c(p){return typeof p=="string"?p:ee(p)}return{get index(){return s},get action(){return o},get location(){return d()},createHref:c,createURL(p){return new URL(c(p),"http://localhost")},encodeLocation(p){let m=typeof p=="string"?x(p):p;return{pathname:m.pathname||"",search:m.search||"",hash:m.hash||""}},push(p,m){o=N.Push;let E=f(p,m);s+=1,a.splice(s,a.length,E),r&&i&&i({action:o,location:E,delta:1})},replace(p,m){o=N.Replace;let E=f(p,m);a[s]=E,r&&i&&i({action:o,location:E,delta:0})},go(p){o=N.Pop;let m=l(s+p),E=a[m];s=m,i&&i({action:o,location:E,delta:p})},listen(p){return i=p,()=>{i=null}}}}function An(e){e===void 0&&(e={});function t(r,a){let{pathname:s,search:o,hash:i}=r.location;return H("",{pathname:s,search:o,hash:i},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function n(r,a){return typeof a=="string"?a:ee(a)}return we(t,n,null,e)}function g(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Z(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Me(){return Math.random().toString(36).substr(2,8)}function le(e,t){return{usr:e.state,key:e.key,idx:t}}function H(e,t,n,r){return n===void 0&&(n=null),b({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?x(t):t,{state:n,key:t&&t.key||r||Me()})}function ee(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function x(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function we(e,t,n,r){r===void 0&&(r={});let{window:a=document.defaultView,v5Compat:s=!1}=r,o=a.history,i=N.Pop,l=null,d=f();d==null&&(d=0,o.replaceState(b({},o.state,{idx:d}),""));function f(){return(o.state||{idx:null}).idx}function c(){i=N.Pop;let h=f(),R=h==null?null:h-d;d=h,l&&l({action:i,location:E.location,delta:R})}function v(h,R){i=N.Push;let y=H(E.location,h,R);d=f()+1;let A=le(y,d),j=E.createHref(y);try{o.pushState(A,"",j)}catch(Y){if(Y instanceof DOMException&&Y.name==="DataCloneError")throw Y;a.location.assign(j)}s&&l&&l({action:i,location:E.location,delta:1})}function p(h,R){i=N.Replace;let y=H(E.location,h,R);d=f();let A=le(y,d),j=E.createHref(y);o.replaceState(A,"",j),s&&l&&l({action:i,location:E.location,delta:0})}function m(h){let R=a.location.origin!=="null"?a.location.origin:a.location.href,y=typeof h=="string"?h:ee(h);return y=y.replace(/ $/,"%20"),g(R,"No window.location.(origin|href) available to create URL for href: "+y),new URL(y,R)}let E={get action(){return i},get location(){return e(a,o)},listen(h){if(l)throw new Error("A history only accepts one active listener");return a.addEventListener(ie,c),l=h,()=>{a.removeEventListener(ie,c),l=null}},createHref(h){return t(a,h)},createURL:m,encodeLocation(h){let R=m(h);return{pathname:R.pathname,search:R.search,hash:R.hash}},push:v,replace:p,go(h){return o.go(h)}};return E}var ue;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(ue||(ue={}));function je(e,t,n){return n===void 0&&(n="/"),Ge(e,t,n,!1)}function Ge(e,t,n,r){let a=typeof t=="string"?x(t):t,s=ve(a.pathname||"/",n);if(s==null)return null;let o=me(e);He(o);let i=null;for(let l=0;i==null&&l<o.length;++l){let d=et(s);i=Xe(o[l],d,r)}return i}function me(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let a=(s,o,i)=>{let l={relativePath:i===void 0?s.path||"":i,caseSensitive:s.caseSensitive===!0,childrenIndex:o,route:s};l.relativePath.startsWith("/")&&(g(l.relativePath.startsWith(r),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(r.length));let d=S([r,l.relativePath]),f=n.concat(l);s.children&&s.children.length>0&&(g(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),me(s.children,t,f,d)),!(s.path==null&&!s.index)&&t.push({path:d,score:Ye(d,s.index),routesMeta:f})};return e.forEach((s,o)=>{var i;if(s.path===""||!((i=s.path)!=null&&i.includes("?")))a(s,o);else for(let l of Ee(s.path))a(s,o,l)}),t}function Ee(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,a=n.endsWith("?"),s=n.replace(/\?$/,"");if(r.length===0)return a?[s,""]:[s];let o=Ee(r.join("/")),i=[];return i.push(...o.map(l=>l===""?s:[s,l].join("/"))),a&&i.push(...o),i.map(l=>e.startsWith("/")&&l===""?"/":l)}function He(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Qe(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const $e=/^:[\w-]+$/,Je=3,Ve=2,We=1,qe=10,ze=-2,ce=e=>e==="*";function Ye(e,t){let n=e.split("/"),r=n.length;return n.some(ce)&&(r+=ze),t&&(r+=Ve),n.filter(a=>!ce(a)).reduce((a,s)=>a+($e.test(s)?Je:s===""?We:qe),r)}function Qe(e,t){return e.length===t.length&&e.slice(0,-1).every((r,a)=>r===t[a])?e[e.length-1]-t[t.length-1]:0}function Xe(e,t,n){let{routesMeta:r}=e,a={},s="/",o=[];for(let i=0;i<r.length;++i){let l=r[i],d=i===r.length-1,f=s==="/"?t:t.slice(s.length)||"/",c=de({path:l.relativePath,caseSensitive:l.caseSensitive,end:d},f),v=l.route;if(!c&&d&&n&&!r[r.length-1].route.index&&(c=de({path:l.relativePath,caseSensitive:l.caseSensitive,end:!1},f)),!c)return null;Object.assign(a,c.params),o.push({params:a,pathname:S([s,c.pathname]),pathnameBase:at(S([s,c.pathnameBase])),route:v}),c.pathnameBase!=="/"&&(s=S([s,c.pathnameBase]))}return o}function de(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Ze(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let s=a[0],o=s.replace(/(.)\/+$/,"$1"),i=a.slice(1);return{params:r.reduce((d,f,c)=>{let{paramName:v,isOptional:p}=f;if(v==="*"){let E=i[c]||"";o=s.slice(0,s.length-E.length).replace(/(.)\/+$/,"$1")}const m=i[c];return p&&!m?d[v]=void 0:d[v]=(m||"").replace(/%2F/g,"/"),d},{}),pathname:s,pathnameBase:o,pattern:e}}function Ze(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),Z(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,i,l)=>(r.push({paramName:i,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function et(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Z(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function ve(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function tt(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:a=""}=typeof e=="string"?x(e):e;return{pathname:n?n.startsWith("/")?n:nt(n,t):t,search:ot(r),hash:st(a)}}function nt(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function Q(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function rt(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function te(e,t){let n=rt(e);return t?n.map((r,a)=>a===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function ne(e,t,n,r){r===void 0&&(r=!1);let a;typeof e=="string"?a=x(e):(a=b({},e),g(!a.pathname||!a.pathname.includes("?"),Q("?","pathname","search",a)),g(!a.pathname||!a.pathname.includes("#"),Q("#","pathname","hash",a)),g(!a.search||!a.search.includes("#"),Q("#","search","hash",a)));let s=e===""||a.pathname==="",o=s?"/":a.pathname,i;if(o==null)i=n;else{let c=t.length-1;if(!r&&o.startsWith("..")){let v=o.split("/");for(;v[0]==="..";)v.shift(),c-=1;a.pathname=v.join("/")}i=c>=0?t[c]:"/"}let l=tt(a,i),d=o&&o!=="/"&&o.endsWith("/"),f=(s||o===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(d||f)&&(l.pathname+="/"),l}const S=e=>e.join("/").replace(/\/\/+/g,"/"),at=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),ot=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,st=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function it(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const ge=["post","put","patch","delete"];new Set(ge);const lt=["get",...ge];new Set(lt);/**
 * React Router v6.26.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function B(){return B=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},B.apply(this,arguments)}const re=u.createContext(null),ut=u.createContext(null),D=u.createContext(null),V=u.createContext(null),k=u.createContext({outlet:null,matches:[],isDataRoute:!1}),Re=u.createContext(null);function Pn(e,t){let{relative:n}=t===void 0?{}:t;U()||g(!1);let{basename:r,navigator:a}=u.useContext(D),{hash:s,pathname:o,search:i}=ft(e,{relative:n}),l=o;return r!=="/"&&(l=o==="/"?r:S([r,o])),a.createHref({pathname:l,search:i,hash:s})}function U(){return u.useContext(V)!=null}function W(){return U()||g(!1),u.useContext(V).location}function ye(e){u.useContext(D).static||u.useLayoutEffect(e)}function ct(){let{isDataRoute:e}=u.useContext(k);return e?St():dt()}function dt(){U()||g(!1);let e=u.useContext(re),{basename:t,future:n,navigator:r}=u.useContext(D),{matches:a}=u.useContext(k),{pathname:s}=W(),o=JSON.stringify(te(a,n.v7_relativeSplatPath)),i=u.useRef(!1);return ye(()=>{i.current=!0}),u.useCallback(function(d,f){if(f===void 0&&(f={}),!i.current)return;if(typeof d=="number"){r.go(d);return}let c=ne(d,JSON.parse(o),s,f.relative==="path");e==null&&t!=="/"&&(c.pathname=c.pathname==="/"?t:S([t,c.pathname])),(f.replace?r.replace:r.push)(c,f.state,f)},[t,r,o,s,e])}function ft(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=u.useContext(D),{matches:a}=u.useContext(k),{pathname:s}=W(),o=JSON.stringify(te(a,r.v7_relativeSplatPath));return u.useMemo(()=>ne(e,JSON.parse(o),s,n==="path"),[e,o,s,n])}function pt(e,t){return ht(e,t)}function ht(e,t,n,r){U()||g(!1);let{navigator:a}=u.useContext(D),{matches:s}=u.useContext(k),o=s[s.length-1],i=o?o.params:{};o&&o.pathname;let l=o?o.pathnameBase:"/";o&&o.route;let d=W(),f;if(t){var c;let h=typeof t=="string"?x(t):t;l==="/"||(c=h.pathname)!=null&&c.startsWith(l)||g(!1),f=h}else f=d;let v=f.pathname||"/",p=v;if(l!=="/"){let h=l.replace(/^\//,"").split("/");p="/"+v.replace(/^\//,"").split("/").slice(h.length).join("/")}let m=je(e,{pathname:p}),E=Rt(m&&m.map(h=>Object.assign({},h,{params:Object.assign({},i,h.params),pathname:S([l,a.encodeLocation?a.encodeLocation(h.pathname).pathname:h.pathname]),pathnameBase:h.pathnameBase==="/"?l:S([l,a.encodeLocation?a.encodeLocation(h.pathnameBase).pathname:h.pathnameBase])})),s,n,r);return t&&E?u.createElement(V.Provider,{value:{location:B({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:N.Pop}},E):E}function mt(){let e=Pt(),t=it(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return u.createElement(u.Fragment,null,u.createElement("h2",null,"Unexpected Application Error!"),u.createElement("h3",{style:{fontStyle:"italic"}},t),n?u.createElement("pre",{style:a},n):null,null)}const Et=u.createElement(mt,null);class vt extends u.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?u.createElement(k.Provider,{value:this.props.routeContext},u.createElement(Re.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function gt(e){let{routeContext:t,match:n,children:r}=e,a=u.useContext(re);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),u.createElement(k.Provider,{value:t},r)}function Rt(e,t,n,r){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var s;if(!n)return null;if(n.errors)e=n.matches;else if((s=r)!=null&&s.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let o=e,i=(a=n)==null?void 0:a.errors;if(i!=null){let f=o.findIndex(c=>c.route.id&&(i==null?void 0:i[c.route.id])!==void 0);f>=0||g(!1),o=o.slice(0,Math.min(o.length,f+1))}let l=!1,d=-1;if(n&&r&&r.v7_partialHydration)for(let f=0;f<o.length;f++){let c=o[f];if((c.route.HydrateFallback||c.route.hydrateFallbackElement)&&(d=f),c.route.id){let{loaderData:v,errors:p}=n,m=c.route.loader&&v[c.route.id]===void 0&&(!p||p[c.route.id]===void 0);if(c.route.lazy||m){l=!0,d>=0?o=o.slice(0,d+1):o=[o[0]];break}}}return o.reduceRight((f,c,v)=>{let p,m=!1,E=null,h=null;n&&(p=i&&c.route.id?i[c.route.id]:void 0,E=c.route.errorElement||Et,l&&(d<0&&v===0?(m=!0,h=null):d===v&&(m=!0,h=c.route.hydrateFallbackElement||null)));let R=t.concat(o.slice(0,v+1)),y=()=>{let A;return p?A=E:m?A=h:c.route.Component?A=u.createElement(c.route.Component,null):c.route.element?A=c.route.element:A=f,u.createElement(gt,{match:c,routeContext:{outlet:f,matches:R,isDataRoute:n!=null},children:A})};return n&&(c.route.ErrorBoundary||c.route.errorElement||v===0)?u.createElement(vt,{location:n.location,revalidation:n.revalidation,component:E,error:p,children:y(),routeContext:{outlet:null,matches:R,isDataRoute:!0}}):y()},null)}var Ne=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Ne||{}),$=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}($||{});function yt(e){let t=u.useContext(re);return t||g(!1),t}function Nt(e){let t=u.useContext(ut);return t||g(!1),t}function At(e){let t=u.useContext(k);return t||g(!1),t}function Ae(e){let t=At(),n=t.matches[t.matches.length-1];return n.route.id||g(!1),n.route.id}function Pt(){var e;let t=u.useContext(Re),n=Nt($.UseRouteError),r=Ae($.UseRouteError);return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function St(){let{router:e}=yt(Ne.UseNavigateStable),t=Ae($.UseNavigateStable),n=u.useRef(!1);return ye(()=>{n.current=!0}),u.useCallback(function(a,s){s===void 0&&(s={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,B({fromRouteId:t},s)))},[e,t])}const It="startTransition",fe=ke[It];function Sn(e){let{basename:t,children:n,initialEntries:r,initialIndex:a,future:s}=e,o=u.useRef();o.current==null&&(o.current=Ke({initialEntries:r,initialIndex:a,v5Compat:!0}));let i=o.current,[l,d]=u.useState({action:i.action,location:i.location}),{v7_startTransition:f}=s||{},c=u.useCallback(v=>{f&&fe?fe(()=>d(v)):d(v)},[d,f]);return u.useLayoutEffect(()=>i.listen(c),[i,c]),u.createElement(Ot,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:i,future:s})}function In(e){let{to:t,replace:n,state:r,relative:a}=e;U()||g(!1);let{future:s,static:o}=u.useContext(D),{matches:i}=u.useContext(k),{pathname:l}=W(),d=ct(),f=ne(t,te(i,s.v7_relativeSplatPath),l,a==="path"),c=JSON.stringify(f);return u.useEffect(()=>d(JSON.parse(c),{replace:n,state:r,relative:a}),[d,c,a,n,r]),null}function kt(e){g(!1)}function Ot(e){let{basename:t="/",children:n=null,location:r,navigationType:a=N.Pop,navigator:s,static:o=!1,future:i}=e;U()&&g(!1);let l=t.replace(/^\/*/,"/"),d=u.useMemo(()=>({basename:l,navigator:s,static:o,future:B({v7_relativeSplatPath:!1},i)}),[l,i,s,o]);typeof r=="string"&&(r=x(r));let{pathname:f="/",search:c="",hash:v="",state:p=null,key:m="default"}=r,E=u.useMemo(()=>{let h=ve(f,l);return h==null?null:{location:{pathname:h,search:c,hash:v,state:p,key:m},navigationType:a}},[l,f,c,v,p,m,a]);return E==null?null:u.createElement(D.Provider,{value:d},u.createElement(V.Provider,{children:n,value:E}))}function kn(e){let{children:t,location:n}=e;return pt(X(t),n)}new Promise(()=>{});function X(e,t){t===void 0&&(t=[]);let n=[];return u.Children.forEach(e,(r,a)=>{if(!u.isValidElement(r))return;let s=[...t,a];if(r.type===u.Fragment){n.push.apply(n,X(r.props.children,s));return}r.type!==kt&&g(!1),!r.props.index||!r.props.children||g(!1);let o={id:r.props.id||s.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=X(r.props.children,s)),n.push(o)}),n}var Ft=(e=>(e.APP_ROUTE="APP_ROUTE",e.EKSISTERENDE_SAK="EKSISTERENDE_SAK",e.BARN_FRA_NESTE_SAK="BARN_FRA_NESTE_SAK",e.SØKERSITUASJON="SØKERSITUASJON",e.OM_BARNET="OM_BARNET",e.ANNEN_FORELDER="ANNEN_FORELDER",e.ARBEIDSFORHOLD_OG_INNTEKT="ARBEIDSFORHOLD_OG_INNTEKT",e.EGEN_NÆRING="EGEN_NÆRING",e.FRILANS="FRILANS",e.ANDRE_INNTEKTSKILDER="ANDRE_INNTEKTSKILDER",e.UTENLANDSOPPHOLD="UTENLANDSOPPHOLD",e.UTENLANDSOPPHOLD_SENERE="UTENLANDSOPPHOLD_SENERE",e.UTENLANDSOPPHOLD_TIDLIGERE="UTENLANDSOPPHOLD_TIDLIGERE",e.PERIODE_MED_FORELDREPENGER="PERIODE_MED_FORELDREPENGER",e.FORDELING="FORDELING",e.UTTAKSPLAN="UTTAKSPLAN",e.UTTAKSPLAN_METADATA="UTTAKSPLAN_METADATA",e.VEDLEGG="VEDLEGG",e))(Ft||{});const Pe={},q=u.createContext(Pe),z=u.createContext(void 0),Tt=({children:e,initialState:t,onDispatch:n})=>{const[r,a]=u.useReducer((o,i)=>{switch(i.type){case"update":return{...o,[i.key]:i.data};case"reset":return{};default:throw new Error}},t||Pe),s=o=>{n&&n(o),a(o)};return ae.jsx(q.Provider,{value:r,children:ae.jsx(z.Provider,{value:s,children:e})})},On=e=>u.useContext(q)[e],Fn=()=>{const e=u.useContext(q);return t=>e[t]},Tn=e=>{const t=u.useContext(z);return n=>{t&&t({type:"update",key:e,data:n})}},xn=()=>{const e=u.useContext(z);return(t,n)=>{e&&e({type:"update",key:t,data:n})}},Dn=()=>{const e=u.useContext(z);return()=>{e&&e({type:"reset"})}},Ln=()=>u.useContext(q);Tt.__docgenInfo={description:"",methods:[],displayName:"FpDataContext",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},initialState:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    [ContextDataType.APP_ROUTE]?: SøknadRoutes;
    [ContextDataType.EKSISTERENDE_SAK]?: EksisterendeSak;
    [ContextDataType.BARN_FRA_NESTE_SAK]?: BarnFraNesteSak;
    [ContextDataType.SØKERSITUASJON]?: SøkersituasjonFp;
    [ContextDataType.OM_BARNET]?: Barn;
    [ContextDataType.ANNEN_FORELDER]?: AnnenForelder;
    [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]?: ArbeidsforholdOgInntektFp;
    [ContextDataType.EGEN_NÆRING]?: EgenNæring;
    [ContextDataType.FRILANS]?: Frilans;
    [ContextDataType.ANDRE_INNTEKTSKILDER]?: AndreInntektskilder[];
    [ContextDataType.UTENLANDSOPPHOLD]?: Opphold;
    [ContextDataType.UTENLANDSOPPHOLD_SENERE]?: SenereOpphold;
    [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]?: TidligereOpphold;
    [ContextDataType.PERIODE_MED_FORELDREPENGER]?: PeriodeMedForeldrepenger;
    [ContextDataType.FORDELING]?: Fordeling;
    [ContextDataType.UTTAKSPLAN]?: Periode[];
    [ContextDataType.UTTAKSPLAN_METADATA]?: UttaksplanMetaData;
    [ContextDataType.VEDLEGG]?: VedleggDataType;
}`,signature:{properties:[]}},description:""},onDispatch:{required:!1,tsType:{name:"signature",type:"function",raw:"(action: Action) => void",signature:{arguments:[{type:{name:"union",raw:"{ type: 'update'; key: ContextDataType; data: any } | { type: 'reset' }",elements:[{name:"signature",type:"object",raw:"{ type: 'update'; key: ContextDataType; data: any }",signature:{properties:[{key:"type",value:{name:"literal",value:"'update'",required:!0}},{key:"key",value:{name:"ContextDataType",required:!0}},{key:"data",value:{name:"any",required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'reset' }",signature:{properties:[{key:"type",value:{name:"literal",value:"'reset'",required:!0}}]}}]},name:"action"}],return:{name:"void"}}},description:""}}};export{_t as $,xn as A,Oe as B,Ft as C,Ut as D,bt as E,Tt as F,wt as G,Mt as H,Bt as I,Kt as J,un as K,T as L,Sn as M,D as N,C as O,Nn as P,Fe as Q,Ot as R,O as S,I as T,K as U,F as V,P as W,gn as X,yn as Y,Le as Z,w as _,L as a,Vt as a0,Ct as a1,an as a2,hn as a3,Dn as a4,se as a5,Fn as a6,J as a7,ln as a8,Ln as a9,Te as aa,kn as ab,kt as ac,In as ad,vn as ae,Rn as af,dn as ag,De as ah,on as ai,M as aj,xe as ak,fn as al,mn as am,cn as an,sn as ao,pn as ap,En as aq,Tn as b,An as c,Pn as d,ct as e,W as f,ft as g,ee as h,Gt as i,jt as j,tn as k,Xt as l,en as m,nn as n,rn as o,Ht as p,Zt as q,$t as r,ve as s,Jt as t,On as u,Wt as v,qt as w,zt as x,Yt as y,Qt as z};
