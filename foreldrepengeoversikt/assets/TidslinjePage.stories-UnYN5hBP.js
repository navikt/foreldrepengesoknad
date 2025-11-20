import{i as a,j as t}from"./iframe-Dcew6FNK.js";import{h as r,H as s}from"./index-WCy2UA1v.js";import{t as p,m as l}from"./tidslinjeHendelser-BitQbut8.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-rN9vlGCs.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DQqaikD_.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-C_4bOTDn.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-XA4OYdlO.js";import"./useBackgroundColor-BCJuKAt4.js";import"./useSelectedSak-CHq17i_7.js";import"./useQuery-D7i4rAN6.js";import"./sakerUtils-BUtA84PH.js";import"./Snarveier-DaxgQhjy.js";import"./LenkePanel--1AKPNB2.js";import"./index-RG7R1eM9.js";import"./Header-CHVehUVt.js";import"./LayoutWrapper-BpNBoPgS.js";import"./StatusTag-BCwXfUxl.js";import"./Tag-BWj5Xevy.js";import"./Stroller-DksrPLFE.js";import"./NoeGikkGalt-j6Jv9eUT.js";import"./MinidialogSkjema-B3Brjzip.js";import"./HarIkkeSaker-9Dzsa-FS.js";import"./SøkelenkerPanel-CS6C6fG8.js";import"./HarSaker-Cb7SQKgF.js";import"./SakLink-DLfOqv3I.js";import"./guid-CsArkN6i.js";import"./ContentSection-CgBn3YO3.js";import"./BekreftelseSendtSøknad-C26eFHNB.js";import"./KontonummerInfo-CVtvU1R7.js";import"./Accordion-Mm4HN0O6.js";import"./Svangerskapspenger-DiPvSuvG.js";import"./DinPlan-DOwHwih4.js";import"./Oppgaver-BQhktwHs.js";import"./OppgaveLenkepanel-zGdV-aXi.js";import"./KontaktOss-5o6pz3vp.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
