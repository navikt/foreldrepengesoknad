import{i as m,j as t}from"./iframe-DKah-zWz.js";import{h as e,H as s}from"./index-CtLxs5gY.js";import{t as p,m as a}from"./tidslinjeHendelser-B8gEIZOc.js";import{s as l}from"./saker-D6ntOrAq.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-ghNulLnw.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-C0SsUr3E.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-C8HltPsQ.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-60A_sYKz.js";import"./useSelectedSak-CfkoVBOZ.js";import"./useQuery-BmN-cqc3.js";import"./api-emMROyLC.js";import"./sakerUtils-4tvw2Ppq.js";import"./Snarveier-4-iU--cK.js";import"./LenkePanel-DtDYYvvK.js";import"./Dokument-D8J25Z4A.js";import"./dokumenterUtils-CRVsCZGO.js";import"./Tag-kgmM9oac.js";import"./GrupperteDokumenter-Bd9bneHO.js";import"./guid-CsArkN6i.js";import"./Header-CNZp4y4f.js";import"./LayoutWrapper-CIQ7AB0R.js";import"./StatusTag-DARQiD1W.js";import"./Stroller-djF1sR6z.js";import"./NoeGikkGalt-BH3wVitY.js";import"./MinidialogSkjema-KhH7yNxj.js";import"./BekreftelseSendtSøknad-o6o9yYQO.js";import"./KontonummerInfo-DV5xiNcQ.js";import"./HarIkkeSaker-DxMZQN_K.js";import"./SøkelenkerPanel-Dr9JnRRl.js";import"./HarSaker-D2j4Sotm.js";import"./SakLink-DkGm7t1b.js";import"./ContentSection-CrRS_Kc_.js";import"./Svangerskapspenger-CzW6RLZY.js";import"./DinPlan-2qJqJfD0.js";import"./Oppgaver-D5p7L1ZA.js";import"./OppgaveLenkepanel-ab-ZmDf8.js";import"./KontaktOss-CUQZMvrT.js";const tt={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const rt=["Default"];export{r as Default,rt as __namedExportsOrder,tt as default};
