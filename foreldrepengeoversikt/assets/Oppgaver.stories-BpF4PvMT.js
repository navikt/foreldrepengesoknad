import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{Q as c,a as g}from"./useQuery-D_fvW0PL.js";import{h as l,H as d}from"./index-Ey0twAil.js";import{O as s}from"./Oppgaver-CnIy7XKK.js";import{M as h}from"./index-DOF3ycNb.js";import"./index-CTjT7uj6.js";import"./decorators-86JrGkCj.js";import"./index-BdgkEI3a.js";import"./api-DZHAPXBN.js";import"./ContentSection-B_6Fjlwm.js";import"./index-CCQ3W5xA.js";import"./Label-BeJqMiuK.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-CWwEzM2U.js";import"./Uttaksdagen-ClUiN95P.js";import"./dates-DUtd6zgH.js";import"./LenkePanel-BGBOHCDb.js";import"./index-Cn00N9t0.js";import"./index-vZN_Bsf0.js";import"./VStack-Dvme46cy.js";import"./useMergeRefs-Dg7ETiim.js";import"./useId-BFxX0aRd.js";import"./routes-Run26EI7.js";const f=new c,z={title:"Oppgaver",component:s,render:u=>t.jsx(g,{client:f,children:t.jsx(h,{children:t.jsx(s,{...u})})})},r={parameters:{msw:{handlers:[l.get("/rest/minidialog",()=>d.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[l.get("/rest/minidialog",()=>new d(null,{status:400}))]}},args:{saksnummer:"352011079"}};var o,n,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};var m,i,p;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(p=(i=e.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};const B=["Default","FeilIMinidialogApiKall"];export{r as Default,e as FeilIMinidialogApiKall,B as __namedExportsOrder,z as default};
