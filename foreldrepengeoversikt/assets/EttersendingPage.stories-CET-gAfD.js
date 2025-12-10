import{k as g,j as t}from"./iframe-BArIh7qa.js";import{h as p,H as o}from"./index-CN92oAGH.js";import{A as i}from"./queries-CgcoKwqP.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DsWSbAsz.js";import{M as u,R as k,a as S}from"./chunk-4WY6JWTD-CV3nTsTi.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-DCzYUYty.js";import"./useSelectedSak-BkkamxS-.js";import"./useQuery-D6egnEB8.js";import"./sakerUtils-BAxlm-ql.js";import"./Snarveier-C8VEVRBJ.js";import"./LenkePanel-By5czw1w.js";import"./index-CW-B1w6u.js";import"./Header-Dv9wF9Wt.js";import"./LayoutWrapper-Bx2UPnA9.js";import"./StatusTag-BwwUO8PK.js";import"./Tag-CPCsV6cw.js";import"./Stroller-4KVMdq80.js";import"./NoeGikkGalt-DTEnKpUt.js";import"./skjemanummer-DZhQYBGO.js";import"./MinidialogSkjema-DegXelUv.js";import"./HarIkkeSaker-CgZnKJD_.js";import"./SøkelenkerPanel-D1dSKdFP.js";import"./HarSaker-D9f-CCa4.js";import"./SakLink-CzK5ob8y.js";import"./guid-CsArkN6i.js";import"./ContentSection-D86s2jay.js";import"./BekreftelseSendtSøknad-BmBVF5MU.js";import"./KontonummerInfo-BEv6sh_A.js";import"./Accordion-Df1xM0ZA.js";import"./Svangerskapspenger-CigpJADW.js";import"./DinPlan-12A69pry.js";import"./Oppgaver-Cw_qq0Dx.js";import"./OppgaveLenkepanel-DPQ-KnLA.js";import"./KontaktOss-B9rB3Tk4.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
