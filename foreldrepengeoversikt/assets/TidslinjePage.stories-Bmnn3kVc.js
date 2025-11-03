import{i as a,j as t}from"./iframe-8octdunc.js";import{h as r,H as o}from"./index-CgAQS0qf.js";import{t as p,m as l}from"./tidslinjeHendelser-Cve-bsUz.js";import{s as d}from"./saker-DctyH1gt.js";import{A as s}from"./api-B5MjB1Ci.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-ByXwypRA.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-DMacgKkH.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DrvHvcVS.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-cgOgcG_i.js";import"./useSelectedSak-CBnmZGr5.js";import"./useQuery-CngO3VVu.js";import"./sakerUtils-B96jmMfa.js";import"./Snarveier-CxNPb2lE.js";import"./LenkePanel-BAX145P0.js";import"./index-DHWQH0KD.js";import"./Header-C3nNWT-s.js";import"./LayoutWrapper-lhCmWPRW.js";import"./StatusTag-Brk33Wgh.js";import"./Tag-DRboymZv.js";import"./Stroller-mnKRSd6Y.js";import"./NoeGikkGalt-DsvhU-yy.js";import"./MinidialogSkjema-C-4a8O7f.js";import"./HarIkkeSaker-lchQQuxj.js";import"./SøkelenkerPanel-BE9sKy0n.js";import"./HarSaker-NcIFjw2M.js";import"./SakLink-DX1-SL_8.js";import"./guid-CsArkN6i.js";import"./ContentSection-CZ1LJ9ao.js";import"./BekreftelseSendtSøknad-BXQV-JwV.js";import"./KontonummerInfo-DU8r1qIW.js";import"./Accordion-DODEcJvo.js";import"./Svangerskapspenger-y55MXDdA.js";import"./DinPlan-BJ-1vr9C.js";import"./Oppgaver-CwvajHZp.js";import"./OppgaveLenkepanel-DyeIcf0b.js";import"./KontaktOss-B-gUCus5.js";const tt={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(s.saker,()=>o.json(d)),r.get(s.tidslinje,()=>o.json(p)),r.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
