import{i as g,j as t}from"./iframe-CKap-5tI.js";import{h as p,H as o}from"./index-ChtrbyNz.js";import{A as i}from"./queries-C-2EcKci.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-UNGSwxB5.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-B7URwL11.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DuVhRFve.js";import"./useSelectedSak-CCGD1kji.js";import"./useQuery-BqOd_gCr.js";import"./sakerUtils-ggNI-g3q.js";import"./Snarveier-2GZBJsnl.js";import"./LenkePanel-WM7UPQg0.js";import"./index-BslUTrHP.js";import"./Header-B9A2rxJc.js";import"./LayoutWrapper-MbjlbN2A.js";import"./StatusTag-DBW5vAdv.js";import"./Tag-DKTrpx5a.js";import"./Stroller-C4iXffgL.js";import"./NoeGikkGalt-50kOmgAv.js";import"./skjemanummer-CR2wNr2n.js";import"./MinidialogSkjema-B5lfvxbo.js";import"./HarIkkeSaker-trUkn3Ym.js";import"./SøkelenkerPanel-U9x6mCRz.js";import"./HarSaker-B4ZqQ0Ey.js";import"./SakLink-CIRY2O19.js";import"./guid-CsArkN6i.js";import"./ContentSection-Dc_VinSM.js";import"./BekreftelseSendtSøknad-B1TA7r4a.js";import"./KontonummerInfo-B9a-lcvl.js";import"./Accordion-D2Y6Sq71.js";import"./Svangerskapspenger-GmOiCTdT.js";import"./DinPlan-DcTRCvCs.js";import"./Oppgaver-BalenQMr.js";import"./OppgaveLenkepanel-wtHRKBwX.js";import"./KontaktOss-BTUsk6dh.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
