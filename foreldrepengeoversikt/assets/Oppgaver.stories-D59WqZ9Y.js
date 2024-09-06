import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{Q as c,a as g}from"./useQuery-CY6KkctN.js";import{h as l,H as d}from"./index-C1uWNzPf.js";import{O as s}from"./Oppgaver-CeZQ1DIC.js";import{M as h}from"./index-BK5YD3Eg.js";import"./index-CTjT7uj6.js";import"./decorators-DP8eTBZN.js";import"./index-DnmOyZDY.js";import"./api-BlleEFcW.js";import"./ContentSection-Bg1AkEed.js";import"./Uttaksdagen-Bkz5oXqd.js";import"./dates-DUtd6zgH.js";import"./Label-C_2a564_.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-BT1IMhRK.js";import"./index-BD0lb3_z.js";import"./index-CYM-y3Gt.js";import"./routes-Run26EI7.js";import"./LinkPanel-Cpparcb1.js";import"./ChevronRight-Cbq2_cV6.js";import"./useId-BFxX0aRd.js";import"./useId-BHtrcvnP.js";import"./VStack-CQ8vh05t.js";import"./useMergeRefs-Dg7ETiim.js";const f=new c,B={title:"Oppgaver",component:s,render:u=>t.jsx(g,{client:f,children:t.jsx(h,{children:t.jsx(s,{...u})})})},r={parameters:{msw:{handlers:[l.get("/rest/minidialog",()=>d.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[l.get("/rest/minidialog",()=>new d(null,{status:400}))]}},args:{saksnummer:"352011079"}};var o,n,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(p=(i=e.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};const G=["Default","FeilIMinidialogApiKall"];export{r as Default,e as FeilIMinidialogApiKall,G as __namedExportsOrder,B as default};
