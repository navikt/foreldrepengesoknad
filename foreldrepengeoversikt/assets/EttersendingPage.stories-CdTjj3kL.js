import{k as g,j as t}from"./iframe-B9HSP4qp.js";import{h as p,H as o}from"./index-9iwXPaj4.js";import{A as i}from"./queries-DSExmaaY.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-JStjYdXE.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-DtADhXcR.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-Bc5DUcE1.js";import"./useSelectedSak-Co5tv0WF.js";import"./useQuery-D9LfzJmJ.js";import"./sakerUtils-BATY1Oe2.js";import"./Snarveier-Cu4Uld-K.js";import"./LenkePanel-CqhZs_xM.js";import"./index-muUyurbi.js";import"./Header-DIuiN90_.js";import"./LayoutWrapper-C6MSbLx_.js";import"./StatusTag-DYRadPNX.js";import"./Tag-91CngL8I.js";import"./Stroller-DuDPoM5T.js";import"./NoeGikkGalt-B0_mLrIM.js";import"./skjemanummer-BXy5Numa.js";import"./MinidialogSkjema-ydq-e4vS.js";import"./HarIkkeSaker-yOObQw3l.js";import"./SøkelenkerPanel-DJACNlF1.js";import"./HarSaker-B0ByfHOh.js";import"./SakLink-BAyDdCz4.js";import"./guid-CsArkN6i.js";import"./ContentSection-CdlJxfAi.js";import"./BekreftelseSendtSøknad-BkhdoB_7.js";import"./KontonummerInfo-DUGELnay.js";import"./Accordion-CHHxxy_z.js";import"./Svangerskapspenger-CX-gurM_.js";import"./DinPlan-D8_Qn6-l.js";import"./Oppgaver-DXsxeApa.js";import"./OppgaveLenkepanel-CygVlwqD.js";import"./KontaktOss-1AupsRPI.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
