import{k as g,j as t}from"./iframe-hE7ZueP_.js";import{h as p,H as o}from"./index-9WkplJto.js";import{A as i}from"./queries-DZZ2G4UG.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-ClR8qPIN.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-BIhfeY9W.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-C7OKkwPt.js";import"./useSelectedSak-Cnd1d-Nl.js";import"./useQuery-B78uqvSY.js";import"./sakerUtils-tIIPIWoU.js";import"./Snarveier-dgp7IPf3.js";import"./LenkePanel-BzJW49e_.js";import"./index-C3ly5VTD.js";import"./Header-CO-arhRG.js";import"./LayoutWrapper-B1tGDz5o.js";import"./StatusTag-DS8qWndv.js";import"./Tag-AEFQA7EM.js";import"./Stroller-BUs_HgQf.js";import"./NoeGikkGalt-Bl94mmYU.js";import"./skjemanummer-DbW30xAb.js";import"./MinidialogSkjema-6ayH0-eH.js";import"./HarIkkeSaker-CBjINRiF.js";import"./SøkelenkerPanel-B5CMRjS9.js";import"./HarSaker-CwZW7QRF.js";import"./SakLink-C3kxB0oQ.js";import"./guid-CsArkN6i.js";import"./ContentSection-CR12qQuR.js";import"./BekreftelseSendtSøknad-D9HGmP6p.js";import"./KontonummerInfo-BV7CIt-Z.js";import"./Accordion-CSTTjjNc.js";import"./Svangerskapspenger-ClnyTLSu.js";import"./DinPlan-BUYf3qyf.js";import"./Oppgaver-BlNHy49d.js";import"./OppgaveLenkepanel-B24nEYiV.js";import"./KontaktOss-G6tiI2FX.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
