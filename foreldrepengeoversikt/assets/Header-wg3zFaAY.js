import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u as j}from"./useQuery-CY6KkctN.js";import{u as D}from"./index-DnmOyZDY.js";import{e as v}from"./Uttaksdagen-Bkz5oXqd.js";import"./dates-DUtd6zgH.js";import{r as i}from"./index-CTjT7uj6.js";import{h as I,s as N}from"./api-BmJ5658F.js";import{O as _}from"./routes-Run26EI7.js";import{a as H,u as A,b as P}from"./react-DKFOadDt.js";import{Y as m}from"./Ytelse-7td-ciMh.js";import{m as z,b as F,u as B,a as G,c as T}from"./sakerUtils-S3oFvgqY.js";import{B as V}from"./Breadcrumb-BpwutOGI.js";import{S as L}from"./StatusTag-MRVr4YUs.js";import{a as S,S as o}from"./HGrid-PWs16Klb.js";import{V as d,H as u}from"./VStack-CQ8vh05t.js";import{H as g,D as p}from"./Label-C_2a564_.js";import{u as y}from"./useId-BFxX0aRd.js";import{h as M}from"./index-BK5YD3Eg.js";var C=function(t,n){var s={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&n.indexOf(r)<0&&(s[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(t);a<r.length;a++)n.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(t,r[a])&&(s[r[a]]=t[r[a]]);return s};const K=i.forwardRef((t,n)=>{var{title:s,titleId:r}=t,a=C(t,["title","titleId"]);let l=y();return l=s?r||"title-"+l:void 0,i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:n,"aria-labelledby":l},a),s?i.createElement("title",{id:l},s):null,i.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M6.25 8a5.75 5.75 0 1 1 11.5 0v8a5.75 5.75 0 0 1-11.5 0zM12 3.75a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5m0 10a5.74 5.74 0 0 1-4.25-1.877v1.686l3.85 2.14 4.65-3.1v-.726A5.74 5.74 0 0 1 12 13.75m-4.25 1.525 2.447 1.359-1.974 1.316A4.2 4.2 0 0 1 7.75 16zm8.5-.874-7.111 4.741A4.25 4.25 0 0 0 16.25 16zM9.75 8a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5h-.01A.75.75 0 0 1 9.75 8m3 0a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5h-.01a.75.75 0 0 1-.75-.75",clipRule:"evenodd"}))});var Y=function(t,n){var s={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&n.indexOf(r)<0&&(s[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(t);a<r.length;a++)n.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(t,r[a])&&(s[r[a]]=t[r[a]]);return s};const W=i.forwardRef((t,n)=>{var{title:s,titleId:r}=t,a=Y(t,["title","titleId"]);let l=y();return l=s?r||"title-"+l:void 0,i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:n,"aria-labelledby":l},a),s?i.createElement("title",{id:l},s):null,i.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M12 3.75a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5M8.75 5.5a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0m-1 7.5c0-1.987 1.912-3.75 4.25-3.75s4.25 1.763 4.25 3.75v8a.75.75 0 0 1-1.5 0v-8c0-1.013-1.088-2.25-2.75-2.25S9.25 11.987 9.25 13v1.75H8.5c-.793 0-1.32.287-1.664.719-.364.454-.586 1.145-.586 2.031s.222 1.577.586 2.032c.345.431.871.718 1.664.718a.75.75 0 0 1 0 1.5c-1.207 0-2.18-.463-2.836-1.282-.636-.795-.914-1.854-.914-2.968s.278-2.173.914-2.969c.513-.64 1.222-1.064 2.086-1.217zm2.634 3.116a1.25 1.25 0 0 0-1.768 1.768l1.884 1.884 1.884-1.884a1.25 1.25 0 0 0-1.768-1.768l-.116.116z",clipRule:"evenodd"}))}),k=H(_.HOVEDSIDE),q=()=>P(k),he=t=>{const n=A(k);i.useEffect(()=>{n(t)},[n,t])},xe=t=>t===m.ENGANGSSTØNAD?"Engangsstønadsak":t===m.SVANGERSKAPSPENGER?"Svangerskapspengesak":"Din sak";function h({children:t}){const n=v("header"),s=q();return e.jsxs("div",{className:n.block,children:[e.jsx(V,{selectedRoute:s}),e.jsx("div",{className:n.element("wrapper"),children:t})]})}function f(){return e.jsx("div",{style:{height:"4px",width:"4px",borderRadius:"50%",background:"var(--a-deepblue-300)"}})}function E({ytelse:t}){const n=t===m.SVANGERSKAPSPENGER?W:K;return e.jsxs(e.Fragment,{children:[e.jsx(o,{above:"md",children:e.jsx("div",{style:{width:"60px",height:"60px",borderRadius:"50%",background:"var(--a-deepblue-100)",paddingTop:"8px",paddingLeft:"8px"},children:e.jsx(n,{fontSize:44,style:{color:"var(--a-lightblue-800)"}})})}),e.jsx(o,{below:"md",children:e.jsx("div",{style:{width:"38px",height:"38px",borderRadius:"50%",background:"var(--a-deepblue-100)",paddingTop:"8px",paddingLeft:"8px"},children:e.jsx(n,{fontSize:22,style:{color:"var(--a-lightblue-800)"}})})})]})}function Q(){return e.jsx(h,{children:e.jsxs(S,{columns:"max-content 1fr",gap:"6",align:"center",children:[e.jsx(E,{ytelse:m.FORELDREPENGER}),e.jsx(g,{level:"1",size:"large",children:"Oversikt over foreldrepengesaker"})]})})}function c(){const{saksnummer:t}=M();return e.jsxs(p,{children:["SAKSNR ",t]})}function U(){const t=e.jsx(g,{level:"1",size:"large",children:"Dokumenter"});return e.jsxs(h,{children:[e.jsx(o,{above:"md",children:e.jsxs(d,{gap:"3",children:[t,e.jsxs(u,{gap:"3",align:"center",children:[e.jsx(c,{}),e.jsx(f,{}),e.jsx(p,{textColor:"subtle",children:"Dokumenter som du, arbeidsgiver og NAV har sendt"})]})]})}),e.jsx(o,{below:"md",children:e.jsxs(d,{gap:"1",children:[t,e.jsx(c,{})]})})]})}function $(){const t=e.jsx(g,{level:"1",size:"large",children:"Last opp dokumenter"});return e.jsxs(h,{children:[e.jsx(o,{above:"md",children:e.jsxs(d,{gap:"3",children:[t,e.jsx(c,{})]})}),e.jsx(o,{below:"md",children:e.jsxs(d,{gap:"1",children:[t,e.jsx(c,{})]})})]})}function b({sak:t}){const n=D(),s=j(N()).data,r=j({...I(),select:z}).data;if(!s||!r||!t.familiehendelse)return null;const a=F(s.søker.barn??[],r),l=t?a.find(O=>O.saker.map(R=>R.saksnummer).includes(t.saksnummer)):void 0,w=B(t.familiehendelse,t.gjelderAdopsjon),x=G({barngruppering:l==null?void 0:l.barn,familiehendelsedato:T(t.familiehendelse),intl:n,antallBarn:t.ytelse===m.FORELDREPENGER?t.familiehendelse.antallBarn:0,situasjon:w});return e.jsxs(p,{textColor:"subtle",children:[x.tittel," ",x.undertittel]})}function J({sak:t}){const n=v("header");return t?e.jsx(h,{children:e.jsxs(S,{columns:"max-content 1fr",gap:"6",align:"start",children:[e.jsx(E,{ytelse:t.ytelse}),e.jsxs(d,{children:[e.jsxs(u,{gap:"6",align:"center",children:[e.jsx(g,{level:"1",size:"large",children:"Din sak"}),e.jsx(L,{sak:t,className:n.element("tag")})]}),e.jsx(o,{above:"md",children:e.jsxs(u,{gap:"3",align:"center",children:[e.jsx(p,{uppercase:!0,children:t.ytelse}),e.jsx(f,{}),e.jsx(c,{}),e.jsx(f,{}),e.jsx(b,{sak:t})]})}),e.jsx(o,{below:"md",children:e.jsxs(d,{gap:"1",children:[e.jsxs(u,{gap:"2",align:"center",children:[e.jsx(p,{uppercase:!0,children:t.ytelse}),e.jsx(f,{}),e.jsx(c,{})]}),e.jsx(b,{sak:t})]})})]})]})}):null}Q.__docgenInfo={description:"",methods:[],displayName:"ForsideHeader"};U.__docgenInfo={description:"",methods:[],displayName:"DokumenterHeader"};$.__docgenInfo={description:"",methods:[],displayName:"EttersendingHeader"};J.__docgenInfo={description:"",methods:[],displayName:"DinSakHeader",props:{sak:{required:!1,tsType:{name:"union",raw:"Foreldrepengesak | EngangsstønadSak | SvangerskapspengeSak",elements:[{name:"Foreldrepengesak"},{name:"EngangsstønadSak"},{name:"SvangerskapspengeSak"}]},description:""}}};export{J as D,$ as E,Q as F,U as a,xe as g,he as u};
