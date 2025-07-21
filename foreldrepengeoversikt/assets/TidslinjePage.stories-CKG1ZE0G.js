import{i as m,j as t}from"./iframe-gzxcU_QU.js";import{h as e,H as s}from"./index-C7NVZGxv.js";import{t as p,m as a}from"./tidslinjeHendelser-Cj_iv2SP.js";import{s as l}from"./saker-B3p8KAsi.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-Ce6PvXLp.js";import{M as d,R as g,a as j}from"./chunk-EF7DTUVF-XdFoIY5j.js";import"./skjemanummer-DPdZCFti.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-B_OovWjH.js";import"./useSelectedSak-DevZo2T-.js";import"./useQuery-DUc9WJSJ.js";import"./api-CnbKW-es.js";import"./sakerUtils-Cp6uqLYw.js";import"./Snarveier-BPnZgimU.js";import"./LenkePanel-BdWPkRlF.js";import"./Dokument-Bi57XsK7.js";import"./dokumenterUtils-BPr3-Kps.js";import"./Tag-DnnEkj5k.js";import"./GrupperteDokumenter-BYgttWk1.js";import"./guid-CsArkN6i.js";import"./Header-B29KgrTf.js";import"./LayoutWrapper-ZZOPnXBr.js";import"./StatusTag-CECNz74N.js";import"./Stroller-D6uEvxcr.js";import"./NoeGikkGalt-CJBAGig4.js";import"./MinidialogSkjema-BKouql2I.js";import"./BekreftelseSendtSøknad-BUSlI0QE.js";import"./KontonummerInfo-DUDiZnjn.js";import"./HarIkkeSaker-D-4YJ8ni.js";import"./SøkelenkerPanel-BYEqFMzG.js";import"./HarSaker-BydPZ_YI.js";import"./SakLink-kWLCjCs5.js";import"./ContentSection-CfkUuY22.js";import"./Svangerskapspenger-Cj4x6355.js";import"./DinPlan-DoFbhRHC.js";import"./Oppgaver-D37kOtcA.js";import"./OppgaveLenkepanel-CdIMqcGl.js";import"./KontaktOss-DZ7AY-Ah.js";const Z={title:"TidslinjePage",component:o,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(o,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
