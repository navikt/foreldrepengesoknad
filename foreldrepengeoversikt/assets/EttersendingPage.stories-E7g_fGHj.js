import{i as g,j as t}from"./iframe-CxGRv-N3.js";import{h as o,H as p}from"./index-B0oCnPCV.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CY87y_G9.js";import{M as d,R as u,a as k}from"./chunk-EF7DTUVF-B0d3na9A.js";import"./useBackgroundColor-DdAmbsHo.js";import"./useSelectedSak-DN5f5UrP.js";import"./useQuery-DLEKfLGm.js";import"./api-JhJO7PB7.js";import"./sakerUtils-CX5JpYM9.js";import"./Snarveier-Bz48Yf0y.js";import"./LenkePanel-BRXTBAGN.js";import"./Dokument-DhwwaGoR.js";import"./dokumenterUtils-C8Q8Wubn.js";import"./Tag-Fwrf-dz2.js";import"./GrupperteDokumenter-EzI39k1M.js";import"./guid-CsArkN6i.js";import"./Header-BMNKmVYf.js";import"./LayoutWrapper-Dqa-Ft-X.js";import"./StatusTag-P5LhWYeo.js";import"./Stroller-CAI0fcaE.js";import"./NoeGikkGalt-Ddq-bs7X.js";import"./MinidialogSkjema-IDCq-8WC.js";import"./skjemanummer-DfSDWumy.js";import"./BekreftelseSendtSøknad-YAm74--f.js";import"./KontonummerInfo-C5f5fYKI.js";import"./HarIkkeSaker-BORbN2r8.js";import"./SøkelenkerPanel-D9jVnHUh.js";import"./HarSaker-BrGLfw-_.js";import"./SakLink-C-r_j_ue.js";import"./ContentSection-CxIC10mD.js";import"./Svangerskapspenger-LM1fIvdk.js";import"./DinPlan-BObtDVUi.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-CBI2xTOI.js";import"./OppgaveLenkepanel-myPvJR07.js";import"./KontaktOss-D7CauR7v.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
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
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...r.parameters?.docs?.source}}};const Z=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,Z as __namedExportsOrder,Y as default};
