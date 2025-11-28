import{k as p,j as t}from"./iframe-TGpsbGZN.js";import{h as e,H as r}from"./index-BnzeR7Fo.js";import{t as a,m as l}from"./tidslinjeHendelser-B8c_MP-a.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-XiF2I7tY.js";import{A as s}from"./queries-BmBNU40z.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-C407bG70.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-DvX8tCfx.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-_f2C6ccg.js";import"./useBackgroundColor-lSKj3X11.js";import"./useSelectedSak-CYwfljXy.js";import"./useQuery-BTXcTenA.js";import"./sakerUtils-CKRXnHKo.js";import"./Snarveier-f5CQbEab.js";import"./LenkePanel-namyPbfP.js";import"./index-L5rJEJCg.js";import"./Header-D4mcJ2Y6.js";import"./LayoutWrapper-TIhjLZZQ.js";import"./StatusTag-zQceX38i.js";import"./Tag-7IX825cK.js";import"./Stroller-cfnVzXRi.js";import"./NoeGikkGalt-BtEB0JZ3.js";import"./MinidialogSkjema-C__5yhw1.js";import"./HarIkkeSaker-D6frBM-5.js";import"./SøkelenkerPanel-B53X7xT6.js";import"./HarSaker-B_sxQr5N.js";import"./SakLink-CIkJmOEz.js";import"./guid-CsArkN6i.js";import"./ContentSection-Dch1X5E1.js";import"./BekreftelseSendtSøknad-DclVkbc8.js";import"./KontonummerInfo-DbxGl9te.js";import"./Accordion-DQysGlZr.js";import"./Svangerskapspenger-CwQcyUUW.js";import"./DinPlan-C5c09SO4.js";import"./Oppgaver-BOMUhBcA.js";import"./OppgaveLenkepanel-fHKzxunA.js";import"./KontaktOss-DxFpkz0U.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
