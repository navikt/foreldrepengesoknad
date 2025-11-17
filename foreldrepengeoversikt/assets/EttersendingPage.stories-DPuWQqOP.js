import{i as g,j as t}from"./iframe-DciAJoi2.js";import{h as p,H as o}from"./index-CuUc4VtS.js";import{A as i}from"./queries-DlC6G1g0.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-rtU7yS2I.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-ByMFDuX6.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Bgl9E30j.js";import"./useSelectedSak-DTu_ZQxA.js";import"./useQuery-DdEpYcWW.js";import"./sakerUtils-BCpfKy5e.js";import"./Snarveier-kIHKShoc.js";import"./LenkePanel-Bgufw8KJ.js";import"./index-0uH7i8yE.js";import"./Header-BggKAvJb.js";import"./LayoutWrapper-DEGQF4eV.js";import"./StatusTag-DaCjqPMf.js";import"./Tag-cE1opVQR.js";import"./Stroller-DnbSLXO4.js";import"./NoeGikkGalt-Dm8cpRe2.js";import"./skjemanummer-Khn0equI.js";import"./MinidialogSkjema-Bb7vR15B.js";import"./HarIkkeSaker-Cq7Mw3OU.js";import"./SøkelenkerPanel-DP-w2Jlg.js";import"./HarSaker-XTEa5Zhc.js";import"./SakLink-DsL3OYSL.js";import"./guid-CsArkN6i.js";import"./ContentSection-LrJODwAj.js";import"./BekreftelseSendtSøknad-CBsMNl-c.js";import"./KontonummerInfo-wizhK0FS.js";import"./Accordion-CGnbs7lj.js";import"./Svangerskapspenger-DvTP7_zS.js";import"./DinPlan-BPSJ2gsw.js";import"./Oppgaver-CbEHHwgO.js";import"./OppgaveLenkepanel-BayST8Md.js";import"./KontaktOss-BT4psjPX.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
