import{i as g,j as t}from"./iframe-NzRkLCZT.js";import{h as p,H as o}from"./index-BnxWf0xd.js";import{A as i}from"./api-t8N-hJp1.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BZCySF0e.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-D1yeyGCE.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-C_Wuftra.js";import"./useSelectedSak-B16MAJpd.js";import"./useQuery-BCik-Gz0.js";import"./sakerUtils-C9cJJBd1.js";import"./Snarveier-DfcvxVYa.js";import"./LenkePanel-CBJ5JoRI.js";import"./index-aN7YHONY.js";import"./Header-Be57bexB.js";import"./LayoutWrapper-kB5v_At_.js";import"./StatusTag-D2R2aObx.js";import"./Tag-B24nxdgL.js";import"./Stroller-BhG3gRKQ.js";import"./NoeGikkGalt-kVmLvbn7.js";import"./MinidialogSkjema-CdYpZLKl.js";import"./skjemanummer-Bpi9_Wl0.js";import"./HarIkkeSaker-V-PB7att.js";import"./SøkelenkerPanel-DOWt52VK.js";import"./HarSaker-CgnPZ8gi.js";import"./SakLink-3ESuBLiS.js";import"./guid-CsArkN6i.js";import"./ContentSection-BNwvEdEV.js";import"./BekreftelseSendtSøknad-DcExopst.js";import"./KontonummerInfo-Bo2s7J5w.js";import"./Accordion-DAyAD_3S.js";import"./Svangerskapspenger-CWDSKFw6.js";import"./DinPlan-BoiY3Zmp.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-BP3L2cM4.js";import"./OppgaveLenkepanel-C19s6_s8.js";import"./KontaktOss-Je5HsmgJ.js";const Z={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const ee=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,ee as __namedExportsOrder,Z as default};
