import{i as p,j as s}from"./iframe-CcBOHSS2.js";import{h as a,H as n}from"./index-CykT5Li_.js";import{A as o}from"./api-DN1waq4L.js";import{O as t}from"./Oppgaver-DgQx4QSh.js";import{M as i}from"./chunk-TMI4QPZX-CzCOg6Ei.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-DhMnrYQL.js";import"./ContentSection-CtdC4mI8.js";import"./index-BggOb6ce.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-jan2rp-9.js";import"./LenkePanel-B10YXDB2.js";import"./routes-C7yRzVAD.js";const A={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.minidialog, () => HttpResponse.json([{
        saksnr: '352011079',
        opprettet: '2023-02-09',
        dialogId: '1111111112'
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
}`,...e.parameters?.docs?.source}}};const S=["Default","FeilIMinidialogApiKall"];export{r as Default,e as FeilIMinidialogApiKall,S as __namedExportsOrder,A as default};
