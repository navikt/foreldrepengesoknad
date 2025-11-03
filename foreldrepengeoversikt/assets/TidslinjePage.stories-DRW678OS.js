import{i as a,j as t}from"./iframe-CitxjgmF.js";import{h as r,H as o}from"./index-gcdJJx-S.js";import{t as p,m as l}from"./tidslinjeHendelser-CLTnzxvf.js";import{s as d}from"./saker-BnaeNpeb.js";import{A as s}from"./api-D_6E7xv3.js";import{O as n}from"./routes-C7yRzVAD.js";import{T as m}from"./ForeldrepengeoversiktRoutes-D7O0WNok.js";import{M as g,R as j,a as f}from"./chunk-TMI4QPZX-CGj-pdVD.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-OXRA-Rg5.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BDr2aBST.js";import"./useSelectedSak-2kabLMHe.js";import"./useQuery-BSUsqX7r.js";import"./sakerUtils-BOfmdJ3b.js";import"./Snarveier-OU8X8Bu8.js";import"./LenkePanel-3luf4RN9.js";import"./index-C_vRbeVv.js";import"./Header-CddDfEsl.js";import"./LayoutWrapper-BBzqII7M.js";import"./StatusTag-CB2flzFl.js";import"./Tag-BdETakK4.js";import"./Stroller-DkFYwv9G.js";import"./NoeGikkGalt-C4Wb7sBF.js";import"./MinidialogSkjema-DVXWMhr4.js";import"./HarIkkeSaker-Dn2CX0If.js";import"./SøkelenkerPanel-Bc7T78Zs.js";import"./HarSaker-qI5zTTJG.js";import"./SakLink-KSH8U0GB.js";import"./guid-CsArkN6i.js";import"./ContentSection-IiQ1kEP5.js";import"./BekreftelseSendtSøknad-B-MJBZeM.js";import"./KontonummerInfo-CxyyvScr.js";import"./Accordion-DuQfMFU2.js";import"./Svangerskapspenger-DgWvi15m.js";import"./DinPlan-BU_adEoG.js";import"./Oppgaver-BL_faTK4.js";import"./OppgaveLenkepanel-BdmXrbhV.js";import"./KontaktOss-BLnUW61t.js";const tt={title:"TidslinjePage",component:m,decorators:[a],render:i=>t.jsx(g,{initialEntries:[`/${n.TIDSLINJEN}/352011079`],children:t.jsx(j,{children:t.jsx(f,{element:t.jsx(m,{...i}),path:`/${n.TIDSLINJEN}/:saksnummer`})})})},e={parameters:{msw:{handlers:[r.get(s.saker,()=>o.json(d)),r.get(s.tidslinje,()=>o.json(p)),r.get(s.manglendeVedlegg,()=>o.json(l))]}},args:{søkersBarn:[{navn:{fornavn:"Olga",etternavn:"Utvikler"},fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};const et=["Default"];export{e as Default,et as __namedExportsOrder,tt as default};
