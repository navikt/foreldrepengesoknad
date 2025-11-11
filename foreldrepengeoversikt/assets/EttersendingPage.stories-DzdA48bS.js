import{i as g,j as t}from"./iframe-s4H1Tq5J.js";import{h as p,H as o}from"./index-C2i2nN31.js";import{A as i}from"./queries-CUHU1KgR.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DkMB9sLU.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BIbgi1Jp.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-CkYxMiOV.js";import"./useSelectedSak-C02sOleC.js";import"./useQuery-DEALdBVj.js";import"./sakerUtils-BqVJC0P-.js";import"./Snarveier-CScQzwZi.js";import"./LenkePanel-CT05NgkJ.js";import"./index-C4rwrMSG.js";import"./Header-C4HPWX5q.js";import"./LayoutWrapper-DIwVAKFm.js";import"./StatusTag-DKlcTa-F.js";import"./Tag-B6H9AoRE.js";import"./Stroller-1aCT9EOg.js";import"./NoeGikkGalt-qIOPFk3f.js";import"./MinidialogSkjema-D-4lfSYu.js";import"./skjemanummer-DWoI4lDE.js";import"./HarIkkeSaker-Dh9VH981.js";import"./SøkelenkerPanel-DL1-xEdr.js";import"./HarSaker-DTwuRtCu.js";import"./SakLink-cTjAfUX5.js";import"./guid-CsArkN6i.js";import"./ContentSection-KP6pDO8d.js";import"./BekreftelseSendtSøknad-Cw_6CP-y.js";import"./KontonummerInfo-CzZ591g0.js";import"./Accordion-DhrabKwy.js";import"./Svangerskapspenger-jOVuxcIO.js";import"./DinPlan-O385iEEt.js";import"./Oppgaver-kVUzLV2Q.js";import"./OppgaveLenkepanel-CX_ekNw8.js";import"./KontaktOss-cx7MV-yi.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
