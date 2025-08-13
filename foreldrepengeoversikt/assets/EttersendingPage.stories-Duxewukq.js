import{i as g,j as t}from"./iframe-BKgqfQS5.js";import{h as o,H as p}from"./index-D5Ul5H-e.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BLQu3cKR.js";import{M as d,R as u,a as k}from"./chunk-EF7DTUVF-Dkk_ot6P.js";import"./useBackgroundColor-D4RAELXW.js";import"./useSelectedSak-BOHJpS_N.js";import"./useQuery-BZ5_hpJm.js";import"./api-BH_etv-Q.js";import"./sakerUtils-Baum3Z3l.js";import"./Snarveier-CWtMu7MN.js";import"./LenkePanel-CZ-W03-3.js";import"./Dokument-BZcR9rHP.js";import"./dokumenterUtils-DEaA06pd.js";import"./Tag-BWMiEq9D.js";import"./GrupperteDokumenter-CbzedZ_X.js";import"./guid-CsArkN6i.js";import"./Header-XgHssl-S.js";import"./LayoutWrapper-Cm9Usfdv.js";import"./StatusTag-DcPieOOq.js";import"./Stroller-BMwIVbgv.js";import"./NoeGikkGalt-D93QIRiS.js";import"./MinidialogSkjema-0MNlUxYB.js";import"./skjemanummer-D5HqxyeA.js";import"./BekreftelseSendtSøknad-B7ibD3YM.js";import"./KontonummerInfo-h0MagA0v.js";import"./HarIkkeSaker-Bfze6BQ9.js";import"./SøkelenkerPanel-CfZ4yqUT.js";import"./HarSaker-NnxGTCdj.js";import"./SakLink-Dqy3drv1.js";import"./ContentSection-BMlP1mJq.js";import"./Svangerskapspenger-Dd1aX9I8.js";import"./DinPlan-D3yKBF0H.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-C0W3SvHt.js";import"./OppgaveLenkepanel-DY2ALoGe.js";import"./KontaktOss-Bokpyylq.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
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
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...r.parameters?.docs?.source}}};const Z=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,Z as __namedExportsOrder,Y as default};
