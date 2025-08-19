import{i as u,r as v,j as n}from"./iframe-CE7hT7if.js";import{h as e,H as t}from"./index-CXM0r17l.js";import{a as i}from"./annenPartVedtak-BuamS27a.js";import{d as m}from"./dokumenter-DG3eZWEY.js";import{t as d,m as g}from"./tidslinjeHendelser-BdNaZ3Ut.js";import{s as R}from"./saker-eR-S7cLz.js";import{S as f}from"./svpsaker-B6NBfo4-.js";import{s as a}from"./sokerinfo-CxnnCWtJ.js";import{D as E}from"./api-CW_KiZht.js";import{O as p}from"./routes-C7yRzVAD.js";import{S}from"./ForeldrepengeoversiktRoutes-_IUUqGuF.js";import{M as h,R as $,a as A}from"./chunk-UH6JLGW7-CT9tgwxt.js";import"./preload-helper-D9Z9MdNV.js";import"./skjemanummer-CmR8Q-T_.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-D3CYiOOU.js";import"./useSelectedSak-D-It1NjT.js";import"./useQuery-DAe-6ieI.js";import"./sakerUtils-_pH2ZGJn.js";import"./Snarveier-BZetDHNx.js";import"./LenkePanel-DEXz5_mQ.js";import"./Dokument-CfGMtNST.js";import"./dokumenterUtils-Cmfr5izE.js";import"./Tag-jguWPH83.js";import"./GrupperteDokumenter-oXg78N_q.js";import"./guid-CsArkN6i.js";import"./Header-C_3LyNnX.js";import"./LayoutWrapper-BqvOi-C9.js";import"./StatusTag-DJoqO_OW.js";import"./Stroller-DoQJgpdj.js";import"./NoeGikkGalt-BaIP4C6L.js";import"./MinidialogSkjema-DAzVCPye.js";import"./BekreftelseSendtSøknad-DSHSDVfP.js";import"./KontonummerInfo-Ch0tCoW7.js";import"./HarIkkeSaker-B4-yFX26.js";import"./SøkelenkerPanel-BCFKKZg9.js";import"./HarSaker-BUUPx--K.js";import"./SakLink-DQvkwWdt.js";import"./ContentSection-C_YnPEM2.js";import"./Svangerskapspenger-C2weXGTi.js";import"./DinPlan-DIeJ2TjU.js";import"./Oppgaver-CgKvn-H-.js";import"./OppgaveLenkepanel-Bfw2-Tdy.js";import"./KontaktOss-C6SkLBlR.js";const je={title:"Saksoversikt",decorators:[u],render:({saksnummer:l,...k})=>{const j=v.useRef(!1);return n.jsx("div",{className:"bg-deepblue-50",children:n.jsx(h,{initialEntries:[`/${p.DIN_PLAN}/${l}`],children:n.jsx($,{children:n.jsx(A,{element:n.jsx(S,{...k,isFirstRender:j}),path:`/${p.DIN_PLAN}/:saksnummer`})})})})}},s={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(m)),e.get(".//rest/innsyn/v2/saker",()=>t.json(R)),e.get(".//rest/innsyn/tidslinje",()=>t.json(d)),e.get(".//rest/historikk/vedlegg",()=>t.json(g)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(i))]}},args:{søkerinfo:a,saksnummer:"352011079"}},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(".//rest/innsyn/tidslinje",()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(".//rest/historikk/vedlegg",()=>t.json()),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.get(".//rest/satser",()=>t.json(E))]}},args:{søkerinfo:a,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(m)),e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[f]})),e.get(".//rest/innsyn/tidslinje",()=>t.json(d)),e.get(".//rest/historikk/vedlegg",()=>t.json(g)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(i))]}},args:{saksnummer:"202",søkerinfo:a}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartVedtak))]\n    }\n  },\n  args: {\n    søkerinfo: søkerinfo,\n    saksnummer: '352011079'\n  }\n}",...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json({\n        foreldrepenger: [],\n        engangsstønad: [],\n        svangerskapspenger: [SAK_1]\n      })), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartVedtak))]\n    }\n  },\n  args: {\n    saksnummer: '202',\n    søkerinfo: søkerinfo\n  }\n}",...o.parameters?.docs?.source}}};const ue=["Foreldrepenger","Engangsstønad","Svangerskapspenger"];export{r as Engangsstønad,s as Foreldrepenger,o as Svangerskapspenger,ue as __namedExportsOrder,je as default};
