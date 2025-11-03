import{i as a,j as t}from"./iframe-BKI6cC33.js";import{h as r,H as o}from"./index-DL3Hp0SN.js";import{t as p,m as l}from"./tidslinjeHendelser-aouAcZqj.js";import{s as d}from"./saker-BGavh7Re.js";import{A as s}from"./api-D-TdPrIH.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DCpxql6H.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-Cn2WmO03.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-t4pygZKr.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-DRM2Zd0c.js";import"./useSelectedSak-CvPGv6z3.js";import"./useQuery-B1In-Ozd.js";import"./sakerUtils-B0FWqSnv.js";import"./Snarveier-ZHnGXouo.js";import"./LenkePanel-BVwxfvRf.js";import"./index-k6Agq-rz.js";import"./Header-CReTPVUH.js";import"./LayoutWrapper-BxHhnlHx.js";import"./StatusTag-CDQY1gX9.js";import"./Tag-D9FY2zAl.js";import"./Stroller-DvpFQKjQ.js";import"./NoeGikkGalt-DwP6GmDd.js";import"./MinidialogSkjema-CPnqzIRY.js";import"./HarIkkeSaker-CH6e6sp7.js";import"./SøkelenkerPanel-DT5bZnOK.js";import"./HarSaker-AHClvLkF.js";import"./SakLink-CEzn-0AR.js";import"./guid-CsArkN6i.js";import"./ContentSection-DKGMaT-l.js";import"./BekreftelseSendtSøknad-DiBlUerl.js";import"./KontonummerInfo-vRnpjbmi.js";import"./Accordion-E6Qlxw5e.js";import"./Svangerskapspenger-D9SxNrC3.js";import"./DinPlan-BMD27JoB.js";import"./Oppgaver-Csl9XkFh.js";import"./OppgaveLenkepanel-BvztiMSJ.js";import"./KontaktOss-RCq96gfb.js";const tt={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(s.saker,()=>o.json(d)),r.get(s.tidslinje,()=>o.json(p)),r.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
