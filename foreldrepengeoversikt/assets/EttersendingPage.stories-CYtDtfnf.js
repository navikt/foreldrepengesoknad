import{i as g,j as t}from"./iframe-DwPowOVV.js";import{h as p,H as o}from"./index-Cu2cSMxd.js";import{A as i}from"./queries-C-UvjwXo.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DV33eqdu.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-01WMjudG.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BALHOluf.js";import"./useSelectedSak-DMDQ3yeq.js";import"./useQuery-TgKjqL4Q.js";import"./sakerUtils-B1u19GV9.js";import"./Snarveier-DucbgiOv.js";import"./LenkePanel-tgkVQ2-t.js";import"./index-wUH2xFQ-.js";import"./Header-OvBF5qJ-.js";import"./LayoutWrapper-Dgp-4VBt.js";import"./StatusTag-DrHqD9DI.js";import"./Tag-CPvbeEJV.js";import"./Stroller-BN7TFEMV.js";import"./NoeGikkGalt-CbL2XWqB.js";import"./skjemanummer-BvGvSp0m.js";import"./MinidialogSkjema-C3iY2ovj.js";import"./HarIkkeSaker-BT2nE2YM.js";import"./SøkelenkerPanel-DGXXe3ix.js";import"./HarSaker-DwqW-z-K.js";import"./SakLink-CuF8wnAZ.js";import"./guid-CsArkN6i.js";import"./ContentSection-DmNNoTdd.js";import"./BekreftelseSendtSøknad-CHyfG00p.js";import"./KontonummerInfo-CWc22yrT.js";import"./Accordion-dxeT6pYF.js";import"./Svangerskapspenger-DvVLKmJZ.js";import"./DinPlan-C847alVO.js";import"./Oppgaver-BxVqZbIl.js";import"./OppgaveLenkepanel-Cq9lDp4l.js";import"./KontaktOss-C66Hepff.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
