import{k as g,j as t}from"./iframe-BW2kkloK.js";import{h as p,H as o}from"./index-ckIuG0f7.js";import{A as i}from"./queries-e80APyLi.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-oIMMhrFa.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-DszEz1w8.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BtdIGEUa.js";import"./useSelectedSak-DNMwSOm3.js";import"./useQuery-B_20SOib.js";import"./sakerUtils-BXXgOMCH.js";import"./Snarveier-Cp_8_J79.js";import"./LenkePanel-BoTurx8t.js";import"./index-CP1B94P8.js";import"./Header-FtP50E7s.js";import"./LayoutWrapper-C_UQdFxB.js";import"./StatusTag-Cez_dqMK.js";import"./Tag-CSTqE-pc.js";import"./Stroller-BVlMcXZ-.js";import"./NoeGikkGalt-ClrU0XSV.js";import"./skjemanummer-DQ9teum_.js";import"./MinidialogSkjema-DQbuCI6j.js";import"./HarIkkeSaker-zsTEFAd2.js";import"./SøkelenkerPanel-0sdaaZIs.js";import"./HarSaker-B0w4XXtH.js";import"./SakLink-BP4P4Zmo.js";import"./guid-CsArkN6i.js";import"./ContentSection-CWyBn3xH.js";import"./BekreftelseSendtSøknad-ChH1_b9u.js";import"./KontonummerInfo-DYQXMZLa.js";import"./Accordion-Cb-nQoiO.js";import"./Svangerskapspenger-Bd471K9H.js";import"./DinPlan-BEjw_Y4n.js";import"./Oppgaver-DmwAPT7-.js";import"./OppgaveLenkepanel-COfv4noV.js";import"./KontaktOss-B-5PFWSD.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
