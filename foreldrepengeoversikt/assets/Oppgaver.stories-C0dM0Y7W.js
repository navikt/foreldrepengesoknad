import{i as m,j as s}from"./iframe-DKah-zWz.js";import{h as a,H as n}from"./index-CtLxs5gY.js";import{O as t}from"./Oppgaver-D5p7L1ZA.js";import{M as p}from"./chunk-UH6JLGW7-C0SsUr3E.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-BmN-cqc3.js";import"./api-emMROyLC.js";import"./ContentSection-CrRS_Kc_.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-ab-ZmDf8.js";import"./LenkePanel-DtDYYvvK.js";import"./routes-C7yRzVAD.js";const x={title:"Oppgaver",component:t,decorators:[m],render:o=>s.jsx(p,{children:s.jsx(t,{...o})})},r={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/minidialog\`, () => HttpResponse.json([{
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
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/minidialog\`, () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: {
    saksnummer: '352011079'
  }
}`,...e.parameters?.docs?.source}}};const v=["Default","FeilIMinidialogApiKall"];export{r as Default,e as FeilIMinidialogApiKall,v as __namedExportsOrder,x as default};
