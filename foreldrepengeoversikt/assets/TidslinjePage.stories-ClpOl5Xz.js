import{i as a,j as t}from"./iframe-CXnxpi-s.js";import{h as r,H as s}from"./index-DuldnQGz.js";import{t as p,m as l}from"./tidslinjeHendelser-iCd13cAf.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-nInlzUs2.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-Cq1Ob8Ut.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-SSzhRsX7.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CjTdwl0D.js";import"./useBackgroundColor--1aTsCar.js";import"./useSelectedSak-Do5X84P_.js";import"./useQuery-BwulElXk.js";import"./sakerUtils-DRVRj9ZG.js";import"./Snarveier-DnDdKfbF.js";import"./LenkePanel-bllN4YOu.js";import"./index-CTuxbr8K.js";import"./Header-HO6EGw0a.js";import"./LayoutWrapper-CaLgSl2c.js";import"./StatusTag-DUXSFUWx.js";import"./Tag-Cn7fgjP2.js";import"./Stroller-CylesC3K.js";import"./NoeGikkGalt-Ds_0ImZM.js";import"./MinidialogSkjema-D142xtyG.js";import"./HarIkkeSaker-DM0OswsU.js";import"./SøkelenkerPanel-BaVNMe_P.js";import"./HarSaker-C8J3mt1J.js";import"./SakLink-BvYOoML8.js";import"./guid-CsArkN6i.js";import"./ContentSection-Cw82Mkuy.js";import"./BekreftelseSendtSøknad-CLHKK-VP.js";import"./KontonummerInfo-DVUj28Yb.js";import"./Accordion-Bxf9YL7v.js";import"./Svangerskapspenger-BsDJUhjC.js";import"./DinPlan-DleP24B3.js";import"./Oppgaver-D7Rw_PqD.js";import"./OppgaveLenkepanel-mZLVkLlg.js";import"./KontaktOss-RQvnb_Ld.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
