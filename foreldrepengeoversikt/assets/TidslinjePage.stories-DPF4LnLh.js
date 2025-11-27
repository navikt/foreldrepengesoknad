import{k as p,j as t}from"./iframe-C0R_477Z.js";import{h as e,H as r}from"./index-Ds3UyqQV.js";import{t as a,m as l}from"./tidslinjeHendelser-BSyq96Cl.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-VEEbDyyu.js";import{A as s}from"./queries-DRMr9xHm.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DrjUQXTq.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-DQpDkLTJ.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DctC70Cl.js";import"./useBackgroundColor-Ccw6l7bl.js";import"./useSelectedSak-BAHppzTV.js";import"./useQuery-DR1U2mtr.js";import"./sakerUtils-BAkqT1XW.js";import"./Snarveier-9XvrVtA_.js";import"./LenkePanel-C874mWeL.js";import"./index-CIijIYK0.js";import"./Header-vNUrMwli.js";import"./LayoutWrapper-D0oAnIac.js";import"./StatusTag-CBXVt74q.js";import"./Tag-DkrWPVfl.js";import"./Stroller-DycvbsIT.js";import"./NoeGikkGalt-D7bECneX.js";import"./MinidialogSkjema-BgHRgna9.js";import"./HarIkkeSaker-DtA5A6n2.js";import"./SøkelenkerPanel-BQzdMZVs.js";import"./HarSaker-DsgQjhPe.js";import"./SakLink-B08wp0Xx.js";import"./guid-CsArkN6i.js";import"./ContentSection-CUXwMpaj.js";import"./BekreftelseSendtSøknad-Krzm3tfw.js";import"./KontonummerInfo-B1curDGR.js";import"./Accordion-TYSykiay.js";import"./Svangerskapspenger-BhsqLaDt.js";import"./DinPlan-CHqVopfO.js";import"./Oppgaver-BXsGUhFx.js";import"./OppgaveLenkepanel-BtQW8azI.js";import"./KontaktOss-BarQqmV_.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
