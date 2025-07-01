import{i as l,j as t}from"./iframe-CWo92Ymk.js";import{h as e,H as s}from"./index-DZusc7F4.js";import{t as d,m as g}from"./tidslinjeHendelser-C5If4zcc.js";import{s as j}from"./saker-BKyBOWUq.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-DE9fTUbO.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-Ojkx7Czc.js";import"./skjemanummer-DxrR2zpu.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-Cf1V-xcB.js";import"./useSelectedSak-BjJMqJGa.js";import"./useQuery-D8F8luuk.js";import"./api-CnCBX3oU.js";import"./sakerUtils-DNJEv504.js";import"./Snarveier-cGKKM2w9.js";import"./LenkePanel-Du5H-aw7.js";import"./Dokument-DLkjUJuR.js";import"./dokumenterUtils-DxEkBLrL.js";import"./Tag-BFp30PbK.js";import"./GrupperteDokumenter-C-w6MeKD.js";import"./guid-CsArkN6i.js";import"./Header-D9zyrF6q.js";import"./LayoutWrapper-PRoYNtoa.js";import"./StatusTag-UHgDsxdU.js";import"./Stroller-ClIpDfJD.js";import"./NoeGikkGalt-Bt1G5tTM.js";import"./MinidialogSkjema-B1nobzuN.js";import"./BekreftelseSendtSøknad-BItX5MZ6.js";import"./KontonummerInfo-0lKDEIFS.js";import"./HarIkkeSaker-DV5jI_S7.js";import"./SøkelenkerPanel-PvXxlF_f.js";import"./HarSaker-DHSZrsdF.js";import"./SakLink-MmVX0RNF.js";import"./ContentSection-Cm4EpqBE.js";import"./Svangerskapspenger-sHp9FkWL.js";import"./DinPlan-BxCC5Cgi.js";import"./Oppgaver-u71lg8Gk.js";import"./OppgaveLenkepanel-f3_oeUkS.js";import"./KontaktOss-DZiJFhAi.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
