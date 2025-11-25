import{i as g,j as t}from"./iframe-DETKn0nI.js";import{h as p,H as o}from"./index-QwqNUvdl.js";import{A as i}from"./queries-B2WLJ88x.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CYkhKNv-.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-B8KgWJoP.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-B82Ve4c_.js";import"./useSelectedSak-BiYxS77j.js";import"./useQuery-BZwjGZQJ.js";import"./sakerUtils-BrjY2W7n.js";import"./Snarveier-DwU3aJKw.js";import"./LenkePanel-Bg7CteLE.js";import"./index-CX2YqcVm.js";import"./Header-CYhTNy5Y.js";import"./LayoutWrapper-ByK5GVig.js";import"./StatusTag-BszkrkIY.js";import"./Tag-Djkq7733.js";import"./Stroller-CxxI9YPl.js";import"./NoeGikkGalt-Df2tIR8-.js";import"./skjemanummer-BAYRu0Fj.js";import"./MinidialogSkjema-BfZ0Ytkv.js";import"./HarIkkeSaker-BzMxZoHD.js";import"./SøkelenkerPanel-CHbj3Qrr.js";import"./HarSaker-B4Kqumb6.js";import"./SakLink-Ce4zcrZg.js";import"./guid-CsArkN6i.js";import"./ContentSection-wM5b0R7R.js";import"./BekreftelseSendtSøknad-BvE4rr9R.js";import"./KontonummerInfo-v65cnhJ-.js";import"./Accordion-tIBzKis9.js";import"./Svangerskapspenger-Cde3gzE3.js";import"./DinPlan-u4uyfOLl.js";import"./Oppgaver-BytuHQbV.js";import"./OppgaveLenkepanel-D0VXQ-EH.js";import"./KontaktOss-BRN703MQ.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
