import{i as m,j as s}from"./iframe-CE7hT7if.js";import{h as a,H as n}from"./index-CXM0r17l.js";import{O as t}from"./Oppgaver-CgKvn-H-.js";import{M as p}from"./chunk-UH6JLGW7-CT9tgwxt.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-DAe-6ieI.js";import"./api-CW_KiZht.js";import"./ContentSection-C_YnPEM2.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-Bfw2-Tdy.js";import"./LenkePanel-DEXz5_mQ.js";import"./routes-C7yRzVAD.js";const x={title:"Oppgaver",component:t,decorators:[m],render:o=>s.jsx(p,{children:s.jsx(t,{...o})})},r={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
