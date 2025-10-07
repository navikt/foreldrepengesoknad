import{i as p,j as s}from"./iframe-C5M49xUj.js";import{h as a,H as n}from"./index-C-tyoeRs.js";import{A as o}from"./api-BlqjErwO.js";import{O as t}from"./Oppgaver-BmVWIpTQ.js";import{M as i}from"./chunk-TMI4QPZX-Bhac6TTk.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-Ceota3XY.js";import"./ContentSection-BUlExFVN.js";import"./index-njvkGPnH.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-DJJ5_q0x.js";import"./LenkePanel-B-GMYuoR.js";import"./routes-C7yRzVAD.js";const A={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
