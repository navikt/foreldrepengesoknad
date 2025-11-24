import{i as g,j as t}from"./iframe-CDh7LS05.js";import{h as p,H as o}from"./index-DrOnfQ8j.js";import{A as i}from"./queries-CT5Ry5RB.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BWamefw0.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-DZPPIY51.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Byos69Bd.js";import"./useSelectedSak-D5BB6SOt.js";import"./useQuery-Bf_ICF7R.js";import"./sakerUtils-CiEf4Vt-.js";import"./Snarveier-Bc1bGlrm.js";import"./LenkePanel-DN4j56A_.js";import"./index-f2M_q7F4.js";import"./Header-BqPEIu1L.js";import"./LayoutWrapper-BcbXs8FG.js";import"./StatusTag-9R-N5snm.js";import"./Tag-HNSj6flu.js";import"./Stroller-dS5rDCxg.js";import"./NoeGikkGalt-DXpQOWMs.js";import"./skjemanummer-IU9wTeTb.js";import"./MinidialogSkjema-BPmSCB-f.js";import"./HarIkkeSaker-D6zIhHe0.js";import"./SøkelenkerPanel-CwWaBwsh.js";import"./HarSaker-CwZNQdC5.js";import"./SakLink-BqvdnCMw.js";import"./guid-CsArkN6i.js";import"./ContentSection-DfnkuDGg.js";import"./BekreftelseSendtSøknad-BUptABgt.js";import"./KontonummerInfo-DRwKbX1v.js";import"./Accordion-C-y4PEDh.js";import"./Svangerskapspenger-XvZwB59b.js";import"./DinPlan-DEnwdxW7.js";import"./Oppgaver-B47zwSiT.js";import"./OppgaveLenkepanel-C2Gb2m9U.js";import"./KontaktOss-DAb0x47t.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
