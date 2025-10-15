import{i as g,j as t}from"./iframe-IPxy5AoO.js";import{h as p,H as o}from"./index-IEsEscZs.js";import{A as m}from"./api-Kzd94Isr.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CjsSPvR7.js";import{M as u,R as k,a as c}from"./chunk-TMI4QPZX-DUFL0ilV.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-FOpKJ8pQ.js";import"./useSelectedSak-CNz4Ug0g.js";import"./useQuery-DhBHTHVx.js";import"./sakerUtils-DeaY7r1u.js";import"./Snarveier-B9YlyHDp.js";import"./LenkePanel-BzCAW-AJ.js";import"./index-ev3G2xyA.js";import"./Dokument-CAO-GVg5.js";import"./dokumenterUtils-kKISzPh_.js";import"./Tag-BYDeYgMT.js";import"./GrupperteDokumenter-B8lpRcJ2.js";import"./guid-CsArkN6i.js";import"./Accordion-D27t2pT-.js";import"./Header-DgXHGPpF.js";import"./LayoutWrapper-Cq9cxWbL.js";import"./StatusTag-DtSmjKfw.js";import"./Stroller-DQOeFjYI.js";import"./NoeGikkGalt-DAQuMxd-.js";import"./MinidialogSkjema-BMUIoxEZ.js";import"./skjemanummer-B8UDZKZC.js";import"./BekreftelseSendtSøknad-DlnHKnDx.js";import"./KontonummerInfo-oDM86Cb-.js";import"./HarIkkeSaker-5qIU1556.js";import"./SøkelenkerPanel-CLeF-Pb_.js";import"./HarSaker-DtDVvaHR.js";import"./SakLink-CYORaTBM.js";import"./ContentSection-D4VAwH4L.js";import"./Svangerskapspenger-DAah62lP.js";import"./DinPlan-BSk2jnee.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-CYQXnUKs.js";import"./OppgaveLenkepanel-BZGVrEqJ.js";import"./KontaktOss-Dg-ngFe4.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:i=>{const{skjematypeQueryParamValue:s,...l}=i,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(c,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
