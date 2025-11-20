import{i as g,j as t}from"./iframe-BoK1MRrK.js";import{h as p,H as o}from"./index-BQK9m6PZ.js";import{A as i}from"./queries-BspbtbPw.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CgLe_9SB.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-CrGlDBvK.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-EO2fuV6Q.js";import"./useSelectedSak-DN02KmWL.js";import"./useQuery-D1vecscU.js";import"./sakerUtils-DWTceJRd.js";import"./Snarveier-iP676G-t.js";import"./LenkePanel-Cv9mHJaS.js";import"./index-IOaOjsO7.js";import"./Header-CyF_5Tzp.js";import"./LayoutWrapper-ssDwnBWy.js";import"./StatusTag-CXhFAVKy.js";import"./Tag-Dhuk1aDO.js";import"./Stroller-Q5Fx5-6N.js";import"./NoeGikkGalt-DE1NJyke.js";import"./skjemanummer-BKOp184m.js";import"./MinidialogSkjema-BDP4LxUP.js";import"./HarIkkeSaker-MiyLmRwn.js";import"./SøkelenkerPanel-CV7Zn_lU.js";import"./HarSaker-CYR13X27.js";import"./SakLink-C6u7CYf-.js";import"./guid-CsArkN6i.js";import"./ContentSection-BN1QzzYu.js";import"./BekreftelseSendtSøknad-BgKL13pD.js";import"./KontonummerInfo-tQ6U9YbT.js";import"./Accordion-CFUGSW8z.js";import"./Svangerskapspenger-5MZWZF_1.js";import"./DinPlan-CCZ7SR3I.js";import"./Oppgaver-BvHkG62J.js";import"./OppgaveLenkepanel-DBRuYeaY.js";import"./KontaktOss-B8Y_uCcD.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
