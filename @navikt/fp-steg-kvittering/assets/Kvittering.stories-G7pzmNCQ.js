import{r as x,u as h,R as m,j as e,S as j,V as p,B as o,M as i,a as f,L as E,H as w,b as D,c as S}from"./iframe-yvuFNHND.js";import"./preload-helper-D9Z9MdNV.js";var G=function(s,t){var n={};for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&t.indexOf(r)<0&&(n[r]=s[r]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(s);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(s,r[a])&&(n[r[a]]=s[r[a]]);return n};const I=x.forwardRef((s,t)=>{var{title:n,titleId:r}=s,a=G(s,["title","titleId"]);let l=h();return l=n?r||"title-"+l:void 0,m.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:t,"aria-labelledby":l},a),n?m.createElement("title",{id:l},n):null,m.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M9.47 5.97a.75.75 0 0 1 1.06 0l5.5 5.5a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 1 1-1.06-1.06L14.44 12 9.47 7.03a.75.75 0 0 1 0-1.06",clipRule:"evenodd"}))}),v=({forsendelseStatus:s,pageTitle:t})=>e.jsx(j,{pageTitle:t,children:e.jsx(N,{forsendelseStatus:s})}),N=({forsendelseStatus:s})=>{switch(s?.status??"PENDING"){case"PENDING":return e.jsx(k,{});case"MIDLERTIDIG":return e.jsx(y,{});case"ENDELIG":return e.jsx(T,{saksnummer:s?.saksnummer})}},k=()=>e.jsxs(p,{children:[e.jsx(g,{}),e.jsx(o,{spacing:!0,children:e.jsx(i,{id:"sakenProsesseres.info"})}),e.jsxs(o,{spacing:!0,children:[e.jsx(i,{id:"sakenProsesseres.loader"})," ",e.jsx(E,{})]})]}),y=()=>{const t=globalThis.location.hostname.includes(".dev.nav.")?"https://www.ansatt.dev.nav.no/minside":"https://www.nav.no/minside";return e.jsxs(p,{children:[e.jsx(g,{}),e.jsx(o,{children:e.jsx(i,{id:"minSide.info"})}),e.jsx(f,{as:"a",href:t,className:"mt-8 w-fit self-center",iconPosition:"right",icon:e.jsx(I,{}),children:e.jsx(i,{id:"minSide.button"})})]})},T=({saksnummer:s})=>{if(s===void 0)throw new Error("Udefinert saksnummer for status ENDELIG");const n=globalThis.location.hostname.includes(".dev.nav.")?`https://www.intern.dev.nav.no/foreldrepenger/oversikt/sak/${s}`:`https://www.nav.no/foreldrepenger/oversikt/sak/${s}`;return e.jsxs(p,{children:[e.jsx(g,{}),e.jsx(o,{spacing:!0,children:e.jsx(i,{id:"innsyn.info"})}),e.jsx(o,{spacing:!0,children:e.jsx(i,{id:"innsyn.followup"})}),e.jsx(f,{as:"a",href:n,className:"mt-4 w-fit self-center",iconPosition:"right",icon:e.jsx(I,{}),children:e.jsx(i,{id:"minSide.button"})})]})},g=()=>e.jsxs(w,{gap:"space-16",align:"center",className:"mb-6",wrap:!1,children:[e.jsx(D,{className:"text-ax-text-success-decoration self-center","aria-hidden":!0,fontSize:"2.5rem"}),e.jsx(S,{size:"large",level:"2",align:"center",children:e.jsx(i,{id:"header.title"})})]});v.__docgenInfo={description:"",methods:[],displayName:"Kvittering",props:{pageTitle:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},forsendelseStatus:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    status: 'PENDING' | 'MIDLERTIDIG' | 'ENDELIG';
    saksnummer?: number;
}`,signature:{properties:[{key:"status",value:{name:"union",raw:"'PENDING' | 'MIDLERTIDIG' | 'ENDELIG'",elements:[{name:"literal",value:"'PENDING'"},{name:"literal",value:"'MIDLERTIDIG'"},{name:"literal",value:"'ENDELIG'"}],required:!0}},{key:"saksnummer",value:{name:"number",required:!1}}]}},description:""}}};const L={component:v},d={args:{forsendelseStatus:{status:"PENDING"},pageTitle:"Foreldrepengesøknad"}},c={args:{forsendelseStatus:{status:"MIDLERTIDIG"},pageTitle:"Foreldrepengesøknad"}},u={args:{forsendelseStatus:{status:"ENDELIG",saksnummer:1},pageTitle:"Foreldrepengesøknad"}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
      saksnummer: 1
    },
    pageTitle: 'Foreldrepengesøknad'
  }
}`,...u.parameters?.docs?.source}}};const P=["VenterPåSvar","KreverGoSysHandlingGåTilMinSide","JournalførtGåTilInnsyn"];export{u as JournalførtGåTilInnsyn,c as KreverGoSysHandlingGåTilMinSide,d as VenterPåSvar,P as __namedExportsOrder,L as default};
