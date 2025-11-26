import{k as p,j as s}from"./iframe-DuhryXB5.js";import{h as a,H as n}from"./index-1iRR1hjy.js";import{A as o}from"./queries-jnzJCUH9.js";import{O as t}from"./Oppgaver-DixEI_13.js";import{M as i}from"./chunk-TMI4QPZX-BNZOtkI1.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-CdMUro0u.js";import"./ContentSection-DF3Cj_t6.js";import"./index-BEUcUsCt.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-CKvqYR2o.js";import"./LenkePanel-BeY6zeXP.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
