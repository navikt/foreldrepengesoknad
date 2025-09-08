import{i as m,j as s}from"./iframe-DqYsnEnB.js";import{h as a,H as n}from"./index-md76Z-Y7.js";import{O as t}from"./Oppgaver-QIqeoIt1.js";import{M as p}from"./chunk-UH6JLGW7-By06e2eO.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-B_E6v8l_.js";import"./api-B2G0MWey.js";import"./ContentSection-DP-YOFoP.js";import"./index-CyoqsWOn.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-w_JnV8dH.js";import"./LenkePanel-DIzA5O_F.js";import"./routes-C7yRzVAD.js";const v={title:"Oppgaver",component:t,decorators:[m],render:o=>s.jsx(p,{children:s.jsx(t,{...o})})},r={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
