import{i as m,j as t}from"./iframe-Lc3OGXsy.js";import{h as e,H as s}from"./index-DIe_NsMR.js";import{t as p,m as a}from"./tidslinjeHendelser-emhGlwBC.js";import{s as l}from"./saker-xVKVbTd6.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-Cog4qmLP.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-CV44JBAv.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-Dyw0X2lt.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BGEhOZJs.js";import"./useSelectedSak-T-qJXpJP.js";import"./useQuery-BFnh0Y6v.js";import"./api-Dm-jk1Wa.js";import"./sakerUtils-Bx0qlz1y.js";import"./Snarveier-fTVV_bz0.js";import"./LenkePanel-Cdh00fAS.js";import"./index-SLMkpCDL.js";import"./Dokument-CNUqFVgi.js";import"./dokumenterUtils-Ci-GjdCP.js";import"./Tag-B59OVe05.js";import"./GrupperteDokumenter-CSiLrlO2.js";import"./guid-CsArkN6i.js";import"./Accordion-BoovF1Of.js";import"./Header-qZvOJZZU.js";import"./LayoutWrapper-B3QKQgCW.js";import"./StatusTag-DKz1Zao8.js";import"./Stroller-BGIVo7Ue.js";import"./NoeGikkGalt-DKq9JEXw.js";import"./MinidialogSkjema-CBX0PZFZ.js";import"./BekreftelseSendtSøknad-BGEu1HsI.js";import"./KontonummerInfo-qFwdGMpD.js";import"./HarIkkeSaker-CnvqGq6G.js";import"./SøkelenkerPanel-DyIXsAXU.js";import"./HarSaker-Dv7MvARM.js";import"./SakLink-BM6-mNqu.js";import"./ContentSection-DJLDj166.js";import"./Svangerskapspenger-BUTS7h96.js";import"./DinPlan-BYyxOSn4.js";import"./Oppgaver-H3YDibDu.js";import"./OppgaveLenkepanel-Bn4LUVL9.js";import"./KontaktOss-JfxdvvcY.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
