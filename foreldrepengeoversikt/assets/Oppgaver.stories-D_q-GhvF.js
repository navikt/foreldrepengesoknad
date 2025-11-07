import{i as p,j as s}from"./iframe-DqM_U5bt.js";import{h as a,H as n}from"./index-YjCW9cp3.js";import{A as o}from"./queries-DpjHa_ad.js";import{O as t}from"./Oppgaver-D6T6nC8v.js";import{M as i}from"./chunk-TMI4QPZX-Cx3ZL2s4.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-CuTRAVAy.js";import"./ContentSection-CQZPSm-Z.js";import"./index-Dmxwyr-p.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-B-HfSr7v.js";import"./LenkePanel-VqwbXGaW.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
