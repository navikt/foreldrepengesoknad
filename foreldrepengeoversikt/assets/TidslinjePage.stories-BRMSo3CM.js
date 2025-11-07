import{i as a,j as t}from"./iframe-Ddv1Eb5y.js";import{h as r,H as s}from"./index-BAI9lvGD.js";import{t as p,m as l}from"./tidslinjeHendelser-CXWCas2S.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./api-71hnFjKz.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BPAiM2KK.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-wP84C7d9.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-Bs1vQB8m.js";import"./useBackgroundColor-C0KErJri.js";import"./useSelectedSak-BY605qkA.js";import"./useQuery-cSS-AcSa.js";import"./sakerUtils-ni9FgGa9.js";import"./Snarveier-D2aptKrL.js";import"./LenkePanel-DEPZmPuX.js";import"./index-Dd_1t9FR.js";import"./Header-DpTDGTFA.js";import"./LayoutWrapper-_hWZ84UE.js";import"./StatusTag-BSQ7Y80Y.js";import"./Tag-DnITFdR2.js";import"./Stroller-B-b5oIPB.js";import"./NoeGikkGalt-C7zsR2o0.js";import"./MinidialogSkjema-pMj4Etqc.js";import"./HarIkkeSaker-C4QZnxgu.js";import"./SøkelenkerPanel-B-mxSktB.js";import"./HarSaker-B5ch9qes.js";import"./SakLink-B8VYY4H5.js";import"./guid-CsArkN6i.js";import"./ContentSection-BcxGJmRw.js";import"./BekreftelseSendtSøknad-ByP5RD_b.js";import"./KontonummerInfo-Dt2_0TvU.js";import"./Accordion-Ds-vDjDA.js";import"./Svangerskapspenger-vpbqSXbS.js";import"./DinPlan-Cp7XRcRa.js";import"./Oppgaver-DjeJ3z4U.js";import"./OppgaveLenkepanel-CIPpedfB.js";import"./KontaktOss-CK48BzLA.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
