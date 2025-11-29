import{k as p,j as s}from"./iframe-B9HSP4qp.js";import{h as a,H as n}from"./index-9iwXPaj4.js";import{A as o}from"./queries-DSExmaaY.js";import{O as t}from"./Oppgaver-DXsxeApa.js";import{M as i}from"./chunk-TMI4QPZX-DtADhXcR.js";import"./preload-helper-PPVm8Dsz.js";import"./useQuery-D9LfzJmJ.js";import"./ContentSection-CdlJxfAi.js";import"./index-muUyurbi.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-CygVlwqD.js";import"./LenkePanel-CqhZs_xM.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
