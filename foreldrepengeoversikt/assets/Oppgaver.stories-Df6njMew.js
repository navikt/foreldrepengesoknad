import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{Q as c}from"./useQuery-D15qCwmj.js";import{h as l,H as d}from"./index-Ey0twAil.js";import{O as s}from"./Oppgaver-TjRb2E1f.js";import{M as g}from"./index-qfvvJAWu.js";import{Q as h}from"./queryClient-SB0VFwmw.js";import"./index-CTjT7uj6.js";import"./decorators-86JrGkCj.js";import"./index-BXq8hJNt.js";import"./OppgaveLenkepanel-oycW-SZE.js";import"./UttaksdagenString-DBxOpWvb.js";import"./dates-JCHAmx_r.js";import"./index-CCQ3W5xA.js";import"./LenkePanel-DfIQwAuU.js";import"./index-ChWcicze.js";import"./index-BbmHap-z.js";import"./VStack-Cmqt2b2v.js";import"./Label-BeJqMiuK.js";import"./useMergeRefs-DE1yqPfQ.js";import"./routes-D6j-qr5i.js";import"./api-C4INlF_P.js";import"./stringUtils-BhrNUKGk.js";import"./ContentSection-B_6Fjlwm.js";import"./guid-CsArkN6i.js";const k=new h,B={title:"Oppgaver",component:s,render:u=>e.jsx(c,{client:k,children:e.jsx(g,{children:e.jsx(s,{...u})})})},r={parameters:{msw:{handlers:[l.get("https://oversikt/rest/minidialog",()=>d.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},t={parameters:{msw:{handlers:[l.get("https://oversikt/rest/minidialog",()=>new d(null,{status:400}))]}},args:{saksnummer:"352011079"}};var o,n,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get('https://oversikt/rest/minidialog', () => HttpResponse.json([{
        saksnr: '352011079',
        opprettet: '2023-02-09',
        dialogId: '1111111112'
      }]))]
    }
  },
  args: {
    saksnummer: '352011079'
  }
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};var i,m,p;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get('https://oversikt/rest/minidialog', () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: {
    saksnummer: '352011079'
  }
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const G=["Default","FeilIMinidialogApiKall"];export{r as Default,t as FeilIMinidialogApiKall,G as __namedExportsOrder,B as default};
