import{i as a,j as t}from"./iframe-CcRnEF0W.js";import{h as r,H as s}from"./index-DpHnoh7i.js";import{t as p,m as l}from"./tidslinjeHendelser-CvJAZkh8.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-BTBOq05D.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BvYk5qgG.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-Dw0QQR5x.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BIn98bbE.js";import"./useBackgroundColor-rfyzZwSN.js";import"./useSelectedSak-cG6hurXi.js";import"./useQuery-7116FiyK.js";import"./sakerUtils-HZeCxjop.js";import"./Snarveier-sG1mMXlA.js";import"./LenkePanel-B56seo5Z.js";import"./index-My6IJ7IW.js";import"./Header-BNcZ42RW.js";import"./LayoutWrapper-CMWBkm3E.js";import"./StatusTag-pXTrJmXa.js";import"./Tag-2jqtbN7o.js";import"./Stroller-BQMaHUNc.js";import"./NoeGikkGalt--QV2GlpB.js";import"./MinidialogSkjema-Bd2_2vL0.js";import"./HarIkkeSaker-DdLrmQZP.js";import"./SøkelenkerPanel-CHXTBFXk.js";import"./HarSaker-CXABXMxb.js";import"./SakLink-CsiYjKsm.js";import"./guid-CsArkN6i.js";import"./ContentSection-S3Dcjxg6.js";import"./BekreftelseSendtSøknad-Cxr1tBlp.js";import"./KontonummerInfo-BfPbMb-n.js";import"./Accordion-CKbhDJ42.js";import"./Svangerskapspenger-BuVBjjZy.js";import"./DinPlan-DPlxtNC-.js";import"./Oppgaver-CNu0xIK8.js";import"./OppgaveLenkepanel-DldwMgVl.js";import"./KontaktOss-BbaqAXmB.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
