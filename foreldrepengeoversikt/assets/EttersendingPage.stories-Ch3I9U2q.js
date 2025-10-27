import{i as g,j as t}from"./iframe-BL1fXp3Z.js";import{h as p,H as o}from"./index-CtMjQgvb.js";import{A as i}from"./api-QlxCNsBs.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DdaGYbo6.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-B017oIpK.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DNqCl1xt.js";import"./useSelectedSak-CgHp6Zaz.js";import"./useQuery-DRSe34mH.js";import"./sakerUtils-CWhnQUyi.js";import"./Snarveier-wXe9-G5_.js";import"./LenkePanel-CjQZjc_e.js";import"./index-BLdhdjp7.js";import"./Header-Caz774L4.js";import"./LayoutWrapper-BD9sgz2m.js";import"./StatusTag-FIffnT_r.js";import"./Tag-BBYKCuCF.js";import"./Stroller-r759M7JH.js";import"./NoeGikkGalt-BcyvNw_2.js";import"./MinidialogSkjema-gLEXvcBT.js";import"./skjemanummer-DLD4juAC.js";import"./HarIkkeSaker-Cyt0mYRA.js";import"./SøkelenkerPanel-CD8kOGYT.js";import"./HarSaker-DnKdMKF0.js";import"./SakLink-EhhX9t7d.js";import"./guid-CsArkN6i.js";import"./ContentSection-CN-rQiPY.js";import"./BekreftelseSendtSøknad-tZuUcB6P.js";import"./dokumenterUtils-DHPQPJjC.js";import"./KontonummerInfo-D1i_pgJ-.js";import"./Accordion-CMeu16a0.js";import"./Svangerskapspenger-ZAOnlef3.js";import"./DinPlan-DjDyWJ4x.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-Bi1QeTIy.js";import"./OppgaveLenkepanel-DZ4Ai8Cr.js";import"./KontaktOss-Bc2_DnlC.js";const ee={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const te=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,te as __namedExportsOrder,ee as default};
