import{i as a,j as t}from"./iframe-CLM11C8m.js";import{h as r,H as s}from"./index-DQwqjeWI.js";import{t as p,m as l}from"./tidslinjeHendelser-D92uZHbH.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-VyfYVLlM.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DAXsYKoC.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-CE4fpZis.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-Dhg6re-Y.js";import"./useBackgroundColor-BdijMl_b.js";import"./useSelectedSak-CFVycs97.js";import"./useQuery-CxJ4Fx3z.js";import"./sakerUtils-BWtzJuuh.js";import"./Snarveier-SdB9mKVu.js";import"./LenkePanel-Coi1Fzq7.js";import"./index-BeDkJ9GN.js";import"./Header-6WvV_Imq.js";import"./LayoutWrapper-BnGZ8TGR.js";import"./StatusTag-BYEbQW5B.js";import"./Tag-nExZsBw2.js";import"./Stroller-K7VyG0M4.js";import"./NoeGikkGalt-BvGApvhi.js";import"./MinidialogSkjema-Bxe4TlQ1.js";import"./HarIkkeSaker-Dve-D20M.js";import"./SøkelenkerPanel-D-UYFpnp.js";import"./HarSaker-svnu9FkH.js";import"./SakLink-Bj51we0L.js";import"./guid-CsArkN6i.js";import"./ContentSection-BN5pNG0O.js";import"./BekreftelseSendtSøknad-C3bAvcaP.js";import"./KontonummerInfo-B6BKyvcD.js";import"./Accordion-Ck9OfTuC.js";import"./Svangerskapspenger-C7kkLop-.js";import"./DinPlan-CVo-z6qH.js";import"./Oppgaver-DZgaQcWS.js";import"./OppgaveLenkepanel-CRFmst_G.js";import"./KontaktOss-BU1DrjfQ.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
