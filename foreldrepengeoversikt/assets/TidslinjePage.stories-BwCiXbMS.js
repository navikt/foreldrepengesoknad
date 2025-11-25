import{i as a,j as t}from"./iframe-B9zDIt87.js";import{h as r,H as s}from"./index-BQ71cfIv.js";import{t as p,m as l}from"./tidslinjeHendelser-FUwYXmx4.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-W-aItBYt.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-Dup3eT8t.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-V1bhxGJl.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DVCt-edu.js";import"./useBackgroundColor-CZO446Xf.js";import"./useSelectedSak-CyO_XGN3.js";import"./useQuery-BCMlmzHC.js";import"./sakerUtils-I_zLgmlr.js";import"./Snarveier-DDTQJYE6.js";import"./LenkePanel-CINpJRCv.js";import"./index-B2tUhBeO.js";import"./Header-M1SZctbt.js";import"./LayoutWrapper-CxzrFhGM.js";import"./StatusTag-CTNjFXJa.js";import"./Tag-CPGLJEBT.js";import"./Stroller-DlvJZ9ox.js";import"./NoeGikkGalt-DJ0TQ42v.js";import"./MinidialogSkjema-Dn_7vKgJ.js";import"./HarIkkeSaker-CiwsODFs.js";import"./SøkelenkerPanel-Bf1OXCY2.js";import"./HarSaker-CUu43FdB.js";import"./SakLink-DFjE2H4E.js";import"./guid-CsArkN6i.js";import"./ContentSection-Cf1PF75t.js";import"./BekreftelseSendtSøknad-DZdRebtD.js";import"./KontonummerInfo-ByN5JcvL.js";import"./Accordion-Tjl6s9vt.js";import"./Svangerskapspenger-C9b_EFQZ.js";import"./DinPlan-DEjKoGQ2.js";import"./Oppgaver-JlEg-cXR.js";import"./OppgaveLenkepanel-CDiGM2G_.js";import"./KontaktOss-CAdC4_lQ.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
