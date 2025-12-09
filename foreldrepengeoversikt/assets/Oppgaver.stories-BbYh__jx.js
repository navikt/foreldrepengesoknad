import{k as p,j as s}from"./iframe-OuPw_AAl.js";import{h as a,H as n}from"./index-Cd1vQHFu.js";import{A as o}from"./queries-B7Mavn8A.js";import{O as t}from"./Oppgaver-DIubtAy7.js";import{M as i}from"./chunk-4WY6JWTD-BgqL89ER.js";import"./preload-helper-PPVm8Dsz.js";import"./useQuery-BUf2RA8B.js";import"./ContentSection-DSRSQjhE.js";import"./index-D9NB9_BP.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-A_ieajZH.js";import"./LenkePanel-B7jTEsTn.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[p],render:m=>s.jsx(i,{children:s.jsx(t,{...m})})},r={parameters:{msw:{handlers:[a.get(o.minidialog,()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(o.minidialog,()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
