import{i as g,j as t}from"./iframe-mJ--PAC2.js";import{h as p,H as o}from"./index-CxtF_tCw.js";import{A as i}from"./api-Bhf7waFA.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CPZXxXXf.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX--7RizPfj.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BUGDrSoA.js";import"./useSelectedSak-Cd2X_s-G.js";import"./useQuery-xooj_pZC.js";import"./sakerUtils-BNMhmreY.js";import"./Snarveier-BjDTZcIH.js";import"./LenkePanel-DOo9h1br.js";import"./index-DrP1q76Q.js";import"./Header-B8mjh1R-.js";import"./LayoutWrapper-Cn3yrXGD.js";import"./StatusTag-B8ZcT7XY.js";import"./Tag-CsMbggRg.js";import"./Stroller-BI2rboPK.js";import"./NoeGikkGalt-Dw7jIRUa.js";import"./MinidialogSkjema-pxJ1fpEs.js";import"./skjemanummer-CJ1DjcUt.js";import"./HarIkkeSaker-MW64OoIw.js";import"./SøkelenkerPanel-BBmW8FE-.js";import"./HarSaker-Dz4Tm9OC.js";import"./SakLink-m5vwtc5V.js";import"./guid-CsArkN6i.js";import"./ContentSection-Czd-Fzpb.js";import"./BekreftelseSendtSøknad-DEkqo-wW.js";import"./KontonummerInfo-DnZbCJhl.js";import"./Accordion-C4D-bFuE.js";import"./Svangerskapspenger-BjhLSkmb.js";import"./DinPlan-CUwEximr.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-B6zGS0ni.js";import"./OppgaveLenkepanel-aSKjy1Ew.js";import"./KontaktOss-DY7AGywt.js";const Z={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const ee=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,ee as __namedExportsOrder,Z as default};
