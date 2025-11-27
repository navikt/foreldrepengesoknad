import{k as g,j as t}from"./iframe-CsrCHIbc.js";import{h as p,H as o}from"./index-DeBRi863.js";import{A as i}from"./queries-ABV-Kb89.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-D3G4Izvl.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BT_Togjd.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-B996JjQX.js";import"./useSelectedSak-DqqN2WRN.js";import"./useQuery-C7vIzFLb.js";import"./sakerUtils-Bu6o6iIQ.js";import"./Snarveier-DzIE_NYs.js";import"./LenkePanel-BtEpI36_.js";import"./index-CRl1bXy1.js";import"./Header-qhcU0JHb.js";import"./LayoutWrapper-BddlD66g.js";import"./StatusTag-CM50faVs.js";import"./Tag-DZlRYcM7.js";import"./Stroller-CReGhqWv.js";import"./NoeGikkGalt-DTnp1XDV.js";import"./skjemanummer-Br7kwxxT.js";import"./MinidialogSkjema-DM-ejKKG.js";import"./HarIkkeSaker-DZCg0dUh.js";import"./SøkelenkerPanel-BFXcCzwO.js";import"./HarSaker-D8e86T-K.js";import"./SakLink-3L45Dotl.js";import"./guid-CsArkN6i.js";import"./ContentSection-B92sY39o.js";import"./BekreftelseSendtSøknad-Udn-yYK0.js";import"./KontonummerInfo-C3b7MQFO.js";import"./Accordion-SvuOuvUa.js";import"./Svangerskapspenger-VKi3Fzxh.js";import"./DinPlan-DVOKnsQv.js";import"./Oppgaver-BIYJtBra.js";import"./OppgaveLenkepanel-DN_a99S8.js";import"./KontaktOss-B8lfVYF3.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
