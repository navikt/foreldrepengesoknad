import{k as a,j as t}from"./iframe-YzsMqPi8.js";import{h as r,H as s}from"./index-vK98giye.js";import{t as p,m as l}from"./tidslinjeHendelser-DYAPReuf.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-yCGiMydJ.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DDq6PguY.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-D6SMBpmh.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-D1GIyISl.js";import"./useBackgroundColor-9zaGeqzn.js";import"./useSelectedSak-D9PRTkeR.js";import"./useQuery-Nzci2VYI.js";import"./sakerUtils-ddEy9qcR.js";import"./Snarveier-CnKlgYmg.js";import"./LenkePanel-BEXt--Bm.js";import"./index-CaD3v7ks.js";import"./Header-BO4kqZOf.js";import"./LayoutWrapper-eL9-q2RG.js";import"./StatusTag-CsEdrS0K.js";import"./Tag-7xqxeoiU.js";import"./Stroller-TVhFeVt4.js";import"./NoeGikkGalt-C8-5qTO3.js";import"./MinidialogSkjema-BYc6fHnC.js";import"./HarIkkeSaker-DPaDfcu5.js";import"./SøkelenkerPanel-gpYHJaET.js";import"./HarSaker-BKlriR10.js";import"./SakLink-DkKpdSgo.js";import"./guid-CsArkN6i.js";import"./ContentSection-CnBGrHSD.js";import"./BekreftelseSendtSøknad-D1Lj1wTp.js";import"./KontonummerInfo-D-_tsuJh.js";import"./Accordion-DBKWjWKJ.js";import"./Svangerskapspenger-Bs9bai9L.js";import"./DinPlan-DCs_wOJh.js";import"./Oppgaver-BDeCVkMv.js";import"./OppgaveLenkepanel-CTXLbGFl.js";import"./KontaktOss-DCzOM4VL.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
