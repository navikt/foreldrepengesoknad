import{i as a,j as t}from"./iframe-CqlIMwyD.js";import{h as r,H as s}from"./index-7TZXeNw8.js";import{t as p,m as l}from"./tidslinjeHendelser-QXU-_Tqv.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-BLDsb-vd.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-Jv43dgSP.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-CuezIiIy.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-C-dsO8-T.js";import"./useBackgroundColor-CAv2smT6.js";import"./useSelectedSak-Iy2SXwi5.js";import"./useQuery-NkKsfTLb.js";import"./sakerUtils-_oBy8g7X.js";import"./Snarveier-DwUhN7v9.js";import"./LenkePanel-COZ360NH.js";import"./index-iKKdMve9.js";import"./Header-COF0Q4GT.js";import"./LayoutWrapper-CXVq_r4R.js";import"./StatusTag-DzmNJ2Zf.js";import"./Tag-BAtcE7kH.js";import"./Stroller-BzhEvoIh.js";import"./NoeGikkGalt-Bsq9ym2N.js";import"./MinidialogSkjema-BsqRqDAj.js";import"./HarIkkeSaker-BqD5amSB.js";import"./SøkelenkerPanel-DHPKCd4J.js";import"./HarSaker-D0nflItS.js";import"./SakLink-CVEVKV3K.js";import"./guid-CsArkN6i.js";import"./ContentSection-Cq-USxmB.js";import"./BekreftelseSendtSøknad-o8KjZy8Z.js";import"./KontonummerInfo-DiWlefA0.js";import"./Accordion-c1XjP7mn.js";import"./Svangerskapspenger-CPv6vxR9.js";import"./DinPlan-DmW6liY6.js";import"./Oppgaver-BXtYFvto.js";import"./OppgaveLenkepanel-BPAkre0n.js";import"./KontaktOss-Bd5x5GLF.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
