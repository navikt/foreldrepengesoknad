import{i as m,j as s}from"./iframe-CxGRv-N3.js";import{h as a,H as n}from"./index-B0oCnPCV.js";import{O as t}from"./Oppgaver-CBI2xTOI.js";import{M as p}from"./chunk-EF7DTUVF-B0d3na9A.js";import"./useQuery-DLEKfLGm.js";import"./api-JhJO7PB7.js";import"./ContentSection-CxIC10mD.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-myPvJR07.js";import"./LenkePanel-BRXTBAGN.js";import"./routes-C7yRzVAD.js";const k={title:"Oppgaver",component:t,decorators:[m],render:o=>s.jsx(p,{children:s.jsx(t,{...o})})},r={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const x=["Default","FeilIMinidialogApiKall"];export{r as Default,e as FeilIMinidialogApiKall,x as __namedExportsOrder,k as default};
