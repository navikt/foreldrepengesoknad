import{k as p,j as s}from"./iframe-BArIh7qa.js";import{h as a,H as n}from"./index-CN92oAGH.js";import{A as o}from"./queries-CgcoKwqP.js";import{O as t}from"./Oppgaver-Cw_qq0Dx.js";import{M as i}from"./chunk-4WY6JWTD-CV3nTsTi.js";import"./preload-helper-PPVm8Dsz.js";import"./useQuery-D6egnEB8.js";import"./ContentSection-D86s2jay.js";import"./index-CW-B1w6u.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-DPQ-KnLA.js";import"./LenkePanel-By5czw1w.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
