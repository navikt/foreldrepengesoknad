import{i as g,j as t}from"./iframe-B2QfhU35.js";import{h as p,H as o}from"./index-BMg_VacC.js";import{A as m}from"./api-DY18HtkF.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-YfWp35oc.js";import{M as u,R as k,a as c}from"./chunk-TMI4QPZX-DaqAfUTH.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BjcOwYQ2.js";import"./useSelectedSak-DfjwsZIH.js";import"./useQuery-C7YUdgqo.js";import"./sakerUtils-ByEEJ9vz.js";import"./Snarveier-Bnl-tzC9.js";import"./LenkePanel-D4t5Fw41.js";import"./index-CHYev5bZ.js";import"./Dokument-Bo4OuEz3.js";import"./dokumenterUtils-D6ILJdE8.js";import"./Tag-3FISuw0K.js";import"./GrupperteDokumenter-5f8oBt1I.js";import"./guid-CsArkN6i.js";import"./Accordion-D0rdbQeN.js";import"./Header-ncdbTDd0.js";import"./LayoutWrapper-CRewOcPE.js";import"./StatusTag-D-UWmdJU.js";import"./Stroller-BH7hrEhz.js";import"./NoeGikkGalt-bJq3HU_-.js";import"./MinidialogSkjema-BphwbwTj.js";import"./skjemanummer-D67JiCRY.js";import"./BekreftelseSendtSøknad-CKXFSBvV.js";import"./KontonummerInfo-CU4btauK.js";import"./HarIkkeSaker-Cf1Rh1Cj.js";import"./SøkelenkerPanel-UODvPAzA.js";import"./HarSaker-pZuBDQEk.js";import"./SakLink-CXJVEJqv.js";import"./ContentSection-DyhXRfqX.js";import"./Svangerskapspenger-DVNskmdN.js";import"./DinPlan-CgguCwU8.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-CwXj18Rb.js";import"./OppgaveLenkepanel-DYN3KM8w.js";import"./KontaktOss-rjRMCBeD.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:i=>{const{skjematypeQueryParamValue:s,...l}=i,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(c,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
