import{j as n}from"./jsx-runtime-Cw0GR0a5.js";import{Q as j}from"./useQuery-D15qCwmj.js";import{h as e,H as t}from"./index-Ey0twAil.js";import{r as u}from"./index-CTjT7uj6.js";import{a as R}from"./annenPartVedtak-5pIDAVQj.js";import{d as v}from"./dokumenter-DG3eZWEY.js";import{s as h}from"./satser-CIow2Yri.js";import{t as E,m as y}from"./tidslinjeHendelser-yT4IBdHO.js";import{s as S}from"./saker-DXs8MA0N.js";import{s as g}from"./sokerinfo-CqC5rv1g.js";import{B as c}from"./StatusTag-Dz76bBNV.js";import{O as o}from"./routes-D6j-qr5i.js";import{S as N}from"./ForeldrepengeoversiktRoutes-D9yDkY9z.js";import{M as $,R as A,a as B}from"./index-qfvvJAWu.js";import{Q as T}from"./queryClient-SB0VFwmw.js";import"./decorators-86JrGkCj.js";import"./Tag-DNMWbfh9.js";import"./Label-BeJqMiuK.js";import"./UttaksdagenString-DBxOpWvb.js";import"./dates-JCHAmx_r.js";import"./index-CCQ3W5xA.js";import"./api-CspDaNR4.js";import"./stringUtils-grKZaQiI.js";import"./Header-BWTGfjL4.js";import"./index-BXq8hJNt.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./Ytelse-7td-ciMh.js";import"./sakerUtils-BUhIC3g1.js";import"./_baseIteratee-C-3460IB.js";import"./_getTag-BJIhF6Yf.js";import"./barnType-CnRI8jWg.js";import"./HGrid-B_1P65QK.js";import"./VStack-Cmqt2b2v.js";import"./useMergeRefs-DE1yqPfQ.js";import"./Responsive-DQW2dfVe.js";import"./Stroller-B-9_9B1W.js";import"./LenkePanel-DfIQwAuU.js";import"./index-ChWcicze.js";import"./index-BbmHap-z.js";import"./useBackgroundColor-Cz-TGjGB.js";import"./Button-Cz42euBq.js";import"./composeEventHandlers-DeH74NdU.js";import"./Alert-CHcKNJcm.js";import"./BekreftelseSendtSøknad-DrPBCB6Q.js";import"./links-XBeNlE0K.js";import"./bemUtils-DmNyTjfb.js";import"./dokumenterUtils-CuDKN7jC.js";import"./File-CBdzl0Ak.js";import"./Link-gwHVuC8x.js";import"./KontonummerInfo-CB5S2YvT.js";import"./Accordion-Cvwr2ZIe.js";import"./ChevronDown-CyMHwesb.js";import"./message-DyNkxP6Y.js";import"./UttaksplanKalender-BY8B37Oq.js";import"./iframe-DQ4p5yVl.js";import"../sb-preview/runtime.js";import"./dateFormValidation-D_6x3GZx.js";import"./index-BRV0Se7Z.js";import"./useSelectedSak-CskcSisO.js";import"./Snarveier-NoXAFYas.js";import"./Dokument-B64tl6Qk.js";import"./GrupperteDokumenter-Bnw_u1Io.js";import"./guid-CsArkN6i.js";import"./NoeGikkGalt-swYJaOtQ.js";import"./MinidialogSkjema-ByfZioNR.js";import"./skjemanummer-CsrY1khI.js";import"./HarIkkeSaker-iUsXyZF-.js";import"./SøkelenkerPanel-DOFmxP5b.js";import"./HarSaker-B_ZR8IgS.js";import"./SakLink-BsA5gPkH.js";import"./ContentSection-B_6Fjlwm.js";import"./DinPlan-x4w6-lcM.js";import"./Oppgaver-CR67YVNJ.js";import"./OppgaveLenkepanel-oycW-SZE.js";import"./KontaktOss-CFX05IuY.js";const _=new T,Xe={title:"Saksoversikt",render:k=>{const f=u.useRef(!1);return n.jsx("div",{className:"bg-deepblue-50",children:n.jsx(j,{client:_,children:n.jsx($,{initialEntries:[`/${o.DIN_PLAN}/352011079`],children:n.jsx(A,{children:n.jsx(B,{element:n.jsx(N,{...k,isFirstRender:f}),path:`/${o.DIN_PLAN}/:saksnummer`})})})})})}},r={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(v)),e.get(".//rest/innsyn/v2/saker",()=>t.json(S)),e.get(".//rest/innsyn/tidslinje",()=>t.json(E)),e.get(".//rest/historikk/vedlegg",()=>t.json(y)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(R))]}},args:{søkerinfo:g}},s={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:c.UNDER_BEHANDLING,søknadsperioder:[{fom:"2024-01-01",tom:"2024-10-01"}]},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(".//rest/innsyn/tidslinje",()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(".//rest/historikk/vedlegg",()=>t.json()),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.get(".//rest/satser",()=>t.json(h))]}},args:{søkerinfo:g}};var p,i,a;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartsVedtak))]\n    }\n  },\n  args: {\n    søkerinfo: søkerinfo as SøkerinfoDTO\n  }\n}",...(a=(i=r.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var m,d,l;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(l=(d=s.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const Ye=["Default","Engangsstønad"];export{r as Default,s as Engangsstønad,Ye as __namedExportsOrder,Xe as default};
