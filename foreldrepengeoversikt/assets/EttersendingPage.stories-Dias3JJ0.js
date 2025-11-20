import{i as g,j as t}from"./iframe-2LNSm3GK.js";import{h as p,H as o}from"./index-gN36rpvM.js";import{A as i}from"./queries-DZ5CsPB9.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Cqqd40pv.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BeqFs-Ce.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Co-cL57n.js";import"./useSelectedSak-BnIfbbVf.js";import"./useQuery-5LifWxEZ.js";import"./sakerUtils-DrojqzxK.js";import"./Snarveier-aZw_eiqw.js";import"./LenkePanel-Ced6YSYd.js";import"./index-B-FyZM74.js";import"./Header-D0cS6PvC.js";import"./LayoutWrapper-DZ4tDOjr.js";import"./StatusTag-vZP6xi9h.js";import"./Tag-fwdj0xxv.js";import"./Stroller-BxsY0id-.js";import"./NoeGikkGalt-Ux4LMPcx.js";import"./skjemanummer-3WnHteED.js";import"./MinidialogSkjema-Dn6rBVai.js";import"./HarIkkeSaker-BZEUs3gR.js";import"./SøkelenkerPanel-Da1LovKr.js";import"./HarSaker-B0g2a28P.js";import"./SakLink-CB9PxaMe.js";import"./guid-CsArkN6i.js";import"./ContentSection-Cl3hsda_.js";import"./BekreftelseSendtSøknad-5JBOa1Co.js";import"./KontonummerInfo-ClAPpXTO.js";import"./Accordion-5j_XCgjC.js";import"./Svangerskapspenger-u_7NWws7.js";import"./DinPlan-CJ4vPiok.js";import"./Oppgaver-CwKeiQ9q.js";import"./OppgaveLenkepanel-DNo7wq8z.js";import"./KontaktOss-CzhwpTSs.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
