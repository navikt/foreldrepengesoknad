import{i as m,j as t}from"./iframe-Cd2Tj3NH.js";import{h as e,H as s}from"./index-BqBZeJ-Y.js";import{t as p,m as a}from"./tidslinjeHendelser-BhYdPUoj.js";import{s as l}from"./saker-BUPK8-lp.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-C9wTvAZB.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-Cc0mosp9.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DAz02o9h.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BMbFhnQC.js";import"./useSelectedSak-DXR-hWCE.js";import"./useQuery-DmfVGBwR.js";import"./api-JHGM12Sz.js";import"./sakerUtils-B_mYDItL.js";import"./Snarveier-DXrzxFOk.js";import"./LenkePanel-ivq_3pb3.js";import"./index-BHm3344K.js";import"./Dokument-CP6ZGA3z.js";import"./dokumenterUtils-BrsOyZ9g.js";import"./Tag-Dn9_MYkG.js";import"./GrupperteDokumenter-_eJQa_Kr.js";import"./guid-CsArkN6i.js";import"./Accordion-DZ4UJZmf.js";import"./Header-CErDdS4_.js";import"./LayoutWrapper-kG9wstCi.js";import"./StatusTag-DdJxqSRW.js";import"./Stroller-C9HoKnMv.js";import"./NoeGikkGalt-CNoHtK7s.js";import"./MinidialogSkjema-CXon6TqK.js";import"./BekreftelseSendtSøknad-hdDBGOKI.js";import"./KontonummerInfo-DpP9QM0T.js";import"./HarIkkeSaker-D5-O-7Gm.js";import"./SøkelenkerPanel-20DXUWDz.js";import"./HarSaker-BPa7K91r.js";import"./SakLink-CB-Zhme5.js";import"./ContentSection-C2JcKIKm.js";import"./Svangerskapspenger-Byi039XD.js";import"./DinPlan-5m3RhAaC.js";import"./Oppgaver-jBtL-jpi.js";import"./OppgaveLenkepanel-Uda2Hd31.js";import"./KontaktOss-BcBeM3ZJ.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
