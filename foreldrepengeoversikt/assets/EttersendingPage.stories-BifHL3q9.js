import{k as g,j as t}from"./iframe-BEz8EZAU.js";import{h as p,H as o}from"./index-BQ5QT8mJ.js";import{A as i}from"./queries-Sifezsu-.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-7WHzYgtW.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BRY0hQLl.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-CMv3fCQN.js";import"./useSelectedSak-C61E0LC-.js";import"./useQuery-CXIIbcLh.js";import"./sakerUtils-IKuDJ4hd.js";import"./Snarveier-Fjv8BPkY.js";import"./LenkePanel-D_1y_XE3.js";import"./index-Z-r-xmnV.js";import"./Header-aNJShEri.js";import"./LayoutWrapper-_yygJATM.js";import"./StatusTag-Ds3OKwAn.js";import"./Tag-COxYl_NJ.js";import"./Stroller-CQGNKzVx.js";import"./NoeGikkGalt-C2pBHbEs.js";import"./skjemanummer-DE91jy31.js";import"./MinidialogSkjema-DIrSN150.js";import"./HarIkkeSaker-D58TBoU3.js";import"./SøkelenkerPanel-DQEhenOk.js";import"./HarSaker-1OxxmLb9.js";import"./SakLink-ihrkbVdx.js";import"./guid-CsArkN6i.js";import"./ContentSection-Dulz96ON.js";import"./BekreftelseSendtSøknad-BitAc3K9.js";import"./KontonummerInfo-B0_nF7xP.js";import"./Accordion-W8iAxb3_.js";import"./Svangerskapspenger-BH-fkQlm.js";import"./DinPlan-B7PuhFFc.js";import"./Oppgaver-DSMmrsdN.js";import"./OppgaveLenkepanel-CnFsP17_.js";import"./KontaktOss-CGreyTty.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
