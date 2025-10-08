import{i as g,j as t}from"./iframe-BGOG44DK.js";import{h as p,H as o}from"./index-B4Zy9ehy.js";import{A as m}from"./api-CnpsdBLC.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CwDnOYXa.js";import{M as u,R as k,a as c}from"./chunk-TMI4QPZX-QwzuWtG2.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BifAu8VF.js";import"./useSelectedSak-CCMmAbnx.js";import"./useQuery-DT5RNUV5.js";import"./sakerUtils-DK21Rf3m.js";import"./Snarveier-CEI87XI_.js";import"./LenkePanel-Di4qeYeX.js";import"./index-D28VsQrH.js";import"./Dokument-CxVxFRKr.js";import"./dokumenterUtils-BidHPh0H.js";import"./Tag-C68Ae1Iw.js";import"./GrupperteDokumenter-u1UxH7B6.js";import"./guid-CsArkN6i.js";import"./Accordion-T2WuaQdM.js";import"./Header-BBAbsDgm.js";import"./LayoutWrapper-C63bbq19.js";import"./StatusTag-DYtpwxFh.js";import"./Stroller-BJyaYKJ8.js";import"./NoeGikkGalt-BA43qCks.js";import"./MinidialogSkjema-BNydc6-4.js";import"./skjemanummer-7iJeax4r.js";import"./BekreftelseSendtSøknad-DIsN4R13.js";import"./KontonummerInfo-CYE4uGvD.js";import"./HarIkkeSaker-BpHRxS4X.js";import"./SøkelenkerPanel-SL3qVlsq.js";import"./HarSaker-B-ktagMa.js";import"./SakLink-BZizAoAU.js";import"./ContentSection-RFVCnIcd.js";import"./Svangerskapspenger-CrLk9Oqd.js";import"./DinPlan-BPzKKye2.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-Cs3AcBdD.js";import"./OppgaveLenkepanel-CchuefCj.js";import"./KontaktOss-C-AsUdZv.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:i=>{const{skjematypeQueryParamValue:s,...l}=i,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(c,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
