import{i as g,j as t}from"./iframe-eTGQdXfF.js";import{h as p,H as o}from"./index-BtS2BgTv.js";import{A as i}from"./queries-l60335T5.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DGEQ3XXn.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-ByKIykCk.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-YMyUxMh0.js";import"./useSelectedSak-CsSY5ZrB.js";import"./useQuery-D4huDOxn.js";import"./sakerUtils-CUP99mGj.js";import"./Snarveier-BmMeOTjT.js";import"./LenkePanel-DLjXu6oV.js";import"./index-B0CZDFWm.js";import"./Header-bNA_nLNv.js";import"./LayoutWrapper-zZuMr0ns.js";import"./StatusTag-D2wKu6LV.js";import"./Tag-B_lnmBfI.js";import"./Stroller-Bl8eQPFY.js";import"./NoeGikkGalt-BAMlP3r5.js";import"./skjemanummer-C8bxVbvv.js";import"./MinidialogSkjema-Dt0EiSRv.js";import"./HarIkkeSaker-DP0xubzq.js";import"./SøkelenkerPanel-BMQAcFWt.js";import"./HarSaker-CzXUkMt1.js";import"./SakLink-DeAG7bit.js";import"./guid-CsArkN6i.js";import"./ContentSection-BWSavvxN.js";import"./BekreftelseSendtSøknad-DudHhBac.js";import"./KontonummerInfo-C8zkDry1.js";import"./Accordion-sPGM3D2a.js";import"./Svangerskapspenger-D0_SjsOe.js";import"./DinPlan-D2SyjWLZ.js";import"./Oppgaver-CmCB-L3M.js";import"./OppgaveLenkepanel-DP2b1xfu.js";import"./KontaktOss-zobQwqZX.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
