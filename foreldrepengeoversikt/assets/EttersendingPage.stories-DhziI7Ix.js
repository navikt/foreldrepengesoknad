import{i as g,j as t}from"./iframe-DNOy4JUF.js";import{h as p,H as o}from"./index-e8ephae1.js";import{A as i}from"./api-DI05QCAf.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-B55FuRIn.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-7UmLIOh5.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-p_4PoFH7.js";import"./useSelectedSak-CvKRdU9u.js";import"./useQuery-DBYh9zHV.js";import"./sakerUtils-Ck0a8V8r.js";import"./Snarveier-D49zHAY3.js";import"./LenkePanel-D-LZGJ6k.js";import"./index-B7g2CdZt.js";import"./Header-Bb0N8MbL.js";import"./LayoutWrapper-D1YQ0OOs.js";import"./StatusTag-BU1Fx2TU.js";import"./Tag-aoIe89nX.js";import"./Stroller-fA9YNmnn.js";import"./NoeGikkGalt-bgfVST9S.js";import"./MinidialogSkjema-KAEiD9oK.js";import"./skjemanummer-CFP1_b2a.js";import"./HarIkkeSaker-KRO-cyVx.js";import"./SøkelenkerPanel-DQSeXeVG.js";import"./HarSaker-CgCcfpVc.js";import"./SakLink-CvByMYg7.js";import"./guid-CsArkN6i.js";import"./ContentSection-0vCQh2Al.js";import"./BekreftelseSendtSøknad-BuOd1P7c.js";import"./KontonummerInfo-qVHNHOJK.js";import"./Accordion-CLFqI2GM.js";import"./Svangerskapspenger-DscxYATo.js";import"./DinPlan-Dv8ph-Aq.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-Itq1BQkP.js";import"./OppgaveLenkepanel-Dz9GcDQD.js";import"./KontaktOss-ICdJpkGZ.js";const Z={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
