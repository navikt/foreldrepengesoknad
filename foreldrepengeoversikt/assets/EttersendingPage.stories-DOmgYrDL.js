import{k as g,j as t}from"./iframe-CvBO9uPy.js";import{h as p,H as o}from"./index-CS8Thq-9.js";import{A as i}from"./queries-DEXcKo81.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-C7IFLJQW.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-CvzZTRj1.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-ZkCDyZJE.js";import"./useSelectedSak-dqLwXw15.js";import"./useQuery-C4W7Brek.js";import"./sakerUtils-DxfMKcVz.js";import"./Snarveier-D_clk95o.js";import"./LenkePanel-LJkEhCBu.js";import"./index-CxcyeAAl.js";import"./Header-D7SvOtpd.js";import"./LayoutWrapper-skJmpsQ9.js";import"./StatusTag-U-EcESpL.js";import"./Tag-Dk5KXySt.js";import"./Stroller-DNUs_Bjz.js";import"./NoeGikkGalt-B_XG5QgK.js";import"./skjemanummer-zG-1Ayg8.js";import"./MinidialogSkjema-DxMHE9Od.js";import"./HarIkkeSaker-DrnxFRoQ.js";import"./SøkelenkerPanel-DB3wlNQU.js";import"./HarSaker-WuIvmALN.js";import"./SakLink-Cz-BAnGJ.js";import"./guid-CsArkN6i.js";import"./ContentSection-_bUQoaNL.js";import"./BekreftelseSendtSøknad-BQd0B6y5.js";import"./KontonummerInfo-7Avw1xoz.js";import"./Accordion-CqeZDodw.js";import"./Svangerskapspenger-BqBGWmnT.js";import"./DinPlan-DtkAnau4.js";import"./Oppgaver-BgRPKn7c.js";import"./OppgaveLenkepanel-qbb6lSUD.js";import"./KontaktOss-6MQHuXiZ.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
