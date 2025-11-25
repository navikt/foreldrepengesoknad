import{i as g,j as t}from"./iframe-DO4-5H3J.js";import{h as p,H as o}from"./index-CuPY0oaQ.js";import{A as i}from"./queries-BjBSrtqM.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-jGe-8L-h.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-CqoCmG_Q.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DoWyr0ix.js";import"./useSelectedSak-BrSeUB06.js";import"./useQuery-BJF_ZjCT.js";import"./sakerUtils-D3sNUIqL.js";import"./Snarveier-BYxngD4H.js";import"./LenkePanel-DvI2u8Iw.js";import"./index-CuYij3o6.js";import"./Header-Bgt_25ao.js";import"./LayoutWrapper-zPCmexM3.js";import"./StatusTag-DoWEC6XK.js";import"./Tag-CVRwEArw.js";import"./Stroller-CjEXeA4f.js";import"./NoeGikkGalt-C6OvKvVl.js";import"./skjemanummer-CQJkfp3G.js";import"./MinidialogSkjema-DYimfWtq.js";import"./HarIkkeSaker-BoLAHHu2.js";import"./SøkelenkerPanel-CwH8UM0f.js";import"./HarSaker-BT2Vmue6.js";import"./SakLink-DCErYapA.js";import"./guid-CsArkN6i.js";import"./ContentSection-DLlVaBTK.js";import"./BekreftelseSendtSøknad-7LJYq5qG.js";import"./KontonummerInfo-B9dkVcmc.js";import"./Accordion-DPPMsRyf.js";import"./Svangerskapspenger-DHgn_sPt.js";import"./DinPlan-CMMHRWjf.js";import"./Oppgaver-DRxI8qst.js";import"./OppgaveLenkepanel-DfLnplK5.js";import"./KontaktOss-DISy9P-B.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
