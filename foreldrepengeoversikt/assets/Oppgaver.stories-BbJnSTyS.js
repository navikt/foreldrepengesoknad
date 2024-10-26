import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{Q as c}from"./useQuery-BqYmVjEi.js";import{h as l,H as d}from"./index-Ey0twAil.js";import{O as s}from"./Oppgaver-Bw6elW2e.js";import{M as g}from"./index-DROl5W8_.js";import{Q as h}from"./queryClient-dYgOrjC7.js";import"./index-CTjT7uj6.js";import"./decorators-86JrGkCj.js";import"./index-BXlQ-FBc.js";import"./OppgaveLenkepanel-B1UIVbes.js";import"./UttaksdagenString-BgBSX5Ao.js";import"./dates-JCHAmx_r.js";import"./index-CCQ3W5xA.js";import"./LenkePanel-CZXA2q2z.js";import"./index-bqFtOaxG.js";import"./index-vZN_Bsf0.js";import"./VStack-BUk9K807.js";import"./Label-BeJqMiuK.js";import"./useMergeRefs-DE1yqPfQ.js";import"./routes-D6j-qr5i.js";import"./api-CiXCA4Ns.js";import"./stringUtils-BhrNUKGk.js";import"./ContentSection-B_6Fjlwm.js";import"./guid-CsArkN6i.js";const k=new h,B={title:"Oppgaver",component:s,render:u=>e.jsx(c,{client:k,children:e.jsx(g,{children:e.jsx(s,{...u})})})},r={parameters:{msw:{handlers:[l.get("https://oversikt/rest/minidialog",()=>d.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},t={parameters:{msw:{handlers:[l.get("https://oversikt/rest/minidialog",()=>new d(null,{status:400}))]}},args:{saksnummer:"352011079"}};var o,n,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
