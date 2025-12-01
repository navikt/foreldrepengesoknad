import{k as g,j as t}from"./iframe-CF1j9nKo.js";import{h as p,H as o}from"./index-_ciQbAaT.js";import{A as i}from"./queries-C6vosDue.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CSUtzoyk.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-DlCE1774.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-BS_2y_cB.js";import"./useSelectedSak-ChsZuqn9.js";import"./useQuery-COF2_gWq.js";import"./sakerUtils-CTLVeMcU.js";import"./Snarveier-DDAPSF5q.js";import"./LenkePanel-DM-hpuZ9.js";import"./index-B9FCEUSq.js";import"./Header-DS8O5yjy.js";import"./LayoutWrapper-BSMrE6kQ.js";import"./StatusTag-Cgakq9jR.js";import"./Tag-CS4HZhj1.js";import"./Stroller-CbYopj8O.js";import"./NoeGikkGalt-kU0hjirq.js";import"./skjemanummer-CykMxMsl.js";import"./MinidialogSkjema-CNFaVH35.js";import"./HarIkkeSaker-GwhoF1gX.js";import"./SøkelenkerPanel-D_HU3kCx.js";import"./HarSaker-0vQQ1nBt.js";import"./SakLink-Bou_51Du.js";import"./guid-CsArkN6i.js";import"./ContentSection-2oVRdfOa.js";import"./BekreftelseSendtSøknad-Dj-R-KTM.js";import"./KontonummerInfo-kjiSYbv7.js";import"./Accordion-XlKGJQiu.js";import"./Svangerskapspenger-Dw4_SEIC.js";import"./DinPlan-DFJjtrEE.js";import"./Oppgaver-BTJAnyIt.js";import"./OppgaveLenkepanel-DHBVDbfU.js";import"./KontaktOss-CrI1sufk.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
