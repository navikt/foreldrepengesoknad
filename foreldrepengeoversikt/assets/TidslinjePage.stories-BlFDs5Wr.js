import{k as p,j as t}from"./iframe-Bp3e24hP.js";import{h as e,H as r}from"./index-BFXzuPhJ.js";import{t as a,m as l}from"./tidslinjeHendelser-BkTNvlhg.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-BglySxB0.js";import{A as s}from"./queries-DAY86fnV.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-CyjgKWWL.js";import{M as f,R as j,a as k}from"./chunk-4WY6JWTD-DZecOFxc.js";import"./preload-helper-PPVm8Dsz.js";import"./skjemanummer-CkIPvUwF.js";import"./useBackgroundColor-B4n62h5j.js";import"./useSelectedSak-BuJ5Wwrs.js";import"./useQuery-ZsBEE7wQ.js";import"./sakerUtils-BsUg9NeS.js";import"./Snarveier-2rybzzue.js";import"./LenkePanel-Cb3IoTPA.js";import"./index-Dqo1NiLS.js";import"./Header-xJsSyreE.js";import"./LayoutWrapper-DvVKj3mg.js";import"./StatusTag-C4UPAMfY.js";import"./Tag-D_uFJG5Z.js";import"./Stroller-BZ9i74y5.js";import"./NoeGikkGalt-DIQcj7Xe.js";import"./MinidialogSkjema-DTeeZG_g.js";import"./HarIkkeSaker-ufYOmQOo.js";import"./SøkelenkerPanel-CQJTaVTl.js";import"./HarSaker-D_nGuFVD.js";import"./SakLink-CSqXG7Ao.js";import"./guid-CsArkN6i.js";import"./ContentSection-DK8H8Pnq.js";import"./BekreftelseSendtSøknad-CYlwmCVt.js";import"./KontonummerInfo-DLzfWCFe.js";import"./Accordion-Bcq2pTSD.js";import"./Svangerskapspenger-BSQbyVzQ.js";import"./DinPlan-CM74i3bK.js";import"./Oppgaver-C6ETIam8.js";import"./OppgaveLenkepanel-BruDCBFM.js";import"./KontaktOss-D7Pap1uY.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
