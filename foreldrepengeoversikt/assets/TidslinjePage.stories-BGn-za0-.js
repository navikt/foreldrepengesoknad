import{i as m,j as t}from"./iframe-CxGRv-N3.js";import{h as e,H as s}from"./index-B0oCnPCV.js";import{t as p,m as a}from"./tidslinjeHendelser-BM1QaPrU.js";import{s as l}from"./saker-kFq0-jeV.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-CY87y_G9.js";import{M as d,R as g,a as j}from"./chunk-EF7DTUVF-B0d3na9A.js";import"./skjemanummer-DfSDWumy.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-DdAmbsHo.js";import"./useSelectedSak-DN5f5UrP.js";import"./useQuery-DLEKfLGm.js";import"./api-JhJO7PB7.js";import"./sakerUtils-CX5JpYM9.js";import"./Snarveier-Bz48Yf0y.js";import"./LenkePanel-BRXTBAGN.js";import"./Dokument-DhwwaGoR.js";import"./dokumenterUtils-C8Q8Wubn.js";import"./Tag-Fwrf-dz2.js";import"./GrupperteDokumenter-EzI39k1M.js";import"./guid-CsArkN6i.js";import"./Header-BMNKmVYf.js";import"./LayoutWrapper-Dqa-Ft-X.js";import"./StatusTag-P5LhWYeo.js";import"./Stroller-CAI0fcaE.js";import"./NoeGikkGalt-Ddq-bs7X.js";import"./MinidialogSkjema-IDCq-8WC.js";import"./BekreftelseSendtSøknad-YAm74--f.js";import"./KontonummerInfo-C5f5fYKI.js";import"./HarIkkeSaker-BORbN2r8.js";import"./SøkelenkerPanel-D9jVnHUh.js";import"./HarSaker-BrGLfw-_.js";import"./SakLink-C-r_j_ue.js";import"./ContentSection-CxIC10mD.js";import"./Svangerskapspenger-LM1fIvdk.js";import"./DinPlan-BObtDVUi.js";import"./Oppgaver-CBI2xTOI.js";import"./OppgaveLenkepanel-myPvJR07.js";import"./KontaktOss-D7CauR7v.js";const Z={title:"TidslinjePage",component:o,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(o,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const tt=["Default"];export{r as Default,tt as __namedExportsOrder,Z as default};
