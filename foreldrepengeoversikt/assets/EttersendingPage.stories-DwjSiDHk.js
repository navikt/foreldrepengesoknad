import{k as g,j as t}from"./iframe-D-IIqIcL.js";import{h as p,H as o}from"./index-zOoilbs6.js";import{A as i}from"./queries-Cajj6Nwa.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CoIljVVu.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-DF4FCatt.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-D0RAA2Q1.js";import"./useSelectedSak-mX996YQ-.js";import"./useQuery-Djwu3wOy.js";import"./sakerUtils-CkKz6-Ms.js";import"./Snarveier-UM3GHpe5.js";import"./LenkePanel-w8hJgSVZ.js";import"./index-BUxBNmh0.js";import"./Header-Dx693UYN.js";import"./LayoutWrapper-NXycDWKa.js";import"./StatusTag-B02maUxk.js";import"./Tag-BOhEG5f2.js";import"./Stroller-CALRoYGx.js";import"./NoeGikkGalt-DOHDta-p.js";import"./skjemanummer-KYKTI_Kk.js";import"./MinidialogSkjema-BjOnkRvg.js";import"./HarIkkeSaker-CysCHiQX.js";import"./SøkelenkerPanel-BOIKPaYu.js";import"./HarSaker-BrRX4OAV.js";import"./SakLink-BueVoxBs.js";import"./guid-CsArkN6i.js";import"./ContentSection-NOVaN-hN.js";import"./BekreftelseSendtSøknad-Bw1CupYr.js";import"./KontonummerInfo-COHc5cq1.js";import"./Accordion-CLP-eGnU.js";import"./Svangerskapspenger-C2cVa929.js";import"./DinPlan-D-XVMSi7.js";import"./Oppgaver-E98E2J3a.js";import"./OppgaveLenkepanel-Cj7sAeuP.js";import"./KontaktOss-fhXoQaD6.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
