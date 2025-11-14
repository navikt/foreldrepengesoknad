import{i as g,j as t}from"./iframe-CbTDqBlf.js";import{h as p,H as o}from"./index-BvsERFFG.js";import{A as i}from"./queries-CsqrxBe6.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-sEAb9VOz.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-D9OMKjh_.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BLLxfquX.js";import"./useSelectedSak-R4p7MgoK.js";import"./useQuery-Ccv8EQOM.js";import"./sakerUtils-BnGtPbHJ.js";import"./Snarveier-CpTMRuj0.js";import"./LenkePanel-CO-cHjV4.js";import"./index-BbWOOXrk.js";import"./Header-CjN_1qkk.js";import"./LayoutWrapper-jmnUowy2.js";import"./StatusTag-D42oSauC.js";import"./Tag-u0wDn3Pc.js";import"./Stroller-BhZLmLoS.js";import"./NoeGikkGalt-BJqS48T3.js";import"./skjemanummer-CAscB7Nv.js";import"./MinidialogSkjema-CKh6dH-Q.js";import"./HarIkkeSaker-D0AKriSJ.js";import"./SøkelenkerPanel-CCOmJvgR.js";import"./HarSaker-DDPYXBgu.js";import"./SakLink-ryKHqpD1.js";import"./guid-CsArkN6i.js";import"./ContentSection-Bp4qcUnO.js";import"./BekreftelseSendtSøknad-Br6356jV.js";import"./KontonummerInfo-BPLsewGK.js";import"./Accordion-CeQzvl6Z.js";import"./Svangerskapspenger-BOHXYWq2.js";import"./DinPlan-BMhfU0Uj.js";import"./Oppgaver-DkifrAnZ.js";import"./OppgaveLenkepanel-CtNLnNJ_.js";import"./KontaktOss-Cf7cPS1G.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
