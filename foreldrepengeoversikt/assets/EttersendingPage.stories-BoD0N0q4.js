import{k as g,j as t}from"./iframe-ayp1PzFf.js";import{h as p,H as o}from"./index-CNNYLOy9.js";import{A as i}from"./queries-DuxThL6Y.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-TePXYqw8.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BrnYPrRp.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DLE2PSla.js";import"./useSelectedSak-BiLpQkD6.js";import"./useQuery-DXoGNzGK.js";import"./sakerUtils-Cg_gqxLL.js";import"./Snarveier-C0O8v0Sz.js";import"./LenkePanel-BOs1hnt6.js";import"./index-DPQhQYxe.js";import"./Header-r3wz7UWd.js";import"./LayoutWrapper-CMvptx-F.js";import"./StatusTag-BV5jUjoJ.js";import"./Tag-BWqVFnEz.js";import"./Stroller-BsTgCQks.js";import"./NoeGikkGalt-CzzmqoIp.js";import"./skjemanummer-D3J8YM8g.js";import"./MinidialogSkjema-BnO2zI-s.js";import"./HarIkkeSaker-CivubPkR.js";import"./SøkelenkerPanel-dREjNWki.js";import"./HarSaker-Bd1DTMMY.js";import"./SakLink-BtsJWURr.js";import"./guid-CsArkN6i.js";import"./ContentSection-DS0OB5wD.js";import"./BekreftelseSendtSøknad-Bpi3cdvG.js";import"./KontonummerInfo-lgNoYIAa.js";import"./Accordion-CYUbFKS_.js";import"./Svangerskapspenger-IjjQEpCm.js";import"./DinPlan-C6hDUnug.js";import"./Oppgaver-CugTXTc4.js";import"./OppgaveLenkepanel-CAaLUA6k.js";import"./KontaktOss-DPqnpPoI.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
