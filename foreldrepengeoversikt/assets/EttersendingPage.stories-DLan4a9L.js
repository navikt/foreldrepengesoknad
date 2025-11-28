import{k as g,j as t}from"./iframe-BjlKaXeH.js";import{h as p,H as o}from"./index-xGhD4f9l.js";import{A as i}from"./queries-ApZ5HlLW.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BGlp2_pz.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-C8cv5mIt.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-gWs1wuiL.js";import"./useSelectedSak-6HWFh3gy.js";import"./useQuery-BjJxPG7d.js";import"./sakerUtils-CbUnUW2R.js";import"./Snarveier-B_yODw6T.js";import"./LenkePanel-cSapLc6u.js";import"./index-pwP9y4Ft.js";import"./Header-ClV9TLSa.js";import"./LayoutWrapper-BQpHQ1Ih.js";import"./StatusTag-C8Xh1ZAy.js";import"./Tag-_QYEH3MK.js";import"./Stroller-CycKOKxz.js";import"./NoeGikkGalt-YyrXwoqz.js";import"./skjemanummer-DKu_vsWF.js";import"./MinidialogSkjema-CyJnughZ.js";import"./HarIkkeSaker-Kyk26pH9.js";import"./SøkelenkerPanel-NCXHFl64.js";import"./HarSaker-DalpbYjL.js";import"./SakLink-BOzdJPVK.js";import"./guid-CsArkN6i.js";import"./ContentSection-DD5OJOFf.js";import"./BekreftelseSendtSøknad-BYLZDmJP.js";import"./KontonummerInfo-B-fcikkB.js";import"./Accordion-DBvPYA90.js";import"./Svangerskapspenger-Du3gs_Q-.js";import"./DinPlan-DM5bMxk3.js";import"./Oppgaver-CvNmB7fX.js";import"./OppgaveLenkepanel-DUyz41BR.js";import"./KontaktOss-Nu6E4xs2.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
