import{i as g,j as t}from"./iframe-BpcFlHR3.js";import{h as p,H as o}from"./index-DLgL99dF.js";import{A as i}from"./api-2sZWLpXp.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-jkCE6ENw.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BIWXRlNN.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-FmlZG-oL.js";import"./useSelectedSak-DCFyXuoz.js";import"./useQuery-DIRLTKP9.js";import"./sakerUtils-Di2_lBW3.js";import"./Snarveier-CA6TpJbG.js";import"./LenkePanel-DZyg9Fdc.js";import"./index-JGOV9MjI.js";import"./Header-D78FD_TG.js";import"./LayoutWrapper-B2UbXtGc.js";import"./StatusTag-hz7RNn_b.js";import"./Tag-DTYPMkPN.js";import"./Stroller-M2Ih8LNO.js";import"./NoeGikkGalt-CpS3hwIm.js";import"./MinidialogSkjema-UTwWqXBw.js";import"./skjemanummer-BheHsytM.js";import"./HarIkkeSaker-yJGnXOzr.js";import"./SøkelenkerPanel-Cl0o2qWE.js";import"./HarSaker-D0jt-SEc.js";import"./SakLink-DeuEuTfu.js";import"./guid-CsArkN6i.js";import"./ContentSection-D-RUjSuG.js";import"./BekreftelseSendtSøknad-D2cY4xTs.js";import"./dokumenterUtils-DlyshBRG.js";import"./KontonummerInfo-BtlpF1lA.js";import"./Accordion-h_jJmoG6.js";import"./Svangerskapspenger-BULk21CS.js";import"./DinPlan-pwR8BbR5.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-CX6h0PWJ.js";import"./OppgaveLenkepanel-CeGsp-zD.js";import"./KontaktOss-CxMYhKfI.js";const ee={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const te=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,te as __namedExportsOrder,ee as default};
