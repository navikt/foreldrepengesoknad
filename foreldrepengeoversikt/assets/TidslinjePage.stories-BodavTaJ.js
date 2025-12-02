import{k as p,j as t}from"./iframe-C02UIJTn.js";import{h as e,H as r}from"./index-DUkSGXfZ.js";import{t as a,m as l}from"./tidslinjeHendelser-DS2sKPoL.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-LaPpue9z.js";import{A as s}from"./queries-COqXfTKu.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-CgPsC5wr.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-E-gqrAOv.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-BBw0Pcgg.js";import"./useBackgroundColor-C3rV0P8u.js";import"./useSelectedSak-2Ofwx3lk.js";import"./useQuery-H3MkfJf0.js";import"./sakerUtils-BohMeg_a.js";import"./Snarveier-BOY-EKs_.js";import"./LenkePanel-BJme2XlG.js";import"./index-DmUSWObV.js";import"./Header-DVHVb14e.js";import"./LayoutWrapper-C061B-Tz.js";import"./StatusTag-CNlJ8qPA.js";import"./Tag-X54_4qSZ.js";import"./Stroller-b6AMemNf.js";import"./NoeGikkGalt-DfLpkz0B.js";import"./MinidialogSkjema-DrMdHyqI.js";import"./HarIkkeSaker-Cr_DjyQU.js";import"./SøkelenkerPanel-iU5amEz2.js";import"./HarSaker-CsY_OgDa.js";import"./SakLink-Ckxc2lx9.js";import"./guid-CsArkN6i.js";import"./ContentSection-oFmGNg1j.js";import"./BekreftelseSendtSøknad-CE07VIIP.js";import"./KontonummerInfo-DUy74vKx.js";import"./Accordion-BzDuqJ79.js";import"./Svangerskapspenger-DqDdUbJp.js";import"./DinPlan-BLZrmsxf.js";import"./Oppgaver-_48J60dP.js";import"./OppgaveLenkepanel-Drer4Ffb.js";import"./KontaktOss-Brec9b2P.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)), http.get(API_URLS.søkerInfo, () => HttpResponse.json(søkerinfo))]
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
}`,...o.parameters?.docs?.source}}};const rt=["Default"];export{o as Default,rt as __namedExportsOrder,et as default};
