import{i as p,j as s}from"./iframe-CqGsn30k.js";import{h as a,H as n}from"./index-CjbZbzR5.js";import{A as o}from"./api-DSgWObfO.js";import{O as t}from"./Oppgaver-IqwX1LMF.js";import{M as i}from"./chunk-TMI4QPZX-CIxvWd8a.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-BR6BDEnN.js";import"./ContentSection-CyEp7QCM.js";import"./index-CdagP5ro.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-jcaJH7zX.js";import"./LenkePanel-CXLEbZwq.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
