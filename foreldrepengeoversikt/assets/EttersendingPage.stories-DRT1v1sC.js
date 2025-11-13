import{k as g,j as t}from"./iframe-DTODTPHR.js";import{h as p,H as o}from"./index-Bc6S1zUE.js";import{A as i}from"./queries-C_0kUz1k.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-k2r8NlTv.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-DtUuJCRE.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-EeogsClN.js";import"./useSelectedSak-DUjNtUDR.js";import"./useQuery-BX1JfT0i.js";import"./sakerUtils-BsdnL673.js";import"./Snarveier-BT7Yd6Ak.js";import"./LenkePanel--t6vfv_U.js";import"./index-lFLYpifo.js";import"./Header-B-aa_y8t.js";import"./LayoutWrapper-D_tBs0kY.js";import"./StatusTag-DZYeoQto.js";import"./Tag-DhoN168a.js";import"./Stroller-mqBKAGdg.js";import"./NoeGikkGalt-DrvX-nCc.js";import"./skjemanummer-3oSpPfdv.js";import"./MinidialogSkjema-DKO0vdMH.js";import"./HarIkkeSaker-CbQiPQc5.js";import"./SøkelenkerPanel-BC-K-9bV.js";import"./HarSaker-Cgs1hyeF.js";import"./SakLink-B0lPv8t6.js";import"./guid-CsArkN6i.js";import"./ContentSection-DmAzdz7M.js";import"./BekreftelseSendtSøknad-C2DtTJiV.js";import"./KontonummerInfo-C0FDLIHF.js";import"./Accordion-DLtDqG1D.js";import"./Svangerskapspenger-DGEggDA-.js";import"./DinPlan-5zQ34PoE.js";import"./Oppgaver-D-3mWMeC.js";import"./OppgaveLenkepanel-BXTiJl8x.js";import"./KontaktOss-BXIodSvl.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
