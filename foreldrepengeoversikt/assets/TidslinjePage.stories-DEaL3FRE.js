import{i as m,j as t}from"./iframe-Bkv81793.js";import{h as e,H as s}from"./index-ZlsFexqe.js";import{t as p,m as a}from"./tidslinjeHendelser-HfyFQnDB.js";import{s as l}from"./saker-B2mh5odt.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-9gQ2Jm1H.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-C4INPojI.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-tW1m2S8t.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-Yh382_ce.js";import"./useSelectedSak-FSvldSwm.js";import"./useQuery-C0CtHw4M.js";import"./api--ODPVXNN.js";import"./sakerUtils-DFDJXObV.js";import"./Snarveier-TMl72QSJ.js";import"./LenkePanel-Ij2BnMmz.js";import"./index-ynUCD3SE.js";import"./Dokument-DXB7KfXb.js";import"./dokumenterUtils-BRBjVHyJ.js";import"./Tag-BQ_7DMF5.js";import"./GrupperteDokumenter-eEwxBF0-.js";import"./guid-CsArkN6i.js";import"./Accordion-Dsg9WZzq.js";import"./Header-ygm7pfbL.js";import"./LayoutWrapper-OwE69EcG.js";import"./StatusTag-CUzH9141.js";import"./Stroller-Cf-grQjl.js";import"./NoeGikkGalt-BMj4cdJS.js";import"./MinidialogSkjema-SVo5o6D_.js";import"./BekreftelseSendtSøknad-CCDCsNiY.js";import"./KontonummerInfo-DTuuXp_6.js";import"./HarIkkeSaker-DrNNXe55.js";import"./SøkelenkerPanel-Cmp7gg63.js";import"./HarSaker-BLkpVtdN.js";import"./SakLink-Woxb2-ll.js";import"./ContentSection-B4qtGMI-.js";import"./Svangerskapspenger-CTtHX4Wz.js";import"./DinPlan-DiwNi0Hq.js";import"./Oppgaver-XarDXKTm.js";import"./OppgaveLenkepanel-CsZmJr1z.js";import"./KontaktOss-D_xtChsd.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
