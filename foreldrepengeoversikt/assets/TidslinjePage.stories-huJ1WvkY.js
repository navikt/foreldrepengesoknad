import{i as a,j as t}from"./iframe-s4H1Tq5J.js";import{h as r,H as s}from"./index-C2i2nN31.js";import{t as p,m as l}from"./tidslinjeHendelser-ClTBOiWx.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-CUHU1KgR.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DkMB9sLU.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BIbgi1Jp.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DWoI4lDE.js";import"./useBackgroundColor-CkYxMiOV.js";import"./useSelectedSak-C02sOleC.js";import"./useQuery-DEALdBVj.js";import"./sakerUtils-BqVJC0P-.js";import"./Snarveier-CScQzwZi.js";import"./LenkePanel-CT05NgkJ.js";import"./index-C4rwrMSG.js";import"./Header-C4HPWX5q.js";import"./LayoutWrapper-DIwVAKFm.js";import"./StatusTag-DKlcTa-F.js";import"./Tag-B6H9AoRE.js";import"./Stroller-1aCT9EOg.js";import"./NoeGikkGalt-qIOPFk3f.js";import"./MinidialogSkjema-D-4lfSYu.js";import"./HarIkkeSaker-Dh9VH981.js";import"./SøkelenkerPanel-DL1-xEdr.js";import"./HarSaker-DTwuRtCu.js";import"./SakLink-cTjAfUX5.js";import"./guid-CsArkN6i.js";import"./ContentSection-KP6pDO8d.js";import"./BekreftelseSendtSøknad-Cw_6CP-y.js";import"./KontonummerInfo-CzZ591g0.js";import"./Accordion-DhrabKwy.js";import"./Svangerskapspenger-jOVuxcIO.js";import"./DinPlan-O385iEEt.js";import"./Oppgaver-kVUzLV2Q.js";import"./OppgaveLenkepanel-CX_ekNw8.js";import"./KontaktOss-cx7MV-yi.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
