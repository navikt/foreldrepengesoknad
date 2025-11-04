import{i as p,j as s}from"./iframe--J04DPMt.js";import{h as a,H as n}from"./index-DJDxggZT.js";import{A as o}from"./api-xVu1VUT_.js";import{O as t}from"./Oppgaver-CbJA5qQJ.js";import{M as i}from"./chunk-TMI4QPZX-DV9fWWim.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-DfKN96Pn.js";import"./ContentSection-Bbsj9DDi.js";import"./index-DqULXsdl.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-BEI7tlUr.js";import"./LenkePanel-CR3wyz2S.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
