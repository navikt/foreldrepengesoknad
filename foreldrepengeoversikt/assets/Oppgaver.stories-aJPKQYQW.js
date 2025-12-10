import{k as p,j as s}from"./iframe-CW6M0nGA.js";import{h as a,H as n}from"./index-duR-1gme.js";import{A as o}from"./queries-L2qXoV6o.js";import{O as t}from"./Oppgaver-WJ0A7r7t.js";import{M as i}from"./chunk-4WY6JWTD-TVRJbD7a.js";import"./preload-helper-PPVm8Dsz.js";import"./useQuery-DdR1GfKI.js";import"./ContentSection-wlkxUvZa.js";import"./index-BIgVRAxi.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-D7cMRSuh.js";import"./LenkePanel-Cw4o44YE.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
