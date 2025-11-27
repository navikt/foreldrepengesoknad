import{k as p,j as s}from"./iframe-hE7ZueP_.js";import{h as a,H as n}from"./index-9WkplJto.js";import{A as o}from"./queries-DZZ2G4UG.js";import{O as t}from"./Oppgaver-BlNHy49d.js";import{M as i}from"./chunk-TMI4QPZX-BIhfeY9W.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-B78uqvSY.js";import"./ContentSection-CR12qQuR.js";import"./index-C3ly5VTD.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-B24nEYiV.js";import"./LenkePanel-BzJW49e_.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
