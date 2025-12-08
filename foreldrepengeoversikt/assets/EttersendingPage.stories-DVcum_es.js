import{k as g,j as t}from"./iframe-CAFtFtH3.js";import{h as p,H as o}from"./index-3RRfzTN1.js";import{A as i}from"./queries-BtvzQ__X.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-C0SuN3Fg.js";import{M as u,R as k,a as S}from"./chunk-4WY6JWTD-BnKzx56x.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-q6LqwJG6.js";import"./useSelectedSak-BEkyA7SN.js";import"./useQuery-BnCTi0S7.js";import"./sakerUtils-D6cEUjg8.js";import"./Snarveier-Du4FpyEI.js";import"./LenkePanel-DiLxD47I.js";import"./index-DSQ-7ns7.js";import"./Header-_tcM48F9.js";import"./LayoutWrapper-G8Vpim3v.js";import"./StatusTag-d9B12mJ6.js";import"./Tag-CVr_eitu.js";import"./Stroller-CUBseuL0.js";import"./NoeGikkGalt-C3rFc83L.js";import"./skjemanummer-Dblhegiz.js";import"./MinidialogSkjema-D9vkKfks.js";import"./HarIkkeSaker-BnY6WyYi.js";import"./SøkelenkerPanel-BoLVbjdh.js";import"./HarSaker-DTx_P_8b.js";import"./SakLink-hWIUgZcw.js";import"./guid-CsArkN6i.js";import"./ContentSection-B9WTLn4O.js";import"./BekreftelseSendtSøknad-C7TWyHJh.js";import"./KontonummerInfo-CWyjnNgG.js";import"./Accordion-CYhliiVf.js";import"./Svangerskapspenger-DqXLRbLx.js";import"./DinPlan-DabiPl-R.js";import"./Oppgaver-BP6lQzCd.js";import"./OppgaveLenkepanel-B_aO-tof.js";import"./KontaktOss-15IHFuXh.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
