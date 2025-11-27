import{k as p,j as s}from"./iframe-D-IIqIcL.js";import{h as a,H as n}from"./index-zOoilbs6.js";import{A as o}from"./queries-Cajj6Nwa.js";import{O as t}from"./Oppgaver-E98E2J3a.js";import{M as i}from"./chunk-TMI4QPZX-DF4FCatt.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-Djwu3wOy.js";import"./ContentSection-NOVaN-hN.js";import"./index-BUxBNmh0.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-Cj7sAeuP.js";import"./LenkePanel-w8hJgSVZ.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
