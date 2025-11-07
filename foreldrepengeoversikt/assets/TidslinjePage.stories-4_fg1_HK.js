import{i as a,j as t}from"./iframe-B-Aegudx.js";import{h as r,H as s}from"./index-q8AYWPvw.js";import{t as p,m as l}from"./tidslinjeHendelser-CgT5du_H.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./api-BV7JOcPn.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BX3P2hBj.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-rrOHIuv0.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DHIChXHm.js";import"./useBackgroundColor-BVRi2iWZ.js";import"./useSelectedSak-gDQR3GUX.js";import"./useQuery-Ccg11EAh.js";import"./sakerUtils-C5arsvhr.js";import"./Snarveier-BBARWLkJ.js";import"./LenkePanel-DGpcbq_P.js";import"./index-qIS9kLJc.js";import"./Header-DSKzmz9-.js";import"./LayoutWrapper-BaE3JSuo.js";import"./StatusTag-CqH0Z3V6.js";import"./Tag-DEDQjda-.js";import"./Stroller-BG0DJHpr.js";import"./NoeGikkGalt-wb3rKMuB.js";import"./MinidialogSkjema-2DCf6FFT.js";import"./HarIkkeSaker-DIVeYzlp.js";import"./SøkelenkerPanel-Csf02oJ7.js";import"./HarSaker-BHESq-6-.js";import"./SakLink-BpTsf3Eh.js";import"./guid-CsArkN6i.js";import"./ContentSection-D7lkaMCM.js";import"./BekreftelseSendtSøknad-Dq0wxxH6.js";import"./KontonummerInfo-CkpgD6nq.js";import"./Accordion-DaGWNwJJ.js";import"./Svangerskapspenger-B-sWHFnR.js";import"./DinPlan-BWIBKKdJ.js";import"./Oppgaver-C3DwTHRS.js";import"./OppgaveLenkepanel-Cw8ibPu9.js";import"./KontaktOss-DJgDaibT.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const tt=["Default"];export{e as Default,tt as __namedExportsOrder,Z as default};
