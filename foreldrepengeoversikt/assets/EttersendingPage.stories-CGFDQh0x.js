import{k as g,j as t}from"./iframe-CQDbWM54.js";import{h as p,H as o}from"./index-CcuaQ2wO.js";import{A as i}from"./queries-DEUm2iDm.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CBXzeEri.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-B_qEXbOt.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-CYaovsM4.js";import"./useSelectedSak-BgTDBGB9.js";import"./useQuery-bPZDoRQi.js";import"./sakerUtils-DI0mgC_7.js";import"./Snarveier-7a1f3CaR.js";import"./LenkePanel-GpT0N5bL.js";import"./index-CusbnjVo.js";import"./Header-ISm-YVSp.js";import"./LayoutWrapper-tJlF9cc0.js";import"./StatusTag-CsL6rjVp.js";import"./Tag-POYWkw4-.js";import"./Stroller-Bj795bX5.js";import"./NoeGikkGalt-OKentaEx.js";import"./skjemanummer-DLMOd8Qg.js";import"./MinidialogSkjema-Didm-54m.js";import"./HarIkkeSaker-mRKbZux_.js";import"./SøkelenkerPanel-DYB3X2pC.js";import"./HarSaker-g2jS9WQN.js";import"./SakLink-CoE-VgdX.js";import"./guid-CsArkN6i.js";import"./ContentSection-DLcpelZ-.js";import"./BekreftelseSendtSøknad-D2QeG_xE.js";import"./KontonummerInfo-9isTj-wo.js";import"./Accordion-ViM7JzVb.js";import"./Svangerskapspenger-Bd0x8ljO.js";import"./DinPlan-Cz25UtyY.js";import"./Oppgaver-C58o_8jl.js";import"./OppgaveLenkepanel-DYs3qLlG.js";import"./KontaktOss-VkcqcSZL.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
