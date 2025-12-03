import{r as E,u as x,R as p,j as e,S as h,V as m,B as o,M as i,a as f,L as j,H as S,b as N,c as w}from"./iframe-B_fNlCXT.js";import"./preload-helper-PPVm8Dsz.js";var D=function(s,t){var r={};for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&t.indexOf(n)<0&&(r[n]=s[n]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(s);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(s,n[a])&&(r[n[a]]=s[n[a]]);return r};const I=E.forwardRef((s,t)=>{var{title:r,titleId:n}=s,a=D(s,["title","titleId"]);let l=x();return l=r?n||"title-"+l:void 0,p.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:t,"aria-labelledby":l},a),r?p.createElement("title",{id:l},r):null,p.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M9.47 5.97a.75.75 0 0 1 1.06 0l5.5 5.5a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 1 1-1.06-1.06L14.44 12 9.47 7.03a.75.75 0 0 1 0-1.06",clipRule:"evenodd"}))}),v=({forsendelseStatus:s,pageTitle:t})=>e.jsx(h,{pageTitle:t,children:e.jsx(k,{forsendelseStatus:s})}),k=({forsendelseStatus:s})=>{switch(s?.status??"PENDING"){case"PENDING":return e.jsx(y,{});case"FORSENDELSE_FINNES_IKKE":case"MIDLERTIDIG":return e.jsx(G,{});case"ENDELIG":return e.jsx(T,{saksnummer:s?.saksnummer})}},y=()=>e.jsxs(m,{children:[e.jsx(g,{}),e.jsx(o,{spacing:!0,children:e.jsx(i,{id:"sakenProsesseres.info"})}),e.jsxs(o,{spacing:!0,children:[e.jsx(i,{id:"sakenProsesseres.loader"})," ",e.jsx(j,{})]})]}),G=()=>{const t=globalThis.location.hostname.includes(".dev.nav.")?"https://www.ansatt.dev.nav.no/minside":"https://www.nav.no/minside";return e.jsxs(m,{children:[e.jsx(g,{}),e.jsx(o,{children:e.jsx(i,{id:"minSide.info"})}),e.jsx(f,{as:"a",href:t,className:"mt-8 w-fit self-center",iconPosition:"right",icon:e.jsx(I,{}),children:e.jsx(i,{id:"minSide.button"})})]})},T=({saksnummer:s})=>{if(s===void 0)throw new Error("Udefinert saksnummer for status ENDELIG");const r=globalThis.location.hostname.includes(".dev.nav.")?`https://www.intern.dev.nav.no/foreldrepenger/oversikt/sak/${s}`:`https://www.nav.no/foreldrepenger/oversikt/sak/${s}`;return e.jsxs(m,{children:[e.jsx(g,{}),e.jsx(o,{spacing:!0,children:e.jsx(i,{id:"innsyn.info"})}),e.jsx(o,{spacing:!0,children:e.jsx(i,{id:"innsyn.followup"})}),e.jsx(f,{as:"a",href:r,className:"mt-4 w-fit self-center",iconPosition:"right",icon:e.jsx(I,{}),children:e.jsx(i,{id:"minSide.button"})})]})},g=()=>e.jsxs(S,{gap:"space-16",align:"center",className:"mb-6",wrap:!1,children:[e.jsx(N,{className:"text-ax-text-success-decoration self-center","aria-hidden":!0,fontSize:"2.5rem"}),e.jsx(w,{size:"large",level:"2",align:"center",children:e.jsx(i,{id:"header.title"})})]});v.__docgenInfo={description:"",methods:[],displayName:"Kvittering",props:{pageTitle:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},forsendelseStatus:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    saksnummer?: string;
    status: no_nav_foreldrepenger_soknad_innsending_StatusInnsendingTjeneste_ForsendelseStatus_Status;
}`,signature:{properties:[{key:"saksnummer",value:{name:"string",required:!1}},{key:"status",value:{name:"union",raw:`| 'PENDING'
| 'MIDLERTIDIG'
| 'ENDELIG'
| 'FORSENDELSE_FINNES_IKKE'`,elements:[{name:"literal",value:"'PENDING'"},{name:"literal",value:"'MIDLERTIDIG'"},{name:"literal",value:"'ENDELIG'"},{name:"literal",value:"'FORSENDELSE_FINNES_IKKE'"}],required:!0}}]}},description:""}}};const b={component:v},d={args:{forsendelseStatus:{status:"PENDING"},pageTitle:"Foreldrepengesøknad"}},c={args:{forsendelseStatus:{status:"MIDLERTIDIG"},pageTitle:"Foreldrepengesøknad"}},u={args:{forsendelseStatus:{status:"ENDELIG",saksnummer:"1"},pageTitle:"Foreldrepengesøknad"}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    forsendelseStatus: {
      status: 'PENDING'
    },
    pageTitle: 'Foreldrepengesøknad'
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    forsendelseStatus: {
      status: 'MIDLERTIDIG'
    },
    pageTitle: 'Foreldrepengesøknad'
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    forsendelseStatus: {
      status: 'ENDELIG',
      saksnummer: '1'
    },
    pageTitle: 'Foreldrepengesøknad'
  }
}`,...u.parameters?.docs?.source}}};const L=["VenterPåSvar","KreverGoSysHandlingGåTilMinSide","JournalførtGåTilInnsyn"];export{u as JournalførtGåTilInnsyn,c as KreverGoSysHandlingGåTilMinSide,d as VenterPåSvar,L as __namedExportsOrder,b as default};
