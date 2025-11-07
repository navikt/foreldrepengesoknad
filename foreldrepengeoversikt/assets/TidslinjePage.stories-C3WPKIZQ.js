import{i as a,j as t}from"./iframe-CwWGaVFp.js";import{h as r,H as s}from"./index-B9wFUyq_.js";import{t as p,m as l}from"./tidslinjeHendelser-CrSm8AWA.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./api-D7VtPm8D.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DE5JTBs2.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-ijf6aAfq.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CHRUyD7d.js";import"./useBackgroundColor-CNFEstdS.js";import"./useSelectedSak-CsDhGMFh.js";import"./useQuery-CHgC96rM.js";import"./sakerUtils-B2_fJNwz.js";import"./Snarveier-B-M0U2Hv.js";import"./LenkePanel-Dpk55qcL.js";import"./index-CNwMK5ou.js";import"./Header-BCsW5RSr.js";import"./LayoutWrapper-BcS_ltkG.js";import"./StatusTag-DlLwCpNd.js";import"./Tag-CisJo6D3.js";import"./Stroller-BwI58iuk.js";import"./NoeGikkGalt-JtfKaRrq.js";import"./MinidialogSkjema-B74Ecj1O.js";import"./HarIkkeSaker-Cxllsnxz.js";import"./SøkelenkerPanel-ChDOLg3c.js";import"./HarSaker-CVGv45-Y.js";import"./SakLink-BZfnMUqD.js";import"./guid-CsArkN6i.js";import"./ContentSection-BwUwbKCV.js";import"./BekreftelseSendtSøknad-3le9-Phw.js";import"./KontonummerInfo-C3BJE5MV.js";import"./Accordion-kbmQyyeM.js";import"./Svangerskapspenger-C_ACdvqb.js";import"./DinPlan-BK5DolSC.js";import"./Oppgaver-D-cBYTfK.js";import"./OppgaveLenkepanel-7K5wpXYU.js";import"./KontaktOss-BgXcoXFM.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
