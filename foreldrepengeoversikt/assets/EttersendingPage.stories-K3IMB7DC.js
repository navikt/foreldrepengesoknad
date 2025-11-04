import{i as g,j as t}from"./iframe-CNM7jKP8.js";import{h as p,H as o}from"./index-DfjDPPpX.js";import{A as i}from"./api-BiRAonq1.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-1TJ2zd0P.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-DtByHWjA.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-ueKmzNLl.js";import"./useSelectedSak-BOLE0djR.js";import"./useQuery-BN8ns4DF.js";import"./sakerUtils-C3myTzcF.js";import"./Snarveier-DwE0tC6P.js";import"./LenkePanel-D5CLO0_y.js";import"./index-Ce6wbFI1.js";import"./Header-NqzAtqlN.js";import"./LayoutWrapper-Bai452xE.js";import"./StatusTag-BE1DZbDZ.js";import"./Tag-GCYOxzLb.js";import"./Stroller-BOncqYWi.js";import"./NoeGikkGalt-BF30SWtw.js";import"./MinidialogSkjema-B5dca6PC.js";import"./skjemanummer-D_bK0CsP.js";import"./HarIkkeSaker-CwBoe6q_.js";import"./SøkelenkerPanel-Cxpf9C-G.js";import"./HarSaker-DjHspJj0.js";import"./SakLink-DASm3hOJ.js";import"./guid-CsArkN6i.js";import"./ContentSection-Dlwe2N8X.js";import"./BekreftelseSendtSøknad-COZCNvvf.js";import"./KontonummerInfo-xBbEJa3z.js";import"./Accordion-CZMt4dYn.js";import"./Svangerskapspenger-DISl0Pip.js";import"./DinPlan-DF7zXwuq.js";import"./Oppgaver-DAODHhts.js";import"./OppgaveLenkepanel-BagcywU7.js";import"./KontaktOss-vnXQ9wXq.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
