import{k as p,j as t}from"./iframe-Cq2SBpjl.js";import{h as e,H as r}from"./index-DOESNTha.js";import{t as a,m as l}from"./tidslinjeHendelser-DESp81Jp.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-DW0UslgV.js";import{A as s}from"./queries-CGZgXRGp.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BS9hO9fR.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-C1Dn-R-F.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-Dj6Sl7UH.js";import"./useBackgroundColor-C_YCa6dU.js";import"./useSelectedSak-Dc890CcV.js";import"./useQuery-D4gFPHbO.js";import"./sakerUtils-CQckKjIx.js";import"./Snarveier-Cfn4Q3q1.js";import"./LenkePanel-DcseBGCA.js";import"./index-B2piYrRl.js";import"./Header-CxbO2wDE.js";import"./LayoutWrapper-Dt4MjEst.js";import"./StatusTag-8dWHwFOq.js";import"./Tag-CBf3Gvbh.js";import"./Stroller-B1pMwmXf.js";import"./NoeGikkGalt-B9GGl2Bi.js";import"./MinidialogSkjema-C3cIMcVQ.js";import"./HarIkkeSaker-YR2lSCOA.js";import"./SøkelenkerPanel-D9JBG-YG.js";import"./HarSaker-C1eNVe_9.js";import"./SakLink-7g9oXo2-.js";import"./guid-CsArkN6i.js";import"./ContentSection-BbQhh-Fs.js";import"./BekreftelseSendtSøknad-3OBcVtz8.js";import"./KontonummerInfo-Bv161f0v.js";import"./Accordion-0qg0wD1F.js";import"./Svangerskapspenger-CUdAPZM4.js";import"./DinPlan-Dmvx7F7q.js";import"./Oppgaver-BM8OdNVZ.js";import"./OppgaveLenkepanel-Ds6QZP9c.js";import"./KontaktOss-Di9Kilqr.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo))]
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
}`,...o.parameters?.docs?.source}}};const rt=["Default"];export{o as Default,rt as __namedExportsOrder,et as default};
