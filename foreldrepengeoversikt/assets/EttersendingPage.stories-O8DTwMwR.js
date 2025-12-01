import{k as g,j as t}from"./iframe-QmW8yyfr.js";import{h as p,H as o}from"./index-DT5H2IQf.js";import{A as i}from"./queries-DNPo2YFS.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BZcZgjzo.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-u_aghOKG.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-DjWI0hr-.js";import"./useSelectedSak-D7g9ouEy.js";import"./useQuery-msRKoXPE.js";import"./sakerUtils-_hwOIFg4.js";import"./Snarveier-CnGI10PA.js";import"./LenkePanel-C7NXbJru.js";import"./index-Bjj7dcVg.js";import"./Header-8ZC1M_C5.js";import"./LayoutWrapper-B06TOb_9.js";import"./StatusTag-DWvD2uob.js";import"./Tag-D5FF978f.js";import"./Stroller-DNw5-FVJ.js";import"./NoeGikkGalt-KcuN262E.js";import"./skjemanummer-WzfyCqW0.js";import"./MinidialogSkjema-QWx-cL-y.js";import"./HarIkkeSaker-4T-ZRBPl.js";import"./SøkelenkerPanel-BXK4Llpu.js";import"./HarSaker-FFN3GHLp.js";import"./SakLink-BwG_j1c2.js";import"./guid-CsArkN6i.js";import"./ContentSection-CtkPnE1R.js";import"./BekreftelseSendtSøknad-CwdduCUa.js";import"./KontonummerInfo-Bh3o7vvO.js";import"./Accordion-Cr3PsVNm.js";import"./Svangerskapspenger-CqLDPov6.js";import"./DinPlan-BraZXQt-.js";import"./Oppgaver-DWjJcew2.js";import"./OppgaveLenkepanel-CMRhuHQY.js";import"./KontaktOss-BREtBSj0.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
