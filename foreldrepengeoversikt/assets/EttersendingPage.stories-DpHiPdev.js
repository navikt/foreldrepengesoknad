import{i as g,j as t}from"./iframe-C5M49xUj.js";import{h as p,H as o}from"./index-C-tyoeRs.js";import{A as m}from"./api-BlqjErwO.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BJ6-qazB.js";import{M as u,R as k,a as c}from"./chunk-TMI4QPZX-Bhac6TTk.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Bcx3LNaq.js";import"./useSelectedSak-2CJ8pi8O.js";import"./useQuery-Ceota3XY.js";import"./sakerUtils-Cow9o5x9.js";import"./Snarveier-fTBfHXkH.js";import"./LenkePanel-B-GMYuoR.js";import"./index-njvkGPnH.js";import"./Dokument-DtSm8dfR.js";import"./dokumenterUtils-BZh7bZJC.js";import"./Tag-CFTDFgrv.js";import"./GrupperteDokumenter-BQ8IE6CW.js";import"./guid-CsArkN6i.js";import"./Accordion-D5V5aYUy.js";import"./Header-q2wyfDfm.js";import"./LayoutWrapper-CgznHMtZ.js";import"./StatusTag-CebUWDl7.js";import"./Stroller-BIeDnU_P.js";import"./NoeGikkGalt-CAx2QjVw.js";import"./MinidialogSkjema-CBskjKa1.js";import"./skjemanummer-ByQiREqC.js";import"./BekreftelseSendtSøknad-DWW3Bm_6.js";import"./KontonummerInfo-BZl70WoX.js";import"./HarIkkeSaker-VBjgm5i0.js";import"./SøkelenkerPanel-Cyiv6413.js";import"./HarSaker-DX2dyX0I.js";import"./SakLink-Co8omuyk.js";import"./ContentSection-BUlExFVN.js";import"./Svangerskapspenger-DyvUUhEh.js";import"./DinPlan-CkTqt2Qk.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-BmVWIpTQ.js";import"./OppgaveLenkepanel-DJJ5_q0x.js";import"./KontaktOss-tGewoNjl.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:i=>{const{skjematypeQueryParamValue:s,...l}=i,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(c,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
