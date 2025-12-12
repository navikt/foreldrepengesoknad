import{k as p,j as s}from"./iframe-MIqGeC9m.js";import{h as a,H as n}from"./index-DZOqqEyC.js";import{A as o}from"./queries-DMzMUvNU.js";import{O as t}from"./Oppgaver-B_dZhs6O.js";import{M as i}from"./chunk-WWGJGFF6-oGz4_dZK.js";import"./preload-helper-PPVm8Dsz.js";import"./useQuery-BaQizPdv.js";import"./ContentSection-b0H51EEW.js";import"./index-DPHOv5Hm.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-DA31YWdj.js";import"./LenkePanel-BJ2KmPRL.js";import"./routes-BgSQQwXh.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
