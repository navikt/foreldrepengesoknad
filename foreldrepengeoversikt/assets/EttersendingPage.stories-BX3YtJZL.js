import{k as g,j as t}from"./iframe-Dpp7yu4e.js";import{h as p,H as o}from"./index-C-k-IzMo.js";import{A as i}from"./queries-h-vcByZy.js";import{O as n}from"./routes-BgSQQwXh.js";import{E as a}from"./ForeldrepengeoversiktRoutes-B12k4jL7.js";import{M as u,R as k,a as S}from"./chunk-WWGJGFF6-GowFewAn.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-C-IdVgX_.js";import"./useSelectedSak-XDpRXMO7.js";import"./useQuery-Cr_wKRw3.js";import"./sakerUtils-Dh7nKuvC.js";import"./Snarveier-bUkUTrtr.js";import"./LenkePanel-CJ5RmB7s.js";import"./index-DGbpVQ_4.js";import"./Header-B0R1TuZ8.js";import"./LayoutWrapper-CxzQ0GQ5.js";import"./StatusTag-CsD4L-uC.js";import"./Tag-BwH_Jyze.js";import"./Stroller-CmVLJni6.js";import"./BabyWrapped-CLNqiB5T.js";import"./NoeGikkGalt-VwittZjp.js";import"./skjemanummer-DBZVZ2Rk.js";import"./MinidialogSkjema-BkAVQ4UX.js";import"./HarIkkeSaker-CKwOhpCd.js";import"./SøkelenkerPanel-MrEzo-PV.js";import"./HarSaker-OEc1vZ3v.js";import"./SakLink-BcBVPauV.js";import"./guid-CsArkN6i.js";import"./ContentSection-BO7AR2Ma.js";import"./BekreftelseSendtSøknad-BP4feEXZ.js";import"./tidslinjeUtils-Co8gpg0z.js";import"./KontonummerInfo-UdyHogm9.js";import"./Accordion-B0uEjfaf.js";import"./Svangerskapspenger-9r8ckqko.js";import"./DinPlan-Cgv1Mvzv.js";import"./Oppgaver-D-aomRJ7.js";import"./OppgaveLenkepanel-BZ8dZQzi.js";import"./Tidslinje-Bhur-vDh.js";import"./Paperplane-CgiOiMJF.js";import"./KontaktOss-Eay2VksF.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
