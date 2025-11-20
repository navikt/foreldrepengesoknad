import{i as p,j as s}from"./iframe-LqrhR6Qg.js";import{h as a,H as n}from"./index-CC4eufGu.js";import{A as o}from"./queries-JCy8o_so.js";import{O as t}from"./Oppgaver-DuJ_JGzQ.js";import{M as i}from"./chunk-TMI4QPZX-Cd80xl5A.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-B-30Pv-7.js";import"./ContentSection-EvLkA6DA.js";import"./index-BObBxIP_.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-B87cAyTI.js";import"./LenkePanel-Cm5L8OsM.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
