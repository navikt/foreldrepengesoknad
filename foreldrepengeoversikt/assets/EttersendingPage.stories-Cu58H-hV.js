import{i as g,j as t}from"./iframe-BfLZ8xTq.js";import{h as p,H as o}from"./index-CmgMjj4v.js";import{A as i}from"./queries-DGOHdOPj.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DB4Hdm4k.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-_XKpLkts.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-CdEAe2E3.js";import"./useSelectedSak-xmhUOVqp.js";import"./useQuery-DUAkMzOQ.js";import"./sakerUtils-BivdUTW9.js";import"./Snarveier-CCv549oJ.js";import"./LenkePanel-BwisN7Ph.js";import"./index-DmFydn4h.js";import"./Header-rPXJBc6V.js";import"./LayoutWrapper-dF0rI4D6.js";import"./StatusTag-bOjGSkof.js";import"./Tag-DBQUnhax.js";import"./Stroller-CBBvxxSS.js";import"./NoeGikkGalt-CyHXzr8s.js";import"./MinidialogSkjema-FKqzpObT.js";import"./skjemanummer-VISD0Cww.js";import"./HarIkkeSaker-EbeBDwot.js";import"./SøkelenkerPanel-B1vKAUgL.js";import"./HarSaker-jHkx7m5h.js";import"./SakLink-7Q-r191X.js";import"./guid-CsArkN6i.js";import"./ContentSection-I8Pcrj8o.js";import"./BekreftelseSendtSøknad-CffCnzX6.js";import"./KontonummerInfo-ChP6SaIt.js";import"./Accordion-K2iS09pY.js";import"./Svangerskapspenger-De0QtqyJ.js";import"./DinPlan-DHyDv-_9.js";import"./Oppgaver-CLVh5HW_.js";import"./OppgaveLenkepanel-WAoCZcca.js";import"./KontaktOss-CUnh2mzi.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
