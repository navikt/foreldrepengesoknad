import{j as s}from"./jsx-runtime-Cw0GR0a5.js";import{Q as v}from"./useQuery-D15qCwmj.js";import{h as t,H as e}from"./index-Ey0twAil.js";import{r as f}from"./index-CTjT7uj6.js";import{a as j}from"./annenPartVedtak-CIFtkZAr.js";import{d as u}from"./dokumenter-DG3eZWEY.js";import{s as R}from"./satser-CIow2Yri.js";import{t as y,m as c}from"./tidslinjeHendelser-yT4IBdHO.js";import{s as N}from"./saker-wGcw9qFq.js";import{s as k}from"./sokerinfo-CqC5rv1g.js";import{B as E}from"./StatusTag-Dz76bBNV.js";import{O as o}from"./routes-D6j-qr5i.js";import{S as T}from"./ForeldrepengeoversiktRoutes-CiDG5h8h.js";import{M as H,R as D,a as S}from"./index-qfvvJAWu.js";import{Q as A}from"./queryClient-SB0VFwmw.js";import"./decorators-86JrGkCj.js";import"./Tag-DNMWbfh9.js";import"./Label-BeJqMiuK.js";import"./UttaksdagenString-DBxOpWvb.js";import"./dates-JCHAmx_r.js";import"./index-CCQ3W5xA.js";import"./api-C4INlF_P.js";import"./stringUtils-BhrNUKGk.js";import"./Header-rluw0ipw.js";import"./index-BXq8hJNt.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./Ytelse-7td-ciMh.js";import"./sakerUtils-BUhIC3g1.js";import"./_baseIteratee-C-3460IB.js";import"./_getTag-BJIhF6Yf.js";import"./barnType-CnRI8jWg.js";import"./HGrid-B_1P65QK.js";import"./VStack-Cmqt2b2v.js";import"./useMergeRefs-DE1yqPfQ.js";import"./Responsive-DQW2dfVe.js";import"./Stroller-B-9_9B1W.js";import"./LenkePanel-DfIQwAuU.js";import"./index-ChWcicze.js";import"./index-BbmHap-z.js";import"./useBackgroundColor-Cz-TGjGB.js";import"./Button-Cz42euBq.js";import"./composeEventHandlers-DeH74NdU.js";import"./Alert-CHcKNJcm.js";import"./BekreftelseSendtSøknad-JhJzfmuT.js";import"./links-XBeNlE0K.js";import"./bemUtils-DmNyTjfb.js";import"./dokumenterUtils-CkDjxlDk.js";import"./File-CBdzl0Ak.js";import"./Link-gwHVuC8x.js";import"./KontonummerInfo-CB5S2YvT.js";import"./Accordion-Cvwr2ZIe.js";import"./ChevronDown-CyMHwesb.js";import"./message-DyNkxP6Y.js";import"./UttaksplanKalender-p3uK5rRA.js";import"./iframe-BWJyIfXW.js";import"../sb-preview/runtime.js";import"./VeiviserPage-WWaDT2q1.js";import"./index-BRV0Se7Z.js";import"./useSelectedSak-CdiYtaBv.js";import"./Snarveier-C0DKOd9p.js";import"./Dokument-DW2IxGJL.js";import"./GrupperteDokumenter-BnL_wMPD.js";import"./guid-CsArkN6i.js";import"./NoeGikkGalt-swYJaOtQ.js";import"./MinidialogSkjema-DItQcKtE.js";import"./skjemanummer-CsrY1khI.js";import"./HarIkkeSaker-BTSb5_55.js";import"./ContentSection-B_6Fjlwm.js";import"./HarSaker-BUF0fVCN.js";import"./SakLink-BsA5gPkH.js";import"./DinPlan-0-WbIpiE.js";import"./Oppgaver-TjRb2E1f.js";import"./OppgaveLenkepanel-oycW-SZE.js";import"./KontaktOss-CFX05IuY.js";const x=new A,Wt={title:"Saksoversikt",render:g=>{const h=f.useRef(!1);return s.jsx("div",{className:"bg-deepblue-50",children:s.jsx(v,{client:x,children:s.jsx(H,{initialEntries:[`/${o.DIN_PLAN}/352011079`],children:s.jsx(D,{children:s.jsx(S,{element:s.jsx(T,{...g,isFirstRender:h}),path:`/${o.DIN_PLAN}/:saksnummer`})})})})})}},r={parameters:{msw:{handlers:[t.get("https://oversikt/rest/dokument/alle",()=>e.json(u)),t.get("https://oversikt/rest/innsyn/v2/saker",()=>e.json(N)),t.get("https://oversikt/rest/innsyn/tidslinje",()=>e.json(y)),t.get("https://oversikt/rest/historikk/vedlegg",()=>e.json(c)),t.get("https://oversikt/rest/innsyn/v2/saker/oppdatert",()=>e.json(!0)),t.post("https://oversikt/rest/innsyn/v2/annenPartVedtak",()=>e.json(j))]}},args:{søkerinfo:k}},n={parameters:{msw:{handlers:[t.get("https://oversikt/rest/innsyn/v2/saker",()=>e.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:E.UNDER_BEHANDLING,søknadsperioder:[{fom:"2024-01-01",tom:"2024-10-01"}]},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),t.get("https://oversikt/rest/innsyn/tidslinje",()=>e.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),t.get("https://oversikt/rest/historikk/vedlegg",()=>e.json()),t.get("https://oversikt/rest/innsyn/v2/saker/oppdatert",()=>e.json(!0)),t.get("https://oversikt/rest/satser",()=>e.json(R))]}},args:{søkerinfo:k}};var p,i,a;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get('https://oversikt/rest/dokument/alle', () => HttpResponse.json(dokumenter)), http.get('https://oversikt/rest/innsyn/v2/saker', () => HttpResponse.json(saker)), http.get('https://oversikt/rest/innsyn/tidslinje', () => HttpResponse.json(tidslinjeHendelser)), http.get('https://oversikt/rest/historikk/vedlegg', () => HttpResponse.json(manglendeVedlegg)), http.get('https://oversikt/rest/innsyn/v2/saker/oppdatert', () => HttpResponse.json(true)), http.post('https://oversikt/rest/innsyn/v2/annenPartVedtak', () => HttpResponse.json(annenPartsVedtak))]
    }
  },
  args: {
    søkerinfo: søkerinfo as SøkerinfoDTO
  }
}`,...(a=(i=r.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var m,d,l;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get('https://oversikt/rest/innsyn/v2/saker', () => HttpResponse.json({
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
      })), http.get('https://oversikt/rest/innsyn/tidslinje', () => HttpResponse.json([{
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
      }])), http.get('https://oversikt/rest/historikk/vedlegg', () => HttpResponse.json()), http.get('https://oversikt/rest/innsyn/v2/saker/oppdatert', () => HttpResponse.json(true)), http.get('https://oversikt/rest/satser', () => HttpResponse.json(satser))]
    }
  },
  args: {
    søkerinfo: søkerinfo as SøkerinfoDTO
  }
}`,...(l=(d=n.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const Xt=["Default","Engangsstønad"];export{r as Default,n as Engangsstønad,Xt as __namedExportsOrder,Wt as default};
