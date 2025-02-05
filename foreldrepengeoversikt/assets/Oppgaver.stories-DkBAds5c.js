import{j as t}from"./jsx-runtime-CLpGMVip.js";import{Q as c}from"./useQuery-D4bRZ7iC.js";import{h as l,H as d}from"./index-B-Pz4-0B.js";import{O as s}from"./Oppgaver-CiaHFySi.js";import{Q as g}from"./queryClient-DpQYMfvj.js";import{M as h}from"./chunk-SYFQ2XB5-D9pMU80H.js";import"./index-CR__hKHy.js";import"./decorators-DIzpaN6C.js";import"./index-DjWdgH6H.js";import"./api-i7u75HJr.js";import"./UttaksdagenString-BBcnJY7-.js";import"./dates-Cs9kK9kw.js";import"./stringUtils-xBoGBqui.js";import"./ContentSection-7DyEQ1Ld.js";import"./index-BDNcHBiq.js";import"./Label-uxnjPK_2.js";import"./guid-CsArkN6i.js";import"./OppgaveLenkepanel-XnzPGhCg.js";import"./LenkePanel-C6FGDLin.js";import"./VStack-BsKxbgho.js";import"./useId-BsEbCovs.js";import"./routes-D6j-qr5i.js";const f=new g,L={title:"Oppgaver",component:s,render:u=>t.jsx(c,{client:f,children:t.jsx(h,{children:t.jsx(s,{...u})})})},r={parameters:{msw:{handlers:[l.get(".//rest/minidialog",()=>d.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}]))]}},args:{saksnummer:"352011079"}},e={parameters:{msw:{handlers:[l.get(".//rest/minidialog",()=>new d(null,{status:400}))]}},args:{saksnummer:"352011079"}};var o,n,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(p=(i=e.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};const U=["Default","FeilIMinidialogApiKall"];export{r as Default,e as FeilIMinidialogApiKall,U as __namedExportsOrder,L as default};
