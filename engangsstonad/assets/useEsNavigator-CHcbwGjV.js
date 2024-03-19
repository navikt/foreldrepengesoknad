import{r as l,a as pe}from"./index-Dl6G-zuu.js";import{j as V,u as fe,n as he,$ as q}from"./dateFormValidation-C5fEwPHX.js";var R=(e=>(e.CURRENT_PATH="CURRENT_PATH",e.SØKERSITUASJON="SØKERSITUASJON",e.OM_BARNET="OM_BARNET",e.DOKUMENTASJON="DOKUMENTASJON",e.UTENLANDSOPPHOLD="UTENLANDSOPPHOLD",e.UTENLANDSOPPHOLD_SENERE="UTENLANDSOPPHOLD_SENERE",e.UTENLANDSOPPHOLD_TIDLIGERE="UTENLANDSOPPHOLD_TIDLIGERE",e))(R||{});const te={},B=l.createContext(te),$=l.createContext(void 0),me=({children:e,initialState:t,onDispatch:n})=>{const[r,a]=l.useReducer((o,s)=>{switch(s.type){case"update":return{...o,[s.key]:s.data};case"reset":return{};default:throw new Error}},t||te),i=l.useCallback(o=>{n&&n(o),a(o)},[n]);return V.jsx(B.Provider,{value:r,children:V.jsx($.Provider,{value:i,children:e})})},Et=e=>l.useContext(B)[e],Ee=()=>{const e=l.useContext(B);return l.useCallback(t=>e[t],[e])},ge=e=>{const t=l.useContext($);return l.useCallback(n=>{t&&t({type:"update",key:e,data:n})},[t,e])},gt=()=>{const e=l.useContext($);return l.useCallback(()=>{e&&e({type:"reset"})},[e])},vt=()=>l.useContext(B);me.__docgenInfo={description:"",methods:[],displayName:"EsDataContext",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},initialState:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    [ContextDataType.CURRENT_PATH]?: Path;
    [ContextDataType.SØKERSITUASJON]?: Søkersituasjon;
    [ContextDataType.OM_BARNET]?: OmBarnet;
    [ContextDataType.DOKUMENTASJON]?: Dokumentasjon;
    [ContextDataType.UTENLANDSOPPHOLD]?: Utenlandsopphold;
    [ContextDataType.UTENLANDSOPPHOLD_SENERE]?: UtenlandsoppholdSenere;
    [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]?: UtenlandsoppholdTidligere;
}`,signature:{properties:[]}},description:""},onDispatch:{required:!1,tsType:{name:"signature",type:"function",raw:"(action: Action) => void",signature:{arguments:[{type:{name:"union",raw:"{ type: 'update'; key: ContextDataType; data: any } | { type: 'reset' }",elements:[{name:"signature",type:"object",raw:"{ type: 'update'; key: ContextDataType; data: any }",signature:{properties:[{key:"type",value:{name:"literal",value:"'update'",required:!0}},{key:"key",value:{name:"ContextDataType",required:!0}},{key:"data",value:{name:"any",required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'reset' }",signature:{properties:[{key:"type",value:{name:"literal",value:"'reset'",required:!0}}]}}]},name:"action"}],return:{name:"void"}}},description:""}}};var S=(e=>(e.VELKOMMEN="/velkommen",e.SØKERSITUASJON="/soknad/søkersituasjon",e.OM_BARNET="/soknad/om-barnet",e.TERMINBEKREFTELSE="/soknad/terminbekreftelse",e.ADOPSJONSBEKREFTELSE="/soknad/adopsjonsbekreftelse",e.UTENLANDSOPPHOLD="/soknad/utenlandsopphold",e.TIDLIGERE_UTENLANDSOPPHOLD="/soknad/tidligere-utenlandsopphold",e.SENERE_UTENLANDSOPPHOLD="/soknad/senere-utenlandsopphold",e.OPPSUMMERING="/soknad/oppsummering",e))(S||{});const F=["/velkommen","/soknad/søkersituasjon","/soknad/om-barnet","/soknad/terminbekreftelse","/soknad/adopsjonsbekreftelse","/soknad/utenlandsopphold","/soknad/tidligere-utenlandsopphold","/soknad/senere-utenlandsopphold","/soknad/oppsummering"],ve=["/soknad/søkersituasjon","/soknad/om-barnet","/soknad/utenlandsopphold","/soknad/oppsummering"];/**
 * @remix-run/router v1.15.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function L(){return L=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},L.apply(this,arguments)}var N;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(N||(N={}));const z="popstate";function Se(e){e===void 0&&(e={});let{initialEntries:t=["/"],initialIndex:n,v5Compat:r=!1}=e,a;a=t.map((h,m)=>d(h,typeof h=="string"?null:h.state,m===0?"default":void 0));let i=u(n??a.length-1),o=N.Pop,s=null;function u(h){return Math.min(Math.max(h,0),a.length-1)}function p(){return a[i]}function d(h,m,E){m===void 0&&(m=null);let f=b(a?p().pathname:"/",h,m,E);return K(f.pathname.charAt(0)==="/","relative pathnames are not supported in memory history: "+JSON.stringify(h)),f}function c(h){return typeof h=="string"?h:W(h)}return{get index(){return i},get action(){return o},get location(){return p()},createHref:c,createURL(h){return new URL(c(h),"http://localhost")},encodeLocation(h){let m=typeof h=="string"?O(h):h;return{pathname:m.pathname||"",search:m.search||"",hash:m.hash||""}},push(h,m){o=N.Push;let E=d(h,m);i+=1,a.splice(i,a.length,E),r&&s&&s({action:o,location:E,delta:1})},replace(h,m){o=N.Replace;let E=d(h,m);a[i]=E,r&&s&&s({action:o,location:E,delta:0})},go(h){o=N.Pop;let m=u(i+h),E=a[m];i=m,s&&s({action:o,location:E,delta:h})},listen(h){return s=h,()=>{s=null}}}}function St(e){e===void 0&&(e={});function t(r,a){let{pathname:i,search:o,hash:s}=r.location;return b("",{pathname:i,search:o,hash:s},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function n(r,a){return typeof a=="string"?a:W(a)}return xe(t,n,null,e)}function v(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function K(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function ye(){return Math.random().toString(36).substr(2,8)}function Q(e,t){return{usr:e.state,key:e.key,idx:t}}function b(e,t,n,r){return n===void 0&&(n=null),L({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?O(t):t,{state:n,key:t&&t.key||r||ye()})}function W(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function O(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function xe(e,t,n,r){r===void 0&&(r={});let{window:a=document.defaultView,v5Compat:i=!1}=r,o=a.history,s=N.Pop,u=null,p=d();p==null&&(p=0,o.replaceState(L({},o.state,{idx:p}),""));function d(){return(o.state||{idx:null}).idx}function c(){s=N.Pop;let f=d(),y=f==null?null:f-p;p=f,u&&u({action:s,location:E.location,delta:y})}function g(f,y){s=N.Push;let x=b(E.location,f,y);n&&n(x,f),p=d()+1;let P=Q(x,p),I=E.createHref(x);try{o.pushState(P,"",I)}catch(j){if(j instanceof DOMException&&j.name==="DataCloneError")throw j;a.location.assign(I)}i&&u&&u({action:s,location:E.location,delta:1})}function h(f,y){s=N.Replace;let x=b(E.location,f,y);n&&n(x,f),p=d();let P=Q(x,p),I=E.createHref(x);o.replaceState(P,"",I),i&&u&&u({action:s,location:E.location,delta:0})}function m(f){let y=a.location.origin!=="null"?a.location.origin:a.location.href,x=typeof f=="string"?f:W(f);return x=x.replace(/ $/,"%20"),v(y,"No window.location.(origin|href) available to create URL for href: "+x),new URL(x,y)}let E={get action(){return s},get location(){return e(a,o)},listen(f){if(u)throw new Error("A history only accepts one active listener");return a.addEventListener(z,c),u=f,()=>{a.removeEventListener(z,c),u=null}},createHref(f){return t(a,f)},createURL:m,encodeLocation(f){let y=m(f);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:g,replace:h,go(f){return o.go(f)}};return E}var X;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(X||(X={}));function Ne(e,t,n){n===void 0&&(n="/");let r=typeof t=="string"?O(t):t,a=ae(r.pathname||"/",n);if(a==null)return null;let i=ne(e);Pe(i);let o=null;for(let s=0;o==null&&s<i.length;++s){let u=Ae(a);o=Ie(i[s],u)}return o}function ne(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let a=(i,o,s)=>{let u={relativePath:s===void 0?i.path||"":s,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};u.relativePath.startsWith("/")&&(v(u.relativePath.startsWith(r),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(r.length));let p=C([r,u.relativePath]),d=n.concat(u);i.children&&i.children.length>0&&(v(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+p+'".')),ne(i.children,t,d,p)),!(i.path==null&&!i.index)&&t.push({path:p,score:De(p,i.index),routesMeta:d})};return e.forEach((i,o)=>{var s;if(i.path===""||!((s=i.path)!=null&&s.includes("?")))a(i,o);else for(let u of re(i.path))a(i,o,u)}),t}function re(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,a=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return a?[i,""]:[i];let o=re(r.join("/")),s=[];return s.push(...o.map(u=>u===""?i:[i,u].join("/"))),a&&s.push(...o),s.map(u=>e.startsWith("/")&&u===""?"/":u)}function Pe(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:ke(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const Re=/^:[\w-]+$/,Ce=3,Oe=2,Te=1,Le=10,Ue=-2,Y=e=>e==="*";function De(e,t){let n=e.split("/"),r=n.length;return n.some(Y)&&(r+=Ue),t&&(r+=Oe),n.filter(a=>!Y(a)).reduce((a,i)=>a+(Re.test(i)?Ce:i===""?Te:Le),r)}function ke(e,t){return e.length===t.length&&e.slice(0,-1).every((r,a)=>r===t[a])?e[e.length-1]-t[t.length-1]:0}function Ie(e,t){let{routesMeta:n}=e,r={},a="/",i=[];for(let o=0;o<n.length;++o){let s=n[o],u=o===n.length-1,p=a==="/"?t:t.slice(a.length)||"/",d=be({path:s.relativePath,caseSensitive:s.caseSensitive,end:u},p);if(!d)return null;Object.assign(r,d.params);let c=s.route;i.push({params:r,pathname:C([a,d.pathname]),pathnameBase:je(C([a,d.pathnameBase])),route:c}),d.pathnameBase!=="/"&&(a=C([a,d.pathnameBase]))}return i}function be(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Me(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let i=a[0],o=i.replace(/(.)\/+$/,"$1"),s=a.slice(1);return{params:r.reduce((p,d,c)=>{let{paramName:g,isOptional:h}=d;if(g==="*"){let E=s[c]||"";o=i.slice(0,i.length-E.length).replace(/(.)\/+$/,"$1")}const m=s[c];return h&&!m?p[g]=void 0:p[g]=(m||"").replace(/%2F/g,"/"),p},{}),pathname:i,pathnameBase:o,pattern:e}}function Me(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),K(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,s,u)=>(r.push({paramName:s,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function Ae(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return K(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function ae(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function Be(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:a=""}=typeof e=="string"?O(e):e;return{pathname:n?n.startsWith("/")?n:we(n,t):t,search:He(r),hash:Fe(a)}}function we(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function H(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function _e(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function oe(e,t){let n=_e(e);return t?n.map((r,a)=>a===e.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function ie(e,t,n,r){r===void 0&&(r=!1);let a;typeof e=="string"?a=O(e):(a=L({},e),v(!a.pathname||!a.pathname.includes("?"),H("?","pathname","search",a)),v(!a.pathname||!a.pathname.includes("#"),H("#","pathname","hash",a)),v(!a.search||!a.search.includes("#"),H("#","search","hash",a)));let i=e===""||a.pathname==="",o=i?"/":a.pathname,s;if(o==null)s=n;else{let c=t.length-1;if(!r&&o.startsWith("..")){let g=o.split("/");for(;g[0]==="..";)g.shift(),c-=1;a.pathname=g.join("/")}s=c>=0?t[c]:"/"}let u=Be(a,s),p=o&&o!=="/"&&o.endsWith("/"),d=(i||o===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(p||d)&&(u.pathname+="/"),u}const C=e=>e.join("/").replace(/\/\/+/g,"/"),je=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),He=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Fe=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Je(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const se=["post","put","patch","delete"];new Set(se);const $e=["get",...se];new Set($e);/**
 * React Router v6.22.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function U(){return U=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},U.apply(this,arguments)}const G=l.createContext(null),Ke=l.createContext(null),D=l.createContext(null),w=l.createContext(null),T=l.createContext({outlet:null,matches:[],isDataRoute:!1}),le=l.createContext(null);function k(){return l.useContext(w)!=null}function _(){return k()||v(!1),l.useContext(w).location}function ue(e){l.useContext(D).static||l.useLayoutEffect(e)}function We(){let{isDataRoute:e}=l.useContext(T);return e?at():Ge()}function Ge(){k()||v(!1);let e=l.useContext(G),{basename:t,future:n,navigator:r}=l.useContext(D),{matches:a}=l.useContext(T),{pathname:i}=_(),o=JSON.stringify(oe(a,n.v7_relativeSplatPath)),s=l.useRef(!1);return ue(()=>{s.current=!0}),l.useCallback(function(p,d){if(d===void 0&&(d={}),!s.current)return;if(typeof p=="number"){r.go(p);return}let c=ie(p,JSON.parse(o),i,d.relative==="path");e==null&&t!=="/"&&(c.pathname=c.pathname==="/"?t:C([t,c.pathname])),(d.replace?r.replace:r.push)(c,d.state,d)},[t,r,o,i,e])}function Ve(e,t){return qe(e,t)}function qe(e,t,n,r){k()||v(!1);let{navigator:a}=l.useContext(D),{matches:i}=l.useContext(T),o=i[i.length-1],s=o?o.params:{};o&&o.pathname;let u=o?o.pathnameBase:"/";o&&o.route;let p=_(),d;if(t){var c;let f=typeof t=="string"?O(t):t;u==="/"||(c=f.pathname)!=null&&c.startsWith(u)||v(!1),d=f}else d=p;let g=d.pathname||"/",h=g;if(u!=="/"){let f=u.replace(/^\//,"").split("/");h="/"+g.replace(/^\//,"").split("/").slice(f.length).join("/")}let m=Ne(e,{pathname:h}),E=Ze(m&&m.map(f=>Object.assign({},f,{params:Object.assign({},s,f.params),pathname:C([u,a.encodeLocation?a.encodeLocation(f.pathname).pathname:f.pathname]),pathnameBase:f.pathnameBase==="/"?u:C([u,a.encodeLocation?a.encodeLocation(f.pathnameBase).pathname:f.pathnameBase])})),i,n,r);return t&&E?l.createElement(w.Provider,{value:{location:U({pathname:"/",search:"",hash:"",state:null,key:"default"},d),navigationType:N.Pop}},E):E}function ze(){let e=rt(),t=Je(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return l.createElement(l.Fragment,null,l.createElement("h2",null,"Unexpected Application Error!"),l.createElement("h3",{style:{fontStyle:"italic"}},t),n?l.createElement("pre",{style:a},n):null,null)}const Qe=l.createElement(ze,null);class Xe extends l.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?l.createElement(T.Provider,{value:this.props.routeContext},l.createElement(le.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Ye(e){let{routeContext:t,match:n,children:r}=e,a=l.useContext(G);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),l.createElement(T.Provider,{value:t},r)}function Ze(e,t,n,r){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var i;if((i=n)!=null&&i.errors)e=n.matches;else return null}let o=e,s=(a=n)==null?void 0:a.errors;if(s!=null){let d=o.findIndex(c=>c.route.id&&(s==null?void 0:s[c.route.id]));d>=0||v(!1),o=o.slice(0,Math.min(o.length,d+1))}let u=!1,p=-1;if(n&&r&&r.v7_partialHydration)for(let d=0;d<o.length;d++){let c=o[d];if((c.route.HydrateFallback||c.route.hydrateFallbackElement)&&(p=d),c.route.id){let{loaderData:g,errors:h}=n,m=c.route.loader&&g[c.route.id]===void 0&&(!h||h[c.route.id]===void 0);if(c.route.lazy||m){u=!0,p>=0?o=o.slice(0,p+1):o=[o[0]];break}}}return o.reduceRight((d,c,g)=>{let h,m=!1,E=null,f=null;n&&(h=s&&c.route.id?s[c.route.id]:void 0,E=c.route.errorElement||Qe,u&&(p<0&&g===0?(ot("route-fallback",!1),m=!0,f=null):p===g&&(m=!0,f=c.route.hydrateFallbackElement||null)));let y=t.concat(o.slice(0,g+1)),x=()=>{let P;return h?P=E:m?P=f:c.route.Component?P=l.createElement(c.route.Component,null):c.route.element?P=c.route.element:P=d,l.createElement(Ye,{match:c,routeContext:{outlet:d,matches:y,isDataRoute:n!=null},children:P})};return n&&(c.route.ErrorBoundary||c.route.errorElement||g===0)?l.createElement(Xe,{location:n.location,revalidation:n.revalidation,component:E,error:h,children:x(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):x()},null)}var ce=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(ce||{}),M=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(M||{});function et(e){let t=l.useContext(G);return t||v(!1),t}function tt(e){let t=l.useContext(Ke);return t||v(!1),t}function nt(e){let t=l.useContext(T);return t||v(!1),t}function de(e){let t=nt(),n=t.matches[t.matches.length-1];return n.route.id||v(!1),n.route.id}function rt(){var e;let t=l.useContext(le),n=tt(M.UseRouteError),r=de(M.UseRouteError);return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function at(){let{router:e}=et(ce.UseNavigateStable),t=de(M.UseNavigateStable),n=l.useRef(!1);return ue(()=>{n.current=!0}),l.useCallback(function(a,i){i===void 0&&(i={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,U({fromRouteId:t},i)))},[e,t])}const Z={};function ot(e,t,n){!t&&!Z[e]&&(Z[e]=!0)}const it="startTransition",ee=pe[it];function yt(e){let{basename:t,children:n,initialEntries:r,initialIndex:a,future:i}=e,o=l.useRef();o.current==null&&(o.current=Se({initialEntries:r,initialIndex:a,v5Compat:!0}));let s=o.current,[u,p]=l.useState({action:s.action,location:s.location}),{v7_startTransition:d}=i||{},c=l.useCallback(g=>{d&&ee?ee(()=>p(g)):p(g)},[p,d]);return l.useLayoutEffect(()=>s.listen(c),[s,c]),l.createElement(lt,{basename:t,children:n,location:u.location,navigationType:u.action,navigator:s,future:i})}function xt(e){let{to:t,replace:n,state:r,relative:a}=e;k()||v(!1);let{future:i,static:o}=l.useContext(D),{matches:s}=l.useContext(T),{pathname:u}=_(),p=We(),d=ie(t,oe(s,i.v7_relativeSplatPath),u,a==="path"),c=JSON.stringify(d);return l.useEffect(()=>p(JSON.parse(c),{replace:n,state:r,relative:a}),[p,c,a,n,r]),null}function st(e){v(!1)}function lt(e){let{basename:t="/",children:n=null,location:r,navigationType:a=N.Pop,navigator:i,static:o=!1,future:s}=e;k()&&v(!1);let u=t.replace(/^\/*/,"/"),p=l.useMemo(()=>({basename:u,navigator:i,static:o,future:U({v7_relativeSplatPath:!1},s)}),[u,s,i,o]);typeof r=="string"&&(r=O(r));let{pathname:d="/",search:c="",hash:g="",state:h=null,key:m="default"}=r,E=l.useMemo(()=>{let f=ae(d,u);return f==null?null:{location:{pathname:f,search:c,hash:g,state:h,key:m},navigationType:a}},[u,d,c,g,h,m,a]);return E==null?null:l.createElement(D.Provider,{value:p},l.createElement(w.Provider,{children:n,value:E}))}function Nt(e){let{children:t,location:n}=e;return Ve(J(t),n)}new Promise(()=>{});function J(e,t){t===void 0&&(t=[]);let n=[];return l.Children.forEach(e,(r,a)=>{if(!l.isValidElement(r))return;let i=[...t,a];if(r.type===l.Fragment){n.push.apply(n,J(r.props.children,i));return}r.type!==st&&v(!1),!r.props.index||!r.props.children||v(!1);let o={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=J(r.props.children,i)),n.push(o)}),n}const ut=e=>({[S.SØKERSITUASJON]:e.formatMessage({id:"UseStepConfig.Søkersituasjon"}),[S.OM_BARNET]:e.formatMessage({id:"UseStepConfig.OmBarnet"}),[S.TERMINBEKREFTELSE]:e.formatMessage({id:"UseStepConfig.Termin"}),[S.ADOPSJONSBEKREFTELSE]:e.formatMessage({id:"UseStepConfig.Adopsjon"}),[S.UTENLANDSOPPHOLD]:e.formatMessage({id:"UseStepConfig.Utenlandsopphold"}),[S.TIDLIGERE_UTENLANDSOPPHOLD]:e.formatMessage({id:"UseStepConfig.TidligereUtenlandsopphold"}),[S.SENERE_UTENLANDSOPPHOLD]:e.formatMessage({id:"UseStepConfig.FremtidigUtenlandsopphold"}),[S.OPPSUMMERING]:e.formatMessage({id:"UseStepConfig.Oppsummering"})}),ct=(e,t)=>F.indexOf(t)>F.indexOf(e),A=(e,t,n,r,a)=>e&&ct(n,r)||!!a(t),dt=(e,t,n)=>{if(e===S.TIDLIGERE_UTENLANDSOPPHOLD){const r=n(R.UTENLANDSOPPHOLD),a=!!(r!=null&&r.harBoddUtenforNorgeSiste12Mnd);return A(a,R.UTENLANDSOPPHOLD_TIDLIGERE,S.UTENLANDSOPPHOLD,t,n)}if(e===S.SENERE_UTENLANDSOPPHOLD){const r=n(R.UTENLANDSOPPHOLD),a=!!(r!=null&&r.skalBoUtenforNorgeNeste12Mnd);return A(a,R.UTENLANDSOPPHOLD_SENERE,S.UTENLANDSOPPHOLD,t,n)}return!1},pt=(e,t,n)=>{const r=n(R.OM_BARNET);return e===S.TERMINBEKREFTELSE&&r&&"erBarnetFødt"in r?A(!r.erBarnetFødt,R.DOKUMENTASJON,S.OM_BARNET,t,n):e===S.ADOPSJONSBEKREFTELSE&&r&&"adopsjonAvEktefellesBarn"in r?A(!0,R.DOKUMENTASJON,S.OM_BARNET,t,n):!1},ft=()=>{const e=fe(),t=ut(e),n=_(),r=Ee(),a=l.useMemo(()=>he(Object.values(S).find(o=>o===decodeURIComponent(n.pathname))),[n.pathname]),i=l.useMemo(()=>F.flatMap(o=>ve.includes(o)||dt(o,a,r)||pt(o,a,r)?[o]:[]),[a,r]);return l.useMemo(()=>i.map(o=>({id:o,label:t[o],isSelected:o===a})),[i,a,t])},Pt=e=>{const t=ft(),n=ge(R.CURRENT_PATH),r=t.find(p=>p.isSelected);return l.useEffect(()=>{q("sidevisning",{app:"engangsstonadny",team:"foreldrepenger",pageKey:r})},[r]),{goToPreviousDefaultStep:()=>{var c;const p=t.findIndex(g=>g.isSelected)-1,d=((c=t[p])==null?void 0:c.id)||S.VELKOMMEN;return n(d),e()},goToNextStep:p=>(n(p),e()),goToNextDefaultStep:()=>{var c;const p=t.findIndex(g=>g.isSelected)+1,d=(c=t[p])==null?void 0:c.id;return n(d),e()},avbrytSøknad:()=>(n(void 0),e()),fortsettSøknadSenere:()=>{q("applikasjon-hendelse",{app:"engangsstonadny",team:"foreldrepenger",hendelse:"fortsettSenere"}),window.location="https://nav.no"}}};export{R as C,me as E,yt as M,xt as N,S as P,lt as R,Pt as a,Et as b,ge as c,St as d,We as e,vt as f,gt as g,Ee as h,Nt as i,st as j,ft as u};
