import{k as a,j as t}from"./iframe-DuhryXB5.js";import{h as r,H as s}from"./index-1iRR1hjy.js";import{t as p,m as l}from"./tidslinjeHendelser-CuRko-Mi.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-jnzJCUH9.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-2ZirPGKG.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BNZOtkI1.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CSvrpCVG.js";import"./useBackgroundColor-CiyTW6TM.js";import"./useSelectedSak-CXFliAYj.js";import"./useQuery-CdMUro0u.js";import"./sakerUtils-DTbKGHMa.js";import"./Snarveier-Dsay7TaL.js";import"./LenkePanel-BeY6zeXP.js";import"./index-BEUcUsCt.js";import"./Header-Bf5SBIWU.js";import"./LayoutWrapper-Brkj-6Sg.js";import"./StatusTag-B0ODWihQ.js";import"./Tag-CYcWg13f.js";import"./Stroller-E9G3hYWJ.js";import"./NoeGikkGalt-BmhCLoH1.js";import"./MinidialogSkjema-DL5wyjZ6.js";import"./HarIkkeSaker-B__vh1Z5.js";import"./SøkelenkerPanel-DWpqOeHw.js";import"./HarSaker-DS4P_Yi-.js";import"./SakLink-D88WVihE.js";import"./guid-CsArkN6i.js";import"./ContentSection-DF3Cj_t6.js";import"./BekreftelseSendtSøknad-BriBELdA.js";import"./KontonummerInfo-DpB8-561.js";import"./Accordion-BsaFqgpa.js";import"./Svangerskapspenger-xqkrvrxd.js";import"./DinPlan-B4EjlypH.js";import"./Oppgaver-DixEI_13.js";import"./OppgaveLenkepanel-CKvqYR2o.js";import"./KontaktOss-DmJCo0TD.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
