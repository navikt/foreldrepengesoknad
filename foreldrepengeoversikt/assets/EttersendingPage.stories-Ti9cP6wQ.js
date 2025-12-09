import{k as g,j as t}from"./iframe-CX80ZlCu.js";import{h as p,H as o}from"./index-CdrpohTV.js";import{A as i}from"./queries-APlx939T.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DCBrBOdJ.js";import{M as u,R as k,a as S}from"./chunk-4WY6JWTD-BwT1iJWl.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-m77Bd0q_.js";import"./useSelectedSak-DacUPGe6.js";import"./useQuery-Cmh8ni-t.js";import"./sakerUtils-CEOVIOLD.js";import"./Snarveier-DSGa7SbG.js";import"./LenkePanel-DUM4Sjd3.js";import"./index-DT3YQW9B.js";import"./Header-CI861Xxh.js";import"./LayoutWrapper-B_N5DY-w.js";import"./StatusTag-ZLaFxLxh.js";import"./Tag-Cl_Q2pfs.js";import"./Stroller-CS3Axazk.js";import"./NoeGikkGalt-DsE5qV8k.js";import"./skjemanummer-Div8wqO2.js";import"./MinidialogSkjema-DxpVlF77.js";import"./HarIkkeSaker-CWqNgu4M.js";import"./SøkelenkerPanel-GfxhRbiW.js";import"./HarSaker-CYSl4mIe.js";import"./SakLink-CiQYGee3.js";import"./guid-CsArkN6i.js";import"./ContentSection-Ci8HAHar.js";import"./BekreftelseSendtSøknad-BIZK-YJ6.js";import"./KontonummerInfo-UQTTv-W5.js";import"./Accordion-DV1lSZoI.js";import"./Svangerskapspenger-Cbvhdwek.js";import"./DinPlan-B1K0HuBN.js";import"./Oppgaver-DKy534UW.js";import"./OppgaveLenkepanel-CgvD1bGr.js";import"./KontaktOss-Ccp-nMtI.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
