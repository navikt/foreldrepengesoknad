import{k as a,j as t}from"./iframe-DRNLMmYE.js";import{h as r,H as s}from"./index-CkkFPX7F.js";import{t as p,m as l}from"./tidslinjeHendelser-BY-Kw5J2.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-BcUe5G4p.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-Drly9pVO.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BngKly09.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-btuYC64-.js";import"./useBackgroundColor-Dj9Mhw7e.js";import"./useSelectedSak-BxTYm4MN.js";import"./useQuery-Civ8Dnm5.js";import"./sakerUtils-hgp4WW7J.js";import"./Snarveier-E9ExDleI.js";import"./LenkePanel-s6GC44pQ.js";import"./index-DeJTEWpZ.js";import"./Header-DwCdhqXx.js";import"./LayoutWrapper-CrcCcvL2.js";import"./StatusTag-heFK2ndb.js";import"./Tag-D3i_kcKy.js";import"./Stroller-BvnyJIEi.js";import"./NoeGikkGalt-B42Mb4yn.js";import"./MinidialogSkjema-CJGLC-KC.js";import"./HarIkkeSaker-B8iY7lVU.js";import"./SøkelenkerPanel-CNYihIl5.js";import"./HarSaker-B0eptRDF.js";import"./SakLink-De7BDsoU.js";import"./guid-CsArkN6i.js";import"./ContentSection-Bg42jfKz.js";import"./BekreftelseSendtSøknad-Bz4PYXNm.js";import"./KontonummerInfo-BLE1AQOX.js";import"./Accordion-Bs3Hp_4f.js";import"./Svangerskapspenger-cXcJmkwk.js";import"./DinPlan-D7g6KPAt.js";import"./Oppgaver-C0F7sApH.js";import"./OppgaveLenkepanel-_337-uD2.js";import"./KontaktOss-BBOVwqh8.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
