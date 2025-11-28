import{k as g,j as t}from"./iframe-Cq2SBpjl.js";import{h as p,H as o}from"./index-DOESNTha.js";import{A as i}from"./queries-CGZgXRGp.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BS9hO9fR.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-C1Dn-R-F.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-C_YCa6dU.js";import"./useSelectedSak-Dc890CcV.js";import"./useQuery-D4gFPHbO.js";import"./sakerUtils-CQckKjIx.js";import"./Snarveier-Cfn4Q3q1.js";import"./LenkePanel-DcseBGCA.js";import"./index-B2piYrRl.js";import"./Header-CxbO2wDE.js";import"./LayoutWrapper-Dt4MjEst.js";import"./StatusTag-8dWHwFOq.js";import"./Tag-CBf3Gvbh.js";import"./Stroller-B1pMwmXf.js";import"./NoeGikkGalt-B9GGl2Bi.js";import"./skjemanummer-Dj6Sl7UH.js";import"./MinidialogSkjema-C3cIMcVQ.js";import"./HarIkkeSaker-YR2lSCOA.js";import"./SøkelenkerPanel-D9JBG-YG.js";import"./HarSaker-C1eNVe_9.js";import"./SakLink-7g9oXo2-.js";import"./guid-CsArkN6i.js";import"./ContentSection-BbQhh-Fs.js";import"./BekreftelseSendtSøknad-3OBcVtz8.js";import"./KontonummerInfo-Bv161f0v.js";import"./Accordion-0qg0wD1F.js";import"./Svangerskapspenger-CUdAPZM4.js";import"./DinPlan-Dmvx7F7q.js";import"./Oppgaver-BM8OdNVZ.js";import"./OppgaveLenkepanel-Ds6QZP9c.js";import"./KontaktOss-Di9Kilqr.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
