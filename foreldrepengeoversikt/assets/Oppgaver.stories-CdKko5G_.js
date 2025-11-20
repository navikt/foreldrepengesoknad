import{i as p,j as s}from"./iframe-B5QC8AIG.js";import{h as a,H as n}from"./index-znonygE-.js";import{A as o}from"./queries-C0fZPw1r.js";import{O as t}from"./Oppgaver-DaC-WACc.js";import{M as i}from"./chunk-TMI4QPZX-BccTKEIM.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-DWPWvH2v.js";import"./ContentSection-B1Mc35LK.js";import"./index-DiehcI6P.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-BDp1n_it.js";import"./LenkePanel-DiDvRI_I.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
