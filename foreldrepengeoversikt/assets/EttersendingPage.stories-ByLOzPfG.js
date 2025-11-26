import{k as g,j as t}from"./iframe-BI9QSXZr.js";import{h as p,H as o}from"./index-DaDBRA_E.js";import{A as i}from"./queries-DAuguvDX.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-D_rFVutN.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-DYstmieC.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-vfMUX3ZO.js";import"./useSelectedSak-CjdGVzSa.js";import"./useQuery-C1mSCsYn.js";import"./sakerUtils-B6QKtVZ4.js";import"./Snarveier-Ci3aQSwU.js";import"./LenkePanel-RDI1yw1D.js";import"./index-5p5JUpbu.js";import"./Header-CRqhBpK6.js";import"./LayoutWrapper-yl0MwaHL.js";import"./StatusTag-CD5jykrh.js";import"./Tag-Cpxh_dm2.js";import"./Stroller-BdShnn7V.js";import"./NoeGikkGalt-Bv1ISugT.js";import"./skjemanummer-C2l6TN18.js";import"./MinidialogSkjema-BzUMy4FB.js";import"./HarIkkeSaker-DoA6UQ2F.js";import"./SøkelenkerPanel-BPDuzhZO.js";import"./HarSaker-CHGA00KP.js";import"./SakLink-XrIVQaIC.js";import"./guid-CsArkN6i.js";import"./ContentSection-hw-io5C0.js";import"./BekreftelseSendtSøknad-CwUS5GO2.js";import"./KontonummerInfo-BAPJBFww.js";import"./Accordion-v3gnvu2h.js";import"./Svangerskapspenger-BNEHvtMV.js";import"./DinPlan-Dd6HspcL.js";import"./Oppgaver-Cxr0mpIe.js";import"./OppgaveLenkepanel-Btn-7D33.js";import"./KontaktOss-CjbdloW6.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
