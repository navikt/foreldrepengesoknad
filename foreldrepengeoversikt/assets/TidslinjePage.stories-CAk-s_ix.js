import{i as a,j as t}from"./iframe-Bxge1WXr.js";import{h as r,H as s}from"./index-Kf4Zd65Y.js";import{t as p,m as l}from"./tidslinjeHendelser-QuQmCu8T.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-CcAjzEgG.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-Dz0L9VQP.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-NhJwMMuT.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-Cm_cs-1I.js";import"./useBackgroundColor-B47iBxGj.js";import"./useSelectedSak-tAHz8AVf.js";import"./useQuery-BAm9llb0.js";import"./sakerUtils-CBTejK81.js";import"./Snarveier-D8t8DkUG.js";import"./LenkePanel-B0KYPD0g.js";import"./index-Cw8ipi3_.js";import"./Header-Jlj9-bXc.js";import"./LayoutWrapper-DpS6BOAW.js";import"./StatusTag-BSIrNlTZ.js";import"./Tag-97LzhDfQ.js";import"./Stroller-BqdXSIUy.js";import"./NoeGikkGalt-DcbsYrFD.js";import"./MinidialogSkjema-CSJnj727.js";import"./HarIkkeSaker-CX7JzZfO.js";import"./SøkelenkerPanel-Bk4anJiD.js";import"./HarSaker-C9DR7Oj6.js";import"./SakLink-Onp_5lka.js";import"./guid-CsArkN6i.js";import"./ContentSection-DLkqEJzO.js";import"./BekreftelseSendtSøknad-BNkww_Kb.js";import"./KontonummerInfo-Dev0F_Zk.js";import"./Accordion-Dui_oouP.js";import"./Svangerskapspenger-W2kW15ec.js";import"./DinPlan-DdF1ukDX.js";import"./Oppgaver-DlGffn4L.js";import"./OppgaveLenkepanel-N_kjMWql.js";import"./KontaktOss-CV2X6oZG.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
