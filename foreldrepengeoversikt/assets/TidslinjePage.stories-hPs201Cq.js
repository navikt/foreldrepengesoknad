import{k as a,j as t}from"./iframe-Ba91ONca.js";import{h as r,H as s}from"./index-BMiVihQd.js";import{t as p,m as l}from"./tidslinjeHendelser-BMYRsq_W.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-CWOBDaOb.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DfJFOfod.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-CyeXW52V.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CtKs9rvM.js";import"./useBackgroundColor-BWFtpHeP.js";import"./useSelectedSak-D39zH--b.js";import"./useQuery-C8GKLKUv.js";import"./sakerUtils-BKEKI5T_.js";import"./Snarveier-Drg7dQU8.js";import"./LenkePanel-DHVL0_x_.js";import"./index-DUa15r_E.js";import"./Header-DNjoLMq2.js";import"./LayoutWrapper-5nbn3R2a.js";import"./StatusTag-CDTZUW9I.js";import"./Tag-DyFW5QKi.js";import"./Stroller-CWuvw2ff.js";import"./NoeGikkGalt-BsjrpJXa.js";import"./MinidialogSkjema-BbzVkJBa.js";import"./HarIkkeSaker-CDS4pWOQ.js";import"./SøkelenkerPanel-CGvPJpOB.js";import"./HarSaker-CSfddcGH.js";import"./SakLink-CoeXL9yc.js";import"./guid-CsArkN6i.js";import"./ContentSection-CqoVP7V1.js";import"./BekreftelseSendtSøknad-nZVXRiVE.js";import"./KontonummerInfo-D0hxfqaS.js";import"./Accordion-C1xtiWhV.js";import"./Svangerskapspenger-Cvz8irBi.js";import"./DinPlan-B_X1xH53.js";import"./Oppgaver-MmYsU9R4.js";import"./OppgaveLenkepanel-DaRpAYeg.js";import"./KontaktOss-BdFfFn5C.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
