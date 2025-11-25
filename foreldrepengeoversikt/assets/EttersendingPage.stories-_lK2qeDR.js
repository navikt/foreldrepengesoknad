import{i as g,j as t}from"./iframe-BeW5ADCm.js";import{h as p,H as o}from"./index-BUOfnOkT.js";import{A as i}from"./queries-BH4KLwBi.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Byd01xRO.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-Dk_UqrSs.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BugMtMUr.js";import"./useSelectedSak-CiJ-2Xpm.js";import"./useQuery-CPalgW4U.js";import"./sakerUtils-BkrYbWU7.js";import"./Snarveier-CCdNdP21.js";import"./LenkePanel-Bc1Xu7Vi.js";import"./index-B0snz123.js";import"./Header-D1suKacR.js";import"./LayoutWrapper-D8vRJCuG.js";import"./StatusTag-wwfugI4c.js";import"./Tag-w-7DVBGA.js";import"./Stroller-8tv-l7GK.js";import"./NoeGikkGalt-CyQtQoXX.js";import"./skjemanummer-Df-TI4XS.js";import"./MinidialogSkjema-DX9Mv1sb.js";import"./HarIkkeSaker-DojZ7Ae-.js";import"./SøkelenkerPanel-D6wvV6fQ.js";import"./HarSaker-CGRkxmj3.js";import"./SakLink-ZW8jgwtB.js";import"./guid-CsArkN6i.js";import"./ContentSection-DHuHoKID.js";import"./BekreftelseSendtSøknad-BPul81Y5.js";import"./KontonummerInfo-4knc8qtG.js";import"./Accordion-lMd_lbf_.js";import"./Svangerskapspenger-oYea9znC.js";import"./DinPlan-DaqsQYRA.js";import"./Oppgaver-B7iWmwSu.js";import"./OppgaveLenkepanel-T5_l8i2O.js";import"./KontaktOss-DwDz0YUy.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
