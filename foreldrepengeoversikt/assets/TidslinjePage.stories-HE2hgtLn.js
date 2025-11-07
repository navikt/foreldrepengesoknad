import{i as a,j as t}from"./iframe-DUmMOqqZ.js";import{h as r,H as s}from"./index-QXLwCkO0.js";import{t as p,m as l}from"./tidslinjeHendelser-LXWU8tRN.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-DJ6m6sUL.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-Br8UuwJU.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-CUjMtgiP.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-B0l1ygpa.js";import"./useBackgroundColor-Dh2mcEVx.js";import"./useSelectedSak-CYbOUQaK.js";import"./useQuery-DHXfCFpC.js";import"./sakerUtils-CPkVmPw9.js";import"./Snarveier-DsmK40PV.js";import"./LenkePanel-7AlrnhrR.js";import"./index-Cb2hANxR.js";import"./Header-CeTCy34L.js";import"./LayoutWrapper-CaBVDhEc.js";import"./StatusTag-BzVU-5iQ.js";import"./Tag-DDv1gKXs.js";import"./Stroller-BR8-_Lwm.js";import"./NoeGikkGalt-NHnatTR6.js";import"./MinidialogSkjema-CL-UX3HS.js";import"./HarIkkeSaker-CYGwuCHf.js";import"./SøkelenkerPanel-CC9zvXvB.js";import"./HarSaker-CeeWPXyU.js";import"./SakLink-CFMGmczx.js";import"./guid-CsArkN6i.js";import"./ContentSection-f6Zl8F-q.js";import"./BekreftelseSendtSøknad-BOjTijNJ.js";import"./KontonummerInfo-DPYnBGOA.js";import"./Accordion-UHwn1obk.js";import"./Svangerskapspenger-CsXpV5ev.js";import"./DinPlan-pQVbKuxp.js";import"./Oppgaver-Bmsbw3DF.js";import"./OppgaveLenkepanel-D-gqX2fv.js";import"./KontaktOss-1CAo3XYt.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
