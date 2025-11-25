import{i as g,j as t}from"./iframe-DEikezB8.js";import{h as p,H as o}from"./index-s2IJkxJA.js";import{A as i}from"./queries-Ba4s7_HK.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DjbF3Cze.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-DcV7Iagz.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BMo0wvJ5.js";import"./useSelectedSak-C-rn41oL.js";import"./useQuery-DUJ59zTu.js";import"./sakerUtils-CWXAfiNK.js";import"./Snarveier-CxWY8_ry.js";import"./LenkePanel-DW53ytRN.js";import"./index-BQREIWzL.js";import"./Header-D5nLLZ91.js";import"./LayoutWrapper-B3tHmXFZ.js";import"./StatusTag-D6PR44ot.js";import"./Tag-LoPxS0gO.js";import"./Stroller-Bu86v3HI.js";import"./NoeGikkGalt-DxUJTScn.js";import"./skjemanummer-BXoilV0j.js";import"./MinidialogSkjema-dlH2fhvG.js";import"./HarIkkeSaker-BWOHtR0y.js";import"./SøkelenkerPanel-BtADNI-t.js";import"./HarSaker-x4XAY4Oo.js";import"./SakLink-DH2Bw2bC.js";import"./guid-CsArkN6i.js";import"./ContentSection-Br_T7T9f.js";import"./BekreftelseSendtSøknad-D9kXiavq.js";import"./KontonummerInfo-Dk5aKoDk.js";import"./Accordion-C8Ecfeiq.js";import"./Svangerskapspenger-BemJlQ_5.js";import"./DinPlan-Bv3Ee6eR.js";import"./Oppgaver-DwVoXk37.js";import"./OppgaveLenkepanel-CLSSq0XW.js";import"./KontaktOss-BfzrfNfr.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
