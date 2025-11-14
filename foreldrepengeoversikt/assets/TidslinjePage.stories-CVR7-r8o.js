import{i as a,j as t}from"./iframe-Do_Eq0FZ.js";import{h as r,H as s}from"./index-DydRtpTE.js";import{t as p,m as l}from"./tidslinjeHendelser-o6jCemRw.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-JZJPYUll.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-C8XB6a1F.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-3Em1RBOH.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CjqG4pz_.js";import"./useBackgroundColor-BbGCpnLf.js";import"./useSelectedSak-VWedQopq.js";import"./useQuery-D3ZWFTAx.js";import"./sakerUtils-1WZMz6wV.js";import"./Snarveier-Bka1vFh4.js";import"./LenkePanel-B8nuO5_w.js";import"./index-BNg6vTO_.js";import"./Header-Cs_11Wl3.js";import"./LayoutWrapper-DaxataN6.js";import"./StatusTag-B-FqG1OO.js";import"./Tag-l0hT8VK5.js";import"./Stroller-DEongMha.js";import"./NoeGikkGalt-CXVdzdNm.js";import"./MinidialogSkjema-Bn9p4F8j.js";import"./HarIkkeSaker-COJESSAC.js";import"./SøkelenkerPanel-Cyz2--Zb.js";import"./HarSaker-FzzHWKXp.js";import"./SakLink-ClOdASMh.js";import"./guid-CsArkN6i.js";import"./ContentSection-DcNfy1of.js";import"./BekreftelseSendtSøknad-BUmtTqhb.js";import"./KontonummerInfo-DGmPMxfZ.js";import"./Accordion-ClTqvdVQ.js";import"./Svangerskapspenger-3qch9PeX.js";import"./DinPlan-dxHdwBAM.js";import"./Oppgaver-BfL8ipGF.js";import"./OppgaveLenkepanel-CsoxoJoy.js";import"./KontaktOss-C66_oYah.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
