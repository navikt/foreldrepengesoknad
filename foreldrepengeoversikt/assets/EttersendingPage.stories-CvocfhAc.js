import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{h as d,H as u}from"./index-D5WPyhm7.js";import{w as E}from"./withQueryClient-0RnYsr9w.js";import{O as o}from"./routes-C7yRzVAD.js";import{E as p}from"./ForeldrepengeoversiktRoutes-A5gB-gqC.js";import{M as S,R as h,a as R}from"./chunk-D4RADZKF-BhdFhvqI.js";import"./decorators-Bnaor6Ku.js";import"./QueryClientProvider-DTI5uWLr.js";import"./index-DQLiH3RP.js";import"./index-Ctu3BZYE.js";import"./UttaksplanKalender-DAlzO6Ez.js";import"./dates-efjv5HSM.js";import"./index-ClyUrrHr.js";import"./iframe-DUx3pzXc.js";import"./dateFormValidation-bO8eWKCv.js";import"./Label-DsXbSMDU.js";import"./useId-B0ho74s8.js";import"./links-DDVAVa71.js";import"./VStack-BrvoQt_9.js";import"./message-DohILNTk.js";import"./Alert-Dg8kz-yc.js";import"./Button-BX6Y31yB.js";import"./composeEventHandlers-DeH74NdU.js";import"./Link-CoGY-MyW.js";import"./File-C0UpYb2a.js";import"./UttaksdagenString-DRcuPL2E.js";import"./HGrid-DVOf_cSu.js";import"./HeartFill-NOI56RuP.js";import"./index-B8qOg7Wt.js";import"./index-CJPVTaBz.js";import"./stønadskontoType-l1GAnwlP.js";import"./_baseIsEqual-NirykxYQ.js";import"./stringUtils-DGs1tyYX.js";import"./ChevronDown-B3pJ6oOa.js";import"./Responsive-4HPfG4CC.js";import"./ArrowRight-8iuLDnM2.js";import"./index-CC-COn1g.js";import"./lodash-m1I54dwA.js";import"./Accordion-DV5VhMBM.js";import"./Checkmark-BGNs6_N9.js";import"./useBackgroundColor-Bwzxm5fu.js";import"./useSelectedSak-CTG7R_6C.js";import"./useQuery-Km81jHJP.js";import"./api-By2d6bGs.js";import"./sakerUtils-DmFzd43B.js";import"./Snarveier-DdMb_PAP.js";import"./LenkePanel-DHiG33fe.js";import"./Header-Cnu7SXRD.js";import"./LayoutWrapper-BwScqR5Y.js";import"./StatusTag-26AiPL8z.js";import"./Tag-DShot44a.js";import"./Stroller-Dr0d-tTj.js";import"./Dokument-Dj7GJ_34.js";import"./dokumenterUtils-DF5bl9zu.js";import"./GrupperteDokumenter-Cmw6Y2ob.js";import"./guid-CsArkN6i.js";import"./NoeGikkGalt-CjkMM43y.js";import"./MinidialogSkjema-wPAVMzpi.js";import"./List-8OReSfJu.js";import"./BekreftelseSendtSøknad-CmkWm8BC.js";import"./KontonummerInfo-DUiTr9tP.js";import"./HarIkkeSaker-KaeJ5jHb.js";import"./SøkelenkerPanel-DdFfBYPk.js";import"./HarSaker-CIhT4ufD.js";import"./SakLink-yi1MBDht.js";import"./ContentSection-0f-jDKfi.js";import"./Svangerskapspenger-gic0RnnO.js";import"./DinPlan-Cb2Qr4f5.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-CV2HUsvl.js";import"./OppgaveLenkepanel-4BUEgmxR.js";import"./KontaktOss-OGPWswN2.js";const Lt={title:"EttersendingPage",component:p,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return r.jsx(S,{initialEntries:[`/${o.ETTERSEND}/1${f}`],children:r.jsx(h,{children:r.jsx(R,{element:r.jsx(p,{...c}),path:`/${o.ETTERSEND}/:saksnummer`})})})}},t={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:t.args};var n,a,m;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
        ytelse: 'ENGANGSSTØNAD',
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
}`,...(m=(a=t.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};var i,l,g;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(g=(l=e.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};const Mt=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{e as SkalFeileOpplasting,t as SkalIkkeFeileOpplasting,Mt as __namedExportsOrder,Lt as default};
