import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{Q as c}from"./useQuery-D15qCwmj.js";import{h as l,H as d}from"./index-Ey0twAil.js";import{O as s}from"./Oppgaver-B9uDzp1_.js";import{M as g}from"./index-qfvvJAWu.js";import{Q as h}from"./queryClient-SB0VFwmw.js";import"./index-CTjT7uj6.js";import"./decorators-86JrGkCj.js";import"./index-BXq8hJNt.js";import"./api-C4E93qPC.js";import"./UttaksdagenString-DBxOpWvb.js";import"./dates-JCHAmx_r.js";import"./stringUtils-grKZaQiI.js";import"./ContentSection-B_6Fjlwm.js";import"./index-CCQ3W5xA.js";import"./Label-BeJqMiuK.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-CgvMe_Cz.js";import"./LenkePanel-DfIQwAuU.js";import"./index-ChWcicze.js";import"./index-BbmHap-z.js";import"./VStack-Cmqt2b2v.js";import"./useMergeRefs-DE1yqPfQ.js";import"./routes-D6j-qr5i.js";const f=new h,q={title:"Oppgaver",component:s,render:u=>t.jsx(c,{client:f,children:t.jsx(g,{children:t.jsx(s,{...u})})})},r={parameters:{msw:{handlers:[l.get(".//rest/minidialog",()=>d.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[l.get(".//rest/minidialog",()=>new d(null,{status:400}))]}},args:{saksnummer:"352011079"}};var o,n,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};var m,i,p;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(p=(i=e.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};const P=["Default","FeilIMinidialogApiKall"];export{r as Default,e as FeilIMinidialogApiKall,P as __namedExportsOrder,q as default};
