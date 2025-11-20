import{i as g,j as t}from"./iframe-B5QC8AIG.js";import{h as p,H as o}from"./index-znonygE-.js";import{A as i}from"./queries-C0fZPw1r.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-D1SL7QV0.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BccTKEIM.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-wMjCLYRA.js";import"./useSelectedSak-DIg6TFXX.js";import"./useQuery-DWPWvH2v.js";import"./sakerUtils-DV2A2ndT.js";import"./Snarveier-DlyaMcvr.js";import"./LenkePanel-DiDvRI_I.js";import"./index-DiehcI6P.js";import"./Header-ulnVmEhC.js";import"./LayoutWrapper-CoL9VDkP.js";import"./StatusTag-2NmPLhLg.js";import"./Tag-wOX75qoo.js";import"./Stroller-BT5EpKTm.js";import"./NoeGikkGalt-Cs0O5H-f.js";import"./skjemanummer-B5A-ubfr.js";import"./MinidialogSkjema-BkAnEUny.js";import"./HarIkkeSaker-D6IdTQZp.js";import"./SøkelenkerPanel-Rmj2R-Dt.js";import"./HarSaker-BfBXAZQ_.js";import"./SakLink-CKXR0teD.js";import"./guid-CsArkN6i.js";import"./ContentSection-B1Mc35LK.js";import"./BekreftelseSendtSøknad-D-3GLASL.js";import"./KontonummerInfo-BynBGgMI.js";import"./Accordion-Cx782lvs.js";import"./Svangerskapspenger-DaV1NiYh.js";import"./DinPlan-C1g5uEBz.js";import"./Oppgaver-DaC-WACc.js";import"./OppgaveLenkepanel-BDp1n_it.js";import"./KontaktOss-mCKiCXK2.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
