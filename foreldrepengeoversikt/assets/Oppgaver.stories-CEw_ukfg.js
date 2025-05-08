import{j as e}from"./jsx-runtime-CLpGMVip.js";import{h as l,H as d}from"./index-B-Pz4-0B.js";import{w as g}from"./withQueryClient-D8gqxQ_c.js";import{O as s}from"./Oppgaver-DfAxlY7Z.js";import{M as c}from"./chunk-SYFQ2XB5-D9pMU80H.js";import"./decorators-DIzpaN6C.js";import"./QueryClientProvider-XbgLbB-5.js";import"./index-CR__hKHy.js";import"./index-46qmyZAO.js";import"./useQuery-B2xbgnn4.js";import"./index-3B3qaQUl.js";import"./api-CV6oBBCk.js";import"./UttaksdagenString-DgzxJ_GZ.js";import"./dates-C5Vjd-yy.js";import"./stringUtils-xBoGBqui.js";import"./ContentSection-DqBoVSpP.js";import"./index-BDNcHBiq.js";import"./Label-vuqQZ1tj.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-l7ghaGA-.js";import"./LenkePanel-DNW8h9lC.js";import"./VStack-BZkCtxmu.js";import"./useId-CID_lvh_.js";import"./ArrowRight-DNLm8DIc.js";import"./routes-C7yRzVAD.js";const Q={title:"Oppgaver",component:s,decorators:[g],render:u=>e.jsx(c,{children:e.jsx(s,{...u})})},r={parameters:{msw:{handlers:[l.get(".//rest/minidialog",()=>d.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},t={parameters:{msw:{handlers:[l.get(".//rest/minidialog",()=>new d(null,{status:400}))]}},args:{saksnummer:"352011079"}};var o,a,m;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(m=(a=r.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};var n,p,i;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
}`,...(i=(p=t.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};const b=["Default","FeilIMinidialogApiKall"];export{r as Default,t as FeilIMinidialogApiKall,b as __namedExportsOrder,Q as default};
