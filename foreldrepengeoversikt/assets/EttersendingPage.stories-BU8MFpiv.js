import{i as g,j as t}from"./iframe-BKY9oz0A.js";import{h as o,H as p}from"./index-BdZWApWn.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BPJhu4Fb.js";import{M as d,R as u,a as k}from"./chunk-TMI4QPZX-6ljjaQpA.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-b82r8mSD.js";import"./useSelectedSak-DWysk8sd.js";import"./useQuery-BL4ExmHA.js";import"./api-CdmyvXYL.js";import"./sakerUtils-CTkXQ5pm.js";import"./Snarveier-C9A3W0pP.js";import"./LenkePanel-D8OADPat.js";import"./index-DpbtT3pz.js";import"./Dokument-KW3k_-sk.js";import"./dokumenterUtils-1nXedz9Y.js";import"./Tag-B8eKd7R9.js";import"./GrupperteDokumenter-B3LaREM7.js";import"./guid-CsArkN6i.js";import"./Accordion-DdWPFWp4.js";import"./Header-DXyLb3R_.js";import"./LayoutWrapper-EJBdtPE4.js";import"./StatusTag-bvEBsgys.js";import"./Stroller-BzLimL8v.js";import"./NoeGikkGalt-CBkfJSQz.js";import"./MinidialogSkjema-BrC9Fw4X.js";import"./skjemanummer-Co2eAW6C.js";import"./BekreftelseSendtSøknad-BhqvtUsI.js";import"./KontonummerInfo-Bpjlrp8B.js";import"./HarIkkeSaker-Df7VtPcZ.js";import"./SøkelenkerPanel-HwfXUUYZ.js";import"./HarSaker-DfUTMDDn.js";import"./SakLink-Bei0NbmU.js";import"./ContentSection-C7mfAw2f.js";import"./Svangerskapspenger-Ds6iEc3r.js";import"./DinPlan-eqFxp54g.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-BBBquf8p.js";import"./OppgaveLenkepanel-KWATtraM.js";import"./KontaktOss-BlvQHVuQ.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
