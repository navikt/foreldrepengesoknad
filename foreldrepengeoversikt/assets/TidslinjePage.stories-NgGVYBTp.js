import{i as a,j as t}from"./iframe-eTGQdXfF.js";import{h as r,H as s}from"./index-BtS2BgTv.js";import{t as p,m as l}from"./tidslinjeHendelser-ByU-G0e0.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-l60335T5.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DGEQ3XXn.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-ByKIykCk.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-C8bxVbvv.js";import"./useBackgroundColor-YMyUxMh0.js";import"./useSelectedSak-CsSY5ZrB.js";import"./useQuery-D4huDOxn.js";import"./sakerUtils-CUP99mGj.js";import"./Snarveier-BmMeOTjT.js";import"./LenkePanel-DLjXu6oV.js";import"./index-B0CZDFWm.js";import"./Header-bNA_nLNv.js";import"./LayoutWrapper-zZuMr0ns.js";import"./StatusTag-D2wKu6LV.js";import"./Tag-B_lnmBfI.js";import"./Stroller-Bl8eQPFY.js";import"./NoeGikkGalt-BAMlP3r5.js";import"./MinidialogSkjema-Dt0EiSRv.js";import"./HarIkkeSaker-DP0xubzq.js";import"./SøkelenkerPanel-BMQAcFWt.js";import"./HarSaker-CzXUkMt1.js";import"./SakLink-DeAG7bit.js";import"./guid-CsArkN6i.js";import"./ContentSection-BWSavvxN.js";import"./BekreftelseSendtSøknad-DudHhBac.js";import"./KontonummerInfo-C8zkDry1.js";import"./Accordion-sPGM3D2a.js";import"./Svangerskapspenger-D0_SjsOe.js";import"./DinPlan-D2SyjWLZ.js";import"./Oppgaver-CmCB-L3M.js";import"./OppgaveLenkepanel-DP2b1xfu.js";import"./KontaktOss-zobQwqZX.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
