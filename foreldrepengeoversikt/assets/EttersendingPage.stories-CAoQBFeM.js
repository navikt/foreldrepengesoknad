import{i as g,j as t}from"./iframe-C6BSzdbg.js";import{h as p,H as o}from"./index-DhDUp3CF.js";import{A as i}from"./api-CwGbAgDD.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-iWgBxYlC.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-6EGvykVZ.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BkA0NXqe.js";import"./useSelectedSak-C6MZ3m2b.js";import"./useQuery-B2A1GJli.js";import"./sakerUtils-BDS9jc9w.js";import"./Snarveier-CP9TozDv.js";import"./LenkePanel-lHjVeQsG.js";import"./index-Caw6Ge8H.js";import"./Header-g4mFJSzT.js";import"./LayoutWrapper-qFK0cerd.js";import"./StatusTag-D-aHGgLB.js";import"./Tag-tSe1yCyJ.js";import"./Stroller-Db6wdnzi.js";import"./NoeGikkGalt-DDL7PqBL.js";import"./MinidialogSkjema-hLJBAEMR.js";import"./skjemanummer-BU0ErD8J.js";import"./HarIkkeSaker-DxeG2SXm.js";import"./SøkelenkerPanel-Ba3k6Y8M.js";import"./HarSaker-Wh8JAhhy.js";import"./SakLink-BAZFIb5Q.js";import"./guid-CsArkN6i.js";import"./ContentSection-CQjAmU7J.js";import"./BekreftelseSendtSøknad-DKYwOw1y.js";import"./KontonummerInfo-Dgiw2hj2.js";import"./Accordion-DMbNUaFk.js";import"./Svangerskapspenger-BlmqLxvK.js";import"./DinPlan-DNNww9W4.js";import"./Oppgaver-B-fG8awZ.js";import"./OppgaveLenkepanel-BLgiEvD-.js";import"./KontaktOss-BZ2bdBLp.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
