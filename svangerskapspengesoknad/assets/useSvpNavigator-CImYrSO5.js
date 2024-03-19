import{r as f,a as me,c as ge,g as ee}from"./index-Dl6G-zuu.js";import{d as x,E as ve,f as Ee,I as j,k as K}from"./dateUtils-DAVVZO_E.js";import{c as Ie,a as v,C as L,b as Se}from"./routes-D-wJVrwa.js";import{u as Re}from"./Button-BkdplLyZ.js";import{n as xe}from"./dateFormValidation-C6gfkS6-.js";import{d as be}from"./_baseIteratee-Dcv9GQI-.js";import{_ as ye}from"./_baseUniq-BSa0oUtE.js";/**
 * @remix-run/router v1.15.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},P.apply(this,arguments)}var y;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(y||(y={}));const H="popstate";function Ne(e){e===void 0&&(e={});let{initialEntries:t=["/"],initialIndex:r,v5Compat:n=!1}=e,a;a=t.map((p,m)=>d(p,typeof p=="string"?null:p.state,m===0?"default":void 0));let i=l(r??a.length-1),o=y.Pop,s=null;function l(p){return Math.min(Math.max(p,0),a.length-1)}function u(){return a[i]}function d(p,m,E){m===void 0&&(m=null);let h=D(a?u().pathname:"/",p,m,E);return V(h.pathname.charAt(0)==="/","relative pathnames are not supported in memory history: "+JSON.stringify(p)),h}function c(p){return typeof p=="string"?p:$(p)}return{get index(){return i},get action(){return o},get location(){return u()},createHref:c,createURL(p){return new URL(c(p),"http://localhost")},encodeLocation(p){let m=typeof p=="string"?M(p):p;return{pathname:m.pathname||"",search:m.search||"",hash:m.hash||""}},push(p,m){o=y.Push;let E=d(p,m);i+=1,a.splice(i,a.length,E),n&&s&&s({action:o,location:E,delta:1})},replace(p,m){o=y.Replace;let E=d(p,m);a[i]=E,n&&s&&s({action:o,location:E,delta:0})},go(p){o=y.Pop;let m=l(i+p),E=a[m];i=m,s&&s({action:o,location:E,delta:p})},listen(p){return s=p,()=>{s=null}}}}function wt(e){e===void 0&&(e={});function t(n,a){let{pathname:i,search:o,hash:s}=n.location;return D("",{pathname:i,search:o,hash:s},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function r(n,a){return typeof a=="string"?a:$(a)}return Me(t,r,null,e)}function I(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function V(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Te(){return Math.random().toString(36).substr(2,8)}function q(e,t){return{usr:e.state,key:e.key,idx:t}}function D(e,t,r,n){return r===void 0&&(r=null),P({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?M(t):t,{state:r,key:t&&t.key||n||Te()})}function $(e){let{pathname:t="/",search:r="",hash:n=""}=e;return r&&r!=="?"&&(t+=r.charAt(0)==="?"?r:"?"+r),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function M(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}function Me(e,t,r,n){n===void 0&&(n={});let{window:a=document.defaultView,v5Compat:i=!1}=n,o=a.history,s=y.Pop,l=null,u=d();u==null&&(u=0,o.replaceState(P({},o.state,{idx:u}),""));function d(){return(o.state||{idx:null}).idx}function c(){s=y.Pop;let h=d(),S=h==null?null:h-u;u=h,l&&l({action:s,location:E.location,delta:S})}function g(h,S){s=y.Push;let R=D(E.location,h,S);r&&r(R,h),u=d()+1;let N=q(R,u),U=E.createHref(R);try{o.pushState(N,"",U)}catch(G){if(G instanceof DOMException&&G.name==="DataCloneError")throw G;a.location.assign(U)}i&&l&&l({action:s,location:E.location,delta:1})}function p(h,S){s=y.Replace;let R=D(E.location,h,S);r&&r(R,h),u=d();let N=q(R,u),U=E.createHref(R);o.replaceState(N,"",U),i&&l&&l({action:s,location:E.location,delta:0})}function m(h){let S=a.location.origin!=="null"?a.location.origin:a.location.href,R=typeof h=="string"?h:$(h);return R=R.replace(/ $/,"%20"),I(S,"No window.location.(origin|href) available to create URL for href: "+R),new URL(R,S)}let E={get action(){return s},get location(){return e(a,o)},listen(h){if(l)throw new Error("A history only accepts one active listener");return a.addEventListener(H,c),l=h,()=>{a.removeEventListener(H,c),l=null}},createHref(h){return t(a,h)},createURL:m,encodeLocation(h){let S=m(h);return{pathname:S.pathname,search:S.search,hash:S.hash}},push:g,replace:p,go(h){return o.go(h)}};return E}var z;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(z||(z={}));function Ce(e,t,r){r===void 0&&(r="/");let n=typeof t=="string"?M(t):t,a=ne(n.pathname||"/",r);if(a==null)return null;let i=te(e);Le(i);let o=null;for(let s=0;o==null&&s<i.length;++s){let l=Je(a);o=we(i[s],l)}return o}function te(e,t,r,n){t===void 0&&(t=[]),r===void 0&&(r=[]),n===void 0&&(n="");let a=(i,o,s)=>{let l={relativePath:s===void 0?i.path||"":s,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};l.relativePath.startsWith("/")&&(I(l.relativePath.startsWith(n),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+n+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(n.length));let u=T([n,l.relativePath]),d=r.concat(l);i.children&&i.children.length>0&&(I(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),te(i.children,t,d,u)),!(i.path==null&&!i.index)&&t.push({path:u,score:Be(u,i.index),routesMeta:d})};return e.forEach((i,o)=>{var s;if(i.path===""||!((s=i.path)!=null&&s.includes("?")))a(i,o);else for(let l of re(i.path))a(i,o,l)}),t}function re(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,a=r.endsWith("?"),i=r.replace(/\?$/,"");if(n.length===0)return a?[i,""]:[i];let o=re(n.join("/")),s=[];return s.push(...o.map(l=>l===""?i:[i,l].join("/"))),a&&s.push(...o),s.map(l=>e.startsWith("/")&&l===""?"/":l)}function Le(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:ke(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}const Pe=/^:[\w-]+$/,Ae=3,Oe=2,_e=1,Ue=10,De=-2,Q=e=>e==="*";function Be(e,t){let r=e.split("/"),n=r.length;return r.some(Q)&&(n+=De),t&&(n+=Oe),r.filter(a=>!Q(a)).reduce((a,i)=>a+(Pe.test(i)?Ae:i===""?_e:Ue),n)}function ke(e,t){return e.length===t.length&&e.slice(0,-1).every((n,a)=>n===t[a])?e[e.length-1]-t[t.length-1]:0}function we(e,t){let{routesMeta:r}=e,n={},a="/",i=[];for(let o=0;o<r.length;++o){let s=r[o],l=o===r.length-1,u=a==="/"?t:t.slice(a.length)||"/",d=Ge({path:s.relativePath,caseSensitive:s.caseSensitive,end:l},u);if(!d)return null;Object.assign(n,d.params);let c=s.route;i.push({params:n,pathname:T([a,d.pathname]),pathnameBase:je(T([a,d.pathnameBase])),route:c}),d.pathnameBase!=="/"&&(a=T([a,d.pathnameBase]))}return i}function Ge(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=Fe(e.path,e.caseSensitive,e.end),a=t.match(r);if(!a)return null;let i=a[0],o=i.replace(/(.)\/+$/,"$1"),s=a.slice(1);return{params:n.reduce((u,d,c)=>{let{paramName:g,isOptional:p}=d;if(g==="*"){let E=s[c]||"";o=i.slice(0,i.length-E.length).replace(/(.)\/+$/,"$1")}const m=s[c];return p&&!m?u[g]=void 0:u[g]=(m||"").replace(/%2F/g,"/"),u},{}),pathname:i,pathnameBase:o,pattern:e}}function Fe(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!0),V(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let n=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,s,l)=>(n.push({paramName:s,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),n]}function Je(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return V(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function ne(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}function Ve(e,t){t===void 0&&(t="/");let{pathname:r,search:n="",hash:a=""}=typeof e=="string"?M(e):e;return{pathname:r?r.startsWith("/")?r:$e(r,t):t,search:Ke(n),hash:He(a)}}function $e(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?r.length>1&&r.pop():a!=="."&&r.push(a)}),r.length>1?r.join("/"):"/"}function F(e,t,r,n){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(n)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function We(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function ae(e,t){let r=We(e);return t?r.map((n,a)=>a===e.length-1?n.pathname:n.pathnameBase):r.map(n=>n.pathnameBase)}function ie(e,t,r,n){n===void 0&&(n=!1);let a;typeof e=="string"?a=M(e):(a=P({},e),I(!a.pathname||!a.pathname.includes("?"),F("?","pathname","search",a)),I(!a.pathname||!a.pathname.includes("#"),F("#","pathname","hash",a)),I(!a.search||!a.search.includes("#"),F("#","search","hash",a)));let i=e===""||a.pathname==="",o=i?"/":a.pathname,s;if(o==null)s=r;else{let c=t.length-1;if(!n&&o.startsWith("..")){let g=o.split("/");for(;g[0]==="..";)g.shift(),c-=1;a.pathname=g.join("/")}s=c>=0?t[c]:"/"}let l=Ve(a,s),u=o&&o!=="/"&&o.endsWith("/"),d=(i||o===".")&&r.endsWith("/");return!l.pathname.endsWith("/")&&(u||d)&&(l.pathname+="/"),l}const T=e=>e.join("/").replace(/\/\/+/g,"/"),je=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Ke=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,He=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function qe(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const oe=["post","put","patch","delete"];new Set(oe);const ze=["get",...oe];new Set(ze);/**
 * React Router v6.22.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function A(){return A=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},A.apply(this,arguments)}const W=f.createContext(null),Qe=f.createContext(null),O=f.createContext(null),k=f.createContext(null),C=f.createContext({outlet:null,matches:[],isDataRoute:!1}),se=f.createContext(null);function _(){return f.useContext(k)!=null}function w(){return _()||I(!1),f.useContext(k).location}function le(e){f.useContext(O).static||f.useLayoutEffect(e)}function Xe(){let{isDataRoute:e}=f.useContext(C);return e?ct():Ye()}function Ye(){_()||I(!1);let e=f.useContext(W),{basename:t,future:r,navigator:n}=f.useContext(O),{matches:a}=f.useContext(C),{pathname:i}=w(),o=JSON.stringify(ae(a,r.v7_relativeSplatPath)),s=f.useRef(!1);return le(()=>{s.current=!0}),f.useCallback(function(u,d){if(d===void 0&&(d={}),!s.current)return;if(typeof u=="number"){n.go(u);return}let c=ie(u,JSON.parse(o),i,d.relative==="path");e==null&&t!=="/"&&(c.pathname=c.pathname==="/"?t:T([t,c.pathname])),(d.replace?n.replace:n.push)(c,d.state,d)},[t,n,o,i,e])}function Ze(e,t){return et(e,t)}function et(e,t,r,n){_()||I(!1);let{navigator:a}=f.useContext(O),{matches:i}=f.useContext(C),o=i[i.length-1],s=o?o.params:{};o&&o.pathname;let l=o?o.pathnameBase:"/";o&&o.route;let u=w(),d;if(t){var c;let h=typeof t=="string"?M(t):t;l==="/"||(c=h.pathname)!=null&&c.startsWith(l)||I(!1),d=h}else d=u;let g=d.pathname||"/",p=g;if(l!=="/"){let h=l.replace(/^\//,"").split("/");p="/"+g.replace(/^\//,"").split("/").slice(h.length).join("/")}let m=Ce(e,{pathname:p}),E=it(m&&m.map(h=>Object.assign({},h,{params:Object.assign({},s,h.params),pathname:T([l,a.encodeLocation?a.encodeLocation(h.pathname).pathname:h.pathname]),pathnameBase:h.pathnameBase==="/"?l:T([l,a.encodeLocation?a.encodeLocation(h.pathnameBase).pathname:h.pathnameBase])})),i,r,n);return t&&E?f.createElement(k.Provider,{value:{location:A({pathname:"/",search:"",hash:"",state:null,key:"default"},d),navigationType:y.Pop}},E):E}function tt(){let e=ut(),t=qe(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return f.createElement(f.Fragment,null,f.createElement("h2",null,"Unexpected Application Error!"),f.createElement("h3",{style:{fontStyle:"italic"}},t),r?f.createElement("pre",{style:a},r):null,null)}const rt=f.createElement(tt,null);class nt extends f.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location||r.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:r.error,location:r.location,revalidation:t.revalidation||r.revalidation}}componentDidCatch(t,r){console.error("React Router caught the following error during render",t,r)}render(){return this.state.error!==void 0?f.createElement(C.Provider,{value:this.props.routeContext},f.createElement(se.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function at(e){let{routeContext:t,match:r,children:n}=e,a=f.useContext(W);return a&&a.static&&a.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=r.route.id),f.createElement(C.Provider,{value:t},n)}function it(e,t,r,n){var a;if(t===void 0&&(t=[]),r===void 0&&(r=null),n===void 0&&(n=null),e==null){var i;if((i=r)!=null&&i.errors)e=r.matches;else return null}let o=e,s=(a=r)==null?void 0:a.errors;if(s!=null){let d=o.findIndex(c=>c.route.id&&(s==null?void 0:s[c.route.id]));d>=0||I(!1),o=o.slice(0,Math.min(o.length,d+1))}let l=!1,u=-1;if(r&&n&&n.v7_partialHydration)for(let d=0;d<o.length;d++){let c=o[d];if((c.route.HydrateFallback||c.route.hydrateFallbackElement)&&(u=d),c.route.id){let{loaderData:g,errors:p}=r,m=c.route.loader&&g[c.route.id]===void 0&&(!p||p[c.route.id]===void 0);if(c.route.lazy||m){l=!0,u>=0?o=o.slice(0,u+1):o=[o[0]];break}}}return o.reduceRight((d,c,g)=>{let p,m=!1,E=null,h=null;r&&(p=s&&c.route.id?s[c.route.id]:void 0,E=c.route.errorElement||rt,l&&(u<0&&g===0?(dt("route-fallback",!1),m=!0,h=null):u===g&&(m=!0,h=c.route.hydrateFallbackElement||null)));let S=t.concat(o.slice(0,g+1)),R=()=>{let N;return p?N=E:m?N=h:c.route.Component?N=f.createElement(c.route.Component,null):c.route.element?N=c.route.element:N=d,f.createElement(at,{match:c,routeContext:{outlet:d,matches:S,isDataRoute:r!=null},children:N})};return r&&(c.route.ErrorBoundary||c.route.errorElement||g===0)?f.createElement(nt,{location:r.location,revalidation:r.revalidation,component:E,error:p,children:R(),routeContext:{outlet:null,matches:S,isDataRoute:!0}}):R()},null)}var ue=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(ue||{}),B=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(B||{});function ot(e){let t=f.useContext(W);return t||I(!1),t}function st(e){let t=f.useContext(Qe);return t||I(!1),t}function lt(e){let t=f.useContext(C);return t||I(!1),t}function ce(e){let t=lt(),r=t.matches[t.matches.length-1];return r.route.id||I(!1),r.route.id}function ut(){var e;let t=f.useContext(se),r=st(B.UseRouteError),n=ce(B.UseRouteError);return t!==void 0?t:(e=r.errors)==null?void 0:e[n]}function ct(){let{router:e}=ot(ue.UseNavigateStable),t=ce(B.UseNavigateStable),r=f.useRef(!1);return le(()=>{r.current=!0}),f.useCallback(function(a,i){i===void 0&&(i={}),r.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,A({fromRouteId:t},i)))},[e,t])}const X={};function dt(e,t,r){!t&&!X[e]&&(X[e]=!0)}const ft="startTransition",Y=me[ft];function Gt(e){let{basename:t,children:r,initialEntries:n,initialIndex:a,future:i}=e,o=f.useRef();o.current==null&&(o.current=Ne({initialEntries:n,initialIndex:a,v5Compat:!0}));let s=o.current,[l,u]=f.useState({action:s.action,location:s.location}),{v7_startTransition:d}=i||{},c=f.useCallback(g=>{d&&Y?Y(()=>u(g)):u(g)},[u,d]);return f.useLayoutEffect(()=>s.listen(c),[s,c]),f.createElement(ht,{basename:t,children:r,location:l.location,navigationType:l.action,navigator:s,future:i})}function Ft(e){let{to:t,replace:r,state:n,relative:a}=e;_()||I(!1);let{future:i,static:o}=f.useContext(O),{matches:s}=f.useContext(C),{pathname:l}=w(),u=Xe(),d=ie(t,ae(s,i.v7_relativeSplatPath),l,a==="path"),c=JSON.stringify(d);return f.useEffect(()=>u(JSON.parse(c),{replace:r,state:n,relative:a}),[u,c,a,r,n]),null}function pt(e){I(!1)}function ht(e){let{basename:t="/",children:r=null,location:n,navigationType:a=y.Pop,navigator:i,static:o=!1,future:s}=e;_()&&I(!1);let l=t.replace(/^\/*/,"/"),u=f.useMemo(()=>({basename:l,navigator:i,static:o,future:A({v7_relativeSplatPath:!1},s)}),[l,s,i,o]);typeof n=="string"&&(n=M(n));let{pathname:d="/",search:c="",hash:g="",state:p=null,key:m="default"}=n,E=f.useMemo(()=>{let h=ne(d,l);return h==null?null:{location:{pathname:h,search:c,hash:g,state:p,key:m},navigationType:a}},[l,d,c,g,p,m,a]);return E==null?null:f.createElement(O.Provider,{value:u},f.createElement(k.Provider,{children:r,value:E}))}function Jt(e){let{children:t,location:r}=e;return Ze(J(t),r)}new Promise(()=>{});function J(e,t){t===void 0&&(t=[]);let r=[];return f.Children.forEach(e,(n,a)=>{if(!f.isValidElement(n))return;let i=[...t,a];if(n.type===f.Fragment){r.push.apply(r,J(n.props.children,i));return}n.type!==pt&&I(!1),!n.props.index||!n.props.children||I(!1);let o={id:n.props.id||i.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(o.children=J(n.props.children,i)),r.push(o)}),r}var de=(e=>(e.INGEN="ingen",e.DELVIS="delvis",e))(de||{}),mt=(e=>(e.INGEN="ingen",e.DELVIS="delvis",e.HEL="hel",e))(mt||{}),gt=(e=>(e.VIRKSOMHET="virksomhet",e.SELVSTENDIG="selvstendig",e.FRILANSER="frilanser",e.PRIVAT="privat",e))(gt||{}),vt=(e=>(e.VALGFRI_DATO="VALGFRI_DATO",e.SISTE_DAG_MED_SVP="SISTE_DAG_MED_SVP",e))(vt||{}),fe={exports:{}};(function(e,t){(function(r,n){e.exports=n()})(ge,function(){return function(r,n,a){var i=function(o,s){if(!s||!s.length||s.length===1&&!s[0]||s.length===1&&Array.isArray(s[0])&&!s[0].length)return null;var l;s.length===1&&s[0].length>0&&(s=s[0]),l=(s=s.filter(function(d){return d}))[0];for(var u=1;u<s.length;u+=1)s[u].isValid()&&!s[u][o](l)||(l=s[u]);return l};a.max=function(){var o=[].slice.call(arguments,0);return i("isAfter",o)},a.min=function(){var o=[].slice.call(arguments,0);return i("isBefore",o)}}})})(fe);var Et=fe.exports;const It=ee(Et);var St=be,Rt=ye;function xt(e,t){return e&&e.length?Rt(e,St(t)):[]}var bt=xt;const yt=ee(bt);x.extend(ve);x.extend(Ee);x.extend(It);const Nt=(e,t)=>t===void 0?e:e.filter(r=>r.tom?x(r.tom).isSameOrAfter(x(t).subtract(9,"months"),"day"):!0),Z=e=>e.arbeidsgiverId||"",Vt=(e,t)=>{if(t){const r=e.filter(n=>n.tom?x(t).isBetween(x(n.fom),x(n.tom),"day","[]"):x(t).isSameOrAfter(x(n.fom),"d"));if(r)return r.some(a=>a.stillingsprosent===0)?100:r.reduce((a,{stillingsprosent:i})=>a+i,0)||100}return 100},Tt=e=>e.map(r=>({fom:r.fom,tom:r.tom,stillingsprosent:r.stillingsprosent})),Mt=(e,t)=>{if(e!==void 0&&e.length>0){const r=Nt(e,t);return yt(r,Z).map(i=>({id:i.arbeidsgiverId,fom:i.fom,tom:i.tom,arbeidsgiverNavn:i.arbeidsgiverNavn,arbeidsgiverId:i.arbeidsgiverId,arbeidsgiverIdType:i.arbeidsgiverIdType,stillinger:[{fom:i.fom,tom:i.tom,stillingsprosent:i.stillingsprosent}]})).map(i=>{const o=r.filter(s=>Z(s)===i.arbeidsgiverId);if(o&&o.length>1){const s=o.map(l=>l.tom);return{...i,fom:x.min(o.map(l=>x(l.fom))).format(j),tom:s.includes(void 0)?void 0:x.max(s.map(l=>x(l))).format(j),stillinger:Tt(o)}}else return i})}return[]},Ct=(e,t,r,n)=>{const a=Mt(t,e);return a.length===1&&!r&&!n||a.length===0&&r&&!n||a.length===0&&!r&&n},$t=(e,t)=>{const r=e.harJobbetSomFrilans,n=e.harJobbetSomSelvstendigNæringsdrivende,a=e.harHattArbeidIUtlandet;return r&&!n&&!a?t.formatMessage({id:"oppsummering.harIkkeNæringEllerJobbIUtlandet"}):!r&&n&&!a?t.formatMessage({id:"oppsummering.erIkkeFrilanserEllerJobbIUtlandet"}):!r&&!n&&a?t.formatMessage({id:"oppsummering.erIkkeFrilanserEllerNæringsdrivende"}):r&&n&&!a?t.formatMessage({id:"oppsummering.harIkkeJobbIUtlandet"}):r&&!n&&a?t.formatMessage({id:"oppsummering.harIkkeNæring"}):!r&&!n&&!a?t.formatMessage({id:"oppsummering.erIkkeFrilanserHarIkkeNæringJobbetIkkeIUtlandet"}):t.formatMessage({id:"oppsummering.erIkkeFrilanser"})};var pe=(e=>(e.SAMMME_PERIODE_FREM_TIL_TERMIN="SAMMME_PERIODE_FREM_TIL_TERMIN",e.VARIERTE_PERIODER="VARIERTE_PERIODER",e))(pe||{});const he=(e,t,r)=>({[v.BARNET]:e.formatMessage({id:"steps.label.barnet"}),[v.INNTEKTSINFORMASJON]:e.formatMessage({id:"steps.label.arbeid"}),[v.ARBEID_I_UTLANDET]:e.formatMessage({id:"steps.label.arbeidIUtlandet"}),[v.FORSIDE]:"",[v.FRILANS]:e.formatMessage({id:"steps.label.frilans"}),[v.HAR_BODD_I_UTLANDET]:e.formatMessage({id:"steps.label.boIUtlandetIFortid"}),[v.NÆRING]:e.formatMessage({id:"steps.label.næring"}),[v.OPPSUMMERING]:e.formatMessage({id:"steps.label.oppsummering"}),[v.PERIODER]:t?e.formatMessage({id:"steps.label.periode.flere"},{navn:r}):e.formatMessage({id:"steps.label.periode.en"}),[v.SKAL_BO_I_UTLANDET]:e.formatMessage({id:"steps.label.boIUtlandetIFremtid"}),[v.SKJEMA]:t?e.formatMessage({id:"steps.label.skjema.flere"},{navn:r}):e.formatMessage({id:"steps.label.skjema.en"}),[v.TILRETTELEGGING]:t?e.formatMessage({id:"steps.label.tilrettelegging.flere"},{navn:r}):e.formatMessage({id:"steps.label.tilrettelegging.en"}),[v.UTENLANDSOPPHOLD]:e.formatMessage({id:"steps.label.utenlandsopphold"}),[v.VELG_ARBEID]:e.formatMessage({id:"steps.label.velgArbeid"})}),b=(e,t,r)=>({id:e,label:he(t)[e],isSelected:r===e}),Lt=(e,t,r,n)=>{const a=n(L.INNTEKTSINFORMASJON),i=n(L.TILRETTELEGGINGER),o=n(L.OM_BARNET),s=n(L.UTENLANDSOPPHOLD),l=n(L.VALGT_TILRETTELEGGING_ID),u=[b(v.BARNET,e,t),b(v.UTENLANDSOPPHOLD,e,t)];if(s!=null&&s.harBoddUtenforNorgeSiste12Mnd&&u.push(b(v.HAR_BODD_I_UTLANDET,e,t)),s!=null&&s.skalBoUtenforNorgeNeste12Mnd&&u.push(b(v.SKAL_BO_I_UTLANDET,e,t)),u.push(b(v.INNTEKTSINFORMASJON,e,t)),a!=null&&a.harJobbetSomFrilans&&u.push(b(v.FRILANS,e,t)),a!=null&&a.harJobbetSomSelvstendigNæringsdrivende&&u.push(b(v.NÆRING,e,t)),a!=null&&a.harHattArbeidIUtlandet&&u.push(b(v.ARBEID_I_UTLANDET,e,t)),(o&&o.termindato?Ct(o.termindato,r,(a==null?void 0:a.harJobbetSomFrilans)||!1,(a==null?void 0:a.harJobbetSomSelvstendigNæringsdrivende)||!1):!0)||u.push(b(v.VELG_ARBEID,e,t)),i&&i.length>0){const c=i.length>1;i.forEach(g=>{const p=g.arbeidsforhold.navn,m=he(e,c,p);u.push({id:v.SKJEMA,label:m[v.SKJEMA],isSelected:t===v.SKJEMA&&g.id===l}),u.push({id:v.TILRETTELEGGING,label:m[v.TILRETTELEGGING],isSelected:t===v.TILRETTELEGGING&&g.id===l}),g.type===de.DELVIS&&g.delvisTilretteleggingPeriodeType===pe.VARIERTE_PERIODER&&u.push({id:v.PERIODER,label:m[v.PERIODER],isSelected:t===v.PERIODER&&g.id===l})})}else u.push(b(v.SKJEMA,e,t)),u.push(b(v.TILRETTELEGGING,e,t));return u.push(b(v.OPPSUMMERING,e,t)),u},Pt=e=>{const t=Re(),r=w(),n=Ie(),a=f.useMemo(()=>xe(Object.values(v).find(i=>i===decodeURIComponent(r.pathname))),[r.pathname]);return Lt(t,a,e,n)},Wt=(e,t)=>{const r=Pt(t),n=Se(L.APP_ROUTE),a=r.find(u=>u.isSelected);return f.useEffect(()=>{K("sidevisning",{app:"svangerskapspenger",team:"foreldrepenger",pageKey:a})},[a]),{goToPreviousDefaultStep:()=>{var c;const u=r.findIndex(g=>g.isSelected)-1,d=((c=r[u])==null?void 0:c.id)||v.FORSIDE;return n(d),e()},goToNextStep:u=>(n(u),e()),goToNextDefaultStep:()=>{var c;const u=r.findIndex(g=>g.isSelected)+1,d=(c=r[u])==null?void 0:c.id;return n(d),e()},fortsettSøknadSenere:()=>{K("applikasjon-hendelse",{app:"svangerskapspenger",team:"foreldrepenger",hendelse:"fortsettSenere"}),window.location="https://nav.no"}}};export{gt as A,pe as D,Gt as M,Ft as N,ht as R,de as T,Wt as a,Vt as b,vt as c,mt as d,Mt as e,$t as f,Nt as g,wt as h,Xe as i,Jt as j,pt as k,It as m,Ct as s,Pt as u};
