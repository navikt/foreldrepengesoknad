import{k as g,j as t}from"./iframe-C0aYCwxQ.js";import{h as p,H as o}from"./index-z12xrPHv.js";import{A as i}from"./queries-Bwobjia3.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CH9Ku271.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-CMFQeyIP.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DHt9F9S_.js";import"./useSelectedSak-D1ik6fT0.js";import"./useQuery-COq4C8h2.js";import"./sakerUtils-CwAYkhQJ.js";import"./Snarveier-B7eQ2Rdz.js";import"./LenkePanel-DTk2ip2K.js";import"./index-A1dX0y8K.js";import"./Header-DwpNx8C1.js";import"./LayoutWrapper-daRpoAUB.js";import"./StatusTag-YtwA-yqY.js";import"./Tag-C2gL6K-x.js";import"./Stroller-CaD07pnW.js";import"./NoeGikkGalt-B_E8PuxP.js";import"./skjemanummer-BRWEFZVL.js";import"./MinidialogSkjema-B6SUqsiH.js";import"./HarIkkeSaker-BKQD0H2G.js";import"./SøkelenkerPanel-D0jhZSeT.js";import"./HarSaker-Bv7enaJ5.js";import"./SakLink-Dnfm-qcX.js";import"./guid-CsArkN6i.js";import"./ContentSection-CstgAsUG.js";import"./BekreftelseSendtSøknad-1M-uQdyI.js";import"./KontonummerInfo-DxN2AME-.js";import"./Accordion-CWBQikJz.js";import"./Svangerskapspenger-BktbUHH1.js";import"./DinPlan-Dub99uCA.js";import"./Oppgaver-D2WdLJUz.js";import"./OppgaveLenkepanel-B5BCCaMO.js";import"./KontaktOss-BjS-P0bo.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
