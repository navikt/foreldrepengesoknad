import{k as p,j as s}from"./iframe-BNKLDQIx.js";import{h as a,H as n}from"./index-COpQmBpi.js";import{A as o}from"./queries-DgnQYwvy.js";import{O as t}from"./Oppgaver-DhQ2VFGf.js";import{M as i}from"./chunk-4WY6JWTD-3YC1soPf.js";import"./preload-helper-PPVm8Dsz.js";import"./useQuery-BJvq-Jy8.js";import"./ContentSection-DM-zRf-J.js";import"./index-T1TWLa-o.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-DXF7v2Eu.js";import"./LenkePanel-8Nn6b35c.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
