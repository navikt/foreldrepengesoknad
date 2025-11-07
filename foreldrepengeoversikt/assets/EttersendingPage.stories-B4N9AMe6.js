import{i as g,j as t}from"./iframe-Dt1u57QF.js";import{h as p,H as o}from"./index-DxtMYL-G.js";import{A as i}from"./api-BUKWSigE.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-F3xJcs4c.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-Dt4APzO7.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DmZSJRHX.js";import"./useSelectedSak-DiUd8Bk_.js";import"./useQuery-zIu5wQ5V.js";import"./sakerUtils-Bkl0es5R.js";import"./Snarveier-BECpz_3q.js";import"./LenkePanel-CfDHj27F.js";import"./index-Cfam7Diz.js";import"./Header-Vp6XdOF9.js";import"./LayoutWrapper-GcfgGH-M.js";import"./StatusTag-D3Kilpau.js";import"./Tag-CcWkZLVs.js";import"./Stroller-CIA79R-C.js";import"./NoeGikkGalt-Jiq1kM9e.js";import"./MinidialogSkjema-CIc21ziC.js";import"./skjemanummer-Cy0_-ybi.js";import"./HarIkkeSaker-B9v0rj9l.js";import"./SøkelenkerPanel-_b2kPajp.js";import"./HarSaker-BE2YKz2g.js";import"./SakLink-DFa8sZoO.js";import"./guid-CsArkN6i.js";import"./ContentSection-DXudZzql.js";import"./BekreftelseSendtSøknad-C7woXssG.js";import"./KontonummerInfo-D4exuno2.js";import"./Accordion-tgAASz3G.js";import"./Svangerskapspenger-Brfw-OlG.js";import"./DinPlan-BjpSBWKO.js";import"./Oppgaver-T_Th2VoO.js";import"./OppgaveLenkepanel-DR_ouVk6.js";import"./KontaktOss-CgoCieiF.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
