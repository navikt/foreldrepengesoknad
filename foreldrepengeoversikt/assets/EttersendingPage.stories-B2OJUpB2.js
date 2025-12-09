import{k as g,j as t}from"./iframe-D4MaBo8z.js";import{h as p,H as o}from"./index-Hz_o_Ksc.js";import{A as i}from"./queries-rY99v0P-.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CJTIhlc2.js";import{M as u,R as k,a as S}from"./chunk-4WY6JWTD-DJiYeedL.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-BruzWLwU.js";import"./useSelectedSak-BajRMK_D.js";import"./useQuery-B8EyUrwq.js";import"./sakerUtils-C4KBCFG5.js";import"./Snarveier-B0s88Rvn.js";import"./LenkePanel-DEWOxbnu.js";import"./index-Byqbr0CG.js";import"./Header-C_PnqEkk.js";import"./LayoutWrapper-DzjaiA_v.js";import"./StatusTag-CHcX7KEY.js";import"./Tag-Dn6c1voi.js";import"./Stroller-L9mjLPbQ.js";import"./NoeGikkGalt-CeDUxIzj.js";import"./skjemanummer-B6yh8RVg.js";import"./MinidialogSkjema-CCR6bz8Y.js";import"./HarIkkeSaker-lxZ5wzEK.js";import"./SøkelenkerPanel-AmfUrGbF.js";import"./HarSaker-BQjc3hkF.js";import"./SakLink-D3v5g8lq.js";import"./guid-CsArkN6i.js";import"./ContentSection-BbvDRzvl.js";import"./BekreftelseSendtSøknad-CnW7gAHw.js";import"./KontonummerInfo-BMr3HoJg.js";import"./Accordion-CfqpomoK.js";import"./Svangerskapspenger-CeUziRF0.js";import"./DinPlan-CWEYf-uA.js";import"./Oppgaver-BKRqGN7r.js";import"./OppgaveLenkepanel-Jh4_Xt3G.js";import"./KontaktOss-CibxkCXx.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
