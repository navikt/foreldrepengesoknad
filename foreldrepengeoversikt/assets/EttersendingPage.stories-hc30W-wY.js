import{i as g,j as t}from"./iframe-C7kAMEAX.js";import{h as p,H as o}from"./index-Db3Bve8Q.js";import{A as i}from"./queries-CeHDg64a.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Pv66CvEg.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-DGzXH5et.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-6Rteel5-.js";import"./useSelectedSak-CfSEceDb.js";import"./useQuery-CTCyKfzH.js";import"./sakerUtils-CoPWIg_G.js";import"./Snarveier-De1pUKlA.js";import"./LenkePanel-BJIpCzd_.js";import"./index-dIqq18xe.js";import"./Header-DD-nM3oh.js";import"./LayoutWrapper-MSBd1jyg.js";import"./StatusTag-ChtV2VL9.js";import"./Tag-BbRSovK_.js";import"./Stroller-CG0iAFOE.js";import"./NoeGikkGalt-BvKUW3x2.js";import"./skjemanummer-tpE1bfLd.js";import"./MinidialogSkjema-C5w-PDHy.js";import"./HarIkkeSaker-C0f_jNhn.js";import"./SøkelenkerPanel-9Snsl_3G.js";import"./HarSaker-Vbfq9qE3.js";import"./SakLink-B1k_0Gdc.js";import"./guid-CsArkN6i.js";import"./ContentSection-Cix9nrv_.js";import"./BekreftelseSendtSøknad-CyQmlW3x.js";import"./KontonummerInfo-BNjPt0Aj.js";import"./Accordion-Cu4EY5fK.js";import"./Svangerskapspenger-CyvKqwnG.js";import"./DinPlan-L1jUZYrq.js";import"./Oppgaver-CoaNVJRV.js";import"./OppgaveLenkepanel-DgwVpxlO.js";import"./KontaktOss-KW9UfMNw.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
