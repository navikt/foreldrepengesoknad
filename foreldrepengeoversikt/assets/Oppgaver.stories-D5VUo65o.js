import{k as p,j as s}from"./iframe-C0aYCwxQ.js";import{h as a,H as n}from"./index-z12xrPHv.js";import{A as o}from"./queries-Bwobjia3.js";import{O as t}from"./Oppgaver-D2WdLJUz.js";import{M as i}from"./chunk-TMI4QPZX-CMFQeyIP.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-COq4C8h2.js";import"./ContentSection-CstgAsUG.js";import"./index-A1dX0y8K.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-B5BCCaMO.js";import"./LenkePanel-DTk2ip2K.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.minidialog, () => HttpResponse.json([{
        saksnr: '352011079',
        opprettet: '2023-02-09'
      }]))]
    }
  },
  args: {
    saksnummer: '352011079'
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.minidialog, () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: {
    saksnummer: '352011079'
  }
}`,...e.parameters?.docs?.source}}};const S=["Default","FeilIMinidialogApiKall"];export{r as Default,e as FeilIMinidialogApiKall,S as __namedExportsOrder,I as default};
