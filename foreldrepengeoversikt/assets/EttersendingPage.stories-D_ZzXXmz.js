import{i as g,j as t}from"./iframe-DCBFZ9Q-.js";import{h as p,H as o}from"./index-BzJfNrrS.js";import{A as i}from"./queries-9rwfaLg3.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CJXlTNWe.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-qqXxuGOL.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BTLe5R6t.js";import"./useSelectedSak-BqpPsSrx.js";import"./useQuery-C1Vh1U2b.js";import"./sakerUtils-CmoHd0AV.js";import"./Snarveier-Drv9YCYt.js";import"./LenkePanel-DTBdcolN.js";import"./index-DRJqjQMq.js";import"./Header-BlZS7yMK.js";import"./LayoutWrapper-UD0c4_Z4.js";import"./StatusTag-CoxaNhgf.js";import"./Tag-Dx1-Z7aj.js";import"./Stroller-CSaU2C8h.js";import"./NoeGikkGalt-qBqxv1aJ.js";import"./skjemanummer-DdHO-OFm.js";import"./MinidialogSkjema-Cmg5NqKg.js";import"./HarIkkeSaker-D-UO0pql.js";import"./SøkelenkerPanel-DeZucjvB.js";import"./HarSaker-BpfDrv8G.js";import"./SakLink-C9RgVJvl.js";import"./guid-CsArkN6i.js";import"./ContentSection-Bqtzera5.js";import"./BekreftelseSendtSøknad-C2VBHMC6.js";import"./KontonummerInfo-B6zQm0pN.js";import"./Accordion-R0KVqJur.js";import"./Svangerskapspenger-CPBXlPBv.js";import"./DinPlan-BKnG9chZ.js";import"./Oppgaver-BTLs-tjT.js";import"./OppgaveLenkepanel-D3jNVGAC.js";import"./KontaktOss-B8uxgg_Q.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
