import{i as g,j as t}from"./iframe-6YR8n9Q6.js";import{h as o,H as p}from"./index-CrMM6_h0.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CugvAw53.js";import{M as d,R as u,a as k}from"./chunk-TMI4QPZX-DPaxZ01J.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DG8F_0GG.js";import"./useSelectedSak-D221kLXT.js";import"./useQuery-DLf5KdkI.js";import"./api-DGhXO4SU.js";import"./sakerUtils-DxHAHSu3.js";import"./Snarveier-C5--R8j6.js";import"./LenkePanel-DE_6F1by.js";import"./index-D9aR02jP.js";import"./Dokument-tN8N7goW.js";import"./dokumenterUtils-B4vVIngz.js";import"./Tag-DeYQrIK_.js";import"./GrupperteDokumenter-nJ_mmGEX.js";import"./guid-CsArkN6i.js";import"./Accordion-CLCYJHk4.js";import"./Header-DAvRyOT_.js";import"./LayoutWrapper-DXfL-sH6.js";import"./StatusTag-Byk247v9.js";import"./Stroller-CRKLT4lo.js";import"./NoeGikkGalt-BE-G79Er.js";import"./MinidialogSkjema-PG4xqDjV.js";import"./skjemanummer-keYAk90y.js";import"./BekreftelseSendtSøknad-ClX6jOAJ.js";import"./KontonummerInfo-DctYhAXH.js";import"./HarIkkeSaker-B-dElJds.js";import"./SøkelenkerPanel-BMgx4mzz.js";import"./HarSaker-u-DvXKTt.js";import"./SakLink-C-35yyoH.js";import"./ContentSection-BajbtAcQ.js";import"./Svangerskapspenger-Bb4qSnEK.js";import"./DinPlan-BGiPgBim.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-_jgzqnjW.js";import"./OppgaveLenkepanel-BLpuGWct.js";import"./KontaktOss-D2SWh_5i.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
