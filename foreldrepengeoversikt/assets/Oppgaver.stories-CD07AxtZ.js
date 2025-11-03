import{i as p,j as s}from"./iframe-DeMdVyFz.js";import{h as a,H as n}from"./index-DFxF8LTV.js";import{A as o}from"./api-CTIc8dU1.js";import{O as t}from"./Oppgaver-DZeFTbxQ.js";import{M as i}from"./chunk-TMI4QPZX-B8o3QBJc.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-BVsQ5Qo4.js";import"./ContentSection-Bzb957AZ.js";import"./index-p-IrSs3w.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-DaqFCHHM.js";import"./LenkePanel-9SRWpbrR.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
