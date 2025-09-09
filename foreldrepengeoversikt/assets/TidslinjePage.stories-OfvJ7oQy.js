import{i as m,j as t}from"./iframe-Bn58G2bq.js";import{h as e,H as s}from"./index-DeUM1XTx.js";import{t as p,m as a}from"./tidslinjeHendelser-gTCt46jy.js";import{s as l}from"./saker-CRQ-mpY3.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-C0v8-iph.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-BXr_P_Q5.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BpVc3nNW.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-DZdezhm2.js";import"./useSelectedSak-jEilrTM-.js";import"./useQuery-OyZRUWIW.js";import"./api-DVaOkbq7.js";import"./sakerUtils-aJ1P1vDZ.js";import"./Snarveier-YJQHcuM-.js";import"./LenkePanel-C0OKZbMg.js";import"./index-slRXh6tA.js";import"./Dokument-DwJBVAg6.js";import"./dokumenterUtils-DrM2hICo.js";import"./Tag-BfZ7IFSM.js";import"./GrupperteDokumenter-DsZHuKS6.js";import"./guid-CsArkN6i.js";import"./Accordion-Chvhd3sX.js";import"./Header-s3em5Rje.js";import"./LayoutWrapper-CNO2zgA0.js";import"./StatusTag-BugXLjKK.js";import"./Stroller-BDYTedeU.js";import"./NoeGikkGalt-mPPUM6LC.js";import"./MinidialogSkjema-vIU1fadm.js";import"./BekreftelseSendtSøknad-C8gIUC96.js";import"./KontonummerInfo-CmROjxmS.js";import"./HarIkkeSaker-B1kKl1Vb.js";import"./SøkelenkerPanel-D2MV5fBy.js";import"./HarSaker-Dvi_bhkr.js";import"./SakLink-BrbM-XpP.js";import"./ContentSection-0EEOL8lR.js";import"./Svangerskapspenger-CYVnZYcM.js";import"./DinPlan-CgGgBm-I.js";import"./Oppgaver-Dlle-wC2.js";import"./OppgaveLenkepanel-CSvyfXdH.js";import"./KontaktOss-7N8GtWaW.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
