import{k as p,j as s}from"./iframe-BUAGkc_s.js";import{h as a,H as n}from"./index-ZnVRp8AG.js";import{A as o}from"./queries-BnNG6hgy.js";import{O as t}from"./Oppgaver-Cd_4xM_L.js";import{M as i}from"./chunk-WWGJGFF6-97Q76Dii.js";import"./preload-helper-PPVm8Dsz.js";import"./useQuery-EcnwYEoa.js";import"./ContentSection-BrPto2fh.js";import"./index-DImkBTwF.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-DUkVsSuv.js";import"./LenkePanel-D8hUo4-d.js";import"./routes-BgSQQwXh.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
