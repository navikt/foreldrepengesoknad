import{i as l,j as t}from"./iframe-0_Pfn_Hg.js";import{h as e,H as s}from"./index-CD9NMLmE.js";import{t as d,m as g}from"./tidslinjeHendelser-ztZMf-rj.js";import{s as j}from"./saker-DCid6KVJ.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-BrsbVyff.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-CEya78yo.js";import"./skjemanummer-CRsChutl.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-C0h0w_n8.js";import"./useSelectedSak-BEebh1Yt.js";import"./useQuery-0Z7l5vZ2.js";import"./api-Ca4yGKOZ.js";import"./sakerUtils-D_sVtLFC.js";import"./Snarveier-DUviFqf8.js";import"./LenkePanel-BZrwuGvj.js";import"./Dokument-pV7JvHD3.js";import"./dokumenterUtils-BPuCtKcA.js";import"./Tag-BwI6ixil.js";import"./GrupperteDokumenter-CMblQl13.js";import"./guid-CsArkN6i.js";import"./Header-B453AGKk.js";import"./LayoutWrapper-C94uA0SD.js";import"./StatusTag-DnpHmTMk.js";import"./Stroller-5nMXspYP.js";import"./NoeGikkGalt-BQNNZf3U.js";import"./MinidialogSkjema-RUnxQDkz.js";import"./BekreftelseSendtSøknad-hF4V9tZV.js";import"./KontonummerInfo-wwIFVggs.js";import"./HarIkkeSaker-BMOFIOcF.js";import"./SøkelenkerPanel-BdUVfDmy.js";import"./HarSaker--murIi33.js";import"./SakLink-DZxWj5bu.js";import"./ContentSection-U4bdmkTG.js";import"./Svangerskapspenger-BferktB7.js";import"./DinPlan-B2nKRNqv.js";import"./Oppgaver-B_At9Xsp.js";import"./OppgaveLenkepanel-BWM1bS7m.js";import"./KontaktOss-CWxUNLqp.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json(saker)), http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/tidslinje\`, () => HttpResponse.json(tidslinjeHendelser)), http.get(\`\${import.meta.env.BASE_URL}/rest/historikk/vedlegg\`, () => HttpResponse.json(manglendeVedlegg))]
    }
  },
  args: {
    søkersBarn: [{
      fornavn: 'Olga',
      etternavn: 'Utvikler',
      fnr: '23232424',
      fødselsdato: '2024-01-01',
      kjønn: 'K'
    }]
  }
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const st=["Default"];export{r as Default,st as __namedExportsOrder,et as default};
