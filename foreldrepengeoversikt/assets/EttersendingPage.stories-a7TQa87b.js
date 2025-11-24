import{i as g,j as t}from"./iframe-DubCCuBH.js";import{h as p,H as o}from"./index--HMxUv-e.js";import{A as i}from"./queries-BAn3AEA1.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-COVzrBmh.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-DGlmLL0c.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-CabR1IC9.js";import"./useSelectedSak-CCRVhSIQ.js";import"./useQuery-fSFm_tzA.js";import"./sakerUtils-C0cihgiZ.js";import"./Snarveier-DmzUJGwi.js";import"./LenkePanel-DXB8_jfa.js";import"./index-D4tGDKij.js";import"./Header-a4zsYGEJ.js";import"./LayoutWrapper-BLMZoI6Q.js";import"./StatusTag-DVQ0DHhx.js";import"./Tag-B1BrqHtw.js";import"./Stroller-CbLRI6PP.js";import"./NoeGikkGalt-CAoZwdYl.js";import"./skjemanummer-DiTMgbnp.js";import"./MinidialogSkjema-CMb4BmQ2.js";import"./HarIkkeSaker-CeYTASno.js";import"./SøkelenkerPanel-CoTG1WiZ.js";import"./HarSaker-a39jrMzI.js";import"./SakLink-BvvT01yF.js";import"./guid-CsArkN6i.js";import"./ContentSection-Dy9UOCzb.js";import"./BekreftelseSendtSøknad-fUwcYWTs.js";import"./KontonummerInfo-BVuqGvKA.js";import"./Accordion-BZt3-akV.js";import"./Svangerskapspenger-Bf7i9FWM.js";import"./DinPlan-4zODCm87.js";import"./Oppgaver-C9gabxut.js";import"./OppgaveLenkepanel-CBrl4TVg.js";import"./KontaktOss-B65eyTNG.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
