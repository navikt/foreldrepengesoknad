import{i as g,j as t}from"./iframe-Dx1z83Ao.js";import{h as o,H as p}from"./index-Cz7LLL7u.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BVmSltRd.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-DwwQbxh5.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-B8nyUQcS.js";import"./useSelectedSak-D8PT3MP1.js";import"./useQuery-C3Af0cjs.js";import"./api-8CPqgtae.js";import"./sakerUtils-Crc6R2p-.js";import"./Snarveier-DUb2kejw.js";import"./LenkePanel-BZlD1UzJ.js";import"./index-CJt0AWGc.js";import"./Dokument-JhS_PRY3.js";import"./dokumenterUtils-CRNa2Qme.js";import"./Tag-D6Fqq7V7.js";import"./GrupperteDokumenter-C3JLZMGz.js";import"./guid-CsArkN6i.js";import"./Accordion-D4eHHEku.js";import"./Header-Csp0Y9ff.js";import"./LayoutWrapper-B2O-YYCJ.js";import"./StatusTag-ttdw672S.js";import"./Stroller-CUSMxgNB.js";import"./NoeGikkGalt-DDRIS7UG.js";import"./MinidialogSkjema-VMcVE7uj.js";import"./skjemanummer-NNWQZNhl.js";import"./BekreftelseSendtSøknad-D3d-MCfq.js";import"./KontonummerInfo-CsJbZ3-v.js";import"./HarIkkeSaker-cr0vf7se.js";import"./SøkelenkerPanel-7cBYuZFR.js";import"./HarSaker-ejI4Cv-B.js";import"./SakLink-B_V6TjkW.js";import"./ContentSection-BozZ3jVm.js";import"./Svangerskapspenger-Hr1zdlwT.js";import"./DinPlan-BKH0ps_t.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-ClzQSb7I.js";import"./OppgaveLenkepanel-6jF04noh.js";import"./KontaktOss-H3JYpL5A.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
