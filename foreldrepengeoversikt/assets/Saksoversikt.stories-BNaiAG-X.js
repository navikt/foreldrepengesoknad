import{j as n}from"./jsx-runtime-CLpGMVip.js";import{Q as c}from"./useQuery-D4bRZ7iC.js";import{h as e,H as t}from"./index-B-Pz4-0B.js";import{r as A}from"./index-CR__hKHy.js";import{a as R}from"./annenPartVedtak-UPFbWscZ.js";import{d as f}from"./dokumenter-Dv9kKVcu.js";import{s as B}from"./satser-CIow2Yri.js";import{t as h,m as S}from"./tidslinjeHendelser-BNCk1YVA.js";import{s as _}from"./saker-RvtcuBD2.js";import{S as H}from"./svpsaker-usSjhgRb.js";import{s as a}from"./sokerinfo-CqC5rv1g.js";import{O as p}from"./routes-DFMVI8wI.js";import{B as N}from"./StatusTag-ZvFZRO2_.js";import{S as U}from"./ForeldrepengeoversiktRoutes-BlrkiryH.js";import{Q as L}from"./queryClient-DpQYMfvj.js";import{M as T,R as D,a as V}from"./chunk-SYFQ2XB5-D9pMU80H.js";import"./decorators-DIzpaN6C.js";import"./stønadskontoType-l1GAnwlP.js";import"./dates-C5Vjd-yy.js";import"./DekningsgradDTO-DRRk0ium.js";import"./dokumenterUtils-D7dIe_oU.js";import"./api-l2Seuk3V.js";import"./UttaksdagenString-B8Yb1Gis.js";import"./stringUtils-xBoGBqui.js";import"./skjemanummer-DfIZjofp.js";import"./Ytelse-7td-ciMh.js";import"./Tag-DiV4T64p.js";import"./Label-vuqQZ1tj.js";import"./UttaksplanKalender-DLswbNDu.js";import"./index-DjWdgH6H.js";import"./iframe-En0CyMRZ.js";import"./dateFormValidation-DXIVDO2q.js";import"./useId-CID_lvh_.js";import"./links-B36SqOas.js";import"./VStack-BZkCtxmu.js";import"./message-CzTHpKKo.js";import"./Alert-BICRsfrW.js";import"./Button-DEopYVou.js";import"./composeEventHandlers-BV8udL3-.js";import"./Link-C1mNwB7b.js";import"./File-lmocubeF.js";import"./HGrid-Bpfn9h1_.js";import"./HeartFill-B9NHZhHv.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./_baseIsEqual-Ca4dwh5c.js";import"./ChevronDown-CtB47T9y.js";import"./Responsive-iNj1KCW0.js";import"./ArrowRight-DNLm8DIc.js";import"./index-BDNcHBiq.js";import"./lodash-jRVyhE9m.js";import"./Accordion-DXsYMTU8.js";import"./Checkmark-DJs5cfYY.js";import"./useBackgroundColor-CjyW9dsS.js";import"./useSelectedSak-C3Ho5AT2.js";import"./sakerUtils-DqgcebI3.js";import"./Snarveier-DjgYDKIE.js";import"./LenkePanel-DNW8h9lC.js";import"./Dokument-Cinm193a.js";import"./GrupperteDokumenter-CWRpKJJR.js";import"./guid-CsArkN6i.js";import"./Header-QWKzcFD6.js";import"./LayoutWrapper-Cvi31uXS.js";import"./Stroller-CHl3Gahh.js";import"./NoeGikkGalt-DspS55ah.js";import"./MinidialogSkjema-CJVNlYqQ.js";import"./BekreftelseSendtSøknad-D3oeVZ3E.js";import"./KontonummerInfo-CX3gHwI7.js";import"./HarIkkeSaker-CDKOtJYi.js";import"./SøkelenkerPanel-D3VHkPCq.js";import"./HarSaker-BV9cHvoE.js";import"./SakLink-NSobBx8y.js";import"./ContentSection-DqBoVSpP.js";import"./DinPlan-DGtF9_WE.js";import"./Oppgaver-CX9NQYKk.js";import"./OppgaveLenkepanel-qBESdSUq.js";import"./KontaktOss-BS4Rot9y.js";const x=new L,ot={title:"Saksoversikt",render:({saksnummer:E,...$})=>{const y=A.useRef(!1);return n.jsx("div",{className:"bg-deepblue-50",children:n.jsx(c,{client:x,children:n.jsx(T,{initialEntries:[`/${p.DIN_PLAN}/${E}`],children:n.jsx(D,{children:n.jsx(V,{element:n.jsx(U,{...$,isFirstRender:y}),path:`/${p.DIN_PLAN}/:saksnummer`})})})})})}},s={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(f)),e.get(".//rest/innsyn/v2/saker",()=>t.json(_)),e.get(".//rest/innsyn/tidslinje",()=>t.json(h)),e.get(".//rest/historikk/vedlegg",()=>t.json(S)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(R))]}},args:{søkerinfo:a,saksnummer:"352011079"}},r={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:N.UNDER_BEHANDLING,søknadsperioder:[{fom:"2024-01-01",tom:"2024-10-01"}]},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(".//rest/innsyn/tidslinje",()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(".//rest/historikk/vedlegg",()=>t.json()),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.get(".//rest/satser",()=>t.json(B))]}},args:{søkerinfo:a,saksnummer:"352011079"}},o={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(f)),e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[],svangerskapspenger:[H]})),e.get(".//rest/innsyn/tidslinje",()=>t.json(h)),e.get(".//rest/historikk/vedlegg",()=>t.json(S)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(R))]}},args:{saksnummer:"202",søkerinfo:a}};var i,m,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartVedtak))]\n    }\n  },\n  args: {\n    søkerinfo: søkerinfo as SøkerinfoDTO,\n    saksnummer: '352011079'\n  }\n}",...(d=(m=s.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var g,l,k;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
    søkerinfo: søkerinfo as SøkerinfoDTO,
    saksnummer: '352011079'
  }
}`,...(k=(l=r.parameters)==null?void 0:l.docs)==null?void 0:k.source}}};var j,u,v;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json({\n        foreldrepenger: [],\n        engangsstønad: [],\n        svangerskapspenger: [SAK_1]\n      })), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartVedtak))]\n    }\n  },\n  args: {\n    saksnummer: '202',\n    søkerinfo: søkerinfo as SøkerinfoDTO\n  }\n}",...(v=(u=o.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};const at=["Foreldrepenger","Engangsstønad","Svangerskapspenger"];export{r as Engangsstønad,s as Foreldrepenger,o as Svangerskapspenger,at as __namedExportsOrder,ot as default};
