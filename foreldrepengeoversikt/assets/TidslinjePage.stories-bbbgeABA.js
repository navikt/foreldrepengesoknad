import{i as m,j as t}from"./iframe-Baoq88Fe.js";import{h as e,H as s}from"./index-DblHznge.js";import{t as p,m as a}from"./tidslinjeHendelser-D-xTkQPs.js";import{s as l}from"./saker-DoO48uxw.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-Brs2U7ui.js";import{M as d,R as g,a as j}from"./chunk-EF7DTUVF-BvOFs0KQ.js";import"./skjemanummer-B4VNiHIk.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BRvgRZfE.js";import"./useSelectedSak-rGpYydVI.js";import"./useQuery-D1YKbV9M.js";import"./api-hQm1_me2.js";import"./sakerUtils-6UWt1QJM.js";import"./Snarveier-kd57qi5l.js";import"./LenkePanel-DaEnUprO.js";import"./Dokument-CdDZWZt2.js";import"./dokumenterUtils-DRdq1CND.js";import"./Tag-l7ulZf3T.js";import"./GrupperteDokumenter-DQhFXVdC.js";import"./guid-CsArkN6i.js";import"./Header-Ymuv3e6o.js";import"./LayoutWrapper-BlZ0ES8X.js";import"./StatusTag-Ddy2CxUY.js";import"./Stroller-D2Uc72ma.js";import"./NoeGikkGalt-C5i3H-SN.js";import"./MinidialogSkjema-nyQsl2RO.js";import"./BekreftelseSendtSøknad-BKoT9TZl.js";import"./KontonummerInfo-BBqLX_UL.js";import"./HarIkkeSaker-DQgtHPZe.js";import"./SøkelenkerPanel-C6WFfGvU.js";import"./HarSaker-B5xJRSmR.js";import"./SakLink-7DpP9Gsr.js";import"./ContentSection-BHScy55T.js";import"./Svangerskapspenger-Dr_F6G9k.js";import"./DinPlan-CiyFkbh3.js";import"./Oppgaver-CR3XMza5.js";import"./OppgaveLenkepanel-BQ8FFNi8.js";import"./KontaktOss-BqoKCqx7.js";const Z={title:"TidslinjePage",component:o,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(o,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
