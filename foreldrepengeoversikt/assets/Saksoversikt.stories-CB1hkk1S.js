import{i as A,r as c,j as n}from"./iframe-DuB7cK7M.js";import{h as e,H as t}from"./index-D9NeUst1.js";import{a as R}from"./annenPartVedtak-C3UTdeTn.js";import{d as f}from"./dokumenter-DG3eZWEY.js";import{s as _}from"./satser-CIow2Yri.js";import{t as h,m as E}from"./tidslinjeHendelser-C3837wmc.js";import{s as H}from"./saker-BBpv7LgF.js";import{S as B}from"./svpsaker-B6NBfo4-.js";import{s as a}from"./sokerinfo-DKaKhv8p.js";import{O as p}from"./routes-C7yRzVAD.js";import{S as N}from"./ForeldrepengeoversiktRoutes-Bt5z_2PD.js";import{M as U,R as L,a as T}from"./chunk-NL6KNZEE-BcrTknNP.js";import"./skjemanummer-BhnnU_TV.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-CjsBB-Wz.js";import"./useSelectedSak-9pdoRTez.js";import"./useQuery-Bx3zZXaq.js";import"./api-C2huO7jD.js";import"./sakerUtils-C58szazY.js";import"./Snarveier-DEHz-q3g.js";import"./LenkePanel-BJeWclXV.js";import"./Dokument-DkF-Npxb.js";import"./dokumenterUtils-6YqZsPUb.js";import"./Tag-CXdECPZQ.js";import"./GrupperteDokumenter-DwBifmw5.js";import"./guid-CsArkN6i.js";import"./Header-BBlQwpMk.js";import"./LayoutWrapper-Csns50ld.js";import"./StatusTag-CnRILs7g.js";import"./Stroller-CorakKgU.js";import"./NoeGikkGalt-BjY6b1Pu.js";import"./MinidialogSkjema-a7iupdhO.js";import"./BekreftelseSendtSøknad-OxbzJVmp.js";import"./KontonummerInfo-CFI8cmtj.js";import"./HarIkkeSaker-BHRm3piV.js";import"./SøkelenkerPanel-BirATrJm.js";import"./HarSaker-D2-3-rfK.js";import"./SakLink-Dc8AzRPX.js";import"./ContentSection-Dxc1NxOm.js";import"./Svangerskapspenger-DLYSjCBG.js";import"./DinPlan-BR28sMXm.js";import"./Oppgaver-Dj0KrNm_.js";import"./OppgaveLenkepanel-DEK1H25h.js";import"./KontaktOss-BKbPN7tS.js";const ye={title:"Saksoversikt",decorators:[A],render:({saksnummer:S,...$})=>{const y=c.useRef(!1);return n.jsx("div",{className:"bg-deepblue-50",children:n.jsx(U,{initialEntries:[`/${p.DIN_PLAN}/${S}`],children:n.jsx(L,{children:n.jsx(T,{element:n.jsx(N,{...$,isFirstRender:y}),path:`/${p.DIN_PLAN}/:saksnummer`})})})})}},s={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(f)),e.get(".//rest/innsyn/v2/saker",()=>t.json(H)),e.get(".//rest/innsyn/tidslinje",()=>t.json(h)),e.get(".//rest/historikk/vedlegg",()=>t.json(E)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(R))]}},args:{søkerinfo:a,saksnummer:"352011079"}},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(".//rest/innsyn/tidslinje",()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(".//rest/historikk/vedlegg",()=>t.json()),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.get(".//rest/satser",()=>t.json(_))]}},args:{søkerinfo:a,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(f)),e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[B]})),e.get(".//rest/innsyn/tidslinje",()=>t.json(h)),e.get(".//rest/historikk/vedlegg",()=>t.json(E)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(R))]}},args:{saksnummer:"202",søkerinfo:a}};var i,m,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartVedtak))]\n    }\n  },\n  args: {\n    søkerinfo: søkerinfo,\n    saksnummer: '352011079'\n  }\n}",...(d=(m=s.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var g,l,k;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
