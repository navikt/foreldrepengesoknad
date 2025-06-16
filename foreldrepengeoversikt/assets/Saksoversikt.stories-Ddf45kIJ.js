import{i as A,r as c,j as n}from"./iframe-C-KoTMfU.js";import{h as e,H as t}from"./index-QOGovpQC.js";import{a as R}from"./annenPartVedtak-ZXDjaoif.js";import{d as f}from"./dokumenter-DG3eZWEY.js";import{s as _}from"./satser-CIow2Yri.js";import{t as h,m as E}from"./tidslinjeHendelser-BdYnnvH6.js";import{s as H}from"./saker-CJjAPvFj.js";import{S as B}from"./svpsaker-B6NBfo4-.js";import{s as a}from"./sokerinfo-C0fVYXcF.js";import{O as p}from"./routes-C7yRzVAD.js";import{S as N}from"./ForeldrepengeoversiktRoutes-DKM15ckK.js";import{M as U,R as L,a as T}from"./chunk-NL6KNZEE-DuW7kf3y.js";import"./skjemanummer-Ch-0KA3D.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-BEknrgQy.js";import"./useSelectedSak-CEb_H5Wg.js";import"./useQuery-BlLOHK6a.js";import"./api-BrOSQk1Z.js";import"./sakerUtils-BcCrBXv1.js";import"./Snarveier-CFHeDe12.js";import"./LenkePanel-DrT4Rqhu.js";import"./Dokument-Bx_ULSjE.js";import"./dokumenterUtils-BrL9LuJZ.js";import"./Tag-BNxbDHnG.js";import"./GrupperteDokumenter-BK_xDBEQ.js";import"./guid-CsArkN6i.js";import"./Header-B3Pr99jN.js";import"./LayoutWrapper-DjOM9FKP.js";import"./StatusTag-DgsLyUJ4.js";import"./Stroller-DtdO5A-G.js";import"./NoeGikkGalt-DECC-h_6.js";import"./MinidialogSkjema-C9eHlnTj.js";import"./BekreftelseSendtSøknad-RRZHiSj9.js";import"./KontonummerInfo-CFuFXEXU.js";import"./HarIkkeSaker-o9YhxBC3.js";import"./SøkelenkerPanel-B47jP7f6.js";import"./HarSaker-BbC-RVZw.js";import"./SakLink-5-7X-jue.js";import"./ContentSection-CaqlGW8j.js";import"./Svangerskapspenger-D-i50wGn.js";import"./DinPlan-DhGcTDCk.js";import"./Oppgaver-D5TAXUEI.js";import"./OppgaveLenkepanel-DFA1TXAI.js";import"./KontaktOss-DTdEMxxO.js";const ye={title:"Saksoversikt",decorators:[A],render:({saksnummer:S,...$})=>{const y=c.useRef(!1);return n.jsx("div",{className:"bg-deepblue-50",children:n.jsx(U,{initialEntries:[`/${p.DIN_PLAN}/${S}`],children:n.jsx(L,{children:n.jsx(T,{element:n.jsx(N,{...$,isFirstRender:y}),path:`/${p.DIN_PLAN}/:saksnummer`})})})})}},s={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(f)),e.get(".//rest/innsyn/v2/saker",()=>t.json(H)),e.get(".//rest/innsyn/tidslinje",()=>t.json(h)),e.get(".//rest/historikk/vedlegg",()=>t.json(E)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(R))]}},args:{søkerinfo:a,saksnummer:"352011079"}},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(".//rest/innsyn/tidslinje",()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(".//rest/historikk/vedlegg",()=>t.json()),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.get(".//rest/satser",()=>t.json(_))]}},args:{søkerinfo:a,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(f)),e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[B]})),e.get(".//rest/innsyn/tidslinje",()=>t.json(h)),e.get(".//rest/historikk/vedlegg",()=>t.json(E)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(R))]}},args:{saksnummer:"202",søkerinfo:a}};var i,m,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartVedtak))]\n    }\n  },\n  args: {\n    søkerinfo: søkerinfo,\n    saksnummer: '352011079'\n  }\n}",...(d=(m=s.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var g,l,k;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
