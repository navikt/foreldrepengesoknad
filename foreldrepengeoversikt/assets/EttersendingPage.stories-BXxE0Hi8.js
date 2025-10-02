import{i as g,j as t}from"./iframe-GyC3bxcg.js";import{h as o,H as p}from"./index-Cogsrr_c.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Dk2XoUpA.js";import{M as d,R as u,a as k}from"./chunk-TMI4QPZX-BcKXusyi.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Di8zZTzp.js";import"./useSelectedSak-ecpxRwF0.js";import"./useQuery-DN1cp6aI.js";import"./api-CGFRwcPW.js";import"./sakerUtils-DIF0IIB-.js";import"./Snarveier-Dt-Wtfos.js";import"./LenkePanel-ChC517RI.js";import"./index-BHm_4q7q.js";import"./Dokument-DzrPqV1g.js";import"./dokumenterUtils-BPx6kPM5.js";import"./Tag-CXYRKVJP.js";import"./GrupperteDokumenter-DY-gvkk4.js";import"./guid-CsArkN6i.js";import"./Accordion-C-jQaL98.js";import"./Header-BW9jjdSl.js";import"./LayoutWrapper-KKhAYTof.js";import"./StatusTag-BIIsr7dD.js";import"./Stroller-D5HghDG2.js";import"./NoeGikkGalt-CoYaXE6b.js";import"./MinidialogSkjema-nIEgJ2m7.js";import"./skjemanummer-BKVAV9k4.js";import"./BekreftelseSendtSøknad-B4-TEEda.js";import"./KontonummerInfo-BbWtgWcf.js";import"./HarIkkeSaker-CmI_s_c9.js";import"./SøkelenkerPanel-iesE4mIF.js";import"./HarSaker-mYU5I3s9.js";import"./SakLink-BLMows4r.js";import"./ContentSection-B52-kjcP.js";import"./Svangerskapspenger-xQP8IsGW.js";import"./DinPlan-gA7SNMcf.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-DVMKNQBk.js";import"./OppgaveLenkepanel-Cds0Igop.js";import"./KontaktOss-CP5SRHLp.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
