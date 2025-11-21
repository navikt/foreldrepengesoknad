import{i as a,j as t}from"./iframe-DoW6OxbK.js";import{h as r,H as s}from"./index-OFSud93j.js";import{t as p,m as l}from"./tidslinjeHendelser-CCM-wGEW.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-BocRl32X.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-C38xvKnu.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-DnwaNCuG.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DDSQq6vc.js";import"./useBackgroundColor-DcUmuyoB.js";import"./useSelectedSak-Cn0j07hs.js";import"./useQuery-BpHolZ9F.js";import"./sakerUtils-qq6kih1U.js";import"./Snarveier-Dgk5AxUF.js";import"./LenkePanel-hmKVpLO5.js";import"./index-DDb9nB8b.js";import"./Header-Cz7PaK7L.js";import"./LayoutWrapper-BZURKrqE.js";import"./StatusTag-DKo2j9Gu.js";import"./Tag-CVCROYFu.js";import"./Stroller-DO7G4ANq.js";import"./NoeGikkGalt-bEBpmOIq.js";import"./MinidialogSkjema-dw1xt4qp.js";import"./HarIkkeSaker-Dbx6jP_Z.js";import"./SøkelenkerPanel-BJeVosXt.js";import"./HarSaker-CVsmHkfZ.js";import"./SakLink-BFfzC-yi.js";import"./guid-CsArkN6i.js";import"./ContentSection-Bnh-6E_r.js";import"./BekreftelseSendtSøknad-B4yIB0iQ.js";import"./KontonummerInfo-CEUtEu0U.js";import"./Accordion-Ct7Nd3u-.js";import"./Svangerskapspenger-C6ge9hhx.js";import"./DinPlan-FsGlsoMz.js";import"./Oppgaver-BZFoHktm.js";import"./OppgaveLenkepanel-K09boPBy.js";import"./KontaktOss-CRJgkrbe.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
