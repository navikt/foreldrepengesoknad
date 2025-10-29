import{i as a,j as t}from"./iframe-D7iZS0Rl.js";import{h as r,H as o}from"./index-CFwpPAIk.js";import{t as p,m as l}from"./tidslinjeHendelser-CgTWOd0Y.js";import{s as d}from"./saker-BZietHTC.js";import{A as s}from"./api-CPtsqy_l.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DRKesVGD.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-jftRwIVH.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-XA9rDaF0.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-D-oyw5r5.js";import"./useSelectedSak-umgqoxEt.js";import"./useQuery-D34Jv_RZ.js";import"./sakerUtils-D03rexZS.js";import"./Snarveier-8TbdVO-m.js";import"./LenkePanel-WjwhArpP.js";import"./index-CkwP6fpu.js";import"./Header-3TW0dXMO.js";import"./LayoutWrapper-pQFQVPFR.js";import"./StatusTag-BPYWWCje.js";import"./Tag-CGASHF6_.js";import"./Stroller-BPhpDbi_.js";import"./NoeGikkGalt-CSr3L8Gu.js";import"./MinidialogSkjema-Bx1YyXF7.js";import"./HarIkkeSaker-BgjgEV2n.js";import"./SøkelenkerPanel-1R_Jg1EJ.js";import"./HarSaker-BL92feus.js";import"./SakLink-B_Xo3gS7.js";import"./guid-CsArkN6i.js";import"./ContentSection-TKPcj0RE.js";import"./BekreftelseSendtSøknad-DesujtUl.js";import"./KontonummerInfo-R-2a_Rj0.js";import"./Accordion-DhRMgZlY.js";import"./Svangerskapspenger-IvNJGt4V.js";import"./DinPlan-CynSP_yb.js";import"./Oppgaver-1_bMEtO-.js";import"./OppgaveLenkepanel-DoTJpvxn.js";import"./KontaktOss-DPH3V908.js";const tt={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(s.saker,()=>o.json(d)),r.get(s.tidslinje,()=>o.json(p)),r.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
