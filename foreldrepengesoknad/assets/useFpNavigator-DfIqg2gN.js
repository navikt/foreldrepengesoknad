import{r as f,a as fe}from"./index-CTjT7uj6.js";import{ae as pe,a0 as A,n as he,a4 as me,af as ge,ag as Ee,ah as q}from"./Uttaksplan-BNLrPXqp.js";import{d as Q}from"./Uttaksdagen-Uuolrvsk.js";import"./jsx-runtime-Cw0GR0a5.js";import{c as ve,C as S,a as Ne}from"./FpDataContext-DbGuQRR8.js";import{u as Se}from"./Label-DlDsESPM.js";/**
 * @remix-run/router v1.19.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function C(){return C=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},C.apply(this,arguments)}var R;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(R||(R={}));const Y="popstate";function Oe(e){e===void 0&&(e={});let{initialEntries:t=["/"],initialIndex:r,v5Compat:n=!1}=e,a;a=t.map((p,g)=>d(p,typeof p=="string"?null:p.state,g===0?"default":void 0));let o=i(r??a.length-1),l=R.Pop,s=null;function i(p){return Math.min(Math.max(p,0),a.length-1)}function c(){return a[o]}function d(p,g,E){g===void 0&&(g=null);let h=B(a?c().pathname:"/",p,g,E);return $(h.pathname.charAt(0)==="/","relative pathnames are not supported in memory history: "+JSON.stringify(p)),h}function u(p){return typeof p=="string"?p:J(p)}return{get index(){return o},get action(){return l},get location(){return c()},createHref:u,createURL(p){return new URL(u(p),"http://localhost")},encodeLocation(p){let g=typeof p=="string"?y(p):p;return{pathname:g.pathname||"",search:g.search||"",hash:g.hash||""}},push(p,g){l=R.Push;let E=d(p,g);o+=1,a.splice(o,a.length,E),n&&s&&s({action:l,location:E,delta:1})},replace(p,g){l=R.Replace;let E=d(p,g);a[o]=E,n&&s&&s({action:l,location:E,delta:0})},go(p){l=R.Pop;let g=i(o+p),E=a[g];o=g,s&&s({action:l,location:E,delta:p})},listen(p){return s=p,()=>{s=null}}}}function Lt(e){e===void 0&&(e={});function t(n,a){let{pathname:o,search:l,hash:s}=n.location;return B("",{pathname:o,search:l,hash:s},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function r(n,a){return typeof a=="string"?a:J(a)}return Re(t,r,null,e)}function N(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function $(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Pe(){return Math.random().toString(36).substr(2,8)}function X(e,t){return{usr:e.state,key:e.key,idx:t}}function B(e,t,r,n){return r===void 0&&(r=null),C({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?y(t):t,{state:r,key:t&&t.key||n||Pe()})}function J(e){let{pathname:t="/",search:r="",hash:n=""}=e;return r&&r!=="?"&&(t+=r.charAt(0)==="?"?r:"?"+r),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function y(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}function Re(e,t,r,n){n===void 0&&(n={});let{window:a=document.defaultView,v5Compat:o=!1}=n,l=a.history,s=R.Pop,i=null,c=d();c==null&&(c=0,l.replaceState(C({},l.state,{idx:c}),""));function d(){return(l.state||{idx:null}).idx}function u(){s=R.Pop;let h=d(),O=h==null?null:h-c;c=h,i&&i({action:s,location:E.location,delta:O})}function m(h,O){s=R.Push;let P=B(E.location,h,O);c=d()+1;let I=X(P,c),U=E.createHref(P);try{l.pushState(I,"",U)}catch(F){if(F instanceof DOMException&&F.name==="DataCloneError")throw F;a.location.assign(U)}o&&i&&i({action:s,location:E.location,delta:1})}function p(h,O){s=R.Replace;let P=B(E.location,h,O);c=d();let I=X(P,c),U=E.createHref(P);l.replaceState(I,"",U),o&&i&&i({action:s,location:E.location,delta:0})}function g(h){let O=a.location.origin!=="null"?a.location.origin:a.location.href,P=typeof h=="string"?h:J(h);return P=P.replace(/ $/,"%20"),N(O,"No window.location.(origin|href) available to create URL for href: "+P),new URL(P,O)}let E={get action(){return s},get location(){return e(a,l)},listen(h){if(i)throw new Error("A history only accepts one active listener");return a.addEventListener(Y,u),i=h,()=>{a.removeEventListener(Y,u),i=null}},createHref(h){return t(a,h)},createURL:g,encodeLocation(h){let O=g(h);return{pathname:O.pathname,search:O.search,hash:O.hash}},push:m,replace:p,go(h){return l.go(h)}};return E}var Z;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Z||(Z={}));function Ie(e,t,r){return r===void 0&&(r="/"),Te(e,t,r,!1)}function Te(e,t,r,n){let a=typeof t=="string"?y(t):t,o=oe(a.pathname||"/",r);if(o==null)return null;let l=ne(e);xe(l);let s=null;for(let i=0;s==null&&i<l.length;++i){let c=we(o);s=Ue(l[i],c,n)}return s}function ne(e,t,r,n){t===void 0&&(t=[]),r===void 0&&(r=[]),n===void 0&&(n="");let a=(o,l,s)=>{let i={relativePath:s===void 0?o.path||"":s,caseSensitive:o.caseSensitive===!0,childrenIndex:l,route:o};i.relativePath.startsWith("/")&&(N(i.relativePath.startsWith(n),'Absolute route path "'+i.relativePath+'" nested under path '+('"'+n+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),i.relativePath=i.relativePath.slice(n.length));let c=T([n,i.relativePath]),d=r.concat(i);o.children&&o.children.length>0&&(N(o.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),ne(o.children,t,d,c)),!(o.path==null&&!o.index)&&t.push({path:c,score:be(c,o.index),routesMeta:d})};return e.forEach((o,l)=>{var s;if(o.path===""||!((s=o.path)!=null&&s.includes("?")))a(o,l);else for(let i of ae(o.path))a(o,l,i)}),t}function ae(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,a=r.endsWith("?"),o=r.replace(/\?$/,"");if(n.length===0)return a?[o,""]:[o];let l=ae(n.join("/")),s=[];return s.push(...l.map(i=>i===""?o:[o,i].join("/"))),a&&s.push(...l),s.map(i=>e.startsWith("/")&&i===""?"/":i)}function xe(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:_e(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}const ye=/^:[\w-]+$/,Le=3,Ae=2,Me=1,De=10,Ce=-2,ee=e=>e==="*";function be(e,t){let r=e.split("/"),n=r.length;return r.some(ee)&&(n+=Ce),t&&(n+=Ae),r.filter(a=>!ee(a)).reduce((a,o)=>a+(ye.test(o)?Le:o===""?Me:De),n)}function _e(e,t){return e.length===t.length&&e.slice(0,-1).every((n,a)=>n===t[a])?e[e.length-1]-t[t.length-1]:0}function Ue(e,t,r){let{routesMeta:n}=e,a={},o="/",l=[];for(let s=0;s<n.length;++s){let i=n[s],c=s===n.length-1,d=o==="/"?t:t.slice(o.length)||"/",u=te({path:i.relativePath,caseSensitive:i.caseSensitive,end:c},d),m=i.route;if(!u&&c&&r&&!n[n.length-1].route.index&&(u=te({path:i.relativePath,caseSensitive:i.caseSensitive,end:!1},d)),!u)return null;Object.assign(a,u.params),l.push({params:a,pathname:T([o,u.pathname]),pathnameBase:je(T([o,u.pathnameBase])),route:m}),u.pathnameBase!=="/"&&(o=T([o,u.pathnameBase]))}return l}function te(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=Be(e.path,e.caseSensitive,e.end),a=t.match(r);if(!a)return null;let o=a[0],l=o.replace(/(.)\/+$/,"$1"),s=a.slice(1);return{params:n.reduce((c,d,u)=>{let{paramName:m,isOptional:p}=d;if(m==="*"){let E=s[u]||"";l=o.slice(0,o.length-E.length).replace(/(.)\/+$/,"$1")}const g=s[u];return p&&!g?c[m]=void 0:c[m]=(g||"").replace(/%2F/g,"/"),c},{}),pathname:o,pathnameBase:l,pattern:e}}function Be(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!0),$(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let n=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(l,s,i)=>(n.push({paramName:s,isOptional:i!=null}),i?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),n]}function we(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return $(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function oe(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}function Ke(e,t){t===void 0&&(t="/");let{pathname:r,search:n="",hash:a=""}=typeof e=="string"?y(e):e;return{pathname:r?r.startsWith("/")?r:Fe(r,t):t,search:Ge(n),hash:He(a)}}function Fe(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?r.length>1&&r.pop():a!=="."&&r.push(a)}),r.length>1?r.join("/"):"/"}function k(e,t,r,n){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(n)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function ke(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function V(e,t){let r=ke(e);return t?r.map((n,a)=>a===r.length-1?n.pathname:n.pathnameBase):r.map(n=>n.pathnameBase)}function W(e,t,r,n){n===void 0&&(n=!1);let a;typeof e=="string"?a=y(e):(a=C({},e),N(!a.pathname||!a.pathname.includes("?"),k("?","pathname","search",a)),N(!a.pathname||!a.pathname.includes("#"),k("#","pathname","hash",a)),N(!a.search||!a.search.includes("#"),k("#","search","hash",a)));let o=e===""||a.pathname==="",l=o?"/":a.pathname,s;if(l==null)s=r;else{let u=t.length-1;if(!n&&l.startsWith("..")){let m=l.split("/");for(;m[0]==="..";)m.shift(),u-=1;a.pathname=m.join("/")}s=u>=0?t[u]:"/"}let i=Ke(a,s),c=l&&l!=="/"&&l.endsWith("/"),d=(o||l===".")&&r.endsWith("/");return!i.pathname.endsWith("/")&&(c||d)&&(i.pathname+="/"),i}const T=e=>e.join("/").replace(/\/\/+/g,"/"),je=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Ge=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,He=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function $e(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const le=["post","put","patch","delete"];new Set(le);const Je=["get",...le];new Set(Je);/**
 * React Router v6.26.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function b(){return b=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},b.apply(this,arguments)}const z=f.createContext(null),Ve=f.createContext(null),L=f.createContext(null),K=f.createContext(null),x=f.createContext({outlet:null,matches:[],isDataRoute:!1}),ie=f.createContext(null);function At(e,t){let{relative:r}=t===void 0?{}:t;M()||N(!1);let{basename:n,navigator:a}=f.useContext(L),{hash:o,pathname:l,search:s}=qe(e,{relative:r}),i=l;return n!=="/"&&(i=l==="/"?n:T([n,l])),a.createHref({pathname:i,search:s,hash:o})}function M(){return f.useContext(K)!=null}function _(){return M()||N(!1),f.useContext(K).location}function se(e){f.useContext(L).static||f.useLayoutEffect(e)}function We(){let{isDataRoute:e}=f.useContext(x);return e?it():ze()}function ze(){M()||N(!1);let e=f.useContext(z),{basename:t,future:r,navigator:n}=f.useContext(L),{matches:a}=f.useContext(x),{pathname:o}=_(),l=JSON.stringify(V(a,r.v7_relativeSplatPath)),s=f.useRef(!1);return se(()=>{s.current=!0}),f.useCallback(function(c,d){if(d===void 0&&(d={}),!s.current)return;if(typeof c=="number"){n.go(c);return}let u=W(c,JSON.parse(l),o,d.relative==="path");e==null&&t!=="/"&&(u.pathname=u.pathname==="/"?t:T([t,u.pathname])),(d.replace?n.replace:n.push)(u,d.state,d)},[t,n,l,o,e])}function qe(e,t){let{relative:r}=t===void 0?{}:t,{future:n}=f.useContext(L),{matches:a}=f.useContext(x),{pathname:o}=_(),l=JSON.stringify(V(a,n.v7_relativeSplatPath));return f.useMemo(()=>W(e,JSON.parse(l),o,r==="path"),[e,l,o,r])}function Qe(e,t){return Ye(e,t)}function Ye(e,t,r,n){M()||N(!1);let{navigator:a}=f.useContext(L),{matches:o}=f.useContext(x),l=o[o.length-1],s=l?l.params:{};l&&l.pathname;let i=l?l.pathnameBase:"/";l&&l.route;let c=_(),d;if(t){var u;let h=typeof t=="string"?y(t):t;i==="/"||(u=h.pathname)!=null&&u.startsWith(i)||N(!1),d=h}else d=c;let m=d.pathname||"/",p=m;if(i!=="/"){let h=i.replace(/^\//,"").split("/");p="/"+m.replace(/^\//,"").split("/").slice(h.length).join("/")}let g=Ie(e,{pathname:p}),E=rt(g&&g.map(h=>Object.assign({},h,{params:Object.assign({},s,h.params),pathname:T([i,a.encodeLocation?a.encodeLocation(h.pathname).pathname:h.pathname]),pathnameBase:h.pathnameBase==="/"?i:T([i,a.encodeLocation?a.encodeLocation(h.pathnameBase).pathname:h.pathnameBase])})),o,r,n);return t&&E?f.createElement(K.Provider,{value:{location:b({pathname:"/",search:"",hash:"",state:null,key:"default"},d),navigationType:R.Pop}},E):E}function Xe(){let e=lt(),t=$e(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return f.createElement(f.Fragment,null,f.createElement("h2",null,"Unexpected Application Error!"),f.createElement("h3",{style:{fontStyle:"italic"}},t),r?f.createElement("pre",{style:a},r):null,null)}const Ze=f.createElement(Xe,null);class et extends f.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location||r.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:r.error,location:r.location,revalidation:t.revalidation||r.revalidation}}componentDidCatch(t,r){console.error("React Router caught the following error during render",t,r)}render(){return this.state.error!==void 0?f.createElement(x.Provider,{value:this.props.routeContext},f.createElement(ie.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function tt(e){let{routeContext:t,match:r,children:n}=e,a=f.useContext(z);return a&&a.static&&a.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=r.route.id),f.createElement(x.Provider,{value:t},n)}function rt(e,t,r,n){var a;if(t===void 0&&(t=[]),r===void 0&&(r=null),n===void 0&&(n=null),e==null){var o;if(!r)return null;if(r.errors)e=r.matches;else if((o=n)!=null&&o.v7_partialHydration&&t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let l=e,s=(a=r)==null?void 0:a.errors;if(s!=null){let d=l.findIndex(u=>u.route.id&&(s==null?void 0:s[u.route.id])!==void 0);d>=0||N(!1),l=l.slice(0,Math.min(l.length,d+1))}let i=!1,c=-1;if(r&&n&&n.v7_partialHydration)for(let d=0;d<l.length;d++){let u=l[d];if((u.route.HydrateFallback||u.route.hydrateFallbackElement)&&(c=d),u.route.id){let{loaderData:m,errors:p}=r,g=u.route.loader&&m[u.route.id]===void 0&&(!p||p[u.route.id]===void 0);if(u.route.lazy||g){i=!0,c>=0?l=l.slice(0,c+1):l=[l[0]];break}}}return l.reduceRight((d,u,m)=>{let p,g=!1,E=null,h=null;r&&(p=s&&u.route.id?s[u.route.id]:void 0,E=u.route.errorElement||Ze,i&&(c<0&&m===0?(g=!0,h=null):c===m&&(g=!0,h=u.route.hydrateFallbackElement||null)));let O=t.concat(l.slice(0,m+1)),P=()=>{let I;return p?I=E:g?I=h:u.route.Component?I=f.createElement(u.route.Component,null):u.route.element?I=u.route.element:I=d,f.createElement(tt,{match:u,routeContext:{outlet:d,matches:O,isDataRoute:r!=null},children:I})};return r&&(u.route.ErrorBoundary||u.route.errorElement||m===0)?f.createElement(et,{location:r.location,revalidation:r.revalidation,component:E,error:p,children:P(),routeContext:{outlet:null,matches:O,isDataRoute:!0}}):P()},null)}var ue=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(ue||{}),w=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(w||{});function nt(e){let t=f.useContext(z);return t||N(!1),t}function at(e){let t=f.useContext(Ve);return t||N(!1),t}function ot(e){let t=f.useContext(x);return t||N(!1),t}function ce(e){let t=ot(),r=t.matches[t.matches.length-1];return r.route.id||N(!1),r.route.id}function lt(){var e;let t=f.useContext(ie),r=at(w.UseRouteError),n=ce(w.UseRouteError);return t!==void 0?t:(e=r.errors)==null?void 0:e[n]}function it(){let{router:e}=nt(ue.UseNavigateStable),t=ce(w.UseNavigateStable),r=f.useRef(!1);return se(()=>{r.current=!0}),f.useCallback(function(a,o){o===void 0&&(o={}),r.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,b({fromRouteId:t},o)))},[e,t])}const st="startTransition",re=fe[st];function Mt(e){let{basename:t,children:r,initialEntries:n,initialIndex:a,future:o}=e,l=f.useRef();l.current==null&&(l.current=Oe({initialEntries:n,initialIndex:a,v5Compat:!0}));let s=l.current,[i,c]=f.useState({action:s.action,location:s.location}),{v7_startTransition:d}=o||{},u=f.useCallback(m=>{d&&re?re(()=>c(m)):c(m)},[c,d]);return f.useLayoutEffect(()=>s.listen(u),[s,u]),f.createElement(ct,{basename:t,children:r,location:i.location,navigationType:i.action,navigator:s,future:o})}function Dt(e){let{to:t,replace:r,state:n,relative:a}=e;M()||N(!1);let{future:o,static:l}=f.useContext(L),{matches:s}=f.useContext(x),{pathname:i}=_(),c=We(),d=W(t,V(s,o.v7_relativeSplatPath),i,a==="path"),u=JSON.stringify(d);return f.useEffect(()=>c(JSON.parse(u),{replace:r,state:n,relative:a}),[c,u,a,r,n]),null}function ut(e){N(!1)}function ct(e){let{basename:t="/",children:r=null,location:n,navigationType:a=R.Pop,navigator:o,static:l=!1,future:s}=e;M()&&N(!1);let i=t.replace(/^\/*/,"/"),c=f.useMemo(()=>({basename:i,navigator:o,static:l,future:b({v7_relativeSplatPath:!1},s)}),[i,s,o,l]);typeof n=="string"&&(n=y(n));let{pathname:d="/",search:u="",hash:m="",state:p=null,key:g="default"}=n,E=f.useMemo(()=>{let h=oe(d,i);return h==null?null:{location:{pathname:h,search:u,hash:m,state:p,key:g},navigationType:a}},[i,d,u,m,p,g,a]);return E==null?null:f.createElement(L.Provider,{value:c},f.createElement(K.Provider,{children:r,value:E}))}function Ct(e){let{children:t,location:r}=e;return Qe(j(t),r)}new Promise(()=>{});function j(e,t){t===void 0&&(t=[]);let r=[];return f.Children.forEach(e,(n,a)=>{if(!f.isValidElement(n))return;let o=[...t,a];if(n.type===f.Fragment){r.push.apply(r,j(n.props.children,o));return}n.type!==ut&&N(!1),!n.props.index||!n.props.children||N(!1);let l={id:n.props.id||o.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(l.children=j(n.props.children,o)),r.push(l)}),r}var G=(e=>(e.SLUTTPAKKE="ETTERLØNN_SLUTTPAKKE",e.MILITÆRTJENESTE="MILITÆR_ELLER_SIVILTJENESTE",e.JOBB_I_UTLANDET="JOBB_I_UTLANDET",e))(G||{});const de=e=>e==="far"||e==="medmor";var v=(e=>(e.VELKOMMEN="/",e.SØKERSITUASJON="/soker",e.OM_BARNET="/barnet",e.ANNEN_FORELDER="/den-andre-forelderen",e.PERIODE_MED_FORELDREPENGER="/periode",e.FORDELING="/fordeling",e.UTTAKSPLAN="/plan",e.UTENLANDSOPPHOLD="/utenlandsopphold",e.TIDLIGERE_UTENLANDSOPPHOLD="/tidligere-utenlandsopphold",e.SENERE_UTENLANDSOPPHOLD="/senere-utenlandsopphold",e.ARBEID_OG_INNTEKT="/arbeid-og-inntekt",e.EGEN_NÆRING="/selvstendig-naringsdrivende",e.FRILANS="/frilans",e.ANDRE_INNTEKTER="/andre-inntekter",e.DOKUMENTASJON="/dokumentasjon",e.OPPSUMMERING="/oppsummering",e.IKKE_MYNDIG="ikke-myndig",e))(v||{});const H=["/","/soker","/barnet","/den-andre-forelderen","/periode","/fordeling","/plan","/utenlandsopphold","/tidligere-utenlandsopphold","/senere-utenlandsopphold","/arbeid-og-inntekt","/frilans","/selvstendig-naringsdrivende","/andre-inntekter","/dokumentasjon","/oppsummering"],dt=["/soker","/barnet","/den-andre-forelderen","/periode","/fordeling","/plan","/utenlandsopphold","/arbeid-og-inntekt","/oppsummering"],ft=["/plan","/oppsummering"],bt=(e,t,r=[])=>{switch(e){case"/soker":return t===!0;case"/oppsummering":return pe(r)===!1&&r.length>0;default:return!0}},_t=(e,t,r,n)=>r?n?`${e} ${n} ${t}`:`${e} ${t}`:n?`${e} ${n}`:`${e}`,Ut=e=>{if(A(e)){const{fnr:t}=e;return t===void 0||t.length!==11?void 0:parseInt(t.charAt(8),10)%2===0?"K":"M"}},Bt=e=>{if(e.length===11)return parseInt(e.charAt(8),10)%2===0?"K":"M"},wt=(e,t,r)=>e&&A(t)&&!r&&!t.harRettPåForeldrepengerINorge&&!t.harRettPåForeldrepengerIEØS,Kt=(e,t,r)=>e&&(t||r.kanIkkeOppgis===!0),pt=(e,t,r)=>t===!0&&A(r)?r.harRettPåForeldrepengerINorge===!0||r.harRettPåForeldrepengerIEØS===!0:e==="mor",ht=(e,t,r)=>e&&(t||r.kanIkkeOppgis===!0),Ft=(e,t,r,n)=>{const a=e.fornavn,o=A(t)&&t.fornavn!==void 0&&t.fornavn!==""?t.fornavn:n.formatMessage({id:"annen.forelder"});return{mor:r?o:a,farMedmor:r?a:o}},kt=e=>e==="far"||e==="medmor",jt=e=>Q(e).add(3,"year").add(3,"month").isBefore(Q(),"day"),mt=(e,t)=>de(e)?t?Ee(t):!1:!0,gt=e=>({[v.SØKERSITUASJON]:e.formatMessage({id:"steps.label.søkersituasjon"}),[v.OM_BARNET]:e.formatMessage({id:"steps.label.omBarnet"}),[v.ANNEN_FORELDER]:e.formatMessage({id:"steps.label.annenForelder"}),[v.PERIODE_MED_FORELDREPENGER]:e.formatMessage({id:"steps.label.periodeMedForeldrepenger"}),[v.FORDELING]:e.formatMessage({id:"steps.label.fordeling"}),[v.UTTAKSPLAN]:e.formatMessage({id:"steps.label.uttaksplan"}),[v.UTENLANDSOPPHOLD]:e.formatMessage({id:"steps.label.utenlandsopphold"}),[v.TIDLIGERE_UTENLANDSOPPHOLD]:e.formatMessage({id:"steps.label.utenlandsopphold.tidligere"}),[v.SENERE_UTENLANDSOPPHOLD]:e.formatMessage({id:"steps.label.utenlandsopphold.senere"}),[v.ARBEID_OG_INNTEKT]:e.formatMessage({id:"steps.label.inntektsinformasjon"}),[v.FRILANS]:e.formatMessage({id:"steps.label.frilans"}),[v.EGEN_NÆRING]:e.formatMessage({id:"steps.label.egenNæring"}),[v.ANDRE_INNTEKTER]:e.formatMessage({id:"steps.label.andreInntekter"}),[v.OPPSUMMERING]:e.formatMessage({id:"steps.label.oppsummering"}),[v.DOKUMENTASJON]:e.formatMessage({id:"søknad.manglendeVedlegg"})}),D=(e,t)=>H.indexOf(t)>H.indexOf(e),Et=(e,t,r)=>{var n,a;return e===v.TIDLIGERE_UTENLANDSOPPHOLD?((n=r(S.UTENLANDSOPPHOLD))==null?void 0:n.iNorgeSiste12Mnd)===!1&&D(v.UTENLANDSOPPHOLD,t)||!!r(S.UTENLANDSOPPHOLD_TIDLIGERE):e===v.SENERE_UTENLANDSOPPHOLD?((a=r(S.UTENLANDSOPPHOLD))==null?void 0:a.iNorgeNeste12Mnd)===!1&&D(v.UTENLANDSOPPHOLD,t)||!!r(S.UTENLANDSOPPHOLD_SENERE):!1},vt=(e,t,r)=>{var n,a,o;return e===v.FRILANS?((n=r(S.ARBEIDSFORHOLD_OG_INNTEKT))==null?void 0:n.harJobbetSomFrilans)===!0&&D(v.ARBEID_OG_INNTEKT,t)||!!r(S.FRILANS):e===v.EGEN_NÆRING?((a=r(S.ARBEIDSFORHOLD_OG_INNTEKT))==null?void 0:a.harJobbetSomSelvstendigNæringsdrivende)===!0&&D(v.ARBEID_OG_INNTEKT,t)||!!r(S.EGEN_NÆRING):e===v.ANDRE_INNTEKTER?((o=r(S.ARBEIDSFORHOLD_OG_INNTEKT))==null?void 0:o.harHattAndreInntektskilder)===!0&&D(v.ARBEID_OG_INNTEKT,t)||!!r(S.ANDRE_INNTEKTSKILDER):!1},Nt=(e,t,r)=>{if(e===void 0||t===void 0)return!1;const n=A(e)?e:void 0,a=n?n.erAleneOmOmsorg:!0,o=e!==void 0?ht(r,a,e):!1;return!pt(t.rolle,r,e)&&!o},St=(e,t,r,n)=>{if(e===v.DOKUMENTASJON){const a=t(S.ANNEN_FORELDER),o=t(S.SØKERSITUASJON),l=t(S.OM_BARNET),s=t(S.UTTAKSPLAN),i=t(S.UTTAKSPLAN_METADATA),c=t(S.ANDRE_INNTEKTSKILDER),d=!!o&&de(o.rolle),u=a&&A(a)?a.datoForAleneomsorg:!1,m=(o==null?void 0:o.situasjon)==="adopsjon"||l&&o&&me(l)&&(r.length===0||Nt(a,o,d))&&mt(o.rolle,l.termindato),p=a&&s?ge(s,d,a,n,i==null?void 0:i.perioderSomSkalSendesInn):!1,g=c==null?void 0:c.some(E=>E.type===G.MILITÆRTJENESTE||E.type===G.SLUTTPAKKE);return u||m||p||g}return!1},Ot=(e,t=!1)=>{const r=Se(),n=gt(r),a=_(),o=ve(),l=f.useMemo(()=>he(Object.values(v).find(c=>c===decodeURIComponent(a.pathname))),[a.pathname]),s=t?ft:dt,i=f.useMemo(()=>H.flatMap(c=>s.includes(c)||Et(c,l,o)||St(c,o,e,t)||vt(c,l,o)?[c]:[]),[s,l,o,e,t]);return f.useMemo(()=>i.map((c,d)=>({index:d,id:c,label:n[c],isSelected:c===l})),[i,l,n])},Gt=(e,t,r=!1)=>{const n=Ot(e,r),a=Ne(S.APP_ROUTE),o=n.find(d=>d.isSelected);return f.useEffect(()=>{q("sidevisning",{app:"foreldrepengesoknad",team:"foreldrepenger",pageKey:o})},[o]),{goToPreviousDefaultStep:()=>{var m;const d=n.findIndex(p=>p.isSelected)-1,u=((m=n[d])==null?void 0:m.id)||v.VELKOMMEN;return a(u),t()},goToNextStep:d=>(a(d),t()),goToNextDefaultStep:()=>{var m;const d=n.findIndex(p=>p.isSelected)+1,u=(m=n[d])==null?void 0:m.id;return a(u),t()},fortsettSøknadSenere:()=>{q("applikasjon-hendelse",{app:"foreldrepengesoknad",team:"foreldrepenger",hendelse:"fortsettSenere"}),window.location="https://nav.no"}}};export{G as A,Mt as M,L as N,ct as R,v as S,Gt as a,Kt as b,Lt as c,At as d,jt as e,_t as f,ht as g,We as h,de as i,_ as j,qe as k,J as l,Ut as m,Bt as n,kt as o,Ft as p,wt as q,pt as r,oe as s,bt as t,Ot as u,Ct as v,ut as w,Dt as x};
