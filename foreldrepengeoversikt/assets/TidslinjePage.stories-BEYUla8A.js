import{k as a,j as t}from"./iframe-Yr3ikmRB.js";import{h as r,H as s}from"./index--Y-KVhMB.js";import{t as p,m as l}from"./tidslinjeHendelser-CUiIS9Qi.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-C6k2LQmH.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DXHMCy2v.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-Xx74wE5A.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-Cw8MkDOp.js";import"./useBackgroundColor-iDVTIFu2.js";import"./useSelectedSak-iK9xccOK.js";import"./useQuery-BCZgAB0y.js";import"./sakerUtils-BAse5xh2.js";import"./Snarveier-DpxcIWQg.js";import"./LenkePanel-CSmkwQ3P.js";import"./index-p31wFLZy.js";import"./Header-nCLoIkkR.js";import"./LayoutWrapper-C7lpJdTD.js";import"./StatusTag-0qHP-I-k.js";import"./Tag-DAGVHiNO.js";import"./Stroller-47F4VCcq.js";import"./NoeGikkGalt-7NkanYBo.js";import"./MinidialogSkjema-CtB2uOAt.js";import"./HarIkkeSaker-CgkAmo42.js";import"./SøkelenkerPanel-DFsuzA-r.js";import"./HarSaker-DKU5av8l.js";import"./SakLink-BW7EBiAG.js";import"./guid-CsArkN6i.js";import"./ContentSection-BhuNT9aU.js";import"./BekreftelseSendtSøknad-BI-Zh9-9.js";import"./KontonummerInfo-0kizcRmc.js";import"./Accordion-BE4hDUbF.js";import"./Svangerskapspenger-CEInAnzz.js";import"./DinPlan-Ct5-GQrF.js";import"./Oppgaver-s87W6Bck.js";import"./OppgaveLenkepanel-BG-bQT9T.js";import"./KontaktOss-tZi8rEzw.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
