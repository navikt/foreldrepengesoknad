import{j as r}from"./jsx-runtime-Cw0GR0a5.js";import{Q as v}from"./useQuery-D15qCwmj.js";import{h as e,H as t}from"./index-Ey0twAil.js";import{r as j}from"./index-CTjT7uj6.js";import{a as u}from"./annenPartVedtak-CIFtkZAr.js";import{d as R}from"./dokumenter-DG3eZWEY.js";import{s as h}from"./satser-CIow2Yri.js";import{t as E,m as y}from"./tidslinjeHendelser-yT4IBdHO.js";import{s as S}from"./saker-wGcw9qFq.js";import{s as g}from"./sokerinfo-CqC5rv1g.js";import{B as c}from"./StatusTag-Dz76bBNV.js";import{O as o}from"./routes-D6j-qr5i.js";import{S as N}from"./ForeldrepengeoversiktRoutes-BfXKt3iY.js";import{M as $,R as A,a as B}from"./index-qfvvJAWu.js";import{Q as T}from"./queryClient-SB0VFwmw.js";import"./decorators-86JrGkCj.js";import"./Tag-DNMWbfh9.js";import"./Label-BeJqMiuK.js";import"./UttaksdagenString-DBxOpWvb.js";import"./dates-JCHAmx_r.js";import"./index-CCQ3W5xA.js";import"./api-CeB_rvoh.js";import"./stringUtils-BhrNUKGk.js";import"./Header-OD-xDi77.js";import"./index-BXq8hJNt.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./Ytelse-7td-ciMh.js";import"./sakerUtils-BUhIC3g1.js";import"./_baseIteratee-C-3460IB.js";import"./_getTag-BJIhF6Yf.js";import"./barnType-CnRI8jWg.js";import"./HGrid-B_1P65QK.js";import"./VStack-Cmqt2b2v.js";import"./useMergeRefs-DE1yqPfQ.js";import"./Responsive-DQW2dfVe.js";import"./Stroller-B-9_9B1W.js";import"./LenkePanel-DfIQwAuU.js";import"./index-ChWcicze.js";import"./index-BbmHap-z.js";import"./useBackgroundColor-BQRSMoNK.js";import"./Button-Cz42euBq.js";import"./composeEventHandlers-DeH74NdU.js";import"./Alert-CHcKNJcm.js";import"./BekreftelseSendtSøknad-8Cq69HXh.js";import"./links-XBeNlE0K.js";import"./bemUtils-DmNyTjfb.js";import"./dokumenterUtils-f_2KMpBX.js";import"./File-CBdzl0Ak.js";import"./Link-gwHVuC8x.js";import"./KontonummerInfo-CB5S2YvT.js";import"./Accordion-Cvwr2ZIe.js";import"./ChevronDown-CyMHwesb.js";import"./message-DyNkxP6Y.js";import"./UttaksplanKalender-D9QiExTS.js";import"./iframe-B8-LbMhy.js";import"../sb-preview/runtime.js";import"./VeiviserPage-WWaDT2q1.js";import"./index-BRV0Se7Z.js";import"./useSelectedSak-yvJ5Kk8B.js";import"./Snarveier-C9ZshlRk.js";import"./Dokument-B2qMdgvT.js";import"./GrupperteDokumenter-rWcPphtv.js";import"./guid-CsArkN6i.js";import"./NoeGikkGalt-swYJaOtQ.js";import"./MinidialogSkjema-Cs6OqDUb.js";import"./skjemanummer-CsrY1khI.js";import"./HarIkkeSaker-BJ9bPOlW.js";import"./ContentSection-B_6Fjlwm.js";import"./HarSaker-CY8PkMQj.js";import"./SakLink-BsA5gPkH.js";import"./DinPlan-DRbEu42q.js";import"./Oppgaver-C6gM2VaD.js";import"./OppgaveLenkepanel-oycW-SZE.js";import"./KontaktOss-CFX05IuY.js";const _=new T,We={title:"Saksoversikt",render:k=>{const f=j.useRef(!1);return r.jsx("div",{className:"bg-deepblue-50",children:r.jsx(v,{client:_,children:r.jsx($,{initialEntries:[`/${o.DIN_PLAN}/352011079`],children:r.jsx(A,{children:r.jsx(B,{element:r.jsx(N,{...k,isFirstRender:f}),path:`/${o.DIN_PLAN}/:saksnummer`})})})})})}},n={parameters:{msw:{handlers:[e.get("/foreldrepenger/oversikt/rest/dokument/alle",()=>t.json(R)),e.get("/foreldrepenger/oversikt/rest/innsyn/v2/saker",()=>t.json(S)),e.get("/foreldrepenger/oversikt/rest/innsyn/tidslinje",()=>t.json(E)),e.get("/foreldrepenger/oversikt/rest/historikk/vedlegg",()=>t.json(y)),e.get("/foreldrepenger/oversikt/rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post("/foreldrepenger/oversikt/rest/innsyn/v2/annenPartVedtak",()=>t.json(u))]}},args:{søkerinfo:g}},s={parameters:{msw:{handlers:[e.get("/foreldrepenger/oversikt/rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:c.UNDER_BEHANDLING,søknadsperioder:[{fom:"2024-01-01",tom:"2024-10-01"}]},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get("/foreldrepenger/oversikt/rest/innsyn/tidslinje",()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get("/foreldrepenger/oversikt/rest/historikk/vedlegg",()=>t.json()),e.get("/foreldrepenger/oversikt/rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.get("/foreldrepenger/oversikt/rest/satser",()=>t.json(h))]}},args:{søkerinfo:g}};var p,i,a;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartsVedtak))]\n    }\n  },\n  args: {\n    søkerinfo: søkerinfo as SøkerinfoDTO\n  }\n}",...(a=(i=n.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var m,d,l;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(l=(d=s.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const Xe=["Default","Engangsstønad"];export{n as Default,s as Engangsstønad,Xe as __namedExportsOrder,We as default};
