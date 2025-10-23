import{r as u,k as p,l as d,j as r,H as c,m as g}from"./iframe-B9B24InY.js";import{g as k}from"./guid-CsArkN6i.js";import{D as E}from"./Dokument-D7ErYQcP.js";import{A as i}from"./Accordion-ClEbAVNQ.js";import"./preload-helper-D9Z9MdNV.js";import"./dokumenterUtils-B2p0j5Z9.js";import"./api-CSP2sNTp.js";import"./Tag-DMXbAgRR.js";var D=function(e,o){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)o.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(a[t[n]]=e[t[n]]);return a};const I=u.forwardRef((e,o)=>{var{title:a,titleId:t}=e,n=D(e,["title","titleId"]);let s=p();return s=a?t||"title-"+s:void 0,d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:o,"aria-labelledby":s},n),a?d.createElement("title",{id:s},a):null,d.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4 5.75a.25.25 0 0 0-.25.25v12.25h16.5v-9.5H11a.75.75 0 0 1-.75-.75V6a.25.25 0 0 0-.25-.25zM2.25 6c0-.966.784-1.75 1.75-1.75h6c.966 0 1.75.784 1.75 1.75v1.25h8.75c.69 0 1.25.56 1.25 1.25v10c0 .69-.56 1.25-1.25 1.25h-17c-.69 0-1.25-.56-1.25-1.25z",clipRule:"evenodd"}))}),m=({dokumenter:e})=>r.jsx(i,{children:r.jsxs(i.Item,{children:[r.jsx(i.Header,{className:"flex-row-reverse rounded-none p-4 pt-4",style:{boxShadow:"inset 0 -2px 0 0 rgb(7 26 54 / 21%)"},children:r.jsxs(c,{gap:"space-16",children:[r.jsx(I,{"aria-hidden":!0}),r.jsxs(g,{children:[e.length," dokumenter"]})]})}),r.jsx(i.Content,{className:"ml-12 p-0",children:e.map(o=>r.jsx(E,{dokument:o},k()))})]})});m.__docgenInfo={description:"",methods:[],displayName:"GrupperteDokumenter",props:{dokumenter:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    tittel?: string;
    type: DokumentKategori;
    saksnummer?: string;
    journalpostId?: string;
    dokumentId?: string;
    mottatt: string;
}`,signature:{properties:[{key:"tittel",value:{name:"string",required:!1}},{key:"type",value:{name:"union",raw:"'INNGÅENDE_DOKUMENT' | 'UTGÅENDE_DOKUMENT'",elements:[{name:"literal",value:"'INNGÅENDE_DOKUMENT'"},{name:"literal",value:"'UTGÅENDE_DOKUMENT'"}],required:!0}},{key:"saksnummer",value:{name:"string",required:!1}},{key:"journalpostId",value:{name:"string",required:!1}},{key:"dokumentId",value:{name:"string",required:!1}},{key:"mottatt",value:{name:"string",required:!0}}]}}],raw:"DokumentDto[]"},description:""}}};const T={title:"GrupperteDokumenter",component:m},l={args:{dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:new Date().toISOString(),saksnummer:"124324",tittel:"Tittel arbeidsgiver",journalpostId:"2",dokumentId:"3"},{type:"INNGÅENDE_DOKUMENT",mottatt:new Date().toISOString(),saksnummer:"124",tittel:"Tittel på inngåande dok",journalpostId:"4",dokumentId:"6"},{type:"UTGÅENDE_DOKUMENT",mottatt:new Date().toISOString(),saksnummer:"124",tittel:"Tittel på utgående dok",journalpostId:"5",dokumentId:"6"}]}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    dokumenter: [{
      type: 'INNGÅENDE_DOKUMENT',
      mottatt: new Date().toISOString(),
      saksnummer: '124324',
      tittel: 'Tittel arbeidsgiver',
      journalpostId: '2',
      dokumentId: '3'
    }, {
      type: 'INNGÅENDE_DOKUMENT',
      mottatt: new Date().toISOString(),
      saksnummer: '124',
      tittel: 'Tittel på inngåande dok',
      journalpostId: '4',
      dokumentId: '6'
    }, {
      type: 'UTGÅENDE_DOKUMENT',
      mottatt: new Date().toISOString(),
      saksnummer: '124',
      tittel: 'Tittel på utgående dok',
      journalpostId: '5',
      dokumentId: '6'
    }]
  }
}`,...l.parameters?.docs?.source}}};const x=["Default"];export{l as Default,x as __namedExportsOrder,T as default};
