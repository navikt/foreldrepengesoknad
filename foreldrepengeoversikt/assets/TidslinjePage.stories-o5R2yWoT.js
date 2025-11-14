import{i as a,j as t}from"./iframe-wtC6Pp_y.js";import{h as r,H as s}from"./index-DwEmd73G.js";import{t as p,m as l}from"./tidslinjeHendelser-Dss-jNQp.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-6xL3CkCc.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-CvgOuWFm.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BPAY_m8Z.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CcbJYI0Q.js";import"./useBackgroundColor-CA9Z3ZVe.js";import"./useSelectedSak-B7UTd8Uv.js";import"./useQuery-BFk2MbNQ.js";import"./sakerUtils-CUtc_40X.js";import"./Snarveier-BPLbPz6m.js";import"./LenkePanel-CIr-6dAX.js";import"./index-BDRw77VF.js";import"./Header-BLpegNLx.js";import"./LayoutWrapper-CKRO3epd.js";import"./StatusTag-C8uemo0U.js";import"./Tag-D9WWcRiI.js";import"./Stroller-ChH-TiXO.js";import"./NoeGikkGalt-DjaxhamC.js";import"./MinidialogSkjema-Bl9mqSGA.js";import"./HarIkkeSaker-DqmrQ3Z3.js";import"./SøkelenkerPanel-D9go9S7Z.js";import"./HarSaker-CRqDTIYe.js";import"./SakLink-CcT9R0zq.js";import"./guid-CsArkN6i.js";import"./ContentSection-B2z_xffn.js";import"./BekreftelseSendtSøknad-BizlGz07.js";import"./KontonummerInfo-CxnP8F9g.js";import"./Accordion-BXGdA62s.js";import"./Svangerskapspenger-CDm1qmgS.js";import"./DinPlan-CJ42avLV.js";import"./Oppgaver-bQbkiAMW.js";import"./OppgaveLenkepanel-CdQtFH7Z.js";import"./KontaktOss-BjXtKSjM.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
