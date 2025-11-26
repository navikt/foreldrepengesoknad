import{k as g,j as t}from"./iframe-DRNLMmYE.js";import{h as p,H as o}from"./index-CkkFPX7F.js";import{A as i}from"./queries-BcUe5G4p.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Drly9pVO.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BngKly09.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Dj9Mhw7e.js";import"./useSelectedSak-BxTYm4MN.js";import"./useQuery-Civ8Dnm5.js";import"./sakerUtils-hgp4WW7J.js";import"./Snarveier-E9ExDleI.js";import"./LenkePanel-s6GC44pQ.js";import"./index-DeJTEWpZ.js";import"./Header-DwCdhqXx.js";import"./LayoutWrapper-CrcCcvL2.js";import"./StatusTag-heFK2ndb.js";import"./Tag-D3i_kcKy.js";import"./Stroller-BvnyJIEi.js";import"./NoeGikkGalt-B42Mb4yn.js";import"./skjemanummer-btuYC64-.js";import"./MinidialogSkjema-CJGLC-KC.js";import"./HarIkkeSaker-B8iY7lVU.js";import"./SøkelenkerPanel-CNYihIl5.js";import"./HarSaker-B0eptRDF.js";import"./SakLink-De7BDsoU.js";import"./guid-CsArkN6i.js";import"./ContentSection-Bg42jfKz.js";import"./BekreftelseSendtSøknad-Bz4PYXNm.js";import"./KontonummerInfo-BLE1AQOX.js";import"./Accordion-Bs3Hp_4f.js";import"./Svangerskapspenger-cXcJmkwk.js";import"./DinPlan-D7g6KPAt.js";import"./Oppgaver-C0F7sApH.js";import"./OppgaveLenkepanel-_337-uD2.js";import"./KontaktOss-BBOVwqh8.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
