import{i as g,j as t}from"./iframe-Dcew6FNK.js";import{h as p,H as o}from"./index-WCy2UA1v.js";import{A as i}from"./queries-rN9vlGCs.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DQqaikD_.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-C_4bOTDn.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BCJuKAt4.js";import"./useSelectedSak-CHq17i_7.js";import"./useQuery-D7i4rAN6.js";import"./sakerUtils-BUtA84PH.js";import"./Snarveier-DaxgQhjy.js";import"./LenkePanel--1AKPNB2.js";import"./index-RG7R1eM9.js";import"./Header-CHVehUVt.js";import"./LayoutWrapper-BpNBoPgS.js";import"./StatusTag-BCwXfUxl.js";import"./Tag-BWj5Xevy.js";import"./Stroller-DksrPLFE.js";import"./NoeGikkGalt-j6Jv9eUT.js";import"./skjemanummer-XA4OYdlO.js";import"./MinidialogSkjema-B3Brjzip.js";import"./HarIkkeSaker-9Dzsa-FS.js";import"./SøkelenkerPanel-CS6C6fG8.js";import"./HarSaker-Cb7SQKgF.js";import"./SakLink-DLfOqv3I.js";import"./guid-CsArkN6i.js";import"./ContentSection-CgBn3YO3.js";import"./BekreftelseSendtSøknad-C26eFHNB.js";import"./KontonummerInfo-CVtvU1R7.js";import"./Accordion-Mm4HN0O6.js";import"./Svangerskapspenger-DiPvSuvG.js";import"./DinPlan-DOwHwih4.js";import"./Oppgaver-BQhktwHs.js";import"./OppgaveLenkepanel-zGdV-aXi.js";import"./KontaktOss-5o6pz3vp.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
