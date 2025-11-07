import{i as g,j as t}from"./iframe-Ddv1Eb5y.js";import{h as p,H as o}from"./index-BAI9lvGD.js";import{A as i}from"./api-71hnFjKz.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BPAiM2KK.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-wP84C7d9.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-C0KErJri.js";import"./useSelectedSak-BY605qkA.js";import"./useQuery-cSS-AcSa.js";import"./sakerUtils-ni9FgGa9.js";import"./Snarveier-D2aptKrL.js";import"./LenkePanel-DEPZmPuX.js";import"./index-Dd_1t9FR.js";import"./Header-DpTDGTFA.js";import"./LayoutWrapper-_hWZ84UE.js";import"./StatusTag-BSQ7Y80Y.js";import"./Tag-DnITFdR2.js";import"./Stroller-B-b5oIPB.js";import"./NoeGikkGalt-C7zsR2o0.js";import"./MinidialogSkjema-pMj4Etqc.js";import"./skjemanummer-Bs1vQB8m.js";import"./HarIkkeSaker-C4QZnxgu.js";import"./SøkelenkerPanel-B-mxSktB.js";import"./HarSaker-B5ch9qes.js";import"./SakLink-B8VYY4H5.js";import"./guid-CsArkN6i.js";import"./ContentSection-BcxGJmRw.js";import"./BekreftelseSendtSøknad-ByP5RD_b.js";import"./KontonummerInfo-Dt2_0TvU.js";import"./Accordion-Ds-vDjDA.js";import"./Svangerskapspenger-vpbqSXbS.js";import"./DinPlan-Cp7XRcRa.js";import"./Oppgaver-DjeJ3z4U.js";import"./OppgaveLenkepanel-CIPpedfB.js";import"./KontaktOss-CK48BzLA.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
