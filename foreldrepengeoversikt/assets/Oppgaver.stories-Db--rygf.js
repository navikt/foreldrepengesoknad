import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{Q as c,a as u}from"./useQuery-nySqyMyB.js";import{h as l,H as d}from"./index-B7jImiY8.js";import{O as o}from"./Oppgaver-CEgpTIbu.js";import{M as g}from"./index-DqI3wG_s.js";import"./index-CTjT7uj6.js";import"./decorators-DP8eTBZN.js";import"./index-76BUWsog.js";import"./tslib.es6-C7pnyCjR.js";import"./api-2OGBCUqn.js";import"./ContentSection-Bg1AkEed.js";import"./Uttaksdagen-Bkz5oXqd.js";import"./dates-DUtd6zgH.js";import"./Label-C_2a564_.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-ISX2J8TJ.js";import"./index-BQoWABHE.js";import"./index-9r8iugjR.js";import"./routes-Run26EI7.js";import"./LinkPanel-Cpparcb1.js";import"./ChevronRight-Cbq2_cV6.js";import"./useId-BFxX0aRd.js";import"./useId-BHtrcvnP.js";import"./VStack-CQ8vh05t.js";import"./useMergeRefs-Dg7ETiim.js";const h=new c,B={title:"Oppgaver",component:o,render:()=>e.jsx(u,{client:h,children:e.jsx(g,{children:e.jsx(o,{saksnummer:"352011079"})})})},r={parameters:{msw:{handlers:[l.get("/rest/minidialog",()=>d.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}}},t={parameters:{msw:{handlers:[l.get("/rest/minidialog",()=>new d(null,{status:400}))]}}};var s,i,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get('/rest/minidialog', () => HttpResponse.json([{
        saksnr: '352011079',
        opprettet: '2023-02-09',
        dialogId: '1111111112'
      }]))]
    }
  }
}`,...(a=(i=r.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var n,p,m;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get('/rest/minidialog', () => new HttpResponse(null, {
        status: 400
      }))]
    }
  }
}`,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const G=["Default","FeilIMinidialogApiKall"];export{r as Default,t as FeilIMinidialogApiKall,G as __namedExportsOrder,B as default};
