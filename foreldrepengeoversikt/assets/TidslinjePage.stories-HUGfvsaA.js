import{i as m,j as t}from"./iframe-uM6vJfA6.js";import{h as e,H as s}from"./index-DZSHuZoY.js";import{t as p,m as a}from"./tidslinjeHendelser-aF2CcIlJ.js";import{s as l}from"./saker-6zj6xN2H.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-UDIsv6Fb.js";import{M as d,R as g,a as j}from"./chunk-UH6JLGW7-BeRQQPJ5.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BLaCV31j.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-Cv3uj3CK.js";import"./useSelectedSak-CtxnF49c.js";import"./useQuery-tOuE658y.js";import"./api-BJinRP0h.js";import"./sakerUtils-D60G7nO8.js";import"./Snarveier-CzInRrzR.js";import"./LenkePanel-ImHSmEuY.js";import"./index-Rm7DJmPB.js";import"./Dokument-BgwEfrWw.js";import"./dokumenterUtils-AQGuBYyu.js";import"./Tag-Da-sr-Y2.js";import"./GrupperteDokumenter-CCC4YnY1.js";import"./guid-CsArkN6i.js";import"./Accordion-DAADNL1k.js";import"./Header-Bdza4IFt.js";import"./LayoutWrapper-MeXoeUw0.js";import"./StatusTag-D0HqwbZ_.js";import"./Stroller-DITvvaeU.js";import"./NoeGikkGalt-DCNKUl5x.js";import"./MinidialogSkjema-f0dDyCO1.js";import"./BekreftelseSendtSøknad-4uXD-kNT.js";import"./KontonummerInfo-Bsh36t5c.js";import"./HarIkkeSaker-VmQufTLS.js";import"./SøkelenkerPanel-D7qXbqfJ.js";import"./HarSaker-DacJfvmv.js";import"./SakLink-CbCW_ed_.js";import"./ContentSection-z6OG9lCa.js";import"./Svangerskapspenger-DIjLqTid.js";import"./DinPlan-CCXLhFCT.js";import"./Oppgaver-BROPtWQn.js";import"./OppgaveLenkepanel-BVWcusKi.js";import"./KontaktOss-nMSooysW.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
