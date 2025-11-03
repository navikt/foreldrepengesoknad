import{i as g,j as t}from"./iframe-Bmlf-17G.js";import{h as p,H as o}from"./index-CfbI1xII.js";import{A as i}from"./api-CDjlA43A.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DJExWflL.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BiBQCdcs.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DdEGTa0o.js";import"./useSelectedSak-D9nn8f46.js";import"./useQuery-CehYOWyP.js";import"./sakerUtils-BaiOTc54.js";import"./Snarveier-rZRw7Cl8.js";import"./LenkePanel-DBAT81SE.js";import"./index-Bo08OCAU.js";import"./Header-CzlbGrQ_.js";import"./LayoutWrapper-BFeTr1RZ.js";import"./StatusTag-Cwd9YMtN.js";import"./Tag-C8FrgaZT.js";import"./Stroller-DPOjBTxc.js";import"./NoeGikkGalt-xvngV7fg.js";import"./MinidialogSkjema-fiKuneX7.js";import"./skjemanummer-B9qltKdz.js";import"./HarIkkeSaker-B2ollwcr.js";import"./SøkelenkerPanel-Dp4Cn8eA.js";import"./HarSaker-DnH4ti8B.js";import"./SakLink-CJ3w6lxb.js";import"./guid-CsArkN6i.js";import"./ContentSection-mO2Cfx5N.js";import"./BekreftelseSendtSøknad-BBC-DRsn.js";import"./KontonummerInfo-in0u2e7J.js";import"./Accordion-Co6cjIx5.js";import"./Svangerskapspenger-BFAsuM71.js";import"./DinPlan-Dke7oFMw.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-CIPYmKpK.js";import"./OppgaveLenkepanel-Dz5A6g9b.js";import"./KontaktOss-PuJUxL0q.js";const Z={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const ee=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,ee as __namedExportsOrder,Z as default};
