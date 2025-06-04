import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{h as d,H as u}from"./index-D5WPyhm7.js";import{w as E}from"./withQueryClient-B3ZyOuTZ.js";import{O as o}from"./routes-C7yRzVAD.js";import{E as p}from"./ForeldrepengeoversiktRoutes-lyvdvRF6.js";import{M as S,R as h,a as R}from"./chunk-D4RADZKF-BhdFhvqI.js";import"./decorators-Bnaor6Ku.js";import"./index-DIIcF78r.js";import"./index-DQLiH3RP.js";import"./UttaksplanKalender-DX27DpXk.js";import"./dates-efjv5HSM.js";import"./index-ClyUrrHr.js";import"./iframe-MSebbM_D.js";import"./dateFormValidation-C-xB1Xv-.js";import"./Label-DalfrUzn.js";import"./useId-B11Gq5wf.js";import"./links-CxU1E266.js";import"./VStack-C9FgvL9l.js";import"./message-DohILNTk.js";import"./Alert-CUjC6X8h.js";import"./Button-D10r1vdM.js";import"./composeEventHandlers-DeH74NdU.js";import"./useId-B7OrP95z.js";import"./Link-DV9K7ZBg.js";import"./File-Do6CElhQ.js";import"./UttaksdagenString-DipQCgGo.js";import"./HGrid-DUtYApPK.js";import"./HeartFill-DIEwTxty.js";import"./index-B8qOg7Wt.js";import"./index-CJPVTaBz.js";import"./stønadskontoType-l1GAnwlP.js";import"./_baseIsEqual-NirykxYQ.js";import"./stringUtils-DGs1tyYX.js";import"./minMax-iJPfboRp.js";import"./ChevronDown-w7HrHItv.js";import"./Responsive-CFBBoqxs.js";import"./ArrowRight-DYaJDYv5.js";import"./index-CC-COn1g.js";import"./lodash-DhqVAF6S.js";import"./Accordion-C2gXj9Z6.js";import"./useBackgroundColor-Bwzxm5fu.js";import"./useSelectedSak-Hsh9yDiu.js";import"./useQuery-CkpvBZiO.js";import"./api-CwRbU3cx.js";import"./sakerUtils-B-XSHxgi.js";import"./Snarveier-RfGsrOu4.js";import"./LenkePanel-CaDWDad0.js";import"./Dokument-CRdupPu3.js";import"./dokumenterUtils-BRVIK3Iv.js";import"./Tag-Dd-fDI1y.js";import"./GrupperteDokumenter-BRfkwHvv.js";import"./guid-CsArkN6i.js";import"./Header-CxYdrDUW.js";import"./LayoutWrapper-BwScqR5Y.js";import"./StatusTag-yuqxQc4z.js";import"./Stroller-T_HvrZ6Y.js";import"./NoeGikkGalt-CSD_SJA5.js";import"./MinidialogSkjema-C4Y6FATo.js";import"./List-whWw6Hq_.js";import"./BekreftelseSendtSøknad-Bo3OaYc8.js";import"./KontonummerInfo-CIesi5MU.js";import"./HarIkkeSaker-DKmdAz0y.js";import"./SøkelenkerPanel-BLcgvB1v.js";import"./HarSaker-DGoqyT5G.js";import"./SakLink-DNkaIWNQ.js";import"./ContentSection-By9cnGfZ.js";import"./Svangerskapspenger-BeqSOh9h.js";import"./DinPlan-Bnaabxsi.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-Db0TLXDK.js";import"./OppgaveLenkepanel-CUMPREbU.js";import"./KontaktOss-By16tyPa.js";const Lt={title:"EttersendingPage",component:p,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return r.jsx(S,{initialEntries:[`/${o.ETTERSEND}/1${f}`],children:r.jsx(h,{children:r.jsx(R,{element:r.jsx(p,{...c}),path:`/${o.ETTERSEND}/:saksnummer`})})})}},t={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:t.args};var n,a,m;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
