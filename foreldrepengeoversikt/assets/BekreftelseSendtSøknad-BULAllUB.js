import{c as g,o as P,B as H,u as V,a as T,H as I,d as p,j as l,b as $,L as S,e as D,D as G,f as O,V as b,l as B,g as U,h,i as z}from"./Link-BXtfYcX3.js";import{r as i,R as s}from"./index-DVXBtNgz.js";import{u as K,S as M,Y as v}from"./Ytelse-EyGWGCcM.js";const x=i.createContext({headingSize:"small",size:"medium",openItems:[],mounted:!1});var L=function(e,o){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&o.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)o.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(t[n[r]]=e[n[r]]);return t};const y=i.createContext(null),Z=i.forwardRef((e,o)=>{var{children:t,className:n,open:r,defaultOpen:a=!1,onOpenChange:d}=e,c=L(e,["children","className","open","defaultOpen","onOpenChange"]);const[m,A]=K({defaultValue:a,value:r,onChange:d}),f=i.useContext(x),E=i.useRef(!(r||a)),R=()=>{A(C=>!C),E.current=!0};return f!=null&&f.mounted||console.error("<Accordion.Item> has to be used within an <Accordion>"),s.createElement("div",Object.assign({className:g("navds-accordion__item",n,{"navds-accordion__item--open":m,"navds-accordion__item--neutral":(f==null?void 0:f.variant)==="neutral","navds-accordion__item--no-animation":!E.current}),ref:o},P(c,["onClick"])),s.createElement(y.Provider,{value:{open:m,toggleOpen:R}},t))});var F=function(e,o){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&o.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)o.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(t[n[r]]=e[n[r]]);return t};const Y=i.forwardRef((e,o)=>{var{children:t,className:n}=e,r=F(e,["children","className"]);const a=i.useContext(y);return a===null?(console.error("<Accordion.Content> has to be used within an <Accordion.Item>"),null):s.createElement(H,Object.assign({},r,{as:"div",ref:o,className:g("navds-accordion__content",{"navds-accordion__content--closed":!a.open},n),"aria-hidden":!a.open||void 0}),t)});var q=function(e,o){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&o.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)o.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(t[n[r]]=e[n[r]]);return t};const J=i.forwardRef((e,o)=>{var{title:t,titleId:n}=e,r=q(e,["title","titleId"]);let a=V();return a=t?n||"title-"+a:void 0,i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:o,"aria-labelledby":a},r),t?i.createElement("title",{id:a},t):null,i.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M18.998 6.94a.75.75 0 0 1 .063 1.058l-8 9a.75.75 0 0 1-1.091.032l-5-5a.75.75 0 1 1 1.06-1.06l4.438 4.437 7.471-8.405A.75.75 0 0 1 19 6.939",clipRule:"evenodd"}))});var Q=function(e,o){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&o.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)o.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(t[n[r]]=e[n[r]]);return t};const W=i.forwardRef((e,o)=>{var t,{children:n,className:r,onClick:a}=e,d=Q(e,["children","className","onClick"]);const c=i.useContext(y),m=i.useContext(x);return c===null?(console.error("<Accordion.Header> has to be used within an <Accordion.Item>, which in turn must be within an <Accordion>"),null):s.createElement("button",Object.assign({ref:o},d,{className:g("navds-accordion__header",r),onClick:T(a,c.toggleOpen),"aria-expanded":c.open,type:"button"}),s.createElement("span",{className:"navds-accordion__icon-wrapper"},s.createElement(M,{className:"navds-accordion__header-chevron",title:"Vis mer","aria-hidden":!0})),s.createElement(I,{size:(t=m==null?void 0:m.headingSize)!==null&&t!==void 0?t:"small",as:"span",className:"navds-accordion__header-content"},n))});var X=function(e,o){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&o.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)o.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(t[n[r]]=e[n[r]]);return t};const u=i.forwardRef((e,o)=>{var{className:t,variant:n="default",headingSize:r="small",size:a="medium",indent:d=!0}=e,c=X(e,["className","variant","headingSize","size","indent"]);return s.createElement(x.Provider,{value:{variant:n,headingSize:r,size:a,mounted:!0}},s.createElement("div",Object.assign({},c,{className:g("navds-accordion",t,`navds-accordion--${a}`,{"navds-accordion--indent":d}),ref:o})))});u.Header=W;u.Content=Y;u.Item=Z;let _=0;function ee(e){const[o,t]=i.useState(e),n=e||o;return i.useEffect(()=>{o==null&&(_+=1,t(`aksel-icon-${_}`))},[o]),n}const j=s.useId;function ne(e){var o;return j!==void 0?j().replace(/(:)/g,""):(o=ee(e))!==null&&o!==void 0?o:""}var te=function(e,o){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&o.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)o.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(t[n[r]]=e[n[r]]);return t};const re=i.forwardRef((e,o)=>{var{title:t,titleId:n}=e,r=te(e,["title","titleId"]);let a=ne();return a=t?n||"title-"+a:void 0,i.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:o,"aria-labelledby":a},r),t?i.createElement("title",{id:a},t):null,i.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"m14 0 7 7v17H3V0h11Zm-2 2H5v20h14V8h-7V2Zm3 15v2H7v-2h8Zm2-4v2H7v-2h10Zm-4-4v2H7V9h6Zm1-6.17V6l3.17-.001L14 2.83Z",fill:"currentColor"}))});var oe=(e=>(e.INNGÅENDE_DOKUMENT="INNGÅENDE_DOKUMENT",e.UTGÅENDE_DOKUMENT="UTGÅENDE_DOKUMENT",e.ARBEIDSGIVER="ARBEIDSGIVER",e))(oe||{});const me=e=>{const o={};return e.forEach(t=>{const n=p(t.mottatt).format();o[n]?o[n].push(t):o[n]=[t]}),o},ae=e=>e.url?e.url:`/rest/dokument/hent-dokument/${e.journalpostId}/${e.dokumentId}`,w=({dokument:e,visesITidslinjen:o})=>{const t=D("dokument-hendelse"),{tittel:n}=e,r=ae(e);return l.jsxs("li",{className:$(`${t.block} ${o?t.modifier("medium"):t.modifier("large")}`),children:[l.jsx(re,{className:t.element("ikon"),"aria-hidden":!0}),l.jsx(S,{href:r,className:t.element("ikon"),target:"_blank",children:n})]})};w.__docgenInfo={description:"",methods:[],displayName:"DokumentHendelse"};const le=e=>e===v.ENGANGSSTØNAD?"KONTONUMMER FOR UTBETALING":"KONTONUMMER",ie=(e,o)=>e?e&&o===v.ENGANGSSTØNAD?"NAV vil utbetale engangsstønaden til dette kontonummeret, hvis søknaden blir innvilget. Hvis kontonummeret er feil kan du endre det.":e&&o===v.FORELDREPENGER?"NAV vil utbetale foreldrepengene til dette kontonummeret, hvis søknaden blir innvilget. Hvis kontonummeret er feil kan du endre det.":e&&o===v.SVANGERSKAPSPENGER?"NAV vil utbetale svangerskapspengene til dette kontonummeret, hvis søknaden blir innvilget. Hvis kontonummeret er feil kan du endre det.":"NAV vil utbetale til dette kontonummeret, hvis søknaden blir innvilget. Hvis kontonummeret er feil kan du endre det.":"Hvis søknaden din blir innvilget, må du ha kontonummer registrert for å motta utbetaling fra NAV.",N=({bankkonto:e,ytelse:o})=>{const t=!!(e!=null&&e.kontonummer)&&(e==null?void 0:e.kontonummer.trim().length)>0,n=le(o),r=t?e==null?void 0:e.kontonummer:"Du har ikke kontonummer registrert hos NAV. ",a=ie(t,o),d=t?"Endre kontonummer":"Registrer kontonummer";return l.jsx(u,{children:l.jsxs(u.Item,{title:n,children:[l.jsxs(u.Header,{children:[l.jsx(G,{children:n}),l.jsx(O,{children:r})]}),l.jsx(u.Content,{children:l.jsxs(b,{gap:"7",children:[l.jsx(O,{children:a}),l.jsx(S,{href:B.brukerprofil,children:d})]})})]})})};N.__docgenInfo={description:"",methods:[],displayName:"KontonummerInfo"};const se=e=>{if(e)return e&&p(e).isSame(p(),"d")?`Sendt i dag kl. ${h(e)}`:e&&p(e).isSame(p().subtract(1,"d"),"d")?`Sendt i går kl. ${h(e)}`:`Sendt ${z(e)} kl. ${h(e)}`},k=({relevantNyTidslinjehendelse:e,bankkonto:o,ytelse:t})=>{const n=e!=null&&e.dokumenter?e.dokumenter.find(d=>d.tittel.includes("Søknad")):void 0,r=e?e.opprettet:void 0,a=se(r);return l.jsxs(b,{gap:"6",style:{padding:"var(--a-spacing-6)",background:"white",borderRadius:"8px",boxShadow:"var(--a-shadow-xsmall)"},children:[l.jsxs(U,{gap:"4",children:[l.jsx("div",{style:{width:"52px",height:"52px",borderRadius:"50%",background:"var(--a-green-100)",paddingTop:"14px",paddingLeft:"14px"},children:l.jsx(J,{fontSize:24,style:{color:"var(--a-green-800)"},"aria-hidden":!0})}),l.jsxs(b,{children:[l.jsx(I,{level:"2",size:"small",children:"Søknaden din er sendt!"}),a&&l.jsx(O,{textColor:"subtle",children:a})]})]}),n&&l.jsx("ul",{style:{padding:0,margin:0},children:l.jsx(w,{dokument:n,visesITidslinjen:!1},n.url)}),l.jsx(N,{ytelse:t,bankkonto:o})]})},fe=k;k.__docgenInfo={description:"",methods:[],displayName:"BekreftelseSendtSøknad"};export{u as A,fe as B,oe as D,re as S,w as a,me as g,ae as l,ne as u};
