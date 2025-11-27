import{k as p,j as t}from"./iframe-Co21_CTj.js";import{h as e,H as r}from"./index-yQDMDqcF.js";import{t as a,m as l}from"./tidslinjeHendelser-BuyEvC4o.js";import{s as d}from"./saker-D6DZJrGh.js";import{s as g}from"./sokerinfo-DkpxeGAH.js";import{A as s}from"./queries-mrQdKPRl.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-Ck6WONM0.js";import{M as f,R as j,a as k}from"./chunk-TMI4QPZX-D6QGCFIO.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-6mFXz7L9.js";import"./useBackgroundColor-BoXUzKuM.js";import"./useSelectedSak-BUQsbMdf.js";import"./useQuery-DbQeQiQF.js";import"./sakerUtils-BRFFvRbD.js";import"./Snarveier-DsCZmwaU.js";import"./LenkePanel-DNFC6Fp6.js";import"./index-BVwmsfhv.js";import"./Header-BHiYH7WP.js";import"./LayoutWrapper-Ivavs8fl.js";import"./StatusTag-DvljC4Jt.js";import"./Tag-BEOANQw_.js";import"./Stroller-CfMhHfRz.js";import"./NoeGikkGalt--qZkg0xx.js";import"./MinidialogSkjema-CfkZWCA9.js";import"./HarIkkeSaker-c4klrZqW.js";import"./SøkelenkerPanel-BdDVOFLC.js";import"./HarSaker-Va-vVv5F.js";import"./SakLink-DZBOx5qu.js";import"./guid-CsArkN6i.js";import"./ContentSection-BhaO9SXz.js";import"./BekreftelseSendtSøknad-Dbh3IF3M.js";import"./KontonummerInfo-BOld1t09.js";import"./Accordion-D10vCeXL.js";import"./Svangerskapspenger-Bmb_etRJ.js";import"./DinPlan-Dd-sJUoO.js";import"./Oppgaver-C1nbYQwz.js";import"./OppgaveLenkepanel-UHmeUYEn.js";import"./KontaktOss-xBoUlOVx.js";const et={title:"TidslinjePage",component:m,decorators:[p],render:i=>t.jsx(f,{initialEntries:[`/${n.TIDSLINJEN}/1`],children:t.jsx(j,{children:t.jsx(k,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},o={parameters:{msw:{handlers:[e.get(s.saker,()=>r.json(d)),e.get(s.tidslinje,()=>r.json(a)),e.get(s.manglendeVedlegg,()=>r.json(l)),e.get(s.søkerInfo,()=>r.json(g))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
