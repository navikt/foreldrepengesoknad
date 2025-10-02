import{i as g,j as t}from"./iframe-D5xIE_-l.js";import{h as o,H as p}from"./index-rGP_tt4P.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-IFF_lvDV.js";import{M as d,R as u,a as k}from"./chunk-TMI4QPZX-U-bqQZJQ.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-B_moCBJM.js";import"./useSelectedSak-Cjm0tT54.js";import"./useQuery-DGKuzgZO.js";import"./api-BJOBgEpL.js";import"./sakerUtils-DrkaiYY_.js";import"./Snarveier-oegSD-ow.js";import"./LenkePanel-Byhdhcrm.js";import"./index-BpdDpQdX.js";import"./Dokument-DjeLtS9k.js";import"./dokumenterUtils-CgIw0uRY.js";import"./Tag-CrncIJ6o.js";import"./GrupperteDokumenter-uMRXkp4m.js";import"./guid-CsArkN6i.js";import"./Accordion-CNuPJp4C.js";import"./Header-DGbjIkt1.js";import"./LayoutWrapper-CdCkVmeb.js";import"./StatusTag-Cpovtg2F.js";import"./Stroller-C8M440vi.js";import"./NoeGikkGalt-D5uCVpC9.js";import"./MinidialogSkjema-C-XtM-Lc.js";import"./skjemanummer-dYSomK0t.js";import"./BekreftelseSendtSøknad-D1WuK3TY.js";import"./KontonummerInfo-BgSTn46o.js";import"./HarIkkeSaker-BCPvqUVz.js";import"./SøkelenkerPanel-DRfycdH1.js";import"./HarSaker-BABaIlqF.js";import"./SakLink-BpfK0Fcu.js";import"./ContentSection-C7QFFdnh.js";import"./Svangerskapspenger-BsB-5WCg.js";import"./DinPlan-DVC_-wto.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-VbYmT0JC.js";import"./OppgaveLenkepanel-viXGaXZs.js";import"./KontaktOss-CHeLbxgC.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
