import{k as g,j as t}from"./iframe-C5K0pfAa.js";import{h as p,H as o}from"./index-_RDxWgqM.js";import{A as i}from"./queries-Bs72t_uX.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-WtJ5Xko5.js";import{M as u,R as k,a as S}from"./chunk-4WY6JWTD-DW818KaH.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-DKITaedx.js";import"./useSelectedSak-CjqOLSi1.js";import"./useQuery-CAyY9VHE.js";import"./sakerUtils--JLfMjKW.js";import"./Snarveier-_p4tnoOI.js";import"./LenkePanel-MjN169tg.js";import"./index-Bwi3v650.js";import"./Header-HpZ-2k4r.js";import"./LayoutWrapper-DzqX1ptI.js";import"./StatusTag-YGFuUCqq.js";import"./Tag-D1ZgKTJD.js";import"./Stroller-Dq0WBYAf.js";import"./NoeGikkGalt-jbu2BJhO.js";import"./skjemanummer-FXv7ho88.js";import"./MinidialogSkjema-BHsqxAEu.js";import"./HarIkkeSaker-DkNgUu9X.js";import"./SøkelenkerPanel-nNUYM0Op.js";import"./HarSaker-3dGHOfw1.js";import"./SakLink-DmaM95gr.js";import"./guid-CsArkN6i.js";import"./ContentSection-v-w-UT9o.js";import"./BekreftelseSendtSøknad-mdsAaQgl.js";import"./KontonummerInfo-BozxT7ve.js";import"./Accordion-DdTPF5-o.js";import"./Svangerskapspenger-CLt2ExSN.js";import"./DinPlan-DCvwhn5N.js";import"./Oppgaver-2f2XH_aB.js";import"./OppgaveLenkepanel-DLwUVP0N.js";import"./KontaktOss-soTfvebS.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
