import{i as u,r as v,j as n}from"./iframe-B4DvhS-C.js";import{h as e,H as t}from"./index-BTdXeUkd.js";import{a as i}from"./annenPartVedtak-D14J8rtc.js";import{d as m}from"./dokumenter-DG3eZWEY.js";import{t as d,m as g}from"./tidslinjeHendelser-6TGPAjGU.js";import{s as R}from"./saker-D_zeEPHk.js";import{S as f}from"./svpsaker-B6NBfo4-.js";import{s as a}from"./sokerinfo-CIRxuv5z.js";import{D as E}from"./api-CEfg8NtQ.js";import{O as p}from"./routes-C7yRzVAD.js";import{S}from"./ForeldrepengeoversiktRoutes-B0Mqul5f.js";import{M as h,R as $,a as A}from"./chunk-UH6JLGW7-C8kCrgCq.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-DGotJGIt.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-h6lI1oW5.js";import"./useSelectedSak-DY4okQAb.js";import"./useQuery-_3Tyk20M.js";import"./sakerUtils-DWjvxByn.js";import"./Snarveier-Cv3GixdY.js";import"./LenkePanel-CZyNEHn1.js";import"./index-B_qLMfAU.js";import"./Dokument-Da3x8vyL.js";import"./dokumenterUtils-D4lHRRja.js";import"./Tag-WzRfIu_H.js";import"./GrupperteDokumenter-CjTAPtfF.js";import"./guid-CsArkN6i.js";import"./Accordion-Ch8qUFTc.js";import"./Header-CEPxdBj8.js";import"./LayoutWrapper-BDmL2sop.js";import"./StatusTag-DGxH3ae3.js";import"./Stroller-B_c-yBxm.js";import"./NoeGikkGalt-F0umhOPz.js";import"./MinidialogSkjema-Tdd1xYEQ.js";import"./BekreftelseSendtSøknad-B6mQig8s.js";import"./KontonummerInfo-kWyfUpOA.js";import"./HarIkkeSaker-BgbViMVj.js";import"./SøkelenkerPanel--tsb97kD.js";import"./HarSaker-a8ENtcQu.js";import"./SakLink-CNfQVuQq.js";import"./ContentSection-DKrWYwn5.js";import"./Svangerskapspenger-9l7ns1Mp.js";import"./DinPlan-DjbFDc02.js";import"./Oppgaver-CKg8Wd4h.js";import"./OppgaveLenkepanel-CqrmfRqd.js";import"./KontaktOss-C_fikdmx.js";const ve={title:"Saksoversikt",decorators:[u],render:({saksnummer:l,...k})=>{const j=v.useRef(!1);return n.jsx("div",{className:"bg-ax-brand-blue-100",children:n.jsx(h,{initialEntries:[`/${p.DIN_PLAN}/${l}`],children:n.jsx($,{children:n.jsx(A,{element:n.jsx(S,{...k,isFirstRender:j}),path:`/${p.DIN_PLAN}/:saksnummer`})})})})}},s={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(m)),e.get(".//rest/innsyn/v2/saker",()=>t.json(R)),e.get(".//rest/innsyn/tidslinje",()=>t.json(d)),e.get(".//rest/historikk/vedlegg",()=>t.json(g)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(i))]}},args:{søkerinfo:a,saksnummer:"352011079"}},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(".//rest/innsyn/tidslinje",()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(".//rest/historikk/vedlegg",()=>t.json()),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.get(".//rest/satser",()=>t.json(E))]}},args:{søkerinfo:a,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(m)),e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[f]})),e.get(".//rest/innsyn/tidslinje",()=>t.json(d)),e.get(".//rest/historikk/vedlegg",()=>t.json(g)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(i))]}},args:{saksnummer:"202",søkerinfo:a}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartVedtak))]\n    }\n  },\n  args: {\n    søkerinfo: søkerinfo,\n    saksnummer: '352011079'\n  }\n}",...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json({
        foreldrepenger: [],
        engangsstønad: [{
          saksnummer: '352011079',
          sakAvsluttet: false,
          gjelderAdopsjon: false,
          familiehendelse: {
            fødselsdato: '2024-01-01',
            termindato: '2024-01-01',
            antallBarn: 1
          },
          åpenBehandling: {
            tilstand: 'UNDER_BEHANDLING'
          },
          oppdatertTidspunkt: '2024-02-28T21:19:08.911'
        }],
        svangerskapspenger: []
      } satisfies Saker)), http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/tidslinje\`, () => HttpResponse.json([{
        type: 'søknad',
        opprettet: '2023-01-31T09:06:46.541655',
        aktørType: 'BRUKER',
        tidslinjeHendelseType: 'FØRSTEGANGSSØKNAD',
        dokumenter: [{
          type: 'INNGÅENDE_DOKUMENT',
          mottatt: '2023-01-31T09:06:48',
          saksnummer: '352011079',
          tittel: 'Søknad om foreldrepenger ved fødsel',
          journalpostId: '598115874',
          dokumentId: '624862989'
        }],
        manglendeVedlegg: []
      }])), http.get(\`\${import.meta.env.BASE_URL}/rest/historikk/vedlegg\`, () => HttpResponse.json()), http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert\`, () => HttpResponse.json(true)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(DEFAULT_SATSER))]
    }
  },
  args: {
    søkerinfo: søkerinfo,
    saksnummer: '352011079'
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json({\n        foreldrepenger: [],\n        engangsstønad: [],\n        svangerskapspenger: [SAK_1]\n      })), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartVedtak))]\n    }\n  },\n  args: {\n    saksnummer: '202',\n    søkerinfo: søkerinfo\n  }\n}",...o.parameters?.docs?.source}}};const Re=["Foreldrepenger","Engangsstønad","Svangerskapspenger"];export{r as Engangsstønad,s as Foreldrepenger,o as Svangerskapspenger,Re as __namedExportsOrder,ve as default};
