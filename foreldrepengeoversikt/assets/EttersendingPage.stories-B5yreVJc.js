import{i as g,j as t}from"./iframe-DeMdVyFz.js";import{h as p,H as o}from"./index-DFxF8LTV.js";import{A as i}from"./api-CTIc8dU1.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-RRoxTlZ5.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-B8o3QBJc.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-CGjg97Uv.js";import"./useSelectedSak-B43wDVhB.js";import"./useQuery-BVsQ5Qo4.js";import"./sakerUtils-CGZCxgOb.js";import"./Snarveier-BlVkb3kk.js";import"./LenkePanel-9SRWpbrR.js";import"./index-p-IrSs3w.js";import"./Header-Bawpcy7T.js";import"./LayoutWrapper-Dvhpr5mW.js";import"./StatusTag-7Fi4dN2_.js";import"./Tag-B7QtLav8.js";import"./Stroller-CqCHd3u8.js";import"./NoeGikkGalt-kjfJ13xG.js";import"./MinidialogSkjema-CECB1mwg.js";import"./skjemanummer-DbHCJ3yV.js";import"./HarIkkeSaker-D6xalwPN.js";import"./SøkelenkerPanel-DWosoRj4.js";import"./HarSaker-O9X1xpRL.js";import"./SakLink-Dcd5ZEsU.js";import"./guid-CsArkN6i.js";import"./ContentSection-Bzb957AZ.js";import"./BekreftelseSendtSøknad-bKMO9Ay0.js";import"./KontonummerInfo-CHwWxxZ8.js";import"./Accordion-DPJOPdDZ.js";import"./Svangerskapspenger-BTOCcvS6.js";import"./DinPlan-CNXy-J6N.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-DZeFTbxQ.js";import"./OppgaveLenkepanel-DaqFCHHM.js";import"./KontaktOss-bZh-AyLo.js";const Z={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const ee=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,ee as __namedExportsOrder,Z as default};
