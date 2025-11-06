import{i as g,j as t}from"./iframe-Dy2Fqd_h.js";import{h as p,H as o}from"./index-DMaHRq-2.js";import{A as i}from"./api-CXFNNB9C.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CaFt_lkv.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-Dg75gKp9.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BwIXUT1x.js";import"./useSelectedSak-CukCIQdg.js";import"./useQuery-RtsBLjDi.js";import"./sakerUtils-BZ1qPCGG.js";import"./Snarveier-BG81QrlW.js";import"./LenkePanel-CHqol1MW.js";import"./index-EKr5N8F0.js";import"./Header-Bs5On6cE.js";import"./LayoutWrapper-B_owzmLn.js";import"./StatusTag-CK0QAEUQ.js";import"./Tag-BvM878dY.js";import"./Stroller-iZqeX3Ty.js";import"./NoeGikkGalt-CSY5pfEl.js";import"./MinidialogSkjema-DLZLF4gO.js";import"./skjemanummer-nR7MbD8-.js";import"./HarIkkeSaker-cjixziKi.js";import"./SøkelenkerPanel-BkBL29hy.js";import"./HarSaker-CK9gr8KF.js";import"./SakLink-CwsaD2-0.js";import"./guid-CsArkN6i.js";import"./ContentSection-BxHzv-xo.js";import"./BekreftelseSendtSøknad-BGbSS1PV.js";import"./KontonummerInfo-jVMoPtbF.js";import"./Accordion-CR6w0wBH.js";import"./Svangerskapspenger-CBEYSbRh.js";import"./DinPlan-CCZrT5EA.js";import"./Oppgaver-DBi3aksB.js";import"./OppgaveLenkepanel-BT-2g1RM.js";import"./KontaktOss-BBN947-1.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
