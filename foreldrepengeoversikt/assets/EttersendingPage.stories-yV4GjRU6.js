import{i as g,j as t}from"./iframe-ByN8KapC.js";import{h as p,H as o}from"./index-BfpeznYr.js";import{A as i}from"./queries-Cy1Vfr3t.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DsiGPETr.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-B6qULx97.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-CRWSrWTD.js";import"./useSelectedSak-CsJ3nRJf.js";import"./useQuery-BjbJ_pTg.js";import"./sakerUtils-CNAYEVmA.js";import"./Snarveier-Dpf0zglA.js";import"./LenkePanel-BqO48wgR.js";import"./index-CTO6yFVn.js";import"./Header-CXpDzHbY.js";import"./LayoutWrapper-qCcGU0U4.js";import"./StatusTag-Cgir9Jn5.js";import"./Tag-BHGiIExK.js";import"./Stroller-BYoZ8PIS.js";import"./NoeGikkGalt-CLsga4pa.js";import"./skjemanummer-B2HikvJE.js";import"./MinidialogSkjema-xQuQhdMg.js";import"./HarIkkeSaker-_tS0-IZQ.js";import"./SøkelenkerPanel-uvsCmYfE.js";import"./HarSaker-C8gYPNCu.js";import"./SakLink-CabpmSjd.js";import"./guid-CsArkN6i.js";import"./ContentSection-C-G2lYtE.js";import"./BekreftelseSendtSøknad-DRuDtXYk.js";import"./KontonummerInfo-B5lRB6Jh.js";import"./Accordion-BE4TEwN8.js";import"./Svangerskapspenger-BBGJq1tP.js";import"./DinPlan-ERkVuzme.js";import"./Oppgaver-Bubq8c2E.js";import"./OppgaveLenkepanel-BPc1EBAJ.js";import"./KontaktOss-CplVvNUJ.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
