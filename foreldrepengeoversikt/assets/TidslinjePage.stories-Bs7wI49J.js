import{i as m,j as t}from"./iframe-Gomn0hXJ.js";import{h as e,H as s}from"./index-Ms5WyU47.js";import{t as p,m as a}from"./tidslinjeHendelser-Db2NT_Ye.js";import{s as l}from"./saker-DT5CEGYv.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-DE2HCGy_.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-Bmx1GKNC.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CmYLATVY.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-D1QBvvdf.js";import"./useSelectedSak-DMnYuWUk.js";import"./useQuery-CY8oy0_P.js";import"./api-DpNGSAc7.js";import"./sakerUtils-BNEIyqnb.js";import"./Snarveier-BK3FArG6.js";import"./LenkePanel-BrP3xJEZ.js";import"./index-LmvG6jHN.js";import"./Dokument-hY-lHWZZ.js";import"./dokumenterUtils-BwJigEvM.js";import"./Tag-jNkXalMi.js";import"./GrupperteDokumenter-D9_xqJap.js";import"./guid-CsArkN6i.js";import"./Accordion-B82ShLhy.js";import"./Header-DX83Pb0Q.js";import"./LayoutWrapper-Bp-JhgUU.js";import"./StatusTag-CHy5MFrD.js";import"./Stroller-UcegfLvl.js";import"./NoeGikkGalt-Z3GBLHhp.js";import"./MinidialogSkjema-CLTnC43J.js";import"./BekreftelseSendtSøknad-B0EKD_jZ.js";import"./KontonummerInfo-BqLnckUH.js";import"./HarIkkeSaker-B4ufo6b2.js";import"./SøkelenkerPanel-DmZnFG2g.js";import"./HarSaker-BI1zeBDX.js";import"./SakLink-KKRL8P1M.js";import"./ContentSection-BMigGgN2.js";import"./Svangerskapspenger-CQBcA3AL.js";import"./DinPlan-B_u3F4A1.js";import"./Oppgaver-x54ltUQD.js";import"./OppgaveLenkepanel-CJZv6SAG.js";import"./KontaktOss-W2WAodTu.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json(saker)), http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/tidslinje\`, () => HttpResponse.json(tidslinjeHendelser)), http.get(\`\${import.meta.env.BASE_URL}/rest/historikk/vedlegg\`, () => HttpResponse.json(manglendeVedlegg))]
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
}`,...r.parameters?.docs?.source}}};const st=["Default"];export{r as Default,st as __namedExportsOrder,et as default};
