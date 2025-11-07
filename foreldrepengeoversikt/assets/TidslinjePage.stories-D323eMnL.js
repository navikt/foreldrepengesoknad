import{i as a,j as t}from"./iframe-DqM_U5bt.js";import{h as r,H as s}from"./index-YjCW9cp3.js";import{t as p,m as l}from"./tidslinjeHendelser-BUZfUtTU.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-DpjHa_ad.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-kMX9tjX_.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-Cx3ZL2s4.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DywuPcs5.js";import"./useBackgroundColor-BFMBgoIx.js";import"./useSelectedSak-3EA5VjAa.js";import"./useQuery-CuTRAVAy.js";import"./sakerUtils-R9VPLdmW.js";import"./Snarveier-C-FJer0R.js";import"./LenkePanel-VqwbXGaW.js";import"./index-Dmxwyr-p.js";import"./Header-C6D744Do.js";import"./LayoutWrapper-DTEK7nvp.js";import"./StatusTag-BTGXmct5.js";import"./Tag-DeGVqK8t.js";import"./Stroller-yfw_gxLe.js";import"./NoeGikkGalt-Dg3Ds0hh.js";import"./MinidialogSkjema-B48hiHzg.js";import"./HarIkkeSaker-DY1r8Adq.js";import"./SøkelenkerPanel-BCnEO0GJ.js";import"./HarSaker-B02z2C2K.js";import"./SakLink-Bcw09vkc.js";import"./guid-CsArkN6i.js";import"./ContentSection-CQZPSm-Z.js";import"./BekreftelseSendtSøknad-Dx9uoyRw.js";import"./KontonummerInfo-CuI4UGOs.js";import"./Accordion-X0QqF6E0.js";import"./Svangerskapspenger-9II2UJvF.js";import"./DinPlan-CRN5wEcb.js";import"./Oppgaver-D6T6nC8v.js";import"./OppgaveLenkepanel-B-HfSr7v.js";import"./KontaktOss-B-NkatEB.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
