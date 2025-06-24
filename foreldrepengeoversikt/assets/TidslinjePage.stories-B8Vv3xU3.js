import{i as l,j as t}from"./iframe-DX72ucYV.js";import{h as e,H as s}from"./index-D0_SQ3Lt.js";import{t as d,m as g}from"./tidslinjeHendelser-BAVdJWAz.js";import{s as j}from"./saker-BHXuVBTs.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as o}from"./ForeldrepengeoversiktRoutes-JuxgCicf.js";import{M as f,R as k,a as u}from"./chunk-NL6KNZEE-BurtXCNU.js";import"./skjemanummer-C98ghbKB.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-B6fnPEsw.js";import"./useSelectedSak-Bhvh4fEB.js";import"./useQuery-DZBVDuY9.js";import"./api-Blv5udmg.js";import"./sakerUtils-DBmAdM4M.js";import"./Snarveier-nZOJSLJ0.js";import"./LenkePanel-Bvb0Fimp.js";import"./Dokument-DUE5q7uX.js";import"./dokumenterUtils-N-8zeTjw.js";import"./Tag-Dgr1Pq3G.js";import"./GrupperteDokumenter-DAQ6obuQ.js";import"./guid-CsArkN6i.js";import"./Header-CmIuIC1U.js";import"./LayoutWrapper-EKpJOTkL.js";import"./StatusTag-DmT5zz2Q.js";import"./Stroller-ZFpevoy7.js";import"./NoeGikkGalt-BTTo_6nb.js";import"./MinidialogSkjema-CtZKE7M8.js";import"./BekreftelseSendtSøknad-0be8E8iI.js";import"./KontonummerInfo-BajOnb68.js";import"./HarIkkeSaker-r1hly9v5.js";import"./SøkelenkerPanel-C3LJpfke.js";import"./HarSaker-M99XVkcr.js";import"./SakLink-DtuvlwNH.js";import"./ContentSection-fWaf3xX6.js";import"./Svangerskapspenger-BR9LjKhm.js";import"./DinPlan-CltO32-x.js";import"./Oppgaver-BUCrHvSC.js";import"./OppgaveLenkepanel-BJm3DzBs.js";import"./KontaktOss-DHp6wvNI.js";const et={title:"TidslinjePage",component:o,decorators:[l],render:a=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(k,{children:t.jsx(u,{element:t.jsx(o,{...a}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(j)),e.get(".//rest/innsyn/tidslinje",()=>s.json(d)),e.get(".//rest/historikk/vedlegg",()=>s.json(g))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
