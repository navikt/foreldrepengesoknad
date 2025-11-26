import{i as g,j as t}from"./iframe-CXnxpi-s.js";import{h as p,H as o}from"./index-DuldnQGz.js";import{A as i}from"./queries-nInlzUs2.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Cq1Ob8Ut.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-SSzhRsX7.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor--1aTsCar.js";import"./useSelectedSak-Do5X84P_.js";import"./useQuery-BwulElXk.js";import"./sakerUtils-DRVRj9ZG.js";import"./Snarveier-DnDdKfbF.js";import"./LenkePanel-bllN4YOu.js";import"./index-CTuxbr8K.js";import"./Header-HO6EGw0a.js";import"./LayoutWrapper-CaLgSl2c.js";import"./StatusTag-DUXSFUWx.js";import"./Tag-Cn7fgjP2.js";import"./Stroller-CylesC3K.js";import"./NoeGikkGalt-Ds_0ImZM.js";import"./skjemanummer-CjTdwl0D.js";import"./MinidialogSkjema-D142xtyG.js";import"./HarIkkeSaker-DM0OswsU.js";import"./SøkelenkerPanel-BaVNMe_P.js";import"./HarSaker-C8J3mt1J.js";import"./SakLink-BvYOoML8.js";import"./guid-CsArkN6i.js";import"./ContentSection-Cw82Mkuy.js";import"./BekreftelseSendtSøknad-CLHKK-VP.js";import"./KontonummerInfo-DVUj28Yb.js";import"./Accordion-Bxf9YL7v.js";import"./Svangerskapspenger-BsDJUhjC.js";import"./DinPlan-DleP24B3.js";import"./Oppgaver-D7Rw_PqD.js";import"./OppgaveLenkepanel-mZLVkLlg.js";import"./KontaktOss-RQvnb_Ld.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
