import{i as g,j as t}from"./iframe-Dn6cQFvE.js";import{h as p,H as o}from"./index-U4dfE7uK.js";import{A as i}from"./queries-D4CHp4Ec.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-G5Bn0psQ.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-_UIE7--9.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-iu_-bsoy.js";import"./useSelectedSak-CzSKkji7.js";import"./useQuery-CFTfs3Cy.js";import"./sakerUtils-DdVwG0Mi.js";import"./Snarveier-rEJSq9bj.js";import"./LenkePanel-zTXR5gCJ.js";import"./index-C9zbidwy.js";import"./Header-CGqcEWp-.js";import"./LayoutWrapper-DGBMSM6Y.js";import"./StatusTag-CQpZI14q.js";import"./Tag-DIAyDZc7.js";import"./Stroller-UwwQOQe7.js";import"./NoeGikkGalt-CyoajXxT.js";import"./skjemanummer-Byx2eKgn.js";import"./MinidialogSkjema-B1u2YjAR.js";import"./HarIkkeSaker-CpJD7ZcN.js";import"./SøkelenkerPanel-CWsDAOs9.js";import"./HarSaker-jdEiVAEF.js";import"./SakLink-xswpYq3e.js";import"./guid-CsArkN6i.js";import"./ContentSection-WolNphwP.js";import"./BekreftelseSendtSøknad-BQQ3wzSg.js";import"./KontonummerInfo-Iy8D4KWf.js";import"./Accordion-BOdn_fc1.js";import"./Svangerskapspenger-BvPlml0T.js";import"./DinPlan-CtOUPzy3.js";import"./Oppgaver-Bq7kwoPY.js";import"./OppgaveLenkepanel-Bs2JsrsT.js";import"./KontaktOss-ZOoG2jC3.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
