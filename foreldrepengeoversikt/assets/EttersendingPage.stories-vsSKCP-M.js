import{i as g,j as t}from"./iframe-DK4uanVB.js";import{h as o,H as p}from"./index-DgrKQk4K.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BqCMkyQf.js";import{M as d,R as u,a as k}from"./chunk-TMI4QPZX-DJJfcfxe.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-CsGgVr1h.js";import"./useSelectedSak-BCrMlbNb.js";import"./useQuery-OV8idKuD.js";import"./api-D3Bb785J.js";import"./sakerUtils-BGO_INJD.js";import"./Snarveier-CYta74tj.js";import"./LenkePanel-zHTflIyz.js";import"./index-Dkwt9WVT.js";import"./Dokument-Daqaue1O.js";import"./dokumenterUtils-BZvLVWH-.js";import"./Tag-CccABgoK.js";import"./GrupperteDokumenter-qWUuduI2.js";import"./guid-CsArkN6i.js";import"./Accordion-WwcWzA2X.js";import"./Header-D_H3MrKG.js";import"./LayoutWrapper-CwDa0Lh9.js";import"./StatusTag-D_iIZ6he.js";import"./Stroller-Db9jIGBH.js";import"./NoeGikkGalt-P2VbTIgx.js";import"./MinidialogSkjema-90N_nXnJ.js";import"./skjemanummer-B4huW60o.js";import"./BekreftelseSendtSøknad-CUUYMsjZ.js";import"./KontonummerInfo-BlzR34Vu.js";import"./HarIkkeSaker-CizOZNDp.js";import"./SøkelenkerPanel-BXQVCa5Z.js";import"./HarSaker-C--Om9SG.js";import"./SakLink-c0C4iTPj.js";import"./ContentSection-NbdQiVq7.js";import"./Svangerskapspenger-CRHXHD3F.js";import"./DinPlan-BkXzIZdR.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-JuPs6ayW.js";import"./OppgaveLenkepanel-DClZASvT.js";import"./KontaktOss-BUqrQpCR.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
