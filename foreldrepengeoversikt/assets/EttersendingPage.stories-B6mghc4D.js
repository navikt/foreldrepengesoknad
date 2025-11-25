import{i as g,j as t}from"./iframe-BgqFkKjw.js";import{h as p,H as o}from"./index-CLByNgfh.js";import{A as i}from"./queries-Bjz2qbyA.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BqMbmAtU.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-Br77_rPi.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DVWsYkGY.js";import"./useSelectedSak-D7522buz.js";import"./useQuery-DpaFm0bq.js";import"./sakerUtils-DHx5H944.js";import"./Snarveier-Dls8hVOk.js";import"./LenkePanel-B1vguzGt.js";import"./index-B1wNwUa4.js";import"./Header-2YXB4QJy.js";import"./LayoutWrapper-CC5sXv3W.js";import"./StatusTag-CvS9rvcm.js";import"./Tag-DTynPW2q.js";import"./Stroller-CUaEuPAc.js";import"./NoeGikkGalt-D5EvzKsH.js";import"./skjemanummer-3GI8Sna1.js";import"./MinidialogSkjema-u8U7c8xG.js";import"./HarIkkeSaker-pM-vYkPo.js";import"./SøkelenkerPanel-t-eS7qOh.js";import"./HarSaker-BkDMdfLV.js";import"./SakLink-CxPPZFDv.js";import"./guid-CsArkN6i.js";import"./ContentSection-CX6JgoWi.js";import"./BekreftelseSendtSøknad-BTq0zYlg.js";import"./KontonummerInfo-hJlwiLlJ.js";import"./Accordion-Dma-Mi8M.js";import"./Svangerskapspenger-BeM8eh0w.js";import"./DinPlan-BRTZbhoZ.js";import"./Oppgaver-DnR92F_6.js";import"./OppgaveLenkepanel-Ba7fjHhO.js";import"./KontaktOss-D79trC1F.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
