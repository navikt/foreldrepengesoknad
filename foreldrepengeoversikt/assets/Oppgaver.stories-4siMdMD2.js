import{i as p,j as s}from"./iframe-NzRkLCZT.js";import{h as a,H as n}from"./index-BnxWf0xd.js";import{A as o}from"./api-t8N-hJp1.js";import{O as t}from"./Oppgaver-BP3L2cM4.js";import{M as i}from"./chunk-TMI4QPZX-D1yeyGCE.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-BCik-Gz0.js";import"./ContentSection-BNwvEdEV.js";import"./index-aN7YHONY.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-C19s6_s8.js";import"./LenkePanel-CBJ5JoRI.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
