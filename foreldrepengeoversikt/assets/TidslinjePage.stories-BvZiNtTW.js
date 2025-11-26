import{k as a,j as t}from"./iframe-BI9QSXZr.js";import{h as r,H as s}from"./index-DaDBRA_E.js";import{t as p,m as l}from"./tidslinjeHendelser-CfH2eQB6.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-DAuguvDX.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-D_rFVutN.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-DYstmieC.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-C2l6TN18.js";import"./useBackgroundColor-vfMUX3ZO.js";import"./useSelectedSak-CjdGVzSa.js";import"./useQuery-C1mSCsYn.js";import"./sakerUtils-B6QKtVZ4.js";import"./Snarveier-Ci3aQSwU.js";import"./LenkePanel-RDI1yw1D.js";import"./index-5p5JUpbu.js";import"./Header-CRqhBpK6.js";import"./LayoutWrapper-yl0MwaHL.js";import"./StatusTag-CD5jykrh.js";import"./Tag-Cpxh_dm2.js";import"./Stroller-BdShnn7V.js";import"./NoeGikkGalt-Bv1ISugT.js";import"./MinidialogSkjema-BzUMy4FB.js";import"./HarIkkeSaker-DoA6UQ2F.js";import"./SøkelenkerPanel-BPDuzhZO.js";import"./HarSaker-CHGA00KP.js";import"./SakLink-XrIVQaIC.js";import"./guid-CsArkN6i.js";import"./ContentSection-hw-io5C0.js";import"./BekreftelseSendtSøknad-CwUS5GO2.js";import"./KontonummerInfo-BAPJBFww.js";import"./Accordion-v3gnvu2h.js";import"./Svangerskapspenger-BNEHvtMV.js";import"./DinPlan-Dd6HspcL.js";import"./Oppgaver-Cxr0mpIe.js";import"./OppgaveLenkepanel-Btn-7D33.js";import"./KontaktOss-CjbdloW6.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
