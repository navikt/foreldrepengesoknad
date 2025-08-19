import{i as m,j as t}from"./iframe-CE7hT7if.js";import{h as e,H as s}from"./index-CXM0r17l.js";import{t as p,m as a}from"./tidslinjeHendelser-BdNaZ3Ut.js";import{s as l}from"./saker-eR-S7cLz.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-_IUUqGuF.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-CT9tgwxt.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CmR8Q-T_.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-D3CYiOOU.js";import"./useSelectedSak-D-It1NjT.js";import"./useQuery-DAe-6ieI.js";import"./api-CW_KiZht.js";import"./sakerUtils-_pH2ZGJn.js";import"./Snarveier-BZetDHNx.js";import"./LenkePanel-DEXz5_mQ.js";import"./Dokument-CfGMtNST.js";import"./dokumenterUtils-Cmfr5izE.js";import"./Tag-jguWPH83.js";import"./GrupperteDokumenter-oXg78N_q.js";import"./guid-CsArkN6i.js";import"./Header-C_3LyNnX.js";import"./LayoutWrapper-BqvOi-C9.js";import"./StatusTag-DJoqO_OW.js";import"./Stroller-DoQJgpdj.js";import"./NoeGikkGalt-BaIP4C6L.js";import"./MinidialogSkjema-DAzVCPye.js";import"./BekreftelseSendtSøknad-DSHSDVfP.js";import"./KontonummerInfo-Ch0tCoW7.js";import"./HarIkkeSaker-B4-yFX26.js";import"./SøkelenkerPanel-BCFKKZg9.js";import"./HarSaker-BUUPx--K.js";import"./SakLink-DQvkwWdt.js";import"./ContentSection-C_YnPEM2.js";import"./Svangerskapspenger-C2weXGTi.js";import"./DinPlan-DIeJ2TjU.js";import"./Oppgaver-CgKvn-H-.js";import"./OppgaveLenkepanel-Bfw2-Tdy.js";import"./KontaktOss-C6SkLBlR.js";const tt={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const rt=["Default"];export{r as Default,rt as __namedExportsOrder,tt as default};
