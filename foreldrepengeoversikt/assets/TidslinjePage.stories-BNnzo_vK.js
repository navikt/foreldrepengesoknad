import{k as p,j as t}from"./iframe-DRfCgLAJ.js";import{h as e,H as r}from"./index-BAMt_Dyp.js";import{t as a,m as l}from"./tidslinjeHendelser-D0Qn82S1.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-DDQyFY1h.js";import{A as s}from"./queries-OQtTuHlc.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-BdOHTbLc.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-I9aqfGqy.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-BIwt3Xav.js";import"./useBackgroundColor-Da49AGBU.js";import"./useSelectedSak-BeMpm25Q.js";import"./useQuery-Da6KQxxY.js";import"./sakerUtils-CuAgs-bc.js";import"./Snarveier-Bn_CKixn.js";import"./LenkePanel-Ca0AaUAY.js";import"./index-pAElvg8C.js";import"./Header-DepfGFVj.js";import"./LayoutWrapper-DjTxVVHo.js";import"./StatusTag-bDFz-Ni6.js";import"./Tag-TINjYXly.js";import"./Stroller-BBNkWBRS.js";import"./NoeGikkGalt-Bl-qRoGq.js";import"./MinidialogSkjema-CubR7bz5.js";import"./HarIkkeSaker-Bz4zuFKh.js";import"./SøkelenkerPanel-CJlF0n_b.js";import"./HarSaker-DKBgUSUV.js";import"./SakLink-EQZDAyeu.js";import"./guid-CsArkN6i.js";import"./ContentSection-DPbUbbOb.js";import"./BekreftelseSendtSøknad-CR5bmcWV.js";import"./KontonummerInfo-CsldtXSr.js";import"./Accordion-DXN5qfOG.js";import"./Svangerskapspenger-CiM1SDX9.js";import"./DinPlan-VW6vBqOu.js";import"./Oppgaver-BsKlemMZ.js";import"./OppgaveLenkepanel-EGHTn7YL.js";import"./KontaktOss-DLej1pCF.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
