import{i as g,j as t}from"./iframe-D8Z13nFP.js";import{h as p,H as o}from"./index-BteYz7Ol.js";import{A as i}from"./queries-DHjpFEai.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-AvA7X8us.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-r5aUDDL9.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DzMPCJiY.js";import"./useSelectedSak-ByhrDQQ_.js";import"./useQuery-BzOtqp34.js";import"./sakerUtils-D08-BRMZ.js";import"./Snarveier-BJOsQgEJ.js";import"./LenkePanel-BnSNkWkj.js";import"./index-CUTh_jqY.js";import"./Header-Cy3CJQKF.js";import"./LayoutWrapper-CjakT9OF.js";import"./StatusTag-DdP1cYLU.js";import"./Tag-DoZ103Zs.js";import"./Stroller-CIWCbzEo.js";import"./NoeGikkGalt-BkML9l7n.js";import"./skjemanummer-xABSSrIY.js";import"./MinidialogSkjema-DeaFAnzg.js";import"./HarIkkeSaker-DUQnZfeS.js";import"./SøkelenkerPanel-CkbCQIm1.js";import"./HarSaker-ChEvSYYu.js";import"./SakLink-DGnF1SvA.js";import"./guid-CsArkN6i.js";import"./ContentSection-YdZALREM.js";import"./BekreftelseSendtSøknad-BHNxl-HT.js";import"./KontonummerInfo-DiVA_cY6.js";import"./Accordion-rQNBk5in.js";import"./Svangerskapspenger-C2TB6NvG.js";import"./DinPlan-pH5G6HEU.js";import"./Oppgaver-BKmxmciK.js";import"./OppgaveLenkepanel-CkFLO8o6.js";import"./KontaktOss-Bu1WAnJ9.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
