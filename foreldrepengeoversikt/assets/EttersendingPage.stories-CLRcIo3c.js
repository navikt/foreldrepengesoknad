import{i as g,j as t}from"./iframe-CXfGVbaf.js";import{h as o,H as p}from"./index-ChxLzGq4.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-q3o5o8Kk.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-DbH7zVyY.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-C18RE9bn.js";import"./useSelectedSak-DfrwhCMA.js";import"./useQuery-C0n8XB2S.js";import"./api-NQYfJZG0.js";import"./sakerUtils-CO1tOIt9.js";import"./Snarveier-DJjhFuUc.js";import"./LenkePanel-ZpPskCEn.js";import"./index-CA-btkGX.js";import"./Dokument-Duz8v24U.js";import"./dokumenterUtils-DylPHgbg.js";import"./Tag-ByV1jdo9.js";import"./GrupperteDokumenter-hLnEGUpD.js";import"./guid-CsArkN6i.js";import"./Accordion-Dpf-tiUx.js";import"./Header-4i3GxVl3.js";import"./LayoutWrapper-BuZZb-nE.js";import"./StatusTag-sPMKXGWK.js";import"./Stroller-i152I1KD.js";import"./NoeGikkGalt-y_hKdheC.js";import"./MinidialogSkjema-BKtlYtt4.js";import"./skjemanummer-DPGPV9Z7.js";import"./BekreftelseSendtSøknad-CtDxp4sN.js";import"./KontonummerInfo-DRVQVZeS.js";import"./HarIkkeSaker-BpYsYCyB.js";import"./SøkelenkerPanel-Sw2cdtg6.js";import"./HarSaker-2D8jPQAH.js";import"./SakLink-Co1fuWM9.js";import"./ContentSection-kncdVtIC.js";import"./Svangerskapspenger-CqlU47mF.js";import"./DinPlan-BT-TmZe4.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-CfCJNd0S.js";import"./OppgaveLenkepanel-CPdyqlsl.js";import"./KontaktOss-DsgjDRQb.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
