import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{Q as c,a as g}from"./useQuery-D_fvW0PL.js";import{h as l,H as d}from"./index-CQPv6-if.js";import{O as s}from"./Oppgaver-Cf1nOLcl.js";import{M as h}from"./index-D9Go8z3K.js";import"./index-CTjT7uj6.js";import"./decorators-Bo_HQzC9.js";import"./index-ghK6WsM8.js";import"./api-BmJ5658F.js";import"./ContentSection-B_6Fjlwm.js";import"./index-CCQ3W5xA.js";import"./Label-BeJqMiuK.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-DfYIuUj2.js";import"./Uttaksdagen-ClUiN95P.js";import"./dates-DUtd6zgH.js";import"./LenkePanel-BGlWXzD2.js";import"./VStack-CislUPit.js";import"./useMergeRefs-Dg7ETiim.js";import"./useId-BFxX0aRd.js";import"./routes-Run26EI7.js";import"./index-vZN_Bsf0.js";const f=new c,b={title:"Oppgaver",component:s,render:u=>t.jsx(g,{client:f,children:t.jsx(h,{children:t.jsx(s,{...u})})})},r={parameters:{msw:{handlers:[l.get("/rest/minidialog",()=>d.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[l.get("/rest/minidialog",()=>new d(null,{status:400}))]}},args:{saksnummer:"352011079"}};var n,o,a;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get('/rest/minidialog', () => HttpResponse.json([{
        saksnr: '352011079',
        opprettet: '2023-02-09',
        dialogId: '1111111112'
      }]))]
    }
  },
  args: {
    saksnummer: '352011079'
  }
}`,...(a=(o=r.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};var m,i,p;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get('/rest/minidialog', () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: {
    saksnummer: '352011079'
  }
}`,...(p=(i=e.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};const z=["Default","FeilIMinidialogApiKall"];export{r as Default,e as FeilIMinidialogApiKall,z as __namedExportsOrder,b as default};
