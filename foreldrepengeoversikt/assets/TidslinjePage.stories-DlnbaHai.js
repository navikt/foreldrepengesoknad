import{i as m,j as t}from"./iframe-B32evDWZ.js";import{h as e,H as s}from"./index-oJ7eYyfF.js";import{t as p,m as a}from"./tidslinjeHendelser-BWTOBloK.js";import{s as l}from"./saker-4MeP-1NR.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-Begl-ifu.js";import{M as d,R as g,a as j}from"./chunk-EF7DTUVF-BctMXm57.js";import"./skjemanummer-Sn8w2Hku.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-CIUV8gYZ.js";import"./useSelectedSak-Duauv8DJ.js";import"./useQuery-0uLNDPpC.js";import"./api-DNiL4QzO.js";import"./sakerUtils-DL9nPtMR.js";import"./Snarveier-BR2Wf2AS.js";import"./LenkePanel-CfvBl2hc.js";import"./Dokument-1nbbuwKc.js";import"./dokumenterUtils-DlJYEURL.js";import"./Tag-CvNQeNc_.js";import"./GrupperteDokumenter-BPxcbJ0s.js";import"./guid-CsArkN6i.js";import"./Header-yBl0G1DZ.js";import"./LayoutWrapper-DxnbVrj_.js";import"./StatusTag-CydxeXvl.js";import"./Stroller-BakRnG2Q.js";import"./NoeGikkGalt-DA5iJqEe.js";import"./MinidialogSkjema-BeOzW7LI.js";import"./BekreftelseSendtSøknad-BHqIZTWP.js";import"./KontonummerInfo-CwxQ_ECQ.js";import"./HarIkkeSaker-DGhl79ay.js";import"./SøkelenkerPanel-CTSL9Ngc.js";import"./HarSaker-J38xBEuY.js";import"./SakLink-BpY-CIRU.js";import"./ContentSection-4miCLrdt.js";import"./Svangerskapspenger-Be-9L0E_.js";import"./DinPlan-j-r0G6ym.js";import"./Oppgaver-CZdVD1l1.js";import"./OppgaveLenkepanel-BkyzSr8b.js";import"./KontaktOss-BOqKEKGw.js";const Z={title:"TidslinjePage",component:o,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(o,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
