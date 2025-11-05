import{i as g,j as t}from"./iframe-CPaSz3da.js";import{h as p,H as o}from"./index-BFB8NGlC.js";import{A as i}from"./api-DC0dVmWA.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Bs2B8qQ3.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BbJenm_R.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-PcqJj6KH.js";import"./useSelectedSak-B1N8rFOJ.js";import"./useQuery-DDM1s8BW.js";import"./sakerUtils-Cb99ZYnh.js";import"./Snarveier-CN0CLleX.js";import"./LenkePanel-B2mdiHVA.js";import"./index-BiEMDhvH.js";import"./Header-CQbiu8tk.js";import"./LayoutWrapper-PHxWRNAz.js";import"./StatusTag-aRSUHhp_.js";import"./Tag-CFg_k61W.js";import"./Stroller-DwH-tLVC.js";import"./NoeGikkGalt-k2YdFDRM.js";import"./MinidialogSkjema-CF-mLsc3.js";import"./skjemanummer-BXckVS9o.js";import"./HarIkkeSaker-BLMddNuL.js";import"./SøkelenkerPanel-cgU23cUb.js";import"./HarSaker-DYLD6qXH.js";import"./SakLink-DP8AKzat.js";import"./guid-CsArkN6i.js";import"./ContentSection-CNj4likg.js";import"./BekreftelseSendtSøknad-BhwS9W1R.js";import"./KontonummerInfo-DsHbW90E.js";import"./Accordion-DdCZfSsH.js";import"./Svangerskapspenger-cdhSFMSP.js";import"./DinPlan-BsL5i39q.js";import"./Oppgaver-DE_5n7fU.js";import"./OppgaveLenkepanel-Dw2fiuA7.js";import"./KontaktOss-xK4hM1hj.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.lastOppESVedlegg, () => {
        return new HttpResponse(JSON.stringify('test-uuid'), {
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
      handlers: [http.post(API_URLS.lastOppESVedlegg, () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...r.parameters?.docs?.source}}};const Z=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,Z as __namedExportsOrder,Y as default};
