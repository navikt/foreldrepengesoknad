import{k as p,j as s}from"./iframe-BCrCQR0v.js";import{h as a,H as n}from"./index-8OhhmJkJ.js";import{A as o}from"./queries-z88tTpn9.js";import{O as t}from"./Oppgaver-usMrH0ca.js";import{M as i}from"./chunk-TMI4QPZX-BwnSm7gM.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-DM-c5BKR.js";import"./ContentSection-DEf0MvGQ.js";import"./index-ylXTHoAf.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-B-5AY0C8.js";import"./LenkePanel-BLtxdIi9.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
