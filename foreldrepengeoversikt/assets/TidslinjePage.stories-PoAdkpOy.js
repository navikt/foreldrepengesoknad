import{i as a,j as t}from"./iframe-DEikezB8.js";import{h as r,H as s}from"./index-s2IJkxJA.js";import{t as p,m as l}from"./tidslinjeHendelser-_DYoSdkp.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-Ba4s7_HK.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DjbF3Cze.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-DcV7Iagz.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BXoilV0j.js";import"./useBackgroundColor-BMo0wvJ5.js";import"./useSelectedSak-C-rn41oL.js";import"./useQuery-DUJ59zTu.js";import"./sakerUtils-CWXAfiNK.js";import"./Snarveier-CxWY8_ry.js";import"./LenkePanel-DW53ytRN.js";import"./index-BQREIWzL.js";import"./Header-D5nLLZ91.js";import"./LayoutWrapper-B3tHmXFZ.js";import"./StatusTag-D6PR44ot.js";import"./Tag-LoPxS0gO.js";import"./Stroller-Bu86v3HI.js";import"./NoeGikkGalt-DxUJTScn.js";import"./MinidialogSkjema-dlH2fhvG.js";import"./HarIkkeSaker-BWOHtR0y.js";import"./SøkelenkerPanel-BtADNI-t.js";import"./HarSaker-x4XAY4Oo.js";import"./SakLink-DH2Bw2bC.js";import"./guid-CsArkN6i.js";import"./ContentSection-Br_T7T9f.js";import"./BekreftelseSendtSøknad-D9kXiavq.js";import"./KontonummerInfo-Dk5aKoDk.js";import"./Accordion-C8Ecfeiq.js";import"./Svangerskapspenger-BemJlQ_5.js";import"./DinPlan-Bv3Ee6eR.js";import"./Oppgaver-DwVoXk37.js";import"./OppgaveLenkepanel-CLSSq0XW.js";import"./KontaktOss-BfzrfNfr.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
