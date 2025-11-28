import{k as g,j as t}from"./iframe-TGpsbGZN.js";import{h as p,H as o}from"./index-BnzeR7Fo.js";import{A as i}from"./queries-BmBNU40z.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-C407bG70.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-DvX8tCfx.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-lSKj3X11.js";import"./useSelectedSak-CYwfljXy.js";import"./useQuery-BTXcTenA.js";import"./sakerUtils-CKRXnHKo.js";import"./Snarveier-f5CQbEab.js";import"./LenkePanel-namyPbfP.js";import"./index-L5rJEJCg.js";import"./Header-D4mcJ2Y6.js";import"./LayoutWrapper-TIhjLZZQ.js";import"./StatusTag-zQceX38i.js";import"./Tag-7IX825cK.js";import"./Stroller-cfnVzXRi.js";import"./NoeGikkGalt-BtEB0JZ3.js";import"./skjemanummer-_f2C6ccg.js";import"./MinidialogSkjema-C__5yhw1.js";import"./HarIkkeSaker-D6frBM-5.js";import"./SøkelenkerPanel-B53X7xT6.js";import"./HarSaker-B_sxQr5N.js";import"./SakLink-CIkJmOEz.js";import"./guid-CsArkN6i.js";import"./ContentSection-Dch1X5E1.js";import"./BekreftelseSendtSøknad-DclVkbc8.js";import"./KontonummerInfo-DbxGl9te.js";import"./Accordion-DQysGlZr.js";import"./Svangerskapspenger-CwQcyUUW.js";import"./DinPlan-C5c09SO4.js";import"./Oppgaver-BOMUhBcA.js";import"./OppgaveLenkepanel-fHKzxunA.js";import"./KontaktOss-DxFpkz0U.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
