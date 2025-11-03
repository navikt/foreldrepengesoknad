import{i as a,j as t}from"./iframe-Bmlf-17G.js";import{h as r,H as o}from"./index-CfbI1xII.js";import{t as p,m as l}from"./tidslinjeHendelser-BK1ZPWCS.js";import{s as d}from"./saker-D7XUCRJ2.js";import{A as s}from"./api-CDjlA43A.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DJExWflL.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BiBQCdcs.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-B9qltKdz.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-DdEGTa0o.js";import"./useSelectedSak-D9nn8f46.js";import"./useQuery-CehYOWyP.js";import"./sakerUtils-BaiOTc54.js";import"./Snarveier-rZRw7Cl8.js";import"./LenkePanel-DBAT81SE.js";import"./index-Bo08OCAU.js";import"./Header-CzlbGrQ_.js";import"./LayoutWrapper-BFeTr1RZ.js";import"./StatusTag-Cwd9YMtN.js";import"./Tag-C8FrgaZT.js";import"./Stroller-DPOjBTxc.js";import"./NoeGikkGalt-xvngV7fg.js";import"./MinidialogSkjema-fiKuneX7.js";import"./HarIkkeSaker-B2ollwcr.js";import"./SøkelenkerPanel-Dp4Cn8eA.js";import"./HarSaker-DnH4ti8B.js";import"./SakLink-CJ3w6lxb.js";import"./guid-CsArkN6i.js";import"./ContentSection-mO2Cfx5N.js";import"./BekreftelseSendtSøknad-BBC-DRsn.js";import"./KontonummerInfo-in0u2e7J.js";import"./Accordion-Co6cjIx5.js";import"./Svangerskapspenger-BFAsuM71.js";import"./DinPlan-Dke7oFMw.js";import"./Oppgaver-CIPYmKpK.js";import"./OppgaveLenkepanel-Dz5A6g9b.js";import"./KontaktOss-PuJUxL0q.js";const tt={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(s.saker,()=>o.json(d)),r.get(s.tidslinje,()=>o.json(p)),r.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
