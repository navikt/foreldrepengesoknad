import{i as a,j as t}from"./iframe-d0KbCfPB.js";import{h as r,H as s}from"./index-CURF-JvF.js";import{t as p,m as l}from"./tidslinjeHendelser-BF5N6aOK.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./api--iiU2iom.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-hVo5YUP5.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-BdxdPsvR.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DGv5j9CT.js";import"./useBackgroundColor-DVG8efUQ.js";import"./useSelectedSak-CJMWHVTL.js";import"./useQuery-AzDQctEn.js";import"./sakerUtils-DJKyKo15.js";import"./Snarveier-CIdj5h9G.js";import"./LenkePanel-DxHjdRo8.js";import"./index-DAvHPrvq.js";import"./Header-DTnNmcCL.js";import"./LayoutWrapper-Bssz12tf.js";import"./StatusTag-Fu9p2vny.js";import"./Tag-DytQfDDu.js";import"./Stroller-HgpLYbjH.js";import"./NoeGikkGalt-CjCCJKZE.js";import"./MinidialogSkjema-C3A5Yf-Z.js";import"./HarIkkeSaker-DnVh_mho.js";import"./SøkelenkerPanel-BbG-LWKG.js";import"./HarSaker-HzCremuC.js";import"./SakLink-DwMP2o8U.js";import"./guid-CsArkN6i.js";import"./ContentSection-CRYRFvn4.js";import"./BekreftelseSendtSøknad-CJ76HJLO.js";import"./KontonummerInfo-DgWmZTwE.js";import"./Accordion-qJaU7jTU.js";import"./Svangerskapspenger-Dax61RPy.js";import"./DinPlan-DhYvhh8c.js";import"./Oppgaver-hzYbyl0s.js";import"./OppgaveLenkepanel-DrSzFFNZ.js";import"./KontaktOss-Bipe2A9t.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
