import{i as g,j as t}from"./iframe-Dp8-w_m2.js";import{h as p,H as o}from"./index-DmJ8WYjV.js";import{A as i}from"./queries-IZJ1MFrC.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BDU3q9fV.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-CgwDaFFC.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DycU1OCY.js";import"./useSelectedSak-CZhe61AY.js";import"./useQuery-kXRujveY.js";import"./sakerUtils-QGi7qLE0.js";import"./Snarveier-B-gQvZOK.js";import"./LenkePanel-B7cuMEFE.js";import"./index-DwUxks2o.js";import"./Header-BknTR96A.js";import"./LayoutWrapper-CcIAe7JV.js";import"./StatusTag-BeKCtD81.js";import"./Tag-CVhAj1X9.js";import"./Stroller-Df7O-ZRX.js";import"./NoeGikkGalt-BmCKTPY1.js";import"./skjemanummer-D1Jdvft9.js";import"./MinidialogSkjema-D7AQfNus.js";import"./HarIkkeSaker--9R79dot.js";import"./SøkelenkerPanel-BjSmlwuj.js";import"./HarSaker-uz1GgmEk.js";import"./SakLink-CVYXaNYd.js";import"./guid-CsArkN6i.js";import"./ContentSection-CjqBdxEN.js";import"./BekreftelseSendtSøknad-DAGa42OL.js";import"./KontonummerInfo-BkxbDqOY.js";import"./Accordion-B3WVRTzO.js";import"./Svangerskapspenger-D5A452tX.js";import"./DinPlan-C0e82XwK.js";import"./Oppgaver-Dv1ykTqG.js";import"./OppgaveLenkepanel-eTxzZDg_.js";import"./KontaktOss-DUN673Si.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
