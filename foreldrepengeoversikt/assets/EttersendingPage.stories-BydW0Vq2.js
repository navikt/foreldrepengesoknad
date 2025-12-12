import{k as g,j as t}from"./iframe-DCfPTw-c.js";import{h as p,H as o}from"./index-V5pJY-H_.js";import{A as i}from"./queries-DbQrLqEA.js";import{O as n}from"./routes-BgSQQwXh.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Dr_YXoXt.js";import{M as u,R as k,a as S}from"./chunk-WWGJGFF6-C4IWAZFG.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-CvcTTtwc.js";import"./useSelectedSak-LyZK9yHg.js";import"./useQuery-BV_PWbiX.js";import"./sakerUtils-eyzmF0Xq.js";import"./Snarveier-CXoOAnvW.js";import"./LenkePanel-rrQRxxG4.js";import"./index-D5Lcjf7J.js";import"./Header-CT0wyEzs.js";import"./LayoutWrapper-Cw4-ix99.js";import"./StatusTag-D7OPk3cl.js";import"./Tag-o9Q1uDLS.js";import"./Stroller-Wn2oHOKp.js";import"./BabyWrapped-Be1_NonE.js";import"./NoeGikkGalt-BhbjOqxI.js";import"./skjemanummer-BJ3hGUiX.js";import"./MinidialogSkjema-DVacgVHE.js";import"./HarIkkeSaker-D-svYXUz.js";import"./SøkelenkerPanel-COk7Z_aw.js";import"./HarSaker-DFPwRLMU.js";import"./SakLink-CF8RmjQr.js";import"./guid-CsArkN6i.js";import"./ContentSection-hxNnlhoU.js";import"./BekreftelseSendtSøknad-C7rbz3fa.js";import"./tidslinjeUtils-CwkElmLX.js";import"./KontonummerInfo-BqW7zvsd.js";import"./Accordion-Dah-TQt_.js";import"./Svangerskapspenger-DfRViNuZ.js";import"./DinPlan-DKAEI5oP.js";import"./Oppgaver-G8RIfiRr.js";import"./OppgaveLenkepanel-33QFqsWK.js";import"./Tidslinje-Czepa4Vn.js";import"./Paperplane-BD4m2lJm.js";import"./KontaktOss-B2N8AcJa.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const se=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,se as __namedExportsOrder,re as default};
