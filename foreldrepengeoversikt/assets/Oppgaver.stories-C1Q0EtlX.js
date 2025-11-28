import{k as p,j as s}from"./iframe-CkO2BxIM.js";import{h as a,H as n}from"./index-lXDJA5cK.js";import{A as o}from"./queries-CBn9MapI.js";import{O as t}from"./Oppgaver-Dwq7raX8.js";import{M as i}from"./chunk-TMI4QPZX-BG7iv1IQ.js";import"./preload-helper-PPVm8Dsz.js";import"./useQuery-BkCXl_YK.js";import"./ContentSection-BXrBK2H7.js";import"./index-B5VWAz0p.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-CegIj_4c.js";import"./LenkePanel-D_Y1KnD1.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
