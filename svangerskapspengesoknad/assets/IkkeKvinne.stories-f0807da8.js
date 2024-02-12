import{j as B}from"./Modal-5f6515f6.js";import{R as J,u as Q,I as N}from"./IkkeKvinne-1d487ccc.js";import{R as d,r as f}from"./index-f1f2c4b1.js";import{c as X,R as Z,u as w,a as tt,b as et}from"./index-0df0c4a0.js";/* empty css              */import"./index-da441cba.js";import"./fridagerUtils-8a4187a7.js";import"./index-b580f7e8.js";import"./v4-4a60fe23.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./amplitude-672a2544.js";import"./links-439b6638.js";import"./dates-f0f943ad.js";import"./ArrowRight-7eea1688.js";const{makeDecorator:rt,addons:D}=__STORYBOOK_MODULE_PREVIEW_API__;var E="storybook/react-router-v6",at="reactRouter",s={CLEAR:`${E}/clear`,NAVIGATION:`${E}/navigation`,STORY_LOADED:`${E}/story-loaded`,ROUTE_MATCHES:`${E}/route-matches`,ACTION_INVOKED:`${E}/action_invoked`,ACTION_SETTLED:`${E}/action_settled`,LOADER_INVOKED:`${E}/loader_invoked`,LOADER_SETTLED:`${E}/loader_settled`},$=d.createContext([]),V=d.createContext(void 0);function nt(){let[t,r]=f.useState([]),e=Z;return e.Provider._context=new Proxy(e.Provider._context??{},{set(a,n,o){return n==="_currentValue"&&o!==void 0&&r(i=>o.matches.length>i.length?o.matches:i),Reflect.set(a,n,o)}}),t}function ot(t){let r={};return t.forEach((e,a)=>{if(e instanceof File){r[a]={filename:e.name,filesize:e.size,filetype:e.type};return}r[a]=e}),r}async function A(t){let r=t.clone(),e=r.headers.get("content-type")||"",a;switch(!0){case e.startsWith("text"):a=await r.text();break;case e.startsWith("application/json"):a=await r.json();break;case e.startsWith("multipart/form-data"):case e.startsWith("application/x-www-form-urlencoded"):{a=ot(await r.formData());break}}return a}var K=()=>{let t=f.useRef(0);return f.useCallback(async(r,e)=>{t.current++;let a=`${r}_${t.current}`;switch(r){case s.ACTION_INVOKED:{let{request:n,params:o,context:i}=e,u={url:n.url,method:n.method,body:await A(n)};return{key:a,type:r,data:{params:o,request:u,context:i}}}case s.ACTION_SETTLED:return{key:a,type:r,data:e};case s.LOADER_INVOKED:{let{request:n,params:o,context:i}=e,u={url:n.url,method:n.method,body:await A(n)};return{key:a,type:r,data:{params:o,request:u,context:i}}}case s.LOADER_SETTLED:return{key:a,type:r,data:e}}},[])};function it(){let t=D.getChannel(),r=K();return f.useCallback(e=>async function(a){if(e===void 0)return;t.emit(s.ACTION_INVOKED,await r(s.ACTION_INVOKED,a));let n=await e(a);return t.emit(s.ACTION_SETTLED,await r(s.ACTION_SETTLED,n)),n},[t,r])}function lt(){let t=D.getChannel(),r=K();return f.useCallback(e=>async function(a){if(e===void 0)return;t.emit(s.LOADER_INVOKED,await r(s.LOADER_INVOKED,a));let n=await e(a);return t.emit(s.LOADER_SETTLED,await r(s.LOADER_SETTLED,n)),n},[t,r])}function st(){let t=it(),r=lt(),e=f.useCallback(a=>a.map(n=>{let{action:o,loader:i,children:u,lazy:m}=n,c={...n};return m&&(c.lazy=async function(){let l=await m(),h={...l};return l.action&&(h.action=t(l.action)),l.loader&&(h.loader=r(l.loader)),h}),o&&(c.action=t(o)),i&&(c.loader=r(i)),u&&(c.children=e(u)),c}),[t,r]);return e}var H=()=>{let t=d.useContext(V);if(t===void 0)throw new Error("useStory should be used inside <StoryContext>");return t};function j(t,r){if(t.length===1&&(t[0].children===void 0||t[0].children.length===0))return[{...t[0],element:r}];let e=t.findIndex(a=>a.useStoryElement);if(e!==-1){let a=Array.from(t);return a.splice(e,1,{...t[e],element:r}),a}return t.map(a=>a.children?{...a,children:j(a.children,r)}:a)}var S;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(S||(S={}));function I(t,r){if(t===!1||t===null||typeof t>"u")throw new Error(r)}var k;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(k||(k={}));function x(t,r){r===void 0&&(r={});let e=t;return e.endsWith("*")&&e!=="*"&&!e.endsWith("/*")&&(ut(!1,'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".')),e=e.replace(/\*$/,"/*")),e.replace(/^:(\w+)(\??)/g,(a,n,o)=>{let i=r[n];return o==="?"?i??"":(i==null&&I(!1,'Missing ":'+n+'" param'),i)}).replace(/\/:(\w+)(\??)/g,(a,n,o)=>{let i=r[n];return o==="?"?i==null?"":"/"+i:(i==null&&I(!1,'Missing ":'+n+'" param'),"/"+i)}).replace(/\?/g,"").replace(/(\/?)\*/,(a,n,o,i)=>{let u="*";return r[u]==null?i==="/*"?"/":"":""+n+r[u]})}function ut(t,r){if(!t){typeof console<"u"&&console.warn(r);try{throw new Error(r)}catch{}}}var M=["post","put","patch","delete"];new Set(M);var ct=["get",...M];new Set(ct);function ht({navigationHistory:t,location:r,routes:e}){if(t!==void 0){let h=[],v,R=Object.values(t);for(let y=0;y<R.length;y++){let{path:O,pathParams:_,searchParams:Y,hash:q,state:z,isInitialLocation:G}=R[y];G&&(v=y);let P=T(e),F=(typeof O=="function"?O(P,_??{}):O)??P;h.push({pathname:x(F??"/",_),search:new URLSearchParams(Y).toString(),hash:q,state:z})}return v??(v=h.length-1),{initialEntries:h,initialIndex:v}}let{path:a,pathParams:n,searchParams:o,hash:i,state:u}=r??{},m=T(e),c=(typeof a=="function"?a(m,n??{}):a)??m,l=0;return{initialEntries:[{pathname:x(c,n),search:new URLSearchParams(o).toString(),hash:i,state:u}],initialIndex:l}}function T(t=[],r="/"){if(t.length!==1)return r;let e=t[0],a=dt(r,e.path);return e.children===void 0||e.children.length===0?a:T(e.children,a)}function dt(t,r=""){let e=["","/"],a=t.split("/").filter(o=>!e.includes(o)),n=r.split("/").filter(o=>!e.includes(o));return"/"+[...a,...n].join("/")}function p(t,r){return Object.prototype.hasOwnProperty.call(t,r)}function mt(t){return arguments.length===0?[]:Array.isArray(t)?t:[t]}function pt(t){var r;return t===void 0?[{path:"/"}]:typeof t=="string"?[{path:t}]:(t=mt(t),t.length===1&&((r=t[0]).path??(r.path="/")),t)}var U=()=>d.useContext($);function ft(t){let r={};return t.forEach((e,a)=>{let n=r[a];if(typeof n=="string"){r[a]=[n,e];return}if(Array.isArray(n)){r[a]=[...n,e];return}r[a]=e}),r}var Et=()=>{let t=w(),r=t.pathname;return t.search.length>0&&(r+=`?${t.search}`),t.hash.length>0&&(r+=`#${t.hash}`),r},yt=()=>{let t=f.useRef(0),r=w(),e=tt(),[a]=Q(),n=et(),o=U(),i=ft(a),u=Et(),m=o.map(l=>{let h={path:l.route.path};return Object.keys(l.params).length>0&&(h.params=l.params),h}),c={url:u,path:r.pathname,routeParams:e,searchParams:i,hash:r.hash,routeState:r.state,routeMatches:m};return l=>{t.current++;let h=`${l}_${t.current}`;switch(l){case s.STORY_LOADED:return{key:h,type:l,data:c};case s.NAVIGATION:return{key:h,type:l,data:{...c,navigationType:n}};case s.ROUTE_MATCHES:return{key:h,type:l,data:{matches:m}}}}};function W(){let{renderStory:t,storyContext:r}=H(),e=D.getChannel(),a=w(),n=U(),o=yt(),i=f.useRef(),u=f.useRef(),m=f.useRef(),c=i.current!==void 0,l=c&&a.key!==i.current;return l&&u.current!==a.key&&(e.emit(s.NAVIGATION,o(s.NAVIGATION)),u.current=a.key),l&&n.length>0&&n!==m.current&&e.emit(s.ROUTE_MATCHES,o(s.ROUTE_MATCHES)),!c&&n.length>0&&(e.emit(s.STORY_LOADED,o(s.STORY_LOADED)),i.current=a.key,m.current=n),m.current=n,d.createElement(d.Fragment,null,t(r))}W.displayName="RouterLogger";function gt(){let{addonParameters:t={}}=H(),{hydrationData:r,routing:e,navigationHistory:a,location:n}=t,o=st(),i=f.useMemo(()=>{let u=pt(e),m=o(u),c=j(m,d.createElement(W,null)),{initialEntries:l,initialIndex:h}=ht({navigationHistory:a,location:n,routes:c});return X(c,{initialEntries:l,initialIndex:h,hydrationData:r})},[o,r,n,a,e]);return d.createElement(J,{router:i,fallbackElement:d.createElement(vt,null)})}function vt(){return d.createElement("p",null,"Performing initial data load")}var Ot=({renderStory:t,storyContext:r,addonParameters:e})=>{let a=nt();return d.createElement(V.Provider,{value:{renderStory:t,storyContext:r,addonParameters:e}},d.createElement($.Provider,{value:a},d.createElement(gt,null)))};function Tt(t){if(d.isValidElement(t))return!0;switch(!0){case d.isValidElement(t):case typeof t=="string":case typeof t=="number":case typeof t=="boolean":case t===null:case t===void 0:case(t instanceof Object&&p(t,Symbol.iterator)):return!0}return!1}function wt(t){return Tt(t)?{element:t}:t}function Dt(t={}){let r=["location","navigationHistory","routing"];if(Object.keys(t??{}).some(a=>r.includes(a)))return t;let e={routing:{},location:{},hydrationData:void 0};if(p(t,"routePath")&&(e.location.path=t.routePath,e.routing.path=t.routePath),p(t,"routeParams")&&(e.location.pathParams=t.routeParams),p(t,"routeState")&&(e.location.state=t.routeState),p(t,"routeHandle")&&(e.routing.handle=t.routeHandle),p(t,"searchParams")&&(e.location.searchParams=t.searchParams),p(t,"browserPath")&&(e.location.path=t.browserPath),p(t,"loader")&&(e.routing.loader=t.loader),p(t,"action")&&(e.routing.action=t.action),p(t,"errorElement")&&(e.routing.errorElement=t.errorElement),p(t,"hydrationData")&&(e.hydrationData=t.hydrationData),p(t,"shouldRevalidate")&&(e.routing.shouldRevalidate=t.shouldRevalidate),p(t,"routeId")&&(e.routing.id=t.routeId),p(t,"outlet")){let a=wt(t.outlet);a.path??(a.path=""),e.routing.children=[a]}return e.routing.useStoryElement=!0,e}var Rt=rt({name:"withRouter",parameterName:at,wrapper:(t,r,{parameters:e})=>{let a=Dt(e);return d.createElement(Ot,{renderStory:t,storyContext:r,addonParameters:a})}});const Mt={title:"pages/IkkeKvinne",component:N,decorators:[Rt]},_t=()=>B.jsx(N,{}),g=_t.bind({});var C,L,b;g.parameters={...g.parameters,docs:{...(C=g.parameters)==null?void 0:C.docs,source:{originalSource:`() => {
  return <IkkeKvinne />;
}`,...(b=(L=g.parameters)==null?void 0:L.docs)==null?void 0:b.source}}};const Ut=["Default"];export{g as Default,Ut as __namedExportsOrder,Mt as default};
