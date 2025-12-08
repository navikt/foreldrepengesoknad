import{k as g,j as t}from"./iframe-BabWFjFC.js";import{h as p,H as o}from"./index-Ba6Pz3pt.js";import{A as i}from"./queries-grjeZack.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-lX-4ExGs.js";import{M as u,R as k,a as S}from"./chunk-4WY6JWTD-jlfulv4i.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-W1WJTKSA.js";import"./useSelectedSak-29bhTO_Z.js";import"./useQuery-C8QjNlRc.js";import"./sakerUtils-C8YJvlcx.js";import"./Snarveier-D7CZsTsD.js";import"./LenkePanel-Cv_cg5gR.js";import"./index-BFJwbQ_9.js";import"./Header-CJdVQ32n.js";import"./LayoutWrapper-CYNsgobi.js";import"./StatusTag-BKKzq-AN.js";import"./Tag-BnsqGokr.js";import"./Stroller-B7lZbtiC.js";import"./NoeGikkGalt--GtcfSDG.js";import"./skjemanummer-BS2HR_0y.js";import"./MinidialogSkjema-CFWwyj_c.js";import"./HarIkkeSaker-D9jrLSSA.js";import"./SøkelenkerPanel-9MAlqlzv.js";import"./HarSaker-CB1Iv0rM.js";import"./SakLink-dlJyZbQf.js";import"./guid-CsArkN6i.js";import"./ContentSection-BeoZvf-J.js";import"./BekreftelseSendtSøknad-lROn_5cM.js";import"./KontonummerInfo-J0j-6mHy.js";import"./Accordion-EC3zDX4H.js";import"./Svangerskapspenger-ygxQoNsq.js";import"./DinPlan-_qUsQt3K.js";import"./Oppgaver--F1ym8O2.js";import"./OppgaveLenkepanel-DhQaI2aU.js";import"./KontaktOss-wauBM2HP.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
