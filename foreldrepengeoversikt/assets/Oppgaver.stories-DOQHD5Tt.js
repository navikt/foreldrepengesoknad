import{i as m,j as s}from"./iframe-yTRVePst.js";import{h as a,H as n}from"./index-DJdXn63g.js";import{O as t}from"./Oppgaver-CDq0Ec1c.js";import{M as p}from"./chunk-UH6JLGW7-3u7wKqrD.js";import"./preload-helper-D9Z9MdNV.js";import"./useQuery-CGulWCmg.js";import"./api-b5kd2-zq.js";import"./ContentSection-BaPv9zoK.js";import"./index-DDFosqS1.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-DPDMWAyN.js";import"./LenkePanel-DCn2IWeY.js";import"./routes-C7yRzVAD.js";const v={title:"Oppgaver",component:t,decorators:[m],render:o=>s.jsx(p,{children:s.jsx(t,{...o})})},r={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>n.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[a.get(".//rest/minidialog",()=>new n(null,{status:400}))]}},args:{saksnummer:"352011079"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
