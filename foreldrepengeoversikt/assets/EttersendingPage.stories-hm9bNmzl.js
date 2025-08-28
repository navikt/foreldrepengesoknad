import{i as g,j as t}from"./iframe-DNdFQc-E.js";import{h as o,H as p}from"./index-ZHclRefx.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-ad3Pqjft.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-DGACcyrF.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-UpQGCv5E.js";import"./useSelectedSak-QuNojGU6.js";import"./useQuery-DWA1I81K.js";import"./api-CntHfO5i.js";import"./sakerUtils-vvrpiCZP.js";import"./Snarveier-DfXE6JIp.js";import"./LenkePanel-cq28zm5d.js";import"./index-C537MR6J.js";import"./Dokument-DAAR7EW8.js";import"./dokumenterUtils-BLtnd12S.js";import"./Tag-B5RniG4t.js";import"./GrupperteDokumenter-CJJa1k8M.js";import"./guid-CsArkN6i.js";import"./Accordion-B5lV9rjr.js";import"./Header-BbIjRmI6.js";import"./LayoutWrapper-K01gCHV3.js";import"./StatusTag-BxaF-xwW.js";import"./Stroller-Cd08iIm7.js";import"./NoeGikkGalt-C7At8Qui.js";import"./MinidialogSkjema-C0SgBfpP.js";import"./skjemanummer-C5PRFulN.js";import"./BekreftelseSendtSøknad-CSDM8XJD.js";import"./KontonummerInfo-B1JEPuNI.js";import"./HarIkkeSaker-Cz7z4Vno.js";import"./SøkelenkerPanel-CqBdNRxJ.js";import"./HarSaker-Dp3pcbnO.js";import"./SakLink-iFzibmkj.js";import"./ContentSection-C7byseTr.js";import"./Svangerskapspenger-BCpQSmvR.js";import"./DinPlan-cw8r1wTi.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-BNq_JL8r.js";import"./OppgaveLenkepanel-C5-HdB2b.js";import"./KontaktOss-bHqY7659.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
