import{i as g,j as t}from"./iframe-BGJaxDwk.js";import{h as p,H as o}from"./index-C9R8n3FA.js";import{A as i}from"./queries-D7oTTkbF.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BT5nJI5L.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BbV8VSB6.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-zAlxD0PX.js";import"./useSelectedSak-D2YzrH6y.js";import"./useQuery-Bs7knLIG.js";import"./sakerUtils-B_Iu6HbS.js";import"./Snarveier-jaIr2MtN.js";import"./LenkePanel-aevU1Nm5.js";import"./index-B7nY9xy0.js";import"./Header-DKgW89zR.js";import"./LayoutWrapper-BTeQUC6m.js";import"./StatusTag-BuFbT8YM.js";import"./Tag-BrPJZwR8.js";import"./Stroller-C_EErbSU.js";import"./NoeGikkGalt-CmE8IeLf.js";import"./skjemanummer-DafeCD1R.js";import"./MinidialogSkjema-CTn2Anji.js";import"./HarIkkeSaker-CJ3dnNIP.js";import"./SøkelenkerPanel-Bx4yLt--.js";import"./HarSaker-CcCWuQL3.js";import"./SakLink-BaiCZ3-s.js";import"./guid-CsArkN6i.js";import"./ContentSection-ClGjDo9c.js";import"./BekreftelseSendtSøknad-dHn49SzE.js";import"./KontonummerInfo-BgWdeHX7.js";import"./Accordion-CKScJEZM.js";import"./Svangerskapspenger-T91ZceAx.js";import"./DinPlan-znnIPW5k.js";import"./Oppgaver-wQaoTqCu.js";import"./OppgaveLenkepanel-CggCx_86.js";import"./KontaktOss-B6rQenr0.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
