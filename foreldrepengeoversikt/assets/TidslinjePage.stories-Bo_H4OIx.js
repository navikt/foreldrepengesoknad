import{i as a,j as t}from"./iframe-DNOy4JUF.js";import{h as r,H as o}from"./index-e8ephae1.js";import{t as p,m as l}from"./tidslinjeHendelser-BXMMdfPc.js";import{s as d}from"./saker-DfToYMsp.js";import{A as s}from"./api-DI05QCAf.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-B55FuRIn.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-7UmLIOh5.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CFP1_b2a.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-p_4PoFH7.js";import"./useSelectedSak-CvKRdU9u.js";import"./useQuery-DBYh9zHV.js";import"./sakerUtils-Ck0a8V8r.js";import"./Snarveier-D49zHAY3.js";import"./LenkePanel-D-LZGJ6k.js";import"./index-B7g2CdZt.js";import"./Header-Bb0N8MbL.js";import"./LayoutWrapper-D1YQ0OOs.js";import"./StatusTag-BU1Fx2TU.js";import"./Tag-aoIe89nX.js";import"./Stroller-fA9YNmnn.js";import"./NoeGikkGalt-bgfVST9S.js";import"./MinidialogSkjema-KAEiD9oK.js";import"./HarIkkeSaker-KRO-cyVx.js";import"./SøkelenkerPanel-DQSeXeVG.js";import"./HarSaker-CgCcfpVc.js";import"./SakLink-CvByMYg7.js";import"./guid-CsArkN6i.js";import"./ContentSection-0vCQh2Al.js";import"./BekreftelseSendtSøknad-BuOd1P7c.js";import"./KontonummerInfo-qVHNHOJK.js";import"./Accordion-CLFqI2GM.js";import"./Svangerskapspenger-DscxYATo.js";import"./DinPlan-Dv8ph-Aq.js";import"./Oppgaver-Itq1BQkP.js";import"./OppgaveLenkepanel-Dz9GcDQD.js";import"./KontaktOss-ICdJpkGZ.js";const tt={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(s.saker,()=>o.json(d)),r.get(s.tidslinje,()=>o.json(p)),r.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg))]
    }
  },
  args: {
    søkersBarn: [{
      navn: {
        fornavn: 'Olga',
        etternavn: 'Utvikler'
      },
      fnr: '23232424',
      fødselsdato: '2024-01-01',
      kjønn: 'K'
    }]
  }
}`,...e.parameters?.docs?.source}}};const et=["Default"];export{e as Default,et as __namedExportsOrder,tt as default};
