import{i as p,j as s}from"./iframe-kkEBcNhm.js";import{h as a,H as n}from"./index-BXVvQb7A.js";import{A as o}from"./api-DStfYi14.js";import{O as t}from"./Oppgaver-BUMpHl4e.js";import{M as i}from"./chunk-TMI4QPZX-DSSrEgXf.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-B5JMQPAu.js";import"./ContentSection-GDztL_IR.js";import"./index-CUAawcoM.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-Bgd1Rw7O.js";import"./LenkePanel-Bg9fCSzg.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
