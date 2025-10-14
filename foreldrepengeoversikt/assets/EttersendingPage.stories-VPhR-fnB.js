import{i as g,j as t}from"./iframe-BvSR-m3F.js";import{h as p,H as o}from"./index-BtiK5rHz.js";import{A as m}from"./api-PydfH6DI.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-M1452uW4.js";import{M as u,R as k,a as c}from"./chunk-TMI4QPZX-rxwT3Z_i.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BlWmBJxi.js";import"./useSelectedSak-BmuGxmnj.js";import"./useQuery-BNaPzlzC.js";import"./sakerUtils-BStJlMUJ.js";import"./Snarveier-C2SGFbhz.js";import"./LenkePanel-BQ_tNBkD.js";import"./index-BMicn4Ah.js";import"./Dokument-B6-rEyig.js";import"./dokumenterUtils-DVH_5SAA.js";import"./Tag-BxnLPIjr.js";import"./GrupperteDokumenter-DkYWJpk9.js";import"./guid-CsArkN6i.js";import"./Accordion-C8RDjd_g.js";import"./Header-D-jEuxg0.js";import"./LayoutWrapper-CIiNZjDE.js";import"./StatusTag-mMYH377D.js";import"./Stroller-C0Sw-scp.js";import"./NoeGikkGalt-BZCBpm34.js";import"./MinidialogSkjema-DStQIrud.js";import"./skjemanummer-e-Gguhnk.js";import"./BekreftelseSendtSøknad-DT9NLj8G.js";import"./KontonummerInfo-C7yLcuso.js";import"./HarIkkeSaker-DCuT0mtm.js";import"./SøkelenkerPanel-c-QTrKhQ.js";import"./HarSaker-DdsyQKum.js";import"./SakLink-Cu78paHP.js";import"./ContentSection-CdcRt23w.js";import"./Svangerskapspenger-ClfALl-3.js";import"./DinPlan-CsxGqnDT.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-DTxGjN57.js";import"./OppgaveLenkepanel-Dv0atYx3.js";import"./KontaktOss-ClM9DgGN.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:i=>{const{skjematypeQueryParamValue:s,...l}=i,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(c,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.lastOppESVedlegg, () => {
        return new HttpResponse(null, {
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
}`,...r.parameters?.docs?.source}}};const se=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,se as __namedExportsOrder,re as default};
