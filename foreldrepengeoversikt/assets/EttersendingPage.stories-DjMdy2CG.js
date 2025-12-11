import{k as g,j as t}from"./iframe-BUAGkc_s.js";import{h as p,H as o}from"./index-ZnVRp8AG.js";import{A as i}from"./queries-BnNG6hgy.js";import{O as n}from"./routes-BgSQQwXh.js";import{E as a}from"./ForeldrepengeoversiktRoutes-PcHnDxrr.js";import{M as u,R as k,a as S}from"./chunk-WWGJGFF6-97Q76Dii.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-M_EY07Tr.js";import"./useSelectedSak-D6V0_Kae.js";import"./useQuery-EcnwYEoa.js";import"./sakerUtils-bIMyAGhr.js";import"./Snarveier-CadPP01t.js";import"./LenkePanel-D8hUo4-d.js";import"./index-DImkBTwF.js";import"./Header-v_ao7tS2.js";import"./LayoutWrapper-DMdF2osc.js";import"./StatusTag-CywPBYdq.js";import"./Tag-Ba9s3522.js";import"./Stroller-DiELwnFQ.js";import"./BabyWrapped-CKH61bsa.js";import"./NoeGikkGalt-CzHuXFT3.js";import"./skjemanummer-BjWTSDDM.js";import"./MinidialogSkjema-BwiSL0Kc.js";import"./HarIkkeSaker-JUdgchox.js";import"./SøkelenkerPanel-D3anuVQk.js";import"./HarSaker-Da4fOYnW.js";import"./SakLink-CbdIiSOh.js";import"./guid-CsArkN6i.js";import"./ContentSection-BrPto2fh.js";import"./BekreftelseSendtSøknad-Dkbf-FtE.js";import"./tidslinjeUtils-JVZYSlu-.js";import"./KontonummerInfo-CeWvibpc.js";import"./Accordion-CONZPVMn.js";import"./Svangerskapspenger-UENizlev.js";import"./DinPlan-BIxUIcEZ.js";import"./Oppgaver-Cd_4xM_L.js";import"./OppgaveLenkepanel-DUkVsSuv.js";import"./Tidslinje-EuEkQqvs.js";import"./Paperplane-BtIY_D6g.js";import"./KontaktOss-lfz7PxNl.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
