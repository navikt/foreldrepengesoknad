import{i as a,j as t}from"./iframe-DciAJoi2.js";import{h as r,H as s}from"./index-CuUc4VtS.js";import{t as p,m as l}from"./tidslinjeHendelser-C1SjtqH4.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-DlC6G1g0.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-rtU7yS2I.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-ByMFDuX6.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-Khn0equI.js";import"./useBackgroundColor-Bgl9E30j.js";import"./useSelectedSak-DTu_ZQxA.js";import"./useQuery-DdEpYcWW.js";import"./sakerUtils-BCpfKy5e.js";import"./Snarveier-kIHKShoc.js";import"./LenkePanel-Bgufw8KJ.js";import"./index-0uH7i8yE.js";import"./Header-BggKAvJb.js";import"./LayoutWrapper-DEGQF4eV.js";import"./StatusTag-DaCjqPMf.js";import"./Tag-cE1opVQR.js";import"./Stroller-DnbSLXO4.js";import"./NoeGikkGalt-Dm8cpRe2.js";import"./MinidialogSkjema-Bb7vR15B.js";import"./HarIkkeSaker-Cq7Mw3OU.js";import"./SøkelenkerPanel-DP-w2Jlg.js";import"./HarSaker-XTEa5Zhc.js";import"./SakLink-DsL3OYSL.js";import"./guid-CsArkN6i.js";import"./ContentSection-LrJODwAj.js";import"./BekreftelseSendtSøknad-CBsMNl-c.js";import"./KontonummerInfo-wizhK0FS.js";import"./Accordion-CGnbs7lj.js";import"./Svangerskapspenger-DvTP7_zS.js";import"./DinPlan-BPSJ2gsw.js";import"./Oppgaver-CbEHHwgO.js";import"./OppgaveLenkepanel-BayST8Md.js";import"./KontaktOss-BT4psjPX.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
