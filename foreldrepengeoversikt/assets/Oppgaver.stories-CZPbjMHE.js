import{i as g,j as s}from"./iframe-DX72ucYV.js";import{h as l,H as d}from"./index-D0_SQ3Lt.js";import{O as t}from"./Oppgaver-BUCrHvSC.js";import{M as c}from"./chunk-NL6KNZEE-BurtXCNU.js";import"./useQuery-DZBVDuY9.js";import"./api-Blv5udmg.js";import"./ContentSection-fWaf3xX6.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-BJm3DzBs.js";import"./LenkePanel-Bvb0Fimp.js";import"./routes-C7yRzVAD.js";const I={title:"Oppgaver",component:t,decorators:[g],render:u=>s.jsx(c,{children:s.jsx(t,{...u})})},r={parameters:{msw:{handlers:[l.get(".//rest/minidialog",()=>d.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[l.get(".//rest/minidialog",()=>new d(null,{status:400}))]}},args:{saksnummer:"352011079"}};var a,n,o;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
}`,...(o=(n=r.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};var m,p,i;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(i=(p=e.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};const M=["Default","FeilIMinidialogApiKall"];export{r as Default,e as FeilIMinidialogApiKall,M as __namedExportsOrder,I as default};
