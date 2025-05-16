import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{h as l,H as d}from"./index-D5WPyhm7.js";import{w as g}from"./withQueryClient-0RnYsr9w.js";import{O as s}from"./Oppgaver-CV2HUsvl.js";import{M as c}from"./chunk-D4RADZKF-BhdFhvqI.js";import"./decorators-Bnaor6Ku.js";import"./QueryClientProvider-DTI5uWLr.js";import"./index-DQLiH3RP.js";import"./index-Ctu3BZYE.js";import"./useQuery-Km81jHJP.js";import"./index-ClyUrrHr.js";import"./api-By2d6bGs.js";import"./UttaksdagenString-DRcuPL2E.js";import"./dates-efjv5HSM.js";import"./stringUtils-DGs1tyYX.js";import"./ContentSection-0f-jDKfi.js";import"./index-CC-COn1g.js";import"./Label-DsXbSMDU.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-4BUEgmxR.js";import"./LenkePanel-DHiG33fe.js";import"./VStack-BrvoQt_9.js";import"./useId-B0ho74s8.js";import"./ArrowRight-8iuLDnM2.js";import"./routes-C7yRzVAD.js";const Q={title:"Oppgaver",component:s,decorators:[g],render:u=>e.jsx(c,{children:e.jsx(s,{...u})})},r={parameters:{msw:{handlers:[l.get(".//rest/minidialog",()=>d.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},t={parameters:{msw:{handlers:[l.get(".//rest/minidialog",()=>new d(null,{status:400}))]}},args:{saksnummer:"352011079"}};var o,a,m;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
