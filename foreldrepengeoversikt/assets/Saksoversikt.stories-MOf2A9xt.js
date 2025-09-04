import{i as u,r as v,j as n}from"./iframe-DCXGowBy.js";import{h as e,H as t}from"./index-CW50hLtf.js";import{a as i}from"./annenPartVedtak-D3VjUGZJ.js";import{d as m}from"./dokumenter-DG3eZWEY.js";import{t as d,m as g}from"./tidslinjeHendelser-D8kntYVC.js";import{s as R}from"./saker-B6yN9vQP.js";import{S as f}from"./svpsaker-B6NBfo4-.js";import{s as a}from"./sokerinfo-Bba1LWhE.js";import{D as E}from"./api-C8ezB4Dl.js";import{O as p}from"./routes-C7yRzVAD.js";import{S}from"./ForeldrepengeoversiktRoutes-BQXggMvx.js";import{M as h,R as $,a as A}from"./chunk-UH6JLGW7-Bu0TNm6p.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-xZFFZDtX.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BYcr3nnj.js";import"./useSelectedSak-BNsaCJHw.js";import"./useQuery-DHyj_4CN.js";import"./sakerUtils-DcfY4jYi.js";import"./Snarveier-yNz98_Ww.js";import"./LenkePanel-CE58ecod.js";import"./index-BMM3-nqT.js";import"./Dokument-COX-fh4Y.js";import"./dokumenterUtils-CUPaIhKZ.js";import"./Tag-BV-iTgsE.js";import"./GrupperteDokumenter-ByZe9_MQ.js";import"./guid-CsArkN6i.js";import"./Accordion-BMR-mghI.js";import"./Header-CMoB-GU1.js";import"./LayoutWrapper-Fgv9jP72.js";import"./StatusTag-DcgMxzvW.js";import"./Stroller-CzPDeyyd.js";import"./NoeGikkGalt-wz9PrkoV.js";import"./MinidialogSkjema-B-jESk49.js";import"./BekreftelseSendtSøknad-CKHbc-Jx.js";import"./KontonummerInfo-B9L1z1Ln.js";import"./HarIkkeSaker-hqlgMNWm.js";import"./SøkelenkerPanel-DghJZ20j.js";import"./HarSaker-BZtAsIBn.js";import"./SakLink-B4d0ThJE.js";import"./ContentSection-CZi5xWlC.js";import"./Svangerskapspenger-C5CqROuF.js";import"./DinPlan-BKlQYKa_.js";import"./Oppgaver-J8z0xHPl.js";import"./OppgaveLenkepanel-D32UgDdM.js";import"./KontaktOss-DiQbldbP.js";const ve={title:"Saksoversikt",decorators:[u],render:({saksnummer:l,...k})=>{const j=v.useRef(!1);return n.jsx("div",{className:"bg-ax-brand-blue-100",children:n.jsx(h,{initialEntries:[`/${p.DIN_PLAN}/${l}`],children:n.jsx($,{children:n.jsx(A,{element:n.jsx(S,{...k,isFirstRender:j}),path:`/${p.DIN_PLAN}/:saksnummer`})})})})}},s={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(m)),e.get(".//rest/innsyn/v2/saker",()=>t.json(R)),e.get(".//rest/innsyn/tidslinje",()=>t.json(d)),e.get(".//rest/historikk/vedlegg",()=>t.json(g)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(i))]}},args:{søkerinfo:a,saksnummer:"352011079"}},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(".//rest/innsyn/tidslinje",()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(".//rest/historikk/vedlegg",()=>t.json()),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.get(".//rest/satser",()=>t.json(E))]}},args:{søkerinfo:a,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(m)),e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[f]})),e.get(".//rest/innsyn/tidslinje",()=>t.json(d)),e.get(".//rest/historikk/vedlegg",()=>t.json(g)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(i))]}},args:{saksnummer:"202",søkerinfo:a}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartVedtak))]\n    }\n  },\n  args: {\n    søkerinfo: søkerinfo,\n    saksnummer: '352011079'\n  }\n}",...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
