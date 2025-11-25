import{i as a,j as t}from"./iframe-Dn6cQFvE.js";import{h as r,H as s}from"./index-U4dfE7uK.js";import{t as p,m as l}from"./tidslinjeHendelser-CUDjWJ6M.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-D4CHp4Ec.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-G5Bn0psQ.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-_UIE7--9.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-Byx2eKgn.js";import"./useBackgroundColor-iu_-bsoy.js";import"./useSelectedSak-CzSKkji7.js";import"./useQuery-CFTfs3Cy.js";import"./sakerUtils-DdVwG0Mi.js";import"./Snarveier-rEJSq9bj.js";import"./LenkePanel-zTXR5gCJ.js";import"./index-C9zbidwy.js";import"./Header-CGqcEWp-.js";import"./LayoutWrapper-DGBMSM6Y.js";import"./StatusTag-CQpZI14q.js";import"./Tag-DIAyDZc7.js";import"./Stroller-UwwQOQe7.js";import"./NoeGikkGalt-CyoajXxT.js";import"./MinidialogSkjema-B1u2YjAR.js";import"./HarIkkeSaker-CpJD7ZcN.js";import"./SøkelenkerPanel-CWsDAOs9.js";import"./HarSaker-jdEiVAEF.js";import"./SakLink-xswpYq3e.js";import"./guid-CsArkN6i.js";import"./ContentSection-WolNphwP.js";import"./BekreftelseSendtSøknad-BQQ3wzSg.js";import"./KontonummerInfo-Iy8D4KWf.js";import"./Accordion-BOdn_fc1.js";import"./Svangerskapspenger-BvPlml0T.js";import"./DinPlan-CtOUPzy3.js";import"./Oppgaver-Bq7kwoPY.js";import"./OppgaveLenkepanel-Bs2JsrsT.js";import"./KontaktOss-ZOoG2jC3.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
