import{i as g,j as t}from"./iframe-DSm6znYd.js";import{h as p,H as o}from"./index-CE7R-MEv.js";import{A as m}from"./api-BNoIXsAO.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CWMTIZOw.js";import{M as u,R as k,a as c}from"./chunk-TMI4QPZX-BjQiO9Vz.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-VVYwzvSd.js";import"./useSelectedSak-DtZI3R2t.js";import"./useQuery-D6T5a7HA.js";import"./sakerUtils-BbLHnYpB.js";import"./Snarveier-CMtOuWag.js";import"./LenkePanel-CcE-5dPp.js";import"./index-qhpkUMQU.js";import"./Dokument-KZm87LsY.js";import"./dokumenterUtils-C4OI9AHp.js";import"./Tag-uHakcTiP.js";import"./GrupperteDokumenter-C6cik4gk.js";import"./guid-CsArkN6i.js";import"./Accordion-Bs0fjVlC.js";import"./Header-C0Zy1i7J.js";import"./LayoutWrapper-DeY1b_F8.js";import"./StatusTag-CEsf3pfW.js";import"./Stroller-EMAWWr_b.js";import"./NoeGikkGalt-Cl3aFI9D.js";import"./MinidialogSkjema-CbPHbRzT.js";import"./skjemanummer-X-ycZIkR.js";import"./BekreftelseSendtSøknad-BYOxB8RY.js";import"./KontonummerInfo-BCsOjyYU.js";import"./HarIkkeSaker-67qplSlx.js";import"./SøkelenkerPanel-DNX50hZN.js";import"./HarSaker-BUkFNovs.js";import"./SakLink-qPYHTY4U.js";import"./ContentSection-DHzcBPaP.js";import"./Svangerskapspenger-Dsjm2ItH.js";import"./DinPlan-CgW4D_2e.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-t1SfDkp0.js";import"./OppgaveLenkepanel-Cl9DxxZ0.js";import"./KontaktOss-BZ9YjCYo.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:i=>{const{skjematypeQueryParamValue:s,...l}=i,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(c,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.lastOppESVedlegg, () => {
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
}`,...r.parameters?.docs?.source}}};const se=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,se as __namedExportsOrder,re as default};
