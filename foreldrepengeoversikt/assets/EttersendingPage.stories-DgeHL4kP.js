import{i as g,j as t}from"./iframe-DUmMOqqZ.js";import{h as p,H as o}from"./index-QXLwCkO0.js";import{A as i}from"./queries-DJ6m6sUL.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Br8UuwJU.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-CUjMtgiP.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Dh2mcEVx.js";import"./useSelectedSak-CYbOUQaK.js";import"./useQuery-DHXfCFpC.js";import"./sakerUtils-CPkVmPw9.js";import"./Snarveier-DsmK40PV.js";import"./LenkePanel-7AlrnhrR.js";import"./index-Cb2hANxR.js";import"./Header-CeTCy34L.js";import"./LayoutWrapper-CaBVDhEc.js";import"./StatusTag-BzVU-5iQ.js";import"./Tag-DDv1gKXs.js";import"./Stroller-BR8-_Lwm.js";import"./NoeGikkGalt-NHnatTR6.js";import"./MinidialogSkjema-CL-UX3HS.js";import"./skjemanummer-B0l1ygpa.js";import"./HarIkkeSaker-CYGwuCHf.js";import"./SøkelenkerPanel-CC9zvXvB.js";import"./HarSaker-CeeWPXyU.js";import"./SakLink-CFMGmczx.js";import"./guid-CsArkN6i.js";import"./ContentSection-f6Zl8F-q.js";import"./BekreftelseSendtSøknad-BOjTijNJ.js";import"./KontonummerInfo-DPYnBGOA.js";import"./Accordion-UHwn1obk.js";import"./Svangerskapspenger-CsXpV5ev.js";import"./DinPlan-pQVbKuxp.js";import"./Oppgaver-Bmsbw3DF.js";import"./OppgaveLenkepanel-D-gqX2fv.js";import"./KontaktOss-1CAo3XYt.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
