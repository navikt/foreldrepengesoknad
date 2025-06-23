import{i as A,r as c,j as n}from"./iframe-CIPZDtdN.js";import{h as e,H as t}from"./index-T3pbIxcm.js";import{a as R}from"./annenPartVedtak-BuM090IF.js";import{d as f}from"./dokumenter-DG3eZWEY.js";import{s as _}from"./satser-CIow2Yri.js";import{t as h,m as E}from"./tidslinjeHendelser-CQJ0C1Yi.js";import{s as H}from"./saker-Bdxpj-G7.js";import{S as B}from"./svpsaker-B6NBfo4-.js";import{s as a}from"./sokerinfo-BsxQ1jFe.js";import{O as p}from"./routes-C7yRzVAD.js";import{S as N}from"./ForeldrepengeoversiktRoutes-DeGhmbpI.js";import{M as U,R as L,a as T}from"./chunk-NL6KNZEE-DcbOj75j.js";import"./skjemanummer-I4gNwOYL.js";import"./RettighetType-BD_oerVS.js";import"./useBackgroundColor-Qx1_2YzP.js";import"./useSelectedSak-C7oV8fjW.js";import"./useQuery-BOq07a3w.js";import"./api-CvzksYAK.js";import"./sakerUtils-JSxeetNo.js";import"./Snarveier-sjKOqc-Q.js";import"./LenkePanel-CofnvOjm.js";import"./Dokument-CV-Qn1O4.js";import"./dokumenterUtils-Do7ROMEf.js";import"./Tag-DedQvT1q.js";import"./GrupperteDokumenter-B3jS0krr.js";import"./guid-CsArkN6i.js";import"./Header-Dfw-UMJB.js";import"./LayoutWrapper-CK1_Zq9f.js";import"./StatusTag-IUqF0hh5.js";import"./Stroller-CPSAJJvU.js";import"./NoeGikkGalt-yNnKRrke.js";import"./MinidialogSkjema-DG4B2oFQ.js";import"./BekreftelseSendtSøknad-CFZ9adDm.js";import"./KontonummerInfo-jkhTQ0EQ.js";import"./HarIkkeSaker-Cys1Agt3.js";import"./SøkelenkerPanel-ByNUH3IP.js";import"./HarSaker-wYbuovkZ.js";import"./SakLink-p-f3UfU7.js";import"./ContentSection-a6JFxM3k.js";import"./Svangerskapspenger-Bw8l6SAh.js";import"./DinPlan-DDVbAb1q.js";import"./Oppgaver-C2Eo-Um0.js";import"./OppgaveLenkepanel-DDgUPEzM.js";import"./KontaktOss-C_KXkpnV.js";const ye={title:"Saksoversikt",decorators:[A],render:({saksnummer:S,...$})=>{const y=c.useRef(!1);return n.jsx("div",{className:"bg-deepblue-50",children:n.jsx(U,{initialEntries:[`/${p.DIN_PLAN}/${S}`],children:n.jsx(L,{children:n.jsx(T,{element:n.jsx(N,{...$,isFirstRender:y}),path:`/${p.DIN_PLAN}/:saksnummer`})})})})}},s={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(f)),e.get(".//rest/innsyn/v2/saker",()=>t.json(H)),e.get(".//rest/innsyn/tidslinje",()=>t.json(h)),e.get(".//rest/historikk/vedlegg",()=>t.json(E)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(R))]}},args:{søkerinfo:a,saksnummer:"352011079"}},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:"UNDER_BEHANDLING"},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(".//rest/innsyn/tidslinje",()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(".//rest/historikk/vedlegg",()=>t.json()),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.get(".//rest/satser",()=>t.json(_))]}},args:{søkerinfo:a,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(f)),e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[B]})),e.get(".//rest/innsyn/tidslinje",()=>t.json(h)),e.get(".//rest/historikk/vedlegg",()=>t.json(E)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(R))]}},args:{saksnummer:"202",søkerinfo:a}};var i,m,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartVedtak))]\n    }\n  },\n  args: {\n    søkerinfo: søkerinfo,\n    saksnummer: '352011079'\n  }\n}",...(d=(m=s.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var g,l,k;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
