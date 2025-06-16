import{i as A,r as c,j as n}from"./iframe-Ui6H9FKp.js";import{h as e,H as t}from"./index-tvOkpNSO.js";import{a as R}from"./annenPartVedtak-Cx61-Rel.js";import{d as f}from"./dokumenter-DG3eZWEY.js";import{s as _}from"./satser-CIow2Yri.js";import{t as h,m as E}from"./tidslinjeHendelser-Bep0HwQe.js";import{s as H}from"./saker-CDa9t0uK.js";import{S as B}from"./svpsaker-B6NBfo4-.js";import{s as a}from"./sokerinfo-_BUkioWr.js";import{O as p}from"./routes-C7yRzVAD.js";import{S as N}from"./ForeldrepengeoversiktRoutes-BSLCegeq.js";import{M as U,R as L,a as T}from"./chunk-NL6KNZEE-DoEMPvTH.js";import"./skjemanummer-BH827EY4.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BSOmcoGA.js";import"./useSelectedSak-CQ8NNs1J.js";import"./useQuery-OB7UwXoN.js";import"./api-jMzK91i7.js";import"./sakerUtils-CA6qPtUr.js";import"./Snarveier-DGCpRL_c.js";import"./LenkePanel-BPjLXS9y.js";import"./Dokument-CLpdbUNy.js";import"./dokumenterUtils-U1pFFjqr.js";import"./Tag-Cn9x64FN.js";import"./GrupperteDokumenter-CfpA3-fj.js";import"./guid-CsArkN6i.js";import"./Header-D-LwQtGh.js";import"./LayoutWrapper-BO8wZfqx.js";import"./StatusTag-DuC7N8pU.js";import"./Stroller-uhLOXyWY.js";import"./NoeGikkGalt-BFSZTN6j.js";import"./MinidialogSkjema-Bltdg7H-.js";import"./BekreftelseSendtSøknad-Ux_ZxFDe.js";import"./KontonummerInfo-D9O0XcxD.js";import"./HarIkkeSaker-C4iOTY6o.js";import"./SøkelenkerPanel-XoKzZ70r.js";import"./HarSaker-Dtq5FuYw.js";import"./SakLink-dLS3_OJA.js";import"./ContentSection-CmgUOI4J.js";import"./Svangerskapspenger-DOUVsxp0.js";import"./DinPlan-rq9P4h3H.js";import"./Oppgaver-DECwjipV.js";import"./OppgaveLenkepanel-3IKRO3cr.js";import"./KontaktOss-BLAVx9i9.js";const ye={title:"Saksoversikt",decorators:[A],render:({saksnummer:S,...$})=>{const y=c.useRef(!1);return n.jsx("div",{className:"bg-deepblue-50",children:n.jsx(U,{initialEntries:[`/${p.DIN_PLAN}/${S}`],children:n.jsx(L,{children:n.jsx(T,{element:n.jsx(N,{...$,isFirstRender:y}),path:`/${p.DIN_PLAN}/:saksnummer`})})})})}},s={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(f)),e.get(".//rest/innsyn/v2/saker",()=>t.json(H)),e.get(".//rest/innsyn/tidslinje",()=>t.json(h)),e.get(".//rest/historikk/vedlegg",()=>t.json(E)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(R))]}},args:{søkerinfo:a,saksnummer:"352011079"}},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(".//rest/innsyn/tidslinje",()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(".//rest/historikk/vedlegg",()=>t.json()),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.get(".//rest/satser",()=>t.json(_))]}},args:{søkerinfo:a,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(f)),e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[B]})),e.get(".//rest/innsyn/tidslinje",()=>t.json(h)),e.get(".//rest/historikk/vedlegg",()=>t.json(E)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(R))]}},args:{saksnummer:"202",søkerinfo:a}};var i,m,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartVedtak))]\n    }\n  },\n  args: {\n    søkerinfo: søkerinfo,\n    saksnummer: '352011079'\n  }\n}",...(d=(m=s.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var g,l,k;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(k=(l=r.parameters)==null?void 0:l.docs)==null?void 0:k.source}}};var j,u,v;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json({\n        foreldrepenger: [],\n        engangsstønad: [],\n        svangerskapspenger: [SAK_1]\n      })), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartVedtak))]\n    }\n  },\n  args: {\n    saksnummer: '202',\n    søkerinfo: søkerinfo\n  }\n}",...(v=(u=o.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};const Ae=["Foreldrepenger","Engangsstønad","Svangerskapspenger"];export{r as Engangsstønad,s as Foreldrepenger,o as Svangerskapspenger,Ae as __namedExportsOrder,ye as default};
