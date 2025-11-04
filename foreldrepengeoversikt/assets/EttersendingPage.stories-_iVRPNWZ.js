import{i as g,j as t}from"./iframe-CqGsn30k.js";import{h as p,H as o}from"./index-CjbZbzR5.js";import{A as i}from"./api-DSgWObfO.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-COviZedq.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-CIxvWd8a.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DpPQBXEz.js";import"./useSelectedSak-BbgKg6q3.js";import"./useQuery-BR6BDEnN.js";import"./sakerUtils-3zvqjApU.js";import"./Snarveier-BTVRGdGN.js";import"./LenkePanel-CXLEbZwq.js";import"./index-CdagP5ro.js";import"./Header-_BEKqR9b.js";import"./LayoutWrapper-BQRR7n-3.js";import"./StatusTag-Cn7y0Ity.js";import"./Tag-BFVvRtDs.js";import"./Stroller-CuSqs8Kf.js";import"./NoeGikkGalt-CyM3tKLn.js";import"./MinidialogSkjema-DKdDc7p9.js";import"./skjemanummer-sUskyJmB.js";import"./HarIkkeSaker-CuQnwM4m.js";import"./SøkelenkerPanel--q2siKVM.js";import"./HarSaker-B56PE4Ug.js";import"./SakLink-CKSdus-g.js";import"./guid-CsArkN6i.js";import"./ContentSection-CyEp7QCM.js";import"./BekreftelseSendtSøknad-DKBu67zq.js";import"./KontonummerInfo-BobfFBtQ.js";import"./Accordion-ASqMWeKT.js";import"./Svangerskapspenger-BR4lPQUb.js";import"./DinPlan-Oertw3B9.js";import"./Oppgaver-IqwX1LMF.js";import"./OppgaveLenkepanel-jcaJH7zX.js";import"./KontaktOss-CQhq97ok.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
