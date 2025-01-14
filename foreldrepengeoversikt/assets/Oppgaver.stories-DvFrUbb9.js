import{j as t}from"./jsx-runtime-DwRxq3ZX.js";import{Q as c}from"./useQuery-Bp3Xrv1y.js";import{h as l,H as d}from"./index-B-Pz4-0B.js";import{O as s}from"./Oppgaver-B5AKNRi9.js";import{M as g}from"./index-ByI1_y3g.js";import{Q as h}from"./queryClient-wSud2sxq.js";import"./index-BX3iQpgp.js";import"./decorators-DIzpaN6C.js";import"./index-A4VDgvRX.js";import"./api-CuYAbk1P.js";import"./UttaksdagenString-Dd6xBUPd.js";import"./dates-TdbGqddN.js";import"./stringUtils-grKZaQiI.js";import"./ContentSection-CmPeHpUR.js";import"./index-ImNsV_cY.js";import"./Label-sdGPuzAK.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-BBR3kecF.js";import"./LenkePanel-Bw60y4ti.js";import"./index-BwGdUlzO.js";import"./index-B1dLepta.js";import"./VStack-DCI-IWy0.js";import"./useId-CmSpHSni.js";import"./routes-D6j-qr5i.js";const f=new h,q={title:"Oppgaver",component:s,render:u=>t.jsx(c,{client:f,children:t.jsx(g,{children:t.jsx(s,{...u})})})},r={parameters:{msw:{handlers:[l.get(".//rest/minidialog",()=>d.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[l.get(".//rest/minidialog",()=>new d(null,{status:400}))]}},args:{saksnummer:"352011079"}};var o,n,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
