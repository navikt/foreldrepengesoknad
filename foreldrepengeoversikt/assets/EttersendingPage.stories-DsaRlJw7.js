import{i as g,j as t}from"./iframe-DKah-zWz.js";import{h as o,H as p}from"./index-CtLxs5gY.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-ghNulLnw.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-C0SsUr3E.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-60A_sYKz.js";import"./useSelectedSak-CfkoVBOZ.js";import"./useQuery-BmN-cqc3.js";import"./api-emMROyLC.js";import"./sakerUtils-4tvw2Ppq.js";import"./Snarveier-4-iU--cK.js";import"./LenkePanel-DtDYYvvK.js";import"./Dokument-D8J25Z4A.js";import"./dokumenterUtils-CRVsCZGO.js";import"./Tag-kgmM9oac.js";import"./GrupperteDokumenter-Bd9bneHO.js";import"./guid-CsArkN6i.js";import"./Header-CNZp4y4f.js";import"./LayoutWrapper-CIQ7AB0R.js";import"./StatusTag-DARQiD1W.js";import"./Stroller-djF1sR6z.js";import"./NoeGikkGalt-BH3wVitY.js";import"./MinidialogSkjema-KhH7yNxj.js";import"./skjemanummer-C8HltPsQ.js";import"./BekreftelseSendtSøknad-o6o9yYQO.js";import"./KontonummerInfo-DV5xiNcQ.js";import"./HarIkkeSaker-DxMZQN_K.js";import"./SøkelenkerPanel-Dr9JnRRl.js";import"./HarSaker-D2j4Sotm.js";import"./SakLink-DkGm7t1b.js";import"./ContentSection-CrRS_Kc_.js";import"./Svangerskapspenger-CzW6RLZY.js";import"./DinPlan-2qJqJfD0.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-D5p7L1ZA.js";import"./OppgaveLenkepanel-ab-ZmDf8.js";import"./KontaktOss-CUQZMvrT.js";const Z={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const ee=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,ee as __namedExportsOrder,Z as default};
