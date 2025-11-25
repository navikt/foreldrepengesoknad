import{i as g,j as t}from"./iframe-DfhuOm1p.js";import{h as p,H as o}from"./index-DcuUSPxh.js";import{A as i}from"./queries-CoKyF7VU.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Cu57kEJ3.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-Cz6h9mYr.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DXbtYaFH.js";import"./useSelectedSak-BqcLUMeI.js";import"./useQuery-CqrCJ8LB.js";import"./sakerUtils-D2sBMFwH.js";import"./Snarveier-BOYFvx8N.js";import"./LenkePanel-DQ0jg2Ni.js";import"./index-C1vfcNr4.js";import"./Header-olX_p8xI.js";import"./LayoutWrapper-CM033Nnl.js";import"./StatusTag-3Vqj1GPt.js";import"./Tag-DP0VEkHF.js";import"./Stroller-DopqtxAp.js";import"./NoeGikkGalt-DHljLYXs.js";import"./skjemanummer-Ce6nUcUV.js";import"./MinidialogSkjema-B-lS53OZ.js";import"./HarIkkeSaker-jNnZq5CG.js";import"./SøkelenkerPanel-Bl-Rdn80.js";import"./HarSaker-BRUtCND4.js";import"./SakLink-YLPvHyrl.js";import"./guid-CsArkN6i.js";import"./ContentSection-C0dV7j91.js";import"./BekreftelseSendtSøknad-BplLVhO2.js";import"./KontonummerInfo-DUc_Uixo.js";import"./Accordion-C_BYjU94.js";import"./Svangerskapspenger-7eXEL1S5.js";import"./DinPlan-CixsWM-j.js";import"./Oppgaver-BaNg31iW.js";import"./OppgaveLenkepanel-BBgHXCc8.js";import"./KontaktOss-bWGH_Hl6.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
