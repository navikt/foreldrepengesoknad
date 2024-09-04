import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{Q as c,a as u}from"./useQuery-CY6KkctN.js";import{h as l,H as d}from"./index-C1uWNzPf.js";import{O as o}from"./Oppgaver-CeZQ1DIC.js";import{M as g}from"./index-BK5YD3Eg.js";import"./index-CTjT7uj6.js";import"./decorators-DP8eTBZN.js";import"./index-DnmOyZDY.js";import"./api-BlleEFcW.js";import"./ContentSection-Bg1AkEed.js";import"./Uttaksdagen-Bkz5oXqd.js";import"./dates-DUtd6zgH.js";import"./Label-C_2a564_.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-BT1IMhRK.js";import"./index-BD0lb3_z.js";import"./index-CYM-y3Gt.js";import"./routes-Run26EI7.js";import"./LinkPanel-Cpparcb1.js";import"./ChevronRight-Cbq2_cV6.js";import"./useId-BHtrcvnP.js";import"./useId-BFxX0aRd.js";import"./VStack-CQ8vh05t.js";import"./useMergeRefs-Dg7ETiim.js";const h=new c,z={title:"Oppgaver",component:o,render:()=>e.jsx(u,{client:h,children:e.jsx(g,{children:e.jsx(o,{saksnummer:"352011079"})})})},r={parameters:{msw:{handlers:[l.get("/rest/minidialog",()=>d.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}}},t={parameters:{msw:{handlers:[l.get("/rest/minidialog",()=>new d(null,{status:400}))]}}};var s,a,i;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get('/rest/minidialog', () => HttpResponse.json([{
        saksnr: '352011079',
        opprettet: '2023-02-09',
        dialogId: '1111111112'
      }]))]
    }
  }
}`,...(i=(a=r.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var n,p,m;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get('/rest/minidialog', () => new HttpResponse(null, {
        status: 400
      }))]
    }
  }
}`,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const B=["Default","FeilIMinidialogApiKall"];export{r as Default,t as FeilIMinidialogApiKall,B as __namedExportsOrder,z as default};
