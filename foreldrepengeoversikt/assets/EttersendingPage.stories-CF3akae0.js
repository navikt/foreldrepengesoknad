import{i as g,j as t}from"./iframe-DOZMPe0A.js";import{h as o,H as p}from"./index-M_Um798y.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CcZeGrxX.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-D6rB6ojM.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-C5UtWpK5.js";import"./useSelectedSak-DiUqA4ji.js";import"./useQuery-j9CnbBgM.js";import"./api-DrWxTODh.js";import"./sakerUtils-B8HPVhjK.js";import"./Snarveier-DXzf3yI8.js";import"./LenkePanel-C_h8bDou.js";import"./index-fN5yxXfs.js";import"./Dokument-CfnRbhG_.js";import"./dokumenterUtils-BQYdAWxk.js";import"./Tag-DYn8v6Pp.js";import"./GrupperteDokumenter-BB_bqlfU.js";import"./guid-CsArkN6i.js";import"./Accordion-Cus9I3rf.js";import"./Header-Sb8SmOsq.js";import"./LayoutWrapper-Dho__6CA.js";import"./StatusTag-BCSEGcfE.js";import"./Stroller-DB8owQcV.js";import"./NoeGikkGalt-CrJwvW3u.js";import"./MinidialogSkjema-f5c_fNTS.js";import"./skjemanummer-DGYMq_Vr.js";import"./BekreftelseSendtSøknad-D1Wph6wb.js";import"./KontonummerInfo-C_RFQ6mH.js";import"./HarIkkeSaker-BIsmoNP9.js";import"./SøkelenkerPanel-BxoCXQOJ.js";import"./HarSaker-CyiOWXSl.js";import"./SakLink-IRtKiUgi.js";import"./ContentSection-SbXI3tVs.js";import"./Svangerskapspenger-BT0RxiVI.js";import"./DinPlan-C8FzFVV0.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-DJDLb2lE.js";import"./OppgaveLenkepanel-Bkj9dWx6.js";import"./KontaktOss-ClmZT-e4.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
