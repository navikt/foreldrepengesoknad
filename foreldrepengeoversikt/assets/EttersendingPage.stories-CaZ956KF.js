import{k as g,j as t}from"./iframe-BuEKraz3.js";import{h as p,H as o}from"./index-CbJlEfr4.js";import{A as i}from"./queries-gOGItRt0.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-FEiHnsfm.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-D0KdMILc.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-zu9sEDO-.js";import"./useSelectedSak-wBNLlDSM.js";import"./useQuery-cdg0A-Vs.js";import"./sakerUtils-DtP9Ns3y.js";import"./Snarveier-DzJZvtLh.js";import"./LenkePanel-C9vYgz5I.js";import"./index-4D_FRUZ3.js";import"./Header-Bh8IttFO.js";import"./LayoutWrapper-BL1MmXty.js";import"./StatusTag-R04u91vS.js";import"./Tag-BAELtsCj.js";import"./Stroller-Co0HnOwW.js";import"./NoeGikkGalt-DvasUpkN.js";import"./skjemanummer-D78SmjTH.js";import"./MinidialogSkjema-C5WesWWy.js";import"./HarIkkeSaker-DT1WZApf.js";import"./SøkelenkerPanel-D1HnVCin.js";import"./HarSaker-CYx5SAOZ.js";import"./SakLink-_CZ2oSqN.js";import"./guid-CsArkN6i.js";import"./ContentSection-Dggqybro.js";import"./BekreftelseSendtSøknad-DpoeSx-c.js";import"./KontonummerInfo-DfuNcLA5.js";import"./Accordion-SrpwNbFt.js";import"./Svangerskapspenger-CIWjwyJZ.js";import"./DinPlan-B5AWhPML.js";import"./Oppgaver-CrNLgyBO.js";import"./OppgaveLenkepanel-CzHyDZB5.js";import"./KontaktOss-BSL2HpkM.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
