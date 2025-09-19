import{i as g,j as t}from"./iframe-DxzmxroJ.js";import{h as o,H as p}from"./index-c8_LwoXL.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-C9HRAYNx.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-UW8jfvD4.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BfFxpZ9K.js";import"./useSelectedSak-D8dseZII.js";import"./useQuery-3XBfERe_.js";import"./api-CiCskRyt.js";import"./sakerUtils-D5jGEbXW.js";import"./Snarveier-B9erEjCo.js";import"./LenkePanel-DjOUfDWY.js";import"./index-D4FpWt1k.js";import"./Dokument-BoYIC9SE.js";import"./dokumenterUtils-BvkSQI7K.js";import"./Tag-RHTeixa_.js";import"./GrupperteDokumenter-Dbm1sWeh.js";import"./guid-CsArkN6i.js";import"./Accordion-DP6agj5J.js";import"./Header-BVCK3_3V.js";import"./LayoutWrapper-Bg4a89HX.js";import"./StatusTag-rUfCOhk-.js";import"./Stroller-Lm2LYhaJ.js";import"./NoeGikkGalt-D4VdPdtL.js";import"./MinidialogSkjema-DgUAgUVv.js";import"./skjemanummer-B6-nXCf0.js";import"./BekreftelseSendtSøknad-3QFwc43U.js";import"./KontonummerInfo-D063ndZN.js";import"./HarIkkeSaker-BvtbRj4H.js";import"./SøkelenkerPanel-BOvj8P6E.js";import"./HarSaker-Bdcioa05.js";import"./SakLink-BNR7_fGb.js";import"./ContentSection-BXBYQQRB.js";import"./Svangerskapspenger-B5DIIZhm.js";import"./DinPlan-DMt92QIX.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-gqqpLcv1.js";import"./OppgaveLenkepanel-DvaxZ5d8.js";import"./KontaktOss-BA4dPu30.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const re=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,re as __namedExportsOrder,te as default};
