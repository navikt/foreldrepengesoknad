import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{Q as c,a as g}from"./useQuery-D_fvW0PL.js";import{h as l,H as d}from"./index-Ey0twAil.js";import{O as s}from"./Oppgaver-8EfnduWe.js";import{M as h}from"./index-tEo2AQk3.js";import"./index-CTjT7uj6.js";import"./decorators-86JrGkCj.js";import"./index-BdgkEI3a.js";import"./OppgaveLenkepanel-BdKaqyl_.js";import"./UttaksdagenString-CJKc9JwL.js";import"./dates-JCHAmx_r.js";import"./index-CCQ3W5xA.js";import"./LenkePanel-DMeIfuFQ.js";import"./index-B0Oj_L-4.js";import"./index-vZN_Bsf0.js";import"./VStack-B3VpK05-.js";import"./Label-BeJqMiuK.js";import"./useMergeRefs-Dg7ETiim.js";import"./useId-BFxX0aRd.js";import"./routes-Run26EI7.js";import"./api-BZH2QUWM.js";import"./ContentSection-B_6Fjlwm.js";import"./guid-CsArkN6i.js";const k=new c,z={title:"Oppgaver",component:s,render:u=>e.jsx(g,{client:k,children:e.jsx(h,{children:e.jsx(s,{...u})})})},r={parameters:{msw:{handlers:[l.get("https://oversikt/rest/minidialog",()=>d.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},t={parameters:{msw:{handlers:[l.get("https://oversikt/rest/minidialog",()=>new d(null,{status:400}))]}},args:{saksnummer:"352011079"}};var o,n,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};var i,p,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const B=["Default","FeilIMinidialogApiKall"];export{r as Default,t as FeilIMinidialogApiKall,B as __namedExportsOrder,z as default};
