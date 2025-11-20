import{i as a,j as t}from"./iframe-B5QC8AIG.js";import{h as r,H as s}from"./index-znonygE-.js";import{t as p,m as l}from"./tidslinjeHendelser-hVGr8zUd.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-C0fZPw1r.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-D1SL7QV0.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BccTKEIM.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-B5A-ubfr.js";import"./useBackgroundColor-wMjCLYRA.js";import"./useSelectedSak-DIg6TFXX.js";import"./useQuery-DWPWvH2v.js";import"./sakerUtils-DV2A2ndT.js";import"./Snarveier-DlyaMcvr.js";import"./LenkePanel-DiDvRI_I.js";import"./index-DiehcI6P.js";import"./Header-ulnVmEhC.js";import"./LayoutWrapper-CoL9VDkP.js";import"./StatusTag-2NmPLhLg.js";import"./Tag-wOX75qoo.js";import"./Stroller-BT5EpKTm.js";import"./NoeGikkGalt-Cs0O5H-f.js";import"./MinidialogSkjema-BkAnEUny.js";import"./HarIkkeSaker-D6IdTQZp.js";import"./SøkelenkerPanel-Rmj2R-Dt.js";import"./HarSaker-BfBXAZQ_.js";import"./SakLink-CKXR0teD.js";import"./guid-CsArkN6i.js";import"./ContentSection-B1Mc35LK.js";import"./BekreftelseSendtSøknad-D-3GLASL.js";import"./KontonummerInfo-BynBGgMI.js";import"./Accordion-Cx782lvs.js";import"./Svangerskapspenger-DaV1NiYh.js";import"./DinPlan-C1g5uEBz.js";import"./Oppgaver-DaC-WACc.js";import"./OppgaveLenkepanel-BDp1n_it.js";import"./KontaktOss-mCKiCXK2.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
