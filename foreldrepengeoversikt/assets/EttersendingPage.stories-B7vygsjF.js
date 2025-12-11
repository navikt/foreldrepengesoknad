import{k as g,j as t}from"./iframe-l2zrofia.js";import{h as p,H as o}from"./index-DUq-v0yZ.js";import{A as i}from"./queries-BbW1aU4Q.js";import{O as n}from"./routes-BgSQQwXh.js";import{E as a}from"./ForeldrepengeoversiktRoutes-C_J-ybnr.js";import{M as u,R as k,a as S}from"./chunk-WWGJGFF6-B8YZslr1.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-DN9LsXVy.js";import"./useSelectedSak-DS4kI6se.js";import"./useQuery-bm7R7y2p.js";import"./sakerUtils-C1w-22z4.js";import"./Snarveier-C47vYgBe.js";import"./LenkePanel-BO1Gim2k.js";import"./index-FeoBfJHj.js";import"./Header-MeVmNZ5Y.js";import"./LayoutWrapper-DrFncOsx.js";import"./StatusTag-BZ3SLoMv.js";import"./Tag-CiAC0-Fs.js";import"./Stroller-6FxpIQmE.js";import"./BabyWrapped-Dvy4csQq.js";import"./NoeGikkGalt-RmSVCWAq.js";import"./skjemanummer-B_7ewZwZ.js";import"./MinidialogSkjema-5Q8V-hcZ.js";import"./HarIkkeSaker-CnC8arLs.js";import"./SøkelenkerPanel-ZBTPSfVh.js";import"./HarSaker-DPyeRpXA.js";import"./SakLink-BDHk7UY_.js";import"./guid-CsArkN6i.js";import"./ContentSection-C0duH21J.js";import"./BekreftelseSendtSøknad-BBZKPCfC.js";import"./tidslinjeUtils-CrzcrFyg.js";import"./KontonummerInfo-BUduRBs7.js";import"./Accordion-CNPO4SD-.js";import"./Svangerskapspenger-B96VGgq0.js";import"./DinPlan-C7ZlH2Vv.js";import"./Oppgaver-DOKaRF8z.js";import"./OppgaveLenkepanel-vOseVef2.js";import"./Tidslinje-Ck_e2pw9.js";import"./Paperplane-1W2iKq4g.js";import"./KontaktOss-CqVViEw-.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
