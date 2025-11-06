import{i as g,j as t}from"./iframe-kkEBcNhm.js";import{h as p,H as o}from"./index-BXVvQb7A.js";import{A as i}from"./api-DStfYi14.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BerJyKF1.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-DSSrEgXf.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-CN8pWSw3.js";import"./useSelectedSak-ki1fopEy.js";import"./useQuery-B5JMQPAu.js";import"./sakerUtils-D4HrEktE.js";import"./Snarveier-BjDyEPyp.js";import"./LenkePanel-Bg9fCSzg.js";import"./index-CUAawcoM.js";import"./Header-EvHBpXj2.js";import"./LayoutWrapper-CuhZhf32.js";import"./StatusTag-CM8I5Ul5.js";import"./Tag-W4mAJL02.js";import"./Stroller-39BAnEqH.js";import"./NoeGikkGalt-CcQVVxnQ.js";import"./MinidialogSkjema-RAPxk3zh.js";import"./skjemanummer-B2hqFPB-.js";import"./HarIkkeSaker-DOZgdvXC.js";import"./SøkelenkerPanel-fYyJMKIG.js";import"./HarSaker-Cac8uGCN.js";import"./SakLink-CYNV8VAs.js";import"./guid-CsArkN6i.js";import"./ContentSection-GDztL_IR.js";import"./BekreftelseSendtSøknad-ByqAMPNv.js";import"./KontonummerInfo-Bym9uLJ6.js";import"./Accordion-D3iBL3Fe.js";import"./Svangerskapspenger-suRS2byr.js";import"./DinPlan-BeiZkYdX.js";import"./Oppgaver-BUMpHl4e.js";import"./OppgaveLenkepanel-Bgd1Rw7O.js";import"./KontaktOss-BQf9dMGr.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
