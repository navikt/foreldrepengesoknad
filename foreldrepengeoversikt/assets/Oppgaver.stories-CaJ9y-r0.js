import{k as p,j as s}from"./iframe-Dpp7yu4e.js";import{h as a,H as n}from"./index-C-k-IzMo.js";import{A as o}from"./queries-h-vcByZy.js";import{O as t}from"./Oppgaver-D-aomRJ7.js";import{M as i}from"./chunk-WWGJGFF6-GowFewAn.js";import"./preload-helper-PPVm8Dsz.js";import"./useQuery-Cr_wKRw3.js";import"./ContentSection-BO7AR2Ma.js";import"./index-DGbpVQ_4.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-BZ8dZQzi.js";import"./LenkePanel-CJ5RmB7s.js";import"./routes-BgSQQwXh.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
