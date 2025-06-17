import{i as l,j as t}from"./iframe-B7Wne0nc.js";import{h as e,H as s}from"./index-BSvZrEVq.js";import{t as d,m as g}from"./tidslinjeHendelser-By9_NuPK.js";import{s as j}from"./saker-D_WC0uYf.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-Bfj7Zcxv.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-C6QFn_RM.js";import"./skjemanummer-KzM2Eo5j.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-ds4CPk0h.js";import"./useSelectedSak-DJgTd89r.js";import"./useQuery-Bal89Sli.js";import"./api-DYeouuwG.js";import"./sakerUtils-n3XErz7Z.js";import"./Snarveier-CDJMHGud.js";import"./LenkePanel-Do_k-0I4.js";import"./Dokument-CKwNzPhy.js";import"./dokumenterUtils-BJOnZlhG.js";import"./Tag-DyqBPTdq.js";import"./GrupperteDokumenter-DFGcuP-_.js";import"./guid-CsArkN6i.js";import"./Header-DxvOlzf3.js";import"./LayoutWrapper-CjvcC1qy.js";import"./StatusTag-DGqNoUYQ.js";import"./Stroller-DC8HrfZK.js";import"./NoeGikkGalt-B7o16MOe.js";import"./MinidialogSkjema-BiiIb0b0.js";import"./BekreftelseSendtSøknad-CacXc9as.js";import"./KontonummerInfo-CNXGLkJv.js";import"./HarIkkeSaker-Cfyq-TJG.js";import"./SøkelenkerPanel-CO42gtSv.js";import"./HarSaker-JP17qWa9.js";import"./SakLink-CuYZKmuj.js";import"./ContentSection-F9y7G6tI.js";import"./Svangerskapspenger-I5TARh3D.js";import"./DinPlan-C6fzyA0U.js";import"./Oppgaver-B77MG5mv.js";import"./OppgaveLenkepanel-BA3tEA1e.js";import"./KontaktOss-loYAD0lj.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
