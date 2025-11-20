import{i as g,j as t}from"./iframe-DKs8wdyT.js";import{h as p,H as o}from"./index-D9WBorm-.js";import{A as i}from"./queries-C_yUvTuY.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DjFmvQZG.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-Bzu6sD9f.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DT5Lm4Sw.js";import"./useSelectedSak-D9w-y_Ha.js";import"./useQuery-DMb7e4Gx.js";import"./sakerUtils-BMZ_jgBA.js";import"./Snarveier-CMT8KMUa.js";import"./LenkePanel-B4z8jg2U.js";import"./index-Y5UOuoBj.js";import"./Header-Dw9s7MK8.js";import"./LayoutWrapper-BnVdAvlr.js";import"./StatusTag-BKTEDnoF.js";import"./Tag-9TE_pekA.js";import"./Stroller-BUvAsYFq.js";import"./NoeGikkGalt-DMjjnBpR.js";import"./skjemanummer-OhMtcqES.js";import"./MinidialogSkjema-iL__1RN6.js";import"./HarIkkeSaker-DCCO4-zL.js";import"./SøkelenkerPanel-wo1FDFQ0.js";import"./HarSaker-qHhVkI7X.js";import"./SakLink-BCOeU5vF.js";import"./guid-CsArkN6i.js";import"./ContentSection-BJ18LHSl.js";import"./BekreftelseSendtSøknad-CLhcoSNC.js";import"./KontonummerInfo-DDJWjc8Q.js";import"./Accordion-D4KFa34B.js";import"./Svangerskapspenger-CqEVAh7E.js";import"./DinPlan-CkzyA9Bf.js";import"./Oppgaver-I9pCo0Cd.js";import"./OppgaveLenkepanel-BjpA3iQ6.js";import"./KontaktOss-DZc_GLub.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
