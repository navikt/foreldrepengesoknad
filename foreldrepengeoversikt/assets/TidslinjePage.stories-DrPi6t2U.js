import{i as a,j as t}from"./iframe-ByN8KapC.js";import{h as r,H as s}from"./index-BfpeznYr.js";import{t as p,m as l}from"./tidslinjeHendelser-nbUgQ2zO.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-Cy1Vfr3t.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DsiGPETr.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-B6qULx97.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-B2HikvJE.js";import"./useBackgroundColor-CRWSrWTD.js";import"./useSelectedSak-CsJ3nRJf.js";import"./useQuery-BjbJ_pTg.js";import"./sakerUtils-CNAYEVmA.js";import"./Snarveier-Dpf0zglA.js";import"./LenkePanel-BqO48wgR.js";import"./index-CTO6yFVn.js";import"./Header-CXpDzHbY.js";import"./LayoutWrapper-qCcGU0U4.js";import"./StatusTag-Cgir9Jn5.js";import"./Tag-BHGiIExK.js";import"./Stroller-BYoZ8PIS.js";import"./NoeGikkGalt-CLsga4pa.js";import"./MinidialogSkjema-xQuQhdMg.js";import"./HarIkkeSaker-_tS0-IZQ.js";import"./SøkelenkerPanel-uvsCmYfE.js";import"./HarSaker-C8gYPNCu.js";import"./SakLink-CabpmSjd.js";import"./guid-CsArkN6i.js";import"./ContentSection-C-G2lYtE.js";import"./BekreftelseSendtSøknad-DRuDtXYk.js";import"./KontonummerInfo-B5lRB6Jh.js";import"./Accordion-BE4TEwN8.js";import"./Svangerskapspenger-BBGJq1tP.js";import"./DinPlan-ERkVuzme.js";import"./Oppgaver-Bubq8c2E.js";import"./OppgaveLenkepanel-BPc1EBAJ.js";import"./KontaktOss-CplVvNUJ.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
