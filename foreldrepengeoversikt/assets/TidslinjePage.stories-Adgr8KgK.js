import{i as a,j as t}from"./iframe-Dy2Fqd_h.js";import{h as r,H as s}from"./index-DMaHRq-2.js";import{t as p,m as l}from"./tidslinjeHendelser-nSv5B_2s.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./api-CXFNNB9C.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-CaFt_lkv.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-Dg75gKp9.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-nR7MbD8-.js";import"./useBackgroundColor-BwIXUT1x.js";import"./useSelectedSak-CukCIQdg.js";import"./useQuery-RtsBLjDi.js";import"./sakerUtils-BZ1qPCGG.js";import"./Snarveier-BG81QrlW.js";import"./LenkePanel-CHqol1MW.js";import"./index-EKr5N8F0.js";import"./Header-Bs5On6cE.js";import"./LayoutWrapper-B_owzmLn.js";import"./StatusTag-CK0QAEUQ.js";import"./Tag-BvM878dY.js";import"./Stroller-iZqeX3Ty.js";import"./NoeGikkGalt-CSY5pfEl.js";import"./MinidialogSkjema-DLZLF4gO.js";import"./HarIkkeSaker-cjixziKi.js";import"./SøkelenkerPanel-BkBL29hy.js";import"./HarSaker-CK9gr8KF.js";import"./SakLink-CwsaD2-0.js";import"./guid-CsArkN6i.js";import"./ContentSection-BxHzv-xo.js";import"./BekreftelseSendtSøknad-BGbSS1PV.js";import"./KontonummerInfo-jVMoPtbF.js";import"./Accordion-CR6w0wBH.js";import"./Svangerskapspenger-CBEYSbRh.js";import"./DinPlan-CCZrT5EA.js";import"./Oppgaver-DBi3aksB.js";import"./OppgaveLenkepanel-BT-2g1RM.js";import"./KontaktOss-BBN947-1.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
