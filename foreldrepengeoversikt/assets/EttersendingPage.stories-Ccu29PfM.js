import{i as g,j as t}from"./iframe-8octdunc.js";import{h as p,H as o}from"./index-CgAQS0qf.js";import{A as i}from"./api-B5MjB1Ci.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-ByXwypRA.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-DMacgKkH.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-cgOgcG_i.js";import"./useSelectedSak-CBnmZGr5.js";import"./useQuery-CngO3VVu.js";import"./sakerUtils-B96jmMfa.js";import"./Snarveier-CxNPb2lE.js";import"./LenkePanel-BAX145P0.js";import"./index-DHWQH0KD.js";import"./Header-C3nNWT-s.js";import"./LayoutWrapper-lhCmWPRW.js";import"./StatusTag-Brk33Wgh.js";import"./Tag-DRboymZv.js";import"./Stroller-mnKRSd6Y.js";import"./NoeGikkGalt-DsvhU-yy.js";import"./MinidialogSkjema-C-4a8O7f.js";import"./skjemanummer-DrvHvcVS.js";import"./HarIkkeSaker-lchQQuxj.js";import"./SøkelenkerPanel-BE9sKy0n.js";import"./HarSaker-NcIFjw2M.js";import"./SakLink-DX1-SL_8.js";import"./guid-CsArkN6i.js";import"./ContentSection-CZ1LJ9ao.js";import"./BekreftelseSendtSøknad-BXQV-JwV.js";import"./KontonummerInfo-DU8r1qIW.js";import"./Accordion-DODEcJvo.js";import"./Svangerskapspenger-y55MXDdA.js";import"./DinPlan-BJ-1vr9C.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-CwvajHZp.js";import"./OppgaveLenkepanel-DyeIcf0b.js";import"./KontaktOss-B-gUCus5.js";const Z={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
