import{i as g,j as t}from"./iframe-q4RzOw8y.js";import{h as o,H as p}from"./index-_hN8bN29.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DwA24dWz.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-DDa5X1qt.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-CR3L_Bkd.js";import"./useSelectedSak-BZTnUmFB.js";import"./useQuery-BYhg3stO.js";import"./api-BW5T-t5i.js";import"./sakerUtils-Mfa-SPkO.js";import"./Snarveier-CPdM9pbX.js";import"./LenkePanel-CQy_8mkc.js";import"./index-bM1KbQ-g.js";import"./Dokument-De3Jk3mD.js";import"./dokumenterUtils-qw0iUb7n.js";import"./Tag-rELXEx-9.js";import"./GrupperteDokumenter-Js_ezeGo.js";import"./guid-CsArkN6i.js";import"./Accordion-BEuDFa8H.js";import"./Header-DJFz5-1b.js";import"./LayoutWrapper-VUAS79xM.js";import"./StatusTag-CeNGzsoS.js";import"./Stroller-BCW28oHN.js";import"./NoeGikkGalt-RyrHCJvl.js";import"./MinidialogSkjema-d92TPVzD.js";import"./skjemanummer-CXBMHLFC.js";import"./BekreftelseSendtSøknad-CUxvVHqf.js";import"./KontonummerInfo-SW15mrZV.js";import"./HarIkkeSaker-vXa_CRg5.js";import"./SøkelenkerPanel-9TehK4RE.js";import"./HarSaker-DnFJPvfr.js";import"./SakLink-B_XN6mqt.js";import"./ContentSection-ApYx2WOf.js";import"./Svangerskapspenger-Ou-HXyaO.js";import"./DinPlan-DpiGC3-n.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-BYJuxaE-.js";import"./OppgaveLenkepanel-D5ZpT-Xy.js";import"./KontaktOss-CvO30KKk.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
