import{i as g,j as t}from"./iframe-DfsHlNQR.js";import{h as p,H as o}from"./index-raj1jvRH.js";import{A as i}from"./queries-BMwC7KhQ.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BobwpiCU.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-2quodct1.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Ckyso97t.js";import"./useSelectedSak-mmGPTHcw.js";import"./useQuery-C70ERcNt.js";import"./sakerUtils-DNdkQW-p.js";import"./Snarveier-DrCqrjzO.js";import"./LenkePanel-pTVNUYN-.js";import"./index-DtKNVJWL.js";import"./Header-XQwEkZm0.js";import"./LayoutWrapper-CTlBYWxZ.js";import"./StatusTag-D_ebH6BX.js";import"./Tag-CHisrZLt.js";import"./Stroller-B4kHeNOY.js";import"./NoeGikkGalt-CxGoPlj0.js";import"./skjemanummer-1_aaBdl0.js";import"./MinidialogSkjema-DgM8V8SU.js";import"./HarIkkeSaker-DoXmMy_M.js";import"./SøkelenkerPanel-7HJ0g5TB.js";import"./HarSaker-C6E7GPrH.js";import"./SakLink-CEFEizqy.js";import"./guid-CsArkN6i.js";import"./ContentSection-CIaUFNjN.js";import"./BekreftelseSendtSøknad-BwLAcEC5.js";import"./KontonummerInfo-1YgZRwR6.js";import"./Accordion-CEHysiP4.js";import"./Svangerskapspenger-CCHAELEu.js";import"./DinPlan-dUua_KBM.js";import"./Oppgaver-Cdm4X-pE.js";import"./OppgaveLenkepanel-EsTbXvld.js";import"./KontaktOss-CKAQl96m.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
