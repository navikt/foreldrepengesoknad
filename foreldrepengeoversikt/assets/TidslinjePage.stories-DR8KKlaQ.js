import{i as a,j as t}from"./iframe-DKs8wdyT.js";import{h as r,H as s}from"./index-D9WBorm-.js";import{t as p,m as l}from"./tidslinjeHendelser-BjwPdLjH.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-C_yUvTuY.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DjFmvQZG.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-Bzu6sD9f.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-OhMtcqES.js";import"./useBackgroundColor-DT5Lm4Sw.js";import"./useSelectedSak-D9w-y_Ha.js";import"./useQuery-DMb7e4Gx.js";import"./sakerUtils-BMZ_jgBA.js";import"./Snarveier-CMT8KMUa.js";import"./LenkePanel-B4z8jg2U.js";import"./index-Y5UOuoBj.js";import"./Header-Dw9s7MK8.js";import"./LayoutWrapper-BnVdAvlr.js";import"./StatusTag-BKTEDnoF.js";import"./Tag-9TE_pekA.js";import"./Stroller-BUvAsYFq.js";import"./NoeGikkGalt-DMjjnBpR.js";import"./MinidialogSkjema-iL__1RN6.js";import"./HarIkkeSaker-DCCO4-zL.js";import"./SøkelenkerPanel-wo1FDFQ0.js";import"./HarSaker-qHhVkI7X.js";import"./SakLink-BCOeU5vF.js";import"./guid-CsArkN6i.js";import"./ContentSection-BJ18LHSl.js";import"./BekreftelseSendtSøknad-CLhcoSNC.js";import"./KontonummerInfo-DDJWjc8Q.js";import"./Accordion-D4KFa34B.js";import"./Svangerskapspenger-CqEVAh7E.js";import"./DinPlan-CkzyA9Bf.js";import"./Oppgaver-I9pCo0Cd.js";import"./OppgaveLenkepanel-BjpA3iQ6.js";import"./KontaktOss-DZc_GLub.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
