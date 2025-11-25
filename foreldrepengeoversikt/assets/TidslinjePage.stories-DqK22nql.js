import{i as a,j as t}from"./iframe-P9QrP3sI.js";import{h as r,H as s}from"./index-Cg2sjMYy.js";import{t as p,m as l}from"./tidslinjeHendelser-ClLAEdoJ.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-EA72RiMj.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BJ33Cx-R.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-4pqwKFXP.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-B9ZFSeQS.js";import"./useBackgroundColor-DLw4CB31.js";import"./useSelectedSak-oxVKSkmt.js";import"./useQuery-DJqSohq6.js";import"./sakerUtils-Cc1-7A0k.js";import"./Snarveier-Cf--jgEX.js";import"./LenkePanel-CE1A1bhO.js";import"./index-CqKvw51r.js";import"./Header-C6zQ1QAf.js";import"./LayoutWrapper-BKqdiCe5.js";import"./StatusTag-CYOXUQOH.js";import"./Tag-O9HttJm_.js";import"./Stroller-D5NgLZm8.js";import"./NoeGikkGalt-b3eNVIJL.js";import"./MinidialogSkjema-Bd7iglsN.js";import"./HarIkkeSaker-CD2_5rB1.js";import"./SøkelenkerPanel-DwizuJz6.js";import"./HarSaker-Drni6QyL.js";import"./SakLink-DR2Ir7P0.js";import"./guid-CsArkN6i.js";import"./ContentSection-C9LIUnEj.js";import"./BekreftelseSendtSøknad-CKFCR0A3.js";import"./KontonummerInfo-CfU3kcrv.js";import"./Accordion-CWRzvxp0.js";import"./Svangerskapspenger-Gxp_3ITB.js";import"./DinPlan-CCp52oX4.js";import"./Oppgaver-4ZvJ4etD.js";import"./OppgaveLenkepanel-CkkAMenz.js";import"./KontaktOss-D0M5zDpy.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
