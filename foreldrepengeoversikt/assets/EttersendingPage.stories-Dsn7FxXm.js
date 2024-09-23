import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{Q as k,a as c}from"./useQuery-D_fvW0PL.js";import{h as g,H as d}from"./index-CQPv6-if.js";import{O as s}from"./routes-Run26EI7.js";import{Y as f}from"./Ytelse-7td-ciMh.js";import{E as o}from"./ForeldrepengeoversiktRoutes-C7Ja0vh2.js";import{M as h,R as E,a as S}from"./index-D9Go8z3K.js";import"./index-CTjT7uj6.js";import"./decorators-Bo_HQzC9.js";import"./Snarveier-CNdrJF1D.js";import"./index-ghK6WsM8.js";import"./links-BegG-28I.js";import"./dates-DUtd6zgH.js";import"./LenkePanel-BSi6mVcY.js";import"./index-CCQ3W5xA.js";import"./VStack-CislUPit.js";import"./Label-BeJqMiuK.js";import"./useMergeRefs-Dg7ETiim.js";import"./useId-BFxX0aRd.js";import"./useSelectedSak-BG1k6VBR.js";import"./api-DZHAPXBN.js";import"./sakerUtils-eThI45Eb.js";import"./_baseIteratee-CNgr-98l.js";import"./_getTag-COHPfPRs.js";import"./Uttaksdagen-ClUiN95P.js";import"./dateUtils-SLNltPAj.js";import"./HGrid-9RT2OXkm.js";import"./ContentSection-B_6Fjlwm.js";import"./Header-CE6Xr2r_.js";import"./react-DKFOadDt.js";import"./LayoutWrapper-Rfv3lXLd.js";import"./Breadcrumb-DtTjGsEa.js";import"./bemUtils-DmNyTjfb.js";import"./Link-gwHVuC8x.js";import"./useId-BHtrcvnP.js";import"./StatusTag-Crc04EW3.js";import"./Tag-DNMWbfh9.js";import"./Responsive-Cqh12JNO.js";import"./Stroller-JY-nL-ik.js";import"./Dokument-iUaOdCPU.js";import"./dokumenterUtils-Nut45n91.js";import"./GrupperteDokumenter-Bbx-wsGS.js";import"./guid-CsArkN6i.js";import"./Accordion-JjU6DK1h.js";import"./ChevronDown-CjGECSJR.js";import"./composeEventHandlers-DeH74NdU.js";import"./NoeGikkGalt-DxR4p5mt.js";import"./Alert-CVpGPMbJ.js";import"./XMarkOctagonFill-BgBREcbx.js";import"./useBackgroundColor-D4ksQeHz.js";import"./MinidialogSkjema-CR1nQNsG.js";import"./VeiviserPage-KQokrPmW.js";import"./message-CSZdADn6.js";import"./ExclamationmarkTriangle-CrbIB9PM.js";import"./index-BRV0Se7Z.js";import"./colors-BgDiWhW9.js";import"./index-vZN_Bsf0.js";import"./BekreftelseSendtSøknad-BymbIp9u.js";import"./KontonummerInfo-DiJWAh76.js";import"./HarIkkeSaker-B9PFc_3k.js";import"./HarSaker-CXz_vclr.js";import"./stringUtils-avxv7LF_.js";import"./SakLink-C5cMyy1Z.js";import"./PeriodeListe-DNRHsbG1.js";import"./IconBox-DuxDMq02.js";import"./Oppgaver-DsyLFek1.js";import"./OppgaveLenkepanel-CvfNpHwV.js";import"./KontaktOss-pM9mAiCN.js";const j=new k,It={title:"EttersendingPage",component:o,render:u=>t.jsx(c,{client:j,children:t.jsx(h,{initialEntries:[`/${s.ETTERSEND}/1`],children:t.jsx(E,{children:t.jsx(S,{element:t.jsx(o,{...u}),path:`/${s.ETTERSEND}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[g.post("/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:f.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},e={parameters:{msw:{handlers:[g.post("/rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:400}))]}},args:r.args};var p,n,a;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('/rest/storage/engangsstonad/vedlegg', () => new HttpResponse(null, {
        status: 200
      }))]
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
}`,...(a=(n=r.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};var i,m,l;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post('/rest/storage/engangsstonad/vedlegg', () => new HttpResponse(null, {
        status: 400
      }))]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(l=(m=e.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};const Pt=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{e as SkalFeileOpplasting,r as SkalIkkeFeileOpplasting,Pt as __namedExportsOrder,It as default};
