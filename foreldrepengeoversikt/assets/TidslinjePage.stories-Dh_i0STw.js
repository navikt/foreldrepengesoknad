import{i as m,j as t}from"./iframe-DCXGowBy.js";import{h as e,H as s}from"./index-CW50hLtf.js";import{t as p,m as a}from"./tidslinjeHendelser-D8kntYVC.js";import{s as l}from"./saker-B6yN9vQP.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-BQXggMvx.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-Bu0TNm6p.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-xZFFZDtX.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BYcr3nnj.js";import"./useSelectedSak-BNsaCJHw.js";import"./useQuery-DHyj_4CN.js";import"./api-C8ezB4Dl.js";import"./sakerUtils-DcfY4jYi.js";import"./Snarveier-yNz98_Ww.js";import"./LenkePanel-CE58ecod.js";import"./index-BMM3-nqT.js";import"./Dokument-COX-fh4Y.js";import"./dokumenterUtils-CUPaIhKZ.js";import"./Tag-BV-iTgsE.js";import"./GrupperteDokumenter-ByZe9_MQ.js";import"./guid-CsArkN6i.js";import"./Accordion-BMR-mghI.js";import"./Header-CMoB-GU1.js";import"./LayoutWrapper-Fgv9jP72.js";import"./StatusTag-DcgMxzvW.js";import"./Stroller-CzPDeyyd.js";import"./NoeGikkGalt-wz9PrkoV.js";import"./MinidialogSkjema-B-jESk49.js";import"./BekreftelseSendtSøknad-CKHbc-Jx.js";import"./KontonummerInfo-B9L1z1Ln.js";import"./HarIkkeSaker-hqlgMNWm.js";import"./SøkelenkerPanel-DghJZ20j.js";import"./HarSaker-BZtAsIBn.js";import"./SakLink-B4d0ThJE.js";import"./ContentSection-CZi5xWlC.js";import"./Svangerskapspenger-C5CqROuF.js";import"./DinPlan-BKlQYKa_.js";import"./Oppgaver-J8z0xHPl.js";import"./OppgaveLenkepanel-D32UgDdM.js";import"./KontaktOss-DiQbldbP.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
