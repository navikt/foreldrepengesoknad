import{i as g,j as t}from"./iframe-d0KbCfPB.js";import{h as p,H as o}from"./index-CURF-JvF.js";import{A as i}from"./api--iiU2iom.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-hVo5YUP5.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BdxdPsvR.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DVG8efUQ.js";import"./useSelectedSak-CJMWHVTL.js";import"./useQuery-AzDQctEn.js";import"./sakerUtils-DJKyKo15.js";import"./Snarveier-CIdj5h9G.js";import"./LenkePanel-DxHjdRo8.js";import"./index-DAvHPrvq.js";import"./Header-DTnNmcCL.js";import"./LayoutWrapper-Bssz12tf.js";import"./StatusTag-Fu9p2vny.js";import"./Tag-DytQfDDu.js";import"./Stroller-HgpLYbjH.js";import"./NoeGikkGalt-CjCCJKZE.js";import"./MinidialogSkjema-C3A5Yf-Z.js";import"./skjemanummer-DGv5j9CT.js";import"./HarIkkeSaker-DnVh_mho.js";import"./SøkelenkerPanel-BbG-LWKG.js";import"./HarSaker-HzCremuC.js";import"./SakLink-DwMP2o8U.js";import"./guid-CsArkN6i.js";import"./ContentSection-CRYRFvn4.js";import"./BekreftelseSendtSøknad-CJ76HJLO.js";import"./KontonummerInfo-DgWmZTwE.js";import"./Accordion-qJaU7jTU.js";import"./Svangerskapspenger-Dax61RPy.js";import"./DinPlan-DhYvhh8c.js";import"./Oppgaver-hzYbyl0s.js";import"./OppgaveLenkepanel-DrSzFFNZ.js";import"./KontaktOss-Bipe2A9t.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
