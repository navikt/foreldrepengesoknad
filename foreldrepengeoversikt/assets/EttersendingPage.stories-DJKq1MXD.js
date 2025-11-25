import{i as g,j as t}from"./iframe-DuNHQlgM.js";import{h as p,H as o}from"./index-DREpVBse.js";import{A as i}from"./queries-BeaI5UYU.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DM26VzAh.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-i6z-Kvj6.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Cb8Fijkl.js";import"./useSelectedSak-Cirvcyrx.js";import"./useQuery-FFS1Ogu0.js";import"./sakerUtils-CmsvQISu.js";import"./Snarveier-ChvL2wOb.js";import"./LenkePanel-CDOcgycT.js";import"./index-Buw3NpkP.js";import"./Header-CDd3t9Uz.js";import"./LayoutWrapper-BL8vpkku.js";import"./StatusTag-D_hPWrh7.js";import"./Tag-Du0PtxmP.js";import"./Stroller-DZ5MYcD-.js";import"./NoeGikkGalt-CiwI4Bz_.js";import"./skjemanummer-DMRrM2Xo.js";import"./MinidialogSkjema-y-LJmyoB.js";import"./HarIkkeSaker-BcWU775v.js";import"./SøkelenkerPanel-Bj5ETiZT.js";import"./HarSaker-Bmylww36.js";import"./SakLink-D9Dqx7IA.js";import"./guid-CsArkN6i.js";import"./ContentSection-DRRCxbC2.js";import"./BekreftelseSendtSøknad-mdAHOZfH.js";import"./KontonummerInfo-Dc3hxgvS.js";import"./Accordion-3EDIoWN6.js";import"./Svangerskapspenger-C8bPJL7N.js";import"./DinPlan-5zzvLzHZ.js";import"./Oppgaver-BM-_Z3Ht.js";import"./OppgaveLenkepanel-ZCS12Mzq.js";import"./KontaktOss-NAFhNME9.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
