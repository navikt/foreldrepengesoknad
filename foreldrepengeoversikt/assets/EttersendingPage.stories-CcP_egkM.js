import{i as g,j as t}from"./iframe-f3fTV-vU.js";import{h as p,H as o}from"./index-CDNEqUmk.js";import{A as i}from"./queries-CwGhK0Aq.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DNfaMilU.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BeR0sFFu.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DKP3oFDE.js";import"./useSelectedSak-CydcsII0.js";import"./useQuery-CRgim-Nx.js";import"./sakerUtils-CK7DEaPP.js";import"./Snarveier-ODXr3Y_7.js";import"./LenkePanel-DPrvNIwY.js";import"./index-aC8IJm-Q.js";import"./Header-40DVKzOV.js";import"./LayoutWrapper-GTgE1yY_.js";import"./StatusTag-D0IVhBlj.js";import"./Tag-DKdspHx7.js";import"./Stroller-nX5nKnLQ.js";import"./NoeGikkGalt-BeIUOqV0.js";import"./skjemanummer-hGLsUUfY.js";import"./MinidialogSkjema-DajcQV81.js";import"./HarIkkeSaker-Clk8t6iw.js";import"./SøkelenkerPanel-Dt15nH99.js";import"./HarSaker-CP894guU.js";import"./SakLink-DFGocMjz.js";import"./guid-CsArkN6i.js";import"./ContentSection-CLA_LV6z.js";import"./BekreftelseSendtSøknad-CQFrV24J.js";import"./KontonummerInfo-wzF0VpEF.js";import"./Accordion-BithzCRM.js";import"./Svangerskapspenger-B5sbqWqz.js";import"./DinPlan-2ADOuE7E.js";import"./Oppgaver-DrsGTnXz.js";import"./OppgaveLenkepanel-DT6a34yg.js";import"./KontaktOss-Cz-mHIg0.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
