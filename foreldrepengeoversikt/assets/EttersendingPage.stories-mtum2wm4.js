import{i as g,j as t}from"./iframe-B-Aegudx.js";import{h as p,H as o}from"./index-q8AYWPvw.js";import{A as i}from"./api-BV7JOcPn.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BX3P2hBj.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-rrOHIuv0.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BVRi2iWZ.js";import"./useSelectedSak-gDQR3GUX.js";import"./useQuery-Ccg11EAh.js";import"./sakerUtils-C5arsvhr.js";import"./Snarveier-BBARWLkJ.js";import"./LenkePanel-DGpcbq_P.js";import"./index-qIS9kLJc.js";import"./Header-DSKzmz9-.js";import"./LayoutWrapper-BaE3JSuo.js";import"./StatusTag-CqH0Z3V6.js";import"./Tag-DEDQjda-.js";import"./Stroller-BG0DJHpr.js";import"./NoeGikkGalt-wb3rKMuB.js";import"./MinidialogSkjema-2DCf6FFT.js";import"./skjemanummer-DHIChXHm.js";import"./HarIkkeSaker-DIVeYzlp.js";import"./SøkelenkerPanel-Csf02oJ7.js";import"./HarSaker-BHESq-6-.js";import"./SakLink-BpTsf3Eh.js";import"./guid-CsArkN6i.js";import"./ContentSection-D7lkaMCM.js";import"./BekreftelseSendtSøknad-Dq0wxxH6.js";import"./KontonummerInfo-CkpgD6nq.js";import"./Accordion-DaGWNwJJ.js";import"./Svangerskapspenger-B-sWHFnR.js";import"./DinPlan-BWIBKKdJ.js";import"./Oppgaver-C3DwTHRS.js";import"./OppgaveLenkepanel-Cw8ibPu9.js";import"./KontaktOss-DJgDaibT.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
