import{i as g,j as t}from"./iframe-LqrhR6Qg.js";import{h as p,H as o}from"./index-CC4eufGu.js";import{A as i}from"./queries-JCy8o_so.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-ikta6sDJ.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-Cd80xl5A.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Cg65Dyk1.js";import"./useSelectedSak-C3LUCSEO.js";import"./useQuery-B-30Pv-7.js";import"./sakerUtils-B2De3VyN.js";import"./Snarveier-pegVwrVX.js";import"./LenkePanel-Cm5L8OsM.js";import"./index-BObBxIP_.js";import"./Header-B6lMmcwj.js";import"./LayoutWrapper-DDPmsKkY.js";import"./StatusTag-CYi8jD34.js";import"./Tag-DK6zd_DF.js";import"./Stroller-DuL6wJs_.js";import"./NoeGikkGalt-DHws4_c_.js";import"./skjemanummer-BzRWfLhB.js";import"./MinidialogSkjema-Q6nyCnie.js";import"./HarIkkeSaker-CdYifOio.js";import"./SøkelenkerPanel-DJLhoKAi.js";import"./HarSaker-CBq3St8J.js";import"./SakLink-MZFW2L5V.js";import"./guid-CsArkN6i.js";import"./ContentSection-EvLkA6DA.js";import"./BekreftelseSendtSøknad-CPSIaqVn.js";import"./KontonummerInfo-CV0f1a_A.js";import"./Accordion-CSvHDeRg.js";import"./Svangerskapspenger-BEwXzpMl.js";import"./DinPlan-9Fplvm95.js";import"./Oppgaver-DuJ_JGzQ.js";import"./OppgaveLenkepanel-B87cAyTI.js";import"./KontaktOss-B_U4O0qa.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
