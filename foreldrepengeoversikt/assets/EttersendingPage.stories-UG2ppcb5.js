import{k as g,j as t}from"./iframe-DuhryXB5.js";import{h as p,H as o}from"./index-1iRR1hjy.js";import{A as i}from"./queries-jnzJCUH9.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-2ZirPGKG.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BNZOtkI1.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-CiyTW6TM.js";import"./useSelectedSak-CXFliAYj.js";import"./useQuery-CdMUro0u.js";import"./sakerUtils-DTbKGHMa.js";import"./Snarveier-Dsay7TaL.js";import"./LenkePanel-BeY6zeXP.js";import"./index-BEUcUsCt.js";import"./Header-Bf5SBIWU.js";import"./LayoutWrapper-Brkj-6Sg.js";import"./StatusTag-B0ODWihQ.js";import"./Tag-CYcWg13f.js";import"./Stroller-E9G3hYWJ.js";import"./NoeGikkGalt-BmhCLoH1.js";import"./skjemanummer-CSvrpCVG.js";import"./MinidialogSkjema-DL5wyjZ6.js";import"./HarIkkeSaker-B__vh1Z5.js";import"./SøkelenkerPanel-DWpqOeHw.js";import"./HarSaker-DS4P_Yi-.js";import"./SakLink-D88WVihE.js";import"./guid-CsArkN6i.js";import"./ContentSection-DF3Cj_t6.js";import"./BekreftelseSendtSøknad-BriBELdA.js";import"./KontonummerInfo-DpB8-561.js";import"./Accordion-BsaFqgpa.js";import"./Svangerskapspenger-xqkrvrxd.js";import"./DinPlan-B4EjlypH.js";import"./Oppgaver-DixEI_13.js";import"./OppgaveLenkepanel-CKvqYR2o.js";import"./KontaktOss-DmJCo0TD.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
