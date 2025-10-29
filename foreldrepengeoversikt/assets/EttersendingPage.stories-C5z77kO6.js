import{i as g,j as t}from"./iframe-D7iZS0Rl.js";import{h as p,H as o}from"./index-CFwpPAIk.js";import{A as i}from"./api-CPtsqy_l.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DRKesVGD.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-jftRwIVH.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-D-oyw5r5.js";import"./useSelectedSak-umgqoxEt.js";import"./useQuery-D34Jv_RZ.js";import"./sakerUtils-D03rexZS.js";import"./Snarveier-8TbdVO-m.js";import"./LenkePanel-WjwhArpP.js";import"./index-CkwP6fpu.js";import"./Header-3TW0dXMO.js";import"./LayoutWrapper-pQFQVPFR.js";import"./StatusTag-BPYWWCje.js";import"./Tag-CGASHF6_.js";import"./Stroller-BPhpDbi_.js";import"./NoeGikkGalt-CSr3L8Gu.js";import"./MinidialogSkjema-Bx1YyXF7.js";import"./skjemanummer-XA9rDaF0.js";import"./HarIkkeSaker-BgjgEV2n.js";import"./SøkelenkerPanel-1R_Jg1EJ.js";import"./HarSaker-BL92feus.js";import"./SakLink-B_Xo3gS7.js";import"./guid-CsArkN6i.js";import"./ContentSection-TKPcj0RE.js";import"./BekreftelseSendtSøknad-DesujtUl.js";import"./KontonummerInfo-R-2a_Rj0.js";import"./Accordion-DhRMgZlY.js";import"./Svangerskapspenger-IvNJGt4V.js";import"./DinPlan-CynSP_yb.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-1_bMEtO-.js";import"./OppgaveLenkepanel-DoTJpvxn.js";import"./KontaktOss-DPH3V908.js";const Z={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
