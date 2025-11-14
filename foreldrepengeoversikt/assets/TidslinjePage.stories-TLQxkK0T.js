import{i as a,j as t}from"./iframe-CHBp5mco.js";import{h as r,H as s}from"./index-CJJeQPEj.js";import{t as p,m as l}from"./tidslinjeHendelser-BMHmkeBA.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-BnhuEqMy.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-ZDRBsb2A.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX--rKPn0a_.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DPb0bvUi.js";import"./useBackgroundColor-UUaTUeBb.js";import"./useSelectedSak-CyRvXztB.js";import"./useQuery-C8HnQlxs.js";import"./sakerUtils-CHz1qe4r.js";import"./Snarveier-BLXhjx84.js";import"./LenkePanel-BzMd5jfj.js";import"./index-8OSy6IaS.js";import"./Header-Dvajy6ge.js";import"./LayoutWrapper-CbgtK21Y.js";import"./StatusTag-CAnZD10P.js";import"./Tag-Bi1sbKuY.js";import"./Stroller-DGgUmXrs.js";import"./NoeGikkGalt-5FtpipOA.js";import"./MinidialogSkjema-D4gs2ORm.js";import"./HarIkkeSaker-CPyAJrUD.js";import"./SøkelenkerPanel-39SzvSqE.js";import"./HarSaker-Cp6WSgjy.js";import"./SakLink-CJg4CCGo.js";import"./guid-CsArkN6i.js";import"./ContentSection-CzMnkoWk.js";import"./BekreftelseSendtSøknad-DXKH1F95.js";import"./KontonummerInfo-CamQ_C8U.js";import"./Accordion-BwEcU_B4.js";import"./Svangerskapspenger-XGwXudBQ.js";import"./DinPlan-Cps6-Hlj.js";import"./Oppgaver-Dk-3Kifi.js";import"./OppgaveLenkepanel-BXEVrtbq.js";import"./KontaktOss-Cl_D56cL.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
