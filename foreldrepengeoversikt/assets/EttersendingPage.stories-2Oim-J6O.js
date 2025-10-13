import{i as g,j as t}from"./iframe-V8Dp4QW5.js";import{h as p,H as o}from"./index-H8_vY0zy.js";import{A as m}from"./api-DttI5pae.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-D6Npo6sC.js";import{M as u,R as k,a as c}from"./chunk-TMI4QPZX-D3gIy50c.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-03FOBSty.js";import"./useSelectedSak-4hRGJq8p.js";import"./useQuery-D0cJSrDC.js";import"./sakerUtils-DfWZRngC.js";import"./Snarveier-D6jGLqPI.js";import"./LenkePanel-DLDRkz7p.js";import"./index-BpMDWgtc.js";import"./Dokument-NYUNmoCr.js";import"./dokumenterUtils-ID-p_N4Y.js";import"./Tag-ZC2hYRMp.js";import"./GrupperteDokumenter-DfSto9Uc.js";import"./guid-CsArkN6i.js";import"./Accordion-CB83Ignc.js";import"./Header-BxepwnHK.js";import"./LayoutWrapper-Dngjcj2A.js";import"./StatusTag-BMKINm4X.js";import"./Stroller-6d1RPYmE.js";import"./NoeGikkGalt-DHpAyMxT.js";import"./MinidialogSkjema-DfFPftox.js";import"./skjemanummer-BI9f7GfG.js";import"./BekreftelseSendtSøknad-D0Qqi2pb.js";import"./KontonummerInfo-CXf0Z14b.js";import"./HarIkkeSaker-CUAEXY0f.js";import"./SøkelenkerPanel-BxtniV6f.js";import"./HarSaker-BFfIttpY.js";import"./SakLink-Bo_lmf-r.js";import"./ContentSection-B_EhtPdC.js";import"./Svangerskapspenger-CO9WFxoz.js";import"./DinPlan-D36wGjXx.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-CHDxg1M3.js";import"./OppgaveLenkepanel-VNbUfY_b.js";import"./KontaktOss-CK9ny5_k.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:i=>{const{skjematypeQueryParamValue:s,...l}=i,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(c,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(m.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.lastOppESVedlegg, () => {
        return new HttpResponse(null, {
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
}`,...r.parameters?.docs?.source}}};const se=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,se as __namedExportsOrder,re as default};
