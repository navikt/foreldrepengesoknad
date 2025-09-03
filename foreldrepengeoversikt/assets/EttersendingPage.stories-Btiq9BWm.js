import{i as g,j as t}from"./iframe-yTRVePst.js";import{h as o,H as p}from"./index-DJdXn63g.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-B50L7DOS.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-3u7wKqrD.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-C5EZOwES.js";import"./useSelectedSak-DAZJ8mSW.js";import"./useQuery-CGulWCmg.js";import"./api-b5kd2-zq.js";import"./sakerUtils-4Cljmnbd.js";import"./Snarveier-rdKhp0D0.js";import"./LenkePanel-DCn2IWeY.js";import"./index-DDFosqS1.js";import"./Dokument-BAyM7ODx.js";import"./dokumenterUtils-BhadA0Jg.js";import"./Tag-C4Fxxhok.js";import"./GrupperteDokumenter-D71MP9U4.js";import"./guid-CsArkN6i.js";import"./Accordion-3em9g5g6.js";import"./Header-fr_7MI_r.js";import"./LayoutWrapper-Cmz5eB6P.js";import"./StatusTag-Bf9a_6n5.js";import"./Stroller-C7kIa-YD.js";import"./NoeGikkGalt-CpHkBvwZ.js";import"./MinidialogSkjema-G8Bb2aSY.js";import"./skjemanummer-LOzeICnh.js";import"./BekreftelseSendtSøknad-B61CyTrz.js";import"./KontonummerInfo-DtEqcGfn.js";import"./HarIkkeSaker-DAJs9ZUj.js";import"./SøkelenkerPanel-DvZVOAIB.js";import"./HarSaker-D_TxCIP2.js";import"./SakLink-DV1VT7Eo.js";import"./ContentSection-BaPv9zoK.js";import"./Svangerskapspenger-ACk8ai0V.js";import"./DinPlan-B5WvHdFg.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-CDq0Ec1c.js";import"./OppgaveLenkepanel-DPDMWAyN.js";import"./KontaktOss-B-s7Wzz6.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
