import{k as g,j as t}from"./iframe-BrVtwM1F.js";import{h as p,H as o}from"./index-Bb_5sEZn.js";import{A as i}from"./queries-CA5FgVZg.js";import{O as n}from"./routes-BgSQQwXh.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Xoiw7B7W.js";import{M as u,R as k,a as S}from"./chunk-WWGJGFF6-mCXAEmp8.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor--CVPekAk.js";import"./useSelectedSak-B4ANB44j.js";import"./useQuery-FyjR84PV.js";import"./sakerUtils-evnrITWe.js";import"./Snarveier-B7QajpLp.js";import"./LenkePanel-PpTISz6U.js";import"./index-DhpvLroL.js";import"./Header-BDF6gHOK.js";import"./LayoutWrapper-CrWYTw9z.js";import"./StatusTag-DxpFxH0b.js";import"./Tag-D8-6odH6.js";import"./Stroller-SKSyAeWL.js";import"./BabyWrapped-CYHPIIK_.js";import"./NoeGikkGalt-CuyiNWWx.js";import"./skjemanummer-BuxCcM9G.js";import"./MinidialogSkjema-nYWnzzKY.js";import"./HarIkkeSaker-mQlU1m0L.js";import"./SøkelenkerPanel-DbSIHifn.js";import"./HarSaker-CXq5XSrd.js";import"./SakLink-DQ9n84Ua.js";import"./guid-CsArkN6i.js";import"./ContentSection-B2-ruMRv.js";import"./BekreftelseSendtSøknad-BBjaPty6.js";import"./tidslinjeUtils-C2hPmZU2.js";import"./KontonummerInfo-Dizjp13I.js";import"./Accordion-BJd-xntX.js";import"./Svangerskapspenger-D71ZoPYc.js";import"./DinPlan-B5mQO9EL.js";import"./Oppgaver-CUTSDw6b.js";import"./OppgaveLenkepanel-CZ3iNsWs.js";import"./Tidslinje-DO66NMFn.js";import"./Paperplane-CqMoBgOQ.js";import"./KontaktOss-C5X32DZM.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const se=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,se as __namedExportsOrder,re as default};
