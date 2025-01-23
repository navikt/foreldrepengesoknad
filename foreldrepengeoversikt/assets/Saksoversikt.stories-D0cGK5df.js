import{j as n}from"./jsx-runtime-CLpGMVip.js";import{Q as j}from"./useQuery-D4bRZ7iC.js";import{h as e,H as t}from"./index-B-Pz4-0B.js";import{r as u}from"./index-CR__hKHy.js";import{a as R}from"./annenPartVedtak-D1fCc_-P.js";import{d as v}from"./dokumenter-hiNVFzP3.js";import{s as h}from"./satser-CIow2Yri.js";import{t as E,m as y}from"./tidslinjeHendelser-BhC2biF2.js";import{s as S}from"./saker-CxK6yga4.js";import{s as g}from"./sokerinfo-CqC5rv1g.js";import{O as o}from"./routes-D6j-qr5i.js";import{B as c}from"./StatusTag-fyAQ8Z0C.js";import{S as N}from"./ForeldrepengeoversiktRoutes-hY2a7HF8.js";import{Q as $}from"./queryClient-DpQYMfvj.js";import{M as A,R as B,a as T}from"./chunk-SYFQ2XB5-D9pMU80H.js";import"./decorators-DIzpaN6C.js";import"./stønadskontoType-l1GAnwlP.js";import"./dates-Cs9kK9kw.js";import"./dokumenterUtils-D17VE2iM.js";import"./api-Diwr6d0n.js";import"./UttaksdagenString-BBcnJY7-.js";import"./stringUtils-grKZaQiI.js";import"./skjemanummer-CsrY1khI.js";import"./RettighetType-BD_oerVS.js";import"./Tag-ilehSkCp.js";import"./Label-uxnjPK_2.js";import"./UttaksplanKalender-DEG_VJhl.js";import"./index-DjWdgH6H.js";import"./iframe-6K6sbrFT.js";import"./dateFormValidation-D4jJDG9R.js";import"./links-Cq4ifjPA.js";import"./VStack-BsKxbgho.js";import"./useId-BsEbCovs.js";import"./message-CzTHpKKo.js";import"./Alert-hCvJm8fG.js";import"./Button-CuqaSHIm.js";import"./composeEventHandlers-BV8udL3-.js";import"./Link-DCG3SZwE.js";import"./File-BESBbXzH.js";import"./HGrid-BRpZMx9b.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./_baseIsEqual-Ca4dwh5c.js";import"./index-BDNcHBiq.js";import"./Responsive-CRGGdtE5.js";import"./Accordion-DPk-3nib.js";import"./ChevronDown-Dkzsn-l9.js";import"./useBackgroundColor-CjyW9dsS.js";import"./useSelectedSak-pSqoZpdh.js";import"./sakerUtils-ebWDps5B.js";import"./Ytelse-7td-ciMh.js";import"./Snarveier-B3yxWaOy.js";import"./LenkePanel-C6FGDLin.js";import"./Dokument--xI6KO_V.js";import"./GrupperteDokumenter-Cx1GEP6c.js";import"./guid-CsArkN6i.js";import"./Header-90UmlUuj.js";import"./LayoutWrapper-Cvi31uXS.js";import"./Stroller-Slu-8naH.js";import"./NoeGikkGalt-BdSBU659.js";import"./MinidialogSkjema-CUtshdMi.js";import"./useClientLayoutEffect-MhY06XyY.js";import"./BekreftelseSendtSøknad-CChM8Oht.js";import"./KontonummerInfo-CUgyOD4E.js";import"./HarIkkeSaker-By-J-BFU.js";import"./SøkelenkerPanel-DP56Vjra.js";import"./HarSaker-DCCdcNac.js";import"./SakLink-0n5jkHal.js";import"./ContentSection-7DyEQ1Ld.js";import"./DinPlan-Uoi-XwmJ.js";import"./Oppgaver-DVJzQ7RZ.js";import"./OppgaveLenkepanel-XnzPGhCg.js";import"./KontaktOss-soGtbJx7.js";const _=new $,Je={title:"Saksoversikt",render:k=>{const f=u.useRef(!1);return n.jsx("div",{className:"bg-deepblue-50",children:n.jsx(j,{client:_,children:n.jsx(A,{initialEntries:[`/${o.DIN_PLAN}/352011079`],children:n.jsx(B,{children:n.jsx(T,{element:n.jsx(N,{...k,isFirstRender:f}),path:`/${o.DIN_PLAN}/:saksnummer`})})})})})}},r={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(v)),e.get(".//rest/innsyn/v2/saker",()=>t.json(S)),e.get(".//rest/innsyn/tidslinje",()=>t.json(E)),e.get(".//rest/historikk/vedlegg",()=>t.json(y)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(R))]}},args:{søkerinfo:g}},s={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:c.UNDER_BEHANDLING,søknadsperioder:[{fom:"2024-01-01",tom:"2024-10-01"}]},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(".//rest/innsyn/tidslinje",()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(".//rest/historikk/vedlegg",()=>t.json()),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.get(".//rest/satser",()=>t.json(h))]}},args:{søkerinfo:g}};var p,a,i;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartVedtak))]\n    }\n  },\n  args: {\n    søkerinfo: søkerinfo as SøkerinfoDTO\n  }\n}",...(i=(a=r.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var m,d,l;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
            tilstand: BehandlingTilstand.UNDER_BEHANDLING,
            søknadsperioder: [{
              fom: '2024-01-01',
              tom: '2024-10-01'
            }] as SaksperiodeNy[]
          },
          oppdatertTidspunkt: '2024-02-28T21:19:08.911'
        }],
        svangerskapspenger: []
      })), http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/tidslinje\`, () => HttpResponse.json([{
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
    søkerinfo: søkerinfo as SøkerinfoDTO
  }
}`,...(l=(d=s.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const We=["Default","Engangsstønad"];export{r as Default,s as Engangsstønad,We as __namedExportsOrder,Je as default};
