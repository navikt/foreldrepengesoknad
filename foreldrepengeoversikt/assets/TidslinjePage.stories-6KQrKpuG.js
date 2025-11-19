import{i as a,j as t}from"./iframe-CIQarI7J.js";import{h as r,H as s}from"./index-CC0zNVxf.js";import{t as p,m as l}from"./tidslinjeHendelser-V-71FzDa.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-ChzUFsNr.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DkAJxiP-.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-NBmkIGy0.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DXHVJImd.js";import"./useBackgroundColor-Bb8WicHc.js";import"./useSelectedSak-D_sdVVh-.js";import"./useQuery-BbLbm8eA.js";import"./sakerUtils-ChsAIfyl.js";import"./Snarveier-Db3AKH7u.js";import"./LenkePanel-AWSz6TSp.js";import"./index-DoO5Tyg4.js";import"./Header-E2Ter5VR.js";import"./LayoutWrapper-FtP3CYqT.js";import"./StatusTag-CSTWwVme.js";import"./Tag-Cm1gbYd_.js";import"./Stroller-DaqeL_4i.js";import"./NoeGikkGalt-RoG0fBo2.js";import"./MinidialogSkjema-BjFKPaeC.js";import"./HarIkkeSaker-BQ5eA1Xb.js";import"./SøkelenkerPanel-DZFW1oPA.js";import"./HarSaker-B5PZjXMS.js";import"./SakLink-BWraOubU.js";import"./guid-CsArkN6i.js";import"./ContentSection-BkEx4u7x.js";import"./BekreftelseSendtSøknad-BMuXqUn6.js";import"./KontonummerInfo-aW8T9pGG.js";import"./Accordion-BC4QOrlA.js";import"./Svangerskapspenger-DEq2wG_S.js";import"./DinPlan-DPxbXehP.js";import"./Oppgaver-p6QcM-Qa.js";import"./OppgaveLenkepanel-B_vtgCK8.js";import"./KontaktOss-BGCGcJtM.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
