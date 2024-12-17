import{j as n}from"./jsx-runtime-Cw0GR0a5.js";import{Q as j}from"./useQuery-D15qCwmj.js";import{h as e,H as t}from"./index-Ey0twAil.js";import{r as u}from"./index-CTjT7uj6.js";import{a as R}from"./annenPartVedtak-5pIDAVQj.js";import{d as v}from"./dokumenter-DG3eZWEY.js";import{s as h}from"./satser-CIow2Yri.js";import{t as E,m as y}from"./tidslinjeHendelser-yT4IBdHO.js";import{s as S}from"./saker-DXs8MA0N.js";import{s as g}from"./sokerinfo-CqC5rv1g.js";import{B as c}from"./StatusTag-Dz76bBNV.js";import{O as o}from"./routes-D6j-qr5i.js";import{S as N}from"./ForeldrepengeoversiktRoutes-BGA7FtOx.js";import{M as $,R as A,a as B}from"./index-qfvvJAWu.js";import{Q as T}from"./queryClient-SB0VFwmw.js";import"./decorators-86JrGkCj.js";import"./Tag-DNMWbfh9.js";import"./Label-BeJqMiuK.js";import"./UttaksplanKalender-DrgKCEZb.js";import"./dates-JCHAmx_r.js";import"./index-BXq8hJNt.js";import"./iframe-btLo-O__.js";import"../sb-preview/runtime.js";import"./dateFormValidation-BBxfzUfL.js";import"./links-Cq4ifjPA.js";import"./VStack-Cmqt2b2v.js";import"./useMergeRefs-DE1yqPfQ.js";import"./message-DyNkxP6Y.js";import"./Alert-CHcKNJcm.js";import"./Button-Cz42euBq.js";import"./composeEventHandlers-DeH74NdU.js";import"./Link-gwHVuC8x.js";import"./File-CBdzl0Ak.js";import"./index-BRV0Se7Z.js";import"./UttaksdagenString-DBxOpWvb.js";import"./HGrid-B_1P65QK.js";import"./index-BbmHap-z.js";import"./barnType-CnRI8jWg.js";import"./_getTag-BJIhF6Yf.js";import"./stringUtils-grKZaQiI.js";import"./index-CCQ3W5xA.js";import"./Responsive-DQW2dfVe.js";import"./Accordion-Cvwr2ZIe.js";import"./ChevronDown-CyMHwesb.js";import"./useBackgroundColor-Cz-TGjGB.js";import"./useSelectedSak-D5pfIh2Y.js";import"./api-D-Sai6KY.js";import"./sakerUtils-D4fsp9GY.js";import"./_baseIteratee-C-3460IB.js";import"./Ytelse-7td-ciMh.js";import"./index-ChWcicze.js";import"./Header-BBKxZOQC.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./Stroller-B-9_9B1W.js";import"./LenkePanel-DfIQwAuU.js";import"./BekreftelseSendtSøknad-BFzuHW0_.js";import"./DokumentType-CYieTKnZ.js";import"./KontonummerInfo-BEOGjGml.js";import"./ContentSection-B_6Fjlwm.js";import"./MinidialogSkjema-Bhi4noYd.js";import"./skjemanummer-CsrY1khI.js";import"./NoeGikkGalt-swYJaOtQ.js";import"./guid-CsArkN6i.js";import"./Snarveier-Bt2bOO3S.js";import"./HarIkkeSaker-Bg8S_ce2.js";import"./SøkelenkerPanel-CXVGwBW6.js";import"./HarSaker-CigXDLLd.js";import"./SakLink-DsuZUH8C.js";import"./DinPlan-DO6EMJuQ.js";import"./Oppgaver-B3g2Upl6.js";import"./OppgaveLenkepanel-GmAqf4Ch.js";import"./KontaktOss-CFX05IuY.js";import"./Dokument-BOpuu0CH.js";import"./GrupperteDokumenter-dA5hqwiE.js";const _=new T,We={title:"Saksoversikt",render:k=>{const f=u.useRef(!1);return n.jsx("div",{className:"bg-deepblue-50",children:n.jsx(j,{client:_,children:n.jsx($,{initialEntries:[`/${o.DIN_PLAN}/352011079`],children:n.jsx(A,{children:n.jsx(B,{element:n.jsx(N,{...k,isFirstRender:f}),path:`/${o.DIN_PLAN}/:saksnummer`})})})})})}},r={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(v)),e.get(".//rest/innsyn/v2/saker",()=>t.json(S)),e.get(".//rest/innsyn/tidslinje",()=>t.json(E)),e.get(".//rest/historikk/vedlegg",()=>t.json(y)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(R))]}},args:{søkerinfo:g}},s={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:c.UNDER_BEHANDLING,søknadsperioder:[{fom:"2024-01-01",tom:"2024-10-01"}]},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(".//rest/innsyn/tidslinje",()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(".//rest/historikk/vedlegg",()=>t.json()),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.get(".//rest/satser",()=>t.json(h))]}},args:{søkerinfo:g}};var p,i,a;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartsVedtak))]\n    }\n  },\n  args: {\n    søkerinfo: søkerinfo as SøkerinfoDTO\n  }\n}",...(a=(i=r.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var m,d,l;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(l=(d=s.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const Xe=["Default","Engangsstønad"];export{r as Default,s as Engangsstønad,Xe as __namedExportsOrder,We as default};
