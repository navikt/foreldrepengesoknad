import{i as p,j as s}from"./iframe-DEikezB8.js";import{h as a,H as n}from"./index-s2IJkxJA.js";import{A as o}from"./queries-Ba4s7_HK.js";import{O as t}from"./Oppgaver-DwVoXk37.js";import{M as i}from"./chunk-TMI4QPZX-DcV7Iagz.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-DUJ59zTu.js";import"./ContentSection-Br_T7T9f.js";import"./index-BQREIWzL.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-CLSSq0XW.js";import"./LenkePanel-DW53ytRN.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
