import{i as a,j as t}from"./iframe-CdYtWI9G.js";import{h as r,H as s}from"./index-FQeIYOKF.js";import{t as p,m as l}from"./tidslinjeHendelser-CyW0WghP.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-C5ohGfx5.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BIYctCrw.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-6vtQ1n3A.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BEkbk-b9.js";import"./useBackgroundColor-hpLla-mh.js";import"./useSelectedSak-DeP1LXWm.js";import"./useQuery-08_cy6N4.js";import"./sakerUtils-CDBaZLKl.js";import"./Snarveier-DXVueNic.js";import"./LenkePanel-BPxRb78l.js";import"./index-Cek65idl.js";import"./Header-CimLqDqF.js";import"./LayoutWrapper-uOhxq1N-.js";import"./StatusTag-C8jjSR7g.js";import"./Tag-C9ku7rr1.js";import"./Stroller-DuE6hihZ.js";import"./NoeGikkGalt-CWl6RArp.js";import"./MinidialogSkjema-KSglYnse.js";import"./HarIkkeSaker-BIi6IgvT.js";import"./SøkelenkerPanel-BTwSU-NL.js";import"./HarSaker-LxGrH36m.js";import"./SakLink-CUkxNdJJ.js";import"./guid-CsArkN6i.js";import"./ContentSection-D8R5Q54f.js";import"./BekreftelseSendtSøknad-CF4dYUtb.js";import"./KontonummerInfo-C0VudJJ3.js";import"./Accordion-Chslv0_Q.js";import"./Svangerskapspenger-BLikY1mN.js";import"./DinPlan-DUBxv4Ja.js";import"./Oppgaver-D11F3WKJ.js";import"./OppgaveLenkepanel-DHFccURI.js";import"./KontaktOss-D4Kj_aNe.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
