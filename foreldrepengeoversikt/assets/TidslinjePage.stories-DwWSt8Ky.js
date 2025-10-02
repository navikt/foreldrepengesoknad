import{i as m,j as t}from"./iframe-DZqmX2Pl.js";import{h as e,H as s}from"./index-2sm9E9gI.js";import{t as p,m as a}from"./tidslinjeHendelser-CJ2M1jcr.js";import{s as l}from"./saker-C1ybsR4h.js";import{O as o}from"./routes-C7yRzVAD.js";import{T as n}from"./ForeldrepengeoversiktRoutes-CYQHXBRx.js";import{M as d,R as g,a as j}from"./chunk-TMI4QPZX-BpI84etn.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-BWSC44tl.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-QWf0HCgM.js";import"./useSelectedSak-DGDe2O2X.js";import"./useQuery-CCpOkbfR.js";import"./api-briH8RE4.js";import"./sakerUtils-D2AYwurK.js";import"./Snarveier-Dr_WZSEU.js";import"./LenkePanel-lTqdE-pC.js";import"./index-BKKzYOzq.js";import"./Dokument-CpGOsjS0.js";import"./dokumenterUtils-CbHZzTLn.js";import"./Tag-BkwNHn-l.js";import"./GrupperteDokumenter-DJm52qaa.js";import"./guid-CsArkN6i.js";import"./Accordion-HyT86eUs.js";import"./Header-BEwOGZzE.js";import"./LayoutWrapper-BR__bP6e.js";import"./StatusTag-B3hvntiM.js";import"./Stroller-fXTzZUVj.js";import"./NoeGikkGalt-uVYKNhA9.js";import"./MinidialogSkjema-BoSZc5ks.js";import"./BekreftelseSendtSøknad-z6BEHama.js";import"./KontonummerInfo-I4DzilRh.js";import"./HarIkkeSaker-BVTZa_nv.js";import"./SøkelenkerPanel-BXHoQPgc.js";import"./HarSaker-DMXytBeX.js";import"./SakLink-IhweO2mY.js";import"./ContentSection-Bh0vEia0.js";import"./Svangerskapspenger-tGCqdka6.js";import"./DinPlan-DbSd-Kzp.js";import"./Oppgaver-R5THg7ql.js";import"./OppgaveLenkepanel-y4VRXyM5.js";import"./KontaktOss-qDor53HB.js";const et={title:"TidslinjePage",component:n,decorators:[m],render:i=>t.jsx(d,{initialEntries:[`/${o.TIDSLINJEN}/352011079`],children:t.jsx(g,{children:t.jsx(j,{element:t.jsx(n,{...i}),path:`/${o.TIDSLINJEN}/:saksnummer`})})})},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>s.json(l)),e.get(".//rest/innsyn/tidslinje",()=>s.json(p)),e.get(".//rest/historikk/vedlegg",()=>s.json(a))]}},args:{søkersBarn:[{fornavn:"Olga",etternavn:"Utvikler",fnr:"23232424",fødselsdato:"2024-01-01",kjønn:"K"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
