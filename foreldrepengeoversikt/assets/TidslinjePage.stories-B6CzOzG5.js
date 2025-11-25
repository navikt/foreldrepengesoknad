import{i as a,j as t}from"./iframe--LXeAaZx.js";import{h as r,H as s}from"./index-BbqyAjaQ.js";import{t as p,m as l}from"./tidslinjeHendelser-BYVL3dtn.js";import{s as d}from"./saker-D6DZJrGh.js";import{A as n}from"./queries-De-LxnWd.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-DTk2XZ3P.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-Ct6ofrUn.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BWLTo9BB.js";import"./useBackgroundColor-MXLvdFYb.js";import"./useSelectedSak-BwERAcba.js";import"./useQuery-CbAC7qLT.js";import"./sakerUtils-DzwKF4TQ.js";import"./Snarveier-WnMEfaR-.js";import"./LenkePanel-BcQh7Bg4.js";import"./index-BlxjyQzd.js";import"./Header-bcXRn9sH.js";import"./LayoutWrapper-C7l-9_Z6.js";import"./StatusTag-CZbEvA7u.js";import"./Tag-B2ceE9ct.js";import"./Stroller-BS0P5BJD.js";import"./NoeGikkGalt-oG3TMaEG.js";import"./MinidialogSkjema-MKNPeiFU.js";import"./HarIkkeSaker-clmSku-g.js";import"./SøkelenkerPanel-CFYdK1_C.js";import"./HarSaker-C1JXchmz.js";import"./SakLink-DzMzJgZ1.js";import"./guid-CsArkN6i.js";import"./ContentSection-Cj62C6nL.js";import"./BekreftelseSendtSøknad-mPBYwA5A.js";import"./KontonummerInfo-Ccekxc56.js";import"./Accordion-NqSQaK5S.js";import"./Svangerskapspenger-C3qFoAo9.js";import"./DinPlan-BA6Gu1yF.js";import"./Oppgaver-BHRXgv9e.js";import"./OppgaveLenkepanel-C3bZQMJo.js";import"./KontaktOss-ld8lgMH8.js";const Z={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(n.saker,()=>s.json(d)),r.get(n.tidslinje,()=>s.json(p)),r.get(n.manglendeVedlegg,()=>s.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
