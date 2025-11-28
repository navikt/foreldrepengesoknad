import{k as g,j as t}from"./iframe-CkO2BxIM.js";import{h as p,H as o}from"./index-lXDJA5cK.js";import{A as i}from"./queries-CBn9MapI.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-C4MSJWUT.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BG7iv1IQ.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-BgXOUJCH.js";import"./useSelectedSak-Cb3uTSxF.js";import"./useQuery-BkCXl_YK.js";import"./sakerUtils-CIuOUtuB.js";import"./Snarveier-BzgDWER_.js";import"./LenkePanel-D_Y1KnD1.js";import"./index-B5VWAz0p.js";import"./Header-CPHaG3j0.js";import"./LayoutWrapper-DQejaoLO.js";import"./StatusTag-Cv5wCvgQ.js";import"./Tag-rXPF2e-c.js";import"./Stroller-BDtCI11F.js";import"./NoeGikkGalt-DU0NZcGb.js";import"./skjemanummer-Dg0BRpJr.js";import"./MinidialogSkjema-CqQGiXY0.js";import"./HarIkkeSaker-D00iyc8e.js";import"./SøkelenkerPanel-BRv6Gltd.js";import"./HarSaker-Cj8KX7Sc.js";import"./SakLink-CH0KsLA4.js";import"./guid-CsArkN6i.js";import"./ContentSection-BXrBK2H7.js";import"./BekreftelseSendtSøknad-vXN_DWr1.js";import"./KontonummerInfo-Dz3nUj9O.js";import"./Accordion-D2zOtfE3.js";import"./Svangerskapspenger-vu6NxAlZ.js";import"./DinPlan-C8Iy1xIw.js";import"./Oppgaver-Dwq7raX8.js";import"./OppgaveLenkepanel-CegIj_4c.js";import"./KontaktOss-Bk84j2A5.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
