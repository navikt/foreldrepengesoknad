import{i as a,j as t}from"./iframe-CPaSz3da.js";import{h as r,H as s}from"./index-BFB8NGlC.js";import{t as p,m as l}from"./tidslinjeHendelser-pZJes-iZ.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./api-DC0dVmWA.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-Bs2B8qQ3.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BbJenm_R.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BXckVS9o.js";import"./useBackgroundColor-PcqJj6KH.js";import"./useSelectedSak-B1N8rFOJ.js";import"./useQuery-DDM1s8BW.js";import"./sakerUtils-Cb99ZYnh.js";import"./Snarveier-CN0CLleX.js";import"./LenkePanel-B2mdiHVA.js";import"./index-BiEMDhvH.js";import"./Header-CQbiu8tk.js";import"./LayoutWrapper-PHxWRNAz.js";import"./StatusTag-aRSUHhp_.js";import"./Tag-CFg_k61W.js";import"./Stroller-DwH-tLVC.js";import"./NoeGikkGalt-k2YdFDRM.js";import"./MinidialogSkjema-CF-mLsc3.js";import"./HarIkkeSaker-BLMddNuL.js";import"./SøkelenkerPanel-cgU23cUb.js";import"./HarSaker-DYLD6qXH.js";import"./SakLink-DP8AKzat.js";import"./guid-CsArkN6i.js";import"./ContentSection-CNj4likg.js";import"./BekreftelseSendtSøknad-BhwS9W1R.js";import"./KontonummerInfo-DsHbW90E.js";import"./Accordion-DdCZfSsH.js";import"./Svangerskapspenger-cdhSFMSP.js";import"./DinPlan-BsL5i39q.js";import"./Oppgaver-DE_5n7fU.js";import"./OppgaveLenkepanel-Dw2fiuA7.js";import"./KontaktOss-xK4hM1hj.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
