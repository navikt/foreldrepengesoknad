import{j as t}from"./jsx-runtime-CLpGMVip.js";import{Q as k}from"./useQuery-D4bRZ7iC.js";import{h as g,H as d}from"./index-B-Pz4-0B.js";import{O as s}from"./routes-D6j-qr5i.js";import{Y as c}from"./Ytelse-7td-ciMh.js";import{E as o}from"./ForeldrepengeoversiktRoutes-By2dz1sa.js";import{Q as f}from"./queryClient-DpQYMfvj.js";import{M as E,R as S,a as h}from"./chunk-SYFQ2XB5-D9pMU80H.js";import"./index-CR__hKHy.js";import"./decorators-DIzpaN6C.js";import"./UttaksplanKalender-3-lLDpvV.js";import"./dates-Cs9kK9kw.js";import"./index-DjWdgH6H.js";import"./iframe-B9yby42x.js";import"./dateFormValidation-DhjjBIgK.js";import"./links-Cq4ifjPA.js";import"./VStack-BsKxbgho.js";import"./Label-uxnjPK_2.js";import"./useId-BsEbCovs.js";import"./message-CzTHpKKo.js";import"./Alert-hCvJm8fG.js";import"./Button-CuqaSHIm.js";import"./composeEventHandlers-BV8udL3-.js";import"./Link-DCG3SZwE.js";import"./File-BESBbXzH.js";import"./UttaksdagenString-BBcnJY7-.js";import"./HGrid-BRpZMx9b.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./stønadskontoType-l1GAnwlP.js";import"./_baseIsEqual-Ca4dwh5c.js";import"./stringUtils-grKZaQiI.js";import"./index-BDNcHBiq.js";import"./Responsive-CRGGdtE5.js";import"./Accordion-DPk-3nib.js";import"./ChevronDown-Dkzsn-l9.js";import"./useBackgroundColor-CjyW9dsS.js";import"./useSelectedSak-pSqoZpdh.js";import"./api-Diwr6d0n.js";import"./sakerUtils-ebWDps5B.js";import"./Snarveier-B3yxWaOy.js";import"./LenkePanel-C6FGDLin.js";import"./Dokument--xI6KO_V.js";import"./dokumenterUtils-D17VE2iM.js";import"./Tag-ilehSkCp.js";import"./GrupperteDokumenter-Cx1GEP6c.js";import"./guid-CsArkN6i.js";import"./Header-90UmlUuj.js";import"./LayoutWrapper-Cvi31uXS.js";import"./StatusTag-fyAQ8Z0C.js";import"./Stroller-Slu-8naH.js";import"./NoeGikkGalt-BdSBU659.js";import"./MinidialogSkjema-Bq_LHyAk.js";import"./skjemanummer-CsrY1khI.js";import"./useClientLayoutEffect-MhY06XyY.js";import"./BekreftelseSendtSøknad-CChM8Oht.js";import"./KontonummerInfo-CUgyOD4E.js";import"./HarIkkeSaker-By-J-BFU.js";import"./SøkelenkerPanel-DP56Vjra.js";import"./HarSaker-DCCdcNac.js";import"./SakLink-0n5jkHal.js";import"./ContentSection-7DyEQ1Ld.js";import"./DinPlan-C2KHTu4u.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-DVJzQ7RZ.js";import"./OppgaveLenkepanel-XnzPGhCg.js";import"./KontaktOss-soGtbJx7.js";const R=new f({defaultOptions:{queries:{retry:!1}}}),Gt={title:"EttersendingPage",component:o,render:u=>t.jsx(k,{client:R,children:t.jsx(E,{initialEntries:[`/${s.ETTERSEND}/1`],children:t.jsx(S,{children:t.jsx(h,{element:t.jsx(o,{...u}),path:`/${s.ETTERSEND}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[g.post(".//rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:c.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},e={parameters:{msw:{handlers:[g.post(".//rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:400}))]}},args:r.args};var n,p,a;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
          status: 200
        });
      })]
    }
  },
  args: {
    saker: {
      engangsstønad: [{
        ytelse: Ytelse.ENGANGSSTØNAD,
        saksnummer: '1',
        sakAvsluttet: false,
        gjelderAdopsjon: false,
        familiehendelse: {
          fødselsdato: '2020-01-01',
          antallBarn: 1
        },
        oppdatertTidspunkt: '2024-02-28T21:19:08.911'
      }],
      foreldrepenger: [],
      svangerskapspenger: []
    }
  }
}`,...(a=(p=r.parameters)==null?void 0:p.docs)==null?void 0:a.source}}};var m,i,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(l=(i=e.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const Ht=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{e as SkalFeileOpplasting,r as SkalIkkeFeileOpplasting,Ht as __namedExportsOrder,Gt as default};
