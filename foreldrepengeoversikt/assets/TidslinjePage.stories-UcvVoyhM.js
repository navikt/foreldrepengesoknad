import{i as a,j as t}from"./iframe-kkEBcNhm.js";import{h as r,H as s}from"./index-BXVvQb7A.js";import{t as p,m as l}from"./tidslinjeHendelser--9QHmqDl.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./api-DStfYi14.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BerJyKF1.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-DSSrEgXf.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-B2hqFPB-.js";import"./useBackgroundColor-CN8pWSw3.js";import"./useSelectedSak-ki1fopEy.js";import"./useQuery-B5JMQPAu.js";import"./sakerUtils-D4HrEktE.js";import"./Snarveier-BjDyEPyp.js";import"./LenkePanel-Bg9fCSzg.js";import"./index-CUAawcoM.js";import"./Header-EvHBpXj2.js";import"./LayoutWrapper-CuhZhf32.js";import"./StatusTag-CM8I5Ul5.js";import"./Tag-W4mAJL02.js";import"./Stroller-39BAnEqH.js";import"./NoeGikkGalt-CcQVVxnQ.js";import"./MinidialogSkjema-RAPxk3zh.js";import"./HarIkkeSaker-DOZgdvXC.js";import"./SøkelenkerPanel-fYyJMKIG.js";import"./HarSaker-Cac8uGCN.js";import"./SakLink-CYNV8VAs.js";import"./guid-CsArkN6i.js";import"./ContentSection-GDztL_IR.js";import"./BekreftelseSendtSøknad-ByqAMPNv.js";import"./KontonummerInfo-Bym9uLJ6.js";import"./Accordion-D3iBL3Fe.js";import"./Svangerskapspenger-suRS2byr.js";import"./DinPlan-BeiZkYdX.js";import"./Oppgaver-BUMpHl4e.js";import"./OppgaveLenkepanel-Bgd1Rw7O.js";import"./KontaktOss-BQf9dMGr.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
