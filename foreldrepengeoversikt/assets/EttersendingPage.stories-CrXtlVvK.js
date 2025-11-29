import{k as g,j as t}from"./iframe-SpUec8zk.js";import{h as p,H as o}from"./index-DLQXgwxg.js";import{A as i}from"./queries-BkLaiL-R.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DxCv51Rv.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-CRJMJ6mS.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-DmOQ8unn.js";import"./useSelectedSak-DXa8m4g1.js";import"./useQuery-BC8yk2V_.js";import"./sakerUtils-U1mkJAs7.js";import"./Snarveier-Cl3zj2-N.js";import"./LenkePanel-ClEl6aR5.js";import"./index-aIej0BVo.js";import"./Header-BFvJcSLo.js";import"./LayoutWrapper-D0_bbN7W.js";import"./StatusTag-A86hxuie.js";import"./Tag-By28nXtR.js";import"./Stroller-C32oUmAh.js";import"./NoeGikkGalt-83Erab1l.js";import"./skjemanummer-BtgCzTSB.js";import"./MinidialogSkjema-DYQ56jFi.js";import"./HarIkkeSaker-CJDMcMGS.js";import"./SøkelenkerPanel-BUzljANX.js";import"./HarSaker-DP5m02KT.js";import"./SakLink-CdCGlbSq.js";import"./guid-CsArkN6i.js";import"./ContentSection-Cmrw6_XC.js";import"./BekreftelseSendtSøknad-v6WCgdq6.js";import"./KontonummerInfo-Cat7NsbI.js";import"./Accordion-CgPwthgT.js";import"./Svangerskapspenger-CcYmvmHM.js";import"./DinPlan-D28MFO-S.js";import"./Oppgaver-B-RJLrV0.js";import"./OppgaveLenkepanel-D2EZ1wi5.js";import"./KontaktOss-BMMye4qo.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
