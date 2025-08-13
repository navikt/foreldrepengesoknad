import{i as m,j as t}from"./iframe-BKgqfQS5.js";import{h as e,H as s}from"./index-D5Ul5H-e.js";import{t as p,m as a}from"./tidslinjeHendelser-Cb8rB1mO.js";import{s as l}from"./saker-CQbetBRq.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-BLQu3cKR.js";import{M as d,R as g,a as j}from"./chunk-EF7DTUVF-Dkk_ot6P.js";import"./skjemanummer-D5HqxyeA.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-D4RAELXW.js";import"./useSelectedSak-BOHJpS_N.js";import"./useQuery-BZ5_hpJm.js";import"./api-BH_etv-Q.js";import"./sakerUtils-Baum3Z3l.js";import"./Snarveier-CWtMu7MN.js";import"./LenkePanel-CZ-W03-3.js";import"./Dokument-BZcR9rHP.js";import"./dokumenterUtils-DEaA06pd.js";import"./Tag-BWMiEq9D.js";import"./GrupperteDokumenter-CbzedZ_X.js";import"./guid-CsArkN6i.js";import"./Header-XgHssl-S.js";import"./LayoutWrapper-Cm9Usfdv.js";import"./StatusTag-DcPieOOq.js";import"./Stroller-BMwIVbgv.js";import"./NoeGikkGalt-D93QIRiS.js";import"./MinidialogSkjema-0MNlUxYB.js";import"./BekreftelseSendtSøknad-B7ibD3YM.js";import"./KontonummerInfo-h0MagA0v.js";import"./HarIkkeSaker-Bfze6BQ9.js";import"./SøkelenkerPanel-CfZ4yqUT.js";import"./HarSaker-NnxGTCdj.js";import"./SakLink-Dqy3drv1.js";import"./ContentSection-BMlP1mJq.js";import"./Svangerskapspenger-Dd1aX9I8.js";import"./DinPlan-D3yKBF0H.js";import"./Oppgaver-C0W3SvHt.js";import"./OppgaveLenkepanel-DY2ALoGe.js";import"./KontaktOss-Bokpyylq.js";const Z={title:"TidslinjePage",component:o,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(o,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
