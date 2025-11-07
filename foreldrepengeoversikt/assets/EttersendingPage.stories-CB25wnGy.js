import{i as g,j as t}from"./iframe-CwWGaVFp.js";import{h as p,H as o}from"./index-B9wFUyq_.js";import{A as i}from"./api-D7VtPm8D.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DE5JTBs2.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-ijf6aAfq.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-CNFEstdS.js";import"./useSelectedSak-CsDhGMFh.js";import"./useQuery-CHgC96rM.js";import"./sakerUtils-B2_fJNwz.js";import"./Snarveier-B-M0U2Hv.js";import"./LenkePanel-Dpk55qcL.js";import"./index-CNwMK5ou.js";import"./Header-BCsW5RSr.js";import"./LayoutWrapper-BcS_ltkG.js";import"./StatusTag-DlLwCpNd.js";import"./Tag-CisJo6D3.js";import"./Stroller-BwI58iuk.js";import"./NoeGikkGalt-JtfKaRrq.js";import"./MinidialogSkjema-B74Ecj1O.js";import"./skjemanummer-CHRUyD7d.js";import"./HarIkkeSaker-Cxllsnxz.js";import"./SøkelenkerPanel-ChDOLg3c.js";import"./HarSaker-CVGv45-Y.js";import"./SakLink-BZfnMUqD.js";import"./guid-CsArkN6i.js";import"./ContentSection-BwUwbKCV.js";import"./BekreftelseSendtSøknad-3le9-Phw.js";import"./KontonummerInfo-C3BJE5MV.js";import"./Accordion-kbmQyyeM.js";import"./Svangerskapspenger-C_ACdvqb.js";import"./DinPlan-BK5DolSC.js";import"./Oppgaver-D-cBYTfK.js";import"./OppgaveLenkepanel-7K5wpXYU.js";import"./KontaktOss-BgXcoXFM.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
