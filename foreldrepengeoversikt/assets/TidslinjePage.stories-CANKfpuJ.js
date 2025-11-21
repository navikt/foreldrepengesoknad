import{i as a,j as t}from"./iframe-DD56jBa9.js";import{h as r,H as s}from"./index-BCc5dHNN.js";import{t as p,m as l}from"./tidslinjeHendelser-DqJCE5e6.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-CP1IF2jh.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DM9B58BP.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-D13H9MA4.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-md7FLabt.js";import"./useBackgroundColor-DN7CAypn.js";import"./useSelectedSak-u_WV8I8q.js";import"./useQuery-CE8KmS8G.js";import"./sakerUtils-BjBGs0yZ.js";import"./Snarveier-BtQq39SF.js";import"./LenkePanel-DpY0ivt7.js";import"./index-Brx_4QG-.js";import"./Header-CjlN0tsx.js";import"./LayoutWrapper-DeKwNDSI.js";import"./StatusTag-DOZdGwPI.js";import"./Tag-0FTiUioX.js";import"./Stroller-0q9h2n5w.js";import"./NoeGikkGalt-DcLdS47O.js";import"./MinidialogSkjema-WdWj7O66.js";import"./HarIkkeSaker-BI66SCop.js";import"./SøkelenkerPanel-Bfewq7en.js";import"./HarSaker-Cp68XW81.js";import"./SakLink-Dfo6QYMA.js";import"./guid-CsArkN6i.js";import"./ContentSection-DXZeBLM7.js";import"./BekreftelseSendtSøknad-CSKOJ1Oo.js";import"./KontonummerInfo-DVl8addU.js";import"./Accordion-BKomoaF_.js";import"./Svangerskapspenger-CyGZQIjT.js";import"./DinPlan-B1gQMTTN.js";import"./Oppgaver-BL_Zj7aX.js";import"./OppgaveLenkepanel-cD_5WziM.js";import"./KontaktOss-DnYJpGIF.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
