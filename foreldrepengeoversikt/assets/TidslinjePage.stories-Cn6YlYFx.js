import{i as a,j as t}from"./iframe-NzRkLCZT.js";import{h as r,H as o}from"./index-BnxWf0xd.js";import{t as p,m as l}from"./tidslinjeHendelser-ef-Te83n.js";import{s as d}from"./saker-DFul80eV.js";import{A as s}from"./api-t8N-hJp1.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BZCySF0e.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-D1yeyGCE.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-Bpi9_Wl0.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-C_Wuftra.js";import"./useSelectedSak-B16MAJpd.js";import"./useQuery-BCik-Gz0.js";import"./sakerUtils-C9cJJBd1.js";import"./Snarveier-DfcvxVYa.js";import"./LenkePanel-CBJ5JoRI.js";import"./index-aN7YHONY.js";import"./Header-Be57bexB.js";import"./LayoutWrapper-kB5v_At_.js";import"./StatusTag-D2R2aObx.js";import"./Tag-B24nxdgL.js";import"./Stroller-BhG3gRKQ.js";import"./NoeGikkGalt-kVmLvbn7.js";import"./MinidialogSkjema-CdYpZLKl.js";import"./HarIkkeSaker-V-PB7att.js";import"./SøkelenkerPanel-DOWt52VK.js";import"./HarSaker-CgnPZ8gi.js";import"./SakLink-3ESuBLiS.js";import"./guid-CsArkN6i.js";import"./ContentSection-BNwvEdEV.js";import"./BekreftelseSendtSøknad-DcExopst.js";import"./KontonummerInfo-Bo2s7J5w.js";import"./Accordion-DAyAD_3S.js";import"./Svangerskapspenger-CWDSKFw6.js";import"./DinPlan-BoiY3Zmp.js";import"./Oppgaver-BP3L2cM4.js";import"./OppgaveLenkepanel-C19s6_s8.js";import"./KontaktOss-Je5HsmgJ.js";const tt={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(s.saker,()=>o.json(d)),r.get(s.tidslinje,()=>o.json(p)),r.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const et=["Default"];export{e as Default,et as __namedExportsOrder,tt as default};
