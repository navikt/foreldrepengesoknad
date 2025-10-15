import{i as g,j as t}from"./iframe-V-4o2Cg9.js";import{h as p,H as o}from"./index-Bgu2Y1sX.js";import{A as m}from"./api-Cvuszg4G.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BrBx26y8.js";import{M as u,R as k,a as c}from"./chunk-TMI4QPZX-B7ZijZcf.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BGm46wQ8.js";import"./useSelectedSak-OaKpYvfc.js";import"./useQuery-Nx4rUoOy.js";import"./sakerUtils-CP9pjmaI.js";import"./Snarveier-DJOKdd_k.js";import"./LenkePanel-DVYJ97wP.js";import"./index-DfM3Uvj9.js";import"./Dokument-D09Oyioz.js";import"./dokumenterUtils-D6DPVjI8.js";import"./Tag-CiL-0OBn.js";import"./GrupperteDokumenter-C_59NnnH.js";import"./guid-CsArkN6i.js";import"./Accordion-BeDmwm3h.js";import"./Header-D1G7vTcI.js";import"./LayoutWrapper-C9NOLLLF.js";import"./StatusTag-vhlHd1fR.js";import"./Stroller-DUqUx0cx.js";import"./NoeGikkGalt-B6JT7OAH.js";import"./MinidialogSkjema-lZTf8njg.js";import"./skjemanummer-VcmdVIIG.js";import"./BekreftelseSendtSøknad-21VopryV.js";import"./KontonummerInfo-Bw-o0KoQ.js";import"./HarIkkeSaker-6K3MrErl.js";import"./SøkelenkerPanel-B-hZg0Yh.js";import"./HarSaker-DawTTg5L.js";import"./SakLink-Be4-JBXw.js";import"./ContentSection-DCFTWyDA.js";import"./Svangerskapspenger-mazf80KE.js";import"./DinPlan-BxDUvK0w.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-CXI1PZ_k.js";import"./OppgaveLenkepanel-WfL79Cjr.js";import"./KontaktOss-CaIrSYCD.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:i=>{const{skjematypeQueryParamValue:s,...l}=i,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(c,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
