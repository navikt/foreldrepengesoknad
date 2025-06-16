import{i as l,j as t}from"./iframe-Bw55AjnS.js";import{h as e,H as s}from"./index-BsOtLizl.js";import{t as d,m as g}from"./tidslinjeHendelser-BYjI75lt.js";import{s as j}from"./saker-BRlbSkev.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-hHYJ9ihb.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-D_9DSLPk.js";import"./skjemanummer-SDzNDxXH.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-B4pi2JEN.js";import"./useSelectedSak-Dk6gG5nl.js";import"./useQuery-Bqj7qmxV.js";import"./api-BeD9IY8V.js";import"./sakerUtils-C2lV7Pwk.js";import"./Snarveier-DHcW0ABb.js";import"./LenkePanel-BkqMFZxX.js";import"./Dokument-GqOAFGpk.js";import"./dokumenterUtils-DC4efDfv.js";import"./Tag-D1o9nK91.js";import"./GrupperteDokumenter-ClOG85Ng.js";import"./guid-CsArkN6i.js";import"./Header-B3CNVWy5.js";import"./LayoutWrapper-DLuP80xK.js";import"./StatusTag-DOXBjCMP.js";import"./Stroller-CordUTLm.js";import"./NoeGikkGalt-BVAuspmL.js";import"./MinidialogSkjema-BOL5U4kf.js";import"./BekreftelseSendtSøknad-BF-hH-lC.js";import"./KontonummerInfo-D3HNNyc0.js";import"./HarIkkeSaker-mgJdnm2o.js";import"./SøkelenkerPanel-QpKCWnKd.js";import"./HarSaker-HmnoKgAf.js";import"./SakLink-DsoggUvp.js";import"./ContentSection-DSjtgVmd.js";import"./Svangerskapspenger-3gGJTzqZ.js";import"./DinPlan-DHq_BkHP.js";import"./Oppgaver-BXG1Yqx_.js";import"./OppgaveLenkepanel-BSTP7Zh5.js";import"./KontaktOss-cGRHQWCK.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
