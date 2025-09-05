import{i as g,j as t}from"./iframe-BYYbk71C.js";import{h as o,H as p}from"./index-COLg6udd.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-7GYug7wM.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-KxSaLrW4.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BrtzicP3.js";import"./useSelectedSak-Ddde_rIS.js";import"./useQuery-CYGw-7kE.js";import"./api-B2LE0X7C.js";import"./sakerUtils-DRJjoWBP.js";import"./Snarveier-gBnAKTeX.js";import"./LenkePanel-vPbMlG5J.js";import"./index-CcmGoxsM.js";import"./Dokument-3Lu-Zi4d.js";import"./dokumenterUtils-BvHgtEBy.js";import"./Tag-BcHcaiWO.js";import"./GrupperteDokumenter-DK_YoYt9.js";import"./guid-CsArkN6i.js";import"./Accordion-Cn9q8aoS.js";import"./Header-wrkNOXXW.js";import"./LayoutWrapper-Uw0N7wKE.js";import"./StatusTag-CcYPY6NS.js";import"./Stroller-D2Hfoc0A.js";import"./NoeGikkGalt-CNGGI7YB.js";import"./MinidialogSkjema-Bu4UxfEB.js";import"./skjemanummer-CPo7SjyT.js";import"./BekreftelseSendtSøknad-DxXRanM1.js";import"./KontonummerInfo-BE6F58Xg.js";import"./HarIkkeSaker-HDR7uhpz.js";import"./SøkelenkerPanel-BrtOvV_K.js";import"./HarSaker-UjYonoYv.js";import"./SakLink-nS_-2m6h.js";import"./ContentSection-gVUY63Jl.js";import"./Svangerskapspenger-nfLauBp5.js";import"./DinPlan-DzfPxt95.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-DHF0vLgw.js";import"./OppgaveLenkepanel-BJqM5Xsy.js";import"./KontaktOss-Dnqu5u-R.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
