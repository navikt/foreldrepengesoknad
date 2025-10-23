import{i as g,j as t}from"./iframe-B9B24InY.js";import{h as p,H as o}from"./index-1n_Xk7dt.js";import{A as m}from"./api-CSP2sNTp.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Bhumteee.js";import{M as u,R as k,a as c}from"./chunk-TMI4QPZX-Dy2A5nXz.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-wYwX6DJl.js";import"./useSelectedSak-DG7bT9oy.js";import"./useQuery-ClPdkV49.js";import"./sakerUtils-ymwfUV_S.js";import"./Snarveier-Dcfg7Ld-.js";import"./LenkePanel-C5vIOUpk.js";import"./index-DhaW3C1i.js";import"./Header-BVhYLwR6.js";import"./LayoutWrapper-CbmgYr_o.js";import"./StatusTag-w8vt0jS-.js";import"./Tag-DMXbAgRR.js";import"./Stroller-DTvGppLu.js";import"./NoeGikkGalt-DjTN5zy9.js";import"./MinidialogSkjema-Bpdv1erZ.js";import"./skjemanummer-DaaeGSlc.js";import"./BekreftelseSendtSøknad-CvuNHOIn.js";import"./dokumenterUtils-B2p0j5Z9.js";import"./KontonummerInfo-B26IZ7th.js";import"./Accordion-ClEbAVNQ.js";import"./HarIkkeSaker-CSRo86u9.js";import"./SøkelenkerPanel-kARGyTQ9.js";import"./HarSaker-Bk7rSjkT.js";import"./SakLink-BrZpNebl.js";import"./guid-CsArkN6i.js";import"./ContentSection-BIVPiCvb.js";import"./Svangerskapspenger-DMDzyQQn.js";import"./DinPlan-DkCgkyyh.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-C5TpCysj.js";import"./OppgaveLenkepanel-DZcQMCvV.js";import"./KontaktOss-j4GMBYs8.js";const ee={title:"EttersendingPage",component:a,decorators:[g],render:i=>{const{skjematypeQueryParamValue:s,...l}=i,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(c,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const te=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,te as __namedExportsOrder,ee as default};
