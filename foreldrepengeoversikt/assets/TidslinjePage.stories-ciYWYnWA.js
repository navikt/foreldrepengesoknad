import{i as a,j as t}from"./iframe-DuNHQlgM.js";import{h as r,H as s}from"./index-DREpVBse.js";import{t as p,m as l}from"./tidslinjeHendelser-E2w3mZ18.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-BeaI5UYU.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DM26VzAh.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-i6z-Kvj6.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DMRrM2Xo.js";import"./useBackgroundColor-Cb8Fijkl.js";import"./useSelectedSak-Cirvcyrx.js";import"./useQuery-FFS1Ogu0.js";import"./sakerUtils-CmsvQISu.js";import"./Snarveier-ChvL2wOb.js";import"./LenkePanel-CDOcgycT.js";import"./index-Buw3NpkP.js";import"./Header-CDd3t9Uz.js";import"./LayoutWrapper-BL8vpkku.js";import"./StatusTag-D_hPWrh7.js";import"./Tag-Du0PtxmP.js";import"./Stroller-DZ5MYcD-.js";import"./NoeGikkGalt-CiwI4Bz_.js";import"./MinidialogSkjema-y-LJmyoB.js";import"./HarIkkeSaker-BcWU775v.js";import"./SøkelenkerPanel-Bj5ETiZT.js";import"./HarSaker-Bmylww36.js";import"./SakLink-D9Dqx7IA.js";import"./guid-CsArkN6i.js";import"./ContentSection-DRRCxbC2.js";import"./BekreftelseSendtSøknad-mdAHOZfH.js";import"./KontonummerInfo-Dc3hxgvS.js";import"./Accordion-3EDIoWN6.js";import"./Svangerskapspenger-C8bPJL7N.js";import"./DinPlan-5zzvLzHZ.js";import"./Oppgaver-BM-_Z3Ht.js";import"./OppgaveLenkepanel-ZCS12Mzq.js";import"./KontaktOss-NAFhNME9.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
