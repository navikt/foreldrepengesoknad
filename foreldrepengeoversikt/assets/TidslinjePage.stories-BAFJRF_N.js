import{i as l,j as t}from"./iframe-Ui6H9FKp.js";import{h as e,H as s}from"./index-tvOkpNSO.js";import{t as d,m as g}from"./tidslinjeHendelser-Bep0HwQe.js";import{s as j}from"./saker-CDa9t0uK.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-BSLCegeq.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-DoEMPvTH.js";import"./skjemanummer-BH827EY4.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BSOmcoGA.js";import"./useSelectedSak-CQ8NNs1J.js";import"./useQuery-OB7UwXoN.js";import"./api-jMzK91i7.js";import"./sakerUtils-CA6qPtUr.js";import"./Snarveier-DGCpRL_c.js";import"./LenkePanel-BPjLXS9y.js";import"./Dokument-CLpdbUNy.js";import"./dokumenterUtils-U1pFFjqr.js";import"./Tag-Cn9x64FN.js";import"./GrupperteDokumenter-CfpA3-fj.js";import"./guid-CsArkN6i.js";import"./Header-D-LwQtGh.js";import"./LayoutWrapper-BO8wZfqx.js";import"./StatusTag-DuC7N8pU.js";import"./Stroller-uhLOXyWY.js";import"./NoeGikkGalt-BFSZTN6j.js";import"./MinidialogSkjema-Bltdg7H-.js";import"./BekreftelseSendtSøknad-Ux_ZxFDe.js";import"./KontonummerInfo-D9O0XcxD.js";import"./HarIkkeSaker-C4iOTY6o.js";import"./SøkelenkerPanel-XoKzZ70r.js";import"./HarSaker-Dtq5FuYw.js";import"./SakLink-dLS3_OJA.js";import"./ContentSection-CmgUOI4J.js";import"./Svangerskapspenger-DOUVsxp0.js";import"./DinPlan-rq9P4h3H.js";import"./Oppgaver-DECwjipV.js";import"./OppgaveLenkepanel-3IKRO3cr.js";import"./KontaktOss-BLAVx9i9.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const st=["Default"];export{r as Default,st as __namedExportsOrder,et as default};
