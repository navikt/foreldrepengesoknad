import{i as m,j as s}from"./iframe-BCkgP-XL.js";import{h as a,H as n}from"./index-CuDauSKi.js";import{O as t}from"./Oppgaver-BsM4G0oU.js";import{M as p}from"./chunk-TMI4QPZX-B8E1VFW_.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-DPA_JJ-q.js";import"./api-CZfqxYUM.js";import"./ContentSection-BWu4S38o.js";import"./index-DL8ND0GX.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-BIGp1PTQ.js";import"./LenkePanel-BaQa0Y93.js";import"./routes-C7yRzVAD.js";const v={title:"Oppgaver",component:t,decorators:[m],render:o=>s.jsx(p,{children:s.jsx(t,{...o})})},r={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
