import{k as g,j as t}from"./iframe-GMCrZPMT.js";import{h as p,H as o}from"./index-DlA5Dgwv.js";import{A as i}from"./queries-D7hysrC7.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BlM_R4sv.js";import{M as u,R as k,a as S}from"./chunk-4WY6JWTD-B9rjn__f.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-5heR_nnq.js";import"./useSelectedSak-CUOZ-6He.js";import"./useQuery-BiY6XMdz.js";import"./sakerUtils-C6wXDww1.js";import"./Snarveier-CX34pwWZ.js";import"./LenkePanel-rGKf6Mfz.js";import"./index-BO5Y3oSX.js";import"./Header-DpjsnFYe.js";import"./LayoutWrapper-CzB3Cc9e.js";import"./StatusTag-JMLfObSF.js";import"./Tag-CllHDSoK.js";import"./Stroller-DoHtygTr.js";import"./NoeGikkGalt-OH1SYDZr.js";import"./skjemanummer-DJurKVsj.js";import"./MinidialogSkjema-OEzf77GQ.js";import"./HarIkkeSaker-BzP_HrH3.js";import"./SøkelenkerPanel-CRzmCMCD.js";import"./HarSaker-CffD9CrB.js";import"./SakLink-HDA4CQ8b.js";import"./guid-CsArkN6i.js";import"./ContentSection-Z-GBennl.js";import"./BekreftelseSendtSøknad-PbfKR_-I.js";import"./KontonummerInfo-B24IeY-n.js";import"./Accordion-B6GP9jD0.js";import"./Svangerskapspenger-BgqhrmUS.js";import"./DinPlan-BQGnUhBP.js";import"./Oppgaver-wbXDS51Z.js";import"./OppgaveLenkepanel-CvzCp6bM.js";import"./KontaktOss-BTWA662w.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
