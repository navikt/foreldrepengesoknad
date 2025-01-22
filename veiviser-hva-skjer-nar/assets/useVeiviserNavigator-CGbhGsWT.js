import{r as l}from"./index-CZMpeKRu.js";var B={},le;function Se(){if(le)return B;le=1,Object.defineProperty(B,"__esModule",{value:!0}),B.parse=u,B.serialize=i;const e=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,t=/^[\u0021-\u003A\u003C-\u007E]*$/,n=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,a=/^[\u0020-\u003A\u003D-\u007E]*$/,r=Object.prototype.toString,o=(()=>{const h=function(){};return h.prototype=Object.create(null),h})();function u(h,d){const f=new o,g=h.length;if(g<2)return f;const x=(d==null?void 0:d.decode)||m;let p=0;do{const v=h.indexOf("=",p);if(v===-1)break;const w=h.indexOf(";",p),R=w===-1?g:w;if(v>R){p=h.lastIndexOf(";",v-1)+1;continue}const P=c(h,p,v),D=s(h,v,P),$=h.slice(P,D);if(f[$]===void 0){let F=c(h,v+1,R),C=s(h,R,F);const I=x(h.slice(F,C));f[$]=I}p=R+1}while(p<g);return f}function c(h,d,f){do{const g=h.charCodeAt(d);if(g!==32&&g!==9)return d}while(++d<f);return f}function s(h,d,f){for(;d>f;){const g=h.charCodeAt(--d);if(g!==32&&g!==9)return d+1}return f}function i(h,d,f){const g=(f==null?void 0:f.encode)||encodeURIComponent;if(!e.test(h))throw new TypeError(`argument name is invalid: ${h}`);const x=g(d);if(!t.test(x))throw new TypeError(`argument val is invalid: ${d}`);let p=h+"="+x;if(!f)return p;if(f.maxAge!==void 0){if(!Number.isInteger(f.maxAge))throw new TypeError(`option maxAge is invalid: ${f.maxAge}`);p+="; Max-Age="+f.maxAge}if(f.domain){if(!n.test(f.domain))throw new TypeError(`option domain is invalid: ${f.domain}`);p+="; Domain="+f.domain}if(f.path){if(!a.test(f.path))throw new TypeError(`option path is invalid: ${f.path}`);p+="; Path="+f.path}if(f.expires){if(!y(f.expires)||!Number.isFinite(f.expires.valueOf()))throw new TypeError(`option expires is invalid: ${f.expires}`);p+="; Expires="+f.expires.toUTCString()}if(f.httpOnly&&(p+="; HttpOnly"),f.secure&&(p+="; Secure"),f.partitioned&&(p+="; Partitioned"),f.priority)switch(typeof f.priority=="string"?f.priority.toLowerCase():void 0){case"low":p+="; Priority=Low";break;case"medium":p+="; Priority=Medium";break;case"high":p+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${f.priority}`)}if(f.sameSite)switch(typeof f.sameSite=="string"?f.sameSite.toLowerCase():f.sameSite){case!0:case"strict":p+="; SameSite=Strict";break;case"lax":p+="; SameSite=Lax";break;case"none":p+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${f.sameSite}`)}return p}function m(h){if(h.indexOf("%")===-1)return h;try{return decodeURIComponent(h)}catch{return h}}function y(h){return r.call(h)==="[object Date]"}return B}Se();/**
 * react-router v7.1.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Pe(e={}){let{initialEntries:t=["/"],initialIndex:n,v5Compat:a=!1}=e,r;r=t.map((d,f)=>m(d,typeof d=="string"?null:d.state,f===0?"default":void 0));let o=s(n??r.length-1),u="POP",c=null;function s(d){return Math.min(Math.max(d,0),r.length-1)}function i(){return r[o]}function m(d,f=null,g){let x=Le(r?i().pathname:"/",d,f,g);return b(x.pathname.charAt(0)==="/",`relative pathnames are not supported in memory history: ${JSON.stringify(d)}`),x}function y(d){return typeof d=="string"?d:j(d)}return{get index(){return o},get action(){return u},get location(){return i()},createHref:y,createURL(d){return new URL(y(d),"http://localhost")},encodeLocation(d){let f=typeof d=="string"?O(d):d;return{pathname:f.pathname||"",search:f.search||"",hash:f.hash||""}},push(d,f){u="PUSH";let g=m(d,f);o+=1,r.splice(o,r.length,g),a&&c&&c({action:u,location:g,delta:1})},replace(d,f){u="REPLACE";let g=m(d,f);r[o]=g,a&&c&&c({action:u,location:g,delta:0})},go(d){u="POP";let f=s(o+d),g=r[f];o=f,c&&c({action:u,location:g,delta:d})},listen(d){return c=d,()=>{c=null}}}}function E(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function b(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function ke(){return Math.random().toString(36).substring(2,10)}function Le(e,t,n=null,a){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?O(t):t,state:n,key:t&&t.key||a||ke()}}function j({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function O(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let a=e.indexOf("?");a>=0&&(t.search=e.substring(a),e=e.substring(0,a)),e&&(t.pathname=e)}return t}function fe(e,t,n="/"){return $e(e,t,n,!1)}function $e(e,t,n,a){let r=typeof t=="string"?O(t):t,o=T(r.pathname||"/",n);if(o==null)return null;let u=de(e);Ie(u);let c=null;for(let s=0;c==null&&s<u.length;++s){let i=He(o);c=Ue(u[s],i,a)}return c}function de(e,t=[],n=[],a=""){let r=(o,u,c)=>{let s={relativePath:c===void 0?o.path||"":c,caseSensitive:o.caseSensitive===!0,childrenIndex:u,route:o};s.relativePath.startsWith("/")&&(E(s.relativePath.startsWith(a),`Absolute route path "${s.relativePath}" nested under path "${a}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),s.relativePath=s.relativePath.slice(a.length));let i=L([a,s.relativePath]),m=n.concat(s);o.children&&o.children.length>0&&(E(o.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${i}".`),de(o.children,t,m,i)),!(o.path==null&&!o.index)&&t.push({path:i,score:Ae(i,o.index),routesMeta:m})};return e.forEach((o,u)=>{var c;if(o.path===""||!((c=o.path)!=null&&c.includes("?")))r(o,u);else for(let s of he(o.path))r(o,u,s)}),t}function he(e){let t=e.split("/");if(t.length===0)return[];let[n,...a]=t,r=n.endsWith("?"),o=n.replace(/\?$/,"");if(a.length===0)return r?[o,""]:[o];let u=he(a.join("/")),c=[];return c.push(...u.map(s=>s===""?o:[o,s].join("/"))),r&&c.push(...u),c.map(s=>e.startsWith("/")&&s===""?"/":s)}function Ie(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Be(t.routesMeta.map(a=>a.childrenIndex),n.routesMeta.map(a=>a.childrenIndex)))}var Te=/^:[\w-]+$/,Ne=3,Fe=2,Oe=1,De=10,Me=-2,ue=e=>e==="*";function Ae(e,t){let n=e.split("/"),a=n.length;return n.some(ue)&&(a+=Me),t&&(a+=Fe),n.filter(r=>!ue(r)).reduce((r,o)=>r+(Te.test(o)?Ne:o===""?Oe:De),a)}function Be(e,t){return e.length===t.length&&e.slice(0,-1).every((a,r)=>a===t[r])?e[e.length-1]-t[t.length-1]:0}function Ue(e,t,n=!1){let{routesMeta:a}=e,r={},o="/",u=[];for(let c=0;c<a.length;++c){let s=a[c],i=c===a.length-1,m=o==="/"?t:t.slice(o.length)||"/",y=J({path:s.relativePath,caseSensitive:s.caseSensitive,end:i},m),h=s.route;if(!y&&i&&n&&!a[a.length-1].route.index&&(y=J({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},m)),!y)return null;Object.assign(r,y.params),u.push({params:r,pathname:L([o,y.pathname]),pathnameBase:je(L([o,y.pathnameBase])),route:h}),y.pathnameBase!=="/"&&(o=L([o,y.pathnameBase]))}return u}function J(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,a]=We(e.path,e.caseSensitive,e.end),r=t.match(n);if(!r)return null;let o=r[0],u=o.replace(/(.)\/+$/,"$1"),c=r.slice(1);return{params:a.reduce((i,{paramName:m,isOptional:y},h)=>{if(m==="*"){let f=c[h]||"";u=o.slice(0,o.length-f.length).replace(/(.)\/+$/,"$1")}const d=c[h];return y&&!d?i[m]=void 0:i[m]=(d||"").replace(/%2F/g,"/"),i},{}),pathname:o,pathnameBase:u,pattern:e}}function We(e,t=!1,n=!0){b(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let a=[],r="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(u,c,s)=>(a.push({paramName:c,isOptional:s!=null}),s?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(a.push({paramName:"*"}),r+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":e!==""&&e!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,t?void 0:"i"),a]}function He(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return b(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function T(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,a=e.charAt(n);return a&&a!=="/"?null:e.slice(n)||"/"}function _e(e,t="/"){let{pathname:n,search:a="",hash:r=""}=typeof e=="string"?O(e):e;return{pathname:n?n.startsWith("/")?n:ze(n,t):t,search:Je(a),hash:Ke(r)}}function ze(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function q(e,t,n,a){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(a)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ve(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Q(e){let t=Ve(e);return t.map((n,a)=>a===t.length-1?n.pathname:n.pathnameBase)}function Z(e,t,n,a=!1){let r;typeof e=="string"?r=O(e):(r={...e},E(!r.pathname||!r.pathname.includes("?"),q("?","pathname","search",r)),E(!r.pathname||!r.pathname.includes("#"),q("#","pathname","hash",r)),E(!r.search||!r.search.includes("#"),q("#","search","hash",r)));let o=e===""||r.pathname==="",u=o?"/":r.pathname,c;if(u==null)c=n;else{let y=t.length-1;if(!a&&u.startsWith("..")){let h=u.split("/");for(;h[0]==="..";)h.shift(),y-=1;r.pathname=h.join("/")}c=y>=0?t[y]:"/"}let s=_e(r,c),i=u&&u!=="/"&&u.endsWith("/"),m=(o||u===".")&&n.endsWith("/");return!s.pathname.endsWith("/")&&(i||m)&&(s.pathname+="/"),s}var L=e=>e.join("/").replace(/\/\/+/g,"/"),je=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Je=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Ke=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Ye(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var me=["POST","PUT","PATCH","DELETE"];new Set(me);var qe=["GET",...me];new Set(qe);var M=l.createContext(null);M.displayName="DataRouter";var K=l.createContext(null);K.displayName="DataRouterState";var pe=l.createContext({isTransitioning:!1});pe.displayName="ViewTransition";var Ge=l.createContext(new Map);Ge.displayName="Fetchers";var Xe=l.createContext(null);Xe.displayName="Await";var S=l.createContext(null);S.displayName="Navigation";var W=l.createContext(null);W.displayName="Location";var k=l.createContext({outlet:null,matches:[],isDataRoute:!1});k.displayName="Route";var ee=l.createContext(null);ee.displayName="RouteError";function Qe(e,{relative:t}={}){E(A(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:a}=l.useContext(S),{hash:r,pathname:o,search:u}=H(e,{relative:t}),c=o;return n!=="/"&&(c=o==="/"?n:L([n,o])),a.createHref({pathname:c,search:u,hash:r})}function A(){return l.useContext(W)!=null}function N(){return E(A(),"useLocation() may be used only in the context of a <Router> component."),l.useContext(W).location}var ye="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function ge(e){l.useContext(S).static||l.useLayoutEffect(e)}function te(){let{isDataRoute:e}=l.useContext(k);return e?ft():Ze()}function Ze(){E(A(),"useNavigate() may be used only in the context of a <Router> component.");let e=l.useContext(M),{basename:t,navigator:n}=l.useContext(S),{matches:a}=l.useContext(k),{pathname:r}=N(),o=JSON.stringify(Q(a)),u=l.useRef(!1);return ge(()=>{u.current=!0}),l.useCallback((s,i={})=>{if(b(u.current,ye),!u.current)return;if(typeof s=="number"){n.go(s);return}let m=Z(s,JSON.parse(o),r,i.relative==="path");e==null&&t!=="/"&&(m.pathname=m.pathname==="/"?t:L([t,m.pathname])),(i.replace?n.replace:n.push)(m,i.state,i)},[t,n,o,r,e])}l.createContext(null);function H(e,{relative:t}={}){let{matches:n}=l.useContext(k),{pathname:a}=N(),r=JSON.stringify(Q(n));return l.useMemo(()=>Z(e,JSON.parse(r),a,t==="path"),[e,r,a,t])}function et(e,t){return ve(e,t)}function ve(e,t,n,a){var p;E(A(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:r}=l.useContext(S),{matches:o}=l.useContext(k),u=o[o.length-1],c=u?u.params:{},s=u?u.pathname:"/",i=u?u.pathnameBase:"/",m=u&&u.route;{let v=m&&m.path||"";xe(s,!m||v.endsWith("*")||v.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${v}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${v}"> to <Route path="${v==="/"?"*":`${v}/*`}">.`)}let y=N(),h;if(t){let v=typeof t=="string"?O(t):t;E(i==="/"||((p=v.pathname)==null?void 0:p.startsWith(i)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${i}" but pathname "${v.pathname}" was given in the \`location\` prop.`),h=v}else h=y;let d=h.pathname||"/",f=d;if(i!=="/"){let v=i.replace(/^\//,"").split("/");f="/"+d.replace(/^\//,"").split("/").slice(v.length).join("/")}let g=fe(e,{pathname:f});b(m||g!=null,`No routes matched location "${h.pathname}${h.search}${h.hash}" `),b(g==null||g[g.length-1].route.element!==void 0||g[g.length-1].route.Component!==void 0||g[g.length-1].route.lazy!==void 0,`Matched leaf route at location "${h.pathname}${h.search}${h.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let x=ot(g&&g.map(v=>Object.assign({},v,{params:Object.assign({},c,v.params),pathname:L([i,r.encodeLocation?r.encodeLocation(v.pathname).pathname:v.pathname]),pathnameBase:v.pathnameBase==="/"?i:L([i,r.encodeLocation?r.encodeLocation(v.pathnameBase).pathname:v.pathnameBase])})),o,n,a);return t&&x?l.createElement(W.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...h},navigationType:"POP"}},x):x}function tt(){let e=ct(),t=Ye(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a="rgba(200,200,200, 0.5)",r={padding:"0.5rem",backgroundColor:a},o={padding:"2px 4px",backgroundColor:a},u=null;return console.error("Error handled by React Router default ErrorBoundary:",e),u=l.createElement(l.Fragment,null,l.createElement("p",null,"💿 Hey developer 👋"),l.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",l.createElement("code",{style:o},"ErrorBoundary")," or"," ",l.createElement("code",{style:o},"errorElement")," prop on your route.")),l.createElement(l.Fragment,null,l.createElement("h2",null,"Unexpected Application Error!"),l.createElement("h3",{style:{fontStyle:"italic"}},t),n?l.createElement("pre",{style:r},n):null,u)}var nt=l.createElement(tt,null),rt=class extends l.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?l.createElement(k.Provider,{value:this.props.routeContext},l.createElement(ee.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function at({routeContext:e,match:t,children:n}){let a=l.useContext(M);return a&&a.static&&a.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=t.route.id),l.createElement(k.Provider,{value:e},n)}function ot(e,t=[],n=null,a=null){if(e==null){if(!n)return null;if(n.errors)e=n.matches;else if(t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let r=e,o=n==null?void 0:n.errors;if(o!=null){let s=r.findIndex(i=>i.route.id&&(o==null?void 0:o[i.route.id])!==void 0);E(s>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`),r=r.slice(0,Math.min(r.length,s+1))}let u=!1,c=-1;if(n)for(let s=0;s<r.length;s++){let i=r[s];if((i.route.HydrateFallback||i.route.hydrateFallbackElement)&&(c=s),i.route.id){let{loaderData:m,errors:y}=n,h=i.route.loader&&!m.hasOwnProperty(i.route.id)&&(!y||y[i.route.id]===void 0);if(i.route.lazy||h){u=!0,c>=0?r=r.slice(0,c+1):r=[r[0]];break}}}return r.reduceRight((s,i,m)=>{let y,h=!1,d=null,f=null;n&&(y=o&&i.route.id?o[i.route.id]:void 0,d=i.route.errorElement||nt,u&&(c<0&&m===0?(xe("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),h=!0,f=null):c===m&&(h=!0,f=i.route.hydrateFallbackElement||null)));let g=t.concat(r.slice(0,m+1)),x=()=>{let p;return y?p=d:h?p=f:i.route.Component?p=l.createElement(i.route.Component,null):i.route.element?p=i.route.element:p=s,l.createElement(at,{match:i,routeContext:{outlet:s,matches:g,isDataRoute:n!=null},children:p})};return n&&(i.route.ErrorBoundary||i.route.errorElement||m===0)?l.createElement(rt,{location:n.location,revalidation:n.revalidation,component:d,error:y,children:x(),routeContext:{outlet:null,matches:g,isDataRoute:!0}}):x()},null)}function ne(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function it(e){let t=l.useContext(M);return E(t,ne(e)),t}function lt(e){let t=l.useContext(K);return E(t,ne(e)),t}function ut(e){let t=l.useContext(k);return E(t,ne(e)),t}function re(e){let t=ut(e),n=t.matches[t.matches.length-1];return E(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function st(){return re("useRouteId")}function ct(){var a;let e=l.useContext(ee),t=lt("useRouteError"),n=re("useRouteError");return e!==void 0?e:(a=t.errors)==null?void 0:a[n]}function ft(){let{router:e}=it("useNavigate"),t=re("useNavigate"),n=l.useRef(!1);return ge(()=>{n.current=!0}),l.useCallback(async(r,o={})=>{b(n.current,ye),n.current&&(typeof r=="number"?e.navigate(r):await e.navigate(r,{fromRouteId:t,...o}))},[e,t])}var se={};function xe(e,t,n){!t&&!se[e]&&(se[e]=!0,b(!1,n))}l.memo(dt);function dt({routes:e,future:t,state:n}){return ve(e,void 0,n,t)}function qt({basename:e,children:t,initialEntries:n,initialIndex:a}){let r=l.useRef();r.current==null&&(r.current=Pe({initialEntries:n,initialIndex:a,v5Compat:!0}));let o=r.current,[u,c]=l.useState({action:o.action,location:o.location}),s=l.useCallback(i=>{l.startTransition(()=>c(i))},[c]);return l.useLayoutEffect(()=>o.listen(s),[o,s]),l.createElement(mt,{basename:e,children:t,location:u.location,navigationType:u.action,navigator:o})}function Gt({to:e,replace:t,state:n,relative:a}){E(A(),"<Navigate> may be used only in the context of a <Router> component.");let{static:r}=l.useContext(S);b(!r,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:o}=l.useContext(k),{pathname:u}=N(),c=te(),s=Z(e,Q(o),u,a==="path"),i=JSON.stringify(s);return l.useEffect(()=>{c(JSON.parse(i),{replace:t,state:n,relative:a})},[c,i,a,t,n]),null}function ht(e){E(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function mt({basename:e="/",children:t=null,location:n,navigationType:a="POP",navigator:r,static:o=!1}){E(!A(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let u=e.replace(/^\/*/,"/"),c=l.useMemo(()=>({basename:u,navigator:r,static:o,future:{}}),[u,r,o]);typeof n=="string"&&(n=O(n));let{pathname:s="/",search:i="",hash:m="",state:y=null,key:h="default"}=n,d=l.useMemo(()=>{let f=T(s,u);return f==null?null:{location:{pathname:f,search:i,hash:m,state:y,key:h},navigationType:a}},[u,s,i,m,y,h,a]);return b(d!=null,`<Router basename="${u}"> is not able to match the URL "${s}${i}${m}" because it does not start with the basename, so the <Router> won't render anything.`),d==null?null:l.createElement(S.Provider,{value:c},l.createElement(W.Provider,{children:t,value:d}))}function Xt({children:e,location:t}){return et(X(e),t)}function X(e,t=[]){let n=[];return l.Children.forEach(e,(a,r)=>{if(!l.isValidElement(a))return;let o=[...t,r];if(a.type===l.Fragment){n.push.apply(n,X(a.props.children,o));return}E(a.type===ht,`[${typeof a.type=="string"?a.type:a.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),E(!a.props.index||!a.props.children,"An index route cannot have child routes.");let u={id:a.props.id||o.join("-"),caseSensitive:a.props.caseSensitive,element:a.props.element,Component:a.props.Component,index:a.props.index,path:a.props.path,loader:a.props.loader,action:a.props.action,hydrateFallbackElement:a.props.hydrateFallbackElement,HydrateFallback:a.props.HydrateFallback,errorElement:a.props.errorElement,ErrorBoundary:a.props.ErrorBoundary,hasErrorBoundary:a.props.hasErrorBoundary===!0||a.props.ErrorBoundary!=null||a.props.errorElement!=null,shouldRevalidate:a.props.shouldRevalidate,handle:a.props.handle,lazy:a.props.lazy};a.props.children&&(u.children=X(a.props.children,o)),n.push(u)}),n}var z="get",V="application/x-www-form-urlencoded";function Y(e){return e!=null&&typeof e.tagName=="string"}function pt(e){return Y(e)&&e.tagName.toLowerCase()==="button"}function yt(e){return Y(e)&&e.tagName.toLowerCase()==="form"}function gt(e){return Y(e)&&e.tagName.toLowerCase()==="input"}function vt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function xt(e,t){return e.button===0&&(!t||t==="_self")&&!vt(e)}var _=null;function wt(){if(_===null)try{new FormData(document.createElement("form"),0),_=!1}catch{_=!0}return _}var Et=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function G(e){return e!=null&&!Et.has(e)?(b(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${V}"`),null):e}function Rt(e,t){let n,a,r,o,u;if(yt(e)){let c=e.getAttribute("action");a=c?T(c,t):null,n=e.getAttribute("method")||z,r=G(e.getAttribute("enctype"))||V,o=new FormData(e)}else if(pt(e)||gt(e)&&(e.type==="submit"||e.type==="image")){let c=e.form;if(c==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let s=e.getAttribute("formaction")||c.getAttribute("action");if(a=s?T(s,t):null,n=e.getAttribute("formmethod")||c.getAttribute("method")||z,r=G(e.getAttribute("formenctype"))||G(c.getAttribute("enctype"))||V,o=new FormData(c,e),!wt()){let{name:i,type:m,value:y}=e;if(m==="image"){let h=i?`${i}.`:"";o.append(`${h}x`,"0"),o.append(`${h}y`,"0")}else i&&o.append(i,y)}}else{if(Y(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=z,a=null,r=V,u=e}return o&&r==="text/plain"&&(u=o,o=void 0),{action:a,method:n.toLowerCase(),encType:r,formData:o,body:u}}function ae(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function Ct(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function bt(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function St(e,t,n){let a=await Promise.all(e.map(async r=>{let o=t.routes[r.route.id];if(o){let u=await Ct(o,n);return u.links?u.links():[]}return[]}));return $t(a.flat(1).filter(bt).filter(r=>r.rel==="stylesheet"||r.rel==="preload").map(r=>r.rel==="stylesheet"?{...r,rel:"prefetch",as:"style"}:{...r,rel:"prefetch"}))}function ce(e,t,n,a,r,o){let u=(s,i)=>n[i]?s.route.id!==n[i].route.id:!0,c=(s,i)=>{var m;return n[i].pathname!==s.pathname||((m=n[i].route.path)==null?void 0:m.endsWith("*"))&&n[i].params["*"]!==s.params["*"]};return o==="assets"?t.filter((s,i)=>u(s,i)||c(s,i)):o==="data"?t.filter((s,i)=>{var y;let m=a.routes[s.route.id];if(!m||!m.hasLoader)return!1;if(u(s,i)||c(s,i))return!0;if(s.route.shouldRevalidate){let h=s.route.shouldRevalidate({currentUrl:new URL(r.pathname+r.search+r.hash,window.origin),currentParams:((y=n[0])==null?void 0:y.params)||{},nextUrl:new URL(e,window.origin),nextParams:s.params,defaultShouldRevalidate:!0});if(typeof h=="boolean")return h}return!0}):[]}function Pt(e,t){return kt(e.map(n=>{let a=t.routes[n.route.id];if(!a)return[];let r=[a.module];return a.imports&&(r=r.concat(a.imports)),r}).flat(1))}function kt(e){return[...new Set(e)]}function Lt(e){let t={},n=Object.keys(e).sort();for(let a of n)t[a]=e[a];return t}function $t(e,t){let n=new Set;return new Set(t),e.reduce((a,r)=>{let o=JSON.stringify(Lt(r));return n.has(o)||(n.add(o),a.push({key:o,link:r})),a},[])}function It(e){let t=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return t.pathname==="/"?t.pathname="_root.data":t.pathname=`${t.pathname.replace(/\/$/,"")}.data`,t}function Tt(){let e=l.useContext(M);return ae(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function Nt(){let e=l.useContext(K);return ae(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var oe=l.createContext(void 0);oe.displayName="FrameworkContext";function we(){let e=l.useContext(oe);return ae(e,"You must render this element inside a <HydratedRouter> element"),e}function Ft(e,t){let n=l.useContext(oe),[a,r]=l.useState(!1),[o,u]=l.useState(!1),{onFocus:c,onBlur:s,onMouseEnter:i,onMouseLeave:m,onTouchStart:y}=t,h=l.useRef(null);l.useEffect(()=>{if(e==="render"&&u(!0),e==="viewport"){let g=p=>{p.forEach(v=>{u(v.isIntersecting)})},x=new IntersectionObserver(g,{threshold:.5});return h.current&&x.observe(h.current),()=>{x.disconnect()}}},[e]),l.useEffect(()=>{if(a){let g=setTimeout(()=>{u(!0)},100);return()=>{clearTimeout(g)}}},[a]);let d=()=>{r(!0)},f=()=>{r(!1),u(!1)};return n?e!=="intent"?[o,h,{}]:[o,h,{onFocus:U(c,d),onBlur:U(s,f),onMouseEnter:U(i,d),onMouseLeave:U(m,f),onTouchStart:U(y,d)}]:[!1,h,{}]}function U(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function Ot({page:e,...t}){let{router:n}=Tt(),a=l.useMemo(()=>fe(n.routes,e,n.basename),[n.routes,e,n.basename]);return a?l.createElement(Mt,{page:e,matches:a,...t}):null}function Dt(e){let{manifest:t,routeModules:n}=we(),[a,r]=l.useState([]);return l.useEffect(()=>{let o=!1;return St(e,t,n).then(u=>{o||r(u)}),()=>{o=!0}},[e,t,n]),a}function Mt({page:e,matches:t,...n}){let a=N(),{manifest:r,routeModules:o}=we(),{loaderData:u,matches:c}=Nt(),s=l.useMemo(()=>ce(e,t,c,r,a,"data"),[e,t,c,r,a]),i=l.useMemo(()=>ce(e,t,c,r,a,"assets"),[e,t,c,r,a]),m=l.useMemo(()=>{if(e===a.pathname+a.search+a.hash)return[];let d=new Set,f=!1;if(t.forEach(x=>{var v;let p=r.routes[x.route.id];!p||!p.hasLoader||(!s.some(w=>w.route.id===x.route.id)&&x.route.id in u&&((v=o[x.route.id])!=null&&v.shouldRevalidate)||p.hasClientLoader?f=!0:d.add(x.route.id))}),d.size===0)return[];let g=It(e);return f&&d.size>0&&g.searchParams.set("_routes",t.filter(x=>d.has(x.route.id)).map(x=>x.route.id).join(",")),[g.pathname+g.search]},[u,a,r,s,t,e,o]),y=l.useMemo(()=>Pt(i,r),[i,r]),h=Dt(i);return l.createElement(l.Fragment,null,m.map(d=>l.createElement("link",{key:d,rel:"prefetch",as:"fetch",href:d,...n})),y.map(d=>l.createElement("link",{key:d,rel:"modulepreload",href:d,...n})),h.map(({key:d,link:f})=>l.createElement("link",{key:d,...f})))}function At(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var Ee=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Ee&&(window.__reactRouterVersion="7.1.3")}catch{}var Re=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Ce=l.forwardRef(function({onClick:t,discover:n="render",prefetch:a="none",relative:r,reloadDocument:o,replace:u,state:c,target:s,to:i,preventScrollReset:m,viewTransition:y,...h},d){let{basename:f}=l.useContext(S),g=typeof i=="string"&&Re.test(i),x,p=!1;if(typeof i=="string"&&g&&(x=i,Ee))try{let C=new URL(window.location.href),I=i.startsWith("//")?new URL(C.protocol+i):new URL(i),ie=T(I.pathname,f);I.origin===C.origin&&ie!=null?i=ie+I.search+I.hash:p=!0}catch{b(!1,`<Link to="${i}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let v=Qe(i,{relative:r}),[w,R,P]=Ft(a,h),D=Ht(i,{replace:u,state:c,target:s,preventScrollReset:m,relative:r,viewTransition:y});function $(C){t&&t(C),C.defaultPrevented||D(C)}let F=l.createElement("a",{...h,...P,href:x||v,onClick:p||o?t:$,ref:At(d,R),target:s,"data-discover":!g&&n==="render"?"true":void 0});return w&&!g?l.createElement(l.Fragment,null,F,l.createElement(Ot,{page:v})):F});Ce.displayName="Link";var Bt=l.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:a="",end:r=!1,style:o,to:u,viewTransition:c,children:s,...i},m){let y=H(u,{relative:i.relative}),h=N(),d=l.useContext(K),{navigator:f,basename:g}=l.useContext(S),x=d!=null&&Jt(y)&&c===!0,p=f.encodeLocation?f.encodeLocation(y).pathname:y.pathname,v=h.pathname,w=d&&d.navigation&&d.navigation.location?d.navigation.location.pathname:null;n||(v=v.toLowerCase(),w=w?w.toLowerCase():null,p=p.toLowerCase()),w&&g&&(w=T(w,g)||w);const R=p!=="/"&&p.endsWith("/")?p.length-1:p.length;let P=v===p||!r&&v.startsWith(p)&&v.charAt(R)==="/",D=w!=null&&(w===p||!r&&w.startsWith(p)&&w.charAt(p.length)==="/"),$={isActive:P,isPending:D,isTransitioning:x},F=P?t:void 0,C;typeof a=="function"?C=a($):C=[a,P?"active":null,D?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let I=typeof o=="function"?o($):o;return l.createElement(Ce,{...i,"aria-current":F,className:C,ref:m,style:I,to:u,viewTransition:c},typeof s=="function"?s($):s)});Bt.displayName="NavLink";var Ut=l.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:a,replace:r,state:o,method:u=z,action:c,onSubmit:s,relative:i,preventScrollReset:m,viewTransition:y,...h},d)=>{let f=Vt(),g=jt(c,{relative:i}),x=u.toLowerCase()==="get"?"get":"post",p=typeof c=="string"&&Re.test(c),v=w=>{if(s&&s(w),w.defaultPrevented)return;w.preventDefault();let R=w.nativeEvent.submitter,P=(R==null?void 0:R.getAttribute("formmethod"))||u;f(R||w.currentTarget,{fetcherKey:t,method:P,navigate:n,replace:r,state:o,relative:i,preventScrollReset:m,viewTransition:y})};return l.createElement("form",{ref:d,method:x,action:g,onSubmit:a?s:v,...h,"data-discover":!p&&e==="render"?"true":void 0})});Ut.displayName="Form";function Wt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function be(e){let t=l.useContext(M);return E(t,Wt(e)),t}function Ht(e,{target:t,replace:n,state:a,preventScrollReset:r,relative:o,viewTransition:u}={}){let c=te(),s=N(),i=H(e,{relative:o});return l.useCallback(m=>{if(xt(m,t)){m.preventDefault();let y=n!==void 0?n:j(s)===j(i);c(e,{replace:y,state:a,preventScrollReset:r,relative:o,viewTransition:u})}},[s,c,i,n,a,t,e,r,o,u])}var _t=0,zt=()=>`__${String(++_t)}__`;function Vt(){let{router:e}=be("useSubmit"),{basename:t}=l.useContext(S),n=st();return l.useCallback(async(a,r={})=>{let{action:o,method:u,encType:c,formData:s,body:i}=Rt(a,t);if(r.navigate===!1){let m=r.fetcherKey||zt();await e.fetch(m,n,r.action||o,{preventScrollReset:r.preventScrollReset,formData:s,body:i,formMethod:r.method||u,formEncType:r.encType||c,flushSync:r.flushSync})}else await e.navigate(r.action||o,{preventScrollReset:r.preventScrollReset,formData:s,body:i,formMethod:r.method||u,formEncType:r.encType||c,replace:r.replace,state:r.state,fromRouteId:n,flushSync:r.flushSync,viewTransition:r.viewTransition})},[e,t,n])}function jt(e,{relative:t}={}){let{basename:n}=l.useContext(S),a=l.useContext(k);E(a,"useFormAction must be used inside a RouteContext");let[r]=a.matches.slice(-1),o={...H(e||".",{relative:t})},u=N();if(e==null){o.search=u.search;let c=new URLSearchParams(o.search),s=c.getAll("index");if(s.some(m=>m==="")){c.delete("index"),s.filter(y=>y).forEach(y=>c.append("index",y));let m=c.toString();o.search=m?`?${m}`:""}}return(!e||e===".")&&r.route.index&&(o.search=o.search?o.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(o.pathname=o.pathname==="/"?n:L([n,o.pathname])),j(o)}function Jt(e,t={}){let n=l.useContext(pe);E(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:a}=be("useViewTransitionState"),r=H(e,{relative:t.relative});if(!n.isTransitioning)return!1;let o=T(n.currentLocation.pathname,a)||n.currentLocation.pathname,u=T(n.nextLocation.pathname,a)||n.nextLocation.pathname;return J(r.pathname,u)!=null||J(r.pathname,o)!=null}new TextEncoder;var Kt=(e=>(e.OM="/om",e.SITUASJON="/situasjon",e.OPPSUMMERING="/oppsummering",e))(Kt||{});const Qt=()=>{const e=te();return{goToRoute:l.useCallback(n=>{e(n)},[e])}};export{Kt as H,qt as M,Gt as N,Xt as R,ht as a,Qt as u};
