import{i as m,j as s}from"./iframe-B32evDWZ.js";import{h as a,H as n}from"./index-oJ7eYyfF.js";import{O as t}from"./Oppgaver-CZdVD1l1.js";import{M as p}from"./chunk-EF7DTUVF-BctMXm57.js";import"./useQuery-0uLNDPpC.js";import"./api-DNiL4QzO.js";import"./ContentSection-4miCLrdt.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-BkyzSr8b.js";import"./LenkePanel-CfvBl2hc.js";import"./routes-C7yRzVAD.js";const k={title:"Oppgaver",component:t,decorators:[m],render:o=>s.jsx(p,{children:s.jsx(t,{...o})})},r={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
