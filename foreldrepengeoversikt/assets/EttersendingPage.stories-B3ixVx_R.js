import{i as g,j as t}from"./iframe-CHBp5mco.js";import{h as p,H as o}from"./index-CJJeQPEj.js";import{A as i}from"./queries-BnhuEqMy.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-ZDRBsb2A.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX--rKPn0a_.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-UUaTUeBb.js";import"./useSelectedSak-CyRvXztB.js";import"./useQuery-C8HnQlxs.js";import"./sakerUtils-CHz1qe4r.js";import"./Snarveier-BLXhjx84.js";import"./LenkePanel-BzMd5jfj.js";import"./index-8OSy6IaS.js";import"./Header-Dvajy6ge.js";import"./LayoutWrapper-CbgtK21Y.js";import"./StatusTag-CAnZD10P.js";import"./Tag-Bi1sbKuY.js";import"./Stroller-DGgUmXrs.js";import"./NoeGikkGalt-5FtpipOA.js";import"./skjemanummer-DPb0bvUi.js";import"./MinidialogSkjema-D4gs2ORm.js";import"./HarIkkeSaker-CPyAJrUD.js";import"./SøkelenkerPanel-39SzvSqE.js";import"./HarSaker-Cp6WSgjy.js";import"./SakLink-CJg4CCGo.js";import"./guid-CsArkN6i.js";import"./ContentSection-CzMnkoWk.js";import"./BekreftelseSendtSøknad-DXKH1F95.js";import"./KontonummerInfo-CamQ_C8U.js";import"./Accordion-BwEcU_B4.js";import"./Svangerskapspenger-XGwXudBQ.js";import"./DinPlan-Cps6-Hlj.js";import"./Oppgaver-Dk-3Kifi.js";import"./OppgaveLenkepanel-BXEVrtbq.js";import"./KontaktOss-Cl_D56cL.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
