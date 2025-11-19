import{i as g,j as t}from"./iframe-CIQarI7J.js";import{h as p,H as o}from"./index-CC0zNVxf.js";import{A as i}from"./queries-ChzUFsNr.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DkAJxiP-.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-NBmkIGy0.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Bb8WicHc.js";import"./useSelectedSak-D_sdVVh-.js";import"./useQuery-BbLbm8eA.js";import"./sakerUtils-ChsAIfyl.js";import"./Snarveier-Db3AKH7u.js";import"./LenkePanel-AWSz6TSp.js";import"./index-DoO5Tyg4.js";import"./Header-E2Ter5VR.js";import"./LayoutWrapper-FtP3CYqT.js";import"./StatusTag-CSTWwVme.js";import"./Tag-Cm1gbYd_.js";import"./Stroller-DaqeL_4i.js";import"./NoeGikkGalt-RoG0fBo2.js";import"./skjemanummer-DXHVJImd.js";import"./MinidialogSkjema-BjFKPaeC.js";import"./HarIkkeSaker-BQ5eA1Xb.js";import"./SøkelenkerPanel-DZFW1oPA.js";import"./HarSaker-B5PZjXMS.js";import"./SakLink-BWraOubU.js";import"./guid-CsArkN6i.js";import"./ContentSection-BkEx4u7x.js";import"./BekreftelseSendtSøknad-BMuXqUn6.js";import"./KontonummerInfo-aW8T9pGG.js";import"./Accordion-BC4QOrlA.js";import"./Svangerskapspenger-DEq2wG_S.js";import"./DinPlan-DPxbXehP.js";import"./Oppgaver-p6QcM-Qa.js";import"./OppgaveLenkepanel-B_vtgCK8.js";import"./KontaktOss-BGCGcJtM.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
