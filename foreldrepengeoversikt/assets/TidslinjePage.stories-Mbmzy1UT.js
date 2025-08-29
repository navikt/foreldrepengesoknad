import{i as m,j as t}from"./iframe-Dx1z83Ao.js";import{h as e,H as s}from"./index-Cz7LLL7u.js";import{t as p,m as a}from"./tidslinjeHendelser-BLT7Cbo-.js";import{s as l}from"./saker-BBhTtZxP.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-BVmSltRd.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-DwwQbxh5.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-NNWQZNhl.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-B8nyUQcS.js";import"./useSelectedSak-D8PT3MP1.js";import"./useQuery-C3Af0cjs.js";import"./api-8CPqgtae.js";import"./sakerUtils-Crc6R2p-.js";import"./Snarveier-DUb2kejw.js";import"./LenkePanel-BZlD1UzJ.js";import"./index-CJt0AWGc.js";import"./Dokument-JhS_PRY3.js";import"./dokumenterUtils-CRNa2Qme.js";import"./Tag-D6Fqq7V7.js";import"./GrupperteDokumenter-C3JLZMGz.js";import"./guid-CsArkN6i.js";import"./Accordion-D4eHHEku.js";import"./Header-Csp0Y9ff.js";import"./LayoutWrapper-B2O-YYCJ.js";import"./StatusTag-ttdw672S.js";import"./Stroller-CUSMxgNB.js";import"./NoeGikkGalt-DDRIS7UG.js";import"./MinidialogSkjema-VMcVE7uj.js";import"./BekreftelseSendtSøknad-D3d-MCfq.js";import"./KontonummerInfo-CsJbZ3-v.js";import"./HarIkkeSaker-cr0vf7se.js";import"./SøkelenkerPanel-7cBYuZFR.js";import"./HarSaker-ejI4Cv-B.js";import"./SakLink-B_V6TjkW.js";import"./ContentSection-BozZ3jVm.js";import"./Svangerskapspenger-Hr1zdlwT.js";import"./DinPlan-BKH0ps_t.js";import"./Oppgaver-ClzQSb7I.js";import"./OppgaveLenkepanel-6jF04noh.js";import"./KontaktOss-H3JYpL5A.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
