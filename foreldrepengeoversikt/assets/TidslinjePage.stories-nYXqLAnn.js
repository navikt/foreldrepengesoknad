import{i as a,j as t}from"./iframe-DF79Ws_0.js";import{h as r,H as s}from"./index-tIZBiYiI.js";import{t as p,m as l}from"./tidslinjeHendelser-tzR-doH4.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-T2SW8QtP.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-B80NyheD.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-Dj4WEaPd.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CFgwQLxs.js";import"./useBackgroundColor-ST4Bb1v8.js";import"./useSelectedSak-Bj8uE2ig.js";import"./useQuery-C7Fp_yyc.js";import"./sakerUtils-C8Ka4cNE.js";import"./Snarveier-DXFK-V8j.js";import"./LenkePanel-DNhR2EI3.js";import"./index-CFmTT9U7.js";import"./Header-CmKQq81l.js";import"./LayoutWrapper-DXT2Divy.js";import"./StatusTag-DS3D2bbW.js";import"./Tag-Dy-b5gul.js";import"./Stroller-CLRXVSWG.js";import"./NoeGikkGalt-BoRvvUNR.js";import"./MinidialogSkjema-BToawnGw.js";import"./HarIkkeSaker-CdZHDBhM.js";import"./SøkelenkerPanel-C9PFfIX7.js";import"./HarSaker-CsiPoodi.js";import"./SakLink-CSQnja0-.js";import"./guid-CsArkN6i.js";import"./ContentSection-d8xRI07x.js";import"./BekreftelseSendtSøknad-4U-jf1nM.js";import"./KontonummerInfo--sekSxca.js";import"./Accordion-BV9ZyU8x.js";import"./Svangerskapspenger-7lmI1VmN.js";import"./DinPlan-BOtRptbI.js";import"./Oppgaver-DERS7ZJe.js";import"./OppgaveLenkepanel-BwBAM25w.js";import"./KontaktOss-Bb0OuEqS.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
