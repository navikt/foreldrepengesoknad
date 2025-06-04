import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{h as l,H as d}from"./index-D5WPyhm7.js";import{w as g}from"./withQueryClient-B3ZyOuTZ.js";import{O as s}from"./Oppgaver-Db0TLXDK.js";import{M as c}from"./chunk-D4RADZKF-BhdFhvqI.js";import"./decorators-Bnaor6Ku.js";import"./index-DIIcF78r.js";import"./index-DQLiH3RP.js";import"./useQuery-CkpvBZiO.js";import"./index-ClyUrrHr.js";import"./api-CwRbU3cx.js";import"./UttaksdagenString-DipQCgGo.js";import"./dates-efjv5HSM.js";import"./stringUtils-DGs1tyYX.js";import"./ContentSection-By9cnGfZ.js";import"./index-CC-COn1g.js";import"./Label-DalfrUzn.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-CUMPREbU.js";import"./LenkePanel-CaDWDad0.js";import"./VStack-C9FgvL9l.js";import"./useId-B11Gq5wf.js";import"./ArrowRight-DYaJDYv5.js";import"./useId-B7OrP95z.js";import"./routes-C7yRzVAD.js";const Q={title:"Oppgaver",component:s,decorators:[g],render:u=>e.jsx(c,{children:e.jsx(s,{...u})})},r={parameters:{msw:{handlers:[l.get(".//rest/minidialog",()=>d.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},t={parameters:{msw:{handlers:[l.get(".//rest/minidialog",()=>new d(null,{status:400}))]}},args:{saksnummer:"352011079"}};var o,a,m;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
