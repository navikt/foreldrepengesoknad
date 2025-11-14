import{i as g,j as t}from"./iframe-wtC6Pp_y.js";import{h as p,H as o}from"./index-DwEmd73G.js";import{A as i}from"./queries-6xL3CkCc.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CvgOuWFm.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BPAY_m8Z.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-CA9Z3ZVe.js";import"./useSelectedSak-B7UTd8Uv.js";import"./useQuery-BFk2MbNQ.js";import"./sakerUtils-CUtc_40X.js";import"./Snarveier-BPLbPz6m.js";import"./LenkePanel-CIr-6dAX.js";import"./index-BDRw77VF.js";import"./Header-BLpegNLx.js";import"./LayoutWrapper-CKRO3epd.js";import"./StatusTag-C8uemo0U.js";import"./Tag-D9WWcRiI.js";import"./Stroller-ChH-TiXO.js";import"./NoeGikkGalt-DjaxhamC.js";import"./skjemanummer-CcbJYI0Q.js";import"./MinidialogSkjema-Bl9mqSGA.js";import"./HarIkkeSaker-DqmrQ3Z3.js";import"./SøkelenkerPanel-D9go9S7Z.js";import"./HarSaker-CRqDTIYe.js";import"./SakLink-CcT9R0zq.js";import"./guid-CsArkN6i.js";import"./ContentSection-B2z_xffn.js";import"./BekreftelseSendtSøknad-BizlGz07.js";import"./KontonummerInfo-CxnP8F9g.js";import"./Accordion-BXGdA62s.js";import"./Svangerskapspenger-CDm1qmgS.js";import"./DinPlan-CJ42avLV.js";import"./Oppgaver-bQbkiAMW.js";import"./OppgaveLenkepanel-CdQtFH7Z.js";import"./KontaktOss-BjXtKSjM.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
