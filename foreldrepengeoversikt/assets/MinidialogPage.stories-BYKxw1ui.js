import{i as d,j as t}from"./iframe-0_Pfn_Hg.js";import{h as o,H as e}from"./index-CD9NMLmE.js";import{s as l}from"./saker-DCid6KVJ.js";import{O as i}from"./routes-C7yRzVAD.js";import{M as s}from"./ForeldrepengeoversiktRoutes-BrsbVyff.js";import{M as g,R as u,a as c}from"./chunk-NL6KNZEE-CEya78yo.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-C0h0w_n8.js";import"./useSelectedSak-BEebh1Yt.js";import"./useQuery-0Z7l5vZ2.js";import"./api-Ca4yGKOZ.js";import"./sakerUtils-D_sVtLFC.js";import"./Snarveier-DUviFqf8.js";import"./LenkePanel-BZrwuGvj.js";import"./Dokument-pV7JvHD3.js";import"./dokumenterUtils-BPuCtKcA.js";import"./Tag-BwI6ixil.js";import"./GrupperteDokumenter-CMblQl13.js";import"./guid-CsArkN6i.js";import"./Header-B453AGKk.js";import"./LayoutWrapper-C94uA0SD.js";import"./StatusTag-DnpHmTMk.js";import"./Stroller-5nMXspYP.js";import"./NoeGikkGalt-BQNNZf3U.js";import"./MinidialogSkjema-RUnxQDkz.js";import"./skjemanummer-CRsChutl.js";import"./BekreftelseSendtSøknad-hF4V9tZV.js";import"./KontonummerInfo-wwIFVggs.js";import"./HarIkkeSaker-BMOFIOcF.js";import"./SøkelenkerPanel-BdUVfDmy.js";import"./HarSaker--murIi33.js";import"./SakLink-DZxWj5bu.js";import"./ContentSection-U4bdmkTG.js";import"./Svangerskapspenger-BferktB7.js";import"./DinPlan-B2nKRNqv.js";import"./Oppgaver-B_At9Xsp.js";import"./OppgaveLenkepanel-BWM1bS7m.js";import"./KontaktOss-CWxUNLqp.js";const Z={title:"MinidialogPage",component:s,decorators:[d],render:n=>t.jsx(g,{initialEntries:[`/${i.DIN_PLAN}/352011079/1111111112`],children:t.jsx(u,{children:t.jsx(c,{element:t.jsx(s,{...n}),path:`/${i.DIN_PLAN}/:saksnummer/:oppgaveId`})})})},r={parameters:{msw:{handlers:[o.get(".//rest/minidialog",()=>e.json([{saksnr:"352011079",opprettet:"2023-02-09",dialogId:"1111111112"}])),o.get(".//rest/innsyn/v2/saker",()=>e.json(l))]}},args:{fnr:"12434"}};var m,p,a;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/minidialog\`, () => HttpResponse.json([{
        saksnr: '352011079',
        opprettet: '2023-02-09',
        dialogId: '1111111112'
      }])), http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json(saker))]
    }
  },
  args: {
    fnr: '12434'
  }
}`,...(a=(p=r.parameters)==null?void 0:p.docs)==null?void 0:a.source}}};const tt=["Default"];export{r as Default,tt as __namedExportsOrder,Z as default};
