import{i as u,r as v,j as n}from"./iframe-gzxcU_QU.js";import{h as e,H as t}from"./index-C7NVZGxv.js";import{a as i}from"./annenPartVedtak-CXu8nO4d.js";import{d as m}from"./dokumenter-DG3eZWEY.js";import{s as R}from"./satser-CIow2Yri.js";import{t as d,m as g}from"./tidslinjeHendelser-Cj_iv2SP.js";import{s as f}from"./saker-B3p8KAsi.js";import{S as h}from"./svpsaker-B6NBfo4-.js";import{s as a}from"./sokerinfo-Dp1laUfq.js";import{O as p}from"./routes-C7yRzVAD.js";import{S as E}from"./ForeldrepengeoversiktRoutes-Ce6PvXLp.js";import{M as S,R as $,a as y}from"./chunk-EF7DTUVF-XdFoIY5j.js";import"./skjemanummer-DPdZCFti.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-B_OovWjH.js";import"./useSelectedSak-DevZo2T-.js";import"./useQuery-DUc9WJSJ.js";import"./api-CnbKW-es.js";import"./sakerUtils-Cp6uqLYw.js";import"./Snarveier-BPnZgimU.js";import"./LenkePanel-BdWPkRlF.js";import"./Dokument-Bi57XsK7.js";import"./dokumenterUtils-BPr3-Kps.js";import"./Tag-DnnEkj5k.js";import"./GrupperteDokumenter-BYgttWk1.js";import"./guid-CsArkN6i.js";import"./Header-B29KgrTf.js";import"./LayoutWrapper-ZZOPnXBr.js";import"./StatusTag-CECNz74N.js";import"./Stroller-D6uEvxcr.js";import"./NoeGikkGalt-CJBAGig4.js";import"./MinidialogSkjema-BKouql2I.js";import"./BekreftelseSendtSøknad-BUSlI0QE.js";import"./KontonummerInfo-DUDiZnjn.js";import"./HarIkkeSaker-D-4YJ8ni.js";import"./SøkelenkerPanel-BYEqFMzG.js";import"./HarSaker-BydPZ_YI.js";import"./SakLink-kWLCjCs5.js";import"./ContentSection-CfkUuY22.js";import"./Svangerskapspenger-Cj4x6355.js";import"./DinPlan-DoFbhRHC.js";import"./Oppgaver-D37kOtcA.js";import"./OppgaveLenkepanel-CdIMqcGl.js";import"./KontaktOss-DZ7AY-Ah.js";const je={title:"Saksoversikt",decorators:[u],render:({saksnummer:l,...k})=>{const j=v.useRef(!1);return n.jsx("div",{className:"bg-deepblue-50",children:n.jsx(S,{initialEntries:[`/${p.DIN_PLAN}/${l}`],children:n.jsx($,{children:n.jsx(y,{element:n.jsx(E,{...k,isFirstRender:j}),path:`/${p.DIN_PLAN}/:saksnummer`})})})})}},s={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(m)),e.get(".//rest/innsyn/v2/saker",()=>t.json(f)),e.get(".//rest/innsyn/tidslinje",()=>t.json(d)),e.get(".//rest/historikk/vedlegg",()=>t.json(g)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(i))]}},args:{søkerinfo:a,saksnummer:"352011079"}},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(".//rest/innsyn/tidslinje",()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(".//rest/historikk/vedlegg",()=>t.json()),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.get(".//rest/satser",()=>t.json(R))]}},args:{søkerinfo:a,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(m)),e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[h]})),e.get(".//rest/innsyn/tidslinje",()=>t.json(d)),e.get(".//rest/historikk/vedlegg",()=>t.json(g)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(i))]}},args:{saksnummer:"202",søkerinfo:a}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartVedtak))]\n    }\n  },\n  args: {\n    søkerinfo: søkerinfo,\n    saksnummer: '352011079'\n  }\n}",...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
      }])), http.get(\`\${import.meta.env.BASE_URL}/rest/historikk/vedlegg\`, () => HttpResponse.json()), http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert\`, () => HttpResponse.json(true)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(satser))]
    }
  },
  args: {
    søkerinfo: søkerinfo,
    saksnummer: '352011079'
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json({\n        foreldrepenger: [],\n        engangsstønad: [],\n        svangerskapspenger: [SAK_1]\n      })), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartVedtak))]\n    }\n  },\n  args: {\n    saksnummer: '202',\n    søkerinfo: søkerinfo\n  }\n}",...o.parameters?.docs?.source}}};const ue=["Foreldrepenger","Engangsstønad","Svangerskapspenger"];export{r as Engangsstønad,s as Foreldrepenger,o as Svangerskapspenger,ue as __namedExportsOrder,je as default};
