import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{Q as c,a as g}from"./useQuery-Debqw60O.js";import{h as l,H as d}from"./index-Ey0twAil.js";import{O as s}from"./Oppgaver-8P3EgAdX.js";import{M as h}from"./index-DROl5W8_.js";import"./index-CTjT7uj6.js";import"./decorators-86JrGkCj.js";import"./index-BXlQ-FBc.js";import"./OppgaveLenkepanel-CozTgHKZ.js";import"./UttaksdagenString-CJKc9JwL.js";import"./dates-JCHAmx_r.js";import"./index-CCQ3W5xA.js";import"./LenkePanel-VksUmbN3.js";import"./index-bqFtOaxG.js";import"./index-vZN_Bsf0.js";import"./VStack-BUk9K807.js";import"./Label-BeJqMiuK.js";import"./useMergeRefs-DE1yqPfQ.js";import"./routes-Run26EI7.js";import"./api-BZH2QUWM.js";import"./ContentSection-B_6Fjlwm.js";import"./guid-CsArkN6i.js";const k=new c,b={title:"Oppgaver",component:s,render:u=>e.jsx(g,{client:k,children:e.jsx(h,{children:e.jsx(s,{...u})})})},r={parameters:{msw:{handlers:[l.get("https://oversikt/rest/minidialog",()=>d.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},t={parameters:{msw:{handlers:[l.get("https://oversikt/rest/minidialog",()=>new d(null,{status:400}))]}},args:{saksnummer:"352011079"}};var o,n,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const z=["Default","FeilIMinidialogApiKall"];export{r as Default,t as FeilIMinidialogApiKall,z as __namedExportsOrder,b as default};
