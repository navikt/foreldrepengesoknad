import{i as l,j as t}from"./iframe-CbjlfzRz.js";import{h as e,H as s}from"./index-QfaYdV1a.js";import{t as d,m as g}from"./tidslinjeHendelser-Bp1moX47.js";import{s as j}from"./saker-MRFGJa4q.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-CTlSLlrW.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-DRu4oqAk.js";import"./skjemanummer-78ecJqP8.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-D9PLoySm.js";import"./useSelectedSak-C68P6lOS.js";import"./useQuery-ccqG3gLy.js";import"./api-DvOYiSou.js";import"./sakerUtils-BgVNcEGO.js";import"./Snarveier-DeU7myM5.js";import"./LenkePanel-CbPKorgh.js";import"./Dokument-DM_gXq9Z.js";import"./dokumenterUtils-Dwj2f2WR.js";import"./Tag-DAM9p75_.js";import"./GrupperteDokumenter-DNSksHX0.js";import"./guid-CsArkN6i.js";import"./Header-D5XFo5BY.js";import"./LayoutWrapper-B3xyErZg.js";import"./StatusTag-Db8a4mSZ.js";import"./Stroller-DjXiDAmZ.js";import"./NoeGikkGalt-B0Fk5Fc-.js";import"./MinidialogSkjema-CVe2NJZ8.js";import"./BekreftelseSendtSøknad-zduZ4aE2.js";import"./KontonummerInfo-8K7Ut3Sq.js";import"./HarIkkeSaker-B5e6t-8f.js";import"./SøkelenkerPanel-C7mQ6Ksa.js";import"./HarSaker-ySL7pBz7.js";import"./SakLink-C5lvtEmX.js";import"./ContentSection-BWYGItRU.js";import"./Svangerskapspenger-CQGgFP9l.js";import"./DinPlan-nWUEXxYg.js";import"./Oppgaver-nY0Wpzea.js";import"./OppgaveLenkepanel-D5sZlEyB.js";import"./KontaktOss-BlFqBTCd.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
