import{i as m,j as t}from"./iframe-CXfGVbaf.js";import{h as e,H as s}from"./index-ChxLzGq4.js";import{t as p,m as a}from"./tidslinjeHendelser-D2Q6nHsN.js";import{s as l}from"./saker-EryU_pmG.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-q3o5o8Kk.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-DbH7zVyY.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DPGPV9Z7.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-C18RE9bn.js";import"./useSelectedSak-DfrwhCMA.js";import"./useQuery-C0n8XB2S.js";import"./api-NQYfJZG0.js";import"./sakerUtils-CO1tOIt9.js";import"./Snarveier-DJjhFuUc.js";import"./LenkePanel-ZpPskCEn.js";import"./index-CA-btkGX.js";import"./Dokument-Duz8v24U.js";import"./dokumenterUtils-DylPHgbg.js";import"./Tag-ByV1jdo9.js";import"./GrupperteDokumenter-hLnEGUpD.js";import"./guid-CsArkN6i.js";import"./Accordion-Dpf-tiUx.js";import"./Header-4i3GxVl3.js";import"./LayoutWrapper-BuZZb-nE.js";import"./StatusTag-sPMKXGWK.js";import"./Stroller-i152I1KD.js";import"./NoeGikkGalt-y_hKdheC.js";import"./MinidialogSkjema-BKtlYtt4.js";import"./BekreftelseSendtSøknad-CtDxp4sN.js";import"./KontonummerInfo-DRVQVZeS.js";import"./HarIkkeSaker-BpYsYCyB.js";import"./SøkelenkerPanel-Sw2cdtg6.js";import"./HarSaker-2D8jPQAH.js";import"./SakLink-Co1fuWM9.js";import"./ContentSection-kncdVtIC.js";import"./Svangerskapspenger-CqlU47mF.js";import"./DinPlan-BT-TmZe4.js";import"./Oppgaver-CfCJNd0S.js";import"./OppgaveLenkepanel-CPdyqlsl.js";import"./KontaktOss-DsgjDRQb.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const st=["Default"];export{r as Default,st as __namedExportsOrder,et as default};
