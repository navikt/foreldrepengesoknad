import{k as g,j as t}from"./iframe-lV1Vpc_y.js";import{h as p,H as o}from"./index-BJ_fqUdM.js";import{A as i}from"./queries-WoULN4uW.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CZHbA8b5.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-n2F1wNQD.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-COcCQNGm.js";import"./useSelectedSak-B2nt6-oM.js";import"./useQuery-BpZkVbXQ.js";import"./sakerUtils-DJaFIMyA.js";import"./Snarveier-Dkp6mcYV.js";import"./LenkePanel-CUt17TzL.js";import"./index-4u36ggc3.js";import"./Header-WJv01Yrx.js";import"./LayoutWrapper-Dfla3ZvI.js";import"./StatusTag-Cmn7DnXX.js";import"./Tag-DzlXzEeD.js";import"./Stroller-Ch6Nki6m.js";import"./NoeGikkGalt-DpeSqXCl.js";import"./skjemanummer-BVtgdeK6.js";import"./MinidialogSkjema-C_xJ8Xh9.js";import"./HarIkkeSaker-vuzlXEi5.js";import"./SøkelenkerPanel-Dz2qQVTf.js";import"./HarSaker-BTtGYkca.js";import"./SakLink-Bw_mEA7e.js";import"./guid-CsArkN6i.js";import"./ContentSection-hWW1YPdI.js";import"./BekreftelseSendtSøknad-D3enWbTZ.js";import"./KontonummerInfo-BCVORf6H.js";import"./Accordion-BroNNizd.js";import"./Svangerskapspenger-BR-6Hca8.js";import"./DinPlan-Du2Xun9M.js";import"./Oppgaver-WykKXgvI.js";import"./OppgaveLenkepanel-D-2WnhjL.js";import"./KontaktOss-CzPWhEov.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
