import{k as g,j as t}from"./iframe-D4ZRvRZm.js";import{h as p,H as o}from"./index-DoOEpirF.js";import{A as i}from"./queries-BDTvf_DD.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Wu2NMRXp.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-Nk9_1oaD.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-BtWh0dT_.js";import"./useSelectedSak-l6KvJKBE.js";import"./useQuery-BkeLPUzO.js";import"./sakerUtils-BRqXJ2Wu.js";import"./Snarveier-CfPTA1XK.js";import"./LenkePanel-C5-hQyW8.js";import"./index-CwgF17RF.js";import"./Header-B_Ug1AI3.js";import"./LayoutWrapper-w1kQTQMM.js";import"./StatusTag-DV3T5GvE.js";import"./Tag-Fxyy65H3.js";import"./Stroller-DaBxZUpC.js";import"./NoeGikkGalt-CCvhBpgV.js";import"./skjemanummer-BcF04kXj.js";import"./MinidialogSkjema-xCRlUImz.js";import"./HarIkkeSaker-I8WntoPe.js";import"./SøkelenkerPanel-w6yxwyUl.js";import"./HarSaker-Dt3ppvRl.js";import"./SakLink-aenGUUEd.js";import"./guid-CsArkN6i.js";import"./ContentSection-Cz93Z5ZI.js";import"./BekreftelseSendtSøknad-C9fhXA7g.js";import"./KontonummerInfo-C-D-2BIC.js";import"./Accordion-D34Wddr3.js";import"./Svangerskapspenger-CDcBMGFX.js";import"./DinPlan-BoW-ERS3.js";import"./Oppgaver-ixsLVEH3.js";import"./OppgaveLenkepanel-UNYdVd8q.js";import"./KontaktOss-X46L8eZa.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
