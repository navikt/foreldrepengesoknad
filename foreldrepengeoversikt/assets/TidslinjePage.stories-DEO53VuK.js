import{i as a,j as t}from"./iframe-Dp8-w_m2.js";import{h as r,H as s}from"./index-DmJ8WYjV.js";import{t as p,m as l}from"./tidslinjeHendelser-BMZmbtyM.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-IZJ1MFrC.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BDU3q9fV.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-CgwDaFFC.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-D1Jdvft9.js";import"./useBackgroundColor-DycU1OCY.js";import"./useSelectedSak-CZhe61AY.js";import"./useQuery-kXRujveY.js";import"./sakerUtils-QGi7qLE0.js";import"./Snarveier-B-gQvZOK.js";import"./LenkePanel-B7cuMEFE.js";import"./index-DwUxks2o.js";import"./Header-BknTR96A.js";import"./LayoutWrapper-CcIAe7JV.js";import"./StatusTag-BeKCtD81.js";import"./Tag-CVhAj1X9.js";import"./Stroller-Df7O-ZRX.js";import"./NoeGikkGalt-BmCKTPY1.js";import"./MinidialogSkjema-D7AQfNus.js";import"./HarIkkeSaker--9R79dot.js";import"./SøkelenkerPanel-BjSmlwuj.js";import"./HarSaker-uz1GgmEk.js";import"./SakLink-CVYXaNYd.js";import"./guid-CsArkN6i.js";import"./ContentSection-CjqBdxEN.js";import"./BekreftelseSendtSøknad-DAGa42OL.js";import"./KontonummerInfo-BkxbDqOY.js";import"./Accordion-B3WVRTzO.js";import"./Svangerskapspenger-D5A452tX.js";import"./DinPlan-C0e82XwK.js";import"./Oppgaver-Dv1ykTqG.js";import"./OppgaveLenkepanel-eTxzZDg_.js";import"./KontaktOss-DUN673Si.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
