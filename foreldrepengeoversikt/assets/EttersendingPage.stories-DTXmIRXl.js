import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{h as d,H as u}from"./index-D5WPyhm7.js";import{w as E}from"./withQueryClient-0RnYsr9w.js";import{O as o}from"./routes-C7yRzVAD.js";import{E as p}from"./ForeldrepengeoversiktRoutes-DNaNZXYs.js";import{M as S,R as h,a as R}from"./chunk-D4RADZKF-BhdFhvqI.js";import"./decorators-Bnaor6Ku.js";import"./QueryClientProvider-DTI5uWLr.js";import"./index-DQLiH3RP.js";import"./index-Ctu3BZYE.js";import"./UttaksplanKalender-BM8K_63j.js";import"./dates-efjv5HSM.js";import"./index-ClyUrrHr.js";import"./iframe-D9JWcwB1.js";import"./dateFormValidation-uVpLpohg.js";import"./Label-DalfrUzn.js";import"./useId-B11Gq5wf.js";import"./links-DDVAVa71.js";import"./VStack-C9FgvL9l.js";import"./message-DohILNTk.js";import"./Alert-CUjC6X8h.js";import"./Button-D10r1vdM.js";import"./composeEventHandlers-DeH74NdU.js";import"./useId-B7OrP95z.js";import"./Link-DV9K7ZBg.js";import"./File-Do6CElhQ.js";import"./UttaksdagenString-DRcuPL2E.js";import"./HGrid-DUtYApPK.js";import"./HeartFill-DIEwTxty.js";import"./index-B8qOg7Wt.js";import"./index-CJPVTaBz.js";import"./stønadskontoType-l1GAnwlP.js";import"./_baseIsEqual-NirykxYQ.js";import"./stringUtils-DGs1tyYX.js";import"./ChevronDown-w7HrHItv.js";import"./Responsive-CFBBoqxs.js";import"./ArrowRight-DYaJDYv5.js";import"./index-CC-COn1g.js";import"./lodash-DhqVAF6S.js";import"./Accordion-C2gXj9Z6.js";import"./Checkmark-BSY2UjC4.js";import"./useBackgroundColor-Bwzxm5fu.js";import"./useSelectedSak-CTG7R_6C.js";import"./useQuery-Km81jHJP.js";import"./api-By2d6bGs.js";import"./sakerUtils-DmFzd43B.js";import"./Snarveier-CwAh8MPm.js";import"./LenkePanel-CaDWDad0.js";import"./Dokument-C2_xSpjg.js";import"./dokumenterUtils-DF5bl9zu.js";import"./Tag-Dd-fDI1y.js";import"./GrupperteDokumenter-C8R9oOQz.js";import"./guid-CsArkN6i.js";import"./Header-BEhNrFLY.js";import"./LayoutWrapper-BwScqR5Y.js";import"./StatusTag-yuqxQc4z.js";import"./Stroller-T_HvrZ6Y.js";import"./NoeGikkGalt-CSD_SJA5.js";import"./MinidialogSkjema-ilcJ_6nl.js";import"./List-whWw6Hq_.js";import"./BekreftelseSendtSøknad-DCnQChV3.js";import"./KontonummerInfo-ByVknSd1.js";import"./HarIkkeSaker-CI9jlmtm.js";import"./SøkelenkerPanel-e8yJ_mAT.js";import"./HarSaker-B0qi5TiI.js";import"./SakLink-CX7ZXtbm.js";import"./ContentSection-By9cnGfZ.js";import"./Svangerskapspenger-D4n7mOP6.js";import"./DinPlan-sXd5Vs2d.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-JsBDY0vA.js";import"./OppgaveLenkepanel-CsqIMeEG.js";import"./KontaktOss-By16tyPa.js";const Mt={title:"EttersendingPage",component:p,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return r.jsx(S,{initialEntries:[`/${o.ETTERSEND}/1${f}`],children:r.jsx(h,{children:r.jsx(R,{element:r.jsx(p,{...c}),path:`/${o.ETTERSEND}/:saksnummer`})})})}},t={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:t.args};var n,a,m;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
}`,...(g=(l=e.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};const Qt=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{e as SkalFeileOpplasting,t as SkalIkkeFeileOpplasting,Qt as __namedExportsOrder,Mt as default};
