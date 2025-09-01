import{i as g,j as t}from"./iframe-Bkv81793.js";import{h as o,H as p}from"./index-ZlsFexqe.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-9gQ2Jm1H.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-C4INPojI.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Yh382_ce.js";import"./useSelectedSak-FSvldSwm.js";import"./useQuery-C0CtHw4M.js";import"./api--ODPVXNN.js";import"./sakerUtils-DFDJXObV.js";import"./Snarveier-TMl72QSJ.js";import"./LenkePanel-Ij2BnMmz.js";import"./index-ynUCD3SE.js";import"./Dokument-DXB7KfXb.js";import"./dokumenterUtils-BRBjVHyJ.js";import"./Tag-BQ_7DMF5.js";import"./GrupperteDokumenter-eEwxBF0-.js";import"./guid-CsArkN6i.js";import"./Accordion-Dsg9WZzq.js";import"./Header-ygm7pfbL.js";import"./LayoutWrapper-OwE69EcG.js";import"./StatusTag-CUzH9141.js";import"./Stroller-Cf-grQjl.js";import"./NoeGikkGalt-BMj4cdJS.js";import"./MinidialogSkjema-SVo5o6D_.js";import"./skjemanummer-tW1m2S8t.js";import"./BekreftelseSendtSøknad-CCDCsNiY.js";import"./KontonummerInfo-DTuuXp_6.js";import"./HarIkkeSaker-DrNNXe55.js";import"./SøkelenkerPanel-Cmp7gg63.js";import"./HarSaker-BLkpVtdN.js";import"./SakLink-Woxb2-ll.js";import"./ContentSection-B4qtGMI-.js";import"./Svangerskapspenger-CTtHX4Wz.js";import"./DinPlan-DiwNi0Hq.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-XarDXKTm.js";import"./OppgaveLenkepanel-CsZmJr1z.js";import"./KontaktOss-D_xtChsd.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
