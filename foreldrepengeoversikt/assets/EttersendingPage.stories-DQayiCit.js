import{i as g,j as t}from"./iframe-DF79Ws_0.js";import{h as p,H as o}from"./index-tIZBiYiI.js";import{A as i}from"./queries-T2SW8QtP.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-B80NyheD.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-Dj4WEaPd.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-ST4Bb1v8.js";import"./useSelectedSak-Bj8uE2ig.js";import"./useQuery-C7Fp_yyc.js";import"./sakerUtils-C8Ka4cNE.js";import"./Snarveier-DXFK-V8j.js";import"./LenkePanel-DNhR2EI3.js";import"./index-CFmTT9U7.js";import"./Header-CmKQq81l.js";import"./LayoutWrapper-DXT2Divy.js";import"./StatusTag-DS3D2bbW.js";import"./Tag-Dy-b5gul.js";import"./Stroller-CLRXVSWG.js";import"./NoeGikkGalt-BoRvvUNR.js";import"./skjemanummer-CFgwQLxs.js";import"./MinidialogSkjema-BToawnGw.js";import"./HarIkkeSaker-CdZHDBhM.js";import"./SøkelenkerPanel-C9PFfIX7.js";import"./HarSaker-CsiPoodi.js";import"./SakLink-CSQnja0-.js";import"./guid-CsArkN6i.js";import"./ContentSection-d8xRI07x.js";import"./BekreftelseSendtSøknad-4U-jf1nM.js";import"./KontonummerInfo--sekSxca.js";import"./Accordion-BV9ZyU8x.js";import"./Svangerskapspenger-7lmI1VmN.js";import"./DinPlan-BOtRptbI.js";import"./Oppgaver-DERS7ZJe.js";import"./OppgaveLenkepanel-BwBAM25w.js";import"./KontaktOss-Bb0OuEqS.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
