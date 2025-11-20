import{i as a,j as t}from"./iframe-BoK1MRrK.js";import{h as r,H as s}from"./index-BQK9m6PZ.js";import{t as p,m as l}from"./tidslinjeHendelser-B0wp6gsu.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-BspbtbPw.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-CgLe_9SB.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-CrGlDBvK.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BKOp184m.js";import"./useBackgroundColor-EO2fuV6Q.js";import"./useSelectedSak-DN02KmWL.js";import"./useQuery-D1vecscU.js";import"./sakerUtils-DWTceJRd.js";import"./Snarveier-iP676G-t.js";import"./LenkePanel-Cv9mHJaS.js";import"./index-IOaOjsO7.js";import"./Header-CyF_5Tzp.js";import"./LayoutWrapper-ssDwnBWy.js";import"./StatusTag-CXhFAVKy.js";import"./Tag-Dhuk1aDO.js";import"./Stroller-Q5Fx5-6N.js";import"./NoeGikkGalt-DE1NJyke.js";import"./MinidialogSkjema-BDP4LxUP.js";import"./HarIkkeSaker-MiyLmRwn.js";import"./SøkelenkerPanel-CV7Zn_lU.js";import"./HarSaker-CYR13X27.js";import"./SakLink-C6u7CYf-.js";import"./guid-CsArkN6i.js";import"./ContentSection-BN1QzzYu.js";import"./BekreftelseSendtSøknad-BgKL13pD.js";import"./KontonummerInfo-tQ6U9YbT.js";import"./Accordion-CFUGSW8z.js";import"./Svangerskapspenger-5MZWZF_1.js";import"./DinPlan-CCZ7SR3I.js";import"./Oppgaver-BvHkG62J.js";import"./OppgaveLenkepanel-DBRuYeaY.js";import"./KontaktOss-B8Y_uCcD.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
