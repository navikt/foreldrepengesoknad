import{i as g,j as t}from"./iframe-Bn58G2bq.js";import{h as o,H as p}from"./index-DeUM1XTx.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-C0v8-iph.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-BXr_P_Q5.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DZdezhm2.js";import"./useSelectedSak-jEilrTM-.js";import"./useQuery-OyZRUWIW.js";import"./api-DVaOkbq7.js";import"./sakerUtils-aJ1P1vDZ.js";import"./Snarveier-YJQHcuM-.js";import"./LenkePanel-C0OKZbMg.js";import"./index-slRXh6tA.js";import"./Dokument-DwJBVAg6.js";import"./dokumenterUtils-DrM2hICo.js";import"./Tag-BfZ7IFSM.js";import"./GrupperteDokumenter-DsZHuKS6.js";import"./guid-CsArkN6i.js";import"./Accordion-Chvhd3sX.js";import"./Header-s3em5Rje.js";import"./LayoutWrapper-CNO2zgA0.js";import"./StatusTag-BugXLjKK.js";import"./Stroller-BDYTedeU.js";import"./NoeGikkGalt-mPPUM6LC.js";import"./MinidialogSkjema-vIU1fadm.js";import"./skjemanummer-BpVc3nNW.js";import"./BekreftelseSendtSøknad-C8gIUC96.js";import"./KontonummerInfo-CmROjxmS.js";import"./HarIkkeSaker-B1kKl1Vb.js";import"./SøkelenkerPanel-D2MV5fBy.js";import"./HarSaker-Dvi_bhkr.js";import"./SakLink-BrbM-XpP.js";import"./ContentSection-0EEOL8lR.js";import"./Svangerskapspenger-CYVnZYcM.js";import"./DinPlan-CgGgBm-I.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-Dlle-wC2.js";import"./OppgaveLenkepanel-CSvyfXdH.js";import"./KontaktOss-7N8GtWaW.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
