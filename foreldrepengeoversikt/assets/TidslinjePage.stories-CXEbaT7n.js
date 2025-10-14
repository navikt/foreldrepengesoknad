import{i as p,j as t}from"./iframe-_ObgTIvO.js";import{h as e,H as o}from"./index-DGt0Llg0.js";import{t as a,m as l}from"./tidslinjeHendelser-DTBoOdgc.js";import{s as d}from"./saker-BMtZ55O6.js";import{A as s}from"./api-BLmyi74k.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DDmKcUAk.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-B4DqY82Q.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DnkMUdAG.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-CLdPYyJY.js";import"./useSelectedSak-Dn03gsY9.js";import"./useQuery-DgkBNIex.js";import"./sakerUtils-BBJUz6cp.js";import"./Snarveier-CCo_Vx-x.js";import"./LenkePanel-B4_sTc2J.js";import"./index-B0iFlWDP.js";import"./Dokument-DGw-kGE9.js";import"./dokumenterUtils-C4xiCv8T.js";import"./Tag-0eVjUN-W.js";import"./GrupperteDokumenter-B5Yl2f2Y.js";import"./guid-CsArkN6i.js";import"./Accordion-lZ-PMbtQ.js";import"./Header-BCY7uCG3.js";import"./LayoutWrapper-Bkbbo96p.js";import"./StatusTag-BrVfGjyA.js";import"./Stroller-B3hU8Oan.js";import"./NoeGikkGalt-FTYMzGr9.js";import"./MinidialogSkjema-vOPBBUCJ.js";import"./BekreftelseSendtSøknad-CsWF3rQi.js";import"./KontonummerInfo-VhLMjAja.js";import"./HarIkkeSaker-BWghkiQq.js";import"./SøkelenkerPanel-Ds4uxRmH.js";import"./HarSaker-Cv-roMZc.js";import"./SakLink-e1I9A0_c.js";import"./ContentSection-Bszpd5R7.js";import"./Svangerskapspenger-BC886n4H.js";import"./DinPlan-pU3t6BFf.js";import"./Oppgaver-8X-_cpCu.js";import"./OppgaveLenkepanel-s0Zvpho9.js";import"./KontaktOss-DbtOpFFg.js";const ot={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(s.saker,()=>o.json(d)),e.get(s.tidslinje,()=>o.json(a)),e.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker)), http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)), http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg))]
    }
  },
  args: {
    søkersBarn: [{
      fornavn: 'Olga',
      etternavn: 'Utvikler',
      fnr: '23232424',
      fødselsdato: '2024-01-01',
      kjønn: 'K'
    }]
  }
}`,...r.parameters?.docs?.source}}};const st=["Default"];export{r as Default,st as __namedExportsOrder,ot as default};
