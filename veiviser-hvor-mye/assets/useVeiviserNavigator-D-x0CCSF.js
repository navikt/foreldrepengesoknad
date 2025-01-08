import{r as o,a as Z}from"./index-BX3iQpgp.js";import{b as ee}from"./FrontPage-DYB9hbXl.js";/**
 * @remix-run/router v1.21.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function S(){return S=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},S.apply(this,arguments)}var x;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(x||(x={}));function te(e){e===void 0&&(e={});let{initialEntries:t=["/"],initialIndex:n,v5Compat:r=!1}=e,a;a=t.map((d,p)=>f(d,typeof d=="string"?null:d.state,p===0?"default":void 0));let l=u(n??a.length-1),i=x.Pop,s=null;function u(d){return Math.min(Math.max(d,0),a.length-1)}function h(){return a[l]}function f(d,p,g){p===void 0&&(p=null);let v=re(a?h().pathname:"/",d,p,g);return j(v.pathname.charAt(0)==="/","relative pathnames are not supported in memory history: "+JSON.stringify(d)),v}function c(d){return typeof d=="string"?d:ae(d)}return{get index(){return l},get action(){return i},get location(){return h()},createHref:c,createURL(d){return new URL(c(d),"http://localhost")},encodeLocation(d){let p=typeof d=="string"?C(d):d;return{pathname:p.pathname||"",search:p.search||"",hash:p.hash||""}},push(d,p){i=x.Push;let g=f(d,p);l+=1,a.splice(l,a.length,g),r&&s&&s({action:i,location:g,delta:1})},replace(d,p){i=x.Replace;let g=f(d,p);a[l]=g,r&&s&&s({action:i,location:g,delta:0})},go(d){i=x.Pop;let p=u(l+d),g=a[p];l=p,s&&s({action:i,location:g,delta:d})},listen(d){return s=d,()=>{s=null}}}}function y(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function j(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function ne(){return Math.random().toString(36).substr(2,8)}function re(e,t,n,r){return n===void 0&&(n=null),S({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?C(t):t,{state:n,key:t&&t.key||r||ne()})}function ae(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function C(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}var W;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(W||(W={}));function le(e,t,n){return n===void 0&&(n="/"),ie(e,t,n)}function ie(e,t,n,r){let a=typeof t=="string"?C(t):t,l=A(a.pathname||"/",n);if(l==null)return null;let i=D(e);oe(i);let s=null;for(let u=0;s==null&&u<i.length;++u){let h=xe(l);s=ge(i[u],h)}return s}function D(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let a=(l,i,s)=>{let u={relativePath:s===void 0?l.path||"":s,caseSensitive:l.caseSensitive===!0,childrenIndex:i,route:l};u.relativePath.startsWith("/")&&(y(u.relativePath.startsWith(r),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(r.length));let h=E([r,u.relativePath]),f=n.concat(u);l.children&&l.children.length>0&&(y(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+h+'".')),D(l.children,t,f,h)),!(l.path==null&&!l.index)&&t.push({path:h,score:pe(h,l.index),routesMeta:f})};return e.forEach((l,i)=>{var s;if(l.path===""||!((s=l.path)!=null&&s.includes("?")))a(l,i);else for(let u of V(l.path))a(l,i,u)}),t}function V(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,a=n.endsWith("?"),l=n.replace(/\?$/,"");if(r.length===0)return a?[l,""]:[l];let i=V(r.join("/")),s=[];return s.push(...i.map(u=>u===""?l:[l,u].join("/"))),a&&s.push(...i),s.map(u=>e.startsWith("/")&&u===""?"/":u)}function oe(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:me(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const se=/^:[\w-]+$/,ue=3,ce=2,fe=1,de=10,he=-2,$=e=>e==="*";function pe(e,t){let n=e.split("/"),r=n.length;return n.some($)&&(r+=he),t&&(r+=ce),n.filter(a=>!$(a)).reduce((a,l)=>a+(se.test(l)?ue:l===""?fe:de),r)}function me(e,t){return e.length===t.length&&e.slice(0,-1).every((r,a)=>r===t[a])?e[e.length-1]-t[t.length-1]:0}function ge(e,t,n){let{routesMeta:r}=e,a={},l="/",i=[];for(let s=0;s<r.length;++s){let u=r[s],h=s===r.length-1,f=l==="/"?t:t.slice(l.length)||"/",c=ve({path:u.relativePath,caseSensitive:u.caseSensitive,end:h},f),m=u.route;if(!c)return null;Object.assign(a,c.params),i.push({params:a,pathname:E([l,c.pathname]),pathnameBase:Re(E([l,c.pathnameBase])),route:m}),c.pathnameBase!=="/"&&(l=E([l,c.pathnameBase]))}return i}function ve(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=ye(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let l=a[0],i=l.replace(/(.)\/+$/,"$1"),s=a.slice(1);return{params:r.reduce((h,f,c)=>{let{paramName:m,isOptional:d}=f;if(m==="*"){let g=s[c]||"";i=l.slice(0,l.length-g.length).replace(/(.)\/+$/,"$1")}const p=s[c];return d&&!p?h[m]=void 0:h[m]=(p||"").replace(/%2F/g,"/"),h},{}),pathname:l,pathnameBase:i,pattern:e}}function ye(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),j(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(i,s,u)=>(r.push({paramName:s,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function xe(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return j(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function A(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function Ee(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:a=""}=typeof e=="string"?C(e):e;return{pathname:n?n.startsWith("/")?n:Ce(n,t):t,search:be(r),hash:Ie(a)}}function Ce(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function L(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Pe(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function J(e,t){let n=Pe(e);return t?n.map((r,a)=>a===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function q(e,t,n,r){r===void 0&&(r=!1);let a;typeof e=="string"?a=C(e):(a=S({},e),y(!a.pathname||!a.pathname.includes("?"),L("?","pathname","search",a)),y(!a.pathname||!a.pathname.includes("#"),L("#","pathname","hash",a)),y(!a.search||!a.search.includes("#"),L("#","search","hash",a)));let l=e===""||a.pathname==="",i=l?"/":a.pathname,s;if(i==null)s=n;else{let c=t.length-1;if(!r&&i.startsWith("..")){let m=i.split("/");for(;m[0]==="..";)m.shift(),c-=1;a.pathname=m.join("/")}s=c>=0?t[c]:"/"}let u=Ee(a,s),h=i&&i!=="/"&&i.endsWith("/"),f=(l||i===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(h||f)&&(u.pathname+="/"),u}const E=e=>e.join("/").replace(/\/\/+/g,"/"),Re=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),be=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Ie=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function we(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const G=["post","put","patch","delete"];new Set(G);const Se=["get",...G];new Set(Se);/**
 * React Router v6.28.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function b(){return b=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},b.apply(this,arguments)}const M=o.createContext(null),Oe=o.createContext(null),I=o.createContext(null),N=o.createContext(null),P=o.createContext({outlet:null,matches:[],isDataRoute:!1}),H=o.createContext(null);function w(){return o.useContext(N)!=null}function T(){return w()||y(!1),o.useContext(N).location}function K(e){o.useContext(I).static||o.useLayoutEffect(e)}function Y(){let{isDataRoute:e}=o.useContext(P);return e?ze():Ne()}function Ne(){w()||y(!1);let e=o.useContext(M),{basename:t,future:n,navigator:r}=o.useContext(I),{matches:a}=o.useContext(P),{pathname:l}=T(),i=JSON.stringify(J(a,n.v7_relativeSplatPath)),s=o.useRef(!1);return K(()=>{s.current=!0}),o.useCallback(function(h,f){if(f===void 0&&(f={}),!s.current)return;if(typeof h=="number"){r.go(h);return}let c=q(h,JSON.parse(i),l,f.relative==="path");e==null&&t!=="/"&&(c.pathname=c.pathname==="/"?t:E([t,c.pathname])),(f.replace?r.replace:r.push)(c,f.state,f)},[t,r,i,l,e])}function Be(e,t){return Le(e,t)}function Le(e,t,n,r){w()||y(!1);let{navigator:a}=o.useContext(I),{matches:l}=o.useContext(P),i=l[l.length-1],s=i?i.params:{};i&&i.pathname;let u=i?i.pathnameBase:"/";i&&i.route;let h=T(),f;if(t){var c;let v=typeof t=="string"?C(t):t;u==="/"||(c=v.pathname)!=null&&c.startsWith(u)||y(!1),f=v}else f=h;let m=f.pathname||"/",d=m;if(u!=="/"){let v=u.replace(/^\//,"").split("/");d="/"+m.replace(/^\//,"").split("/").slice(v.length).join("/")}let p=le(e,{pathname:d}),g=_e(p&&p.map(v=>Object.assign({},v,{params:Object.assign({},s,v.params),pathname:E([u,a.encodeLocation?a.encodeLocation(v.pathname).pathname:v.pathname]),pathnameBase:v.pathnameBase==="/"?u:E([u,a.encodeLocation?a.encodeLocation(v.pathnameBase).pathname:v.pathnameBase])})),l,n,r);return t&&g?o.createElement(N.Provider,{value:{location:b({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:x.Pop}},g):g}function Ue(){let e=Fe(),t=we(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return o.createElement(o.Fragment,null,o.createElement("h2",null,"Unexpected Application Error!"),o.createElement("h3",{style:{fontStyle:"italic"}},t),n?o.createElement("pre",{style:a},n):null,null)}const je=o.createElement(Ue,null);class Me extends o.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?o.createElement(P.Provider,{value:this.props.routeContext},o.createElement(H.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Te(e){let{routeContext:t,match:n,children:r}=e,a=o.useContext(M);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),o.createElement(P.Provider,{value:t},r)}function _e(e,t,n,r){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var l;if(!n)return null;if(n.errors)e=n.matches;else if((l=r)!=null&&l.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let i=e,s=(a=n)==null?void 0:a.errors;if(s!=null){let f=i.findIndex(c=>c.route.id&&(s==null?void 0:s[c.route.id])!==void 0);f>=0||y(!1),i=i.slice(0,Math.min(i.length,f+1))}let u=!1,h=-1;if(n&&r&&r.v7_partialHydration)for(let f=0;f<i.length;f++){let c=i[f];if((c.route.HydrateFallback||c.route.hydrateFallbackElement)&&(h=f),c.route.id){let{loaderData:m,errors:d}=n,p=c.route.loader&&m[c.route.id]===void 0&&(!d||d[c.route.id]===void 0);if(c.route.lazy||p){u=!0,h>=0?i=i.slice(0,h+1):i=[i[0]];break}}}return i.reduceRight((f,c,m)=>{let d,p=!1,g=null,v=null;n&&(d=s&&c.route.id?s[c.route.id]:void 0,g=c.route.errorElement||je,u&&(h<0&&m===0?(p=!0,v=null):h===m&&(p=!0,v=c.route.hydrateFallbackElement||null)));let B=t.concat(i.slice(0,m+1)),_=()=>{let R;return d?R=g:p?R=v:c.route.Component?R=o.createElement(c.route.Component,null):c.route.element?R=c.route.element:R=f,o.createElement(Te,{match:c,routeContext:{outlet:f,matches:B,isDataRoute:n!=null},children:R})};return n&&(c.route.ErrorBoundary||c.route.errorElement||m===0)?o.createElement(Me,{location:n.location,revalidation:n.revalidation,component:g,error:d,children:_(),routeContext:{outlet:null,matches:B,isDataRoute:!0}}):_()},null)}var Q=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Q||{}),O=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(O||{});function We(e){let t=o.useContext(M);return t||y(!1),t}function $e(e){let t=o.useContext(Oe);return t||y(!1),t}function ke(e){let t=o.useContext(P);return t||y(!1),t}function X(e){let t=ke(),n=t.matches[t.matches.length-1];return n.route.id||y(!1),n.route.id}function Fe(){var e;let t=o.useContext(H),n=$e(O.UseRouteError),r=X(O.UseRouteError);return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function ze(){let{router:e}=We(Q.UseNavigateStable),t=X(O.UseNavigateStable),n=o.useRef(!1);return K(()=>{n.current=!0}),o.useCallback(function(a,l){l===void 0&&(l={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,b({fromRouteId:t},l)))},[e,t])}const k={};function De(e,t){k[t]||(k[t]=!0,console.warn(t))}const F=(e,t,n)=>De(e,"⚠️ React Router Future Flag Warning: "+t+". "+("You can use the `"+e+"` future flag to opt-in early. ")+("For more information, see "+n+"."));function Ve(e,t){(e==null?void 0:e.v7_startTransition)===void 0&&F("v7_startTransition","React Router will begin wrapping state updates in `React.startTransition` in v7","https://reactrouter.com/v6/upgrading/future#v7_starttransition"),(e==null?void 0:e.v7_relativeSplatPath)===void 0&&F("v7_relativeSplatPath","Relative route resolution within Splat routes is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath")}const Ae="startTransition",z=Z[Ae];function Qe(e){let{basename:t,children:n,initialEntries:r,initialIndex:a,future:l}=e,i=o.useRef();i.current==null&&(i.current=te({initialEntries:r,initialIndex:a,v5Compat:!0}));let s=i.current,[u,h]=o.useState({action:s.action,location:s.location}),{v7_startTransition:f}=l||{},c=o.useCallback(m=>{f&&z?z(()=>h(m)):h(m)},[h,f]);return o.useLayoutEffect(()=>s.listen(c),[s,c]),o.useEffect(()=>Ve(l),[l]),o.createElement(qe,{basename:t,children:n,location:u.location,navigationType:u.action,navigator:s,future:l})}function Xe(e){let{to:t,replace:n,state:r,relative:a}=e;w()||y(!1);let{future:l,static:i}=o.useContext(I),{matches:s}=o.useContext(P),{pathname:u}=T(),h=Y(),f=q(t,J(s,l.v7_relativeSplatPath),u,a==="path"),c=JSON.stringify(f);return o.useEffect(()=>h(JSON.parse(c),{replace:n,state:r,relative:a}),[h,c,a,n,r]),null}function Je(e){y(!1)}function qe(e){let{basename:t="/",children:n=null,location:r,navigationType:a=x.Pop,navigator:l,static:i=!1,future:s}=e;w()&&y(!1);let u=t.replace(/^\/*/,"/"),h=o.useMemo(()=>({basename:u,navigator:l,static:i,future:b({v7_relativeSplatPath:!1},s)}),[u,s,l,i]);typeof r=="string"&&(r=C(r));let{pathname:f="/",search:c="",hash:m="",state:d=null,key:p="default"}=r,g=o.useMemo(()=>{let v=A(f,u);return v==null?null:{location:{pathname:v,search:c,hash:m,state:d,key:p},navigationType:a}},[u,f,c,m,d,p,a]);return g==null?null:o.createElement(I.Provider,{value:h},o.createElement(N.Provider,{children:n,value:g}))}function Ze(e){let{children:t,location:n}=e;return Be(U(t),n)}new Promise(()=>{});function U(e,t){t===void 0&&(t=[]);let n=[];return o.Children.forEach(e,(r,a)=>{if(!o.isValidElement(r))return;let l=[...t,a];if(r.type===o.Fragment){n.push.apply(n,U(r.props.children,l));return}r.type!==Je&&y(!1),!r.props.index||!r.props.children||y(!1);let i={id:r.props.id||l.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(i.children=U(r.props.children,l)),n.push(i)}),n}var Ge=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n};const et=o.forwardRef((e,t)=>{var{title:n,titleId:r}=e,a=Ge(e,["title","titleId"]);let l=ee();return l=n?r||"title-"+l:void 0,o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:t,"aria-labelledby":l},a),n?o.createElement("title",{id:l},n):null,o.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M15.803 2.276a.75.75 0 0 1 .868.389l1.293 2.585H19c.966 0 1.75.784 1.75 1.75v2.418c.591.281 1 .884 1 1.582v3c0 .698-.409 1.3-1 1.582V18A1.75 1.75 0 0 1 19 19.75H4A1.75 1.75 0 0 1 2.25 18V7c0-.966.784-1.75 1.75-1.75h.9zm-.199 1.61.683 1.364H10.6zM3.75 7A.25.25 0 0 1 4 6.75h15a.25.25 0 0 1 .25.25v2.25h-3.917a2 2 0 0 0-.138.007 3.52 3.52 0 0 0-1.37.393 2.86 2.86 0 0 0-1.093 1.006c-.305.486-.482 1.097-.482 1.844s.177 1.358.482 1.844c.304.483.706.8 1.093 1.006a3.5 3.5 0 0 0 1.508.4h3.917V18a.25.25 0 0 1-.25.25H4a.25.25 0 0 1-.25-.25zm11.603 3.75H20a.25.25 0 0 1 .25.25v3a.25.25 0 0 1-.25.25h-4.647q-.011 0-.037-.002h-.007a2.023 2.023 0 0 1-.78-.222 1.36 1.36 0 0 1-.526-.48c-.136-.216-.253-.543-.253-1.046s.117-.83.253-1.047c.138-.22.323-.371.525-.478a2 2 0 0 1 .825-.225m.147 1a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))});var He=(e=>(e.OM="/om",e.ARBEIDSSITUASJON="/arbeidssituasjon",e.OPPSUMMERING="/oppsummering",e))(He||{});const tt=()=>{const e=Y();return{goToRoute:o.useCallback(n=>{e(n)},[e])}};export{He as H,Qe as M,Xe as N,Ze as R,et as S,Je as a,tt as u};
