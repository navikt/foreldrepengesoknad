import{i as a,j as t}from"./iframe-CqGsn30k.js";import{h as r,H as s}from"./index-CjbZbzR5.js";import{t as p,m as l}from"./tidslinjeHendelser-CmTlh3T0.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./api-DSgWObfO.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-COviZedq.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-CIxvWd8a.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-sUskyJmB.js";import"./useBackgroundColor-DpPQBXEz.js";import"./useSelectedSak-BbgKg6q3.js";import"./useQuery-BR6BDEnN.js";import"./sakerUtils-3zvqjApU.js";import"./Snarveier-BTVRGdGN.js";import"./LenkePanel-CXLEbZwq.js";import"./index-CdagP5ro.js";import"./Header-_BEKqR9b.js";import"./LayoutWrapper-BQRR7n-3.js";import"./StatusTag-Cn7y0Ity.js";import"./Tag-BFVvRtDs.js";import"./Stroller-CuSqs8Kf.js";import"./NoeGikkGalt-CyM3tKLn.js";import"./MinidialogSkjema-DKdDc7p9.js";import"./HarIkkeSaker-CuQnwM4m.js";import"./SøkelenkerPanel--q2siKVM.js";import"./HarSaker-B56PE4Ug.js";import"./SakLink-CKSdus-g.js";import"./guid-CsArkN6i.js";import"./ContentSection-CyEp7QCM.js";import"./BekreftelseSendtSøknad-DKBu67zq.js";import"./KontonummerInfo-BobfFBtQ.js";import"./Accordion-ASqMWeKT.js";import"./Svangerskapspenger-BR4lPQUb.js";import"./DinPlan-Oertw3B9.js";import"./Oppgaver-IqwX1LMF.js";import"./OppgaveLenkepanel-jcaJH7zX.js";import"./KontaktOss-CQhq97ok.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
