import{r as l,$ as xe}from"./index-7c191284.js";import{q as le,w as Re,x as De,y as Pe,j as E,z as ce,J as Ce,K as Le,M as Te,m as V,N as _e,O as Q,u as Ae,f as Ie}from"./IntlProvider-850d6775.js";import{j as X}from"./jsx-runtime-69eee039.js";le.registerLocale(Re);le.registerLocale(De);const Ue=(e,t)=>{if(t)switch(e){case"BE":case"BG":case"DK":case"EE":case"FI":case"FR":case"GR":case"IE":case"IS":case"IT":case"HR":case"CY":case"LV":case"LI":case"LT":case"LU":case"MT":case"NL":case"NO":case"PL":case"PT":case"RO":case"SK":case"SI":case"ES":case"CH":case"SE":case"CZ":case"DE":case"HU":case"AT":return!0;default:return!1}else return e!=="AQ"},be=()=>Pe,Ft=()=>{const e="nb",t=be();return Object.entries(t.getNames(e)).sort((r,a)=>r[1].localeCompare(a[1],e)).filter(r=>Ue(r[0],!1))};E.extend(ce);E.extend(Ce);E.extend(Le);const Ht=e=>E(e).format(Te),Kt=e=>E(e).isBefore(V,"day"),$t=e=>E(e).isSame(V,"day"),Be=(e,t,n)=>E(e).isBetween(t,n,"day","[]"),Wt=e=>{const t=E(),n=E(e);return t.diff(n,"years")>=18},ke=(e,t)=>E(e.from).isSameOrBefore(t.from)?-1:1,Me=e=>{if(e.length>0){const t=[...e].sort(ke);return t.find((r,a)=>a<t.length-1?E(r.to).isSameOrAfter(t[a+1].from):!1)!==void 0}return!1};/**
 * @remix-run/router v1.8.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function L(){return L=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},L.apply(this,arguments)}var O;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(O||(O={}));const Z="popstate";function we(e){e===void 0&&(e={});let{initialEntries:t=["/"],initialIndex:n,v5Compat:r=!1}=e,a;a=t.map((f,p)=>d(f,typeof f=="string"?null:f.state,p===0?"default":void 0));let s=c(n??a.length-1),o=O.Pop,i=null;function c(f){return Math.min(Math.max(f,0),a.length-1)}function u(){return a[s]}function d(f,p,h){p===void 0&&(p=null);let g=A(a?u().pathname:"/",f,p,h);return B(g.pathname.charAt(0)==="/","relative pathnames are not supported in memory history: "+JSON.stringify(f)),g}function m(f){return typeof f=="string"?f:Y(f)}return{get index(){return s},get action(){return o},get location(){return u()},createHref:m,createURL(f){return new URL(m(f),"http://localhost")},encodeLocation(f){let p=typeof f=="string"?P(f):f;return{pathname:p.pathname||"",search:p.search||"",hash:p.hash||""}},push(f,p){o=O.Push;let h=d(f,p);s+=1,a.splice(s,a.length,h),r&&i&&i({action:o,location:h,delta:1})},replace(f,p){o=O.Replace;let h=d(f,p);a[s]=h,r&&i&&i({action:o,location:h,delta:0})},go(f){o=O.Pop;let p=c(s+f),h=a[p];s=p,i&&i({action:o,location:h,delta:f})},listen(f){return i=f,()=>{i=null}}}}function Jt(e){e===void 0&&(e={});function t(r,a){let{pathname:s,search:o,hash:i}=r.location;return A("",{pathname:s,search:o,hash:i},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function n(r,a){return typeof a=="string"?a:Y(a)}return Fe(t,n,null,e)}function S(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function B(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function je(){return Math.random().toString(36).substr(2,8)}function ee(e,t){return{usr:e.state,key:e.key,idx:t}}function A(e,t,n,r){return n===void 0&&(n=null),L({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?P(t):t,{state:n,key:t&&t.key||r||je()})}function Y(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function P(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function Fe(e,t,n,r){r===void 0&&(r={});let{window:a=document.defaultView,v5Compat:s=!1}=r,o=a.history,i=O.Pop,c=null,u=d();u==null&&(u=0,o.replaceState(L({},o.state,{idx:u}),""));function d(){return(o.state||{idx:null}).idx}function m(){i=O.Pop;let g=d(),N=g==null?null:g-u;u=g,c&&c({action:i,location:h.location,delta:N})}function y(g,N){i=O.Push;let x=A(h.location,g,N);n&&n(x,g),u=d()+1;let F=ee(x,u),_=h.createHref(x);try{o.pushState(F,"",_)}catch(H){if(H instanceof DOMException&&H.name==="DataCloneError")throw H;a.location.assign(_)}s&&c&&c({action:i,location:h.location,delta:1})}function f(g,N){i=O.Replace;let x=A(h.location,g,N);n&&n(x,g),u=d();let F=ee(x,u),_=h.createHref(x);o.replaceState(F,"",_),s&&c&&c({action:i,location:h.location,delta:0})}function p(g){let N=a.location.origin!=="null"?a.location.origin:a.location.href,x=typeof g=="string"?g:Y(g);return S(N,"No window.location.(origin|href) available to create URL for href: "+x),new URL(x,N)}let h={get action(){return i},get location(){return e(a,o)},listen(g){if(c)throw new Error("A history only accepts one active listener");return a.addEventListener(Z,m),c=g,()=>{a.removeEventListener(Z,m),c=null}},createHref(g){return t(a,g)},createURL:p,encodeLocation(g){let N=p(g);return{pathname:N.pathname,search:N.search,hash:N.hash}},push:y,replace:f,go(g){return o.go(g)}};return h}var te;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(te||(te={}));function He(e,t,n){n===void 0&&(n="/");let r=typeof t=="string"?P(t):t,a=fe(r.pathname||"/",n);if(a==null)return null;let s=ue(e);Ke(s);let o=null;for(let i=0;o==null&&i<s.length;++i)o=Qe(s[i],et(a));return o}function ue(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let a=(s,o,i)=>{let c={relativePath:i===void 0?s.path||"":i,caseSensitive:s.caseSensitive===!0,childrenIndex:o,route:s};c.relativePath.startsWith("/")&&(S(c.relativePath.startsWith(r),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(r.length));let u=D([r,c.relativePath]),d=n.concat(c);s.children&&s.children.length>0&&(S(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),ue(s.children,t,d,u)),!(s.path==null&&!s.index)&&t.push({path:u,score:qe(u,s.index),routesMeta:d})};return e.forEach((s,o)=>{var i;if(s.path===""||!((i=s.path)!=null&&i.includes("?")))a(s,o);else for(let c of de(s.path))a(s,o,c)}),t}function de(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,a=n.endsWith("?"),s=n.replace(/\?$/,"");if(r.length===0)return a?[s,""]:[s];let o=de(r.join("/")),i=[];return i.push(...o.map(c=>c===""?s:[s,c].join("/"))),a&&i.push(...o),i.map(c=>e.startsWith("/")&&c===""?"/":c)}function Ke(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:ze(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const $e=/^:\w+$/,We=3,Je=2,Ge=1,Ve=10,Ye=-2,ne=e=>e==="*";function qe(e,t){let n=e.split("/"),r=n.length;return n.some(ne)&&(r+=Ye),t&&(r+=Je),n.filter(a=>!ne(a)).reduce((a,s)=>a+($e.test(s)?We:s===""?Ge:Ve),r)}function ze(e,t){return e.length===t.length&&e.slice(0,-1).every((r,a)=>r===t[a])?e[e.length-1]-t[t.length-1]:0}function Qe(e,t){let{routesMeta:n}=e,r={},a="/",s=[];for(let o=0;o<n.length;++o){let i=n[o],c=o===n.length-1,u=a==="/"?t:t.slice(a.length)||"/",d=Xe({path:i.relativePath,caseSensitive:i.caseSensitive,end:c},u);if(!d)return null;Object.assign(r,d.params);let m=i.route;s.push({params:r,pathname:D([a,d.pathname]),pathnameBase:at(D([a,d.pathnameBase])),route:m}),d.pathnameBase!=="/"&&(a=D([a,d.pathnameBase]))}return s}function Xe(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Ze(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let s=a[0],o=s.replace(/(.)\/+$/,"$1"),i=a.slice(1);return{params:r.reduce((u,d,m)=>{if(d==="*"){let y=i[m]||"";o=s.slice(0,s.length-y.length).replace(/(.)\/+$/,"$1")}return u[d]=tt(i[m]||"",d),u},{}),pathname:s,pathnameBase:o,pattern:e}}function Ze(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),B(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/\/:(\w+)/g,(o,i)=>(r.push(i),"/([^\\/]+)"));return e.endsWith("*")?(r.push("*"),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function et(e){try{return decodeURI(e)}catch(t){return B(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function tt(e,t){try{return decodeURIComponent(e)}catch(n){return B(!1,'The value for the URL param "'+t+'" will not be decoded because'+(' the string "'+e+'" is a malformed URL segment. This is probably')+(" due to a bad percent encoding ("+n+").")),e}}function fe(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function nt(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:a=""}=typeof e=="string"?P(e):e;return{pathname:n?n.startsWith("/")?n:rt(n,t):t,search:st(r),hash:ot(a)}}function rt(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function K(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function pe(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function he(e,t,n,r){r===void 0&&(r=!1);let a;typeof e=="string"?a=P(e):(a=L({},e),S(!a.pathname||!a.pathname.includes("?"),K("?","pathname","search",a)),S(!a.pathname||!a.pathname.includes("#"),K("#","pathname","hash",a)),S(!a.search||!a.search.includes("#"),K("#","search","hash",a)));let s=e===""||a.pathname==="",o=s?"/":a.pathname,i;if(r||o==null)i=n;else{let m=t.length-1;if(o.startsWith("..")){let y=o.split("/");for(;y[0]==="..";)y.shift(),m-=1;a.pathname=y.join("/")}i=m>=0?t[m]:"/"}let c=nt(a,i),u=o&&o!=="/"&&o.endsWith("/"),d=(s||o===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(u||d)&&(c.pathname+="/"),c}const D=e=>e.join("/").replace(/\/\/+/g,"/"),at=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),st=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,ot=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function it(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const me=["post","put","patch","delete"];new Set(me);const lt=["get",...me];new Set(lt);/**
 * React Router v6.15.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function I(){return I=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},I.apply(this,arguments)}const q=l.createContext(null),ct=l.createContext(null),k=l.createContext(null),M=l.createContext(null),C=l.createContext({outlet:null,matches:[],isDataRoute:!1}),Ee=l.createContext(null);function T(){return l.useContext(M)!=null}function w(){return T()||S(!1),l.useContext(M).location}function ge(e){l.useContext(k).static||l.useLayoutEffect(e)}function ve(){let{isDataRoute:e}=l.useContext(C);return e?Ot():ut()}function ut(){T()||S(!1);let e=l.useContext(q),{basename:t,navigator:n}=l.useContext(k),{matches:r}=l.useContext(C),{pathname:a}=w(),s=JSON.stringify(pe(r).map(c=>c.pathnameBase)),o=l.useRef(!1);return ge(()=>{o.current=!0}),l.useCallback(function(c,u){if(u===void 0&&(u={}),!o.current)return;if(typeof c=="number"){n.go(c);return}let d=he(c,JSON.parse(s),a,u.relative==="path");e==null&&t!=="/"&&(d.pathname=d.pathname==="/"?t:D([t,d.pathname])),(u.replace?n.replace:n.push)(d,u.state,u)},[t,n,s,a,e])}function dt(e,t){return ft(e,t)}function ft(e,t,n){T()||S(!1);let{navigator:r}=l.useContext(k),{matches:a}=l.useContext(C),s=a[a.length-1],o=s?s.params:{};s&&s.pathname;let i=s?s.pathnameBase:"/";s&&s.route;let c=w(),u;if(t){var d;let h=typeof t=="string"?P(t):t;i==="/"||(d=h.pathname)!=null&&d.startsWith(i)||S(!1),u=h}else u=c;let m=u.pathname||"/",y=i==="/"?m:m.slice(i.length)||"/",f=He(e,{pathname:y}),p=gt(f&&f.map(h=>Object.assign({},h,{params:Object.assign({},o,h.params),pathname:D([i,r.encodeLocation?r.encodeLocation(h.pathname).pathname:h.pathname]),pathnameBase:h.pathnameBase==="/"?i:D([i,r.encodeLocation?r.encodeLocation(h.pathnameBase).pathname:h.pathnameBase])})),a,n);return t&&p?l.createElement(M.Provider,{value:{location:I({pathname:"/",search:"",hash:"",state:null,key:"default"},u),navigationType:O.Pop}},p):p}function pt(){let e=Nt(),t=it(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"},s=null;return l.createElement(l.Fragment,null,l.createElement("h2",null,"Unexpected Application Error!"),l.createElement("h3",{style:{fontStyle:"italic"}},t),n?l.createElement("pre",{style:a},n):null,s)}const ht=l.createElement(pt,null);class mt extends l.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error||n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error?l.createElement(C.Provider,{value:this.props.routeContext},l.createElement(Ee.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Et(e){let{routeContext:t,match:n,children:r}=e,a=l.useContext(q);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),l.createElement(C.Provider,{value:t},r)}function gt(e,t,n){var r;if(t===void 0&&(t=[]),n===void 0&&(n=null),e==null){var a;if((a=n)!=null&&a.errors)e=n.matches;else return null}let s=e,o=(r=n)==null?void 0:r.errors;if(o!=null){let i=s.findIndex(c=>c.route.id&&(o==null?void 0:o[c.route.id]));i>=0||S(!1),s=s.slice(0,Math.min(s.length,i+1))}return s.reduceRight((i,c,u)=>{let d=c.route.id?o==null?void 0:o[c.route.id]:null,m=null;n&&(m=c.route.errorElement||ht);let y=t.concat(s.slice(0,u+1)),f=()=>{let p;return d?p=m:c.route.Component?p=l.createElement(c.route.Component,null):c.route.element?p=c.route.element:p=i,l.createElement(Et,{match:c,routeContext:{outlet:i,matches:y,isDataRoute:n!=null},children:p})};return n&&(c.route.ErrorBoundary||c.route.errorElement||u===0)?l.createElement(mt,{location:n.location,revalidation:n.revalidation,component:m,error:d,children:f(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):f()},null)}var Se=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Se||{}),U=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(U||{});function vt(e){let t=l.useContext(q);return t||S(!1),t}function St(e){let t=l.useContext(ct);return t||S(!1),t}function yt(e){let t=l.useContext(C);return t||S(!1),t}function ye(e){let t=yt(),n=t.matches[t.matches.length-1];return n.route.id||S(!1),n.route.id}function Nt(){var e;let t=l.useContext(Ee),n=St(U.UseRouteError),r=ye(U.UseRouteError);return t||((e=n.errors)==null?void 0:e[r])}function Ot(){let{router:e}=vt(Se.UseNavigateStable),t=ye(U.UseNavigateStable),n=l.useRef(!1);return ge(()=>{n.current=!0}),l.useCallback(function(a,s){s===void 0&&(s={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,I({fromRouteId:t},s)))},[e,t])}const xt="startTransition",re=xe[xt];function Gt(e){let{basename:t,children:n,initialEntries:r,initialIndex:a,future:s}=e,o=l.useRef();o.current==null&&(o.current=we({initialEntries:r,initialIndex:a,v5Compat:!0}));let i=o.current,[c,u]=l.useState({action:i.action,location:i.location}),{v7_startTransition:d}=s||{},m=l.useCallback(y=>{d&&re?re(()=>u(y)):u(y)},[u,d]);return l.useLayoutEffect(()=>i.listen(m),[i,m]),l.createElement(Dt,{basename:t,children:n,location:c.location,navigationType:c.action,navigator:i})}function Vt(e){let{to:t,replace:n,state:r,relative:a}=e;T()||S(!1);let{matches:s}=l.useContext(C),{pathname:o}=w(),i=ve(),c=he(t,pe(s).map(d=>d.pathnameBase),o,a==="path"),u=JSON.stringify(c);return l.useEffect(()=>i(JSON.parse(u),{replace:n,state:r,relative:a}),[i,u,a,n,r]),null}function Rt(e){S(!1)}function Dt(e){let{basename:t="/",children:n=null,location:r,navigationType:a=O.Pop,navigator:s,static:o=!1}=e;T()&&S(!1);let i=t.replace(/^\/*/,"/"),c=l.useMemo(()=>({basename:i,navigator:s,static:o}),[i,s,o]);typeof r=="string"&&(r=P(r));let{pathname:u="/",search:d="",hash:m="",state:y=null,key:f="default"}=r,p=l.useMemo(()=>{let h=fe(u,i);return h==null?null:{location:{pathname:h,search:d,hash:m,state:y,key:f},navigationType:a}},[i,u,d,m,y,f,a]);return p==null?null:l.createElement(k.Provider,{value:c},l.createElement(M.Provider,{children:n,value:p}))}function Yt(e){let{children:t,location:n}=e;return dt($(t),n)}new Promise(()=>{});function $(e,t){t===void 0&&(t=[]);let n=[];return l.Children.forEach(e,(r,a)=>{if(!l.isValidElement(r))return;let s=[...t,a];if(r.type===l.Fragment){n.push.apply(n,$(r.props.children,s));return}r.type!==Rt&&S(!1),!r.props.index||!r.props.children||S(!1);let o={id:r.props.id||s.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=$(r.props.children,s)),n.push(o)}),n}const Pt=e=>{if(e==null)throw Error("Data er ikke oppgitt");return e},Ne=e=>e==null||e.toString().trim().length===0,qt=e=>t=>Ne(t)?e:null;E.extend(ce);const Ct=E().add(18,"week").add(3,"day").startOf("day").toDate(),Lt=E().startOf("day").subtract(21,"days"),Tt=E().add(1,"year").startOf("day").toDate(),_t=/(19|20)\d{2}-(0?[1-9]|1[0-2])-(0?[1-9]|1\d|2\d|3[01])$/,zt=e=>t=>Ne(t)||_t.test(t)?null:e,Qt=e=>t=>E(t).isAfter(V)?e:null,Xt=(e,t)=>n=>t&&E(n).isAfter(t,"day")?e:null,Zt=e=>t=>E(t).isBefore(_e)?e:null,en=(e,t)=>n=>t&&E(n).isBefore(t,"day")?e:null,tn=(e,t)=>n=>t&&n&&E(t).isSame(n,"day")?e:null,nn=e=>t=>E(t).isBefore(Lt)?e:null,rn=e=>t=>E(t).isAfter(Ct)?e:null,an=e=>t=>E(t).isAfter(Tt)?e:null,sn=(e,t,n)=>r=>Be(E(r).toDate(),t,n)?null:e,on=(e,t,n)=>r=>{const a=n.map(i=>({from:E(i.fom).toDate(),to:i.tom?E(i.tom).toDate():Q})),s=t.isStartDate?r:t.date,o=a.concat({from:E(t.isStartDate?t.date:r).toDate(),to:s?E(s).toDate():Q});return Me(o)?e:null};var R=(e=>(e.SØKERSITUASJON="SØKERSITUASJON",e.OM_BARNET="OM_BARNET",e.DOKUMENTASJON="DOKUMENTASJON",e.UTENLANDSOPPHOLD="UTENLANDSOPPHOLD",e.UTENLANDSOPPHOLD_SENERE="UTENLANDSOPPHOLD_SENERE",e.UTENLANDSOPPHOLD_TIDLIGERE="UTENLANDSOPPHOLD_TIDLIGERE",e))(R||{});const Oe={},z=l.createContext(Oe),j=l.createContext(void 0),ae=({children:e,initialState:t,testDispatcher:n})=>{const[r,a]=l.useReducer((o,i)=>{switch(i.type){case"update":return{...o,[i.key]:i.data};case"reset":return{};default:throw new Error}},t||Oe),s=l.useCallback(o=>{n&&n(o),a(o)},[]);return X.jsx(z.Provider,{value:r,children:X.jsx(j.Provider,{value:s,children:e})})},se=e=>{const t=l.useContext(j);return l.useCallback(n=>{t&&t({type:"update",key:e,data:n})},[])},oe=()=>{const e=l.useContext(j);return l.useCallback((t,n)=>{e&&e({type:"update",key:t,data:n})},[])},W=()=>{const e=l.useContext(j);return l.useCallback(()=>{e&&e({type:"reset"})},[])},ie=e=>l.useContext(z)[e],J=()=>{const e=l.useContext(z);return l.useCallback(t=>e[t],[])};try{ae.displayName="EsDataContext",ae.__docgenInfo={description:"",displayName:"EsDataContext",props:{initialState:{defaultValue:null,description:"",name:"initialState",required:!1,type:{name:"EsDataMap"}},testDispatcher:{defaultValue:null,description:"",name:"testDispatcher",required:!1,type:{name:"((action: Action) => void)"}}}}}catch{}try{se.displayName="useEsStateSaveFn",se.__docgenInfo={description:"Hook returns save function for one specific data type",displayName:"useEsStateSaveFn",props:{}}}catch{}try{oe.displayName="useAllStateSaveFn",oe.__docgenInfo={description:"Hook returns save function usable with all data types",displayName:"useAllStateSaveFn",props:{}}}catch{}try{W.displayName="useEsStateResetFn",W.__docgenInfo={description:"Hook returns state reset function",displayName:"useEsStateResetFn",props:{}}}catch{}try{ie.displayName="useEsStateData",ie.__docgenInfo={description:"Hook returns data for one specific data type",displayName:"useEsStateData",props:{}}}catch{}try{J.displayName="useEsStateAllDataFn",J.__docgenInfo={description:"Hook returns function capable of getting all types of data from context state",displayName:"useEsStateAllDataFn",props:{}}}catch{}var v=(e=>(e.VELKOMMEN="/velkommen",e.SØKERSITUASJON="/soknad/søkersituasjon",e.OM_BARNET="/soknad/om-barnet",e.TERMINBEKREFTELSE="/soknad/terminbekreftelse",e.ADOPSJONSBEKREFTELSE="/soknad/adopsjonsbekreftelse",e.UTENLANDSOPPHOLD="/soknad/utenlandsopphold",e.TIDLIGERE_UTENLANDSOPPHOLD="/soknad/tidligere-utenlandsopphold",e.SENERE_UTENLANDSOPPHOLD="/soknad/senere-utenlandsopphold",e.OPPSUMMERING="/soknad/oppsummering",e))(v||{});const G=["/velkommen","/soknad/søkersituasjon","/soknad/om-barnet","/soknad/terminbekreftelse","/soknad/adopsjonsbekreftelse","/soknad/utenlandsopphold","/soknad/tidligere-utenlandsopphold","/soknad/senere-utenlandsopphold","/soknad/oppsummering"],At=["/soknad/søkersituasjon","/soknad/om-barnet","/soknad/utenlandsopphold","/soknad/oppsummering"],It=e=>({[v.SØKERSITUASJON]:e("SøkersituasjonSteg.Søkersituasjon"),[v.OM_BARNET]:e("OmBarnetSteg.OmBarnet"),[v.TERMINBEKREFTELSE]:e("UseStepData.Termin"),[v.ADOPSJONSBEKREFTELSE]:e("UseStepData.Adopsjon"),[v.UTENLANDSOPPHOLD]:e("UtenlandsoppholdSteg.Utenlandsopphold"),[v.TIDLIGERE_UTENLANDSOPPHOLD]:e("TidligereUtenlandsoppholdSteg.Tidligere"),[v.SENERE_UTENLANDSOPPHOLD]:e("SenereUtenlandsoppholdSteg.Fremtidig"),[v.OPPSUMMERING]:e("OppsummeringSteg.Oppsummering")}),Ut=(e,t)=>G.indexOf(t)>G.indexOf(e),b=(e,t,n,r,a)=>e&&Ut(n,r)||!!a(t),bt=(e,t,n)=>{if(e===v.TIDLIGERE_UTENLANDSOPPHOLD){const r=n(R.UTENLANDSOPPHOLD),a=!!(r!=null&&r.harBoddUtenforNorgeSiste12Mnd);return b(a,R.UTENLANDSOPPHOLD_TIDLIGERE,v.UTENLANDSOPPHOLD,t,n)}if(e===v.SENERE_UTENLANDSOPPHOLD){const r=n(R.UTENLANDSOPPHOLD),a=!!(r!=null&&r.skalBoUtenforNorgeNeste12Mnd);return b(a,R.UTENLANDSOPPHOLD_SENERE,v.UTENLANDSOPPHOLD,t,n)}return!1},Bt=(e,t,n)=>{const r=n(R.OM_BARNET);return e===v.TERMINBEKREFTELSE&&r&&"erBarnetFødt"in r?b(!r.erBarnetFødt,R.DOKUMENTASJON,v.OM_BARNET,t,n):e===v.ADOPSJONSBEKREFTELSE&&r&&"adopsjonAvEktefellesBarn"in r?b(!0,R.DOKUMENTASJON,v.OM_BARNET,t,n):!1},kt=()=>{const{i18n:e}=Ae(),t=It(e),n=w(),r=J(),a=l.useMemo(()=>Pt(Object.values(v).find(o=>o===decodeURIComponent(n.pathname))),[]),s=l.useMemo(()=>G.flatMap(o=>At.includes(o)||bt(o,a,r)||Bt(o,a,r)?[o]:[]),[]);return l.useMemo(()=>({activeStepId:a,stepConfig:s.map((o,i)=>({id:o,label:t[o],index:i}))}),[])},ln=()=>{const e=ve(),{activeStepId:t,stepConfig:n}=kt(),r=W();l.useEffect(()=>{Ie("sidevisning",{app:"engangsstonadny",team:"foreldrepenger",pageKey:t})},[]);const a=l.useCallback(()=>{var d;const c=n.findIndex(m=>m.id===t)-1,u=((d=n[c])==null?void 0:d.id)||v.VELKOMMEN;e(u)},[e,n,t]),s=l.useCallback(c=>{e(c)},[e]),o=l.useCallback(()=>{var d;const c=n.findIndex(m=>m.id===t)+1,u=(d=n[c])==null?void 0:d.id;e(u)},[e,n,t]),i=l.useCallback(()=>{r(),e(v.VELKOMMEN)},[]);return l.useMemo(()=>({goToPreviousDefaultStep:a,goToNextStep:s,goToNextDefaultStep:o,avbrytSøknad:i}),[a,o,s])};export{R as E,Gt as M,Vt as N,v as P,Yt as R,kt as a,ie as b,se as c,ae as d,Rt as e,Ft as f,zt as g,tn as h,qt as i,Xt as j,sn as k,Ht as l,on as m,en as n,Pt as o,Qt as p,Zt as q,nn as r,rn as s,an as t,ln as u,Kt as v,$t as w,Jt as x,Dt as y,Wt as z};
//# sourceMappingURL=useEsNavigator-6dd7003a.js.map