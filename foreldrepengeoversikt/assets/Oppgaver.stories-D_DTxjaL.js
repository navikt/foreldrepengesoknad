import{i as m,j as s}from"./iframe-DNdFQc-E.js";import{h as a,H as n}from"./index-ZHclRefx.js";import{O as t}from"./Oppgaver-BNq_JL8r.js";import{M as p}from"./chunk-UH6JLGW7-DGACcyrF.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-DWA1I81K.js";import"./api-CntHfO5i.js";import"./ContentSection-C7byseTr.js";import"./index-C537MR6J.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-C5-HdB2b.js";import"./LenkePanel-cq28zm5d.js";import"./routes-C7yRzVAD.js";const v={title:"Oppgaver",component:t,decorators:[m],render:o=>s.jsx(p,{children:s.jsx(t,{...o})})},r={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const A=["Default","FeilIMinidialogApiKall"];export{r as Default,e as FeilIMinidialogApiKall,A as __namedExportsOrder,v as default};
