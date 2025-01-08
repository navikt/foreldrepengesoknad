import{j as n}from"./jsx-runtime-DwRxq3ZX.js";import{Q as j}from"./useQuery-Bp3akpRK.js";import{h as e,H as t}from"./index-B-Pz4-0B.js";import{r as u}from"./index-BX3iQpgp.js";import{a as R}from"./annenPartVedtak-K6Yc4Sjy.js";import{d as v}from"./dokumenter-BwXzfBFA.js";import{s as h}from"./satser-CIow2Yri.js";import{t as E,m as y}from"./tidslinjeHendelser-CgvMNA8a.js";import{s as S}from"./saker-HDhfepFG.js";import{s as g}from"./sokerinfo-CqC5rv1g.js";import{O as o}from"./routes-D6j-qr5i.js";import{B as c}from"./StatusTag-D1SAZhwx.js";import{S as N}from"./ForeldrepengeoversiktRoutes-CZYxAkva.js";import{M as $,R as A,a as B}from"./index-ByI1_y3g.js";import{Q as T}from"./queryClient-Ch-PTZPr.js";import"./decorators-DIzpaN6C.js";import"./stønadskontoType-l1GAnwlP.js";import"./dates-TdbGqddN.js";import"./dokumenterUtils-DhfrfuBG.js";import"./api-CuYAbk1P.js";import"./UttaksdagenString-Dd6xBUPd.js";import"./stringUtils-grKZaQiI.js";import"./skjemanummer-CsrY1khI.js";import"./RettighetType-BD_oerVS.js";import"./Tag-BLAkPtYT.js";import"./Label-sdGPuzAK.js";import"./UttaksplanKalender-DvvsaCwN.js";import"./index-A4VDgvRX.js";import"./iframe-Op9mga9u.js";import"../sb-preview/runtime.js";import"./dateFormValidation-CpTlqkG5.js";import"./links-Cq4ifjPA.js";import"./VStack-DCI-IWy0.js";import"./useId-CmSpHSni.js";import"./message-8h7m8LF5.js";import"./Alert-DYj8gWus.js";import"./Button-CZavV0iI.js";import"./composeEventHandlers-BV8udL3-.js";import"./Link-6pYp3TYt.js";import"./File-B657A67O.js";import"./HGrid-VFl1Qdht.js";import"./index-B1dLepta.js";import"./_getTag-CkXgi8rB.js";import"./index-ImNsV_cY.js";import"./Responsive-DPQNueAS.js";import"./Accordion-Cnxh7RR0.js";import"./ChevronDown-4_HeHalp.js";import"./useBackgroundColor-Djv3QOUN.js";import"./useSelectedSak-DLx0IsMZ.js";import"./sakerUtils-B3gbHCJi.js";import"./Ytelse-7td-ciMh.js";import"./Snarveier-D6TCwXKt.js";import"./LenkePanel-Bw60y4ti.js";import"./index-BwGdUlzO.js";import"./Dokument-BP9frbnt.js";import"./GrupperteDokumenter-DU_vBhJ0.js";import"./guid-CsArkN6i.js";import"./Header-Cj5SuQnq.js";import"./LayoutWrapper-CL5NNoZ7.js";import"./Stroller-d-1P2-cY.js";import"./NoeGikkGalt-4UiPdUz7.js";import"./MinidialogSkjema-DMRRV1I5.js";import"./useClientLayoutEffect-CDS5ZwQf.js";import"./BekreftelseSendtSøknad-CbNH0frt.js";import"./KontonummerInfo-BOjUcBgR.js";import"./HarIkkeSaker-BfhA7sLg.js";import"./SøkelenkerPanel-CVmRVoti.js";import"./HarSaker-CA-oXsaE.js";import"./SakLink-BXt0nCMn.js";import"./ContentSection-CmPeHpUR.js";import"./DinPlan-BkRWcGRp.js";import"./Oppgaver-Byqve8zJ.js";import"./OppgaveLenkepanel-BBR3kecF.js";import"./KontaktOss-Bm_F3i4V.js";const _=new T,We={title:"Saksoversikt",render:k=>{const f=u.useRef(!1);return n.jsx("div",{className:"bg-deepblue-50",children:n.jsx(j,{client:_,children:n.jsx($,{initialEntries:[`/${o.DIN_PLAN}/352011079`],children:n.jsx(A,{children:n.jsx(B,{element:n.jsx(N,{...k,isFirstRender:f}),path:`/${o.DIN_PLAN}/:saksnummer`})})})})})}},r={parameters:{msw:{handlers:[e.get(".//rest/dokument/alle",()=>t.json(v)),e.get(".//rest/innsyn/v2/saker",()=>t.json(S)),e.get(".//rest/innsyn/tidslinje",()=>t.json(E)),e.get(".//rest/historikk/vedlegg",()=>t.json(y)),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.post(".//rest/innsyn/v2/annenPartVedtak",()=>t.json(R))]}},args:{søkerinfo:g}},s={parameters:{msw:{handlers:[e.get(".//rest/innsyn/v2/saker",()=>t.json({foreldrepenger:[],engangsstønad:[{saksnummer:"352011079",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2024-01-01",termindato:"2024-01-01",antallBarn:1},åpenBehandling:{tilstand:c.UNDER_BEHANDLING,søknadsperioder:[{fom:"2024-01-01",tom:"2024-10-01"}]},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],svangerskapspenger:[]})),e.get(".//rest/innsyn/tidslinje",()=>t.json([{type:"søknad",opprettet:"2023-01-31T09:06:46.541655",aktørType:"BRUKER",tidslinjeHendelseType:"FØRSTEGANGSSØKNAD",dokumenter:[{type:"INNGÅENDE_DOKUMENT",mottatt:"2023-01-31T09:06:48",saksnummer:"352011079",tittel:"Søknad om foreldrepenger ved fødsel",journalpostId:"598115874",dokumentId:"624862989"}],manglendeVedlegg:[]}])),e.get(".//rest/historikk/vedlegg",()=>t.json()),e.get(".//rest/innsyn/v2/saker/oppdatert",()=>t.json(!0)),e.get(".//rest/satser",()=>t.json(h))]}},args:{søkerinfo:g}};var p,i,a;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:"{\n  parameters: {\n    msw: {\n      handlers: [http.get(`${import.meta.env.BASE_URL}/rest/dokument/alle`, () => HttpResponse.json(dokumenter)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/tidslinje`, () => HttpResponse.json(tidslinjeHendelser)), http.get(`${import.meta.env.BASE_URL}/rest/historikk/vedlegg`, () => HttpResponse.json(manglendeVedlegg)), http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker/oppdatert`, () => HttpResponse.json(true)), http.post(`${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak`, () => HttpResponse.json(annenPartVedtak))]\n    }\n  },\n  args: {\n    søkerinfo: søkerinfo as SøkerinfoDTO\n  }\n}",...(a=(i=r.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var m,d,l;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
