import{i as g,j as t}from"./iframe-B9zDIt87.js";import{h as p,H as o}from"./index-BQ71cfIv.js";import{A as i}from"./queries-W-aItBYt.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Dup3eT8t.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-V1bhxGJl.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-CZO446Xf.js";import"./useSelectedSak-CyO_XGN3.js";import"./useQuery-BCMlmzHC.js";import"./sakerUtils-I_zLgmlr.js";import"./Snarveier-DDTQJYE6.js";import"./LenkePanel-CINpJRCv.js";import"./index-B2tUhBeO.js";import"./Header-M1SZctbt.js";import"./LayoutWrapper-CxzrFhGM.js";import"./StatusTag-CTNjFXJa.js";import"./Tag-CPGLJEBT.js";import"./Stroller-DlvJZ9ox.js";import"./NoeGikkGalt-DJ0TQ42v.js";import"./skjemanummer-DVCt-edu.js";import"./MinidialogSkjema-Dn_7vKgJ.js";import"./HarIkkeSaker-CiwsODFs.js";import"./SøkelenkerPanel-Bf1OXCY2.js";import"./HarSaker-CUu43FdB.js";import"./SakLink-DFjE2H4E.js";import"./guid-CsArkN6i.js";import"./ContentSection-Cf1PF75t.js";import"./BekreftelseSendtSøknad-DZdRebtD.js";import"./KontonummerInfo-ByN5JcvL.js";import"./Accordion-Tjl6s9vt.js";import"./Svangerskapspenger-C9b_EFQZ.js";import"./DinPlan-DEjKoGQ2.js";import"./Oppgaver-JlEg-cXR.js";import"./OppgaveLenkepanel-CDiGM2G_.js";import"./KontaktOss-CAdC4_lQ.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
