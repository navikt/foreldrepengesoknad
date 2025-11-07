import{i as g,j as t}from"./iframe-DqM_U5bt.js";import{h as p,H as o}from"./index-YjCW9cp3.js";import{A as i}from"./queries-DpjHa_ad.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-kMX9tjX_.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-Cx3ZL2s4.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BFMBgoIx.js";import"./useSelectedSak-3EA5VjAa.js";import"./useQuery-CuTRAVAy.js";import"./sakerUtils-R9VPLdmW.js";import"./Snarveier-C-FJer0R.js";import"./LenkePanel-VqwbXGaW.js";import"./index-Dmxwyr-p.js";import"./Header-C6D744Do.js";import"./LayoutWrapper-DTEK7nvp.js";import"./StatusTag-BTGXmct5.js";import"./Tag-DeGVqK8t.js";import"./Stroller-yfw_gxLe.js";import"./NoeGikkGalt-Dg3Ds0hh.js";import"./MinidialogSkjema-B48hiHzg.js";import"./skjemanummer-DywuPcs5.js";import"./HarIkkeSaker-DY1r8Adq.js";import"./SøkelenkerPanel-BCnEO0GJ.js";import"./HarSaker-B02z2C2K.js";import"./SakLink-Bcw09vkc.js";import"./guid-CsArkN6i.js";import"./ContentSection-CQZPSm-Z.js";import"./BekreftelseSendtSøknad-Dx9uoyRw.js";import"./KontonummerInfo-CuI4UGOs.js";import"./Accordion-X0QqF6E0.js";import"./Svangerskapspenger-9II2UJvF.js";import"./DinPlan-CRN5wEcb.js";import"./Oppgaver-D6T6nC8v.js";import"./OppgaveLenkepanel-B-HfSr7v.js";import"./KontaktOss-B-NkatEB.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
