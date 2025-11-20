import{i as a,j as t}from"./iframe-2LNSm3GK.js";import{h as r,H as s}from"./index-gN36rpvM.js";import{t as p,m as l}from"./tidslinjeHendelser-5jrNunAx.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-DZ5CsPB9.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-Cqqd40pv.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BeqFs-Ce.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-3WnHteED.js";import"./useBackgroundColor-Co-cL57n.js";import"./useSelectedSak-BnIfbbVf.js";import"./useQuery-5LifWxEZ.js";import"./sakerUtils-DrojqzxK.js";import"./Snarveier-aZw_eiqw.js";import"./LenkePanel-Ced6YSYd.js";import"./index-B-FyZM74.js";import"./Header-D0cS6PvC.js";import"./LayoutWrapper-DZ4tDOjr.js";import"./StatusTag-vZP6xi9h.js";import"./Tag-fwdj0xxv.js";import"./Stroller-BxsY0id-.js";import"./NoeGikkGalt-Ux4LMPcx.js";import"./MinidialogSkjema-Dn6rBVai.js";import"./HarIkkeSaker-BZEUs3gR.js";import"./SøkelenkerPanel-Da1LovKr.js";import"./HarSaker-B0g2a28P.js";import"./SakLink-CB9PxaMe.js";import"./guid-CsArkN6i.js";import"./ContentSection-Cl3hsda_.js";import"./BekreftelseSendtSøknad-5JBOa1Co.js";import"./KontonummerInfo-ClAPpXTO.js";import"./Accordion-5j_XCgjC.js";import"./Svangerskapspenger-u_7NWws7.js";import"./DinPlan-CJ4vPiok.js";import"./Oppgaver-CwKeiQ9q.js";import"./OppgaveLenkepanel-DNo7wq8z.js";import"./KontaktOss-CzhwpTSs.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
