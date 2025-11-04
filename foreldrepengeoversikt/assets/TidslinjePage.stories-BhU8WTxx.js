import{i as a,j as t}from"./iframe--J04DPMt.js";import{h as r,H as s}from"./index-DJDxggZT.js";import{t as p,m as l}from"./tidslinjeHendelser-o2X48H8B.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./api-xVu1VUT_.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-Dp1Sqek1.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-DV9fWWim.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-B8xj8HFc.js";import"./useBackgroundColor-yYen6Q_S.js";import"./useSelectedSak-NRK1fmsu.js";import"./useQuery-DfKN96Pn.js";import"./sakerUtils-B1zqJpcK.js";import"./Snarveier-DBWOpCbb.js";import"./LenkePanel-CR3wyz2S.js";import"./index-DqULXsdl.js";import"./Header-CQeniqEr.js";import"./LayoutWrapper-B99qdxXl.js";import"./StatusTag-BqKLFnlm.js";import"./Tag-BiaGzeaK.js";import"./Stroller-_K42vtwW.js";import"./NoeGikkGalt-Bg1DwiJT.js";import"./MinidialogSkjema-DVhCN0Gt.js";import"./HarIkkeSaker-Bu-9u7WD.js";import"./SøkelenkerPanel-D8ymweyp.js";import"./HarSaker-BZP5pNYS.js";import"./SakLink-Dpj0g9TV.js";import"./guid-CsArkN6i.js";import"./ContentSection-Bbsj9DDi.js";import"./BekreftelseSendtSøknad-CYofg17E.js";import"./KontonummerInfo-COLfEMkm.js";import"./Accordion-CvtDplvv.js";import"./Svangerskapspenger-Dfs9INja.js";import"./DinPlan-o9kSQRFF.js";import"./Oppgaver-CbJA5qQJ.js";import"./OppgaveLenkepanel-BEI7tlUr.js";import"./KontaktOss-DIuhn4T4.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
