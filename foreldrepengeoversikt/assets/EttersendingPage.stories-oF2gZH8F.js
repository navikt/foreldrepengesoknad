import{i as g,j as t}from"./iframe-CcBOHSS2.js";import{h as p,H as o}from"./index-CykT5Li_.js";import{A as i}from"./api-DN1waq4L.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-fa58-Ass.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-CzCOg6Ei.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DztxFp_-.js";import"./useSelectedSak-D6ohSfj8.js";import"./useQuery-DhMnrYQL.js";import"./sakerUtils-C8P93cPZ.js";import"./Snarveier-C53S4wnm.js";import"./LenkePanel-B10YXDB2.js";import"./index-BggOb6ce.js";import"./Header-B6GfEkXW.js";import"./LayoutWrapper-BtdteCcN.js";import"./StatusTag-BnIGtfIS.js";import"./Tag-C6pIc_Qv.js";import"./Stroller-DljhvyMB.js";import"./NoeGikkGalt-BZFjLcNz.js";import"./MinidialogSkjema-BcoaurJm.js";import"./skjemanummer-BnAmnx1h.js";import"./HarIkkeSaker-DD_ftD0S.js";import"./SøkelenkerPanel-L7VaowWh.js";import"./HarSaker-DWXiGN_n.js";import"./SakLink-CXJdeDUf.js";import"./guid-CsArkN6i.js";import"./ContentSection-CtdC4mI8.js";import"./BekreftelseSendtSøknad-ybCC-t9A.js";import"./dokumenterUtils-CfsBjkIS.js";import"./KontonummerInfo-BQxVfnSa.js";import"./Accordion-Dz7bmdDo.js";import"./Svangerskapspenger-CIKrCs8F.js";import"./DinPlan-B3hVL7ux.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-DgQx4QSh.js";import"./OppgaveLenkepanel-jan2rp-9.js";import"./KontaktOss-Brrvjpwr.js";const ee={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
