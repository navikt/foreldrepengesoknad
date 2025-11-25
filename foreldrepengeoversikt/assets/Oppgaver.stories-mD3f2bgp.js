import{i as p,j as s}from"./iframe-f3fTV-vU.js";import{h as a,H as n}from"./index-CDNEqUmk.js";import{A as o}from"./queries-CwGhK0Aq.js";import{O as t}from"./Oppgaver-DrsGTnXz.js";import{M as i}from"./chunk-TMI4QPZX-BeR0sFFu.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-CRgim-Nx.js";import"./ContentSection-CLA_LV6z.js";import"./index-aC8IJm-Q.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-DT6a34yg.js";import"./LenkePanel-DPrvNIwY.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
