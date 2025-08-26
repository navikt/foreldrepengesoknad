import{i as g,j as t}from"./iframe-DTW4ifGA.js";import{h as o,H as p}from"./index-B-gckl7v.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Bn8lIA5U.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-CS2_WV0Q.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Dkf-P2HK.js";import"./useSelectedSak-BeEzVhHk.js";import"./useQuery-Dv6NnxLc.js";import"./api-BP5Acknq.js";import"./sakerUtils-CeyAtAi1.js";import"./Snarveier-BDFWGJif.js";import"./LenkePanel-QHo4hqht.js";import"./index-CM6hB_a5.js";import"./Dokument-5UBeCZzx.js";import"./dokumenterUtils-BbHTdyyi.js";import"./Tag-DYg5rSH_.js";import"./GrupperteDokumenter-BDPFtdD0.js";import"./guid-CsArkN6i.js";import"./Accordion-oomyAiUx.js";import"./Header-nhHnrHFM.js";import"./LayoutWrapper-BnjaKk9s.js";import"./StatusTag-Cih9s5gf.js";import"./Stroller-CAyIip-g.js";import"./NoeGikkGalt-CauoGJi9.js";import"./MinidialogSkjema-dAWTfp0Q.js";import"./skjemanummer-DWf_isGg.js";import"./BekreftelseSendtSøknad-A2CiCsJU.js";import"./KontonummerInfo-CjEysnCA.js";import"./HarIkkeSaker-BOctUZ1-.js";import"./SøkelenkerPanel-jQ3f6K0X.js";import"./HarSaker-CQUw1CGY.js";import"./SakLink-w8-WIR0n.js";import"./ContentSection-DYmY8iJu.js";import"./Svangerskapspenger-VyQsn45M.js";import"./DinPlan-DTjUh6iK.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-BdX9WpWF.js";import"./OppgaveLenkepanel-BpnFGRTR.js";import"./KontaktOss-DU2Jjg44.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
