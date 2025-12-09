import{k as g,j as t}from"./iframe-k34ZSSH_.js";import{h as p,H as o}from"./index-OIDdORyR.js";import{A as i}from"./queries-BfEx2ftv.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CO1Uf1aS.js";import{M as u,R as k,a as S}from"./chunk-4WY6JWTD-B_kQtwHL.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-BAYv_Zvh.js";import"./useSelectedSak-Bni6zimm.js";import"./useQuery-DplBe41O.js";import"./sakerUtils-BafhBHaJ.js";import"./Snarveier-DcnQgQ44.js";import"./LenkePanel-D-aU28DB.js";import"./index-BQ1dMjtB.js";import"./Header-CNjSrLjw.js";import"./LayoutWrapper-I3-XJW0f.js";import"./StatusTag-DltU_M_t.js";import"./Tag-BwmpwM3E.js";import"./Stroller-CXkzh2G0.js";import"./NoeGikkGalt-o4DBfk_m.js";import"./skjemanummer-CkduDKHo.js";import"./MinidialogSkjema-T5NNWxe0.js";import"./HarIkkeSaker-D2nppq-Y.js";import"./SøkelenkerPanel-npfC3urD.js";import"./HarSaker-C0dsiyW5.js";import"./SakLink-jKcmL4D-.js";import"./guid-CsArkN6i.js";import"./ContentSection-Bs__6Nmk.js";import"./BekreftelseSendtSøknad-CXW063Uc.js";import"./KontonummerInfo-CdNryFuQ.js";import"./Accordion-C9cPnMgD.js";import"./Svangerskapspenger-Blne8z8O.js";import"./DinPlan-KhprAU9x.js";import"./Oppgaver-BQCmLp4R.js";import"./OppgaveLenkepanel-T0LPpBXJ.js";import"./KontaktOss-D8txfuKh.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.lastOppESVedlegg, () => {
        return new HttpResponse(JSON.stringify('test-uuid'), {
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
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.lastOppESVedlegg, () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...r.parameters?.docs?.source}}};const Z=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,Z as __namedExportsOrder,Y as default};
