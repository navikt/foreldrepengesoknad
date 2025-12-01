import{k as p,j as t}from"./iframe-CF1j9nKo.js";import{h as e,H as r}from"./index-_ciQbAaT.js";import{t as a,m as l}from"./tidslinjeHendelser-DYX7Dey4.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-BFFkHMWS.js";import{A as s}from"./queries-C6vosDue.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-CSUtzoyk.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-DlCE1774.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-CykMxMsl.js";import"./useBackgroundColor-BS_2y_cB.js";import"./useSelectedSak-ChsZuqn9.js";import"./useQuery-COF2_gWq.js";import"./sakerUtils-CTLVeMcU.js";import"./Snarveier-DDAPSF5q.js";import"./LenkePanel-DM-hpuZ9.js";import"./index-B9FCEUSq.js";import"./Header-DS8O5yjy.js";import"./LayoutWrapper-BSMrE6kQ.js";import"./StatusTag-Cgakq9jR.js";import"./Tag-CS4HZhj1.js";import"./Stroller-CbYopj8O.js";import"./NoeGikkGalt-kU0hjirq.js";import"./MinidialogSkjema-CNFaVH35.js";import"./HarIkkeSaker-GwhoF1gX.js";import"./SøkelenkerPanel-D_HU3kCx.js";import"./HarSaker-0vQQ1nBt.js";import"./SakLink-Bou_51Du.js";import"./guid-CsArkN6i.js";import"./ContentSection-2oVRdfOa.js";import"./BekreftelseSendtSøknad-Dj-R-KTM.js";import"./KontonummerInfo-kjiSYbv7.js";import"./Accordion-XlKGJQiu.js";import"./Svangerskapspenger-Dw4_SEIC.js";import"./DinPlan-DFJjtrEE.js";import"./Oppgaver-BTJAnyIt.js";import"./OppgaveLenkepanel-DHBVDbfU.js";import"./KontaktOss-CrI1sufk.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo))]
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
}`,...o.parameters?.docs?.source}}};const rt=["Default"];export{o as Default,rt as __namedExportsOrder,et as default};
