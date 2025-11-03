import{i as g,j as t}from"./iframe-CitxjgmF.js";import{h as p,H as o}from"./index-gcdJJx-S.js";import{A as i}from"./api-D_6E7xv3.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-D7O0WNok.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-CGj-pdVD.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BDr2aBST.js";import"./useSelectedSak-2kabLMHe.js";import"./useQuery-BSUsqX7r.js";import"./sakerUtils-BOfmdJ3b.js";import"./Snarveier-OU8X8Bu8.js";import"./LenkePanel-3luf4RN9.js";import"./index-C_vRbeVv.js";import"./Header-CddDfEsl.js";import"./LayoutWrapper-BBzqII7M.js";import"./StatusTag-CB2flzFl.js";import"./Tag-BdETakK4.js";import"./Stroller-DkFYwv9G.js";import"./NoeGikkGalt-C4Wb7sBF.js";import"./MinidialogSkjema-DVXWMhr4.js";import"./skjemanummer-OXRA-Rg5.js";import"./HarIkkeSaker-Dn2CX0If.js";import"./SøkelenkerPanel-Bc7T78Zs.js";import"./HarSaker-qI5zTTJG.js";import"./SakLink-KSH8U0GB.js";import"./guid-CsArkN6i.js";import"./ContentSection-IiQ1kEP5.js";import"./BekreftelseSendtSøknad-B-MJBZeM.js";import"./KontonummerInfo-CxyyvScr.js";import"./Accordion-DuQfMFU2.js";import"./Svangerskapspenger-DgWvi15m.js";import"./DinPlan-BU_adEoG.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-BL_faTK4.js";import"./OppgaveLenkepanel-BdmXrbhV.js";import"./KontaktOss-BLnUW61t.js";const Z={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
