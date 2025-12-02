import{k as g,j as t}from"./iframe-C02UIJTn.js";import{h as p,H as o}from"./index-DUkSGXfZ.js";import{A as i}from"./queries-COqXfTKu.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CgPsC5wr.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-E-gqrAOv.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-C3rV0P8u.js";import"./useSelectedSak-2Ofwx3lk.js";import"./useQuery-H3MkfJf0.js";import"./sakerUtils-BohMeg_a.js";import"./Snarveier-BOY-EKs_.js";import"./LenkePanel-BJme2XlG.js";import"./index-DmUSWObV.js";import"./Header-DVHVb14e.js";import"./LayoutWrapper-C061B-Tz.js";import"./StatusTag-CNlJ8qPA.js";import"./Tag-X54_4qSZ.js";import"./Stroller-b6AMemNf.js";import"./NoeGikkGalt-DfLpkz0B.js";import"./skjemanummer-BBw0Pcgg.js";import"./MinidialogSkjema-DrMdHyqI.js";import"./HarIkkeSaker-Cr_DjyQU.js";import"./SøkelenkerPanel-iU5amEz2.js";import"./HarSaker-CsY_OgDa.js";import"./SakLink-Ckxc2lx9.js";import"./guid-CsArkN6i.js";import"./ContentSection-oFmGNg1j.js";import"./BekreftelseSendtSøknad-CE07VIIP.js";import"./KontonummerInfo-DUy74vKx.js";import"./Accordion-BzDuqJ79.js";import"./Svangerskapspenger-DqDdUbJp.js";import"./DinPlan-BLZrmsxf.js";import"./Oppgaver-_48J60dP.js";import"./OppgaveLenkepanel-Drer4Ffb.js";import"./KontaktOss-Brec9b2P.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
