import{k as p,j as s}from"./iframe-GMCrZPMT.js";import{h as a,H as n}from"./index-DlA5Dgwv.js";import{A as o}from"./queries-D7hysrC7.js";import{O as t}from"./Oppgaver-wbXDS51Z.js";import{M as i}from"./chunk-4WY6JWTD-B9rjn__f.js";import"./preload-helper-PPVm8Dsz.js";import"./useQuery-BiY6XMdz.js";import"./ContentSection-Z-GBennl.js";import"./index-BO5Y3oSX.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-CvzCp6bM.js";import"./LenkePanel-rGKf6Mfz.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
