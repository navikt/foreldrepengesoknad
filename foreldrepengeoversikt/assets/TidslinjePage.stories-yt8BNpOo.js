import{i as m,j as t}from"./iframe-DNdFQc-E.js";import{h as e,H as s}from"./index-ZHclRefx.js";import{t as p,m as a}from"./tidslinjeHendelser-DU_OZUCU.js";import{s as l}from"./saker-CS0pnpuZ.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-ad3Pqjft.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-DGACcyrF.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-C5PRFulN.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-UpQGCv5E.js";import"./useSelectedSak-QuNojGU6.js";import"./useQuery-DWA1I81K.js";import"./api-CntHfO5i.js";import"./sakerUtils-vvrpiCZP.js";import"./Snarveier-DfXE6JIp.js";import"./LenkePanel-cq28zm5d.js";import"./index-C537MR6J.js";import"./Dokument-DAAR7EW8.js";import"./dokumenterUtils-BLtnd12S.js";import"./Tag-B5RniG4t.js";import"./GrupperteDokumenter-CJJa1k8M.js";import"./guid-CsArkN6i.js";import"./Accordion-B5lV9rjr.js";import"./Header-BbIjRmI6.js";import"./LayoutWrapper-K01gCHV3.js";import"./StatusTag-BxaF-xwW.js";import"./Stroller-Cd08iIm7.js";import"./NoeGikkGalt-C7At8Qui.js";import"./MinidialogSkjema-C0SgBfpP.js";import"./BekreftelseSendtSøknad-CSDM8XJD.js";import"./KontonummerInfo-B1JEPuNI.js";import"./HarIkkeSaker-Cz7z4Vno.js";import"./SøkelenkerPanel-CqBdNRxJ.js";import"./HarSaker-Dp3pcbnO.js";import"./SakLink-iFzibmkj.js";import"./ContentSection-C7byseTr.js";import"./Svangerskapspenger-BCpQSmvR.js";import"./DinPlan-cw8r1wTi.js";import"./Oppgaver-BNq_JL8r.js";import"./OppgaveLenkepanel-C5-HdB2b.js";import"./KontaktOss-bHqY7659.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
