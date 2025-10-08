import{i as p,j as t}from"./iframe-BGOG44DK.js";import{h as e,H as o}from"./index-B4Zy9ehy.js";import{t as a,m as l}from"./tidslinjeHendelser-PYMJp4z8.js";import{s as d}from"./saker-DWfdw2la.js";import{A as s}from"./api-CnpsdBLC.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-CwDnOYXa.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-QwzuWtG2.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-7iJeax4r.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BifAu8VF.js";import"./useSelectedSak-CCMmAbnx.js";import"./useQuery-DT5RNUV5.js";import"./sakerUtils-DK21Rf3m.js";import"./Snarveier-CEI87XI_.js";import"./LenkePanel-Di4qeYeX.js";import"./index-D28VsQrH.js";import"./Dokument-CxVxFRKr.js";import"./dokumenterUtils-BidHPh0H.js";import"./Tag-C68Ae1Iw.js";import"./GrupperteDokumenter-u1UxH7B6.js";import"./guid-CsArkN6i.js";import"./Accordion-T2WuaQdM.js";import"./Header-BBAbsDgm.js";import"./LayoutWrapper-C63bbq19.js";import"./StatusTag-DYtpwxFh.js";import"./Stroller-BJyaYKJ8.js";import"./NoeGikkGalt-BA43qCks.js";import"./MinidialogSkjema-BNydc6-4.js";import"./BekreftelseSendtSøknad-DIsN4R13.js";import"./KontonummerInfo-CYE4uGvD.js";import"./HarIkkeSaker-BpHRxS4X.js";import"./SøkelenkerPanel-SL3qVlsq.js";import"./HarSaker-B-ktagMa.js";import"./SakLink-BZizAoAU.js";import"./ContentSection-RFVCnIcd.js";import"./Svangerskapspenger-CrLk9Oqd.js";import"./DinPlan-BPzKKye2.js";import"./Oppgaver-Cs3AcBdD.js";import"./OppgaveLenkepanel-CchuefCj.js";import"./KontaktOss-C-AsUdZv.js";const ot={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(s.saker,()=>o.json(d)),e.get(s.tidslinje,()=>o.json(a)),e.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg))]
    }
  },
  args: {
    søkersBarn: [{
      fornavn: 'Olga',
      etternavn: 'Utvikler',
      fnr: '23232424',
      fødselsdato: '2024-01-01',
      kjønn: 'K'
    }]
  }
}`,...r.parameters?.docs?.source}}};const st=["Default"];export{r as Default,st as __namedExportsOrder,ot as default};
