import{k as g,j as t}from"./iframe-CW6M0nGA.js";import{h as p,H as o}from"./index-duR-1gme.js";import{A as i}from"./queries-L2qXoV6o.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-ClblZ0iF.js";import{M as u,R as k,a as S}from"./chunk-4WY6JWTD-TVRJbD7a.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-BfZHn52b.js";import"./useSelectedSak-BK6YKcQR.js";import"./useQuery-DdR1GfKI.js";import"./sakerUtils-BaMAncC3.js";import"./Snarveier--gVCvDwx.js";import"./LenkePanel-Cw4o44YE.js";import"./index-BIgVRAxi.js";import"./Header-CgTHO41i.js";import"./LayoutWrapper-BChjku0Q.js";import"./StatusTag-BVvnnqOB.js";import"./Tag-Drj8VGqP.js";import"./Stroller-Y9rWqZLn.js";import"./NoeGikkGalt-C0E1brnN.js";import"./skjemanummer-Bby465Ql.js";import"./MinidialogSkjema-BbUZygOg.js";import"./HarIkkeSaker-Bo9Od1pc.js";import"./SøkelenkerPanel-BqVSMPMN.js";import"./HarSaker-kl6m7CEZ.js";import"./SakLink-BuFSAxM7.js";import"./guid-CsArkN6i.js";import"./ContentSection-wlkxUvZa.js";import"./BekreftelseSendtSøknad-CwINt3yM.js";import"./KontonummerInfo-BWFTk5Tq.js";import"./Accordion-DRVI6B5N.js";import"./Svangerskapspenger-BEMvDZ0-.js";import"./DinPlan-Dhi_CeFX.js";import"./Oppgaver-WJ0A7r7t.js";import"./OppgaveLenkepanel-D7cMRSuh.js";import"./KontaktOss-DLRkhu0Q.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
