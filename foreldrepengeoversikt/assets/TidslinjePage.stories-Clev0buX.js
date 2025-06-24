import{i as l,j as t}from"./iframe-DxFZ06qT.js";import{h as e,H as s}from"./index-C0bCjlV-.js";import{t as d,m as g}from"./tidslinjeHendelser-C8lwh3Wt.js";import{s as j}from"./saker-D0-ibD9v.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-BetCRH--.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-Bv0nc5V8.js";import"./skjemanummer-DLpcJKlO.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-CZm4J5G_.js";import"./useSelectedSak-BAnUAxww.js";import"./useQuery-DmBVe2Fh.js";import"./api-zY496WjV.js";import"./sakerUtils-CbR7RypM.js";import"./Snarveier-lN9v1tX1.js";import"./LenkePanel-BOdGdlFA.js";import"./Dokument-BFHvuCdT.js";import"./dokumenterUtils-akszLnDs.js";import"./Tag-C9EE2pKT.js";import"./GrupperteDokumenter-CWIfX9iC.js";import"./guid-CsArkN6i.js";import"./Header-DWLusS9M.js";import"./LayoutWrapper-DsqGyM4u.js";import"./StatusTag-DqoiGpBL.js";import"./Stroller-BgxBzA0I.js";import"./NoeGikkGalt-BiiJlLML.js";import"./MinidialogSkjema-18j67Yvd.js";import"./BekreftelseSendtSøknad-D46PicrE.js";import"./KontonummerInfo-r3SZjWUo.js";import"./HarIkkeSaker-DrWzlRnK.js";import"./SøkelenkerPanel-BkZIVWFg.js";import"./HarSaker-B3fQhHSx.js";import"./SakLink-DKhWcMZ7.js";import"./ContentSection-DkcmiNG9.js";import"./Svangerskapspenger-C_TQ3UzE.js";import"./DinPlan-Bml8oxKc.js";import"./Oppgaver-BtPnuISb.js";import"./OppgaveLenkepanel-BtCa4_hR.js";import"./KontaktOss-DB6G22cj.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
