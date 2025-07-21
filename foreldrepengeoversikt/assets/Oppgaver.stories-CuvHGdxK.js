import{i as m,j as s}from"./iframe-gzxcU_QU.js";import{h as a,H as n}from"./index-C7NVZGxv.js";import{O as t}from"./Oppgaver-D37kOtcA.js";import{M as p}from"./chunk-EF7DTUVF-XdFoIY5j.js";import"./useQuery-DUc9WJSJ.js";import"./api-CnbKW-es.js";import"./ContentSection-CfkUuY22.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-CdIMqcGl.js";import"./LenkePanel-BdWPkRlF.js";import"./routes-C7yRzVAD.js";const k={title:"Oppgaver",component:t,decorators:[m],render:o=>s.jsx(p,{children:s.jsx(t,{...o})})},r={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
