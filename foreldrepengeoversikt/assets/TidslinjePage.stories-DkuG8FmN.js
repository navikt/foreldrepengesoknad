import{i as a,j as t}from"./iframe-f3fTV-vU.js";import{h as r,H as s}from"./index-CDNEqUmk.js";import{t as p,m as l}from"./tidslinjeHendelser-CqVtw0AG.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-CwGhK0Aq.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DNfaMilU.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BeR0sFFu.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-hGLsUUfY.js";import"./useBackgroundColor-DKP3oFDE.js";import"./useSelectedSak-CydcsII0.js";import"./useQuery-CRgim-Nx.js";import"./sakerUtils-CK7DEaPP.js";import"./Snarveier-ODXr3Y_7.js";import"./LenkePanel-DPrvNIwY.js";import"./index-aC8IJm-Q.js";import"./Header-40DVKzOV.js";import"./LayoutWrapper-GTgE1yY_.js";import"./StatusTag-D0IVhBlj.js";import"./Tag-DKdspHx7.js";import"./Stroller-nX5nKnLQ.js";import"./NoeGikkGalt-BeIUOqV0.js";import"./MinidialogSkjema-DajcQV81.js";import"./HarIkkeSaker-Clk8t6iw.js";import"./SøkelenkerPanel-Dt15nH99.js";import"./HarSaker-CP894guU.js";import"./SakLink-DFGocMjz.js";import"./guid-CsArkN6i.js";import"./ContentSection-CLA_LV6z.js";import"./BekreftelseSendtSøknad-CQFrV24J.js";import"./KontonummerInfo-wzF0VpEF.js";import"./Accordion-BithzCRM.js";import"./Svangerskapspenger-B5sbqWqz.js";import"./DinPlan-2ADOuE7E.js";import"./Oppgaver-DrsGTnXz.js";import"./OppgaveLenkepanel-DT6a34yg.js";import"./KontaktOss-Cz-mHIg0.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
