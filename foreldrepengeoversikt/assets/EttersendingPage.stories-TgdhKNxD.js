import{k as g,j as t}from"./iframe-MIqGeC9m.js";import{h as p,H as o}from"./index-DZOqqEyC.js";import{A as i}from"./queries-DMzMUvNU.js";import{O as n}from"./routes-BgSQQwXh.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BZN4XF1q.js";import{M as u,R as k,a as S}from"./chunk-WWGJGFF6-oGz4_dZK.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-B52uFNEx.js";import"./useSelectedSak-BSeBidXV.js";import"./useQuery-BaQizPdv.js";import"./sakerUtils-BQgTwYJW.js";import"./Snarveier-C0ccWU1l.js";import"./LenkePanel-BJ2KmPRL.js";import"./index-DPHOv5Hm.js";import"./Header-BpBtnxIn.js";import"./LayoutWrapper-HOh4mSTL.js";import"./StatusTag-DlgNLC0H.js";import"./Tag-BxMBA5hR.js";import"./Stroller-VI2Uo1lH.js";import"./BabyWrapped-BVInueab.js";import"./NoeGikkGalt-C7BgT4Xz.js";import"./skjemanummer-Bk-RcDnh.js";import"./MinidialogSkjema-DDuEVEEN.js";import"./HarIkkeSaker-BiOUOmJ9.js";import"./SøkelenkerPanel-JRfqtsUP.js";import"./HarSaker-BB7V48ZK.js";import"./SakLink-Dw_s533-.js";import"./guid-CsArkN6i.js";import"./ContentSection-b0H51EEW.js";import"./BekreftelseSendtSøknad-CXwq-ih1.js";import"./tidslinjeUtils-CUNsLpp3.js";import"./KontonummerInfo-D6eWfKc4.js";import"./Accordion-Dzd8TR3z.js";import"./Svangerskapspenger-CacauUHH.js";import"./DinPlan-Dl7H-Bkq.js";import"./Oppgaver-B_dZhs6O.js";import"./OppgaveLenkepanel-DA31YWdj.js";import"./Tidslinje-u4D4I1VY.js";import"./Paperplane-BGd48BmA.js";import"./KontaktOss-DvdgtRVB.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
