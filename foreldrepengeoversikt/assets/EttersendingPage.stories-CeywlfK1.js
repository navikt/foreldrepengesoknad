import{i as g,j as t}from"./iframe-ewta0zoB.js";import{h as p,H as o}from"./index-DYBx3BJA.js";import{A as i}from"./queries-C21Jq0o5.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-nWcPGQZX.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-CZRXR8Oi.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-C3FyfSYs.js";import"./useSelectedSak-C5HrQucG.js";import"./useQuery-BMkCW8yb.js";import"./sakerUtils-abk-UzAL.js";import"./Snarveier-CCosxwoz.js";import"./LenkePanel-CnZRGzcN.js";import"./index-DJHXksu0.js";import"./Header-DYpOQRZc.js";import"./LayoutWrapper-BP5p28Vx.js";import"./StatusTag-CeTr9WS2.js";import"./Tag-DvP8raPO.js";import"./Stroller-Dk3WdcPO.js";import"./NoeGikkGalt-BrIfG0Bn.js";import"./skjemanummer-Cw1q8QEH.js";import"./MinidialogSkjema-BnzrnENN.js";import"./HarIkkeSaker-BhcIwSZ8.js";import"./SøkelenkerPanel-CAn8LAJp.js";import"./HarSaker-4YWI71Bo.js";import"./SakLink-jt55ibW3.js";import"./guid-CsArkN6i.js";import"./ContentSection-COhmy0Xe.js";import"./BekreftelseSendtSøknad-BDVsEicl.js";import"./KontonummerInfo-DMVi81gc.js";import"./Accordion-CfMuXmwj.js";import"./Svangerskapspenger-DP8pYzEP.js";import"./DinPlan-B8M1APNT.js";import"./Oppgaver-BE-H1CGp.js";import"./OppgaveLenkepanel-DzE9g4fK.js";import"./KontaktOss-DCtT5Yad.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
