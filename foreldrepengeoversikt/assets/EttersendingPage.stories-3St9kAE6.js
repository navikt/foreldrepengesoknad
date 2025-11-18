import{i as g,j as t}from"./iframe-Dib8nPCd.js";import{h as p,H as o}from"./index-BrURP0OY.js";import{A as i}from"./queries-Bik5e3WR.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-m2ojaw3n.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BhqFHsFy.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-cCi0KcSJ.js";import"./useSelectedSak-RFtfQODM.js";import"./useQuery-CZ4QNHCz.js";import"./sakerUtils-BPTee7Vw.js";import"./Snarveier-C868I0fT.js";import"./LenkePanel-7U0XSOHl.js";import"./index-D87WEy0j.js";import"./Header-KgbOx2gZ.js";import"./LayoutWrapper-Baf7as36.js";import"./StatusTag-BUHKYnuU.js";import"./Tag-DHZzuPUy.js";import"./Stroller-Cmn9Neus.js";import"./NoeGikkGalt-D1faA3xU.js";import"./skjemanummer-DT6QFji2.js";import"./MinidialogSkjema-Br7cG9H1.js";import"./HarIkkeSaker-UCYU-dIv.js";import"./SøkelenkerPanel-tb_23aIT.js";import"./HarSaker-Bi09yLwe.js";import"./SakLink-SWn65jyo.js";import"./guid-CsArkN6i.js";import"./ContentSection-CqrMxuqt.js";import"./BekreftelseSendtSøknad-D-D8qc2h.js";import"./KontonummerInfo-C8zqKUWE.js";import"./Accordion-D1LyrSy3.js";import"./Svangerskapspenger-DJik5uQS.js";import"./DinPlan-BwBHHpFG.js";import"./Oppgaver-MJjrl_Pn.js";import"./OppgaveLenkepanel-CJzAqjuv.js";import"./KontaktOss-BaIVzbSL.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
