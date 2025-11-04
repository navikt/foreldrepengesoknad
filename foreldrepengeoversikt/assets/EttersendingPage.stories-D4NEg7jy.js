import{i as g,j as t}from"./iframe--J04DPMt.js";import{h as p,H as o}from"./index-DJDxggZT.js";import{A as i}from"./api-xVu1VUT_.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Dp1Sqek1.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-DV9fWWim.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-yYen6Q_S.js";import"./useSelectedSak-NRK1fmsu.js";import"./useQuery-DfKN96Pn.js";import"./sakerUtils-B1zqJpcK.js";import"./Snarveier-DBWOpCbb.js";import"./LenkePanel-CR3wyz2S.js";import"./index-DqULXsdl.js";import"./Header-CQeniqEr.js";import"./LayoutWrapper-B99qdxXl.js";import"./StatusTag-BqKLFnlm.js";import"./Tag-BiaGzeaK.js";import"./Stroller-_K42vtwW.js";import"./NoeGikkGalt-Bg1DwiJT.js";import"./MinidialogSkjema-DVhCN0Gt.js";import"./skjemanummer-B8xj8HFc.js";import"./HarIkkeSaker-Bu-9u7WD.js";import"./SøkelenkerPanel-D8ymweyp.js";import"./HarSaker-BZP5pNYS.js";import"./SakLink-Dpj0g9TV.js";import"./guid-CsArkN6i.js";import"./ContentSection-Bbsj9DDi.js";import"./BekreftelseSendtSøknad-CYofg17E.js";import"./KontonummerInfo-COLfEMkm.js";import"./Accordion-CvtDplvv.js";import"./Svangerskapspenger-Dfs9INja.js";import"./DinPlan-o9kSQRFF.js";import"./Oppgaver-CbJA5qQJ.js";import"./OppgaveLenkepanel-BEI7tlUr.js";import"./KontaktOss-DIuhn4T4.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
