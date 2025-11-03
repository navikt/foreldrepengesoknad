import{i as g,j as t}from"./iframe-BKI6cC33.js";import{h as p,H as o}from"./index-DL3Hp0SN.js";import{A as i}from"./api-D-TdPrIH.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DCpxql6H.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-Cn2WmO03.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DRM2Zd0c.js";import"./useSelectedSak-CvPGv6z3.js";import"./useQuery-B1In-Ozd.js";import"./sakerUtils-B0FWqSnv.js";import"./Snarveier-ZHnGXouo.js";import"./LenkePanel-BVwxfvRf.js";import"./index-k6Agq-rz.js";import"./Header-CReTPVUH.js";import"./LayoutWrapper-BxHhnlHx.js";import"./StatusTag-CDQY1gX9.js";import"./Tag-D9FY2zAl.js";import"./Stroller-DvpFQKjQ.js";import"./NoeGikkGalt-DwP6GmDd.js";import"./MinidialogSkjema-CPnqzIRY.js";import"./skjemanummer-t4pygZKr.js";import"./HarIkkeSaker-CH6e6sp7.js";import"./SøkelenkerPanel-DT5bZnOK.js";import"./HarSaker-AHClvLkF.js";import"./SakLink-CEzn-0AR.js";import"./guid-CsArkN6i.js";import"./ContentSection-DKGMaT-l.js";import"./BekreftelseSendtSøknad-DiBlUerl.js";import"./KontonummerInfo-vRnpjbmi.js";import"./Accordion-E6Qlxw5e.js";import"./Svangerskapspenger-D9SxNrC3.js";import"./DinPlan-BMD27JoB.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-Csl9XkFh.js";import"./OppgaveLenkepanel-BvztiMSJ.js";import"./KontaktOss-RCq96gfb.js";const Z={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
