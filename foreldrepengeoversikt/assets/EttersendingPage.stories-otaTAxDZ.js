import{k as g,j as t}from"./iframe-CkI39tJu.js";import{h as p,H as o}from"./index-B2Wutxgb.js";import{A as i}from"./queries-DCgPOBfN.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BAbEFxem.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-CBIeJUBQ.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Bo3ju4Wr.js";import"./useSelectedSak-DYCsjWg4.js";import"./useQuery-du_UWgRf.js";import"./sakerUtils-CpKX21uN.js";import"./Snarveier-Be_OSzmX.js";import"./LenkePanel-B1kVU7T1.js";import"./index-CMskxzv8.js";import"./Header-CQi6JQV8.js";import"./LayoutWrapper-CmLhLp4U.js";import"./StatusTag-D5pphNnU.js";import"./Tag-D83tNWUB.js";import"./Stroller-CGjL-hlB.js";import"./NoeGikkGalt-CrmP7vpt.js";import"./skjemanummer-_7reR6Ll.js";import"./MinidialogSkjema-ChegOyip.js";import"./HarIkkeSaker-DGxz3FKf.js";import"./SøkelenkerPanel-h35Admpu.js";import"./HarSaker-BiFxqA8z.js";import"./SakLink-ChvZ9inw.js";import"./guid-CsArkN6i.js";import"./ContentSection-SFSj46vN.js";import"./BekreftelseSendtSøknad-CbVxpOyd.js";import"./KontonummerInfo-3LGr383u.js";import"./Accordion-DCnoUWWL.js";import"./Svangerskapspenger-BT6HTN2S.js";import"./DinPlan-1haX1x7D.js";import"./Oppgaver-BQcmckyT.js";import"./OppgaveLenkepanel-BI3d1sG9.js";import"./KontaktOss-BtiouI7K.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
