import{i as g,j as t}from"./iframe-ubt6hJWh.js";import{h as p,H as o}from"./index-CzSY-LO1.js";import{A as i}from"./queries-BdREajoi.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DxMkjOeW.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BDmc9U6A.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-D6YEoZZv.js";import"./useSelectedSak-DK28zxEt.js";import"./useQuery-kyeTlV0k.js";import"./sakerUtils-B34RzzG6.js";import"./Snarveier-BoGx1rNg.js";import"./LenkePanel-C3S1pY3h.js";import"./index-D7jn_RLc.js";import"./Header-CIfICO3-.js";import"./LayoutWrapper-CwTwl21z.js";import"./StatusTag-eRQ4n-BD.js";import"./Tag-DFMYqHpl.js";import"./Stroller-Czd140Pb.js";import"./NoeGikkGalt-CANBWk7P.js";import"./skjemanummer-tHcM_3S_.js";import"./MinidialogSkjema-BzJbN4qf.js";import"./HarIkkeSaker-BTggaNAK.js";import"./SøkelenkerPanel-SOJujA3Z.js";import"./HarSaker-DMQ-SRgx.js";import"./SakLink-CJkjPvaN.js";import"./guid-CsArkN6i.js";import"./ContentSection-Dufg6pRV.js";import"./BekreftelseSendtSøknad-AdcJfOrU.js";import"./KontonummerInfo-BBAwf9yx.js";import"./Accordion-RIRX6AIc.js";import"./Svangerskapspenger-BzqVNJXa.js";import"./DinPlan-DoIAiAk-.js";import"./Oppgaver-Cyqzeo6_.js";import"./OppgaveLenkepanel-DOBA5RFX.js";import"./KontaktOss-zpSfw1m_.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
